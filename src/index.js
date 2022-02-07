import 'normalize.css';
import './assets/fonts/fonts.scss';
import './index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

// connect with js files
import {
  PROGRESS_BAR,
  VOLUME_BAR,
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
  //MAP_CONTAINER,
} from './js/constants/MARKUP_SELECTORS';
import { showSelfcheck } from './js/utils/showSelfcheck';
import { MAPBOX } from './js/constants/MAPBOX';
import { MAPBOX_MARKERS } from './js/constants/MAPBOX_MARKERS';
import GalleryList from './js/components/GalleryList';
import ExploreSlider from './js/components/ExploreSlider';
import User from './js/components/User';
import FormSmall from './js/components/FormSmall';
import FormLarge from './js/components/FormLarge';
import FormValidator from './js/components/FormValidator';
import CarouselVideo from './js/components/CarouselVideo';
import CarouselWelcome from './js/components/CarouselWelcome';
import LargeVideo from './js/components/LargeVideo';
import mapboxgl from '!mapbox-gl';

//IIFE
(function () {
  // showSelfcheck();

  const carouselWelcome = new CarouselWelcome();
  const exploreSlider = new ExploreSlider();
  const galleryList = new GalleryList();
  const user = new User();
  const formSmall = new FormSmall(user);
  const formLarge = new FormLarge(user);
  const formValidator = new FormValidator(formLarge);

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

  carouselWelcome.setEventListeners();

  //choose the extent in % to which the initial picture should be shown
  exploreSlider.initialize(59);
  exploreSlider.setEventListeners();

  galleryList.render();
  galleryList.setEventListeners();

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

  formSmall.button.addEventListener('click', e => {
    e.preventDefault();
    formLarge.open();
    formValidator.setEventListeners();
  });

  formLarge.setEventListeners();

  formLarge.closeBtn.addEventListener('click', e => {
    e.preventDefault();
    formLarge.close();
    formValidator.removeEventListeners();
  });

  //mapbox
  mapboxgl.accessToken = MAPBOX.accessToken;
  const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX.styleUrl,
    center: [2.3364, 48.86091],
    zoom: 16,
    bearing: 7,
  });

  //add markers to the map
  MAPBOX_MARKERS.features.forEach(marker => {
    const el = document.createElement('div');

    if (marker.properties.title === 'Louvre Museum') {
      el.className = 'section_contacts__marker section_contacts__marker_highlight';
    } else {
      el.className = 'section_contacts__marker section_contacts__marker_common';
    }

    //make a marker for every feature and add it to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>',
        ),
      )
      .addTo(map);
  });

  map.addControl(new mapboxgl.NavigationControl());
})();
