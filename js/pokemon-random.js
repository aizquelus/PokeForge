const teamTitle = document.querySelector(".team-title")
const teamName = document.getElementById("teamName");
const addBtn = document.getElementById("addBtn");
const createBtn = document.getElementById("createBtn");
const regenerateBtn = document.getElementById("regenerateBtn");
const saveBtn = document.querySelector("#save");
const pokeList = document.getElementById("pokeList");

const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");

let isFilled = false;
let randomPokemon;
let cachedName = localStorage.getItem("trainerName");
let pokeNames;
let teamInfoData = [];

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

class TeamInfo {
    constructor(tName, pTeam) {
        this.tName = tName,
        this.pTeam = pTeam
    }
}

function getPokemonName(arr) {
    return arr.map((el, i) => `${el.name}`);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPokemon(mainArr, amount) {
    const randomizedArray = [];
    const usedIndexes = [];

    while (randomizedArray.length < amount) {
        const randomIndex = getRandomNumber(0, mainArr.length);

        if (!usedIndexes.includes(randomIndex)) {
            randomizedArray.push(mainArr[randomIndex]);
            usedIndexes.push(randomIndex);
        }
    }

    return randomizedArray;
};

function createPokemonCard(arr) {
    const path = `../img/pokemon-${arr.name}.png`;
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${path}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${arr.name}</h5>
                <p>${arr.type}</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    `;
    return li;
};

function clearPokeList() {
    while (pokeList.firstChild) {
        pokeList.removeChild(pokeList.firstChild);
    }
};

function handleAddTitle() {
    if (teamName.value !== "") {
        teamTitle.innerText = teamName.value;
    }
    teamName.value = "";
};

function showModal(title, message) {
    modalTitle.innerText = title;
    modalBodyText.innerText = message;
    modal.show();
};

createBtn.addEventListener("click", () => {
    if (!isFilled) {
        randomPokemon = getRandomPokemon(availablePokemon, 6);

        randomPokemon.forEach((pokemon) => {
            if (pokeList.childElementCount < 6) {
                const li = createPokemonCard(pokemon);
                pokeList.appendChild(li);
            }
        });

        isFilled = true;
    }
});

teamName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleAddTitle();
    }
});

addBtn.addEventListener("click", () => {
    handleAddTitle();
});

regenerateBtn.addEventListener("click", ()=>{
    teamTitle.innerText = "";
    teamName.value = "";
    randomPokemon = undefined;
    clearPokeList();
    isFilled = false;
});

saveBtn.addEventListener("click", () => {

    const cachedTeams = JSON.parse(localStorage.getItem("savedTeams")) || [];

    const objToStore = {
        teamTitle: teamTitle.innerText,
        pokemonTeam: randomPokemon
    };

    if (teamTitle.innerText && isFilled) {

        cachedTeams.push(objToStore);

        localStorage.setItem("savedTeams", JSON.stringify(cachedTeams));
        teamTitle.innerText = "";
        randomPokemon = undefined;
        isFilled = false;
        while (pokeList.firstChild) {
            pokeList.removeChild(pokeList.firstChild);
        }

        showModal(`Congratulations, ${cachedName}!`, `Your Pokémon team has been saved successfully. Come back soon to create new amazing Pokémon teams!`);

    } else {
        showModal(`Something went wrong!`, `Please, give your team a name and create it before attempting to save it, trainer!`);
    }
});