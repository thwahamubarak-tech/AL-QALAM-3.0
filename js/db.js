/* AL QALAM 3.0 - Centralized LocalStorage Database Logic */
const SUPABASE_URL = 'https://weqvnlwiqppgxfvtzxhz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lj6bDDH7Os701RZEaXi8Ow_Awp-Gucs';
window.dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const DB_KEYS = {
    PROGRAMS: "alqalam_programs",
    SCHEDULE: "alqalam_schedule",
    RESULTS: "alqalam_results",
    SCORES: "alqalam_group_scores",
    INDIVIDUAL: "alqalam_indiv_scores",
    ENTRIES: "alqalam_leader_entries",
    CODE_LETTERS: "alqalam_code_letters",
    JUDGE_QUEUE: "alqalam_judge_queue",
    ANNOUNCER_QUEUE: "alqalam_announcer_queue",
    PRIZE_QUEUE: "alqalam_prize_queue",
    PUBLISHED_RESULTS: "alqalam_public_results",
    PUBLIC_SCORES: "alqalam_public_group_scores"
};

// Database Initialization
function initDB() {
    if (!localStorage.getItem(DB_KEYS.SCORES)) {
        const defaultScores = {
            A: { name: "Group A", score: 0 },
            B: { name: "Group B", score: 0 },
            C: { name: "Group C", score: 0 }
        };
        localStorage.setItem(DB_KEYS.SCORES, JSON.stringify(defaultScores));
        localStorage.setItem(DB_KEYS.PUBLIC_SCORES, JSON.stringify(defaultScores));
    }

    if (!localStorage.getItem(DB_KEYS.PROGRAMS)) localStorage.setItem(DB_KEYS.PROGRAMS, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.SCHEDULE)) localStorage.setItem(DB_KEYS.SCHEDULE, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.RESULTS)) localStorage.setItem(DB_KEYS.RESULTS, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.INDIVIDUAL)) localStorage.setItem(DB_KEYS.INDIVIDUAL, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.ENTRIES)) localStorage.setItem(DB_KEYS.ENTRIES, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.CODE_LETTERS)) localStorage.setItem(DB_KEYS.CODE_LETTERS, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.JUDGE_QUEUE)) localStorage.setItem(DB_KEYS.JUDGE_QUEUE, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.ANNOUNCER_QUEUE)) localStorage.setItem(DB_KEYS.ANNOUNCER_QUEUE, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.PRIZE_QUEUE)) localStorage.setItem(DB_KEYS.PRIZE_QUEUE, JSON.stringify([]));
    if (!localStorage.getItem(DB_KEYS.PUBLISHED_RESULTS)) localStorage.setItem(DB_KEYS.PUBLISHED_RESULTS, JSON.stringify([]));
}

// Get Data Helper
function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch(e) {
        return [];
    }
}

// Set Data Helper
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Export Data to Excel/CSV
function exportToExcel(keyName, fileName) {
    const data = getData(keyName);
    if (!data || data.length === 0) {
        alert("No data available to export!");
        return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Extract headers
    const sample = Array.isArray(data) ? data[0] : data;
    if (sample && typeof sample === 'object') {
        const headers = Object.keys(sample).join(",");
        csvContent += headers + "\r\n";
    }

    if (Array.isArray(data)) {
        data.forEach(row => {
            const rowData = Object.values(row).map(val => `"${val}"`).join(",");
            csvContent += rowData + "\r\n";
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize on Script Load
initDB();
