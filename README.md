# Engineering Spring/Summer Course Planning Calculator

A static web page that walks students through standing verification, program
and admit-year selection, completed-course selection, and shows which
Spring/Summer courses they're eligible for.

## Project layout

```
index.html            Page markup only
css/styles.css        All styles
data/courses.js       Course catalog: every course defined once (title, prereqs, …)
data/programs.js      Each program's curriculum versions, as lists of course codes
js/                   Classic scripts, loaded in this order:
  dom.js                small DOM helpers (byId, show/hide, setDebug…)
  curriculum.js         fills the dropdowns, renders the Step 3 checklist
  eligibility.js        prerequisite parsing + eligibility calculation
  navigation.js         step flow, Back button, stepper
  main.js               page wiring and startup
assets/fyeo-logo.png  Logo
```

Everything is plain `<script>` files (no build step, no server needed), so the
page works both when hosted and when `index.html` is opened directly.

## Running locally

Open `index.html` in a browser. That's it.

## Updating curricula

**New intake year, curriculum unchanged** — add the year to the existing
version's `years` list in `data/programs.js`:

```js
Biomedical: [
    {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
        semesters: [ ... ],
    },
],
```

**Curriculum changed** — add a new version to that program with its own
`years` and `semesters` (copy the previous version and edit it). Remove the
year from the old version's list.

**New course** — add it once to `data/courses.js`, then reference its code in
`data/programs.js`. To show a note after the title for one program only,
write it after the code: `'AER626 (Aircraft stream elective)'`.

**Prerequisites** for the eligibility calculator live in `data/courses.js`
(`prereqs`, free text such as `'MTH 140 and MTH 141'`).

If you add a new latest year, also update `DEFAULT_YEAR` in
`js/curriculum.js`.
