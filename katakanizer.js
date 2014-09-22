chrome.storage.local.get("enabled", function (result) {
  if (result.enabled == "true") {
    katakanizeHtml();
  }
});

var frequency = 0.25;
var counter = 0;

function katakanizeText(text) {
  // FIXME(xairy): collision: {"о": "オ", "о": "ヲ"}.
  var dict_base = {
    "а": "ア", "и": "イ", "у": "ウ", "е": "エ", "э": "エ", "о": "オ",
    "ка": "カ", "ки": "キ", "ку": "ク", "ке": "ケ", "кэ": "ケ", "ко": "コ",
    "са": "サ", "си": "シ", "су": "ス", "се": "セ", "сэ": "セ", "со": "ソ",
    "та": "タ", "ти": "チ", "тсу": "ツ", "те": "テ", "тэ": "テ", "то": "ト",
    "на": "ナ", "ни": "ニ", "ну": "ヌ", "не": "ネ", "нэ": "ネ", "но": "ノ",
    "ха": "ハ", "хи": "ヒ", "фу": "フ", "хе": "ヘ", "хэ": "ヘ", "хо": "ホ",
    "ма": "マ", "ми": "ミ", "му": "ム", "ме": "メ", "мэ": "メ", "мо": "モ",
    "я": "ヤ", "ю": "ユ", "ё": "ヨ",
    "ра": "ラ", "ри": "リ", "ру": "ル", "ре": "レ", "рэ": "レ", "ро": "ロ",
    "ва": "ワ", "о": "ヲ", "н": "ン"
  };

  var dictionary = $.extend({}, dict_base);

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

function traverseTextNodes(node, callback) { 
  var child = node.firstChild;
  while (child) {
    switch (child.nodeType) {
      case 1:
        traverseTextNodes(child, callback);
        break;
      case 3:
        callback(child);
        break;
    }
    child = child.nextSibling;
  }
  return node;
}

function katakanizeHtml() {
  traverseTextNodes(document.body, function(node) {
    var html = node.data;
    html = katakanizeText(html);
    node.data = html;
  });
}