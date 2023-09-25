const cachedName = localStorage.getItem("trainerName");
const cachedTeams = JSON.parse(localStorage.getItem("savedTeams")) || [];

const savedTitle = document.querySelector("#savedTitle");
const accordion = document.querySelector("#accordionExample");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");

window.onscroll = function() {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTop").addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

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
                <p>${pokeNames.join(", ")}</p>
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
    savedTitle.innerText = `Oops! Looks like you do not have any teams saved, ${cachedName}.`
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
        deleteBtn.innerText = "Delete All Teams";

        accordion.append(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            Swal.fire({
                title: 'Are you sure you want to delete all your Pokemon teams?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        `All Pokémon teams deleted!`,
                        `${cachedName}, looks like all your Pokémon teams are gone! Feel free to come back and catch them all again. :)`,
                        'success'
                    )
                    localStorage.removeItem("savedTeams");
                    accordion.remove();
                    savedTitle.innerText = `Oops! Looks like you do not have any teams saved yet, ${cachedName}.`
                }
            })
        });
    }
};