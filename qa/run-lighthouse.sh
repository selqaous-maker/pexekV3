#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-http://127.0.0.1:4173}"
OUT="${2:-qa/lighthouse-final}"
mkdir -p "$OUT"
for route in / /solutions /industries /how-it-works /industries/kitchens-interior /privacy /terms; do
  name="${route#/}"
  name="${name//\//_}"
  name="${name:-home}"
  pnpm dlx lighthouse "${ROOT}${route}" \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless --no-sandbox --disable-gpu" \
    --output=json --output-path="${OUT}/${name}.json" \
    --quiet
  echo "Audited ${route} -> ${OUT}/${name}.json"
done
