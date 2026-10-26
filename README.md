# Engineering Spring/Summer Course Planning Calculator

A static web page that walks students through standing verification, program
and admit-year selection, completed-course selection, and shows which
Spring/Summer courses they're eligible for.

## Project layout

```
index.html                 Page markup only
css/styles.css             All styles
js/                        Classic scripts, loaded in this order:
  dom.js                     small DOM helpers (byId, show/hide, setDebug…)
  course-info.js             course details + prerequisites (courseInfoMap)
  curriculum.js              loads curricula, fills dropdowns, renders Step 3
  eligibility.js             prerequisite parsing + eligibility calculation
  navigation.js              step flow, Back button, browser-back handling
  main.js                    page wiring and startup
assets/fyeo-logo.png       Logo
data/curricula/            One JSON file per program/admit year + index.json
data/curricula.bundle.js   Generated: all curricula embedded for file:// use
scripts/                   Python generators for the bundle and index.json
```

The JS files are plain `<script>` tags (not ES modules) on purpose, so the page
still works when `index.html` is opened directly from disk.

## Running locally

Either open `index.html` directly (double-click). This uses the embedded bundle.

Or serve the folder (recommended):

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

## Adding or updating a curriculum

1. Add/edit `data/curricula/<Program>-<Year>.json`, e.g. `Aerospace-2026.json`.
   `Program` must match the program dropdown value (`Aerospace`, `Biomedical`,
   `Computer`, …). Shape:

   ```json
   [
     { "title": "1st Semester (Required)", "courses": [ { "code": "CEN100", "title": "Introduction to Engineering" } ] }
   ]
   ```

2. Regenerate the manifest and bundle (both can be run from any directory):

   ```sh
   python3 scripts/generate_index.py
   python3 scripts/generate_bundle.py
   ```

   The bundle is loaded first, so **always regenerate it after editing JSON**,
   otherwise the page keeps showing the old data.

Course prerequisites used by the eligibility calculator live in
`js/course-info.js` (`courseInfoMap`).

## Troubleshooting

- The status pill under the top bar shows what was loaded (e.g.
  `Rendering: Aerospace:2026`).
- If a red notice says curricula couldn't be loaded, the bundle is missing and
  the page was opened via file:// — regenerate the bundle or serve over HTTP.
