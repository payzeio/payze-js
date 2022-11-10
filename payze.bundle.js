"use strict";

/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 * @param {string=} style  Form CSS Styles.
 * @param {string=} style.pan  Pan Style.
 * @param {string=} style.name  CardHolder Style.
 * @param {string=} style.date  Date Style.
 * @param {string=} style.cvv  CVV Style.
 * @param {string=} style.iframeHeight  IframeHeight size.
 *
 */
var _require = require("rxjs"),
    BehaviorSubject = _require.BehaviorSubject;

function Payze(trId, _ref) {
  var _ref$pan = _ref.pan,
      pan = _ref$pan === void 0 ? '' : _ref$pan,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$date = _ref.date,
      date = _ref$date === void 0 ? '' : _ref$date,
      _ref$cvv = _ref.cvv,
      cvv = _ref$cvv === void 0 ? '' : _ref$cvv,
      _ref$iframeHeight = _ref.iframeHeight,
      iframeHeight = _ref$iframeHeight === void 0 ? '200' : _ref$iframeHeight;

  if (!trId) {
    throw 'transactionId is required';
  }

  var BASE_URL = "https://paygate.payze.io";
  var iframeUrl = '';
  var startPaymentUrl = '';
  var createdElements = false;
  var valid = new BehaviorSubject(false);

  var _nameStyle = encodeURIComponent(name);

  var _panStyle = encodeURIComponent(pan);

  var _dateStyle = encodeURIComponent(date);

  var _cvvStyle = encodeURIComponent(cvv);

  generateIframeUrls(trId);
  console.info('Payze SDK initialized');
  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */

  function generateIframeUrls(trId) {
    iframeUrl = "".concat(BASE_URL, "/iframe/").concat(trId, "?cardholder_style=").concat(_nameStyle, "&pan_style=").concat(_panStyle, "&expirationDate_style=").concat(_dateStyle, "&cvv_style=").concat(_cvvStyle);
    startPaymentUrl = "".concat(BASE_URL, "/page/twoFactorClient?transactionId=").concat(trId);
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
      iframe.setAttribute('height', iframeHeight + 'px');
      iframe.setAttribute('width', '100%'); // iframe

      element.append(iframe);
      createdElements = true;
    } catch (e) {
      console.error(e);
    }
  }

  window.addEventListener('message', function (event) {
    valid.next(event.data === 'valid');
  });

  function validateCardInfo() {
    return valid;
  }

  function pay() {
    document.getElementById('card-form-iframe').setAttribute('src', "".concat(iframeUrl, "#send"));
    setTimeout(function () {
      window.location.href = startPaymentUrl;
    }, 500);
  }

  return {
    renderCardInfo: renderCardInfo,
    pay: pay,
    validateCardInfo: validateCardInfo
  };
}

module.exports.Payze = Payze;
