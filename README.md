# PartnerWorld 💛

A cinematic web app interface for a **fictional** luxury AI-companion SaaS platform — built as a film prop / set dressing. "Apple designed ChatGPT for relationships."

> ⚠️ Fiction. All avatars, personalities, prices and statistics are creative fiction for a short film. This is not a real product or dating service.

## Screens

| Page | File | What it shows |
| --- | --- | --- |
| Landing | `index.html` | Hero, floating gold particles, live preview |
| Partners | `catalogue.html` | 9 companions across Premium / Modern / Economy tiers |
| Configure Partner | `partner.html` | Trait matrix + difficulty 0.3/10 |
| Dashboard | `dashboard.html` | Subscription/token meter, account users, live stats, mood |
| Analytics | `analytics.html` | Golden glowing graphs & radar |
| Billing | `billing.html` | Itemised usage (base fee, video = 50% of total) + Pay Now |
| Support | `support.html` | Concierge & FAQ |

A fixed **left sidebar** and **top bar** stay in place while the page content scrolls. A slide-in **golden notifications panel** is available on every page (bell icon, top right). Clicking a partner card opens a **spinning reveal popup** before continuing.

## Adding avatar photos

See [`avatars/README.md`](avatars/README.md) for the full name/tier/filename table (names display in Malayalam; filenames stay English slugs, e.g. `priyamvada.jpg`). Before a photo is added, an elegant gold silhouette stands in automatically.

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
