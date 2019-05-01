'use strict';

/* --> Desarrollo deinterfaz de aplicación web que simula juego de buscar parejas. --> BONUS: Implementar juego.

1. MAQUETACIÓN: 
    a. Formulario para elegir tamaño de partida y botón. X
    b. Listado de cartas, cada elemento tiene:
        - cara visible (pokemon)
        - cara oculta (palabra ADALAB) --> https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB
2. INICIO DE LA PARTIDA:
    - Al hacer 'click' en Comenzar recoger valor de tamaño de partida y conectarse a API que devuelve listado de cartas --> https://raw.githubusercontent.com/Adalab/cards-data/master/8.json
    - Las cartas por defecto muestran la parte trasera.
3. ALMACENAMIENTO LOCAL:
    - Guardar el número de cartas que la usuaria ha elegido.
4. INTERACCIÓN:
    - Al hacer 'click' mostraremos la parte delantera y a la inversa al volver ha hacer 'click'.
*/

const starButton = document.querySelector('.star__button');
const input = document.querySelector('.input');
let cards = document.querySelector('.cards');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';

function selectNumberCards() {

  fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${input.value}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      for(let i = 0; i < data.length; i++) {

        const cardItem = document.createElement('li');
        cardItem.classList.add('card__style');

        const image = document.createElement('img');
        image.src = backCard;

        cards.appendChild(cardItem);
        cardItem.appendChild(image);

        function changeSide() {
          if(image.src === backCard) {
            image.src = data[i].image;
          }else {
            image.src = backCard;
          }
        }
        cardItem.addEventListener('click', changeSide);
      }
    });
}

starButton.addEventListener('click', selectNumberCards);


  // localStorage.setItem('inputValue', 4, 6, 8);
  // const inputStorage = localStorage.getItem(inputValue);
  // console.log(inputValue)