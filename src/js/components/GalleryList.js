import {
  GALLERY_CONTAINER,
  GALLERY_CONTAINER_COLUMN_1,
  GALLERY_CONTAINER_COLUMN_2,
  GALLERY_CONTAINER_COLUMN_3,
  INITIAL_PAINTINGS_ARRAY,
} from '../constants/MARKUP_SELECTORS';
import shuffle from '../utils/shuffle';

export default class GalleryList {
  constructor() {
    this.render = this.render.bind(this);
    this.fillColumn = this.fillColumn.bind(this);
    this.animateScroll = this.animateScroll.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.scrollCache = 0;
    this.gallery = document.querySelector('.section_gallery');
    this.imageClass = {
      common: '.gallery-container__item',
      animated: 'gallery-container__item_animated',
    };
  }

  render() {
    const array = shuffle(INITIAL_PAINTINGS_ARRAY);

    this.fillColumn(GALLERY_CONTAINER_COLUMN_1, array.slice(0, 5));
    this.fillColumn(GALLERY_CONTAINER_COLUMN_2, array.slice(5, 10));
    this.fillColumn(GALLERY_CONTAINER_COLUMN_3, array.slice(10));
  }

  fillColumn(column, arrayThird) {
    for (let i = 0; i < arrayThird.length; i++) {
      const template =
        `<img src="./assets/img/gallery/${arrayThird[i]}.jpg" class="gallery-container__item" alt="painting ${arrayThird[i]}">`.trim();

      const element = document.createElement('div');

      element.insertAdjacentHTML('afterbegin', template);

      const img = element.firstChild;

      column.appendChild(img);
    }
  }

  checkVisibility(elem) {
    const visibilityBorder = 20;
    const elemRect = elem.getBoundingClientRect();
    return Boolean(elemRect.top + visibilityBorder - window.innerHeight <= 0);
  }

  animateScroll() {
    if (!this.checkVisibility(this.gallery)) return false;

    let newScroll = window.scrollY;
    let images = document.querySelectorAll(this.imageClass.common);

    //on scroll down
    if (newScroll > this.scrollCache) {
      images.forEach(image => {
        if (!this.checkVisibility(image) || image.classList.contains(this.imageClass.animated))
          return false;
        image.classList.add(this.imageClass.animated);
      });
    } else if (newScroll < this.scrollCache) {
      //on scroll up
      images.forEach(image => {
        if (!this.checkVisibility(image) && image.classList.contains(this.imageClass.animated)) {
          image.classList.remove(this.imageClass.animated);
        }
      });
    }

    this.scrollCache = newScroll <= 0 ? 0 : newScroll;
  }

  setEventListeners() {
    window.addEventListener('scroll', this.animateScroll);
  }
}
