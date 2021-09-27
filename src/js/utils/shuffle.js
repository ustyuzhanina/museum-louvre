export default function shuffle(arr) {
  let copy = arr.slice();
  const resArr = [];
  for(let i = 0; i < arr.length; i++) {
    const random = copy[Math.floor(Math.random() * (copy.length))];

    resArr.push(random);
    const index = copy.indexOf(random);
    copy = copy.slice(0, index).concat(copy.slice(index + 1));
  }
  return resArr;
}
