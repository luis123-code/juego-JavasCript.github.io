/*audio*/
const miAudio = document.querySelector('#audioSuperficial')

//aeleccinamos el contenedor de canvas donde lo
//vamos a rendizar a 2D
const canvas = document.querySelector('#game')

//llamamos el elemento de canvas a 2d
const game = canvas.getContext('2d')

//mostrar infomracion
const Live = document.querySelector('#live')
const cero = document.querySelector('em')
const duracion = document.querySelector('#time')
const recordStore = document.querySelector('#record')


//creamos variable para el evento del jugador
const btn_up = document.querySelector('#up')
const btn_left = document.querySelector('#left')
const btn_right = document.querySelector('#right')
const btn_down = document.querySelector('#down')

//variables
let canvasSize
let elementSize
let dataRecord

//subisteNivel
let subiendoNivel = 0
let vidaJugador = 3

//tiempo
let mostrar
let minuto = 0
let segundos = 0;


//cuando nombramos objeto a traves de const podemos cambiar el valor sin 
//son afectar el nombramiento del const 
//donde va el movimiento del jugador (undefined --> es vacio )
const player = {
    movimientoPlayer_X: undefined,
    movimientoPlayer_y: undefined,
}

const playerPuerta = {
    posicion_x: undefined,
    posicion_y: undefined,
}

let enemiPosition = []

/*mostrando localStorage*/
document.addEventListener('DOMContentLoaded', () => {
    dataRecord = JSON.parse(localStorage.getItem('puntajeAlto'))
    dataRecord === null ? mostrarRecord('0000') : mostrarRecord(dataRecord)

})




/*apenas que carge el html aparece la informacion de canvas*/
/*recuerda cuando es cambas es buena practica windows no document*/

/*el evento load : apenas que termine cargar todo la pagina altoque va cargar este envento
donde contiene la funcion . */

/*la funcion de stargameResize lo que hace es que nos ayuda que carge rapido junto con
la pagina*/
/*resize es un evento cambia de tamaño es cuando hacemos un mediaQueris*/

window.addEventListener('load', stargameResize)
window.addEventListener('resize', stargameResize)

// aka vamos a ver para ser responsibe canvas
function stargameResize() {
    /*esto son dos propiedades de windows para dar tamaña a canvas*/
    //console.log("ver dimensiones de la ventana " + window.innerWidth , window.innerHeight);
    //aka en este condicion asignamos la medida para hacer responsibe
    /*aka hacemos la condicion para sser responsibe de canvas*/
    (window.innerHeight > window.innerWidth)
        ? canvasSize = window.innerHeight * 0.8
        : canvasSize = window.innerWidth * 0.8

    /*aka estamos habilitando lo que es width y heigth*/
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = (canvasSize / 10)
    player.movimientoPlayer_X = undefined
    player.movimientoPlayer_y = undefined

    starGame()
}


function starGame() {

    game.font = elementSize + 'px Verdana'
    game.textAlign = "end"
    const mapaObtenida = maps.map(mapa => mapa.trim().split("\n"))
    const reorganiza_maps = mapaObtenida.map(index => index.map(mapa => mapa.trim().split("")))
    const creacionJuego = reorganiza_maps[subiendoNivel]
    tiempo()
    bajandoLove()
    console.log(creacionJuego);
    if (!creacionJuego) {
        console.log("se termino el juego");
        window.location.href="/pages/terminado.html"
        reiniciandoTiempo()
        infoLocal()
        reiniciando()
        return
    }
    //aka lo limpiamos cuando el jugador mueve cada vez 
    game.clearRect(0, 0, canvasSize, canvasSize)

    //aka hacemos una limpieza en el arrays  ya que cada movimineto se va
    //aumentar mas 
    enemiPosition = []
    /*otra manera de hacer el for */
    creacionJuego.forEach((row, rowPositon) => {
        row.forEach((column, columPostion) => {
            const emoji = emojis[column]
            const posti_X = elementSize * (columPostion + 1)
            const posti_y = elementSize * (rowPositon + 1)
            //donde va el da el movimiento del player
            if (column === 'O') {
                //condicion se es que el player no contiene el algo un numero de objeto con su variable
                //en as instrucciones se va a tomar
                //en la segunda vuelta se v a preguntar pero esta vez si contine algo
                //entoces si es que tines no se va a ejeccutar e codgio
                //esta condicion no va se va refenir 
                if (!player["movimientoPlayer_X"] && !player["movimientoPlayer_y"]) {
                    player.movimientoPlayer_X = posti_X
                    player.movimientoPlayer_y = posti_y
                }
            } else if (column === "I") {
                //aagarramos las dos posiciones para ver si
                //entre el jugador y la pueta hubo colision osea si 
                //hubo un junto
                playerPuerta.posicion_x = posti_X
                playerPuerta.posicion_y = posti_y
            } else if (column === "X") {
                enemiPosition.push({
                    enemigo_x: posti_X,
                    enemigo_y: posti_y
                })
            }


            /* pondemos todas los emojis a us posiciones  */
            game.fillText(emoji, posti_X, posti_y)
        })
    });

    //estamos renderizado 
    movePlayer()
}



function movePlayer() {
    if (playerPuerta.posicion_x.toFixed(3) === player.movimientoPlayer_X.toFixed(3) && playerPuerta.posicion_y.toFixed(3) === player.movimientoPlayer_y.toFixed(3)) {
        subisteNivel()
    }
    const perdiste = enemiPosition.find(enemi => enemi.enemigo_x.toFixed(3) === player.movimientoPlayer_X.toFixed(3) && enemi.enemigo_y.toFixed(3) === player.movimientoPlayer_y.toFixed(3))
    if (perdiste) {
            enemiPosition.forEach(index => game.fillText(emojis["BOMB_COLLISION"] , index.enemigo_x , index.enemigo_y));
            setTimeout(()=>{
                perdisteNivel()
            },300)
    } else {
        /*donde el jugador inicia en la puerta*/
        game.fillText(emojis["PLAYER"], player.movimientoPlayer_X, player.movimientoPlayer_y)
    }
}



function subisteNivel() {
    subiendoNivel++
    starGame()
}
function perdisteNivel() {
    vidaJugador--
    //ESTA EJECUCION TODAVIA NOSE EJECUTA CUANDO ES MENOR A 0 (VIDA jUGADOR) AL TOQUE 
    if (vidaJugador <= 0) {
        window.location.href="/pages/terminado.html"
        vidaJugador = 3
        subiendoNivel = 0
        reiniciandoTiempo() 
    }
    player.movimientoPlayer_X = undefined
    player.movimientoPlayer_y = undefined
    starGame()
}

function bajandoLove() {
    Live.innerHTML = ""
    let vida = emojis["VIDA"].repeat(vidaJugador)
    Live.append(vida)
}

//movimiento Teclado
window.addEventListener('keydown', keypressPlayer)
//moviminetos dek jugador  click
btn_down.addEventListener('click', playerUp)
btn_left.addEventListener('click', playerLeft)
btn_right.addEventListener('click', playerRight)
btn_up.addEventListener('click', playerDown)

//player keywoord
function keypressPlayer(event) {
    // Evita el comportamiento de desplazamiento por defecto
    event.preventDefault();
    // miAudio.play()
    event.key === "ArrowUp" ? playerUp() :
        event.key === "ArrowDown" ? playerDown() :
            event.key === "ArrowLeft" ? playerLeft() :
                event.key === "ArrowRight" ? playerRight() : "";
}



//funciones del jugador click
function playerUp() {
    /* el jugador se mueve asia arriba */
    if ((player.movimientoPlayer_y - elementSize) < elementSize) {
        console.log("no salgas del mapa");
    } else {
        player.movimientoPlayer_y -= elementSize
        starGame()
    }
}

function playerDown() {
    /* el jugador se mueve asia abajo */

    if ((player.movimientoPlayer_y + elementSize) > canvasSize) {
        console.log("sales del mapa");
    } else {
        player.movimientoPlayer_y += elementSize
        starGame()
    }
}

function playerLeft() {
    if ((player.movimientoPlayer_X - elementSize) < elementSize) {
        console.log("se sale del mapa 15");
    } else {
        /* el jugador se mueve asia izquierda */
        player.movimientoPlayer_X -= elementSize
        starGame()
    }
}

function playerRight() {

    if ((player.movimientoPlayer_X + elementSize) > canvasSize) {
        console.log("sales del map");

    } else {
        /* el jugador se mueve asia derecha */
        player.movimientoPlayer_X += elementSize;
        starGame();
    }
}


/** tiempo ***/

function tiempo() {
    setInterval(() => {
        segundos++
        if (segundos === 60) {
            minuto++
            segundos = 0
        }
        duracion.innerHTML = ""
        mostrar = `0${minuto}${segundos}`
        duracion.append(mostrar)
    }, 1000)
}

function reiniciandoTiempo() {
    segundos = 0
    minuto = 0
    tiempo()
}

/*localstorage Guardando informacion*/

function infoLocal() {
    if ( mostrar < dataRecord || dataRecord === null) {
        localStorage.setItem('puntajeAlto', JSON.stringify(mostrar))
        window.location.href="/pages/ganastes.html"
        mostrarRecord(mostrar)
    }
}

function mostrarRecord(e) {
    record.innerHTML = "" 
    record.append(e)
}



/*reiniciando el juego*/
// function reiniciando() {
//     perdisteNivel()
// }