"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 */
function Payze(trId) {
  if (!trId) {
    throw 'transactionId undefined';
  }

  var BASE_URL = "https://payze.io";
  var transactionId = trId;
  var iframeUrl = '';
  var startPaymentUrl = '';
  var createdElements = false;
  var createdPayButton = false;
  var buttonStyles = {
    'font-size': '14px',
    'border': '0px',
    'border-radius': '4px',
    'color': 'white',
    'background': '#5033fe',
    'padding': '6px',
    'margin': '0px',
    'box-shadow': 'unset',
    'width': '100%25',
    'height': 'auto',
    'cursor': 'pointer'
  };
  var nameStyle = {
    'font-size': '14px',
    'border-radius': '4px',
    'border': '1px solid lightgrey',
    'color': 'black',
    'background': 'transparent',
    'padding': '6px',
    'margin': '0px',
    'box-shadow': 'unset',
    'width': '100%25',
    'height': '26px',
    'outline': 'none'
  };
  var panStyle = {
    'font-size': '14px',
    'border-radius': '4px',
    'border': '1px solid lightgrey',
    'color': 'black',
    'background': 'transparent',
    'padding': '6px',
    'margin': '0 0 4px 0',
    'box-shadow': 'unset',
    'width': '100%25',
    'height': '26px',
    'outline': 'none'
  };
  var dateStyle = {
    'font-size': '14px',
    'border-radius': '4px',
    'border': '1px solid lightgrey',
    'color': 'black',
    'background': 'transparent',
    'padding': '6px',
    'margin': '0px',
    'box-shadow': 'unset',
    'width': '100%25',
    'height': '26px',
    'outline': 'none'
  };
  var csvStyle = {
    'font-size': '14px',
    'border-radius': '4px',
    'border': '1px solid lightgrey',
    'color': 'black',
    'background': 'transparent',
    'padding': '6px',
    'margin': '0px',
    'box-shadow': 'unset',
    'width': '100%25',
    'height': '26px',
    'outline': 'none'
  };
  generateIframeUrls(trId);
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = '.loader {' + '  border: 8px solid #f3f3f3;' + '  border-radius: 50%;' + '  border-top: 8px solid #5033fe;' + '  width: 30px;' + '  height: 30px;' + '  -webkit-animation: spin 2s linear infinite;' + '  animation: spin 2s linear infinite;' + '}' + '@-webkit-keyframes spin {' + '  0% { -webkit-transform: rotate(0deg); }' + '  100% { -webkit-transform: rotate(360deg); }' + '}' + '@keyframes spin {' + '  0% { transform: rotate(0deg); }' + '  100% { transform: rotate(360deg); }' + '}';
  document.getElementsByTagName('head')[0].appendChild(style);
  var loader = document.createElement('div');
  loader.setAttribute('id', 'loader');
  loader.setAttribute('style', 'display: none;width: 100%; height: 100%; background-color: #f3f3f350; left:0; top:0; position: absolute;');
  console.info('Payze SDK');
  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */

  function generateIframeUrls(trId) {
    iframeUrl = "".concat(BASE_URL, "/api/redirect/iframe/").concat(trId, "?name_style=").concat(styleObjToString(nameStyle), "&pan_style=").concat(styleObjToString(panStyle), "&date_style=").concat(styleObjToString(dateStyle), "&csv_style=").concat(styleObjToString(csvStyle));
    startPaymentUrl = "".concat(BASE_URL, "/iframe-rest/").concat(trId, "/start_payment");
  }

  function updateStyles() {
    iframeUrl = "".concat(BASE_URL, "/api/redirect/iframe/").concat(transactionId, "?name_style=").concat(styleObjToString(nameStyle), "&pan_style=").concat(styleObjToString(panStyle), "&date_style=").concat(styleObjToString(dateStyle), "&csv_style=").concat(styleObjToString(csvStyle));
  }
  /**
   * Set Button style
   *
   * @param {string=} style.font-size Input font-size - Default Value is 14px
   * @param {string=} style.color Input color - Default Value is black
   * @param {string=} style.border Input border - Default Value is 0px
   * @param {string=} style.background Input background - Default Value is #5033fe
   * @param {string=} style.padding Input padding - Default Value is 0px
   * @param {string=} style.margin Input margin - Default Value is 0px
   * @param {string=} style.box-shadow Input box-shadow - Default Value is unset
   * @param style
   * @param {string} inputType Input Type - Default Value is 'PAN_DATA'
   *
   */


  function setInputStyles(style, inputType) {
    var input = panStyle;

    switch (inputType) {
      case 'PAN':
        input = panStyle;
        break;

      case 'NAME':
        input = nameStyle;
        break;

      case 'DATE':
        input = dateStyle;
        break;

      case 'CVV':
        input = csvStyle;
        break;
    }

    for (var property in style) {
      if (style.hasOwnProperty(property)) {
        input[property] = style[property];
      }
    }
  }
  /**
   * Set input style
   *
   * @param {string=} style.font-size Input font-size - Default Value is 14px
   * @param {string=} style.color Input color - Default Value is black
   * @param {string=} style.border Input border - Default Value is 0px
   * @param {string=} style.background Input background - Default Value is transparent
   * @param {string=} style.padding Input padding - Default Value is 0px
   * @param {string=} style.margin Input margin - Default Value is 0px
   * @param {string=} style.box-shadow Input box-shadow - Default Value is unset
   *
   */


  function setButtonStyles(style) {
    for (var property in style) {
      if (style.hasOwnProperty(property)) {
        buttonStyles[property] = style[property];
      }
    }
  }

  function styleObjToString(obj) {
    if (!obj) {
      throw 'style obj is undefined!';
    }

    return Object.entries(obj).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return "".concat(k, ":").concat(v);
    }).join(';');
  }

  function renderCardInfo() {
    try {
      if (createdElements) {
        return;
      }

      var element = document.getElementById('card-info');
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', "".concat(iframeUrl));
      iframe.setAttribute('name', 'card');
      iframe.setAttribute('id', 'card-form-iframe');
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('height', '100');
      element.append(iframe);
      createdElements = true;
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * init Pay button & Set Text
   *
   * @param {string=} buttonText Pay Button text - Default Value is 'PAY NOW'
   *
   */


  function renderPayButton(buttonText) {
    try {
      if (createdPayButton) {
        return;
      }

      var element = document.getElementById('pay');
      var card = document.getElementById('card');
      var loaderElement = document.getElementById('loader');
      var button = document.createElement('button');
      button.setAttribute('name', 'pay');
      button.setAttribute('style', styleObjToString(buttonStyles));
      button.innerHTML = buttonText ? buttonText : 'PAY NOW';
      element.append(button);
      document.getElementById('card').setAttribute('style', 'position: relative');
      document.getElementById('card').appendChild(loader);
      button.addEventListener('click', function (event) {
        button.disabled = true;
        loader.style.display = 'unset';
        startPaymentReq().then(function (res) {
          if (res.success) {
            if (res.threeDSecureMajorVersion === 1) {
              location.href = res.redirectUrl;
            } else if (res.threeDSecureMajorVersion === 2) {
              var form = document.createElement('form');
              var input = document.createElement('input');
              form.setAttribute('style', 'display:none');
              form.setAttribute('action', res.redirectUrl);
              form.setAttribute('method', 'POST');
              input.setAttribute('type', 'hidden');
              input.setAttribute('name', 'creq');
              input.setAttribute('value', res.creq);
              form.append(input);
              document.getElementById('card-info').append(form);
              form.submit();
            }
          } else {
            button.disabled = false;
            loader.style.display = 'none';
            document.getElementById('card-form-iframe').setAttribute('src', "".concat(iframeUrl));
            alert("success: error");
          }
        });
        setTimeout(function () {
          document.getElementById('card-form-iframe').setAttribute('src', "".concat(iframeUrl, "#send"));
        }, 2000);
      });
      createdPayButton = true;
    } catch (e) {
      console.error(e);
    }
  }

  function startPaymentReq() {
    try {
      return fetch(startPaymentUrl, {
        method: 'POST',
        body: JSON.stringify({
          'trId': transactionId
        })
      }).then(function (res) {
        return res.json();
      });
    } catch (e) {
      console.error(e); // document.getElementById('card-form').setAttribute('src', `${BASE_URL}/iframe/${transactionId}#send`);
    }
  }

  return {
    setInputStyles: setInputStyles,
    setButtonStyles: setButtonStyles,
    renderCardInfo: renderCardInfo,
    updateStyles: updateStyles,
    renderPayButton: renderPayButton
  };
}

module.exports.Payze = Payze;
