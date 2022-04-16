//JUGANDO

/* Cree [poolPalabras] como Array base del juego, con la función (indexRandom) obtengo un número entero al azar y con ese número selecciono la palabras para jugar desde el array base */
let caracter;
let personaje;
let datosPersonaje;
let recuperarPersonaje;

//adquiere desde Local Storage con y sin JSON el personaje seleccionado y sus caracteristicas para mostrarlas

let persoFondo = document.getElementById('personajeSeleccionado');
persoFondo.innerHTML = localStorage.getItem("personaje") || "Homero Simpsons";

// OPTIMIZACION: USO DE OPERADOR LOGICO OR

//asigna Homero si no se selecciona alguno. 
//eleccion background de acuerdo a personaje selecionado

switch (localStorage.getItem("personaje")) {

    case 'Homero Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero-modified.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp';

        break;

    case 'Bart Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoBart-modified.webp')";
        document.getElementById('jugando').src = './imagenes/bartInicial.png';
        break;

    case 'Lisa Simpson':
        document.body.style.backgroundImage = "url('./imagenes/fondoLisa-modified.jpeg')";
        document.getElementById('jugando').src = './imagenes/lisaInicial.png';
        break;

    default:
        document.body.style.backgroundImage = "url('./imagenes/fondoHomero.jpg')";
        document.getElementById('jugando').src = './imagenes/homeroInicial.webp'; //Homero por defecto
}

// let botonMostrar = document.getElementById('muestraPersonaje');
// botonMostrar.addEventListener("click", mostrar)

// function mostrar() { //USO JSON

//     recuperarPersonaje = JSON.parse(localStorage.getItem("personajeDatos"));

//     // OPTIMIZACION: USO DE DESESTRUCTURACION

//     let {
//         edad,
//         ocupacion,
//         personalidad
//     } = recuperarPersonaje;

//     document.getElementById('muestralo1').innerHTML = edad;
//     document.getElementById('muestralo2').innerHTML = ocupacion;
//     document.getElementById('muestralo3').innerHTML = personalidad;
// }

// let botonMostrar2 = document.getElementById('ocultaPersonaje');
// botonMostrar2.addEventListener("click", ocultar)

// function ocultar() {
//     document.getElementById('muestralo1').innerHTML = " ";
//     document.getElementById('muestralo2').innerHTML = " ";
//     document.getElementById('muestralo3').innerHTML = " ";
// }

quote = document.getElementById('quotes');

fetch("https://los-simpsons-quotes.herokuapp.com/v1/quotes")
.then((response) => response.json())
.then((data) => {
    console.log(data)
quote.innerHTML = `${data[0].quote} ", " ${data[0].author}`
;
})

const poolPalabras = ['primera', 'probando', 'palabras', 'para', 'juego', 'colgado', 'ultima'];

function indexRandom(minimo, maximo) { //fx reutilizable
    var numerosPosibles = maximo - minimo;
    var random = Math.random() * (numerosPosibles + 1);
    random = Math.floor(random); // transformación a nº entero
    return minimo + random;
}

let numeroAleatorio = indexRandom(0, 6);
let palabraSeleccionada = poolPalabras[numeroAleatorio];
const letrasArray = [...palabraSeleccionada]; //transforma el string en array

//OPTIMIZACION: USO OPERADOR SPREAD

let completandoPalabra = [];
for (let i = 0; i < letrasArray.length; i++) {
    completandoPalabra.push(' _ ');
}

document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join(''); //sacamos las comas

//EMPEZANDO JUEGO
const jugar = document.getElementById('botonInicio');
jugar.addEventListener('click', jugando); //lanza la función
let vidasRestantes = 7;
let puntaje = 0;
letrasFallidas = [];
let usadasFalladas = [];
let letraIngresada = document.getElementById('pantalla');

function jugando() {

    letraIngresada = document.getElementById('pantalla');
    let i = 0;
    let laLetraNoEsta = true; //para ciclo cuenta de vidas
    let falla;

//Acá se inhalbilita la letra para ser elegida nuevamente
let letraGrande = (letraIngresada.value).toUpperCase();
let teclaPulsada = document.getElementById(`letra${letraGrande}`);
teclaPulsada.style.backgroundColor = 'grey';
teclaPulsada.removeAttribute('onclick');
teclaPulsada.classList.remove('borde');
  

    //verifica si la letra existe en palabra

    for (let i = 0; i < letrasArray.length; i++) {

        if (letrasArray[i] == letraIngresada.value) {
            completandoPalabra[i] = letraIngresada.value;
            laLetraNoEsta = false;

            document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
            document.getElementById('mensajeUsuario').innerHTML = "Muy bien, tenemos coincidencias"
            document.getElementById('segundoMensaje').innerHTML = "Ingresa la siguiente letra"

            if ((completandoPalabra.includes(' _ ')) != true) {
                ganaste();
            }
        }
    }
    if (laLetraNoEsta) {

        vidasRestantes--; //OPTIMIZACION: USO OPERADOR --
               
        // usadasFalladas = JSON.stringify(mostrarFallas);
        // localStorage.setItem("falladas", usadasFalladas);
        
        document.getElementById('numeroVidas').innerHTML = vidasRestantes;
        document.getElementById('mensajeUsuario').innerHTML = "Esa letra no está en tu palabra"
        document.getElementById('segundoMensaje').innerHTML = "En la próxima tendrás mejor suerte, vamos!"

    }
    vidasRestantes == 2 && imagenMediaVida();
    vidasRestantes == 0 && perdiste(); //OPTIMIZACION USO OPERADOR LOGICO AND


}

function perdiste() {
    falla = document.getElementById("jugando");
    falla.classList.add("shake-horizontal");

    imagenPerdiste();

    let mensajeFinal = document.getElementById('pantalla');
    let mensajeFinalDos = document.getElementById('botonInicio');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    let mensajeInferiorDos = document.getElementById('segundoMensaje')
    let marco = document.getElementsByClassName('mensajesJuego');
    let teclado = document.getElementById('container');

    teclado.style.display = "none";

    mensajeFinal.style.display = "none";
    mensajeFinalDos.style.display = "none";


    mensajeInferior.innerHTML = " PERDISTE ";
    mensajeInferiorDos.innerHTML = `tu palabra era ${palabraSeleccionada}`;
    mensajeInferior.style.fontSize = "4rem";
    mensajeInferior.style.color = "red";
    mensajeInferiorDos.style.color = "red";

}

function ganaste() {

    let mensajeFinal = document.getElementById('pantalla');
    let mensajeFinalDos = document.getElementById('botonInicio');
    let mensajeInferior = document.getElementById('mensajeUsuario');
    let mensajeInferiorDos = document.getElementById('segundoMensaje')
    let teclado = document.getElementById('container');

    imagenGanaste();

    teclado.style.display = "none";
    mensajeFinal.style.display = "none";
    mensajeFinalDos.style.display = "none";
    mensajeInferior.classList.add("text-pop-up-top");
    mensajeInferior.innerHTML = " GANASTE ";


    mensajeInferiorDos.innerHTML = "FELICITACIONES!"
    mensajeInferior.style.fontSize = "5rem";
    mensajeInferior.style.color = "blue";
    mensajeInferiorDos.style.color = "blue";
}

function imagenPerdiste() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/angry_homer.jpeg';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/mad_simpson.webp';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_looser.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = './imagenes/angry_homer.jpeg'; //Homero por defecto
    }


}

function imagenGanaste() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://www.laguiadelvaron.com/wp-content/uploads/2019/01/simpson-gif-www.laguiadelvaron-2.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://64.media.tumblr.com/a43e2ff78e09feef09bb718dc3501945/tumblr_nej8j2Gd701rvner1o1_500.gifv';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/LRGXeXjJkcgAAAAC/im-so-excited-lisa-simpson.gif';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://www.laguiadelvaron.com/wp-content/uploads/2019/01/simpson-gif-www.laguiadelvaron-2.gif'; //Homero por defecto
    }


}

function imagenMediaVida() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/homero_mediavida.png';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/bart_mediaVida.png';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_mediavida.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = './imagenes/homero_mediavida.png'; //Homero por defecto
    }


}