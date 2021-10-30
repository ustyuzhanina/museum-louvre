import {
  CAROUSEL_CONTAINER,
  CAROUSEL_CONTROLS,
  CAROUSEL_TOTAL_QTY,
  CAROUSEL_BTN_CONTAINER,
  CAROUSEL_ARROW_CONTAINER,
} from '../constants/MARKUP_SELECTORS';

export default class CarouselWelcome {
  constructor() {
    this.classes = {
      basic: 'carousel__image',
      active: 'carousel__image_active',
      next: 'carousel__image_next',
      previous: 'carousel__image_previous',
      btnActive: 'carousel__button_active',
    };
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {}
}
