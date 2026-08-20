# PEXEK Portable Deployment Guide

This repository is a static React/Vite site prepared for the existing PEXEK GitHub/Vercel project. The deployment path below is manual because Vercel authentication is intentionally not handled in this workspace.

## Build contract

Use Node.js 20 or newer and pnpm 10.4.1. From the repository root, run:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

The Vercel project should use **Build Command** `pnpm build`, **Output Directory** `dist/public`, and the repository's default install command. No runtime environment variables are required for the static build.

## Vercel steps

1. Open the existing PEXEK project in Vercel.
2. Open **Settings → Git** and confirm that the intended GitHub repository and production branch are connected.
3. Confirm that the project root is the repository root and that the build command and output directory match the values above.
4. Push the hardened source to the approved GitHub repository with the recommended commit message in `README.md` or the final QA report.
5. Create a preview deployment first. Verify `/`, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy` and `/terms` by direct refresh.
6. Verify `/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf` returns the PDF directly.
7. Promote the approved preview to production from Vercel.
8. Do not connect `pexek.com` or change DNS in this deployment step. Domain cutover remains a separate owner-approved operation.

`vercel.json` contains explicit SPA rewrites for the approved client routes and immutable caching for local assets. Static PDF delivery is not rewritten to the SPA.

## Post-deployment checks

Verify the production response status, browser console, form display, PDF download, assessment hash landing, mobile layout and the canonical URL for each indexable route. Submit no form during deployment verification unless the owner separately authorizes a production Formspree test.
