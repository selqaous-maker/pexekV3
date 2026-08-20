#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-/home/ubuntu/pexek-global-homepage-v31/pexek-global-static-production.zip}"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
mkdir -p "$STAGE/pexek-global-homepage-v31/portable-assets/originals"
cp -a "$ROOT/." "$STAGE/pexek-global-homepage-v31/"
rm -rf "$STAGE/pexek-global-homepage-v31/node_modules" "$STAGE/pexek-global-homepage-v31/dist" "$STAGE/pexek-global-homepage-v31/.git" "$STAGE/pexek-global-homepage-v31/.manus-logs" "$STAGE/pexek-global-homepage-v31/.project-config.json"
find "$STAGE/pexek-global-homepage-v31" -type f -name '*.zip' -delete
rm -f "$STAGE/pexek-global-homepage-v31/.env" "$STAGE/pexek-global-homepage-v31/.env.local"
cp -f /home/ubuntu/pexek-portable-originals/*.jpg "$STAGE/pexek-global-homepage-v31/portable-assets/originals/"
printf '%s\n' '# PEXEK static deployment' '# No runtime environment variables are required for the hardened Vercel build.' '# Keep provider credentials out of source control.' > "$STAGE/pexek-global-homepage-v31/.env.example"
rm -rf "$STAGE/pexek-global-homepage-v31/qa/lighthouse" "$STAGE/pexek-global-homepage-v31/qa/lighthouse-final" "$STAGE/pexek-global-homepage-v31/qa/lighthouse-remediated" "$STAGE/pexek-global-homepage-v31/qa/lighthouse-final-remediated" "$STAGE/pexek-global-homepage-v31/qa/lighthouse-delivery" "$STAGE/pexek-global-homepage-v31/qa/lcp-assets-home"
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
(cd "$STAGE" && zip -qr "$OUT" pexek-global-homepage-v31)
ls -lh "$OUT"
unzip -l "$OUT" | tail -5
