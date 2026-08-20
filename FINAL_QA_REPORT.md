# PEXEK Production Hardening and Local QA Report

**Scope:** Hardened static source for manual Vercel deployment. No pexek.com DNS, Zoho Mail, Formspree configuration, analytics, or live Manus domain settings were changed.

## Executive summary

The approved PEXEK routes remain intact and build successfully from the committed lockfile. The source now has local image assets, a local direct-download PDF, explicit Vercel SPA rewrites, portable metadata files, no Manus runtime dependency, no Manus debug collector, and no `/manus-storage/` references in the deployable source. A narrow mobile-header stability correction was also applied to `/how-it-works`, and the approved PEXEK emblem now has a transparent WebP derivative used by the existing lockups.

The build and quality categories are strong: TypeScript passes, the production build passes, Lighthouse best-practices and SEO are 100 across all audited HTML routes, and accessibility is 94–96. Lighthouse performance is the remaining measurable gap in this sandbox lab: 67–96 by route, with the content-heavy pages generally in the high 60s or low 70s under mobile throttling. This is not a launch-blocking build failure, but it should be rechecked in Vercel Preview with production CDN delivery before final promotion.

## Build and dependency validation

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | Pass; lockfile is up to date |
| `pnpm check` | Pass; TypeScript reports no errors |
| `pnpm build` | Pass; Vite production build and server bundle complete |
| Manus Vite runtime dependency | Absent from `package.json` and lockfile |
| Manus debug collector | Removed from `client/public` |
| Manus storage references | None in deployable source |
| External forge/map compatibility component | Removed because unused and non-portable |
| Production output | `dist/public` generated successfully |

The Vite build still prints a warning that the shared entry chunk is larger than 500 kB after minification. Route-level page chunks are split and range from approximately 37–72 kB before gzip. The shared entry is approximately 531 kB uncompressed and 161 kB gzip in the final build.

## Lighthouse results

Audits were run against the local Vite production preview for `/`, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy` and `/terms`, using Lighthouse 13.4.1 with performance, accessibility, best-practices and SEO categories.

| Route | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| `/` | 67 | 96 | 100 | 100 |
| `/solutions` | 69 | 95 | 100 | 100 |
| `/industries` | 69 | 95 | 100 | 100 |
| `/how-it-works` | 70 | 95 | 100 | 100 |
| `/industries/kitchens-interior` | 67 | 96 | 100 | 100 |
| `/privacy` | 87 | 94 | 100 | 100 |
| `/terms` | 96 | 94 | 100 | 100 |

Representative final lab metrics were approximately **3.2–3.3 seconds FCP** and **7.2 seconds LCP** on the content-heavy routes, with low total blocking time of approximately 40–130 ms and low cumulative layout shift of 0–0.088. The main remaining performance risk is first-load rendering under Lighthouse mobile throttling, not a build or runtime error.

## Functional and route QA

The production preview returned HTTP 200 for every approved HTML route and for the static configuration files. Direct SPA refreshes were verified for `/`, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy` and `/terms`. The Vercel configuration contains explicit rewrites for those routes and does not rewrite the PDF path.

The approved PDF is served at:

`/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf`

The local production preview returned `200 OK`, `Content-Type: application/pdf`, `Content-Length: 559380`, and a valid `%PDF-1.7` signature. The document is six pages and remains a direct ungated asset. Its final file size is approximately **546.3 KiB**, below the requested 1.5 MB limit.

The homepage assessment form retains the approved Formspree POST action, required fields, privacy consent, hidden source metadata, page URL field and success/error states. No production submission was triggered during this hardening pass. The Formspree endpoint and legal copy were not changed.

## SEO and static metadata QA

The final source includes `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, favicon/logo assets, route metadata, canonical URLs, Open Graph metadata and JSON-LD on the approved content routes. The sitemap contains the homepage, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy` and `/terms`. Privacy and Terms use self-referencing route metadata through the shared route metadata layer.

The Vercel configuration provides the SPA rewrites, immutable caching for local assets and direct PDF delivery headers. A `www` to bare-domain redirect is intentionally not configured in this source because the domain cutover has not been authorized; that redirect should be configured in the authenticated Vercel project when the owner is ready.

## Responsive and visual QA

Representative mobile captures were taken at 390 px for all approved routes. Desktop and tablet route checks were already completed in the approved baseline QA. The final mobile pass confirmed that the PEXEK header lockup remains visible and that `/how-it-works` no longer allows the desktop assessment CTA to collide with the mobile brand lockup. The Signal Atelier Midnight visual system, approved copy, route structure, kitchens funnel, PDF card, navigation behavior and legal pages were preserved.

## Changed files in this hardening pass

The primary source changes are:

- `client/index.html`: removed the restrictive `maximum-scale=1` viewport setting.
- `client/src/index.css`: hid the nonessential desktop header CTA below 640 px to prevent mobile overlap.
- `client/src/pages/Home.tsx`: aligned the visible PEXEK brand button with its accessible name and switched the emblem reference to WebP.
- `client/src/pages/HowItWorks.tsx`: stabilized the mobile header and aligned the visible PEXEK lockup with its accessible name.
- `client/src/pages/Industries.tsx`, `client/src/pages/KitchensInterior.tsx` and `client/src/pages/Solutions.tsx`: switched existing logo lockups to the local transparent WebP derivative.
- `client/public/assets/NeonBlueGeometricPEmblem.webp`: added lossless transparent WebP derivative of the approved emblem.
- `client/public/__manus__/debug-collector.js`: removed.
- `client/src/components/Map.tsx`: removed because it was unused and contained a non-portable external forge proxy.
- `template.json`: removed because it contained stale scaffold dependency metadata and was not required by the build.
- `.gitignore`, `package.json` and `pnpm-lock.yaml`: cleaned for portable source handling.
- `VERCEL_DEPLOYMENT.md`, `ENVIRONMENT.md`, `OPERATIONS.md`, `README.md`: included as deployment, environment, operations and source documentation.
- `vercel.json`: included with approved SPA rewrites and asset/PDF headers.
- `qa/`: includes reproducible Lighthouse and audit scripts plus final raw reports.

## Manual Vercel deployment

From the repository root, run:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

In the existing Vercel project, use the repository root, build command `pnpm build`, and output directory `dist/public`. Create a Preview deployment first. Verify direct refreshes for every approved route, the PDF response, assessment hash navigation, mobile layout, browser console and Formspree form display. Promote only after the Preview is approved. Do not connect `pexek.com` or change DNS as part of this package.

The recommended Git commit message is:

```text
perf: harden PEXEK static site for portable Vercel deployment
```

## Remaining risks and owner actions

The local Lighthouse performance target of 90+ is not met on the content-heavy routes under the available mobile lab profile. The primary remaining factors are the shared JavaScript entry and the first-load LCP path. Recheck the same build on Vercel Preview with CDN delivery before deciding whether another optimization pass is worthwhile. Avoid changing approved design or copy solely to chase a variable local score.

Before production cutover, the owner must authenticate to GitHub/Vercel, confirm the intended repository and production branch, run a Vercel Preview, and separately preserve/export the current DNS zone. Do not request or commit Google, Vercel or Formspree credentials into this repository. Domain cutover, `www` redirect configuration, HTTPS verification and rollback to the original DNS records remain owner-controlled operations.
