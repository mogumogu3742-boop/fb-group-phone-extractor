const phoneRegex = /(\+62|62|08)\d{8,13}/g;
const found = new Set();
let scrolling = false;

function normalize(num) {
  if (num.startsWith('08')) return '62' + num.slice(1);
  if (num.startsWith('+62')) return num.slice(1);
  return num;
}

function scan() {
  document.querySelectorAll('div').forEach(el => {
    const text = el.innerText;
    if (!text) return;

    const matches = text.match(phoneRegex);
    if (matches) {
      matches.forEach(n => found.add(normalize(n)));
    }
  });
}

function autoScroll() {
  if (!scrolling) return;

  window.scrollBy(0, 400);
  scan();

  const delay = 1500 + Math.random() * 2500;
  setTimeout(autoScroll, delay);
}

window.startExtractor = () => {
  scrolling = true;
  autoScroll();
};

window.stopExtractor = () => {
  scrolling = false;
  console.log([...found]);
};
