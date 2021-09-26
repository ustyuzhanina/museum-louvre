import 'normalize.css';
import './assets/fonts/fonts.css';
import './css/styles.scss';

// connect with js files
//temporarily here

const PROGRESS = document.querySelector('.progress-bar');
const VOLUME = document.querySelector('.volume-bar');

PROGRESS.addEventListener('input', function(e) {
  const value = e.target.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
})

VOLUME.addEventListener('input', function(e) {
  const value = e.target.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
})
