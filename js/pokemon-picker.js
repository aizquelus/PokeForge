const teamTitle = document.querySelector(".picker-title");
const teamName = document.getElementById("teamName");
const nameFilter = document.getElementById("nameFilter");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn")
const availList = document.querySelector(".pokemon-available");
const pickedList = document.querySelector(".pokemon-container");
const saveBtn = document.querySelector("#save");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");

let cachedName = localStorage.getItem("trainerName");
let isFilled = false;
let chosenPokemon;
let pokeNames;
let pokemonTeam = [];
let teamInfoData = [];
let foundPokemon = [];
let pokeItems;
let cardCount = 0;

class Pokemon {
    constructor(pID, pName, pType) {
        this.id = pID;
        this.name = pName;
        this.type = pType;
    };
};

const availablePokemon = [
    new Pokemon(0001, "bulbasaur", "Planta/Veneno"),
    new Pokemon(0004, "charmander", "Fuego"),
    new Pokemon(0005, "charmeleon", "Fuego"),
    new Pokemon(0006, "charizard", "Fuego/Volador"),
    new Pokemon(0007, "squirtle", "Agua"),
    new Pokemon(0008, "wartortle", "Agua"),
    new Pokemon(0009, "blastoise", "Agua"),
    new Pokemon(0010, "caterpie", "Bicho")
];

function resetVars() {
    itemCount = 0;
    cardCount = 0;
    teamTitle.innerText = "";
    nameFilter.value = "";
    pokemonTeam = [];
    availList
    isFilled = false;
}

function addPokemonToTeam(pokemon) {
    if (pokemonTeam.length < 6) {
        pokemonTeam.push(pokemon);
    } else {
        modalTitle.innerText = `Your team is full already!`;
        modalBodyText.innerText = `You already have 6 Pokémon in your team, ${cachedName}! No more Pokémon can be added.`;
        modal.show();
    }
}

function removePokemonFromTeam(pokemonName) {
    const index = pokemonTeam.findIndex(pokemon => pokemon.name === pokemonName);
    if (index !== -1) {
        pokemonTeam.splice(index, 1);
    }
}

function showModal(title, message) {
    modalTitle.innerText = title;
    modalBodyText.innerText = message;
    modal.show();
}

function createPokemonCard(arr){
    if(cardCount < 6){
        let path = `"../img/pokemon-${arr.name}.png"`
        const li = document.createElement("li");
        li.innerHTML = 
        `
        <div class="card" style="width: 18rem;">
            <img src=${path} class="card-img-top" alt="${arr.name}">
            <div class="card-body">
                <h5 class="card-title">${arr.name}</h5>
                <p>${arr.type}</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <button>Delete</button>
        </div>
        `;
        pickedList.appendChild(li);

        cardCount++;

        if(cardCount === 6) {
            isFilled = true;
        }
    }
}

function filterPokemonByName(arr, chosenPokemon) {
    return arr.filter((el) => {
        return el.name.includes(chosenPokemon);
    });
};

function renderPokemonList(pokemonList) {
    availList.innerHTML = "";

    if (pokemonList.length === 0) {
        const li = document.createElement("li");
        li.innerText = "No se encontraron coincidencias!";
        availList.appendChild(li);
    } else {
        pokemonList.forEach((pokemon) => {
            let path = `"../img/pokemon-${pokemon.name}.png"`
            const li = document.createElement("li");
            li.innerHTML = `
                <img src=${path} class="selectable" alt="${pokemon.name}">
            `;
            availList.appendChild(li);
        });

        pokeItems = document.querySelectorAll(".selectable");

        for (const item of pokeItems) {
            item.addEventListener("click", () => {
                const selectedPokemon = pokemonList.find((pokemon) => pokemon.name === item.alt);
                if (selectedPokemon) {
                    addPokemonToTeam(selectedPokemon);
                    createPokemonCard(selectedPokemon);
                }
            });
        }
    }
}

function handleSearch() {
    const searchTerm = nameFilter.value;
    itemCount = 0;

    foundPokemon = filterPokemonByName(availablePokemon, searchTerm);
    renderPokemonList(foundPokemon);
}

teamName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (teamName.value !== "") {
            teamTitle.innerText = teamName.value;
        }
        teamName.value = "";
    }
});

addBtn.addEventListener("click", ()=>{
    if(teamName.value !== ""){
        teamTitle.innerText = teamName.value;
    };

    teamName.value = "";
});

nameFilter.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

searchBtn.addEventListener("click", () => {
    handleSearch();
});

clearBtn.addEventListener("click", ()=>{
    itemCount = 0;
    nameFilter.value = "";
    while (availList.firstChild) {
        availList.removeChild(availList.firstChild);
    }
});

pickedList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const card = event.target.closest(".card");
        if (card) {
            card.remove();
            const pokemonName = card.querySelector(".card-title").innerText;
            removePokemonFromTeam(pokemonName);
            cardCount--;
        }
    }
});

saveBtn.addEventListener("click", () => {

    const cachedTeams = JSON.parse(localStorage.getItem("savedTeams")) || [];

    const objToStore = {
        teamTitle: teamTitle.innerText,
        pokemonTeam: pokemonTeam
    };

    if (teamTitle.innerText && isFilled) {
        cachedTeams.push(objToStore);
        localStorage.setItem("savedTeams", JSON.stringify(cachedTeams));

        resetVars();

        while (pickedList.firstChild) {
            pickedList.removeChild(pickedList.firstChild);
        }

        while (availList.firstChild) {
            availList.removeChild(availList.firstChild);
        }

        showModal(`Congratulations, ${cachedName}!`, `Your Pokémon team has been saved successfully. Come back soon to create new amazing Pokémon teams!`);

    } else {
        showModal(`Something went wrong!`, `Please, give your team a name and fill it before attempting to save it, trainer!`);
    }
});

