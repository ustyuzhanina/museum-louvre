import 'normalize.css';
import './assets/fonts/fonts.scss';
import './index.scss';

// connect with js files
import { PROGRESS_BAR,
           VOLUME_BAR,
           SECTION_TICKETS_BUTTON,
           FORM_CONTAINER,
           CLOSE_BUTTON,
           PAGE,
           PAGE_OVERLAY,
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
    FORM_CONTAINER.classList.add('form-container_visible');
    PAGE_OVERLAY.classList.remove('page-overlay_hidden');
})

  CLOSE_BUTTON.addEventListener('click', function(e) {
    // прописать код для закрытия большой формы
    FORM_CONTAINER.classList.remove('form-container_visible');
    PAGE_OVERLAY.classList.add('page-overlay_hidden');
})






})()



