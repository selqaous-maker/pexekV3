# PEXEK Global Website

This repository contains the hardened, portable source for the approved PEXEK global website. It is a static React 19 and Vite application with the approved homepage, global Solutions, Industries and How it works routes, the Kitchens & Interior funnel, legal pages and the direct Lead-to-Showroom PDF resource.

## Local build

Use Node.js 20+ and pnpm 10.4.1:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm preview
```

The production artifact is written to `dist/public`. No runtime secret is required for the static build. The approved Formspree endpoint remains in the existing client form code and was not changed during hardening.

## Routes

The approved client routes are `/`, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy` and `/terms`. The PDF is served directly at `/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf`. Unapproved child routes remain inactive.

## Deployment

Use `VERCEL_DEPLOYMENT.md` for the exact manual GitHub/Vercel procedure. `vercel.json` contains the approved SPA rewrites and cache headers. Do not connect `pexek.com`, modify DNS, alter Zoho Mail, change Formspree, add analytics or change legal copy as part of this repository deployment.

## Operations

`OPERATIONS.md` documents the DNS preservation rule, legacy-route decisions and restoration procedure. Original image assets are preserved under `portable-assets/originals`; optimized WebP derivatives and the approved P emblem are served from `client/public/assets`.

## Design and content protection

The Signal Atelier Midnight system, approved copy, route taxonomy, human-control boundaries, form behavior, PDF integration and navigation architecture are treated as source-of-truth content. Performance hardening must not introduce new claims, pricing, testimonials, statistics, features or industry proof.
