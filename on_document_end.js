chrome.storage.local.get({"enabled": true, "frequency": 0.1, "ignore": {}}, function(result) {
  chrome.storage.local.set({"last_site": window.location.host});
  if (!result.enabled) {
    return;
  }
  if (window.location.host in result.ignore) {
    return;
  }
  katakanizeHtml(result.frequency);
});