//Simulador interactivo JS: Juego de "El Colgado".

//creación de personajes
class Personaje {
    constructor(nombre, edad, ocupacion) {
        this.nombre = nombre;
        this.edad = edad;
        this.ocupacion = ocupacion;
    }
}
const perso1 = new Personaje('Homero ', ' 39 años ', ' Técnico Nuclear');
const perso2 = new Personaje('Bart ', ' 10 años ', ' Niño Incomprendido');
const perso3 = new Personaje('Lisa ', ' 8 años ', ' Niña Genio');
const poolPersonajes = [perso1, perso2, perso3];

    function saludaUsuario() {
        alert('Hola Bienvenido al Juego del Ahorcado')
    }
    function indexRandom(minimo, maximo) {   //número al azar para extraer palabra desde array 
        var numerosPosibles = maximo - minimo;
        var random = Math.random() * (numerosPosibles + 1);
        random = Math.floor(random);  // transformación a numero entero
        return minimo + random;
    }
    const poolPalabras = ['PALABRAS', 'PARA', 'PRUEBA', 'JUEGO', 'COLGADO', 'PARA', 'ELEGIR', 'USUARIO', 'PENDIENTE', 'VERSION', 'FINAL'];

    saludaUsuario();
    alert('Lo primero es que elijas tu personaje, tengo 3 disponibles');

    let eligePersonaje = parseInt(prompt('Por favor, indìcame cuál prefieres: 1, 2 ó 3'));
    switch (eligePersonaje) {
        case 1:
            alert(`Muy bien, elegiste a: ${Object.values(perso1)}`);
            break;
        case 2:
            alert(`Excelente, elegiste a: ${Object.values(perso2)}`);
            break;
        case 3:
            alert(`Bien hecho, elegiste a: ${Object.values(perso3)}`);
            break;
        default:
            alert('No elegiste personaje, te asignaré uno de todos modos.');

    }
    let numeroAleatorio = indexRandom(0, 10);
    let palabra = poolPalabras[numeroAleatorio];

    //transformamos el string en un array
    const letras = [...palabra];

    // creamos un array similar que contiene "__" en similar numero para llenar luego

    const llenandoPalabra = [];
    for (let i = 0; i < letras.length; i++) {
        llenandoPalabra.push(' __ ');
    }
    console.log(letras);



    alert(`Ya tengo tu palabra secreta ${llenandoPalabra}, veamos si la puedes adivinar`);
    let palabraCompleta = llenandoPalabra.indexOf(' __ ');
    let vidas = 7;

    while (vidas != 0) {

        letraIngresada = prompt('Vamos, ingresa una letra');
        let letraMayus = letraIngresada.toUpperCase();
        let contadorAcierto = [];

        if (isNaN(letraMayus)) {  //si no es un número, busca en cada index y agrega su posición a otro array 

            let indice = 0;
            while (indice < letras.length + 1) {
                if (letras[indice] == letraMayus) {
                    contadorAcierto.push(indice); //guarda cada index de las coincidencias
                    llenandoPalabra[indice] = letraMayus; //acá reemplaza la letra
                    indice++;

                }
                else {
                    indice++;

                }
            }
            if (contadorAcierto.length == 0) {  // si aciertos son cero la letra no está en palabra
                vidas--
                alert(`la letra ${letraMayus} no se encuentra en tu palabra`);
                if (vidas == 0) { //revisa si quedan vidas para jugar
                    alert(`Se te acabaron las vidas, lo siento, tu palabra era ${palabra}`)
                }
                else {
                    alert(`Te quedan ${vidas} intentos más`)
                }
            } else {
                alert(`Tu palabra: ${llenandoPalabra}`);
            }

            if ((llenandoPalabra.indexOf(' __ ') != -1) && (vidas != 0)) {

            } else {
                if (vidas != 0) {
                    alert(`GANASTE, tu palabra ${palabra} está completa!!!`)
                    indice = 50; // termino de ciclo alertas/prompt
                    vidas = 0 // termino de ciclo alertas/prompt
                }

            }
        }

        else {
            alert('el valor que ingresaste es un número, no una letra');
        }
        let palabraCompleta = llenandoPalabra.indexOf(' __ ');
    }

    alert('Gracias por jugar, hasta la próxima');

    