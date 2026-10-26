// Spring/Summer eligibility calculation (Step 3 -> Steps 4 & 5).

// Literal non-course label some checklists may contain.
const UPPER_YEAR_MECHANICS = 'Upper-Year Mechanics';

function normalizeCode(s){
  return (s || '').toUpperCase().replace(/\s+/g, '');
}

// Parse free-text prerequisites (e.g. "MTH 140 and MTH 141") into course
// tokens. mode is 'any' when the text contains OR (or "/"), otherwise 'all'.
function parsePrereqs(prStr){
  if(!prStr) return { mode: 'none', tokens: [] };
  const s = prStr.replace(/[()]/g, ' ').toUpperCase();
  const raw = s.match(/[A-Z]{2,5}\s?\d{3}/g) || [];
  const tokens = raw.map(t => t.replace(/\s+/g, ''));
  if(tokens.length === 0) return { mode: 'none', tokens: [] };
  const mode = /\bOR\b|\b\/\b/.test(s) ? 'any' : 'all';
  return { mode, tokens };
}

// Course level from its number, e.g. 'MTH425' -> 400.
function courseLevel(code){
  const numMatch = code.match(/(\d{3})$/);
  return numMatch ? parseInt(numMatch[1].charAt(0)) * 100 : 0;
}

function isEligible(code, rawValue, completed){
  const info = courseInfoMap[code] || courseInfoMap[rawValue] || null;
  const parsed = parsePrereqs(info && info.prereqs ? info.prereqs : '');

  if(parsed.mode === 'none'){
    // No structured prereqs: only auto-approve 100/200-level courses.
    return courseLevel(code) < 300;
  }
  if(parsed.mode === 'any') return parsed.tokens.some(tok => completed.has(tok));
  return parsed.tokens.every(tok => completed.has(tok));
}

function findEligibleCourses(){
  const inputs = document.querySelectorAll('#step3 input[type="checkbox"]');
  const checked = document.querySelectorAll('#step3 input[type="checkbox"]:checked');
  const completed = new Set(Array.from(checked).map(cb => normalizeCode(cb.value)));
  const eligible = [];

  inputs.forEach(inp => {
    const code = normalizeCode(inp.value);
    if(!code || completed.has(code)) return;

    if(code === UPPER_YEAR_MECHANICS.toUpperCase().replace(/\W/g, '')){
      if(completed.has('PCS211')) eligible.push(UPPER_YEAR_MECHANICS);
      return;
    }

    if(isEligible(code, inp.value, completed)) eligible.push(code);
  });

  // Nothing matched: fall back to a few common progression rules.
  if(eligible.length === 0){
    if(completed.has('MTH140') && !completed.has('MTH141')) eligible.push('MTH141');
    if(completed.has('CEN100') && !completed.has('CEN199')) eligible.push('CEN199');
    if(completed.has('PCS211')) eligible.push(UPPER_YEAR_MECHANICS);
  }
  return eligible;
}

// 'MTH141' -> 'MTH 141'; non-course labels are returned unchanged.
function formatCourseCode(code){
  if(/^[A-Z]{2,5}\d{3}$/.test(code)) return code.replace(/([A-Z]+)(\d{3})/, '$1 $2');
  return code;
}

function calculateEligibility(){
  const out = findEligibleCourses().map(formatCourseCode);
  byId('eligibleCourses').innerHTML = '<strong>Eligible Courses:</strong><br>' +
    (out.length ? out.join('<br>') : 'No eligible courses determined.');

  hide('step3');
  show('step4');
  show('step5');
  updateBackButtonVisibility();
}
