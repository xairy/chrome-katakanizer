function click(e) {
  if (e.target.innerHTML == "Enable") {
    chrome.storage.local.set({"enabled": "true"});
    //openOptions();
  } else if (e.target.innerHTML == "Disable") {
    chrome.storage.local.set({"enabled": "false"});
    //openOptions();
  }
  window.close();
}

$(document).ready(function() {
  chrome.storage.local.get({"enabled": true}, function (result) {
    if (result.enabled) {
      document.getElementById("switch").innerHTML = "Disable";
    } else {
      document.getElementById("switch").innerHTML = "Enable";
    }
  });

  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});

/*function openOptions() {
  var options_url = chrome.extension.getURL('options.html');
  chrome.tabs.query({
      url: options_url,
  }, function(results) {
      if (results.length)
          chrome.tabs.update(results[0].id, {active:true});
      else
          chrome.tabs.create({url:options_url});
  })
}*/