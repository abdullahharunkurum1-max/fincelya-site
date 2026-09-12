#!/usr/bin/env bash
set -euo pipefail
git checkout HEAD -- index.html styles.css
rm -f logo-hd.png icons.svg
echo ROLLBACK_OK
