# PEXEK Vercel Preview Routing Handoff

## Scope

This handoff contains a routing-only correction for the approved PEXEK static website. No page design, copy, forms, PDF, metadata, schema, DNS, domain, Zoho Mail, analytics or existing Manus deployment settings were changed.

## Root configuration

The corrected Vercel configuration is located exactly at:

```text
/home/ubuntu/pexek-global-homepage-v31/vercel.json
```

It is beside `package.json` and `pnpm-lock.yaml` at the repository root. The complete source package preserves the following structure:

```text
project-root/
├── package.json
├── pnpm-lock.yaml
├── vercel.json
├── client/
├── server/
├── shared/
└── other source files
```

The configuration uses `pnpm build`, outputs `dist/public`, permanently redirects only the confirmed legacy paths `/voice-ai-agents`, `/about` and `/contact`, and rewrites the six approved application routes to `/index.html`. The existing immutable asset cache headers and direct PDF headers are preserved.

## Exact deployment settings

| Vercel setting | Value |
|---|---|
| Framework preset | Vite |
| Repository root | Project root, not `dist/public` |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist/public` |

The next Vercel deployment must import the complete repository root. It must not import only the built `dist/public` directory, because Vercel needs to read the root `vercel.json` and run the committed build command.

## Vercel routing configuration

The approved routes are configured as follows:

| Request path | Expected behavior |
|---|---|
| `/solutions` | SPA rewrite to `/index.html` |
| `/industries` | SPA rewrite to `/index.html` |
| `/how-it-works` | SPA rewrite to `/index.html` |
| `/industries/kitchens-interior` | SPA rewrite to `/index.html` |
| `/privacy` | SPA rewrite to `/index.html` |
| `/terms` | SPA rewrite to `/index.html` |
| `/assets/*` | Served as real static assets; no SPA rewrite |
| `/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf` | Served as a real PDF; no SPA rewrite |
| `/robots.txt` | Served as a real text file; no SPA rewrite |
| `/sitemap.xml` | Served as a real XML file; no SPA rewrite |
| `/manifest.webmanifest` | Served as a real manifest; no SPA rewrite |

The obsolete `/industries -> /#industries` and `/how-it-works -> /#how` redirects are absent. Those paths are now real application routes.

## Verification

The following checks passed from the current corrected source:

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | Passed |
| `pnpm check` | Passed |
| `pnpm build` | Passed |
| Root `vercel.json` | Confirmed at project root |
| Application-route rewrite validator | Passed |
| Vercel-compatible config-faithful route harness | Passed |
| Approved application routes | HTTP 200 and HTML shell |
| Legacy redirects | HTTP 308 with expected destinations |
| Robots, sitemap and manifest | HTTP 200 with correct content types |
| Direct PDF | HTTP 200, `application/pdf`, 559,380 bytes |
| ZIP integrity | Passed |

Because the Vercel CLI requires authentication in this sandbox, it was not used to deploy or connect an account. The route harness applies the committed `vercel.json` redirects, rewrites, static-file resolution and headers against the production build, which verifies the routing rules without relying on `vite preview` or changing external services. The first authenticated Vercel Preview remains the final provider-level confirmation.

## Changed files for this routing correction

| File | Change |
|---|---|
| `vercel.json` | Added the three approved legacy redirects, configured six application rewrites, removed obsolete route redirects and preserved cache/PDF headers. |
| `qa/validate-vercel-routing.mjs` | Added root/config/static-asset/rewrite validation. |
| `qa/vercel-routing-harness.mjs` | Added a local config-faithful Vercel route harness for HTTP behavior checks. |
| `VERCEL_ROUTING_HANDOFF.md` | Added this deployment handoff document. |
| `todo.md` | Recorded the routing correction checklist. |

All other approved website files remain unchanged for this correction.

## GitHub replacement steps

Create a temporary branch in the existing repository. Back up the current working tree, extract the corrected ZIP, and copy the ZIP’s project-root contents into the repository root while preserving the repository’s `.git` directory. Do not copy `node_modules`, `dist`, `.env`, `.env.local`, credentials, browser profiles or temporary audit output. Review `git diff`, then run the three required commands:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

Commit the reviewed change with:

```text
fix: restore Vercel SPA routing for approved routes
```

Push the branch and create a Vercel Preview from the repository root. After the Preview is created, test all approved direct routes, `/#assessment`, one owner-authorized Formspree submission, the PDF MIME type, mobile navigation, 320px layout, browser console/network, Lighthouse and SEO metadata. Do not promote or connect `pexek.com` until that Preview is approved.

## Explicitly unchanged

No DNS or domain action was performed. Zoho Mail, Formspree configuration, analytics, legal text, page design, page copy, PDF content, schema, sitemap content and the existing Manus deployment were not changed.
