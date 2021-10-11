import 'normalize.css';
import './assets/fonts/fonts.scss';
import './index.scss';

// connect with js files
import {
  PROGRESS_BAR,
  VOLUME_BAR,
  SECTION_TICKETS_BUTTON,
  FORM_CONTAINER,
  CLOSE_BUTTON,
  PAGE,
  PAGE_OVERLAY,
  FORM_SMALL,
  TICKET_TYPE_INPUT,
  TICKET_TYPE_ARROW,
  FORM_OPTIONS,
  TICKET_TYPE_TEXTOVERLAY,
  BOOK_BUTTON,
  MOBILE_MENU,
  HMBG_BUTTON,
  GO_BACK_BUTTON,
} from './js/constants/MARKUP_SELECTORS';
import { API_KEY } from './js/constants/MAPBOX';
import GalleryList from './js/components/GalleryList';
import User from './js/components/User';
import FormSmall from './js/components/FormSmall';
import FormLarge from './js/components/FormLarge';
import CarouselVideo from './js/components/CarouselVideo';
import CarouselWelcome from './js/components/CarouselWelcome';
import LargeVideo from './js/components/LargeVideo';

//IIFE
(function () {
  const galleryList = new GalleryList();
  const user = new User();
  const formSmall = new FormSmall(user);

  user.checkUser();
  if (user.checkUser()) {
    formSmall.loadInputs();
  }

  formSmall.renderCost();

  FORM_SMALL.querySelectorAll('input').forEach(input => {
    formSmall.setEventListeners(input);
  });

  function addGoBackBtn() {
    GO_BACK_BUTTON.classList.add('go-up-link_visible');
    document.removeEventListener('scroll', addGoBackBtn);
  }
  document.addEventListener('scroll', addGoBackBtn);

  galleryList.render();

  //event listeners

  // PROGRESS_BAR.addEventListener('input', function (e) {
  //   const value = e.target.value;
  //   this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  // });

  // VOLUME_BAR.addEventListener('input', function (e) {
  //   const value = e.target.value;
  //   this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  // });

  function toggleMobileMenu() {
    MOBILE_MENU.classList.toggle('mobile-menu_open');
    HMBG_BUTTON.classList.toggle('hamburger-button_open');
  }

  //слушатель для открытия мобильного меню
  HMBG_BUTTON.addEventListener('click', toggleMobileMenu);
  MOBILE_MENU.addEventListener('click', toggleMobileMenu);

  SECTION_TICKETS_BUTTON.addEventListener('click', function (e) {
    e.preventDefault();

    // прописать код для выезда большой формы
    FORM_CONTAINER.classList.add('form-container_visible');
    FORM_CONTAINER.classList.remove('form-container_invisible');
    PAGE_OVERLAY.classList.remove('page-overlay_hidden');

    setTimeout(() => {
      FORM_CONTAINER.style.overflowY = 'scroll';
    }, 1000);
  });

  CLOSE_BUTTON.addEventListener('click', function (e) {
    e.preventDefault();

    FORM_CONTAINER.style.overflowY = 'hidden';

    // прописать код для закрытия большой формы
    FORM_CONTAINER.classList.remove('form-container_visible');
    FORM_CONTAINER.classList.add('form-container_invisible');
    PAGE_OVERLAY.classList.add('page-overlay_hidden');
  });

  function toggleOptionsDropdown() {
    FORM_OPTIONS.classList.toggle('options_visible');
  }

  function toggleArrow() {
    TICKET_TYPE_ARROW.classList.toggle('input-cover__arrow-icon_down');
    TICKET_TYPE_ARROW.classList.toggle('input-cover__arrow-icon_up');
  }

  function handleInputClick() {
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
    TICKET_TYPE_INPUT.value = chosenOption.trim();
    TICKET_TYPE_TEXTOVERLAY.textContent = chosenOption;
    toggleArrow();
    toggleOptionsDropdown();
    FORM_OPTIONS.removeEventListener('click', handleInput);
  }

  TICKET_TYPE_INPUT.addEventListener('click', handleInputClick);

  BOOK_BUTTON.addEventListener('click', function (e) {
    e.preventDefault();

    // Create span element
    let ripple = document.createElement('span');

    // Add ripple class to span
    ripple.classList.add('button', 'button__ripple-effect');

    // Add span to the button
    this.appendChild(ripple);

    // Get position of X
    let x = e.clientX - e.target.offsetLeft;

    // Get position of Y
    let y = e.clientY - e.target.offsetTop;

    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
})();
