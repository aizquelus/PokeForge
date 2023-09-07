
let cachedName = localStorage.getItem("trainerName");
let trainerName;

if(cachedName) {
    window.location.replace("pages/trainer-page.html");
} else {

    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const clearBtn = document.querySelector(".intro-btn--reset");
    const dialogText = document.querySelector(".dialog-text");

    clearBtn.addEventListener("click", ()=>{
        dialogText.innerText = `¡Hola entrenador/a! ¡Estás a punto de crear el equipo Pokemon que te llevará a la victoria!`;
        nameForm.reset();
    });

    function getTrainerName() {
        const inputValue = nameInput.value;

        if (inputValue === "" || inputValue === null || !isNaN(inputValue)) {
            dialogText.innerText = "Por favor, ingresa tu nombre de manera correcta para armar tu equipo Pokémon e iniciar tu aventura.";
        } else {
            localStorage.setItem("trainerName", inputValue);
            trainerName = inputValue;
            window.location.replace("pages/trainer-page.html");
        }
    }

    nameForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        getTrainerName();
    });
};