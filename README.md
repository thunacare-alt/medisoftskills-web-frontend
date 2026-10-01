# MedisoftSkills — Web Frontend

Vite + React single-page frontend for the MedisoftSkills platform: institution onboarding, course packages, KYC, checkout and a student/partner dashboard.

## Stack

- React 18 + React Router 6
- Vite 5 (`@vitejs/plugin-react`)
- framer-motion for transitions
- Plain CSS design system (`src/theme.css`)

## Getting started

```bash
npm install
npm run dev      # dev server on 0.0.0.0:8137
npm run build    # production build -> dist/
npm run preview  # preview build on 0.0.0.0:8137
```

## Structure

```
index.html
vite.config.js
src/
  main.jsx                 app entry + router
  App.jsx                  route table
  theme.css                design tokens + global styles
  motion.css               motion layer: stat band, marquee, floating CTA, loaders
  fonts.css                self-hosted @font-face rules
  fonts/                   woff2 files — no third-party font requests
  components/
    Layout.jsx             shell: header, nav, footer
    UI.jsx                 shared UI primitives (Reveal, Card, Chip, Stepper)
    Motion.jsx             marquee, animated counters, Remotion render slot, enquiry CTA
  data/
    site.js                content/config data (packages, plans, copy)
  pages/
    Home.jsx               landing
    Packages.jsx           course packages / pricing
    Journey.jsx            learning journey
    Institutions.jsx       institution / partner section
    KYC.jsx                KYC submission
    Join.jsx               sign-up flow
    Checkout.jsx           payment / order summary
    Dashboard.jsx          authenticated dashboard
    NotFound.jsx           404
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/packages` | Packages |
| `/journey` | Journey |
| `/institutions` | Institutions |
| `/kyc` | KYC |
| `/join` | Join |
| `/checkout` | Checkout |
| `/dashboard` | Dashboard |
| `*` | NotFound |

## Performance

- Route-level code splitting — only Home ships in the entry chunk; the other routes are fetched on demand, and warmed the moment a visitor hovers or focuses their link.
- Vendor chunking — React, the router and the motion engine each cache independently, so content edits never invalidate them.
- Self-hosted fonts — Plus Jakarta Sans and Inter are served from this deployment, removing two render-blocking third-party requests.
- Animation is transform/opacity only, and every effect is disabled under `prefers-reduced-motion`.

## Motion

In-page motion (animated counters, marquee, scroll reveals, page transitions) runs on framer-motion and stays off the critical path.

Remotion is used as a renderer, not a runtime. Compositions are rendered offline to files and dropped into `public/media/`:

```
public/media/hero.webm          # VP9 render
public/media/hero.mp4           # H.264 fallback
public/media/hero-poster.jpg    # first-frame poster
```

`MotionStage` picks them up automatically, and renders nothing at all for visitors who ask for reduced motion.

## Configuration

- Site content lives in `src/data/site.js`.
- WhatsApp enquiry button: set `contact.whatsapp` in `src/data/site.js` (digits only, country code first). While it is empty, the button does not render.
- Routing uses `HashRouter` (URLs like `/#/packages`), so it works on any static host with no server rewrites.
- Dev and preview servers bind `0.0.0.0:8137`.
