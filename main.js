let user = prompt("Bienvenido/a al autogestor de reuniones de la Agencia de Marketing Digital White Mirror Agency, encantados de poder atenderte. \n¡Estás a solo un paso de poder agendar un espacio con uno de nuestros asesores para impulsar tu negocio! \n¿Cuál es tu nombre?");

let isUser = (user != "" && user != null);
let isValidDay;
let day;
let mensaje;
let userChoice;

let choice = function() {
    let choiceResult = parseInt(prompt(`¡Hola, ${user}! \n¿Deseas coordinar una llamada con uno de nuestros asesores el día de hoy? \nIngresa el número que corresponda: \n1. Si \n2. No`));

    return choiceResult;
};

function selectDay(){
    day = parseInt(prompt("¡Estupendo! \nPor favor, selecciona el día de la semana en curso en el que deseas tener la llamada: \n1. Lunes \n2. Martes \n3. Miércoles \n4. Jueves \n5. Viernes \n6. Sábado \n7. Domingo"));

    isValidDay = (day >= 1 && day <= 7);
};

if (isUser) {
    userChoice = choice();
} else {
    while(!user) {
        user = prompt("Oops! Por favor, ingresa tu nombre.")
    };
    userChoice = choice();
};

while(isNaN(userChoice) || userChoice < 1 || userChoice > 2) {
    alert("Por favor, ingresa 1 o 2");
    userChoice = choice();
};

if(userChoice == 1) {
    selectDay();

    while(!isValidDay){
        alert("El día seleccionado no es válido.");
        selectDay();
    };
        
    switch(day) {
            
        case 1:
            mensaje = "LUNES";
        break;
            
        case 2:
            mensaje = "MARTES";
        break;
            
        case 3:
            mensaje = "MIÉRCOLES";
        break;
            
        case 4:
            mensaje = "JUEVES";
        break;
            
        case 5:
            mensaje = "VIERNES";
        break;
            
        case 6:
            mensaje = "SÁBADO";
        break;
            
        case 7:
            mensaje = "DOMINGO";
        break;
    };
        
    alert(`Tu llamada ha sido agendada con éxito para el próximo ${mensaje}, con el asesor Juan Hernández. \n¡Gracias por preferir a White Mirror!`);

} else {
    alert("Gracias por visitar el sitio de White Mirror Agency, ¡vuelve pronto!");
};
