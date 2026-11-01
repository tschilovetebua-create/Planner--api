#!/usr/bin/env python3
"""Builds the SmartPlate AI Cookbook PDF from dishes.json (exported from
planner-api/dishes.js) plus original written sections on cooking methods,
preservation, and serving. Run: python3 build_ebook.py
"""
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                 Table, TableStyle, HRFlowable, ListFlowable, ListItem)
from reportlab.pdfgen import canvas as canvas_mod

FOREST = colors.HexColor('#0E3B2E')
FOREST_DEEP = colors.HexColor('#0A2B21')
LEAF = colors.HexColor('#34B36B')
INK = colors.HexColor('#12241D')
MUTED = colors.HexColor('#4C6357')
LINE = colors.HexColor('#D9E5DB')

with open('/tmp/dishes.json') as f:
    DISHES = json.load(f)

REGION_ORDER = ['African', 'Asian', 'European', 'American', 'Latin American', 'Middle Eastern', 'Oceania']

styles = getSampleStyleSheet()
styles.add(ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=40, leading=44,
                           textColor=colors.white, alignment=TA_CENTER, spaceAfter=6))
styles.add(ParagraphStyle('CoverSub', fontName='Helvetica-Bold', fontSize=18, leading=22,
                           textColor=colors.HexColor('#D6EFDF'), alignment=TA_CENTER, spaceAfter=18))
styles.add(ParagraphStyle('CoverTag', fontName='Helvetica', fontSize=12, leading=17,
                           textColor=colors.HexColor('#B9D3C6'), alignment=TA_CENTER))
styles.add(ParagraphStyle('CoverBadge', fontName='Helvetica-Bold', fontSize=13, leading=16,
                           textColor=FOREST_DEEP, alignment=TA_CENTER))
styles.add(ParagraphStyle('H1', fontName='Helvetica-Bold', fontSize=22, leading=26,
                           textColor=FOREST, spaceBefore=4, spaceAfter=14))
styles.add(ParagraphStyle('H2Region', fontName='Helvetica-Bold', fontSize=17, leading=20,
                           textColor=colors.white, spaceBefore=0, spaceAfter=0))
styles.add(ParagraphStyle('DishName', fontName='Helvetica-Bold', fontSize=14.5, leading=18,
                           textColor=FOREST, spaceBefore=0, spaceAfter=2))
styles.add(ParagraphStyle('DishMeta', fontName='Helvetica-Oblique', fontSize=9.5, leading=13,
                           textColor=MUTED, spaceAfter=8))
styles.add(ParagraphStyle('SubHead', fontName='Helvetica-Bold', fontSize=11.5, leading=15,
                           textColor=FOREST, spaceBefore=2, spaceAfter=4))
styles.add(ParagraphStyle('Body', fontName='Helvetica', fontSize=10, leading=15,
                           textColor=INK, spaceAfter=8, alignment=TA_LEFT))
styles.add(ParagraphStyle('Item', fontName='Helvetica', fontSize=9.7, leading=14, textColor=INK))
styles.add(ParagraphStyle('TOCEntry', fontName='Helvetica', fontSize=11, leading=20, textColor=INK))
styles.add(ParagraphStyle('Caption', fontName='Helvetica-Oblique', fontSize=8.5, leading=12, textColor=MUTED))

def h_rule(color=LINE, thickness=0.6, space_before=4, space_after=10):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceBefore=space_before, spaceAfter=space_after)

def region_band(title):
    t = Table([[Paragraph(title, styles['H2Region'])]], colWidths=[170 * mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), FOREST),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ]))
    return t

def dish_block(d):
    flow = []
    flow.append(Paragraph(f"{d['name']} <font color='#4C6357'>&middot; {d['country']}</font>", styles['DishName']))
    flow.append(Paragraph(f"{d['tag']} &nbsp;|&nbsp; {d['time']} &nbsp;|&nbsp; {d['level']}", styles['DishMeta']))
    flow.append(Paragraph('Ingredients', styles['SubHead']))
    ing_items = [ListItem(Paragraph(i, styles['Item']), leftIndent=10, bulletColor=LEAF) for i in d['ing']]
    flow.append(ListFlowable(ing_items, bulletType='bullet', start='circle', bulletFontSize=5, leftIndent=12))
    flow.append(Spacer(1, 4))
    flow.append(Paragraph('Method', styles['SubHead']))
    step_items = [ListItem(Paragraph(s, styles['Item']), leftIndent=10) for s in d['steps']]
    flow.append(ListFlowable(step_items, bulletType='1', leftIndent=14, start=1))
    flow.append(Spacer(1, 16))
    return flow

# ---------------------------------------------------------------- content --

story = [PageBreak()]

story.append(Paragraph('Welcome', styles['H1']))
story.append(Paragraph(
    "This cookbook collects recipes from every region SmartPlate AI covers &mdash; Africa, Asia, Europe, "
    "the Americas, the Middle East, and Oceania &mdash; alongside the everyday kitchen knowledge that makes "
    "a recipe actually work: how the main cooking methods differ, how to keep food good for longer, and how "
    "to put a plate together so it looks like it does in the photo.", styles['Body']))
story.append(Paragraph(
    "Use it however suits you: read it front to back, jump straight to a region you're curious about, or "
    "keep it open next to your stove as a reference for cooking terms you run into elsewhere.", styles['Body']))
story.append(Spacer(1, 10))
story.append(h_rule())
story.append(Paragraph('Contents', styles['H1']))
toc_lines = [
    'Cooking Methods, Explained',
    'Food Preservation at Home',
    'Serving and Plating',
    'Nutrition Basics and Substitutions',
] + [f"Recipes &mdash; {r}" for r in REGION_ORDER]
for line in toc_lines:
    story.append(Paragraph('&bull;&nbsp;&nbsp;' + line, styles['TOCEntry']))
story.append(PageBreak())

# ---- Cooking methods ----
story.append(Paragraph('Cooking Methods, Explained', styles['H1']))
methods = [
    ("Grilling", "Cooking directly over high, dry heat. Best for cuts that are already tender and won't take "
     "long &mdash; kebabs, steaks, flatbreads. The high heat sears the outside quickly, so pat food dry first "
     "and don't crowd the grill, or you'll steam instead of sear."),
    ("Roasting", "Cooking uncovered in an oven, using dry heat that circulates around the food. Suits larger "
     "cuts and whole vegetables. A hot oven at the start gives good color; many recipes then lower the heat "
     "so the inside cooks through without the outside burning."),
    ("Braising and stewing", "Searing food first, then cooking it slowly, mostly submerged in liquid, in a "
     "covered pot. This is how tougher, well-worked cuts (shoulder, shank, oxtail) turn tender: the collagen "
     "breaks down over time into gelatin, which is what gives braises their silky sauce."),
    ("Stir-frying", "Very fast cooking over very high heat, with constant movement. Everything needs to be cut "
     "small and prepped before you start, since there's no time to chop once the pan is hot. Cook in batches "
     "if you're making a lot &mdash; an overloaded pan drops in temperature and steams the food instead."),
    ("Steaming", "Cooking with the vapor from boiling water, without submerging the food in it. Gentler than "
     "boiling, so it suits delicate things like fish, dumplings, and vegetables where you want to keep texture "
     "and nutrients rather than leach them into cooking water."),
    ("Simmering", "Cooking in liquid just below a boil, with small, lazy bubbles rather than a rolling boil. "
     "Most soups, stocks, and sauces want a simmer, not a boil &mdash; a hard boil can make proteins tough "
     "and break emulsified sauces."),
    ("Deep and shallow frying", "Cooking in hot oil, either fully submerged (deep-frying) or in a shallow pool "
     "(pan-frying). Oil temperature matters more than time: too cool and food absorbs oil and turns greasy; "
     "too hot and the outside burns before the inside cooks."),
    ("Sautéing", "Cooking quickly in a small amount of fat over fairly high heat, tossing or stirring "
     "occasionally rather than constantly. A good middle ground between stir-frying's speed and braising's "
     "patience &mdash; most \u201csoften the onions\u201d steps in this book are a sauté."),
]
for name, text in methods:
    story.append(Paragraph(name, styles['SubHead']))
    story.append(Paragraph(text, styles['Body']))
story.append(PageBreak())

# ---- Preservation ----
story.append(Paragraph('Food Preservation at Home', styles['H1']))
story.append(Paragraph(
    "Preserving food is really about controlling the conditions bacteria, mould, and enzymes need to spoil "
    "it &mdash; moisture, warmth, oxygen, and time. Each method below removes or limits one of those.",
    styles['Body']))
preserve = [
    ("Freezing", "Slows enzyme activity and stops microbial growth almost entirely, without changing flavor "
     "much. Freeze food quickly and in flat, well-sealed portions to limit ice crystals, which are what cause "
     "'freezer texture' on thawing. Most cooked dishes in this book freeze well for one to three months."),
    ("Drying and dehydrating", "Removes the moisture microbes need to grow. Works well for fruit, herbs, and "
     "thinly sliced meat (jerky). Food should be dry enough that it doesn't feel damp anywhere, then stored "
     "airtight, away from light, or it will reabsorb moisture."),
    ("Pickling", "Uses acid (usually vinegar) to create an environment most spoilage bacteria can't survive "
     "in. Quick pickles kept in the fridge are the easiest and safest way to try this at home &mdash; they "
     "don't need any special equipment, just an acidic brine strong enough to keep the vegetables crisp and "
     "safe for a few weeks."),
    ("Fermenting", "Relies on encouraging beneficial bacteria or yeast (as in sauerkraut, kimchi, or yogurt) "
     "to outcompete the organisms that spoil food, often by producing acid themselves. Keep vegetables fully "
     "submerged under their brine while fermenting, since anything exposed to air is prone to mould."),
    ("Canning and bottling", "Uses heat to destroy microorganisms, then seals food in an airtight jar so "
     "nothing new gets in. This is the one method where getting it wrong has serious consequences &mdash; "
     "low-acid foods (most vegetables, meat, and stock) require pressure canning at a specific time and "
     "pressure to be safe, not just a boiling water bath. Don't improvise processing times: use a current, "
     "tested recipe from a source such as your national or local agricultural extension service, and adjust "
     "for your altitude as instructed."),
    ("Curing and smoking", "Curing draws moisture out with salt (and often sugar and nitrates), while smoking "
     "adds both flavor and a mild preservative effect from the smoke itself. Traditional cured and smoked "
     "meats are a deep subject with real food-safety considerations around salt ratios and temperature; "
     "if you're new to it, start from a tested recipe rather than working from ratios you've guessed at."),
]
for name, text in preserve:
    story.append(Paragraph(name, styles['SubHead']))
    story.append(Paragraph(text, styles['Body']))
story.append(Paragraph(
    "A general rule across all of these: when in doubt, throw it out. No method of preservation makes food "
    "safe to eat if it smells off, looks discolored, or the container is bulging or leaking.", styles['Caption']))
story.append(PageBreak())

# ---- Serving ----
story.append(Paragraph('Serving and Plating', styles['H1']))
serve = [
    ("Warm the plate, not just the food", "A hot dish loses heat fast on a cold plate. Warming plates in a low "
     "oven or under hot tap water (then drying them) keeps food at the right temperature for longer."),
    ("Sauce goes under or around, not over", "Spooning sauce onto the plate first, then setting the protein or "
     "starch on top or beside it, keeps textures &mdash; a crisp skin, a crusted sear &mdash; from going "
     "soggy before it reaches the table."),
    ("Height and odd numbers", "Stacking or leaning components, rather than laying everything flat, makes a "
     "plate look more considered. Grouping garnishes in ones or threes tends to look more natural than in "
     "twos or fours."),
    ("Garnish should be edible and relevant", "A herb sprig or a scattering of the dish's own ingredients "
     "(the citrus it was cooked with, the nuts in a garnish) does more work than a decoration with no "
     "connection to what's on the plate."),
    ("Wipe the rim", "The simplest, highest-impact step: a clean plate edge, free of drips and fingerprints, "
     "instantly reads as more polished, no matter how the food itself is arranged."),
]
for name, text in serve:
    story.append(Paragraph(name, styles['SubHead']))
    story.append(Paragraph(text, styles['Body']))
story.append(PageBreak())

# ---- Nutrition basics ----
story.append(Paragraph('Nutrition Basics and Substitutions', styles['H1']))
story.append(Paragraph(
    "None of this replaces advice from a doctor or dietitian, especially if you're managing a specific "
    "health condition &mdash; but a few general swaps come up often enough across these recipes to be worth "
    "keeping in mind.", styles['Body']))
nut = [
    ("Lowering sodium", "Salt often does double duty as both seasoning and preservative in a recipe. Cutting "
     "it back usually needs another source of flavor to compensate &mdash; acid (lemon, vinegar), fresh "
     "herbs, or aromatics like garlic and ginger, rather than salt substitutes alone."),
    ("Reducing saturated fat", "Swapping butter or cream for olive oil or a lower-fat dairy alternative works "
     "in most sautéed or braised dishes; it changes the flavor slightly but rarely the technique."),
    ("Lower-carb swaps", "Cauliflower rice, shirataki or zucchini noodles, and lettuce wraps in place of rice, "
     "wheat noodles, or bread carry the same sauces and toppings in this book's recipes without the starch."),
    ("Gluten-free swaps", "Rice, corn, and most legumes are naturally gluten-free; the main things to watch "
     "for are wheat-based thickeners (a roux), breadcrumbs, and flatbreads, which usually have a gluten-free "
     "alternative you can swap in directly."),
    ("Vegetarian and vegan swaps", "Firm tofu, tempeh, and mushrooms (especially oyster or king oyster "
     "mushrooms) hold up well in dishes built around braising or grilling a piece of meat, since they take on "
     "marinades and sauces in a similar way."),
]
for name, text in nut:
    story.append(Paragraph(name, styles['SubHead']))
    story.append(Paragraph(text, styles['Body']))
story.append(PageBreak())

# ---- Recipes by region ----
by_region = {}
for d in DISHES:
    by_region.setdefault(d['region'], []).append(d)

for region in REGION_ORDER:
    dishes = by_region.get(region, [])
    if not dishes:
        continue
    story.append(region_band(f"{region} Recipes"))
    story.append(Spacer(1, 14))
    for d in dishes:
        story.extend(dish_block(d))
    story.append(PageBreak())

# ---------------------------------------------------------------- canvas ---

def draw_cover(c: canvas_mod.Canvas, doc):
    w, h = A4
    c.setFillColor(FOREST)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    # simple plate/fork/leaf mark
    cx, cy = w / 2, h - 70 * mm
    c.setStrokeColor(colors.white)
    c.setLineWidth(2.4)
    c.circle(cx, cy, 20 * mm, fill=0, stroke=1)
    c.setFillColor(LEAF)
    c.setStrokeColor(LEAF)
    p = c.beginPath()
    p.moveTo(cx - 11 * mm, cy + 6 * mm)
    p.curveTo(cx - 11 * mm, cy - 9 * mm, cx + 8 * mm, cy - 14 * mm, cx + 8 * mm, cy - 14 * mm)
    p.curveTo(cx + 8 * mm, cy - 4 * mm, cx - 2 * mm, cy + 8 * mm, cx - 11 * mm, cy + 6 * mm)
    c.drawPath(p, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont('Helvetica-Bold', 40)
    c.drawCentredString(w / 2, h - 105 * mm, 'SmartPlate AI')
    c.setFillColor(colors.HexColor('#D6EFDF'))
    c.setFont('Helvetica-Bold', 18)
    c.drawCentredString(w / 2, h - 118 * mm, 'THE GLOBAL CUISINE COOKBOOK')
    c.setFont('Helvetica', 12)
    c.setFillColor(colors.HexColor('#B9D3C6'))
    c.drawCentredString(w / 2, h - 128 * mm, 'Real Recipes  \u00b7  Healthy Choices  \u00b7  A World of Flavors')
    # badge
    bw, bh = 78 * mm, 20 * mm
    bx, by = w / 2 - bw / 2, 32 * mm
    c.setFillColor(LEAF)
    c.roundRect(bx, by, bw, bh, 6, fill=1, stroke=0)
    c.setFillColor(FOREST_DEEP)
    c.setFont('Helvetica-Bold', 13)
    c.drawCentredString(w / 2, by + bh / 2 - 4, f"{len(DISHES)}+ INTERNATIONAL RECIPES")
    c.setFillColor(colors.HexColor('#B9D3C6'))
    c.setFont('Helvetica', 9)
    c.drawCentredString(w / 2, 18 * mm, 'From Africa to Asia \u00b7 Europe to the Americas \u00b7 All in One Book')


def draw_footer(c: canvas_mod.Canvas, doc):
    w, h = A4
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(20 * mm, 15 * mm, w - 20 * mm, 15 * mm)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 8)
    c.drawString(20 * mm, 10 * mm, 'SmartPlate AI \u00b7 The Global Cuisine Cookbook')
    c.drawRightString(w - 20 * mm, 10 * mm, str(doc.page))


doc = SimpleDocTemplate(
    '/mnt/user-data/outputs/ebook/smartplate-ai-cookbook.pdf',
    pagesize=A4,
    topMargin=20 * mm, bottomMargin=22 * mm, leftMargin=20 * mm, rightMargin=20 * mm,
    title='SmartPlate AI: The Global Cuisine Cookbook',
    author='SmartPlate AI',
)
doc.build(story, onFirstPage=draw_cover, onLaterPages=draw_footer)
print('done')
