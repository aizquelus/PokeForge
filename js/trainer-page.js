const customTitle = document.getElementById("customTitle");
const delNameBtn = document.querySelector("#delNameBtn");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalElement = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");
const trainerName = localStorage.getItem("trainerName");

function showModal(title, message) {
    modalTitle.innerText = title;
    modalBodyText.innerText = message;
    modal.show();
};

if (customTitle && trainerName) {
    customTitle.innerText = `Welcome, ${trainerName}! \nWhat would you like to do today?`;

    delNameBtn.addEventListener("click", (e)=>{
        e.preventDefault();

        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar tu nombre de entrenador?");

        if(confirmed) {
            showModal(`Trainer name deleted!`, `What's a legend without a name? Your trainer name has been deleted, but don't worry, trainer! You can come back any time. Your Pokémon adventure is waiting for you!`);

            modalElement.addEventListener("hidden.bs.modal", ()=>{
                localStorage.removeItem("trainerName");
                window.location.href = "../index.html"
            });
        };
    });
};




