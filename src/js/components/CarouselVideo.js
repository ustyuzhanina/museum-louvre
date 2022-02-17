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
    const iframesArray = document.querySelectorAll(`.video-poster__iframe`);

    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    iframesArray.forEach((iframe, i) => {
      const uri = iframe.src;
      const videoId = uri.match(/embed\/?/)[0];
      let player;
      function onYouTubePlayerAPIReady() {
        player = new YT.Player(`video-poster__iframe_${iframe[i]}`, {
          height: '254',
          width: '452',
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      }
    });

    $(this.sliderClass).on('beforeChange', function (event, slick, currentSlide, nextSlide) {});
  }
}
