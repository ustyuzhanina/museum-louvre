import { BAR, OVERLAY_IMAGE, SLIDER_CONTAINER } from '../constants/MARKUP_SELECTORS';

export default class ExploreSlider {
  constructor() {
    this.setEventListeners = this.setEventListeners.bind(this);
    this.slideReady = this.slideReady.bind(this);
    this.slideFinish = this.slideFinish.bind(this);
    this.slideMove = this.slideMove.bind(this);
    this.initialize = this.initialize.bind(this);
    this.clicked = 0;
    this.bar = BAR;
    this.overlay = OVERLAY_IMAGE;
    this.rect = null;
    this.container = SLIDER_CONTAINER;
  }

  initialize(percent) {
    this.rect = this.overlay.getBoundingClientRect();
    this.barRect = this.bar.getBoundingClientRect();
    let shift = this.barRect.width / 2;
    let polygonX = percent + (shift / this.rect.width) * 100;

    this.bar.style.left = percent + '%';
    this.overlay.style.clipPath = `polygon(0 0, ${polygonX}% 0, ${polygonX}% 100%, 0 100%)`;
  }

  getCursorPos(e) {
    e = e.changedTouches ? e.changedTouches[0] : e;
    this.rect = this.overlay.getBoundingClientRect();
    let x = e.clientX - this.rect.left;
    return x;
  }

  slideReady(e) {
    e.preventDefault();
    this.clicked = 1;
    window.addEventListener('mousemove', this.slideMove);
    window.addEventListener('touchmove', this.slideMove);
  }

  slideFinish() {
    this.clicked = 0;
  }

  slideMove(e) {
    if (this.clicked == 0) return false;

    this.barRect = this.bar.getBoundingClientRect();
    let pos = this.getCursorPos(e);

    if (pos < 0) pos = 0;
    if (pos > this.rect.width - this.barRect.width) pos = this.rect.width - this.barRect.width;
    //console.log(pos);
    this.slide(pos);
  }

  slide(x) {
    let shift = this.barRect.width / 2;
    let polygonX = ((x + shift) / this.rect.width) * 100;
    this.overlay.style.clipPath = `polygon(0 0, ${polygonX}% 0, ${polygonX}% 100%, 0 100%)`;
    //position the slider
    this.bar.style.left = x + 'px';
  }

  setEventListeners() {
    this.bar.addEventListener('mousedown', this.slideReady);
    window.addEventListener('mouseup', this.slideFinish);
    this.bar.addEventListener('touchstart', this.slideReady);
    window.addEventListener('touchend', this.slideFinish);
  }
}
