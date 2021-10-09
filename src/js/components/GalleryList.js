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
}
