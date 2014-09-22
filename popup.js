$("#enable").click(function() {
  chrome.storage.local.set({"enabled": true});
  window.close();
});

$("#disable").click(function() {
  chrome.storage.local.set({"enabled": false});
  window.close();
});

$("#enable-site").click(function() {
  chrome.storage.local.get({"ignore": {}, "last_site": ""}, function (result) {
    if (result.last_site != "") {
      var ignore = result.ignore;
      delete ignore[result.last_site];
      chrome.storage.local.set({"ignore": ignore});
    }
    window.close();
  });
});

$("#disable-site").click(function() {
  chrome.storage.local.get({"ignore": {}, "last_site": ""}, function (result) {
    if (result.last_site != "") {
      var ignore = result.ignore;
      ignore[result.last_site] = true;
      chrome.storage.local.set({"ignore": ignore});
    }
    window.close();
  });
});

$("#options").click(function() {
  chrome.tabs.create({url: "options.html"});
  window.close();
});

$(document).ready(function() {
  chrome.storage.local.get({"enabled": true, "ignore": {}, "last_site": ""}, function (result) {
    if (result.enabled) {
      $("#enable").hide();
    } else {
      $("#disable").hide();
    }
    if (result.last_site in result.ignore) {
      $("#disable-site").hide();
    } else {
      $("#enable-site").hide();
    }
  });
});