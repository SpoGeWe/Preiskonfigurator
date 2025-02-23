// Preislisten-Datenbank aus der Tabelle
const preisliste = {
    "1 Monat": [28.91, 33.62, 39.00, 42.25, 45.50, 48.75, 52.00, 58.50, 65.00],
    "2 Monate": [28.10, 32.67, 37.90, 41.06, 44.22, 47.38, 50.53, 56.85, 63.17],
    "3 Monate": [27.28, 31.73, 36.80, 39.87, 42.93, 46.00, 49.07, 55.20, 61.34],
    "4 Monate": [26.47, 30.78, 35.70, 38.68, 41.65, 44.63, 47.60, 53.55, 59.50],
    "5 Monate": [25.65, 29.83, 34.60, 37.49, 40.37, 43.26, 46.14, 51.90, 57.67],
    "6 Monate": [24.84, 28.88, 33.50, 36.30, 39.13, 41.88, 44.64, 50.25, 55.84],
    "7 Monate": [24.02, 27.94, 32.41, 35.10, 37.80, 40.51, 43.22, 48.61, 54.01],
    "8 Monate": [23.21, 26.99, 31.31, 33.91, 36.52, 39.13, 41.74, 46.96, 52.18],
    "9 Monate": [22.39, 26.04, 30.21, 32.72, 35.24, 37.76, 40.28, 45.31, 50.35],
    "10 Monate": [21.58, 25.09, 29.11, 31.53, 33.96, 36.39, 38.81, 43.66, 48.51],
    "11 Monate": [20.76, 24.15, 28.01, 30.34, 32.67, 35.01, 37.35, 42.01, 46.68],
    "12 Monate": [19.95, 23.20, 26.91, 29.15, 31.39, 33.64, 35.88, 40.36, 44.85],
    "24 Monate": [18.95, 22.20, 25.91, 28.15, 30.39, 32.64, 34.88, 39.36, 43.85]

};

// Trainingsoptionen zu den entsprechenden Spalten indizieren
const trainingsOptionen = [
    "1tag", "2tage", "9-11", "11-13", "13-15", "15-17", "17-19", "19-21", "alle"
];

// Preisberechnungsfunktion
function updatePreis() {
    let person = document.querySelector(".person.active")?.textContent || "Keine Auswahl";
    let training = document.querySelector(".training.active")?.id || "";
    let days = [...document.querySelectorAll(".day.selected")].map(btn => btn.textContent).join(", ") || "Keine Auswahl";
    let duration = document.querySelector(".duration.selected")?.textContent || "";

    let rabatt = 1.0;
    if (person === "Menschen mit Behinderung") rabatt = 0.85; // 15% Rabatt für Menschen mit Behinderung

    if (!preisliste[duration] || !training) {
        document.getElementById("mitgliedsbeitrag").textContent = `Dein Mitgliedsbeitrag: - € (${person} | ${training} | ${days} | ${duration})`;
        return;
    }

    let trainingIndex = trainingsOptionen.indexOf(training);
    let preis = preisliste[duration][trainingIndex] * rabatt;

    document.getElementById("mitgliedsbeitrag").textContent = `Dein Mitgliedsbeitrag: ${preis.toFixed(2)} € (${person} | ${training} | ${days} | ${duration})`;
}
