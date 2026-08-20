# PEXEK Operations Notes

## DNS inventory and preservation rule

This local hardening pass does not inspect, alter or replace the live DNS zone. Preserve the current apex, `www`, mail, SPF, DKIM, DMARC, MX, verification and existing hosting records until the owner approves a domain cutover. In particular, do not modify Zoho Mail records or point `pexek.com` at Vercel from this repository.

## Legacy-route decision table

| Route class | Decision | Reason |
|---|---|---|
| `/` | Preserve and serve homepage | Approved canonical homepage |
| `/solutions` | Preserve and serve route | Approved global solution overview |
| `/industries` | Preserve and serve route | Approved global industry overview |
| `/how-it-works` | Preserve and serve route | Approved process overview |
| `/industries/kitchens-interior` | Preserve and serve route | Approved focused Morocco funnel |
| `/privacy` and `/terms` | Preserve and serve legal pages | Required informational routes |
| `/resources/guide-lead-to-showroom-showrooms-cuisines-maroc.pdf` | Serve directly as PDF | Approved ungated resource |
| Unconfirmed historical URLs | Do not delete or return 410 | No destructive legacy decision has been authorized |
| Unapproved child industry/process URLs | Keep inactive and use existing not-found behavior | Prevent thin or unapproved pages |

## Restoration procedure

If the hardened build fails review, revert the Git commit that contains this hardening pass or redeploy the previous known-good Vercel deployment. Do not use destructive DNS changes as a rollback mechanism. For a later domain cutover, first export the live DNS zone, record the current hosting and mail records, make only the provider-required web-record change, and retain a copy of the original zone for immediate restoration.
