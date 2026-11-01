#!/usr/bin/env python3
"""
Generates one AI food photo per dish for the SmartPlate AI website, and
saves each one as images/<dish-id>.jpg — exactly where smartplate-ai.html
already looks for it. Run this once (and again any time you add dishes).

Setup
-----
    pip install requests
    export OPENAI_API_KEY=sk-...

Usage
-----
    python3 generate_images.py                # generate every missing image
    python3 generate_images.py --overwrite     # regenerate every image
    python3 generate_images.py --only sushi,tacos   # just these dishes

Notes
-----
- Uses OpenAI's image generation API. The model name below
  (gpt-image-1.5 at time of writing) changes over time as providers ship
  new models — check https://platform.openai.com/docs/guides/images for
  the current model name and swap MODEL below if this one has been
  retired.
- Each image costs a small amount on your OpenAI account. Generating all
  31 dishes once is inexpensive; re-running with --overwrite regenerates
  (and re-bills) every image.
- This intentionally does NOT run inside the chat/build environment: it
  needs your own OpenAI API key and outbound internet access, neither of
  which the assistant that wrote this file has.
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.request
import urllib.error

MODEL = "gpt-image-1.5"       # swap to "gpt-image-1-mini" for a cheaper, lower-quality run
SIZE = "1024x1024"
OUTPUT_FORMAT = "jpeg"
API_URL = "https://api.openai.com/v1/images/generations"

HERE = os.path.dirname(os.path.abspath(__file__))
DISHES_PATH = os.path.join(HERE, "dishes.json")
IMAGES_DIR = os.path.normpath(os.path.join(HERE, "..", "images"))


def load_dishes():
    with open(DISHES_PATH) as f:
        return json.load(f)


def build_prompt(dish):
    return (
        f"Professional food photography of {dish['name']}, a {dish['country']} dish. "
        f"Style: {dish['tag']}. Shot from a 45-degree angle on a simple ceramic plate, "
        "natural window light, shallow depth of field, garnished appropriately, "
        "no text or watermark, no hands or cutlery in frame, appetizing and realistic."
    )


def generate_one(api_key, dish):
    body = json.dumps({
        "model": MODEL,
        "prompt": build_prompt(dish),
        "size": SIZE,
        "output_format": OUTPUT_FORMAT,
        "n": 1,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    b64 = data["data"][0]["b64_json"]
    return base64.b64decode(b64)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--overwrite", action="store_true", help="Regenerate images that already exist")
    parser.add_argument("--only", help="Comma-separated dish ids to generate, e.g. sushi,tacos")
    args = parser.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Set OPENAI_API_KEY first, e.g.:\n  export OPENAI_API_KEY=sk-...", file=sys.stderr)
        sys.exit(1)

    os.makedirs(IMAGES_DIR, exist_ok=True)
    dishes = load_dishes()
    if args.only:
        wanted = set(x.strip() for x in args.only.split(","))
        dishes = [d for d in dishes if d["id"] in wanted]
        missing = wanted - {d["id"] for d in dishes}
        if missing:
            print(f"Unknown dish id(s), skipping: {', '.join(sorted(missing))}", file=sys.stderr)

    made, skipped, failed = 0, 0, 0
    for i, dish in enumerate(dishes, 1):
        out_path = os.path.join(IMAGES_DIR, f"{dish['id']}.jpg")
        if os.path.exists(out_path) and not args.overwrite:
            print(f"[{i}/{len(dishes)}] {dish['id']}: already exists, skipping (use --overwrite to redo)")
            skipped += 1
            continue
        print(f"[{i}/{len(dishes)}] {dish['id']}: generating…", end=" ", flush=True)
        try:
            img_bytes = generate_one(api_key, dish)
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            print("done")
            made += 1
        except urllib.error.HTTPError as e:
            print(f"FAILED ({e.code}): {e.read().decode('utf-8', 'ignore')[:200]}")
            failed += 1
        except Exception as e:
            print(f"FAILED: {e}")
            failed += 1
        time.sleep(1)  # gentle pacing between requests

    print(f"\nDone. {made} generated, {skipped} skipped, {failed} failed.")
    print(f"Images saved to: {IMAGES_DIR}")


if __name__ == "__main__":
    main()
