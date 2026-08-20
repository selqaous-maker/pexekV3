# PEXEK portable website

Independent production source for the approved PEXEK homepage and Lead-to-Showroom funnel.

## Routes

- `/`
- `/industries/kitchens-interior`
- `/privacy`
- `/terms`

## Local development

```bash
corepack enable
pnpm install --no-frozen-lockfile
pnpm check
pnpm dev
```

## Production build

```bash
pnpm build
pnpm start
```

The production server uses `PORT` when supplied and defaults to port 3000.

## Vercel

Import the repository into Vercel. The included `vercel.json` runs `pnpm build`, publishes `dist/public`, rewrites the approved client-side routes, and preserves the minimum approved legacy redirects. Do not connect `pexek.com` until the preview deployment passes visual, form, route, and asset QA.

## Forms

Both forms post to the approved Formspree endpoint. Run controlled production tests only after the preview is approved and again after the final domain is connected.

## Important

- All required website images are stored in `client/public/assets`.
- The source has no runtime dependency on Manus.
- No analytics or marketing tag is installed.
- Privacy and Terms are concise informational pages and should receive professional legal review.
