# Plan: Add Tool-Call Tactics CTA to Portfolio Hero Section

## Goal
Add a callout in the hero section that invites visitors to try Tool-Call Tactics — a game that demonstrates how an AI agent reasons.

## What to Change

### File: `src/components/Hero.js`

Add a new `motion.div` block **below the social links** (after line 118, before the closing `</div>` of the glass card on line 119) with:

- A short teaser line: **"Wanna see how an AI agent reasons?"**
- A CTA link button: **"Try Tool-Call Tactics →"** linking to `https://toolcalltactics.loukik.dev`
- Styled to match the existing glass-morphism aesthetic
- Uses Framer Motion for entrance animation (part of the existing `itemVariants` stagger)
- Opens in a new tab

### Proposed JSX

```jsx
<motion.div
  className="mt-8 flex flex-col items-center lg:items-start gap-3"
  variants={itemVariants}
>
  <p className="text-on-glass-muted text-sm">
    Wanna see how an AI agent reasons?
  </p>
  <motion.a
    href="https://toolcalltactics.loukik.dev"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl text-sky-400 font-medium hover:text-white transition-all duration-300 border border-sky-400/30 hover:border-sky-400/60"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    🎮 Try Tool-Call Tactics →
  </motion.a>
</motion.div>
```

### Placement
```
[Glass Card]
  ├── "Hi, I'm Loukik"
  ├── TypeWriter roles
  ├── Description paragraph
  ├── Social links (GitHub, LinkedIn, Email)
  └── NEW: Tool-Call Tactics CTA  ← here
[/Glass Card]
```

## No Other Changes Needed
- No new dependencies
- No new components
- No CSS/Tailwind config changes (uses existing utility classes)
- Single file change: `src/components/Hero.js`
