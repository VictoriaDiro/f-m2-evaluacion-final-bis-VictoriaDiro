'use strict';

// CONSTANTES GLOBALES
const starButton = document.querySelector('.star__button');
let cards = document.querySelector('.cards');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let input = document.querySelectorAll('.input');
console.log(input)

// LOCALSTORAGE
const saveData = value => {
  localStorage.setItem('myInput', JSON.stringify(value));
};

const getSaveData = value => {
  return JSON.parse(localStorage.getItem(value));
}

// const loadSaveInput = () => {
//   const saveInput = getSaveData('myInput');
//   saveInput.checked.innerHTML = true;
// }

// loadSaveInput();


// JSON.parse(localStorage.getItem('myInput'));



// let getInputElement = '';

// function getInput() {
//   for(let i = 0; i < input.length; i++) {
//     if(localStorage.getItem('myInput') !== null) {
//       getInputElement = JSON.parse(localStorage.getItem('myInput'));
//       input[i].setAttribute('checked', 'true');
//     } else {
//       console.log('No hay datos el Local Storage');
//     }
//   }
// }
// getInput();
// LOCALSTORAGE

// PETICIÓN A API
function selectNumberCards() {

  let url = '';
  for(let i = 0; i < input.length; i++) {
    if(input[i].checked === true) {
      url = `https://raw.githubusercontent.com/Adalab/cards-data/master/${input[i].value}.json`;

      saveData(input[i].value);
    }
  }

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cards.innerHTML = '';

      for(let i = 0; i < data.length; i++) {

        // CREACIÓN DE ELEMENTOS
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

        // CAMBIO DE CARA DE CARTA
        cardItem.addEventListener('click', changeSide);
      }
    });
}

// BÚSQUEDA DE BARAJA
starButton.addEventListener('click', selectNumberCards);
