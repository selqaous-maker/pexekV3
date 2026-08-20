# Environment

The hardened PEXEK website is a static build and does not require runtime environment variables for Vercel. Formspree is referenced by the existing approved client-side form endpoint; it has not been changed in this hardening pass. Do not add analytics, API keys or provider credentials to the repository. Any future secret must be configured through the hosting provider's secret manager, not committed to source.
