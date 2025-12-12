async function run(fn, args = []) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fn,
    args
  });
}

document.getElementById('start').onclick = () => {
  run((m) => window.startExtractor(m), [10]); // auto stop 10 menit
};

document.getElementById('stop').onclick = () => {
  run(() => window.stopExtractor());
};

document.getElementById('export').onclick = () => {
  run(() => window.exportNumbers());
};
