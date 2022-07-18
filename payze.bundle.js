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
function Payze(trId) {
  var _name, _pan, _date, _cvv;

  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    pan: pan,
    name: name,
    date: date,
    cvv: cvv,
    iframeHeight: iframeHeight
  };

  if (!trId) {
    throw 'transactionId is required';
  }

  var BASE_URL = "https://paygate.payze.io";
  var iframeUrl = '';
  var startPaymentUrl = '';
  var createdElements = false;

  var _nameStyle = encodeURIComponent((_name = name) !== null && _name !== void 0 ? _name : '');

  var _panStyle = encodeURIComponent((_pan = pan) !== null && _pan !== void 0 ? _pan : '');

  var _dateStyle = encodeURIComponent((_date = date) !== null && _date !== void 0 ? _date : '');

  var _cvvStyle = encodeURIComponent((_cvv = cvv) !== null && _cvv !== void 0 ? _cvv : '');

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
      var _iframeHeight;

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
      iframe.setAttribute('height', ((_iframeHeight = iframeHeight) !== null && _iframeHeight !== void 0 ? _iframeHeight : '200') + 'px');
      iframe.setAttribute('width', '100%');
      element.append(iframe);
      createdElements = true;
    } catch (e) {
      console.error(e);
    }
  }

  function pay() {
    document.getElementById('card-form-iframe').setAttribute('src', "".concat(iframeUrl, "#send"));
    setTimeout(function () {
      window.location.href = startPaymentUrl;
    }, 500);
  }

  return {
    renderCardInfo: renderCardInfo,
    pay: pay
  };
}

module.exports.Payze = Payze;
