document.getElementById('start').onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.startExtractor()
    });
  };
  
  document.getElementById('stop').onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.stopExtractor()
    });
  };
  