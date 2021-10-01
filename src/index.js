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
           TICKET_TYPE_LABEL,
           TICKET_TYPE_INPUT,
           TICKET_TYPE_ARROW,
           FORM_OPTIONS,
           TICKET_TYPE_TEXTOVERLAY,
} from './js/constants/MARKUP_SELECTORS';
import { API_KEY,
} from './js/constants/MAPBOX';
import GalleryList from './js/components/GalleryList';


//IIFE
(function () {
  const galleryList = new GalleryList();

  galleryList.render();


  //customizing style for the appearance of select tag in the large form

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
    FORM_CONTAINER.classList.remove('form-container_invisible');
    PAGE_OVERLAY.classList.remove('page-overlay_hidden');
})

  CLOSE_BUTTON.addEventListener('click', function(e) {
    // прописать код для закрытия большой формы
    FORM_CONTAINER.classList.remove('form-container_visible');
    FORM_CONTAINER.classList.add('form-container_invisible');
    PAGE_OVERLAY.classList.add('page-overlay_hidden');
})

function toggleOptionsDropdown() {
  FORM_OPTIONS.classList.toggle('options_visible');
}

function toggleArrow() {
  TICKET_TYPE_ARROW.classList.toggle('svg-arrow_down');
  TICKET_TYPE_ARROW.classList.toggle('svg-arrow_up');
}

function handleInputClick () {
  //rotate arrow
  toggleArrow();

  //make options (in)visible
  toggleOptionsDropdown();

  //add list-er to option for inserting value to input and make options invisible
  FORM_OPTIONS.addEventListener('click', handleInput);
}

function handleInput(e) {
    const chosenOption = e.target.closest('.option').textContent;
    console.log(e.target);
    TICKET_TYPE_INPUT.value = chosenOption;
    TICKET_TYPE_TEXTOVERLAY.textContent = chosenOption;
    TICKET_TYPE_TEXTOVERLAY.classList.add('chosen-value_visible');
    toggleArrow();
    toggleOptionsDropdown();
    FORM_OPTIONS.removeEventListener('click', handleInput);
}

TICKET_TYPE_INPUT.addEventListener('click', handleInputClick);









})()



