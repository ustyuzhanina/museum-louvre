import { BAR, OVERLAY_IMAGE, SLIDER_CONTAINER } from '../constants/MARKUP_SELECTORS';

export default class ExploreSlider {
  constructor() {
    this.setEventListeners = this.setEventListeners.bind(this);
    this.slideReady = this.slideReady.bind(this);
    this.slideFinish = this.slideFinish.bind(this);
    this.slideMove = this.slideMove.bind(this);
    this.clicked = 0;
    this.bar = BAR;
    this.barWidth = 0;
    this.overlay = OVERLAY_IMAGE;
    this.container = SLIDER_CONTAINER;
    this.width = 0;
    this.height = 0;
  }

  getCursorPos(e) {
    console.log(e);
    e = e.changedTouches ? e.changedTouches[0] : e;
    let rect = this.overlay.getBoundingClientRect();
    let x = e.clientX - rect.left;
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

    let pos = this.getCursorPos(e);
    let overlayWidth = this.overlay.offsetWidth;
    //let barWidth = getSize(this.bar).width;

    /* Prevent the slider from being positioned outside the image: */
    if (pos < 0) pos = 0;
    if (pos > overlayWidth) pos = overlayWidth;
    this.slide(pos);
  }

  slide(x) {
    //resize the image
    this.overlay.style.width = x + 'px';
    //position the slider
    this.bar.style.left = this.overlay.offsetWidth - this.bar.offsetWidth / 2 + 'px';
  }

  setEventListeners() {
    this.bar.addEventListener('mousedown', this.slideReady);
    window.addEventListener('mouseup', this.slideFinish);
    this.bar.addEventListener('touchstart', this.slideReady);
    window.addEventListener('touchend', this.slideFinish);
  }
}
