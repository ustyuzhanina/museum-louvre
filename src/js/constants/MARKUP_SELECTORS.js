const PAGE = document.querySelector('.page');
const PAGE_OVERLAY = document.querySelector('.page-overlay');

//mobile menu
const MOBILE_MENU = document.querySelector('.mobile-menu');

// hamburger button
const HMBG_BUTTON = document.querySelector('.hamburger-button');

//go back button
const GO_BACK_BUTTON = document.querySelector('.go-up-link');

//section_video
const PROGRESS_BAR = document.querySelector('.progress-bar');
const VOLUME_BAR = document.querySelector('.volume-bar');

//section_gallery
const GALLERY_CONTAINER = document.querySelector('.gallery-container');
const GALLERY_CONTAINER_COLUMN_1 = document.querySelector('.gallery-container__column_1');
const GALLERY_CONTAINER_COLUMN_2 = document.querySelector('.gallery-container__column_2');
const GALLERY_CONTAINER_COLUMN_3 = document.querySelector('.gallery-container__column_3');

//section_tickets
const SECTION_TICKETS_BUTTON = document.querySelector('.section_tickets__button');

//large-form selectors
const FORM_CONTAINER = document.querySelector('.form-container');
const CLOSE_BUTTON = document.querySelector('.close-button');
const TICKET_TYPE_LABEL = document.querySelector('.label-ticket-type');
const TICKET_TYPE_INPUT = TICKET_TYPE_LABEL.querySelector('.input_ticket-type');
const TICKET_TYPE_ARROW = TICKET_TYPE_LABEL.querySelector('.svg-arrow');
const TICKET_TYPE_TEXTOVERLAY = TICKET_TYPE_LABEL.querySelector('.chosen-value');
const FORM_OPTIONS = document.querySelector('.options');
const BOOK_BUTTON = document.querySelector('.overview__book-button');

const INITIAL_PAINTINGS_ARRAY = [2, 9, 4, 6, 11, 1, 8, 3, 5, 13, 7, 10, 15, 12, 14];

export {
  PROGRESS_BAR,
  VOLUME_BAR,
  GALLERY_CONTAINER,
  INITIAL_PAINTINGS_ARRAY,
  GALLERY_CONTAINER_COLUMN_1,
  GALLERY_CONTAINER_COLUMN_2,
  GALLERY_CONTAINER_COLUMN_3,
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
  BOOK_BUTTON,
  MOBILE_MENU,
  HMBG_BUTTON,
  GO_BACK_BUTTON,
};
