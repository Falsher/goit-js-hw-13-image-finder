import './sass/main.scss';


import apiPixabay from './js/apiPixabay';
import pictListTpl from './templates/pict-info.hbs';

const inputSearch= document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');


function makeFirstSearch(event) {
  event.preventDefault();
  event.currentTarget.elements.query.value = event.currentTarget.elements.query.value.trim();;

  apiPixabay.searchInput = event.currentTarget.elements.query.value;
  apiPixabay.resetpage();

  clearImageCards();
  if (apiPixabay.searchInput === '') {
    loadBtn.classList.add('visually-hidden');
    return;
  };

  makeAnotherSearch();
};

function makeAnotherSearch() {
  apiPixabay.fetchImages().then(searchResult => {

    if (searchResult.length === 0) {
      loadBtn.classList.add('visually-hidden');
      return;
    };

    renderImageCards(searchResult)

    loadBtn.classList.remove('visually-hidden');


  });
};

function renderImageCards(images) {
  gallery.insertAdjacentHTML('beforeend', pictListTpl(images));
};

function clearImageCards() {
  gallery.innerHTML = '';
}

inputSearch.addEventListener('submit', makeFirstSearch);
loadBtn.addEventListener('click', makeAnotherSearch);
