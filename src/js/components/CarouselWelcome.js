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
      toLeft: 'carousel__image_to-left',
      toRight: 'carousel__image_to-right',
      fromLeft: 'carousel__image_from-left',
      fromRight: 'carousel__image_from-right',
      btnActive: 'carousel__button_active',
    };
    this.arrowLeft = CAROUSEL_CONTROLS.querySelector('.carousel__arrow-left');
    this.arrowRight = CAROUSEL_CONTROLS.querySelector('.carousel__arrow-right');
    this.isEnabled = true;
    this.currentItem = 0;
    this.btnOrderNum = 1;
    this.images = CAROUSEL_IMAGE_BOX.querySelectorAll('img');
    this.btns = CAROUSEL_BTN_CONTAINER.querySelectorAll('.carousel__button');
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  changeCurrentItem(n) {
    this.btns[this.currentItem].classList.remove('carousel__button_active');
    this.currentItem = (n + this.images.length) % this.images.length;
  }

  hideItem(direction) {
    this.isEnabled = false;
    this.images[this.currentItem].classList.add(direction);
    this.images[this.currentItem].addEventListener('animationend', e => {
      e.target.classList.remove('carousel__image_active', direction);
    });
  }

  showItem(direction) {
    this.images[this.currentItem].classList.add(this.classes.next, direction);
    this.images[this.currentItem].addEventListener('animationend', e => {
      e.target.classList.remove('carousel__image_next', direction);
      e.target.classList.add('carousel__image_active');
      this.btns[this.currentItem].classList.add('carousel__button_active');
      document.querySelector('.carousel__img-order-num').textContent = '0' + (this.currentItem + 1);
      this.isEnabled = true;
    });
  }

  previousItem(n) {
    this.hideItem(this.classes.toRight);
    this.changeCurrentItem(n - 1);
    this.showItem(this.classes.fromLeft);
  }

  nextItem(n) {
    this.hideItem(this.classes.toLeft);
    this.changeCurrentItem(n + 1);
    this.showItem(this.classes.fromRight);
  }

  setEventListeners() {
    this.arrowLeft.addEventListener('click', () => {
      if (this.isEnabled) {
        this.previousItem(this.currentItem);
      }
    });

    this.arrowRight.addEventListener('click', () => {
      if (this.isEnabled) {
        this.nextItem(this.currentItem);
      }
    });
  }
}
