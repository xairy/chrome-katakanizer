function urlToHost(url) {
    var link = document.createElement("a");
    link.href = url;
    return link.host;
};

$("#enable").click(function() {
  chrome.storage.local.set({"enabled": true});
  window.close();
});

$("#disable").click(function() {
  chrome.storage.local.set({"enabled": false});
  window.close();
});

$("#enable-site").click(function() {
  chrome.storage.local.get({"ignore": {}}, function (result) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var host = urlToHost(tabs[0].url);
      var ignore = result.ignore;
      delete ignore[host];
      chrome.storage.local.set({"ignore": ignore});
      window.close();
    });
  });
});

$("#disable-site").click(function() {
  chrome.storage.local.get({"ignore": {}}, function (result) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var host = urlToHost(tabs[0].url);
      var ignore = result.ignore;
      ignore[host] = true;
      chrome.storage.local.set({"ignore": ignore});
      window.close();
    });
  });
});

$("#options").click(function() {
  chrome.tabs.create({url: "options.html"});
  window.close();
});

$(document).ready(function() {
  chrome.storage.local.get({"enabled": true, "ignore": {}}, function (result) {
    if (result.enabled) {
      $("#enable").hide();
    } else {
      $("#disable").hide();
    }
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
      var host = urlToHost(tabs[0].url);
      if (host in result.ignore) {
        $("#disable-site").hide();
      } else {
        $("#enable-site").hide();
      }
    });
  });
});