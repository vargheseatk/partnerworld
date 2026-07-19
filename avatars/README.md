# 📸 Avatar Photos — Drop your images here

Put each girl's portrait photo in **this folder** using the exact filenames below.
Until a real photo is added, the site automatically shows an elegant **gold AI-silhouette placeholder**, so nothing ever looks broken on camera.

## Naming convention (must match exactly — all lowercase)

`.jpg` and `.png` are both supported — use whichever you have, no conversion needed.
Names now display in **Malayalam** on the site; the filename stays the English slug below.

| Tier      | Display name    | Filename (.jpg or .png)              |
| --------- | ---------------- | ------------------------------------- |
| Premium+  | ശാന്തമ്മ (Shanthamma) | `shanthamma.jpg` / `shanthamma.png` *(new)* |
| Premium+  | വസന്തി (Vasanthi)     | `vasanthi.jpg` / `vasanthi.png` *(new)*     |
| Premium+  | വേദ (Veda)            | `veda.jpg` / `veda.png` *(new)*             |
| Premium   | റിയ ഷിബു (Riya Shibu) | `riya.jpg` / `riya.png`           |
| Premium   | എസ്തർ (Esther)        | `esther.jpg` / `esther.png`       |
| Premium   | മീര (Meera)           | `meera.jpg` / `meera.png` *(new)* |
| Modern    | അമല (Amala)           | `amala.jpg` / `amala.png`         |
| Modern    | കാവ്യ (Kavya)          | `kavya.jpg` / `kavya.png` *(new)* |
| Modern    | ആന്ന (Anna)            | `anna.jpg` / `anna.png`           |
| Economy   | ലൈല (Laila)           | `laila.jpg` / `laila.png`         |
| Economy   | ദേവിക (Devika)         | `devika.jpg` / `devika.png` *(new)* |
| Economy   | പ്രിയംവദ (Priyamvada)  | `priyamvada.jpg` / `priyamvada.png` |

*(new)* rows have no photo yet — they currently show the gold silhouette placeholder.

### Dashboard account users (Sachin & Basil)

The dashboard's "Users" panel also uses this same jpg → png → silhouette fallback. Drop in `sachin.jpg`/`sachin.png` and `basil.jpg`/`basil.png` whenever you have real photos and they'll appear automatically in the story-style circles — no code changes needed.

## Image guidelines (for the most premium look)

- **Orientation:** Square-ish works best now — catalogue cards crop to **1:1**
- **Recommended size:** ~800 × 800 px or larger
- **Format:** `.jpg` or `.png` (keep the filename lowercase)
- **Framing:** Face centered, head-and-shoulders, soft/dark background works best with the gold theme
- **Tip:** Slightly warm / golden-lit photos blend beautifully with the UI

## How it works

Each card first looks for `avatars/<name>.jpg`, then `avatars/<name>.png`, then falls back to a generated golden silhouette with the character's initial. Just drop the real photo in and refresh — it appears instantly, no code changes needed. If both a `.jpg` and `.png` exist for the same name, the `.jpg` wins.

> Want a different filename? It's set in `assets/js/main.js` inside the `AVATARS` list (the `id` field). But the names above already match, so you shouldn't need to touch anything.
