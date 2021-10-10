import { PRICE_LIST, SENIOR_DISCOUNT_KOEF } from '../constants/PRICES';
import {
  FORM_SMALL_COST,
  FORM_SMALL_BASIC_NUMBER,
  FORM_SMALL_SENIOR_NUMBER,
} from '../constants/MARKUP_SELECTORS';

export default class FormSmall {
  constructor() {
    this.ticketType = '';
    this.basicNumber = 0;
    this.seniorNumber = 0;
    this.cost = 0;
    this.calculateCost = this.calculateCost.bind(this);
    this.renderCost = this.renderCost.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
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
  }

  setEventListeners(elem) {
    if (elem.type === 'radio') {
      elem.addEventListener('change', e => {
        this.ticketType = e.target.closest('.label').textContent;
        this.calculateCost();
        this.renderCost();
      });
    }
    if (elem.type === 'number') {
      //console.log('enters');

      elem.addEventListener('input', e => {
        console.log(e.target);
        this.basicNumber = Number(e.target.textContent);
        this.calculateCost();
        this.renderCost();
      });
    }
  }
}
