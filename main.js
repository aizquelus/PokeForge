document.addEventListener("DOMContentLoaded", () => {
    let trainerName;
    let choice;
    let chosenPokemon;
    let randomPokemon;
    let pokeNames;
    let pokemonTeam = [];
    const availablePokemon = [];

    class Pokemon {
        constructor(pID, pName, pType) {
            this.id = pID;
            this.name = pName;
            this.type = pType;
        };
    };

    availablePokemon.push(new Pokemon(0001, "Bulbasaur", "Planta/Veneno"));
    availablePokemon.push(new Pokemon(0004, "Charmander", "Fuego"));
    availablePokemon.push(new Pokemon(0005, "Charmeleon", "Fuego"));
    availablePokemon.push(new Pokemon(0006, "Charizard", "Fuego/Volador"));
    availablePokemon.push(new Pokemon(0007, "Squirtle", "Agua"));
    availablePokemon.push(new Pokemon(0008, "Wartortle", "Agua"));
    availablePokemon.push(new Pokemon(0009, "Blastoise", "Agua"));
    availablePokemon.push(new Pokemon(0010, "Caterpie", "Bicho"));

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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

    function getPokemonName(arr) {
        return arr.map((el, i) => `${i + 1}. ${el.name}`);
    }

    function findPokemonByName(arr, chosenPokemon) {
        return arr.find(el => {
            return el.name.includes(chosenPokemon);
        });
    };

    function addPokemon(pokemon) {
        pokemonTeam.push(pokemon);
    };

    alert("¡Hola entrenador/a! ¡Estás a punto de crear el equipo Pokemon que te llevará a la victoria!");

    function getTrainerName(){
        trainerName = prompt("Primero, ¿cuál es tu nombre?");
    }

    getTrainerName();

    while(trainerName == "" || trainerName == null || !isNaN(trainerName)) {
        alert("Por favor, ingresa tu nombre de manera correcta para armar tu equipo Pokemon e iniciar tu aventura.")
        
        getTrainerName();
    };

    trainerName = capitalizeFirstLetter(trainerName);

    function getTrainerChoice() {
        choice = parseInt(prompt(`${trainerName}... ¡Vaya! Incluso tu nombre suena legendario. \n Y dime, ${trainerName} ¿Qué prefieres hacer? \n 1. ¡Crear mi propio equipo Pokémon! \n 2. ¡Atrápalos por mi!`));
    }

    getTrainerChoice();

    while(isNaN(choice) || choice < 1 || choice > 2) {
        alert("Por favor, ingresa 1 o 2");
        getTrainerChoice();
    };

    if(choice === 1) {
        pokeNames = getPokemonName(availablePokemon);
        
        let i = 5;
        while(pokemonTeam.length < 6 && i >= 0) {
            chosenPokemon = prompt(`¡Manos a la obra! Elige alguno de los siguientes Pokemon disponibles: \n${pokeNames.join("\n")}`);

            while(chosenPokemon == "" || chosenPokemon == null || !isNaN(chosenPokemon)) {
                alert("Por favor, ingresa un Pokemon válido. \nNo se permiten números ni espacios en blanco.")
                
                chosenPokemon = prompt(`¡Manos a la obra! Elige alguno de los siguientes Pokemon disponibles: \n${pokeNames.join("\n")}`);
            };
            
            chosenPokemon = capitalizeFirstLetter(chosenPokemon);

            let foundPokemon = findPokemonByName(availablePokemon, chosenPokemon);
        
            if(foundPokemon){
                addPokemon(foundPokemon);
        
                alert(`¡Haz agregado a ${foundPokemon.name} a tu equipo! Te quedan ${i} Pokemon para agregar.`);
        
                i--;
            } else {
                alert("No se encontró el Pokémon deseado.");
            };
        };
        pokeNames = getPokemonName(pokemonTeam);
        
    } else if(choice === 2) {
        randomPokemon = getRandomPokemon(availablePokemon, 6);
        
        pokeNames = getPokemonName(randomPokemon);
    };
        
    alert(`¡Enhorabuena! Este es tu nuevo equipo Pokemon: \n${pokeNames.join("\n")}`);
    alert("¡Vuelve pronto entrenador/a! Tus Pokemon te esperan. :)");

});