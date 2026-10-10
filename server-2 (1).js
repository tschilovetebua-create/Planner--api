/**
 * SmartPlate AI backend
 * ----------------------
 * - Accounts:   email + password, bcrypt-hashed, JWT session token
 * - Billing:    Flutterwave Checkout — cards AND mobile money (MTN MoMo, Orange
 *               Money, M-Pesa, Airtel Money...) through one hosted payment page
 * - AI planner: calls the real Claude API to build a meal plan from DISHES
 *
 * Storage: a single JSON file (data/db.json). Fine for a prototype or small
 * launch. Swap `readDb`/`writeDb` for a real database (Postgres via Supabase,
 * for example) before you have more than a handful of concurrent writers.
 */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

/* ------------------------------------------------------------------ */
/* Error monitoring (optional) — set SENTRY_DSN to turn this on. With no */
/* DSN, or if @sentry/node isn't installed yet, this quietly no-ops and  */
/* the server behaves exactly as before (errors still go to the console).*/
/* ------------------------------------------------------------------ */
let Sentry = null;
if (process.env.SENTRY_DSN) {
  try {
    Sentry = require('@sentry/node');
    Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1, environment: process.env.NODE_ENV || 'production' });
    console.log('Sentry error monitoring enabled.');
  } catch (e) {
    console.warn('SENTRY_DSN is set but @sentry/node isn\'t installed — run `npm install @sentry/node` to enable it.');
  }
}
function reportError(err, context) {
  console.error(context ? `${context}:` : 'Error:', err);
  if (Sentry) Sentry.captureException(err, context ? { extra: { context } } : undefined);
}
const jwt = require('jsonwebtoken');
const { DISHES } = require('./dishes');

const PORT = process.env.PORT || 8787;
const JWT_SECRET = process.env.JWT_SECRET;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET in .env — copy .env.example to .env and fill it in.');
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Tiny JSON-file "database"                                          */
/* ------------------------------------------------------------------ */
const DB_PATH = path.join(__dirname, 'data', 'db.json');
function readDb() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
  catch (e) { return { users: {} }; }
}
function writeDb(db) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
// Lazily downgrades a Plus user whose billing period has passed — there's
// no recurring auto-charge (see the billing section below for why), so
// this is what actually "ends" a subscription once it's not renewed.
function maybeExpirePlan(u) {
  if (u.tier === 'plus' && u.planExpiresAt && u.planExpiresAt < Date.now()) {
    u.tier = 'free';
  }
  return u;
}
function publicUser(u) {
  return {
    name: u.name, email: u.email, tier: u.tier, billingCycle: u.billingCycle || null,
    planExpiresAt: u.planExpiresAt || null, trialEnd: u.trialEnd || null, ownsEbook: !!u.ownsEbook
  };
}
const TRIAL_MS = 24 * 60 * 60 * 1000; // one day free trial after signup

/* ------------------------------------------------------------------ */
/* App setup                                                          */
/* ------------------------------------------------------------------ */
const app = express();
app.use(express.json());
app.use(cors({
  origin: function (origin, cb) {
    if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  }
}));

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Sign in required.' });
  try {
    req.userEmail = jwt.verify(token, JWT_SECRET).email;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Your session expired. Please sign in again.' });
  }
}

/* ------------------------------------------------------------------ */
/* Accounts                                                            */
/* ------------------------------------------------------------------ */
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Email and a password of at least 6 characters are required.' });
  }
  const db = readDb();
  const key = email.toLowerCase();
  if (db.users[key]) return res.status(409).json({ error: 'An account with that email already exists.' });

  const passHash = await bcrypt.hash(password, 10);
  db.users[key] = { name: name || email.split('@')[0], email, passHash, tier: 'free', plan: [], trialEnd: Date.now() + TRIAL_MS };
  writeDb(db);

  const token = jwt.sign({ email: key }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: publicUser(db.users[key]) });
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body || {};
  const db = readDb();
  const u = db.users[(email || '').toLowerCase()];
  if (!u || !(await bcrypt.compare(password || '', u.passHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }
  maybeExpirePlan(u);
  writeDb(db);
  const token = jwt.sign({ email: u.email.toLowerCase() }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: publicUser(u) });
});

app.get('/api/auth/me', auth, (req, res) => {
  const db = readDb();
  const u = db.users[req.userEmail];
  if (!u) return res.status(404).json({ error: 'Account not found.' });
  maybeExpirePlan(u);
  writeDb(db);
  res.json({ user: publicUser(u) });
});

/* ------------------------------------------------------------------ */
/* Forgot / reset password                                             */
/* ------------------------------------------------------------------ */
const RESET_TOKEN_TTL = 60 * 60 * 1000; // 1 hour

// Sends the reset link. No email provider is wired up yet, so this logs
// the link to the server console instead — good enough to test the flow
// yourself. Before real users rely on this, swap the body of this
// function for a real provider (Postmark, SendGrid, Resend, AWS SES...).
async function sendResetEmail(email, resetUrl) {
  console.log(`[password reset] ${email} -> ${resetUrl}`);
  // Example with Resend (https://resend.com), once RESEND_API_KEY is set:
  //
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: { 'content-type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  //   body: JSON.stringify({
  //     from: 'SmartPlate AI <no-reply@your-domain.com>',
  //     to: email,
  //     subject: 'Reset your SmartPlate AI password',
  //     html: `<p>Click to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in an hour.</p>`
  //   })
  // });
}

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body || {};
  const db = readDb();
  const key = (email || '').toLowerCase();
  const u = db.users[key];

  // Always respond the same way whether or not the account exists —
  // otherwise this endpoint could be used to check who has an account.
  if (u) {
    const token = crypto.randomBytes(32).toString('hex');
    u.resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    u.resetTokenExpires = Date.now() + RESET_TOKEN_TTL;
    writeDb(db);

    const base = process.env.SITE_URL || 'http://localhost:5500/';
    const resetUrl = `${base.replace(/\/$/, '')}/#reset=${token}`;
    try { await sendResetEmail(u.email, resetUrl); }
    catch (e) { reportError(e, 'sendResetEmail'); }
  }

  res.json({ message: 'If that email has an account, a reset link is on its way.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body || {};
  if (!token || !password || password.length < 6) {
    return res.status(400).json({ error: 'A valid token and a password of at least 6 characters are required.' });
  }
  const db = readDb();
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const email = Object.keys(db.users).find(k => db.users[k].resetTokenHash === tokenHash);
  const u = email && db.users[email];

  if (!u || !u.resetTokenExpires || u.resetTokenExpires < Date.now()) {
    return res.status(400).json({ error: 'That reset link is invalid or has expired. Request a new one.' });
  }

  u.passHash = await bcrypt.hash(password, 10);
  delete u.resetTokenHash;
  delete u.resetTokenExpires;
  writeDb(db);

  const jwtToken = jwt.sign({ email: u.email.toLowerCase() }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token: jwtToken, user: publicUser(u) });
});

/* ------------------------------------------------------------------ */
/* Billing — Flutterwave Checkout. One hosted payment page handles      */
/* cards AND mobile money (MTN MoMo, Orange Money, M-Pesa, Airtel Money, */
/* bank transfer...) together — Flutterwave shows whichever of those     */
/* are enabled on your account and available for the chosen currency,   */
/* so there's no separate "mobile money route" to maintain here.        */
/*                                                                      */
/* Note on subscriptions: Flutterwave can auto-rebill saved cards via    */
/* its Payment Plans feature, but NOT mobile money — there's no clean    */
/* way to auto-rebill a mobile money wallet. So Plus here is charged as  */
/* a single payment that buys one billing period (1 month or 1 year),   */
/* tracked as `planExpiresAt`; nothing renews automatically. Simpler and */
/* more honest than promising auto-renewal that wouldn't work for every  */
/* payment method anyway — you can always add a "renew" reminder email   */
/* as a follow-up.                                                      */
/* ------------------------------------------------------------------ */
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_API = 'https://api.flutterwave.com/v3';
const FLW_CURRENCY = process.env.FLW_CURRENCY || 'USD'; // e.g. 'XAF' to charge in CFA francs instead
const PLUS_AMOUNT_MONTH = Number(process.env.PLUS_AMOUNT_MONTH || 4.99);
const PLUS_AMOUNT_YEAR = Number(process.env.PLUS_AMOUNT_YEAR || 49.99);
const EBOOK_AMOUNT = Number(process.env.EBOOK_AMOUNT || 9.99);
const DAY_MS = 24 * 60 * 60 * 1000;

async function flwInitiate({ amount, txRef, email, name, title, redirectUrl }) {
  const r = await fetch(`${FLW_API}/payments`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${FLW_SECRET_KEY}` },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency: FLW_CURRENCY,
      redirect_url: redirectUrl,
      customer: { email, name },
      customizations: { title }
      // No payment_options set on purpose — Flutterwave's hosted page then
      // offers every method enabled on your account for this currency.
    })
  });
  const data = await r.json();
  if (!r.ok || data.status !== 'success') throw new Error((data && data.message) || 'Could not start checkout with Flutterwave.');
  return data.data.link;
}

// Re-fetches the transaction from Flutterwave rather than trusting the
// webhook payload alone — the standard, safer pattern for any payment
// webhook (a forged POST to your webhook URL should never be enough on
// its own to grant access).
async function flwVerify(transactionId) {
  const r = await fetch(`${FLW_API}/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` }
  });
  const data = await r.json();
  if (!r.ok || data.status !== 'success') throw new Error('Could not verify transaction with Flutterwave.');
  return data.data; // { status, amount, currency, tx_ref, id, ... }
}

app.post('/api/billing/checkout', auth, async (req, res) => {
  if (!FLW_SECRET_KEY) return res.status(500).json({ error: 'Flutterwave is not configured on this server yet.' });
  const cycle = req.body && req.body.cycle === 'year' ? 'year' : 'month';
  const db = readDb();
  const u = db.users[req.userEmail];
  const amount = cycle === 'year' ? PLUS_AMOUNT_YEAR : PLUS_AMOUNT_MONTH;

  const txRef = `plus-${crypto.randomBytes(8).toString('hex')}`;
  db.pendingTx = db.pendingTx || {};
  db.pendingTx[txRef] = { type: 'plus', cycle, email: u.email.toLowerCase(), amount, currency: FLW_CURRENCY, createdAt: Date.now() };
  writeDb(db);

  try {
    const link = await flwInitiate({
      amount, txRef, email: u.email, name: u.name, title: 'SmartPlate AI Plus',
      redirectUrl: process.env.CHECKOUT_SUCCESS_URL || 'https://example.com/?upgraded=1'
    });
    res.json({ url: link });
  } catch (e) {
    reportError(e, 'POST /api/billing/checkout');
    res.status(502).json({ error: e.message });
  }
});

// One-time purchase of the cookbook ebook (separate from the Plus plan above).
app.post('/api/billing/ebook-checkout', auth, async (req, res) => {
  if (!FLW_SECRET_KEY) return res.status(500).json({ error: 'Flutterwave is not configured on this server yet.' });
  const db = readDb();
  const u = db.users[req.userEmail];
  if (u.ownsEbook) return res.status(400).json({ error: 'You already own the ebook.' });

  const txRef = `ebook-${crypto.randomBytes(8).toString('hex')}`;
  db.pendingTx = db.pendingTx || {};
  db.pendingTx[txRef] = { type: 'ebook', email: u.email.toLowerCase(), amount: EBOOK_AMOUNT, currency: FLW_CURRENCY, createdAt: Date.now() };
  writeDb(db);

  try {
    const link = await flwInitiate({
      amount: EBOOK_AMOUNT, txRef, email: u.email, name: u.name, title: 'SmartPlate AI Cookbook',
      redirectUrl: process.env.EBOOK_SUCCESS_URL || process.env.CHECKOUT_SUCCESS_URL || 'https://example.com/?ebook=1'
    });
    res.json({ url: link });
  } catch (e) {
    reportError(e, 'POST /api/billing/ebook-checkout');
    res.status(502).json({ error: e.message });
  }
});

// Flutterwave calls this when a payment completes. Register this exact
// path in your Flutterwave Dashboard (Settings > Webhooks), and set the
// same secret string there as FLW_WEBHOOK_HASH below (it's a shared
// secret you invent — not something Flutterwave generates for you).
app.post('/api/billing/webhook', async (req, res) => {
  if (req.headers['verif-hash'] !== process.env.FLW_WEBHOOK_HASH) return res.status(401).end();
  res.json({ received: true }); // ack immediately; Flutterwave retries on non-2xx

  try {
    const event = req.body || {};
    if (event.event !== 'charge.completed') return;
    const txRef = event.data && event.data.tx_ref;
    const transactionId = event.data && event.data.id;
    if (!txRef || !transactionId) return;

    const db = readDb();
    const pending = db.pendingTx && db.pendingTx[txRef];
    if (!pending) return; // unknown or already-processed reference

    const verified = await flwVerify(transactionId);
    const amountOk = Math.abs(verified.amount - pending.amount) < 0.01 && verified.currency === pending.currency;
    if (verified.status !== 'successful' || !amountOk) return;

    const u = db.users[pending.email];
    if (u) {
      if (pending.type === 'ebook') {
        u.ownsEbook = true;
        u.ebookSince = Date.now();
      } else {
        u.tier = 'plus';
        u.billingCycle = pending.cycle;
        u.planSince = Date.now();
        u.planExpiresAt = Date.now() + (pending.cycle === 'year' ? 365 : 30) * DAY_MS;
      }
    }
    delete db.pendingTx[txRef];
    writeDb(db);
  } catch (e) {
    reportError(e, 'POST /api/billing/webhook');
  }
});

// Serves the ebook file, but only to a signed-in user who owns it.
app.get('/api/ebook/download', auth, (req, res) => {
  const db = readDb();
  const u = db.users[req.userEmail];
  if (!u || !u.ownsEbook) return res.status(403).json({ error: 'Buy the cookbook to download it.' });
  res.download(path.join(__dirname, 'assets', 'smartplate-ai-cookbook.pdf'), 'SmartPlate-AI-Cookbook.pdf');
});

/* ------------------------------------------------------------------ */
/* AI meal planner — real Claude API call                              */
/* ------------------------------------------------------------------ */
const DISH_SUMMARY = DISHES.map(d => ({ id: d.id, name: d.name, country: d.country, region: d.region, time: d.time, tag: d.tag }));

app.post('/api/planner', auth, async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'The AI planner is not configured on this server yet (missing ANTHROPIC_API_KEY).' });
  }
  const { region, days, goal } = req.body || {};
  const numDays = Math.max(2, Math.min(15, parseInt(days, 10) || 3));

  const system = `You plan meals for SmartPlate AI. You may only pick dishes from the JSON catalog provided ` +
    `below — never invent a dish or an id that is not in it, and never invent ingredients or steps beyond what ` +
    `the catalog implies. Reply with ONLY a JSON array of exactly ${numDays} objects, most varied cuisine mix ` +
    `first, no duplicate ids unless the catalog is smaller than ${numDays}. Each object must have exactly these ` +
    `keys: "id" (a catalog id), "method" (2-4 words naming the main cooking technique for that dish, e.g. ` +
    `"Braising", "Stir-frying", "Grilling"), "serve" (one short sentence, under 20 words, on how to plate or ` +
    `serve it), and "store" (one short sentence, under 25 words, on how to store leftovers safely — fridge or ` +
    `freezer, how long, and any reheating note). If the dietary focus names a health condition (e.g. diabetic, ` +
    `low-sodium, heart-healthy), keep "serve" and "store" general and practical — never specific medical advice, ` +
    `and never claim a dish is medically safe for that condition. No prose, no markdown, no code fences outside ` +
    `the array — just the JSON array, e.g. [{"id":"jollof","method":"Simmering","serve":"Serve hot with fried ` +
    `plantain on the side.","store":"Fridge up to 4 days in a sealed container; reheat until piping hot."}].\n\n` +
    `Catalog: ${JSON.stringify(DISH_SUMMARY)}`;

  const user = `Cuisine preference: ${region || 'Any'}. Number of meals: ${numDays}. Dietary focus: ${goal || 'balanced'}.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 700,
        system,
        messages: [{ role: 'user', content: user }]
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      reportError(new Error(`Anthropic API error ${r.status}: ${errText}`), 'POST /api/planner');
      return res.status(502).json({ error: 'The AI planner had trouble reaching Claude. Please try again.' });
    }

    const data = await r.json();
    const text = (data.content || []).map(b => b.text || '').join('').trim();
    const cleaned = text.replace(/^```(json)?/i, '').replace(/```$/, '').trim();

    let items;
    try { items = JSON.parse(cleaned); }
    catch (e) { return res.status(502).json({ error: 'The AI planner returned something unexpected. Please try again.' }); }

    const catalogById = new Map(DISHES.map(d => [d.id, d]));
    const picks = (Array.isArray(items) ? items : [])
      .filter(it => it && typeof it.id === 'string' && catalogById.has(it.id))
      .slice(0, numDays)
      .map(it => ({
        id: it.id,
        method: (typeof it.method === 'string' && it.method.trim()) ? it.method.trim().slice(0, 40) : null,
        serve: (typeof it.serve === 'string' && it.serve.trim()) ? it.serve.trim().slice(0, 200) : null,
        store: (typeof it.store === 'string' && it.store.trim()) ? it.store.trim().slice(0, 200) : null
      }));

    if (!picks.length) return res.status(502).json({ error: 'The AI planner could not build a plan from those preferences. Try different options.' });

    res.json({ picks });
  } catch (e) {
    reportError(e, 'POST /api/planner');
    res.status(500).json({ error: 'Something went wrong building your plan. Please try again.' });
  }
});

/* ------------------------------------------------------------------ */
/* Shopping assistant — answers a free-text question about the         */
/* visitor's current shopping list (substitutions, quantities, how to  */
/* combine trips, etc.) using the real Claude API.                     */
/* ------------------------------------------------------------------ */
app.post('/api/shopping-assistant', auth, async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'The shopping assistant is not configured on this server yet (missing ANTHROPIC_API_KEY).' });
  }
  const { items, question } = req.body || {};
  const list = Array.isArray(items) ? items.filter(x => typeof x === 'string').slice(0, 100) : [];
  const q = typeof question === 'string' ? question.trim().slice(0, 300) : '';
  if (!q) return res.status(400).json({ error: 'Ask a question first.' });

  const system = `You are a friendly, practical shopping assistant for SmartPlate AI. The visitor has a ` +
    `shopping list built from recipes they picked. Answer their question about it directly — substitutions, ` +
    `quantities for a given number of people, how to combine or organize a shop, or anything similar. Keep the ` +
    `answer to 2-4 short sentences, plain text, no markdown headers or bullet lists. If asked about something ` +
    `medical (an allergy or a health condition), give general, cautious guidance and suggest confirming with a ` +
    `professional rather than a firm recommendation.`;

  const user = `Shopping list: ${list.length ? list.join(', ') : '(empty)'}\n\nQuestion: ${q}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 300,
        system,
        messages: [{ role: 'user', content: user }]
      })
    });
    if (!r.ok) {
      reportError(new Error(`Anthropic API error ${r.status}: ${await r.text()}`), 'POST /api/shopping-assistant');
      return res.status(502).json({ error: 'The assistant had trouble responding. Please try again.' });
    }
    const data = await r.json();
    const text = (data.content || []).map(b => b.text || '').join('').trim();
    if (!text) return res.status(502).json({ error: 'The assistant had trouble responding. Please try again.' });
    res.json({ answer: text });
  } catch (e) {
    reportError(e, 'POST /api/shopping-assistant');
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Catches anything a route didn't handle itself (thrown errors, bad JSON
// bodies, etc.) so a visitor always gets a JSON error instead of a raw
// stack trace, and so it still gets reported if Sentry is configured.
app.use((err, req, res, next) => {
  reportError(err, `${req.method} ${req.path}`);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Something went wrong on our end. Please try again.' });
});

// Last resort: log (and report) anything that slips past everything above,
// rather than letting the process crash silently.
process.on('unhandledRejection', (err) => reportError(err, 'unhandledRejection'));
process.on('uncaughtException', (err) => reportError(err, 'uncaughtException'));

app.listen(PORT, () => console.log(`SmartPlate API listening on http://localhost:${PORT}`));
