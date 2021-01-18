"use strict";

var Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },
  eventHandlers: {
    oninput: null,
    onclose: null
  },
  properties: {
    value: "",
    capsLock: false
  },
  init: function init() {
    var _this = this;

    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div"); // Setup main elements

    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key"); // Add to DOM

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main); // Automatically use keyboard for elements with .use-keyboard-input

    document.querySelectorAll(".use-keyboard-input").forEach(function (element) {
      element.addEventListener("focus", function () {
        _this.open(element.value, function (currentValue) {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys: function _createKeys() {
    var _this2 = this;

    var fragment = document.createDocumentFragment();
    var keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter", "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "space"]; // Creates HTML for an icon

    var createIconHTML = function createIconHTML(icon_name) {
      return "<i class=\"material-icons\">".concat(icon_name, "</i>");
    };

    keyLayout.forEach(function (key) {
      var keyElement = document.createElement("button");
      var insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1; // Add attributes/classes

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", function () {
            _this2.properties.value = _this2.properties.value.substring(0, _this2.properties.value.length - 1);

            _this2._triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", function () {
            _this2._toggleCapsLock();

            keyElement.classList.toggle("keyboard__key--active", _this2.properties.capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", function () {
            _this2.properties.value += "\n";

            _this2._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", function () {
            _this2.properties.value += " ";

            _this2._triggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", function () {
            _this2.close();

            _this2._triggerEvent("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", function () {
            _this2.properties.value += _this2.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

            _this2._triggerEvent("oninput");
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },
  _triggerEvent: function _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock: function _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.elements.keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  open: function open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },
  close: function close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};
window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});