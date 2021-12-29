import {
  CAROUSEL_CONTAINER,
  CAROUSEL_IMAGE_BOX,
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
    this.arrowLeft = CAROUSEL_CONTROLS.querySelector('.carousel__arrow-left');
    this.arrowRight = CAROUSEL_CONTROLS.querySelector('.carousel__arrow-right');
    this.isEnabled = true;
    this.currentItem = 0;
    this.images = CAROUSEL_IMAGE_BOX.querySelectorAll('img');
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  changeCurrentItem(n) {
    this.currentItem = (n + this.images.length) % this.images.length;
  }
  previousItem(n) {
    this.changeCurrentItem(n - 1);
  }

  nextItem(n) {
    this.changeCurrentItem(n + 1);
  }

  setEventListeners() {
    this.arrowLeft.addEventListener('click', function () {
      if (this.isEnabled) {
        this.previousItem(this.currentItem);
      }
    });

    this.arrowRight.addEventListener('click', function () {
      if (this.isEnabled) {
        this.nextItem(this.currentItem);
      }
    });
  }
}
