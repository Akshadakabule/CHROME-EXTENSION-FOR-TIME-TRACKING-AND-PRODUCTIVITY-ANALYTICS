let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTracking(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTracking(tab.url);
  }
});

function handleTracking(url) {
  if (!url || !url.startsWith("http")) return;

  const domain = new URL(url).hostname;
  const now = Date.now();

  if (activeTab && startTime) {
    const timeSpent = Math.floor((now - startTime) / 1000);

    fetch("http://localhost:3000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        website: activeTab,
        time: timeSpent,
        date: new Date().toISOString()
      })
    }).catch(err => console.error(err));
  }

  activeTab = domain;
  startTime = now;
}
