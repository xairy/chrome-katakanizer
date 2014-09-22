chrome.storage.local.get({"enabled": true, "frequency": 0.1}, function(result) {
  if (result.enabled) {
    katakanizeHtml(result.frequency);
  }
});