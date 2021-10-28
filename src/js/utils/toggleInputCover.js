export default function toggleInputCover(event) {
  if (event.type === 'focus') {
    event.target.closest('label').querySelector('.input-cover').style.background =
      'linear-gradient(to right, transparent 90%, #fff 10%)';
    event.target.closest('label').querySelector('.input-cover').style.color = 'transparent';
  }

  if (event.type === 'blur') {
    if (!event.target.value) {
      event.target.closest('label').querySelector('.input-cover').style.backgroundColor = '#fff';
      event.target.closest('label').querySelector('.input-cover').style.color = 'inherit';
    }
  }
}
