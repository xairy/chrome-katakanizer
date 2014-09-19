function click(e) {
  if (e.target.id == "enable") {
    chrome.storage.local.set({"enabled": "true"});
  } else if (e.target.id == "disable") {
    chrome.storage.local.set({"enabled": "false"});
  } 
  window.close();
}

document.addEventListener('DOMContentLoaded', function() {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});