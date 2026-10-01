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
  components/
    Layout.jsx             shell: header, nav, footer
    UI.jsx                 shared UI primitives
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

## Notes

- All site content (packages, plans, copy) is centralised in `src/data/site.js` — edit there rather than in page components.
- Dev and preview servers bind `0.0.0.0:8137` so they can be reached from outside the host.
