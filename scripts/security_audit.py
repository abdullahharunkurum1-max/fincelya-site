#!/usr/bin/env python3
"""Fail CI when credentials or active pages with weak browser policy are committed."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


FORBIDDEN_SUFFIXES = {".key", ".mobileprovision", ".p12", ".p8", ".pem"}
FORBIDDEN_NAMES = {"credentials.json", "secrets.json", "service-account.json"}
SKIP_SUFFIXES = {".ico", ".jpeg", ".jpg", ".png", ".svg"}
PATTERNS = {
    "private key": re.compile(r"-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----"),
    "OpenAI API key": re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
    "GitHub token": re.compile(r"\bgh[pousr]_[A-Za-z0-9]{30,}\b"),
    "Supabase secret key": re.compile(r"\bsb_secret_[A-Za-z0-9_-]{20,}\b"),
    "JWT credential": re.compile(r"\beyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b"),
    "Render API key": re.compile(r"\brnd_[A-Za-z0-9_-]{20,}\b"),
    "Google credential": re.compile(r"\b(?:GOCSPX-|AIza)[A-Za-z0-9_-]{20,}\b"),
    "database credential URL": re.compile(r"\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?)://[^\s/:]+:[^\s/@]+@", re.I),
}
ACTIVE_PAGES = ("index.html", "privacy.html", "privacy.htm", "terms.html", "delete-account.html", "admin/index.html")


def git(*args: str) -> str:
    return subprocess.run(
        ["git", *args],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
    ).stdout


def tracked_files() -> list[Path]:
    return [Path(name) for name in git("ls-files").splitlines() if name]


findings: list[str] = []
files = tracked_files()
for path in files:
    if path.suffix.lower() in FORBIDDEN_SUFFIXES or path.name.lower() in FORBIDDEN_NAMES:
        findings.append(f"forbidden credential file: {path}")
        continue
    if path.suffix.lower() in SKIP_SUFFIXES or not path.is_file() or path.stat().st_size > 5_000_000:
        continue
    contents = path.read_text(encoding="utf-8", errors="ignore")
    for label, pattern in PATTERNS.items():
        if pattern.search(contents):
            findings.append(f"{label}: {path}")

for name in ACTIVE_PAGES:
    page = Path(name)
    contents = page.read_text(encoding="utf-8", errors="ignore")
    if 'http-equiv="Content-Security-Policy"' not in contents:
        findings.append(f"missing Content Security Policy: {page}")
    if 'name="referrer"' not in contents:
        findings.append(f"missing referrer policy: {page}")

admin_html = Path("admin/index.html").read_text(encoding="utf-8")
if re.search(r"<script(?:\s[^>]*)?>(?!\s*</script>)", admin_html, re.I):
    findings.append("inline JavaScript is forbidden on admin/index.html")

if "--history" in sys.argv:
    commits = git("rev-list", "--all").splitlines()
    historic_paths = [
        name
        for name in sorted(set(filter(None, git("log", "--all", "--pretty=format:", "--name-only").splitlines())))
        if Path(name).suffix.lower() not in SKIP_SUFFIXES
    ]
    for commit in commits:
        for name in historic_paths:
            try:
                data = git("show", f"{commit}:{name}")
            except subprocess.CalledProcessError:
                continue
            for label, pattern in PATTERNS.items():
                if pattern.search(data):
                    findings.append(f"{label} in history: {commit[:12]}:{name}")

if findings:
    print("Security audit failed:", file=sys.stderr)
    for finding in sorted(set(findings)):
        print(f"- {finding}", file=sys.stderr)
    raise SystemExit(1)

print("Security audit passed.")
