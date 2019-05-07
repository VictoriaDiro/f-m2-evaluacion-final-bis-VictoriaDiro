'use strict';

// CONSTANTES GLOBALES
const starButton = document.querySelector('.star__button');
let cards = document.querySelector('.cards');
const backCard = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let input = document.querySelectorAll('.input');

// LOCALSTORAGE
const saveData = value => {
  localStorage.setItem('myInput', value);
};

const getSaveData = value => {
  const getData = localStorage.getItem(value);
  if(getData !== null) {
    for(let i = 0; i < input.length; i++) {
      if(input[i].value === getData) {
        input[i].checked = true;
      }
    }
  }
}

getSaveData('myInput');

// PETICIÓN A API
const selectNumberCards = () => {

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

        const nameItem = document.createElement('p');
        const newNameContent = document.createTextNode(data[i].name);
        nameItem.classList.add('name__style');
        nameItem.classList.add('hidden');

        nameItem.appendChild(newNameContent);
        cardItem.appendChild(image);
        cards.appendChild(cardItem);
        cardItem.appendChild(nameItem);

        const changeSide = () => {
          if(image.src === backCard) {
            image.src = data[i].image;
            nameItem.classList.remove('hidden');
          }else {
            image.src = backCard;
            nameItem.classList.add('hidden');
          }
        }

        // CAMBIO DE CARA DE CARTA
        cardItem.addEventListener('click', changeSide);

        // SELECCIONAR FAVORITO
        const selectFav = ()=> {
          if(data[i].fav === true) {
            cardItem.classList.toggle('fav__item');
          }
        }

        // PINTAR NOMBRE
        cardItem.addEventListener('click', selectFav);
        //cardItem.addEventListener('click', showName);
      }
    });
}

// BÚSQUEDA DE BARAJA
starButton.addEventListener('click', selectNumberCards);

//# sourceMappingURL=main.js.map
