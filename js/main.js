
let cachedName = localStorage.getItem("trainerName");
let trainerName;

window.onscroll = function() {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTop").addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

if(cachedName) {
    window.location.replace("pages/trainer-page.html");
} else {

    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const clearBtn = document.querySelector(".intro-btn--reset");
    const dialogText = document.querySelector(".dialog-text");

    clearBtn.addEventListener("click", ()=>{
        dialogText.innerText = `Hi trainer! You're about to create the Pokémon team that will take you to the victory!`;
        nameForm.reset();
    });

    function getTrainerName() {
        const inputValue = nameInput.value;

        if (inputValue === "" || inputValue === null || !isNaN(inputValue)) {
            dialogText.innerText = "Please, type your name correctly to build your Pokémon team and begin your adventure.";
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