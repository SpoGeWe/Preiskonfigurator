document.querySelectorAll(".person").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".person").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        resetSelections();
        updateTrainingButtons();
        updatePreis();
    });
});

document.querySelectorAll(".training").forEach(button => {
    button.addEventListener("click", function () {
        if (!this.classList.contains("enabled")) return;

        document.querySelectorAll(".training").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        updateDayButtons();
        updatePreis();
    });
});

document.querySelectorAll(".day").forEach(button => {
    button.addEventListener("click", function () {
        if (this.classList.contains("disabled")) return;

        let selectedDays = document.querySelectorAll(".day.selected").length;
        let training = document.querySelector(".training.active")?.id;

        if (training === "1tag") {
            document.querySelectorAll(".day").forEach(btn => {
                btn.classList.remove("selected");
                btn.style.backgroundColor = "#FFA500"; // Zurück auf Gelb
            });
            this.classList.add("selected");
            this.style.backgroundColor = "darkorange";
        } else if (training === "2tage") {
            if (selectedDays < 2 || this.classList.contains("selected")) {
                this.classList.toggle("selected");
            }
            let newSelected = document.querySelectorAll(".day.selected");
            if (newSelected.length > 2) {
                newSelected[0].classList.remove("selected");
                newSelected[0].style.backgroundColor = "#FFA500"; // Zurück auf Gelb
            }
        }

        updatePreis();
    });
});
document.querySelectorAll(".duration").forEach(button => {
    button.addEventListener("click", function () {
        // Alle Buttons zurücksetzen
        document.querySelectorAll(".duration").forEach(btn => {
            btn.classList.remove("selected");
            btn.style.backgroundColor = "white"; // Standardfarbe
            btn.style.color = "black";
        });

        // Gewählten Button markieren
        this.classList.add("selected");
        this.style.backgroundColor = "darkred"; // Rot für aktive Auswahl
        this.style.color = "white";

        updatePreis();
    });
});

function updateTrainingButtons() {
    let person = document.querySelector(".person.active")?.id;

    document.querySelectorAll(".training").forEach(button => {
        button.classList.remove("enabled", "active");
        button.style.backgroundColor = "white";
        button.style.opacity = "0.5";
        button.style.pointerEvents = "none";
    });

    let erlaubteButtons = [];

    if (person === "erwachsene" || person === "behinderung") {
        document.querySelectorAll(".training").forEach(button => {
            button.classList.add("enabled");
            button.style.backgroundColor = "lightblue";
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        });
    } else if (person === "mutter") {
        erlaubteButtons = ["1tag", "2tage", "9-11"];
    } else if (person === "student") {
        erlaubteButtons = ["1tag", "2tage", "15-17"];
    } else if (person === "rentner") {
        erlaubteButtons = ["1tag", "2tage", "11-13"];
    }

    erlaubteButtons.forEach(id => {
        let button = document.getElementById(id);
        if (button) {
            button.classList.add("enabled");
            button.style.backgroundColor = "lightblue";
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        }
    });
}

function updateDayButtons() {
    let selectedTraining = document.querySelector(".training.active")?.id || "";

    document.querySelectorAll(".day").forEach(button => {
        button.classList.remove("selected", "disabled");
        button.style.backgroundColor = "#FFA500";
        button.style.pointerEvents = "auto";
    });

    if (["9-11", "11-13", "13-15", "15-17", "17-19", "19-21"].includes(selectedTraining)) {
        ["mo", "di", "mi", "do", "fr"].forEach(id => {
            let button = document.getElementById(id);
            button.classList.add("selected");
            button.style.backgroundColor = "darkorange";
            button.style.pointerEvents = "none";
        });

        ["sa", "so"].forEach(id => {
            let button = document.getElementById(id);
            button.classList.add("disabled");
            button.style.backgroundColor = "white";
            button.style.pointerEvents = "none";
        });
    }

    if (selectedTraining === "alle") {
        document.querySelectorAll(".day").forEach(button => {
            button.classList.add("selected");
            button.style.backgroundColor = "darkorange";
            button.style.pointerEvents = "none";
        });
    }
}

function resetSelections() {
    document.querySelectorAll(".training").forEach(button => {
        button.classList.remove("active", "enabled");
        button.style.backgroundColor = "white";
        button.style.opacity = "0.5";
        button.style.pointerEvents = "none";
    });

    document.querySelectorAll(".day").forEach(button => {
        button.classList.remove("selected", "disabled");
        button.style.backgroundColor = "#FFA500";
        button.style.pointerEvents = "auto";
    });
}
