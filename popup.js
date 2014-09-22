$("#enable").click(function() {
  chrome.storage.local.set({"enabled": true});
  window.close();
});

$("#disable").click(function() {
  chrome.storage.local.set({"enabled": false});
  window.close();
});

$("#options").click(function() {
  chrome.tabs.create({url: "options.html"});
  window.close();
});

$(document).ready(function() {
  chrome.storage.local.get({"enabled": true}, function (result) {
    if (result.enabled) {
      $("#enable").hide();
    } else {
      $("#disable").hide();
    }
  });
});