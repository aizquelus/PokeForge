const cachedName = localStorage.getItem("trainerName");
const cachedTeams = JSON.parse(localStorage.getItem("savedTeams")) || [];

const savedTitle = document.querySelector("#savedTitle");
const accordion = document.querySelector("#accordionExample");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");

let pokeElement;
let pokeList = [];

function getPokemonName(arr) {
    return arr.map((el, i) => `${i + 1}. ${el.name}`);
};

function generateAccordionItem(team, teamIndex) {
    const title = team.teamTitle;
    const pokeNames = getPokemonName(team.pokemonTeam);

    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    accordionItem.innerHTML = `
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsed${teamIndex}"
                aria-expanded="true" aria-controls="collapsed${teamIndex}">
                ${title}
            </button>
        </h2>
        <div id="collapsed${teamIndex}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                ${pokeNames.join(", ")}
            </div>
        </div>
    `;

    return accordionItem;
};

function showModal(title, message) {
    modalTitle.innerText = title;
    modalBodyText.innerText = message;
    modal.show();
};

if(cachedTeams.length == 0 ) {
    savedTitle.innerText = `Oops! Looks like you do not have any teams saved, trainer, ${cachedName}.`
} else {
    savedTitle.innerText = `Hello, ${cachedName}! Here are your saved Pokémon teams.`

    cachedTeams.forEach((team, index) => {
        const accordionItem = generateAccordionItem(team, index);
        accordion.appendChild(accordionItem);
    });

    if (accordion) {
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("intro-btn", "intro-btn--reset", "delete");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.innerText = "Delete Teams";

        accordion.append(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            const confirmed = window.confirm("¿Estás seguro de que deseas eliminar todos tus equipos Pokémon?");

            if(confirmed){
                localStorage.removeItem("savedTeams");
                accordion.remove();
                savedTitle.innerText = `Oops! Looks like you do not have any teams saved yet, ${cachedName}.`

                showModal(`All Pokémon teams deleted!`, `${cachedName}, looks like all your Pokémon teams are gone! Feel free to come back and catch them all again. :)`);
            };
        });
    }
};