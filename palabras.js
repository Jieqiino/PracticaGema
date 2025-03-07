addEventListener('DOMContentLoaded', inicio);

//Aqui se crea el array para guardar las letras
let botones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Aqui se crea el array para guardar las palabras para acertar
var palabras = ["PALABRA", "PELOTA", "CASA", "PUERTA", "VENTANA", "ORDENADOR", "IMAGEN", "TELEFONO", "TECLADO", "MONITOR", "JAVASCRIPT"];
//Aqui se guarda la palabra aleatoria del array
var palabraRandom = "";

//Iniciamos los contadores para saber la longitud que tiene esa palabra y la vida que tiene el jugador
let contCorrecto = 0;
let incorrecto = 8;
let corazones = incorrecto;

function inicio() {

    //Cogemos el boton iniciar y al darle iniciamos el juego
    var iniciar = document.getElementById("iniciar");
    var botonInicio = document.createElement("input");
    botonInicio.id = "iniciarJuego";
    botonInicio.type = "button";
    botonInicio.value = "JUGAR";
    iniciar.appendChild(botonInicio);
    muestraOculta();

    botonInicio.addEventListener('click', iniciarJuego);

}

//Funcion para crear vidas del jugador
function crearVidas() {

    //Cogemos el div que tiene el id "ahorcado"
    let fallos = document.getElementById("ahorcado");

    //Creamos el elemento "p" para introducir las vidas del jugador
    for (let i = 0; i < incorrecto; i++) {
        var parrafo = document.createElement("img");
        parrafo.id = "vidas" + i;
        parrafo.src = "corazon.png";
        parrafo.style.width = "30px";
        parrafo.style.height = "30px";
        fallos.appendChild(parrafo);
    }
}

//Funcion para crear botones
function crearBotones() {

    let form = document.getElementById("letras");

    for (let i = 0; i < botones.length; i++) {
        let boton = document.createElement("input");
        boton.type = "button";
        boton.id = "boton" + i;
        boton.value = botones[i];
        form.appendChild(boton);
    }

    seleccionarBoton();

}

//Crear las palabras y añadirlas en el array
function crearPalabra() {

    // Hace conteo de cuantas palabras hay en el array
    const aleatorio = Math.floor(Math.random() * palabras.length);

    //var palabra = palabras[aleatorio];
    palabraRandom = palabras[aleatorio];
    //alert(palabras[aleatorio]);

    //Mostrar la longitud de caracteres tiene la palabra
    var letrasPalabra = palabras[aleatorio].length;
    //alert(letrasPalabra);
    console.log(palabraRandom);

    var casillas = document.getElementById("casillas");

    var parrafo = document.createElement("p");
    parrafo.id = "palabra";

    for (let i = 0; i < letrasPalabra; i++) {

        var span = document.createElement("span");
        span.innerHTML = "_ ";
        parrafo.appendChild(span);
        casillas.appendChild(parrafo);
    }
    const div = document.getElementById('letras');
    const inputs = div.getElementsByTagName('input');
    //alert(inputs.length);
}

function seleccionarBoton() {
    for (let i = 0; i < botones.length; i++) {
        document.getElementById("boton" + i).addEventListener('click', insertarLetra);
    }
}


function insertarLetra() {

    
    var letraCorrecta = false;

    var letraSeleccionada = event.target.value;

    for (let i = 0; i < palabraRandom.length; i++) {
        if (letraSeleccionada == palabraRandom[i]) {
            letraCorrecta = true;
        }
    }
    if (letraCorrecta) {
        event.target.style.color = "green";
        mostrarLetra(letraSeleccionada);
    } else {
        event.target.style.color = "red";
        actualizaVidas();
    }

    event.target.disabled = true;
    terminado(corazones, contCorrecto);
}

function mostrarLetra(letraSeleccionada) {
    var spans = document.getElementById("palabra").getElementsByTagName("span");

    for (let i = 0; i < palabraRandom.length; i++) {
        if (letraSeleccionada == palabraRandom[i]) {
            spans[i].innerHTML = letraSeleccionada + " ";
            contCorrecto++;
        }
    }
}


// function actualizaVidas() {
//     let restar = document.getElementById("vidas").getElementsByTagName("span")[0];
//     corazones--;
//     restar.innerHTML = "Vidas restantes " + corazones + "/" + incorrecto;
// }

function actualizaVidas() {
    let fallos = document.getElementById("ahorcado");

    // Si todavía quedan corazones eliminamos el último
    if (corazones > 0) {
        let imagenesVidas = fallos.getElementsByTagName("img");
        fallos.removeChild(imagenesVidas[imagenesVidas.length - 1]); // Eliminar el último corazón
        corazones--; // Restar una vida
    }
}

function terminado(vidas, contCorrecto) {
    let contenido = document.getElementById("contenido");

    let mensaje = document.getElementById('mensaje');
    if (vidas == 0) {
        desactivarBotones();
        let boton = document.createElement("input");
        boton.type = "button";
        boton.id = "reinicio";
        boton.value = "Reiniciar";
        contenido.appendChild(boton);
        mensaje.style.color = "red";
        mensaje.style.fontWeight = "bold";
        mensaje.innerHTML = "Has perdido. La palabra era: " + palabraRandom;
        reiniciar();
    } else if (contCorrecto == palabraRandom.length) {
        desactivarBotones();
        let boton = document.createElement("input");
        boton.type = "button";
        boton.id = "reinicio";
        boton.value = "Reiniciar";
        contenido.appendChild(boton);
        mensaje.style.color = "green";
        mensaje.style.fontWeight = "bold";
        mensaje.innerHTML = "Has ganado!";
        reiniciar();
    }

}

function desactivarBotones() {
    let botones = document.getElementById("letras").getElementsByTagName("input");
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;  // Desactivar cada botón
    }
}


function reiniciar() {

    let reinicio = document.getElementById("reinicio");
    reinicio.addEventListener('click', function () {

        // Eliminar las casillas de las letras de la palabra
        var eliminarCasillas = document.getElementById("casillas");
        eliminarCasillas.innerHTML = "";

        // Eliminar los corazones (vidas) del jugador
        var eliminarVidas = document.getElementById("ahorcado");
        eliminarVidas.innerHTML = ""; // Elimina todas las imágenes de corazones

        // Eliminar los botones de letras
        var eliminarLetras = document.getElementById("letras");
        eliminarLetras.innerHTML = ""; // Elimina todos los botones de letras

        // Eliminar el botón de reinicio
        var eliminarHijo = document.getElementById("contenido");
        var eliminarReinicio = document.getElementById("reinicio");
        eliminarHijo.removeChild(eliminarReinicio);

        // Limpiar el mensaje de estado (ganar o perder)
        document.getElementById("mensaje").innerHTML = "";

        // Reiniciar el juego
        iniciarJuego();
    });
}


function iniciarJuego() {

    document.getElementById("iniciar").innerHTML = "";

    contCorrecto = 0;
    incorrecto = 8;
    corazones = incorrecto;

    //Llamamos a las funciones para que cree la palabra, vida y botones
    crearPalabra();
    crearBotones();
    crearVidas();
    muestraOculta();
    document.addEventListener('keydown', manejarTeclaPresionada);
}

function muestraOculta() {

    //var contenido = this.id.split("_");
    document.getElementById('manual').onclick = informacion;


}

function informacion() {
    let instruccion = document.getElementById('informacion');
    if (instruccion.style.display === "none") {
        instruccion.style.display = "block";
        this.innerHTML = 'Ocultar contenidos';
    } else {
        instruccion.style.display = "none";
        this.innerHTML = 'Mostrar contenidos';
    }
}
function manejarTeclaPresionada(event) {
    let letraSeleccionada = event.key.toUpperCase(); // Convertir a mayúscula para que coincida con las letras del juego
    let letraValida = false;

    // Recorrer el array de botones para verificar si la letra presionada es válida
    for (let i = 0; i < botones.length; i++) {
        if (botones[i] === letraSeleccionada) {
            letraValida = true;
        }
    }

    // Si la letra es válida, buscamos el botón correspondiente
    if (letraValida) {
        let botonesInputs = document.getElementsByTagName('input');

        // Recorrer los botones en pantalla
        for (let i = 0; i < botonesInputs.length; i++) {
            if (botonesInputs[i].value === letraSeleccionada && !botonesInputs[i].disabled) {
                botonesInputs[i].click(); // Simular clic en el botón
            }
        }
    }
}
