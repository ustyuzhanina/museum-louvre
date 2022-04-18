import $ from 'jquery';
import 'slick-carousel';

export default class CarouselVideo {
  constructor() {
    // this.container = document.querySelector('.subcontainer__video-slider');
    // this.poster = document.querySelector('.video-poster');
    // this.posterStyle = window.getComputedStyle(this.poster);
    this.sliderClass = '.subcontainer__video-slider';
    this.render = this.render.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  render() {
    $(this.sliderClass).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 300,
      initialSlide: 0,
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

  setEventListeners() {
    $(this.sliderClass).on('beforeChange', function (event, slick, currentSlide, nextSlide) {});
  }
}
