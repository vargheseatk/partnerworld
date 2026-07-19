# 📸 Avatar Photos — Drop your images here

Put each girl's portrait photo in **this folder** using the exact filenames below.
Until a real photo is added, the site automatically shows an elegant **gold AI-silhouette placeholder**, so nothing ever looks broken on camera.

## Naming convention (must match exactly — all lowercase)

`.jpg` and `.png` are both supported — use whichever you have, no conversion needed.

| Character      | Filename (.jpg or .png)        |
| -------------- | ------------------------------- |
| Laila          | `laila.jpg` / `laila.png`         |
| Priyamvada     | `priyamvada.jpg` / `priyamvada.png` |
| Amala          | `amala.jpg` / `amala.png`         |
| Esther         | `esther.jpg` / `esther.png`       |
| Anna           | `anna.jpg` / `anna.png`           |
| Riya Shibu     | `riya.jpg` / `riya.png`           |

## Image guidelines (for the most premium look)

- **Orientation:** Portrait (vertical)
- **Aspect ratio:** 4:5 (the cards crop to this)
- **Recommended size:** ~800 × 1000 px or larger
- **Format:** `.jpg` or `.png` (keep the filename lowercase)
- **Framing:** Face centered, head-and-shoulders, soft/dark background works best with the gold theme
- **Tip:** Slightly warm / golden-lit photos blend beautifully with the UI

## How it works

Each card first looks for `avatars/<name>.jpg`, then `avatars/<name>.png`, then falls back to a generated golden silhouette with the character's initial. Just drop the real photo in and refresh — it appears instantly, no code changes needed. If both a `.jpg` and `.png` exist for the same name, the `.jpg` wins.

> Want a different filename? It's set in `assets/js/main.js` inside the `AVATARS` list (the `id` field). But the names above already match, so you shouldn't need to touch anything.
