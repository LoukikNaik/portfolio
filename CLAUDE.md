# Portfolio Website

Personal portfolio for Loukik Naik. Live at `portfolio.loukik.dev`.

## Tech Stack

- **Framework:** React 18 (Create React App) — single-page app, client-side rendered
- **Styling:** Tailwind CSS 3.4 + custom glassmorphism classes in `src/index.css`
- **Animations:** Framer Motion
- **Routing:** React Router v7 (4 routes: `/`, `/blog`, `/resume`, `/analytics`)
- **Icons:** react-icons (FontAwesome set)
- **Email:** EmailJS (browser-side, no backend)
- **PDF:** react-pdf for resume viewer
- **Backend:** Cloudflare Worker (`worker/`) with KV cache + D1 database
- **Deployment:** GitHub Pages (frontend), Cloudflare Workers (API)

## Project Structure

```
src/
  App.js              — Router setup, 4 routes + RouteTracker for analytics
  index.js            — React DOM entry
  index.css           — Global styles, glassmorphism utilities, animations
  context/
    ThemeContext.js    — Dark/light mode (class-based, persisted in localStorage)
  utils/
    analytics.js      — trackPageView() and trackProjectClick() — fire-and-forget POSTs
  components/
    Header.js         — Fixed nav bar, dark mode toggle, mobile hamburger menu
    Hero.js           — Landing section, typewriter effect, profile image, GitHub heatmap
    About.js          — Experience/education timeline with expandable cards
    Recommendations.js — Auto-scrolling LinkedIn testimonial carousel
    Projects.js       — Project cards grid (with click tracking on GitHub/Live links)
    Skills.js         — Technology badges grid with icons
    Contact.js        — Email form (EmailJS integration)
    Blog.js           — Medium articles + YouTube video links
    Resume.js         — PDF viewer with download button
    Analytics.js      — Password-protected analytics dashboard (hidden, not in nav)
    TypeWriter.js     — Reusable typing/deleting text animation
    Footer.js         — Copyright, social links
worker/
  src/index.js        — Cloudflare Worker: GitHub stats, analytics event/login/data endpoints
  wrangler.toml       — Worker config with KV + D1 bindings
  schema.sql          — D1 database schema (events table)
  package.json        — Wrangler dev dependency
public/
  index.html          — Single HTML entry point
```

## Cloudflare Worker API

Worker URL: `https://portfolio-api.loukik.workers.dev`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/github-stats` | GET | No | GitHub profile + contribution data (cached 1hr in KV) |
| `/api/analytics/event` | POST | No | Track page views and project clicks (stored in D1) |
| `/api/analytics/login` | POST | No | Authenticate with username/password, returns HMAC token |
| `/api/analytics/data` | GET | Bearer token | Aggregated analytics data for dashboard |

Worker secrets (set via `wrangler secret put`): `GITHUB_TOKEN`, `ANALYTICS_USERNAME`, `ANALYTICS_PASSWORD`, `AUTH_SECRET`

Worker commands:
```bash
cd worker
npx wrangler dev          # Local dev
npx wrangler deploy       # Deploy to Cloudflare
npx wrangler d1 execute portfolio-analytics --remote --file=./schema.sql  # Apply schema
```

## Key Patterns

- **Cloudflare Worker backend.** GitHub stats cached in KV. Analytics stored in D1 (SQLite). Auth via HMAC-signed tokens.
- **Event tracking.** `src/utils/analytics.js` exports `trackPageView` and `trackProjectClick`. Fire-and-forget with `keepalive: true`. Debounced via sessionStorage.
- **Glassmorphism design.** Use `.glass` and `.glass-strong` CSS classes for frosted-glass cards. Text uses `.text-on-glass` / `.text-on-glass-muted`.
- **Dark mode.** Controlled via `useTheme()` hook from `ThemeContext`. Tailwind `darkMode: 'class'`.
- **Navigation.** Header links scroll to sections on `/` (anchor-based) or navigate to `/blog`, `/resume` pages. `/analytics` is hidden from nav.
- **Animations.** Framer Motion `variants` pattern — define `containerVariants`/`itemVariants`, use `initial="hidden"` and `whileInView="visible"`.

## Commands

```bash
npm start          # Dev server (port 3000)
npm run build      # Production build to build/
npm run deploy     # Deploy to GitHub Pages
```

## Adding a New Page

1. Create component in `src/components/`
2. Add route in `App.js` (`<Route path="/new" element={<NewPage />} />`)
3. Add nav link in `Header.js` (`links` array with `isPage: true`)

## Adding a New Project

Add an object to the `projects` array in `src/components/Projects.js` with: `title`, `description`, `image` or `iframePreview`, `technologies[]`, `github?`, `live?`.

## Agent Guidelines

### Style Rules

- Match the glassmorphism aesthetic. New UI should use `glass` / `glass-strong` classes for containers, `text-on-glass` / `text-on-glass-muted` for text, `rounded-2xl` or `rounded-3xl` for border radius.
- Use Framer Motion for entrance animations (fade + slide pattern with `variants`).
- Tailwind utility classes for layout. Custom CSS only goes in `src/index.css` when Tailwind can't express it.
- Support dark mode — use `dark:` Tailwind variants or the `.dark .class` pattern in CSS.
- Keep the color palette: sky-400/cyan-400 for accents, slate tones for neutrals.

### Architecture Constraints

- Frontend data is hardcoded in component files (no separate data/config files).
- Backend is Cloudflare Worker with KV + D1. No other server.
- Don't add new npm dependencies without explicit approval.
- Responsive design is required — mobile-first, test at small breakpoints.

### Before Submitting Work

- Run `npm start` and visually verify changes in browser.
- Check both light and dark mode.
- Test mobile viewport (375px width minimum).
- Don't leave `console.log` statements unless intentional.
- **Update this file** (`CLAUDE.md`) to reflect any structural changes — new routes, components, patterns, or commands. `AGENTS.md` is a symlink to this file, so both stay in sync automatically.
