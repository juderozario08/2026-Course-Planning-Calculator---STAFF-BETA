// Step-to-step navigation:
//   step1 Standing -> step2 Program -> step3 Courses -> step4/step5 Results

// Step 1: answer to "Is your academic standing clear?"
function standingCheck(isClear){
  hide('step1');
  if(isClear){
    hide('contactDept');
    show('step2');
  } else {
    show('contactDept');
    hide('step2');
  }
  updateBackButtonVisibility();
}

// Step 2 -> Step 3: load and render the selected program's curriculum.
async function showCourses(){
  const program = byId('programSelect').value;
  const admitYear = byId('admitYearSelect').value;

  if(!program){
    alert('Please select your program from the dropdown before continuing.');
    return;
  }

  console.log('showCourses called with', { program, admitYear });
  console.log('Available curriculum keys:', Object.keys(curriculumMap).slice(0, 50));
  setDebug('Selected: ' + program + ':' + admitYear);

  let rendered = false;
  try{
    rendered = await renderCurriculumIfAvailable(program, admitYear);
  } catch(e){
    console.warn('render error', e);
  }
  // With a manifest, explain what's missing; without one, fall back to the
  // static checklist already in index.html.
  if(!rendered && manifest) renderCurriculumNotFound(program, admitYear);

  hide('step2');
  show('step3');
  updateBackButtonVisibility();
}

function updateBackButtonVisibility(){
  const onLaterStep = isVisible('step2') || isVisible('step3') || isVisible('step4');
  byId('backButton').classList.toggle('hidden', !onLaterStep);
}

function goBack(){
  if(isVisible('step4')){
    hide('step4');
    hide('step5');
    show('step3');
  } else if(isVisible('step3')){
    hide('step3');
    show('step2');
  } else if(isVisible('step2')){
    hide('step2');
    show('step1');
  } else {
    return;
  }
  updateBackButtonVisibility();
}

// Map the browser Back button onto goBack() while the app is on screen.
function interceptBrowserBack(){
  history.replaceState(null, document.title, window.location.href);
  window.addEventListener('popstate', function(){
    const anyVisible = ['step1','step2','step3','step4'].some(isVisible);
    if(anyVisible){
      history.pushState(null, document.title, window.location.href);
      goBack();
    }
  });
}
