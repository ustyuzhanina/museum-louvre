import { PRICE_LIST, SENIOR_DISCOUNT_KOEF } from '../constants/PRICES';
import { FORM_SMALL_COST } from '../constants/MARKUP_SELECTORS';

export default class FormSmall {
  constructor(purchaseClass) {
    this.purchaseClass = purchaseClass;
    this.ticketType = purchaseClass.ticketType || '';
    this.basicNumber = purchaseClass.basicNumber || 0;
    this.seniorNumber = purchaseClass.seniorNumber || 0;
    this.cost = purchaseClass.cost || 0;
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
