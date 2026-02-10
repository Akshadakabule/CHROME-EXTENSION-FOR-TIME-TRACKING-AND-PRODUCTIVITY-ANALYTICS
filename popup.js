chrome.storage.local.get(["data"], (res) => {
  const data = res.data || {};
  let html = "";

  for (let site in data) {
    html += `<p>${site}: ${Math.round(data[site] / 60)} min</p>`;
  }

  document.getElementById("output").innerHTML = html || "No data yet";
});
