import 'normalize.css';
import './assets/fonts/fonts.scss';
import './index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

// connect with js files
import {
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
import { MAPBOX } from './js/constants/MAPBOX';
import { MAPBOX_MARKERS } from './js/constants/MAPBOX_MARKERS';
import GalleryList from './js/components/GalleryList';
import ExploreSlider from './js/components/ExploreSlider';
import User from './js/components/User';
import FormSmall from './js/components/FormSmall';
import FormLarge from './js/components/FormLarge';
import FormValidator from './js/components/FormValidator';
import Videoplayer from './js/components/Videoplayer';
import CarouselWelcome from './js/components/CarouselWelcome';
import CarouselVideo from './js/components/CarouselVideo';
import mapboxgl from '!mapbox-gl';

//YouTube API - NOT WORKING - START
const players = ['player0', 'player1', 'player2', 'player3', 'player4'];
const videoIdArray = ['aWmJ5DgyWPI', 'Vi5D6FKhRmo', 'NOhDysLnTvY', '2OR0OCr6uRE', 'zp1BXPX8jcU'];
let player0;

//console.log(document.querySelectorAll('script'));

window.onload = () => {
  //This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script');
  tag.src = 'http://www.youtube.com/player_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function onYouTubeIframeAPIReady() {
    const i = 0;
    player0 = new YT.Player(`video-poster__iframe_${i}`, {
      videoId: videoIdArray[i],
      playerVars: { rel: 0 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    player0.playVideo();
  }
  function getPlayerState() {
    return player0.getPlayerState();
  }
  function pauseVideo() {
    player0.pauseVideo();
  }

  function playVideo() {
    player0.playVideo();
  }
  //player0.playVideo();
};

//YouTube API - NOT WORKING - END

//IIFE
(function () {
  const carouselWelcome = new CarouselWelcome();
  const videoplayer = new Videoplayer();
  const carouselVideo = new CarouselVideo();
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

  videoplayer.setEventListeners();

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

  carouselVideo.render();
  carouselVideo.setEventListeners();

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
