# Portfolio Website

Personal portfolio for Loukik Naik. Live at `loukik.dev`.

## Tech Stack

- **Frontend:** React 18 (CRA), Tailwind CSS 3.4, Framer Motion, React Router v7
- **Backend:** Cloudflare Worker with KV (cache) + D1 (analytics SQLite database)
- **Deployment:** GitHub Pages (frontend, auto-deploys on push to `main`), Cloudflare Workers (API, manual deploy)

## Project Structure

```
src/
  App.js              — Router (/, /blog, /resume, /analytics) + RouteTracker
  index.css           — Global styles, glassmorphism, Leaflet popup overrides
  context/ThemeContext.js — Dark/light mode (class-based, localStorage)
  utils/analytics.js  — trackPageView(), trackProjectClick() fire-and-forget POSTs
  components/
    Hero.js           — Landing, typewriter, GitHub contribution heatmap
    About.js          — Experience/education timeline
    Recommendations.js — Auto-scroll carousel (pauses off-screen via IntersectionObserver)
    Projects.js       — Project cards with click tracking on GitHub/Live links
    Skills.js         — Technology badges
    Contact.js        — Email form (EmailJS)
    Blog.js           — Medium/YouTube links
    Resume.js         — PDF viewer
    Analytics.js      — Password-protected dashboard (hidden, not in nav)
    Header.js         — Nav bar, dark mode toggle
    Footer.js         — Copyright, socials
worker/
  src/index.js        — Worker: GitHub stats + analytics endpoints
  src/__tests__/worker.test.js — Vitest integration tests (19 tests)
  wrangler.toml       — KV + D1 bindings
  schema.sql          — D1 schema (events table with location columns)
  vitest.config.js    — Test config
```

## Commands

### Frontend
```bash
npm start             # Dev server (port 3000)
npm run build         # Production build
npm run deploy        # Deploy to GitHub Pages
```

### Worker
```bash
cd worker
npm test              # Run 19 integration tests (always run before deploying)
npm run dev            # Local dev server
npm run deploy         # Deploy to Cloudflare
npx wrangler d1 execute portfolio-analytics --remote --file=./schema.sql   # Apply schema
npx wrangler d1 execute portfolio-analytics --remote --command "ALTER TABLE events ADD COLUMN foo TEXT"  # Ad-hoc migration
npx wrangler secret put SECRET_NAME   # Set a Worker secret
```

## Worker API

URL: `https://api.loukik.dev`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/github-stats` | GET | No | GitHub profile + contribution calendar (KV cached 1hr) |
| `/api/analytics/event` | POST | No | Track page views + project clicks → D1. Filters bots. Captures city/region/lat/lng from Cloudflare headers. |
| `/api/analytics/login` | POST | No | Returns HMAC-signed token (24hr expiry) |
| `/api/analytics/data` | GET | Bearer token | Paginated analytics: visitors, project clicks, countries, locations, daily trend, events. Params: `?page=1&pageSize=10` (max 50) |

Secrets (via `wrangler secret put`): `GITHUB_TOKEN`, `ANALYTICS_USERNAME`, `ANALYTICS_PASSWORD`, `AUTH_SECRET`

## Key Patterns

- **Glassmorphism:** `.glass` / `.glass-strong` for containers, `.text-on-glass` / `.text-on-glass-muted` for text.
- **Dark mode:** `useTheme()` hook, Tailwind `dark:` variants, `darkMode: 'class'`.
- **Animations:** Framer Motion variants with `initial="hidden"` + `whileInView="visible"` + `viewport={{ once: true }}`.
- **Analytics tracking:** `src/utils/analytics.js` — fire-and-forget `fetch` with `keepalive: true`, debounced via sessionStorage.
- **Performance:** Background particles and glass cards use `translateZ(0)` for GPU compositing. Recommendations carousel pauses `requestAnimationFrame` when off-screen.

## Adding a New Page

1. Create component in `src/components/`
2. Add route in `App.js`
3. Add nav link in `Header.js` (`links` array with `isPage: true`) — skip for hidden pages

## Adding a New Project

Add to the `projects` array in `src/components/Projects.js`: `title`, `description`, `image` or `iframePreview`, `technologies[]`, `github?`, `live?`. Click tracking is automatic.

## Agent Guidelines

- Match glassmorphism aesthetic (glass classes, sky-400/cyan-400 accents, slate neutrals, rounded-2xl/3xl).
- Framer Motion for entrance animations. Tailwind for layout. Custom CSS only in `index.css`.
- Support dark mode. Responsive mobile-first (375px min).
- No new npm deps without approval. No `console.log` unless intentional.
- **Run `cd worker && npm test` before deploying Worker changes.**
- **Update this file** after structural changes. `AGENTS.md` is a symlink — both stay in sync.
