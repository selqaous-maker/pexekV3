# PEXEK Global Website — Final Local QA and Remediation Report

**Project:** PEXEK Global Homepage V3.1  
**Scope:** Approved static website only; no custom-domain connection, DNS change, Vercel deployment or Manus domain flow was performed.  
**Audit build:** Production Vite build with `NODE_ENV=production`.  
**Audit date:** 20 August 2026.

## Executive result

The source is ready for manual Vercel Preview deployment. The most material performance issue found during this pass was not page structure or image delivery: the sandbox inherited `NODE_ENV=development`, which caused React development modules to enter the production build. The build script now explicitly forces production mode for both Vite and the server bundle. The external Google Fonts stylesheet was also replaced with local WOFF2 assets, removing the external font request from the critical path. Legal-route contrast was corrected without changing legal wording, and a missing favicon was added from the approved PEXEK emblem.

The final build passes TypeScript and production compilation. All approved routes, SPA refreshes, robots, sitemap, manifest, favicon and direct PDF delivery returned successfully from the production preview. Visual QA was run at 1440px, 1280px, 768px, 430px, 390px and 320px. A narrow-screen Kitchens hero CTA overflow was found at 320px and corrected with a responsive min-width and wrapping rule; the corrected route was rechecked at 320px.

## Final Lighthouse results

These are local Lighthouse mobile-lab measurements against the production preview. They are useful for regression and comparative QA, but the local preview server and Lighthouse runtime are not equivalent to Vercel CDN delivery. Scores should therefore be rechecked on the Vercel Preview URL before cutover.

| Route | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| `/` | 73 | 96 | 100 | 100 |
| `/solutions` | 74 | 95 | 100 | 100 |
| `/industries` | 74 | 95 | 100 | 100 |
| `/how-it-works` | 74 | 95 | 100 | 100 |
| `/industries/kitchens-interior` | 73 | 96 | 100 | 100 |
| `/privacy` | 75 | 100 | 100 | 100 |
| `/terms` | 75 | 100 | 100 | 100 |

The requested legal-route accessibility threshold is met: both `/privacy` and `/terms` scored 100. The remaining non-legal accessibility deductions are shared color-contrast findings on approved public pages and were not changed in this focused pass because they are outside the legal-page remediation requirement and would require a broader visual review.

## Performance evidence and diagnosis

The primary LCP candidate on the homepage is hero text, specifically the H1, rather than a hero image. Therefore, there is no LCP image resource whose load duration can be reduced; the LCP resource-load delay is not applicable. The final Lighthouse insight reports show low measured element-render delay, generally about 0.6–0.7 seconds on the main content routes, while local server/runtime timing dominates the reported lab LCP values.

| Route | Reported LCP | TTFB | Element render delay | Main blocking resource |
|---|---:|---:|---:|---|
| `/` | 8.3 s | approximately 4.9 ms | approximately 0.7 s | local CSS bundle, 29.9 KB |
| `/solutions` | 6.8 s | approximately 5.3 ms | approximately 0.6 s | local CSS bundle, 29.9 KB |
| `/industries` | 6.6 s | approximately 4.0 ms | approximately 0.6 s | local CSS bundle, 29.9 KB |
| `/how-it-works` | 6.6 s | approximately 3.7 ms | approximately 0.6 s | local CSS bundle, 29.9 KB |
| `/industries/kitchens-interior` | approximately 6.7 s | approximately 4.1 ms | approximately 0.6 s | local CSS bundle, 29.9 KB |

The report’s LCP values are materially higher than the low TTFB and render-delay rows because the lab run includes the browser’s mobile throttling and the local Lighthouse/preview execution environment. The final trace evidence identifies text as the LCP candidate; there is no missing hero image request or external font request remaining in the final build.

The remaining shared JavaScript opportunity is real but should be handled separately from this approved hardening pass. The shared entry is approximately 319.0 KB raw and 101.5 KB gzip. Lighthouse reports roughly 41–58% unused JavaScript on individual routes because the shared entry contains app shell, router, error boundary, notification and shared UI dependencies. The route-level lazy chunks are already separated: the homepage is approximately 29.7 KB raw and the Kitchens page approximately 25.8 KB raw.

## Bundle comparison

| Artifact | Earlier measured state | Final production state | Change |
|---|---:|---:|---:|
| Shared JS rendered module total | 530.5 KB, including React development modules | 318.5 KB, React production modules | approximately 39.9% lower |
| Shared JS emitted | development-mode bundle | 319.0 KB raw / 101.5 KB gzip | production mode enforced |
| Shared CSS emitted | external font stylesheet in critical path | 163.9 KB raw / 29.5 KB gzip | fonts now local |
| Homepage route chunk | approximately 72.4 KB in the earlier development-mode analysis | 29.7 KB raw / 8.4 KB gzip | route remains lazy-loaded |
| Kitchens route chunk | approximately 25.5 KB in the earlier report | 25.8 KB raw / 7.7 KB gzip | stable |

## Integrity and functional QA

The final production preview returned HTTP 200 for `/`, `/solutions`, `/industries`, `/how-it-works`, `/industries/kitchens-interior`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/favicon.ico` and `/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf`.

The direct PDF response is `application/pdf`, 559,380 bytes, and begins with the `%PDF-` signature. The PDF remains a direct, ungated download. The internal clickable CTA destination remains `https://pexek.com/industries/kitchens-interior#eligibility` as approved.

The sitemap contains seven approved URLs currently represented by the source, including the homepage, four global/funnel content routes and the two legal routes. The Vercel SPA rewrite configuration is present. No `/manus-storage/` references remain in the source, no `vite-plugin-manus-runtime` dependency remains in `package.json` or `pnpm-lock.yaml`, and no Google Fonts or `fonts.gstatic.com` references remain in the client source or production output.

The Formspree endpoint and existing submission logic were not changed. No form submission was sent during this pass. Production-domain Formspree delivery should still be tested once on the Vercel Preview/domain environment using the owner-authorized mailbox.

## Responsive visual QA

Screenshots were captured for all approved routes at 1440px, 1280px, 768px, 430px, 390px and 320px where applicable. The reviewed surfaces remained visually consistent with the Signal Atelier Midnight system. The 320px Kitchens & Interior hero exposed a button-content clipping issue; the fix now gives the hero buttons a zero minimum width, full available width, natural wrapping and controlled line height. No copy or desktop layout changed.

The latest visual checks confirmed the header lockup, workflow visuals, CTA containment, legal-page readability, tablet grid transitions and mobile navigation behavior. The 1440px homepage capture had one transient screenshot-capture failure while the same homepage route captured successfully at 1280px, 768px, 430px, 390px and 320px.

## Changed files in this focused pass

| File | Change |
|---|---|
| `package.json` | Explicit production mode for Vite and server build commands. |
| `client/src/index.css` | Local WOFF2 font declarations, legal-safe responsive Kitchens hero wrapping and 320px CTA containment. |
| `client/src/pages/LegalNotice.tsx` | Darker accessible muted text and legal links; wording unchanged. |
| `client/public/fonts/dm-sans-latin.woff2` | Local approved DM Sans font asset. |
| `client/public/fonts/space-grotesk-400.woff2` | Local approved Space Grotesk font asset. |
| `client/public/fonts/space-grotesk-500.woff2`, `space-grotesk-600.woff2`, `space-grotesk-700.woff2` | Local font assets retained for portable typography coverage. |
| `client/public/favicon.ico` | Compact favicon generated from the approved local PEXEK emblem. |
| `qa/analyze-bundle.mjs` | Production-mode-safe module analysis. |
| `qa/extract-lighthouse-details.mjs` | Support for current Lighthouse insight IDs. |
| `qa/inspect-contrast.mjs`, `qa/extract-lcp-trace.mjs`, `qa/parse-lcp-assets.mjs`, `qa/inspect-report-keys.mjs` | Reproducible audit evidence helpers. |
| `qa/create-favicon.py` | Reproducible favicon generation helper. |
| `FINAL_QA_REPORT.md` | This report. |

## Remaining risks and recommended follow-up

The local mobile Lighthouse Performance score remains below the original 90+ target, with a range of 73–75 on the final run. This is not a release-blocking functional failure for the portable static source, but it is the principal performance risk. The next performance iteration should focus on reducing the shared entry chunk and auditing whether notification, tooltip, floating UI and shared shell dependencies can be split or removed without changing the approved experience. That work should be evaluated on a Vercel Preview, where CDN delivery and server response timing are representative.

The production cutover should remain separate. Do not change `pexek.com` DNS, Zoho Mail, legal text, Formspree configuration, analytics or the current Manus deployment until the Vercel Preview has been tested and the owner has confirmed rollback readiness.

## Manual Vercel deployment

From the portable ZIP or GitHub project, run:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

Use the Vercel project’s existing settings with the repository root as the project root. The build command is `pnpm build`; the static output directory is `dist/public`. No runtime environment variables are required for the hardened static build, so `.env.example` may remain empty apart from its documentation. Verify direct refreshes for all seven routes and the PDF before any domain cutover.

**Recommended commit message:**

```text
perf: harden static build and complete production QA
```
