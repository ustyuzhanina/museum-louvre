import $ from 'jquery';
import 'slick-carousel';

export default class CarouselVideo {
  constructor() {
    this.container = document.querySelector('.subcontainer__video-slider');
    this.poster = document.querySelector('.video-poster');
    this.posterStyle = window.getComputedStyle(this.poster);

    this.render = this.render.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  render() {
    $('.subcontainer__video-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 300,
      initialSlide: 1,
      dots: true,
      prevArrow: '.video-pagination__arrow_left',
      nextArrow: '.video-pagination__arrow_right',
      responsive: [
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  setEventListeners() {}
}
