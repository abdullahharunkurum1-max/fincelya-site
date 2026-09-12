#!/usr/bin/env bash
set -euo pipefail
cp verification/site-redesign/ORIGINAL_index.html index.html
rm -f styles.css logo.png
echo ROLLBACK_OK
