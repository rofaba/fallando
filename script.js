//JUGANDO

/* Cree [poolPalabras] como Array base del juego, con la función (indexRandom) obtengo un número entero al azar y con ese número selecciono la palabras para jugar desde el array base */
let caracter;
let personaje;
let datosPersonaje;
let recuperarPersonaje;
let contadorAciertos = [];
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
        quote.innerHTML = `${data[0].quote}  -  ${data[0].author}`;
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
let letraTrampa = document.getElementById('letraPP');

letraTrampa.addEventListener('mouseover', ofreceMuestra);
 function ofreceMuestra(){

    document.getElementById('mensajeUsuario').innerHTML = " ¿ QUIERES VER LA SOLUCION ?";
    document.getElementById('segundoMensaje').innerHTML = "CLICK EN BOTON INTERROGACION";
 
}

 letraTrampa.addEventListener('mouseleave', sacarMuestra);
 function sacarMuestra(){

    document.getElementById('mensajeUsuario').innerHTML = "Ingresa una letra para comenzar";
    document.getElementById('segundoMensaje').innerHTML = "Mucha suerte!";
 }

 letraTrampa.addEventListener('click', () => {
 
    Swal.fire({
        title: `${palabraSeleccionada}`,
        text: `Es la palabra secreta`,
        icon: 'success',
        confirmButtonText: 'Volver'
    })
})

    function muestraPalabra(){
        alert(palabraSeleccionada);       

    }

const jugar = document.getElementById('botonInicio');
jugar.addEventListener('click', jugando); //lanza la función
let vidasRestantes = 7;
let puntaje = 0;
letrasFallidas = [];

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
            contadorAciertos.push(letraIngresada.value);

            laLetraNoEsta = false;
            let contador = contadorAciertos.length;


            document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
            document.getElementById('mensajeUsuario').innerHTML = "Muy bien, la tenemos"
            document.getElementById('segundoMensaje').innerHTML = "Ingresa otra letra"

            if (contador > 2) {
                document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
                document.getElementById('mensajeUsuario').innerHTML = "Excelente, sigue así!"
                document.getElementById('segundoMensaje').innerHTML = "Vamos por las otras letras"

            }

            if (contador > 4) {
                document.getElementById('palabraAdivina').innerHTML = completandoPalabra.join('');
                document.getElementById('mensajeUsuario').innerHTML = "Ya la tienes, eres muy bueno!"
                document.getElementById('segundoMensaje').innerHTML = "Quedan menos, vamos por otra"

            }

            if ((completandoPalabra.includes(' _ ')) != true) {
                ganaste();
            }
        }
    }
    if (laLetraNoEsta) {

        vidasRestantes--; //OPTIMIZACION: USO OPERADOR --

        document.getElementById('numeroVidas').innerHTML = vidasRestantes;
        document.getElementById('mensajeUsuario').innerHTML = "Esa letra no está en tu palabra"
        document.getElementById('segundoMensaje').innerHTML = "En la próxima tendrás mejor suerte, vamos!"

        if (vidasRestantes == 5) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Tampoco está, elige con cuidado"
            document.getElementById('segundoMensaje').innerHTML = "Vamos por otro intento."
        }
        if (vidasRestantes == 3) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Ouch, todavía puedes"
            document.getElementById('segundoMensaje').innerHTML = "Elige otra letra!"
        }
        if (vidasRestantes == 1) {
            document.getElementById('numeroVidas').innerHTML = vidasRestantes;
            document.getElementById('mensajeUsuario').innerHTML = "Nop, no estaba... te queda una opción."
            document.getElementById('segundoMensaje').innerHTML = "No está muerto quién pelea. Vamos!"
        }
    }
    vidasRestantes == 5 && imagenSegunda();
    vidasRestantes == 3 && imagenMediaVida();
    vidasRestantes == 1 && imagenFinal();
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
    let mostrarPalabraFinal = palabraSeleccionada.toUpperCase();
    mensajeInferiorDos.innerHTML = `tu palabra era "${mostrarPalabraFinal}"`;
    mensajeInferior.style.fontSize = "10rem";
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
    mensajeInferior.style.fontSize = "10rem";
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
            falla.src = './imagenes/bart_pierde.jpeg';
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
            falla.src = './imagenes/homero_mediavida.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/12rq.gif';
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

function imagenSegunda() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/8kqy.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/focusyn.webp';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_piensa.jpeg';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/8kqy.gif'; //Homero por defecto
    }


}
function imagenFinal() {
    switch (localStorage.getItem("personaje")) {

        case 'Homero Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/J8s7Y4Bu2qYAAAAC/the-end-is-near-homer.gif';

            break;

        case 'Bart Simpson':
            falla = document.getElementById("jugando");
            falla.src = 'https://i.gifer.com/Bpwv.gif';
            break;

        case 'Lisa Simpson':
            falla = document.getElementById("jugando");
            falla.src = './imagenes/lisa_pierde.png';
            break;

        default:
            falla = document.getElementById("jugando");
            falla.src = 'https://c.tenor.com/J8s7Y4Bu2qYAAAAC/the-end-is-near-homer.gif'; //Homero por defecto
    }


}