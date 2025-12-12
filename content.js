const phoneRegex = /(\+62|62|08)\d{8,13}/g;
const found = new Set();
let scrolling = false;
let stopTimer = null;

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

function exportCSV() {
  const csv = Array.from(found).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'fb_group_numbers.csv';
  a.click();

  URL.revokeObjectURL(url);
}

window.startExtractor = (minutes = 10) => {
  if (scrolling) return;
  scrolling = true;

  autoScroll();

  stopTimer = setTimeout(() => {
    window.stopExtractor();
  }, minutes * 60 * 1000);
};

window.stopExtractor = () => {
  scrolling = false;
  if (stopTimer) clearTimeout(stopTimer);
  console.log('Final result:', Array.from(found));
};

window.exportNumbers = exportCSV;
