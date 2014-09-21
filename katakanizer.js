chrome.storage.local.get("enabled", function (result) {
  if (result.enabled == "true") {
    katakanize_html();
  }
});

var frequency = 0.75;
var counter = 0;

function katakanize_text(text) {
  var dictBase = {
     "ка": "カ", "ки": "キ", "ку": "ク", "ке": "ケ", "кэ": "ケ", "ко": "コ",
     "са": "サ", "си": "シ", "су": "ス", "се": "セ", "сэ": "セ", "со": "ソ",
     "та": "タ", "ти": "チ", "тсу": "ツ", "те": "テ", "тэ": "テ", "то": "ト",
     "на": "ナ", "ни": "ニ", "ну": "ヌ", "не": "ネ", "нэ": "ネ", "но": "ノ",
     "ха": "ハ", "хи": "ヒ", "фу": "フ", "хе": "ヘ", "хэ": "ヘ", "хо": "ホ"
  };

  var dictionary = $.extend({}, dictBase);

  var regex = "";

  var first = true;
  for (var key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      if (first) {
        first = false;
      } else {
        regex = regex.concat("|");
      }
      regex = regex.concat(key);
    }
  }

  text = text.replace(new RegExp(regex, "g"), function(matched) {
    counter++;
    if (counter >= (1.0 / frequency)) {
      counter = 0;
      return dictionary[matched]
    }
    return matched;
  });

  return text;
}

function katakanize_html() {
  var html = document.body.innerHTML;
  html = katakanize_text(html);
  document.body.innerHTML = html;
}