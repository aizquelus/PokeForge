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

const MAX_TEAM_SIZE = 6;
const WAIT_TIME_MS = 2500;

let pokemonTeam = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
let cachedName = localStorage.getItem("trainerName");
let isFilled = false;
let cardCount = 0;

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
    water: "#0190FF",
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

// Funciones de utilidad

function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

window.onscroll = function() {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTop").addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

function removeAllChildren(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function showModal(title, message) {
    modalTitle.innerText = title;
    modalBodyText.innerText = message;
    modal.show();
}

function resetVars() {
    cardCount = 0;
    teamTitle.innerText = "";
    nameFilter.value = "";
    pokemonTeam = [];
    isFilled = false;
    saveBtn.classList.add("hidden")
}

// Otras funciones

function addPokemonToTeam(pokemon, arr) {
    const capitalizedPokeName = capitalizeText(pokemon.name);
    if (arr.length < MAX_TEAM_SIZE) {
        arr.push(pokemon);
        localStorage.setItem("pokemonTeam", JSON.stringify(pokemonTeam));
        Toastify({
            text: `${capitalizedPokeName} has been added to your team!`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    } else {
        modalTitle.innerText = `Your team is full already!`;
        modalBodyText.innerText = `You already have 6 Pokémon in your team, ${cachedName}! No more Pokémon can be added.`;
        modal.show();
    }
}

function removePokemonFromTeam(pokemonName, arr) {
    const index = arr.findIndex(pokemon => pokemon.name === pokemonName);
    if (index !== -1) {
        arr.splice(index, 1);
        localStorage.setItem("pokemonTeam", JSON.stringify(pokemonTeam));
    }
}

function createPokemonCard(pokemon){
    const {image, name, type} = pokemon;
    const colorHex = typeColor[type];
    const capitalizedPokeName = capitalizeText(name);
    if(cardCount < MAX_TEAM_SIZE){
        const pokemonListItem = document.createElement("li");
        pokemonListItem.innerHTML = 
        `
        <div class="card" style="width: 18rem; background: radial-gradient(circle at 50% 0%, ${colorHex} 36%, #ffffff 36%); background-color: ${colorHex};">
            <img src=${image} class="card-img-top" alt="${name}">
            <div class="card-body">
                <h5 class="card-title">${capitalizedPokeName}</h5>
                <p><span class="type" style="background-color: ${colorHex}">${type}</span></p>
            </div>
            <button id="clearBtn" class="delete-button intro-btn intro-btn--reset" type="button">Delete</button>
        </div>
        `;

        const deleteBtn = pokemonListItem.querySelector(".delete-button");
        const pokemonName = pokemonListItem.querySelector(".card-title").innerText;
        deleteBtn.addEventListener("click", ()=>{
            pokemonListItem.remove();
            removePokemonFromTeam(pokemonName, pokemonTeam);
            cardCount--;
            isFilled = false;
            saveBtn.disabled = true;
            saveBtn.classList.add("hidden");
        })

        pickedList.appendChild(pokemonListItem);
        cardCount++;

        if(cardCount === MAX_TEAM_SIZE) {
            isFilled = true;
            saveBtn.disabled = false;
            saveBtn.classList.remove("hidden");
        }
    }
}

function filterPokemonByName(arr, chosenPokemon) {
    return arr.filter((el) => el.name.includes(chosenPokemon));
};

function renderPokemon(arr){
    arr.forEach((pokemon)=>{
        const {image, name, type} = pokemon;
        const colorHex = typeColor[type] + "9c";
        const selectablePokemon = document.createElement("li");
        // selectablePokemon.classList.add("background-shape")
        selectablePokemon.innerHTML = `
            <img src=${image} class="selectable" alt="${name}" style="background-color: ${colorHex}">
        `;
        availList.appendChild(selectablePokemon);
    })
}

function selectPokemon(arr){
    pokeItems = document.querySelectorAll(".selectable");

    for (const item of pokeItems) {
        item.addEventListener("click", () => {
            const selectedPokemon = arr.find(({name}) => name === item.alt);
            if (selectedPokemon) {
                addPokemonToTeam(selectedPokemon, pokemonTeam);
                createPokemonCard(selectedPokemon);
            }
        });
    }
}

function getPokemonList(arr){
    return new Promise((resolve, reject)=>{
        if(pokemonTeam.length !== 0) {
            pickedList.innerHTML = "RECOVERING YOUR LIST...";
        }
        availList.innerHTML = "LOADING...";

        setTimeout(()=>{
            if(arr){
                pickedList.innerHTML = "";
                availList.innerHTML = "";
                resolve(arr);
            } else {
                reject(("Error"));
            }
        },2500)
    })
}

function initPokemonList() {
    renderPokemon(availablePokemon);
    selectPokemon(availablePokemon);
}

function getUnsavedPokemon(){
    for (const pokemon of pokemonTeam) {
        createPokemonCard(pokemon)
    }
}

getPokemonList(availablePokemon)
.then(()=>{
    initPokemonList();
    if(pokemonTeam.length !== 0){
        getUnsavedPokemon();
    }
})
.catch(err => {
    availList.innerHTML = err;
    pickedList.innerHTML = err;
})

function renderFilteredPokemon(arr) {
    availList.innerHTML = "";

    if (arr.length === 0) {
        const notFoundElement = document.createElement("li");
        notFoundElement.innerText = "No matches found!";
        availList.appendChild(notFoundElement);
    } else {
        renderPokemon(arr);
        selectPokemon(arr);
    }
}

function handleSearch() {
    const searchTerm = nameFilter.value;
    const searchTermLowercase = searchTerm.toLowerCase();
    
    const foundPokemon = filterPokemonByName(availablePokemon, searchTermLowercase);
    renderFilteredPokemon(foundPokemon);
}

function fetchPokemon(id) {
    return new Promise ((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res)=> {
                if(!res.ok) {
                    reject(`HTTP Error! Status: ${res.status}`);
                } else {
                    resolve(res.json());
                }
            });
    });
}

async function fetchPokemons(n) {
    for(let i = 1; i <= n; i++) {
        try {
            const data = await fetchPokemon(i);
            const { id, name, sprites, types } = data;
            const pokemon = new Pokemon(id, name, sprites.front_default, types[0].type.name);
            availablePokemon.push(pokemon);
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
            showModal('Error!', 'An error ocurred while trying to get the Pokemon data. Please, try again later, trainer!');
        }
    }

}

fetchPokemons(150);

// Event listeners

teamName.addEventListener("keyup", (e) => {
    
    if (e.key === "Enter") {
        teamName.value !== "" && (teamTitle.innerText = teamName.value);
        teamName.value = "";
    }
});

addBtn.addEventListener("click", ()=>{

    teamName.value !== "" && (teamTitle.innerText = teamName.value);

    teamName.value = "";
});

nameFilter.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
});

searchBtn.addEventListener("click", () => {
    handleSearch();
});

clearBtn.addEventListener("click", ()=>{
    nameFilter.value = "";
    removeAllChildren(availList);
    initPokemonList();
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

        removeAllChildren(pickedList);
        removeAllChildren(availList);

        showModal(`Congratulations, ${cachedName}!`, `Your Pokémon team has been saved successfully. Come back soon to create new amazing Pokémon teams!`);

        localStorage.removeItem("pokemonTeam");
        initPokemonList();

    } else {
        showModal(`Something went wrong!`, `Please, give your team a name before attempting to save it, trainer!`);
    }
});

