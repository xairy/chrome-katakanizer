var original = document.getElementById('sample-text').innerHTML;

function slideCallback(slider) {
  if (typeof slider.value == "undefined") {
    return;
  }
  var frequency = parseInt(slider.value) / 100.0;
  document.getElementById('sample-text').innerHTML = katakanizeText(original, frequency);
  chrome.storage.local.set({'frequency': frequency});
}

$(document).ready(function() {
  var slider = $('#frequency').slider({
    tooltip: 'always'
  }).on('slide', slideCallback).on('slideStop', slideCallback);

  chrome.storage.local.get({'frequency': 0.1}, function(result) {
    slider.slider('setValue', result.frequency * 100, true);
    $("#frequency-div").show("fast");
  });
});