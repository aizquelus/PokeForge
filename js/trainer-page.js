const customTitle = document.getElementById("customTitle");
const delNameBtn = document.querySelector("#delNameBtn");
const trainerName = localStorage.getItem("trainerName");
let pokemonTeam = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
let randomPokemon = JSON.parse(localStorage.getItem("randomPokemon")) || [];

function showToast(message, destination, background) {
    Toastify({
        text: message,
        duration: 8000,
        destination: destination,
        newWindow: false,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: background,
            fontSize: "0.8rem",
        }
    }).showToast();
}

window.onscroll = function() {
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
};

document.getElementById("scrollToTop").addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

if (customTitle && trainerName) {

    pokemonTeam.length !== 0 && showToast(`You have an unsaved Pokemon team, ${trainerName}. Click here to finish it`, "pokemon-picker.html", "linear-gradient(to right, #cd665f, #ffcd00)");

    randomPokemon.length !== 0 && showToast(`You have an unsaved Random Pokemon team, ${trainerName}. Click here to finish it`, "pokemon-random.html", "linear-gradient(to right, #cc0404, #f2a4a4)");

    customTitle.innerText = `Welcome, ${trainerName}! \nWhat would you like to do today?`;

    delNameBtn.addEventListener("click", (e)=>{
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure you want to delet your data, trainer?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Trainer data deleted!',
                    text: `What's a legend without a name and their team? Your trainer data has been deleted, but don't worry, trainer! You can come back any time. Your Pokémon adventure is waiting for you!`,
                    icon: 'success',
                    showConfirmButton: true,
                }).then((result) => {
                    if(result.isConfirmed) {
                        setTimeout(()=>{
                            window.location.href = "../index.html"
                        },1000);
                    }
                })
                localStorage.removeItem("trainerName");
                localStorage.removeItem("pokemonTeam");
                localStorage.removeItem("randomPokemon");
                localStorage.removeItem("savedTeams");
            }
        });
    });
};




