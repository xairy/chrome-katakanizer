function click(e) {
  if (e.target.innerHTML == "Enable") {
    chrome.storage.local.set({"enabled": "true"});
  } else if (e.target.innerHTML == "Disable") {
    chrome.storage.local.set({"enabled": "false"});
  } 
  window.close();
}

$(document).ready(function() {
  chrome.storage.local.get("enabled", function (result) {
    if (result.enabled == "true") {
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