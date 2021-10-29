import { PRICE_LIST, SENIOR_DISCOUNT_KOEF } from '../constants/PRICES';
import {
  FORM_LARGE_COST,
  FORM_LARGE,
  FORM_LARGE_BASIC_NUMBER,
  FORM_LARGE_SENIOR_NUMBER,
  BOOK_BUTTON,
  CLOSE_BUTTON,
  FORM_CONTAINER,
  PAGE_OVERLAY,
  //inputs
  INPUT_DATE,
  INPUT_TIME,
  INPUT_NAME,
  INPUT_EMAIL,
  INPUT_PHONE,
  //ticket type
  FORM_OPTIONS,
  TICKET_TYPE_ARROW,
  TICKET_TYPE_INPUT,
  TICKET_TYPE_TEXTOVERLAY,
  ///overview data
  OVERVIEW_DATE,
  OVERVIEW_TIME,
  OVERVIEW_TICKET_TYPE,
  FORM_LARGE_BASIC_PRICE,
  FORM_LARGE_SENIOR_PRICE,
  OVERVIEW_BASIC_QTY,
  OVERVIEW_SENIOR_QTY,
  OVERVIEW_BASIC_PRICE,
  OVERVIEW_SENIOR_PRICE,
  OVERVIEW_BASIC_COST,
  OVERVIEW_SENIOR_COST,
} from '../constants/MARKUP_SELECTORS';
import toggleInputCover from '../utils/toggleInputCover';

export default class FormLarge {
  constructor(user) {
    this.userClass = user;
    this.ticketType = '';
    this.basicNumber = 0;
    this.seniorNumber = 0;
    this.basicPrice = 0;
    this.seniorPrice = 0;
    this.basicCost = 0;
    this.seniorCost = 0;
    this.cost = 0;
    this.container = FORM_CONTAINER;
    this.button = BOOK_BUTTON;
    this.closeBtn = CLOSE_BUTTON;
    this.form = FORM_LARGE;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.renderOverview = this.renderOverview.bind(this);
    this.loadInputs = this.loadInputs.bind(this);
    this.renderNumberContainer = this.renderNumberContainer.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  open() {
    this.button.removeAttribute('disabled');
    // код для выезда большой формы
    this.loadInputs();
    this.renderNumberContainer();
    this.renderOverview();

    this.container.classList.add('form-container_visible');
    this.container.classList.remove('form-container_invisible');
    PAGE_OVERLAY.classList.remove('page-overlay_hidden');

    setTimeout(() => {
      this.container.style.overflowY = 'scroll';
    }, 1000);
  }

  close() {
    this.container.style.overflowY = 'hidden';

    // прописать код для закрытия большой формы
    this.container.classList.remove('form-container_visible');
    this.container.classList.add('form-container_invisible');
    PAGE_OVERLAY.classList.add('page-overlay_hidden');
  }

  loadInputs() {
    //set values for calculation and further saving in localStorage
    this.basicNumber = this.userClass.purchase.basicNumber;
    this.seniorNumber = this.userClass.purchase.seniorNumber;

    if (this.userClass.purchase.ticketType) {
      TICKET_TYPE_INPUT.value = this.userClass.purchase.ticketType;
      TICKET_TYPE_TEXTOVERLAY.textContent = this.userClass.purchase.ticketType;
      this.ticketType = this.userClass.purchase.ticketType;
    }

    this.calculateCost();
  }

  calculateCost() {
    for (let i = 0; i < PRICE_LIST.length; i++) {
      if (PRICE_LIST[i].ticketType.toLowerCase().trim() === this.ticketType.toLowerCase().trim()) {
        this.basicPrice = PRICE_LIST[i].price;
        this.seniorPrice = PRICE_LIST[i].price * SENIOR_DISCOUNT_KOEF;

        this.basicCost = this.basicNumber * this.basicPrice;
        this.seniorCost = this.seniorNumber * this.seniorPrice;

        this.cost = this.seniorCost + this.basicCost;
        break;
      }
    }
  }

  renderNumberContainer() {
    //set values in the form
    FORM_LARGE_BASIC_NUMBER.value = this.userClass.purchase.basicNumber;
    FORM_LARGE_SENIOR_NUMBER.value = this.userClass.purchase.seniorNumber;

    FORM_LARGE_BASIC_PRICE.textContent = String(this.basicPrice);
    FORM_LARGE_SENIOR_PRICE.textContent = String(this.seniorPrice);
  }

  renderOverview() {
    //render OVERVIEW QTYs
    OVERVIEW_BASIC_QTY.textContent = String(this.basicNumber);
    OVERVIEW_SENIOR_QTY.textContent = String(this.seniorNumber);

    //render OVERVIEW prices
    OVERVIEW_BASIC_PRICE.textContent = String(this.basicPrice);
    OVERVIEW_SENIOR_PRICE.textContent = String(this.seniorPrice);

    //render OVERVIEW subtotals
    OVERVIEW_BASIC_COST.textContent = String(this.basicCost);
    OVERVIEW_SENIOR_COST.textContent = String(this.seniorCost);

    //render OVERVIEW total cost
    FORM_LARGE_COST.textContent = String(this.cost);

    const purchase = {
      ticketType: this.ticketType,
      basicNumber: this.basicNumber,
      seniorNumber: this.seniorNumber,
    };

    const dataForStorage = {
      name: this.userClass.name || 'Unknown',
      email: this.userClass.email || 'Unknown',
      purchase,
    };

    this.userClass.storeData(dataForStorage);
  }

  setEventListeners() {
    const today = new Date();
    const inputTimeLabel = INPUT_TIME.closest('label');
    const datalist = inputTimeLabel.querySelector('datalist');

    INPUT_DATE.min = today.toISOString().split('T')[0];
    INPUT_DATE.addEventListener('focus', e => toggleInputCover(e));
    INPUT_DATE.addEventListener('blur', e => toggleInputCover(e));

    INPUT_TIME.addEventListener('focus', e => {
      e.preventDefault();
      toggleInputCover(e);

      datalist.style.display = 'block';
    });

    datalist.addEventListener('mousedown', e => {
      if (e.target.tagName === 'OPTION') {
        INPUT_TIME.value = e.target.closest('option').value;
      }
    });

    INPUT_TIME.addEventListener('blur', e => {
      toggleInputCover(e);
      datalist.style.display = 'none';
    });

    // INPUT_NAME.addEventListener('change', e => {
    //   validateName(e);
    // });
    // INPUT_EMAIL.addEventListener('change', e => {
    //   validateEmail(e);
    // });
    // INPUT_PHONE.addEventListener('change', e => {
    //   validatePhone(e);
    // });

    TICKET_TYPE_INPUT.addEventListener('click', e => {
      function toggleOptionsDropdown() {
        FORM_OPTIONS.classList.toggle('options_visible');
      }

      function toggleArrow() {
        TICKET_TYPE_ARROW.classList.toggle('input-cover__arrow-icon_down');
        TICKET_TYPE_ARROW.classList.toggle('input-cover__arrow-icon_up');
      }

      function handleInput(e) {
        const chosenOption = e.target.closest('.option').textContent;
        TICKET_TYPE_INPUT.value = chosenOption.trim();
        TICKET_TYPE_TEXTOVERLAY.textContent = chosenOption;
        toggleArrow();
        toggleOptionsDropdown();
        FORM_OPTIONS.removeEventListener('click', handleInput);
      }

      //rotate arrow
      toggleArrow();

      //make options (in)visible
      toggleOptionsDropdown();

      //add list-er to option for inserting value to input and make options invisible
      FORM_OPTIONS.addEventListener('click', handleInput);
    });

    this.button.addEventListener('click', e => {
      e.preventDefault();

      // Create span element
      let ripple = document.createElement('span');

      // Add ripple class to span
      ripple.classList.add('button__ripple-effect');

      // Add span to the button
      this.button.append(ripple);

      const buttonPosition = this.button.getBoundingClientRect();

      // Get position of X
      let x = e.clientX - buttonPosition.x;

      // Get position of Y
      let y = e.clientY - buttonPosition.y;

      // Position the span element
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Remove span after 0.3s
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  }
}
