#!/usr/bin/env bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/../.." && pwd)"
cp "$repo/verification/google-domain/ORIGINAL_index.html" "$repo/index.html"
rm -f "$repo/terms.html"
