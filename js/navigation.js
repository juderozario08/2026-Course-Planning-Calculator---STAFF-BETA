// Step-to-step navigation:
//   step1 Standing -> step2 Program -> step3 Courses -> step4/step5 Results

// Step 1: answer to "Is your academic standing clear?"
function standingCheck(isClear) {
    hide('step1');
    if (isClear) {
        hide('contactDept');
        show('step2');
    } else {
        show('contactDept');
        hide('step2');
    }
    updateNavigation();
}

// Step 2 -> Step 3: load and render the selected program's curriculum.
function showCourses() {
    const program = byId('programSelect').value;
    const admitYear = byId('admitYearSelect').value;

    if (!program) {
        alert('Please select your program from the dropdown before continuing.');
        return;
    }

    if (!renderCurriculum(program, admitYear)) renderCurriculumNotFound(program, admitYear);

    hide('step2');
    show('step3');
    updateNavigation();
}

// The step number shown in the stepper (results count as step 4).
function currentStep() {
    if (isVisible('step4')) return 4;
    if (isVisible('step3')) return 3;
    if (isVisible('step2')) return 2;
    return 1;
}

// Sync the Back button and stepper with whichever step is on screen.
function updateNavigation() {
    const step = currentStep();
    byId('backButton').classList.toggle('hidden', step === 1);
    document.querySelectorAll('#stepper li').forEach(li => {
        const n = Number(li.dataset.step);
        li.classList.toggle('active', n === step);
        li.classList.toggle('done', n < step);
    });
}

function goBack() {
    if (isVisible('step4')) {
        hide('step4');
        hide('step5');
        show('step3');
    } else if (isVisible('step3')) {
        hide('step3');
        show('step2');
    } else if (isVisible('step2')) {
        hide('step2');
        show('step1');
    } else {
        return;
    }
    updateNavigation();
}

// Map the browser Back button onto goBack() while the app is on screen.
function interceptBrowserBack() {
    history.replaceState(null, document.title, window.location.href);
    window.addEventListener('popstate', function() {
        const anyVisible = ['step1', 'step2', 'step3', 'step4'].some(isVisible);
        if (anyVisible) {
            history.pushState(null, document.title, window.location.href);
            goBack();
        }
    });
}
