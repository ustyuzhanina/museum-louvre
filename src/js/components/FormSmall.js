import { PRICE_LIST, SENIOR_DISCOUNT_KOEF } from '../constants/PRICES';
import {
  FORM_SMALL_COST,
  FORM_SMALL,
  FORM_SMALL_BASIC_NUMBER,
  FORM_SMALL_SENIOR_NUMBER,
} from '../constants/MARKUP_SELECTORS';

export default class FormSmall {
  constructor(user) {
    this.userClass = user;
    this.ticketType = '';
    this.basicNumber = 0;
    this.seniorNumber = 0;
    this.cost = 0;
    this.calculateCost = this.calculateCost.bind(this);
    this.renderCost = this.renderCost.bind(this);
    this.loadInputs = this.loadInputs.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  loadInputs() {
    //set values in the form
    FORM_SMALL_BASIC_NUMBER.value = this.userClass.purchase.basicNumber;
    FORM_SMALL_SENIOR_NUMBER.value = this.userClass.purchase.seniorNumber;
    //set values for calculation and further saving in localStorage
    this.basicNumber = this.userClass.purchase.basicNumber;
    this.seniorNumber = this.userClass.purchase.seniorNumber;

    const radios = FORM_SMALL.querySelectorAll('input[type=radio]');
    radios.forEach(radio => {
      const label = radio.closest('.label');
      if (label.textContent.trim() === this.userClass.purchase.ticketType) {
        label.querySelector('input').checked = 'checked';
        this.ticketType = this.userClass.purchase.ticketType;
      }
    });
    this.calculateCost();
  }

  calculateCost() {
    for (let i = 0; i < PRICE_LIST.length; i++) {
      if (PRICE_LIST[i].ticketType.toLowerCase().trim() === this.ticketType.toLowerCase().trim()) {
        this.cost =
          this.basicNumber * PRICE_LIST[i].price +
          this.seniorNumber * PRICE_LIST[i].price * SENIOR_DISCOUNT_KOEF;
        break;
      }
    }
  }

  renderCost() {
    FORM_SMALL_COST.textContent = String(this.cost);

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

  setEventListeners(input) {
    if (input.type === 'radio') {
      if (input.checked) {
        this.ticketType = input.closest('.label').textContent.trim();
      }
      input.addEventListener('change', e => {
        this.ticketType = e.target.closest('.label').textContent.trim();
        this.calculateCost();
        this.renderCost();
      });
    }
    if (input.type === 'number') {
      const container = input.closest('div');
      const buttons = container.querySelectorAll('button');

      buttons.forEach(button => {
        button.addEventListener('click', e => {
          const container = e.target.closest('div');
          const input = container.querySelector('input');
          const inputId = input.id;
          this[input.id] = Number(input.value);
          this.calculateCost();
          this.renderCost();
        });
      });
    }
  }
}
