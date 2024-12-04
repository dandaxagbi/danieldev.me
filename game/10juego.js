let limiteSuperior = 10
let limiteInferior = 1


const numeroSecreto1 = Math.random() * limiteSuperior
const numeroSecreto2 = numeroSecreto1 + limiteInferior
const numeroSecreto = Math.floor(numeroSecreto2)

let numeroJugador = undefined

while (!numeroJugador ||  numeroJugador !== numeroSecreto) {

    const response = prompt(`Hola Sofita: adivina el número secreto entre ${limiteInferior} y ${limiteSuperior}:`)
    if (response === null) {
        alert("Fin del juego")
        break
    }
    numeroJugador = parseInt(
        response
    );
    
    console.log(`Este es el número con el que juegas: ${numeroJugador}`);

    if (numeroJugador === numeroSecreto) {
        alert("¡Felicidades! ¡Adivinaste el número secreto!");
    } else if (numeroJugador > limiteSuperior || numeroJugador < limiteInferior) {
        alert(`Ingresa un número entre ${limiteInferior} y ${limiteSuperior}`);
    } else if (numeroJugador > numeroSecreto) {
        alert('El numero secreto es menor');
    } else if (numeroJugador < numeroSecreto) {
        alert('El numero secreto es mayor');
    } 
}

if(numeroJugador === numeroSecreto) {
    console.log("¡Felicidades! ¡Adivinaste el número secreto!");
}