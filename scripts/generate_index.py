#!/usr/bin/env python3
"""
Scans `data/curricula/` for files named <Program>-<Year>.json and writes the
`data/curricula/index.json` manifest listing available programs and years.

Usage (from anywhere):
  python3 scripts/generate_index.py

This overwrites `data/curricula/index.json` with the discovered files.
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CURRICULA_DIR = os.path.join(ROOT, 'data', 'curricula')
INDEX_PATH = os.path.join(CURRICULA_DIR, 'index.json')

PATTERN = re.compile(r"^([A-Za-z]+)-([0-9]{4})\.json$")


def main():
    manifest = {}
    for fn in os.listdir(CURRICULA_DIR):
        m = PATTERN.match(fn)
        if not m:
            continue
        prog, year = m.group(1), m.group(2)
        manifest.setdefault(prog, set()).add(year)

    # Sorted by program name, newest year first
    out = [{"program": prog, "years": sorted(manifest[prog], reverse=True)}
           for prog in sorted(manifest)]

    with open(INDEX_PATH, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2)
    print('Wrote', os.path.relpath(INDEX_PATH, ROOT), 'with', len(out), 'program(s)')


if __name__ == '__main__':
    main()
