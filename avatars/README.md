# 📸 Avatar Photos — Drop your images here

Put each girl's portrait photo in **this folder** using the exact filenames below.
Until a real photo is added, the site automatically shows an elegant **gold AI-silhouette placeholder**, so nothing ever looks broken on camera.

## Naming convention (must match exactly — all lowercase)

`.jpg` and `.png` are both supported — use whichever you have, no conversion needed.
Names now display in **Malayalam** on the site; the filename stays the English slug below.

| Tier      | Display name    | Filename (.jpg or .png)              |
| --------- | ---------------- | ------------------------------------- |
| Premium+  | ശാന്തമ്മ (Shanthamma) | `shanthamma.jpg` / `shanthamma.png` |
| Premium+  | വാസന്തി (Vasanthi)     | `vasanthi.jpg` / `vasanthi.png`     |
| Premium+  | വേദ (Veda)            | `veda.jpg` / `veda.png`             |
| Premium   | റിയ ഷിബു (Riya Shibu) | `riya.jpg` / `riya.png`           |
| Premium   | എസ്തർ (Esther)        | `esther.jpg` / `esther.png`       |
| Premium   | മീര (Meera)           | `meera.jpg` / `meera.png`         |
| Modern    | അമല (Amala)           | `amala.jpg` / `amala.png`         |
| Modern    | കാവ്യ (Kavya)          | `kavya.jpg` / `kavya.png`         |
| Modern    | അന്ന (Anna)            | `anna.jpg` / `anna.png`           |
| Economy   | ലൈല (Laila)           | `laila.jpg` / `laila.png`         |
| Economy   | ദേവിക (Devika)         | `devika.jpg` / `devika.png`       |
| Economy   | പ്രിയംവദ (Priyamvada)  | `priyamvada.jpg` / `priyamvada.png` |

### Dashboard account users (Sachin & Basil)

The dashboard's "Users" panel also uses this same jpg → png → silhouette fallback. Drop in `sachin.jpg`/`sachin.png` and `basil.jpg`/`basil.png` whenever you have real photos and they'll appear automatically in the story-style circles — no code changes needed.

### Video portrait (partner-video.html)

[`partner-video.html`](../partner-video.html) is a duplicate of the Configure Partner page that plays a **video** in the portrait frame instead of a still photo — e.g. `partner-video.html?a=priyamvada`. It looks for `avatars/<id>.mp4` first, then `avatars/<Id>.mp4` (capitalized first letter — GitHub Pages is case-sensitive, so this exact casing matters), then falls back to the normal still-image chain if no video exists. Priyamvada's is already in place as `Priyamvada.mp4`. The video autoplays muted and loops, matching the site's ambient "live" feel.

## Image guidelines (for the most premium look)

- **Orientation:** Square-ish works best now — catalogue cards crop to **1:1**
- **Recommended size:** ~800 × 800 px or larger
- **Format:** `.jpg` or `.png` (keep the filename lowercase)
- **Framing:** Face centered, head-and-shoulders, soft/dark background works best with the gold theme
- **Tip:** Slightly warm / golden-lit photos blend beautifully with the UI

## How it works

Each card first looks for `avatars/<name>.jpg`, then `avatars/<name>.png`, then falls back to a generated golden silhouette with the character's initial. Just drop the real photo in and refresh — it appears instantly, no code changes needed. If both a `.jpg` and `.png` exist for the same name, the `.jpg` wins.

> Want a different filename? It's set in `assets/js/main.js` inside the `AVATARS` list (the `id` field). But the names above already match, so you shouldn't need to touch anything.
