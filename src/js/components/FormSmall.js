import { PRICE_LIST, SENIOR_DISCOUNT_KOEF } from '../constants/PRICES';
import { FORM_SMALL_COST } from '../constants/MARKUP_SELECTORS';

export default class FormSmall {
  constructor() {
    this.ticketType = '';
    this.qtyBasic = 0;
    this.qtySenior = 0;
    this.cost = 0;
    this.getTicketTypeInput = this.getTicketTypeInput.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.renderCost = this.renderCost.bind(this);
  }

  getTicketTypeInput() {
    const radios = document.getElementsByName('formSmall_ticketType');

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        const labelText = radios[i].closest('.label');
        this.ticketType = labelText.textContent;
        break;
      }
    }
  }

  calculateCost() {
    for (let i = 0; i < PRICE_LIST.length; i++) {
      if (PRICE_LIST[i].ticketType.toLowerCase().trim() === this.ticketType.toLowerCase().trim()) {
        console.log(PRICE_LIST[i]);
        this.cost =
          this.qtyBasic * PRICE_LIST[i].price +
          this.qtySenior * PRICE_LIST[i].price * SENIOR_DISCOUNT_KOEF;
        break;
      }
    }
  }

  renderCost() {
    this.getTicketTypeInput();
    this.calculateCost();
    FORM_SMALL_COST.textContent = String(this.cost);
  }
}
