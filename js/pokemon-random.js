const teamTitle = document.querySelector(".team-title")
const teamName = document.getElementById("teamName");
const addBtn = document.getElementById("addBtn");
const createBtn = document.getElementById("createBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.querySelector("#save");
const pokeList = document.getElementById("pokeList");
const spinner = document.querySelector("#spinner");

const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const modalTitle = document.querySelector(".modal-title");
const modalBodyText = document.querySelector(".modal-body-text");

const WAIT_TIME_MS = 1500;
let isFilled = false;
let randomPokemon = [];
let cachedName = localStorage.getItem("trainerName");

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF"
};

class Pokemon {
    constructor(pID, pName, pImage, pType) {
        this.id = pID;
        this.name = pName;
        this.image = pImage,
        this.type = pType;
    };
};

const availablePokemon = [];

window.onscroll = function() {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTop").addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

async function fetchPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    const { id: id_1, name, sprites, types } = data;
    const pokemon = new Pokemon(id_1, name, sprites.front_default, types[0].type.name);
    return pokemon;
}

function fetchPokemons(n) {
    const promises = [];
    for (let i = 1; i <= n; i++) {
        promises.push(fetchPokemon(i));
    }

    return Promise.all(promises);
}

function initPokemonList() {
    fetchPokemons(150)
        .then((pokemonData) => {
            availablePokemon.push(...pokemonData);

            const cachedRandomPokemon = JSON.parse(localStorage.getItem("randomPokemon")) || [];
            if (cachedRandomPokemon && cachedRandomPokemon.length > 0) {
                createBtn.innerText = "Try Again";
                createBtn.classList.add("intro-btn--proceed");
                randomPokemon = cachedRandomPokemon;
                randomPokemon.forEach((pokemon) => {
                    if (pokeList.childElementCount < 6) {
                        const li = createPokemonCard(pokemon);
                        pokeList.appendChild(li);
                    }
                });
                saveBtn.disabled = false;
                saveBtn.classList.remove("hidden");
                isFilled = true;
            }
        })
        .catch((error) => {
            console.error("Error al cargar Pokémon:", error);
        });
}

initPokemonList();

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
    const availableIndexes = Array.from({ length: mainArr.length }, (_, index) => index);

    while (randomizedArray.length < amount && availableIndexes.length > 0) {
        const randomIndex = getRandomNumber(0, availableIndexes.length);
        const selectedIndex = availableIndexes.splice(randomIndex, 1)[0];
        randomizedArray.push(mainArr[selectedIndex]);
    }

    return randomizedArray;
};

function createPokemonCard(pokemon) {
    const {image, name, type} = pokemon;
    const colorHex = typeColor[type];
    const capitalizedPokeName = capitalizeText(name)
    const li = document.createElement("li");
        li.innerHTML = 
        `
        <div class="card" style="width: 18rem; background: radial-gradient(circle at 50% 0%, ${colorHex} 36%, #ffffff 36%); background-color: ${colorHex};">
            <img src=${image} class="card-img-top" alt="${name}">
            <div class="card-body">
                <h5 class="card-title">${capitalizedPokeName}</h5>
                <p><span class="type" style="background-color: ${colorHex}">${type}</span></p>
            </div>
        </div>
        `;

        return li;
};

function clearPokeList() {
    while (pokeList.firstChild) {
        pokeList.removeChild(pokeList.firstChild);
    }
    localStorage.removeItem("randomPokemon");
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
        if(randomPokemon.length !== 0){
            while(pokeList.firstChild){
                pokeList.removeChild(pokeList.firstChild);
            }
            randomPokemon = [];
            saveBtn.disabled = true;
            saveBtn.classList.add("hidden");
        }

        spinner.classList.remove("hidden");

        setTimeout(() => {
            createBtn.innerText = "Try Again";
            createBtn.classList.add("intro-btn--proceed");
            randomPokemon = getRandomPokemon(availablePokemon, 6);

            localStorage.setItem("randomPokemon", JSON.stringify(randomPokemon));

            randomPokemon.forEach((pokemon) => {
                if (pokeList.childElementCount < 6) {
                    const li = createPokemonCard(pokemon);
                    pokeList.appendChild(li);
                }
            });

            saveBtn.disabled = false;
            saveBtn.classList.remove("hidden");
            spinner.classList.add("hidden");
        }, WAIT_TIME_MS);

        isFilled = true;
});


teamName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleAddTitle();
    }
});

addBtn.addEventListener("click", () => {
    handleAddTitle();
});

clearBtn.addEventListener("click", ()=>{
    teamTitle.innerText = "";
    teamName.value = "";
    randomPokemon = [];
    clearPokeList();
    isFilled = false;
    createBtn.innerText = "Create Team";
    createBtn.classList.remove("intro-btn--proceed");
    saveBtn.disabled = true;
    saveBtn.classList.add("hidden");
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
        randomPokemon = [];
        isFilled = false;
        while (pokeList.firstChild) {
            pokeList.removeChild(pokeList.firstChild);
        }
        createBtn.innerText = "Create Team";
        createBtn.classList.remove("intro-btn--proceed")
        saveBtn.disabled = true;
        saveBtn.classList.add("hidden");
        localStorage.removeItem("randomPokemon");

        showModal(`Congratulations, ${cachedName}!`, `Your Pokémon team has been saved successfully. Come back soon to create new amazing Pokémon teams!`);

    } else {
        showModal(`Something went wrong!`, `Please, give your team a name before attempting to save it, trainer!`);
    }
});