
// 2C =  Two of Clubs
// 2D =  Two of Diamonds
// 2H =  Two of Hearts
// 2S =  Two of Spades


let deck = [];
const tipos = ['C', 'D', 'H','S'];
const especiales = ['A', 'J', 'Q','K'];
let puntosJugador = 0,
    puntosComputadora =0;



//Rerencias del HTML

const btnPedir = document.querySelector ('#btnPedir');

const btnDetener = document.querySelector ('#btnDetener');
const btnNuevo = document.querySelector ('#btnNuevo');
const divCartasJugador = document.querySelector('#jugardor-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHtml = document.querySelectorAll ('small');


console.log(puntosHtml);
// Esta funcion crea una nueva baraja o deck
const crearDeck = () => {

    for( let i= 2 ; i<= 10; i++) {

      for( let tipo of tipos) {

        deck.push( i + tipo)
      }

    }

    for( let tipo of tipos){
        for( let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle (deck);
    console.log(deck);
    return deck;

}

crearDeck();


// Esta funcion me permite crear una carta

const pedirCarta = () =>{

    if (deck.length === 0){
        throw 'No hay cartas en el deck'

    }

    const carta = deck.pop();


    return carta;
}


// pedir carta

const valorCarta = ( carta) => {

    const valor = carta.substring(0 , carta.length -1);
    
    return ( isNaN( valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;



    // let puntos = 0;
    
    // if ( isNaN( valor)) {
        
    //     puntos = (valor === 'A') ? 11 :10;


    // } else {
    //     console.log('Es un número')
    //     puntos = valor * 1;
    // }

    // console.log(puntos )
}


///TURNO DE LA COMPUTADORA

const turnoComputadora = ( puntosMinimos) =>{

do {

  const carta = pedirCarta();
  puntosComputadora = puntosComputadora + valorCarta (carta);
  puntosHtml[1].innerText = puntosComputadora;


  const imgCarta = document.createElement ('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasComputadora.append( imgCarta);

  if ( puntosMinimos >21){

    break;
  }

} while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

setTimeout(() => {
    if (puntosComputadora=== puntosMinimos){
        alert('Esto es un empate, nadie Gana :( ');
    
    } else if (puntosMinimos >21){
        alert('Computadora Gana')
    }else if (puntosComputadora >21){
        alert('Jugador 1 gana');
    } else  {
        alert('Computadora Gana');
    }
}, 20);



}

//EVENTOS

btnPedir.addEventListener('click' , () =>{

  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta (carta);
  puntosHtml[0].innerText = puntosJugador;


  const imgCarta = document.createElement ('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugador.append( imgCarta);


  if (puntosJugador >21){

    console.warn('Lo siento mucho, perdiste');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora (puntosJugador);
  } else if (puntosJugador ===21) {
      console.warn('21, genial')
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora (puntosJugador);
  }


});

btnDetener.addEventListener ('click' , ()=>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora (puntosJugador);
});


btnNuevo.addEventListener ('click' , ()=>{
    console.clear();
    deck =[];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled =   false;
    btnDetener.disabled = false;

})