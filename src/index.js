import 'normalize.css';
import './assets/fonts/fonts.css';
import './css/styles.scss';

// connect with js files
import { PROGRESS_BAR,
           VOLUME_BAR,
           SECTION_TICKETS_BUTTON,
} from './js/constants/MARKUP_SELECTORS';
import { API_KEY,
} from './js/constants/MAPBOX';
import GalleryList from './js/components/GalleryList';


//IIFE
(function () {
  const galleryList = new GalleryList();

  galleryList.render();

  //event listeners
  PROGRESS_BAR.addEventListener('input', function(e) {
  const value = e.target.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
})

  VOLUME_BAR.addEventListener('input', function(e) {
  const value = e.target.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
})

  SECTION_TICKETS_BUTTON.addEventListener('click', function(e) {
    e.preventDefault();
    // прописать код для выезда большой формы
})






})()



