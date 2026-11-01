# AI meal photos

Generates one AI food photo per dish and saves it to `../images/<dish-id>.jpg`
— the exact location and naming `smartplate-ai.html` already looks for, so
photos appear on the site automatically once they exist, with no code changes.

## Why this runs separately from the website

Generating an image costs money per call and needs a real API key, so it has
to run somewhere with your own credentials — not inside the website itself,
and not inside the chat that built this project (which has no internet
access or API key of its own). Run it once on your own computer or server.

## Setup

```bash
cd image-gen
pip install requests
export OPENAI_API_KEY=sk-...
```

## Run it

```bash
python3 generate_images.py                     # generate every missing photo
python3 generate_images.py --overwrite          # regenerate every photo (re-billed)
python3 generate_images.py --only sushi,tacos   # just specific dishes
```

`dishes.json` lists the 31 dishes (id, name, country, one-line description)
used to build each prompt. If you add a dish on the front end later, add a
matching entry here (or ask me to regenerate it) and re-run the script.

## About the model

The script uses `gpt-image-1.5` at the time of writing. Image-generation
models get retired and replaced more often than most APIs — if the script
starts failing, check
[OpenAI's current image model docs](https://platform.openai.com/docs/guides/images)
and update the `MODEL` constant near the top of `generate_images.py`.

Prefer a different image provider (Stability AI, Google, etc.)? The script
is short and self-contained — swap out `generate_one()` for that provider's
API call and everything else (dish list, prompts, file naming, skip/overwrite
logic) stays the same.
