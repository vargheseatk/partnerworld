# PartnerWorld 💛

A cinematic web app interface for a **fictional** luxury AI-companion SaaS platform — built as a film prop / set dressing. "Apple designed ChatGPT for relationships."

> ⚠️ Fiction. All avatars, personalities, prices and statistics are creative fiction for a short film. This is not a real product or dating service.

## Screens

| Page | File | What it shows |
| --- | --- | --- |
| Landing | `index.html` | Hero, floating gold particles, live preview |
| Avatar Catalogue | `catalogue.html` | Grid of 6 companion cards |
| Configure Partner | `partner.html` | Priyamvada trait matrix + difficulty 0.3/10 |
| Dashboard | `dashboard.html` | After-purchase stats, mood, relationship score |
| Analytics | `analytics.html` | Golden glowing graphs & radar |
| Billing | `billing.html` | Usage charges + Pay Now |
| Support | `support.html` | Concierge & FAQ |

A slide-in **golden notifications panel** is available on every page (bell icon, top right).

## Adding avatar photos

See [`avatars/README.md`](avatars/README.md). Drop `laila.jpg`, `priyamvada.jpg`, `amala.jpg`, `esther.jpg`, `anna.jpg`, `riya.jpg` into the `avatars/` folder. Before you do, elegant gold silhouettes stand in automatically.

## Run locally

Just open `index.html` in a browser — no build step, no dependencies. (For particles/fonts to load flawlessly, a live server or GitHub Pages is ideal.)

## Publish to GitHub Pages

```bash
git init
git add .
git commit -m "PartnerWorld cinematic UI"
git branch -M main
git remote add origin https://github.com/<you>/partnerworld.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from branch → `main` / root → Save.**
Your live link appears at `https://<you>.github.io/partnerworld/` within a minute.

## Tech

Pure static HTML + CSS + vanilla JS. Canvas particle field, CSS glassmorphism, SVG charts. No frameworks, no build.

---

Design language: Black · White · Luxury Gold (`#F5C542`) · Champagne (`#E8C76A`). No blue, no purple, no neon.
