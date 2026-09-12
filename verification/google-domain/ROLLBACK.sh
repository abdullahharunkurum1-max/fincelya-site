#!/usr/bin/env bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/../.." && pwd)"
git -C "$repo" checkout -- index.html
rm -f "$repo/terms.html"
