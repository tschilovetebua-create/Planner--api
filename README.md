# SmartPlate AI — backend

A small Express API that gives the SmartPlate AI front end (`smartplate-ai.html`)
real accounts, real billing, and a real AI meal planner. Everything here is
meant as a working starting point, not a finished production service —
read the notes below before you take real payments.

## What it does

- **Accounts** — `/api/auth/signup`, `/api/auth/signin`, `/api/auth/me`.
  Passwords are hashed with bcrypt and never stored in plain text. A signed
  JWT is returned and used as a bearer token for everything else.
- **Billing** — `/api/billing/checkout` and `/api/billing/ebook-checkout`
  create a [Flutterwave](https://flutterwave.com) hosted checkout link for
  the Plus plan or the cookbook. One checkout page handles cards *and*
  mobile money (MTN MoMo, Orange Money, M-Pesa, Airtel Money, bank
  transfer...) — whichever are enabled on your Flutterwave account and
  available for the currency you charge in. `/api/billing/webhook` is
  where Flutterwave confirms payment and upgrades the account, after an
  independent re-check against Flutterwave's API (never trusting the
  webhook body alone).
- **AI meal planner** — `/api/planner` calls the real Claude API with your
  dish catalog and returns a set of dish ids for the front end to add to
  the visitor's plan.

## 1. Install and run locally

```bash
cd planner-api
npm install
cp .env.example .env
# then edit .env — at minimum set JWT_SECRET and ANTHROPIC_API_KEY
npm start
```

The API listens on `http://localhost:8787` by default.

## 2. Point the front end at it

Open `smartplate-ai.html` and find this near the top of the `<script>`:

```js
var API_BASE = ''; // e.g. 'https://your-api.example.com'
```

Set it to wherever this server is running, for example
`http://localhost:8787` while developing, or your deployed URL later. If
`API_BASE` is left empty, the page keeps working in its original
browser-only demo mode — nothing breaks, you just don't get real accounts,
billing or AI planning until you set it.

## 3. Flutterwave (cards and mobile money, one checkout)

Flutterwave was chosen over Stripe here because **Stripe doesn't support
merchant accounts from every country** (Cameroon included) — Flutterwave
does, and it handles cards and mobile money together, so there's only one
provider to set up instead of two.

1. Create a [Flutterwave](https://dashboard.flutterwave.com/signup)
   account and complete their verification (identity/business details —
   required before you can receive real payouts, same as any payment
   processor).
2. Copy your secret key (Settings → API) into `.env` as `FLW_SECRET_KEY`.
   Use the test key first (`FLWSECK_TEST-...`) to try the whole flow
   before going live.
3. Under **Settings → Webhooks**, set your webhook URL to
   `https://your-api.example.com/api/billing/webhook`, and invent a
   secret string — put the exact same string in both the Dashboard and
   `.env` as `FLW_WEBHOOK_HASH`. This is how incoming webhook calls are
   verified as genuinely from Flutterwave.
4. Set `FLW_CURRENCY` to whatever you want to charge in (`USD` works
   everywhere Flutterwave operates; a local currency like `XAF` or `KES`
   works too), and set your prices in `PLUS_AMOUNT_MONTH`,
   `PLUS_AMOUNT_YEAR`, and `EBOOK_AMOUNT`.
5. Under **Settings → Payout**, add your bank account and payout schedule
   — this is where your money actually lands.

**On recurring billing:** Flutterwave can auto-rebill a saved *card*, but
there's no equivalent for mobile money — there's no "saved wallet" to
charge automatically. So Plus here is charged as a single payment that
buys one billing period (tracked as `planExpiresAt` on the account, which
`maybeExpirePlan()` in `server.js` quietly downgrades back to Free once it
passes). Nothing renews on its own. If you want true auto-renewal for
card payers specifically, Flutterwave's
[Payment Plans](https://developer.flutterwave.com/docs/recurring-payments/payment-plans)
API is where to add it as a follow-up — it's deliberately left out here
so Plus behaves the same way for every payment method.

## 4. The AI meal planner

Get an API key from [console.anthropic.com](https://console.anthropic.com)
and put it in `.env` as `ANTHROPIC_API_KEY`. The `/api/planner` route sends
your dish catalog (`dishes.js`) to Claude with the visitor's preferences and
gets back an array of `{id, method, serve}` objects — a dish id from your
catalog, the main cooking technique for it, and a one-line serving
suggestion — which the front end then shows in the planner and can add to
the visitor's plan.

`dishes.js` was generated from the dish list in `smartplate-ai.html`. If you
add or edit dishes on the front end, update `dishes.js` to match (or ask me
to regenerate it) so the planner only ever recommends real dishes on your
site.

`/api/shopping-assistant` is a related route: it takes the visitor's
current shopping list plus a free-text question (substitutions, quantities
for a crowd, how to organize a shop) and answers it with Claude. The front
end gates this to Plus members.

## 5. The cookbook ebook

`assets/smartplate-ai-cookbook.pdf` is the downloadable ebook — built from
the same recipe catalog, plus written sections on cooking methods, food
preservation, serving, and nutrition basics (see `ebook/build_ebook.py` at
the project root if you want to regenerate it after editing recipes).

`POST /api/billing/ebook-checkout` creates a one-time Stripe Checkout
session for it (see the Stripe section above for the price ID). Once
Stripe's webhook confirms payment, the buyer's account is marked
`ownsEbook: true`. `GET /api/ebook/download` then serves the file, but only
to a signed-in user whose account has that flag — so the PDF itself is
never reachable without paying first.

## 6. Deploying

Any Node host works — [Render](https://render.com),
[Railway](https://railway.app), [Fly.io](https://fly.io), or a small VPS.
General steps:

1. Push this `planner-api` folder to its own git repository.
2. Create a new Node web service pointed at it, with start command
   `npm start`.
3. Add all the variables from `.env` as environment variables in the
   host's dashboard — never commit `.env` itself.
4. Once deployed, update `API_BASE` in `smartplate-ai.html` to the
   deployed URL, and update `ALLOWED_ORIGINS` in your environment
   variables to include wherever the HTML file is actually hosted.
5. Update the Flutterwave webhook URL (in their Dashboard) and
   `CHECKOUT_SUCCESS_URL` / `EBOOK_SUCCESS_URL` to point at the deployed
   site.

## 7. Password reset emails

`/api/auth/forgot-password` and `/api/auth/reset-password` are both
implemented, but no email provider is wired up yet — `sendResetEmail()` in
`server.js` just logs the reset link to the server console, which is
enough to test the whole flow yourself end to end.

Before real users rely on this, pick an email API (Resend, Postmark,
SendGrid, AWS SES all work well) and replace the body of
`sendResetEmail()` with a real call — there's a commented example for
Resend right there in the function to start from. Set `SITE_URL` in
`.env` to your real site address so the link in the email points
somewhere real.

## 8. Error monitoring

Set `SENTRY_DSN` in `.env` and run `npm install` (it's already in
`package.json`) to have server errors reported to
[Sentry](https://sentry.io) automatically — planner/assistant failures,
unhandled exceptions, the works. Leave it blank and everything still logs
to the console exactly as before; monitoring is purely additive.

## 9. Analytics and cookie consent

The front end (`smartplate-ai.html`) has a cookie-free analytics hook
built in using [Plausible](https://plausible.io) — set `ANALYTICS_DOMAIN`
near the top of its `<script>` to your site's domain once you've created
a Plausible site for it. A simple "necessary only / accept analytics"
banner is shown on first visit; analytics only loads after someone
accepts. Leave `ANALYTICS_DOMAIN` blank to skip analytics (and the
banner) entirely.

## Before this handles real money or real user data

- Swap the JSON-file "database" (`data/db.json`) for a real database —
  Postgres via [Supabase](https://supabase.com) is a good, low-effort fit
  and gives you hosted auth too, if you'd rather not manage passwords
  yourself.
- Add rate limiting on `/api/auth/*` to slow down password-guessing.
- Review Flutterwave's Know-Your-Customer and tax requirements for the
  countries you plan to sell into.
