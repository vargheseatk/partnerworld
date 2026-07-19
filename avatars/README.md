# 📸 Avatar Photos — Drop your images here

Put each girl's portrait photo in **this folder** using the exact filenames below.
Until a real photo is added, the site automatically shows an elegant **gold AI-silhouette placeholder**, so nothing ever looks broken on camera.

## Naming convention (must match exactly — all lowercase, `.jpg`)

| Character      | Filename to use     |
| -------------- | ------------------- |
| Laila          | `laila.jpg`         |
| Priyamvada     | `priyamvada.jpg`    |
| Amala          | `amala.jpg`         |
| Esther         | `esther.jpg`        |
| Anna           | `anna.jpg`          |
| Riya Shibu     | `riya.jpg`          |

## Image guidelines (for the most premium look)

- **Orientation:** Portrait (vertical)
- **Aspect ratio:** 4:5 (the cards crop to this)
- **Recommended size:** ~800 × 1000 px or larger
- **Format:** `.jpg` (keep the filename lowercase)
- **Framing:** Face centered, head-and-shoulders, soft/dark background works best with the gold theme
- **Tip:** Slightly warm / golden-lit photos blend beautifully with the UI

## How it works

Each card loads `avatars/<name>.jpg`. If the file isn't there yet, it falls back to a generated golden silhouette with the character's initial. Just drop the real `.jpg` in and refresh — the photo appears instantly, no code changes needed.

> Want a different filename? It's set in `assets/js/main.js` inside the `AVATARS` list (the `id` field). But the names above already match, so you shouldn't need to touch anything.
