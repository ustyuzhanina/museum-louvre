import { PROGRESS_BAR, VOLUME_BAR } from '../constants/MARKUP_SELECTORS';

export default class Videoplayer {
  constructor() {
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {
    PROGRESS_BAR.addEventListener('input', function (e) {
      const value = e.target.value;
      this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
    });

    VOLUME_BAR.addEventListener('input', function (e) {
      const value = e.target.value;
      this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
    });
  }
}
