import pictListTpl from './templates/pict-info';
import './sass/main.scss';
const debounce = require('lodash.debounce');
const inputSearch = document.querySelector('.input');
const pageListPict = document.querySelector('.gallery');
const sectorListGallery = document.querySelector('.list')
const keyPixabay = '21857111-8554c096d1798b5dae4546d72';
const urlPixabay = 'https://pixabay.com/api/';
let page = 1
let searchInput = ''

inputSearch.addEventListener('input', debounce(valueInput, 1000))
function valueInput (event) {
 searchInput = event.target.value;
 console.log(searchInput)
 imageList ()
 if(searchInput != ''){
  const button = document.createElement('button')
  button.textContent = 'Load more'
  sectorListGallery.appendChild(button)
  button.addEventListener('click', function(){page++
    imageList (page)})
 }else if (searchInput != searchInput ) {
  location.reload()
  imageList ()
 }
};

function imageList (){
  fetch(
    `${urlPixabay}/?image_type=photo&orientation=horizontal&q=${searchInput}&page=${page}&per_page=12&key=${keyPixabay}`,
  )
    .then(res => {
      return res.json();
    })
    .then(({hits}) => {
      const dataObtained = pictList(hits);
      pageListPict.insertAdjacentHTML('beforeend', dataObtained);
      function pictList(hits) {
        return pictListTpl(hits);
      }

    });
}
