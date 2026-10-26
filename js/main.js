// Page wiring: sidebar links, saved program choice and startup loading.

const SAVED_PROGRAM_KEY = 'tmu_selected_program_v1';

function saveProgramChoice() {
    const val = byId('programSelect').value;
    if (val) localStorage.setItem(SAVED_PROGRAM_KEY, val);
}

function loadSavedProgram() {
    const saved = localStorage.getItem(SAVED_PROGRAM_KEY);
    if (saved) byId('programSelect').value = saved;
}

// Sidebar buttons declare their destination with data-href.
function initExternalLinks() {
    document.querySelectorAll('button[data-href]').forEach(btn => {
        btn.addEventListener('click', () => window.open(btn.dataset.href, '_blank'));
    });
}

// FYEng Mobile App: open the chosen store, then reset to the placeholder.
function initStorePicker() {
    const sel = byId('fyengStore');
    sel.addEventListener('change', function() {
        if (this.value) window.open(this.value, '_blank');
        this.value = '';
    });
}

function initProgramSelect() {
    byId('programSelect').addEventListener('change', function() {
        if (manifest) updateAdmitYearsForProgram(this.value);
        saveProgramChoice();
    });
    loadSavedProgram();
}

interceptBrowserBack();
initExternalLinks();
initStorePicker();
initProgramSelect();
document.addEventListener('DOMContentLoaded', initCurricula);
updateNavigation();
