import { CAROUSEL_CONTAINER } from '../constants/MARKUP_SELECTORS';

export default class CarouselWelcome {
  constructor() {
    this.classes = {
      basic: 'carousel__image',
      active: 'carousel__image_active',
      next: 'carousel__image_next',
      previous: 'carousel__image_previous',
    };
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {}
}
