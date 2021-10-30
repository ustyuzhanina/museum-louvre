const PAGE = document.querySelector('.page');
const PAGE_OVERLAY = document.querySelector('.page-overlay');

//mobile menu
const MOBILE_MENU = document.querySelector('.mobile-menu');

// hamburger button
const HMBG_BUTTON = document.querySelector('.hamburger-button');

//go back button
const GO_BACK_BUTTON = document.querySelector('.go-up-link');

//SECTION WELCOME CAROUSEL
const CAROUSEL_CONTAINER = document.querySelector('.carousel__container');

//section_video
const PROGRESS_BAR = document.querySelector('.progress-bar');
const VOLUME_BAR = document.querySelector('.volume-bar');

//section_gallery
const GALLERY_CONTAINER = document.querySelector('.gallery-container');
const GALLERY_CONTAINER_COLUMN_1 = document.querySelector('.gallery-container__column_1');
const GALLERY_CONTAINER_COLUMN_2 = document.querySelector('.gallery-container__column_2');
const GALLERY_CONTAINER_COLUMN_3 = document.querySelector('.gallery-container__column_3');

//section_tickets
const FORM_SMALL = document.querySelector('.section_tickets__short-form');
const FORM_SMALL_COST = FORM_SMALL.querySelector('.section_tickets__total-cost');
const FORM_SMALL_BASIC_NUMBER = FORM_SMALL.querySelector('#basicNumber');
const FORM_SMALL_SENIOR_NUMBER = FORM_SMALL.querySelector('#seniorNumber');
const SECTION_TICKETS_BUTTON = document.querySelector('.section_tickets__button');

//large-form selectors
const FORM_CONTAINER = document.querySelector('.form-container');
const CLOSE_BUTTON = document.querySelector('.close-button');

const FORM_LARGE = document.querySelector('.large-form');

//LARGE FORM inputs
const INPUT_DATE = FORM_LARGE.querySelector('.date');
const INPUT_TIME = FORM_LARGE.querySelector('.time');
const INPUT_TIME_OPTIONS = FORM_LARGE.querySelector('#time-options');
const INPUT_NAME = FORM_LARGE.querySelector('.name');
const INPUT_EMAIL = FORM_LARGE.querySelector('.email');
const INPUT_PHONE = FORM_LARGE.querySelector('.phone');

const FORM_LARGE_BASIC_NUMBER = FORM_LARGE.querySelector('#formBasicNumber');
const FORM_LARGE_SENIOR_NUMBER = FORM_LARGE.querySelector('#formSeniorNumber');

const FORM_LARGE_BASIC_PRICE = FORM_LARGE.querySelector('.fieldset-details__price_basic');
const FORM_LARGE_SENIOR_PRICE = FORM_LARGE.querySelector('.fieldset-details__price_senior');

//OVERVIEW PURCHASE DATA
const OVERVIEW_DATE = FORM_LARGE.querySelector('.overview__result_date');
const OVERVIEW_TIME = FORM_LARGE.querySelector('.overview__result_time');
const OVERVIEW_TICKET_TYPE = FORM_LARGE.querySelector('.overview__result_ticket-type');

//subtotals
const OVERVIEW_BASIC_QTY = FORM_LARGE.querySelector('.overview__ticket-count_basic');
const OVERVIEW_SENIOR_QTY = FORM_LARGE.querySelector('.overview__ticket-count_senior');

const OVERVIEW_BASIC_PRICE = FORM_LARGE.querySelector('.overview__ticket-price_basic');
const OVERVIEW_SENIOR_PRICE = FORM_LARGE.querySelector('.overview__ticket-price_senior');

const OVERVIEW_BASIC_COST = FORM_LARGE.querySelector('.overview__cost_basic');
const OVERVIEW_SENIOR_COST = FORM_LARGE.querySelector('.overview__cost_senior');

///total cost
const FORM_LARGE_COST = FORM_LARGE.querySelector('.overview__total-cost');

const TICKET_TYPE_LABEL = document.querySelector('.label-ticket-type');
const TICKET_TYPE_INPUT = TICKET_TYPE_LABEL.querySelector('.input_ticket-type');
const TICKET_TYPE_ARROW = TICKET_TYPE_LABEL.querySelector('.input-cover__arrow-icon');
const TICKET_TYPE_TEXTOVERLAY = TICKET_TYPE_LABEL.querySelector('.input-cover__chosen-value');
const FORM_OPTIONS = document.querySelector('.options');
const BOOK_BUTTON = document.querySelector('.overview__book-button');

const INITIAL_PAINTINGS_ARRAY = [2, 9, 4, 6, 11, 1, 8, 3, 5, 13, 7, 10, 15, 12, 14];

//Exhibition working hours
INPUT_TIME.min = '09:00';
INPUT_TIME.max = '17:30';
//step is 30 minutes
const step = 30;
INPUT_TIME.step = String(step * 60);

//INPUT_TIME_OPTIONS
const visitStartHourStr = INPUT_TIME.min.split(':')[0];
const visitEndHourStr = INPUT_TIME.max.split(':')[0];
const visitStartHour = +visitStartHourStr;
const visitEndHour = +visitEndHourStr;
const visitDurationHours = visitEndHour - visitStartHour + 1;
const visitTimeKoef = 60 / step;
const visitTimeOptions = visitDurationHours * visitTimeKoef;

let hourCount = 9;
const timeOptionsArray = [];
for (let i = 1; i <= visitTimeOptions; i++) {
  const timeOption = document.createElement('option');

  let hourValue;
  if (hourCount < 10) {
    hourValue = `0${hourCount}`;
  } else {
    hourValue = `${hourCount}`;
  }

  let minuteValue;

  if (i % 2 === 0) {
    minuteValue = `${step}`;
    hourCount++;
  } else {
    minuteValue = '00';
  }

  timeOption.value = `${hourValue}:${minuteValue}`;
  timeOption.textContent = `${hourValue}:${minuteValue}`;
  timeOptionsArray.push(timeOption);
}
INPUT_TIME_OPTIONS.append(...timeOptionsArray);

export {
  //section welcome carousel
  CAROUSEL_CONTAINER,
  //section video
  PROGRESS_BAR,
  VOLUME_BAR,
  //section gallery
  GALLERY_CONTAINER,
  INITIAL_PAINTINGS_ARRAY,
  GALLERY_CONTAINER_COLUMN_1,
  GALLERY_CONTAINER_COLUMN_2,
  GALLERY_CONTAINER_COLUMN_3,
  //section tickets
  FORM_SMALL,
  FORM_SMALL_COST,
  FORM_SMALL_BASIC_NUMBER,
  FORM_SMALL_SENIOR_NUMBER,
  SECTION_TICKETS_BUTTON,
  //large form
  FORM_CONTAINER,
  FORM_LARGE,
  CLOSE_BUTTON,
  //inputs
  INPUT_DATE,
  INPUT_TIME,
  INPUT_NAME,
  INPUT_EMAIL,
  INPUT_PHONE,
  //number container
  FORM_LARGE_BASIC_NUMBER,
  FORM_LARGE_SENIOR_NUMBER,
  FORM_LARGE_BASIC_PRICE,
  FORM_LARGE_SENIOR_PRICE,
  //overview
  ///overview data
  OVERVIEW_DATE,
  OVERVIEW_TIME,
  OVERVIEW_TICKET_TYPE,
  //overview pricing data
  OVERVIEW_BASIC_QTY,
  OVERVIEW_SENIOR_QTY,
  OVERVIEW_BASIC_PRICE,
  OVERVIEW_SENIOR_PRICE,
  OVERVIEW_BASIC_COST,
  OVERVIEW_SENIOR_COST,
  FORM_LARGE_COST,
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
