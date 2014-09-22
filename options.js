// FIXME(xairy): slider and text blink on page refresh.

var original = document.getElementById('sample-text').innerHTML;

var slider = $('#frequency').slider({
  tooltip: 'always'
}).on('slide', function(slider) {
    var frequency = parseInt(slider.value) / 100.0;
    document.getElementById("sample-text").innerHTML = katakanizeText(original, frequency);
    chrome.storage.local.set({"frequency": frequency});
});

chrome.storage.local.get({"frequency": 0.1}, function(result) {
  slider.slider('setValue', result.frequency * 100, true);
});