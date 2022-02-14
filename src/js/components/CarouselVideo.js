export default class CarouselVideo {
  constructor() {
    this.container = document.querySelector('.subcontainer__video-slider');
    this.poster = document.querySelector('.video-poster');
    this.posterStyle = window.getComputedStyle(this.poster);
    this.render = this.render.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  render() {
    console.log(this.posterStyle.getPropertyValue('margin-right').split('px'));
    this.container.style.transform = `translateX(-${
      Number(this.posterStyle.getPropertyValue('width').split('px')[0]) +
      Number(this.posterStyle.getPropertyValue('margin-right').split('px')[0])
    }px)`;
  }

  setEventListeners() {}
}
