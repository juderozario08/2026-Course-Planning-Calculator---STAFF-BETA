// Step 2 dropdowns and the Step 3 course checklist, built from PROGRAMS
// (data/programs.js) and COURSES (data/courses.js).

const DEFAULT_YEAR = '2026';

const PROGRAM_PLACEHOLDER = '-- Choose your program --';
const YEAR_PLACEHOLDER = '-- Select admit year --';

const CHECKLIST_INTRO =
    '<h2>Curriculum Required Courses</h2>' +
    '<p>Select all courses completed with a D- or higher, or approved credit.</p>' +
    '<p class="muted">Not sure if you’ve ever been issued a credit and/or Course Substitution/Directive? Refer to your Advisement Report or reach out to your program department.</p>';

// Admit years with a curriculum for `program`, newest first, as strings.
function yearsFor(program) {
    const years = (PROGRAMS[program] || []).flatMap(version => version.years);
    return years.sort((a, b) => b - a).map(String);
}

// Every admit year offered by any program, newest first.
function allYears() {
    const years = new Set(Object.keys(PROGRAMS).flatMap(yearsFor));
    return [...years].sort((a, b) => b - a);
}

// The semesters for program/year, or null when there is no such curriculum.
function curriculumFor(program, year) {
    const version = (PROGRAMS[program] || []).find(v => v.years.includes(Number(year)));
    return version ? version.semesters : null;
}

function populateProgramSelect() {
    const programSel = byId('programSelect');
    programSel.innerHTML = '';
    programSel.appendChild(new Option(PROGRAM_PLACEHOLDER, ''));
    Object.keys(PROGRAMS).sort().forEach(program => {
        programSel.appendChild(new Option(program, program));
    });

    fillSelect(byId('admitYearSelect'), YEAR_PLACEHOLDER, allYears());
    byId('admitYearSelect').value = DEFAULT_YEAR;
}

// Limit the admit-year dropdown to the years available for `program`.
function updateAdmitYearsForProgram(program) {
    const yearSel = byId('admitYearSelect');
    if (!program) {
        fillSelect(yearSel, YEAR_PLACEHOLDER, allYears());
        yearSel.value = DEFAULT_YEAR;
        return;
    }
    const years = yearsFor(program);
    fillSelect(yearSel, YEAR_PLACEHOLDER, years);
    yearSel.value = years.includes(DEFAULT_YEAR) ? DEFAULT_YEAR : (years[0] || '');
}

// 'AER626 (Aircraft stream elective)' -> code 'AER626' and the label
// 'AER626 Applied Finite Elements (Aircraft stream elective)'.
function parseCourseEntry(entry) {
    const [, code, note] = entry.match(/^(\S+)(?: (.*))?$/);
    const course = COURSES[code];
    let label = code;
    if (course) label += ' ' + course.title;
    if (note) label += ' ' + note;
    return { code, label };
}

// The course's page in the TMU calendar, or null when there isn't one
// (placeholders, unknown subjects, courses marked noOutline).
function courseOutlineUrl(code) {
    const course = COURSES[code];
    const subject = code.slice(0, 3);
    const number = code.slice(3);
    if (!course || course.noOutline || !SUBJECT_PATHS[subject] || !/^\d\d[\dAB]$/.test(number)) return null;
    // Two-term capstones (e.g. COE70A/COE70B) share one page under part A.
    const page = number.replace(/B$/, 'A');
    return `https://www.torontomu.ca/calendar/${CALENDAR_YEAR}/courses/${SUBJECT_PATHS[subject]}/${subject}/${page}/`;
}

function outlineLinkHtml(code) {
    const url = courseOutlineUrl(code);
    if (!url) return '';
    return ' <a class="outline-link" href="' + url + '" target="_blank" rel="noopener">Outline</a>';
}

function curriculumChecklistHtml(semesters) {
    let html = CHECKLIST_INTRO;
    semesters.forEach(semester => {
        html += '<h3 class="group-title">' + semester.title + '</h3>';
        html += '<div class="course-grid">';
        semester.courses.map(parseCourseEntry).forEach(({ code, label }) => {
            html += '<label><input type="checkbox" value="' + code + '"> ' + label + outlineLinkHtml(code) + '</label>';
        });
        html += '</div>';
    });
    html += '<div class="button-row"><button onclick="calculateEligibility()">Calculate Spring/Summer Eligibility</button></div>';
    return html;
}

// Render the checklist for program/year into Step 3.
// Returns false when there is no curriculum for that combination.
function renderCurriculum(program, admitYear) {
    const semesters = curriculumFor(program, admitYear);
    if (!semesters) return false;
    setDebug('Rendering: ' + program + ':' + admitYear);
    byId('step3').innerHTML = curriculumChecklistHtml(semesters);
    return true;
}

function renderCurriculumNotFound(program, admitYear) {
    const years = yearsFor(program);
    let msg = '<div class="warning">No curriculum was found for ' + program + ' (' + admitYear + ').';
    if (years.length) {
        msg += '<br>Available admit years for this program: ' + years.join(', ') + '.</div>';
    } else {
        msg += '<br>This program has no curricula listed.</div>';
    }
    byId('step3').innerHTML = '<h2>Curriculum Not Found</h2>' + msg +
        '<div class="button-row"><button onclick="window.location.reload()">Retry</button></div>';
    setDebug('No curriculum for ' + program + ':' + admitYear);
}

// Show a course's details in an alert. Not currently wired to any button;
// kept for the "info" buttons styled by `.info-btn`.
function showCourseInfo(code) {
    const info = COURSES[code];
    if (!info) { alert('No additional info for ' + code); return; }
    const msg = formatCourseCode(code) + ' - ' + info.title + '\n\n' + (info.description || '') +
        '\n\nPrerequisites: ' + (info.prereqs || 'None') +
        '\nCo-Requisites: ' + (info.coreqs || 'None') +
        '\nAntirequisites: ' + (info.antireqs || 'None');
    alert(msg);
}

function initCurricula() {
    populateProgramSelect();
    setDebug('Curricula loaded. Select your program.');
}
