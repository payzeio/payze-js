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
 * @param {string=} style.cardholderError  Cardholder error message.
 * @param {string=} style.panError  Pan error message.
 * @param {string=} style.expirationDateError  Date error message.
 * @param {string=} style.cvvError  CVV error message.
 * @param {string=} style.cardHolderPlaceholder  CardHolder placeholder.
 * @param {string=} style.expirationDatePlaceholder  ExpirationDate placeholder.
 * @param {string=} style.cvvPlaceholder  CVV placeholder.
 *
 *
 */
const {
  BehaviorSubject
} = require("rxjs");
function Payze(trId, _ref) {
  let {
    pan = '',
    name = '',
    date = '',
    cvv = '',
    iframeHeight = '200',
    cardHolderError = 'Cardholder name is required!',
    expirationDateError = 'Date is invalid!',
    cvvError = 'CVV/CVC is required!',
    panError = 'Card number is invalid!',
    cardHolderPlaceholder = 'Cardholder Name',
    expirationDatePlaceholder = 'MM/YY',
    cvvPlaceholder = 'CVV/CVC',
    successCallback = null,
    errorCallback = null
  } = _ref;
  if (!trId) {
    throw 'transactionId is required';
  }
  var BASE_URL = "https://paygate.payze.io";
  var iframeUrl = '';
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
    iframeUrl = "".concat(BASE_URL, "/iframe/").concat(trId, "?cardholder_style=").concat(_nameStyle, "&pan_style=").concat(_panStyle, "&expirationDate_style=").concat(_dateStyle, "&cvv_style=").concat(_cvvStyle, "&pan_error=").concat(panError, "&cardholder_error=").concat(cardHolderError, "&expirationDate_error=").concat(expirationDateError, "&cvv_error=").concat(cvvError, "&cardholder_placeholder=").concat(cardHolderPlaceholder, "&expirationDate_placeholder=").concat(expirationDatePlaceholder, "&cvv_placeholder=").concat(cvvPlaceholder);
    window.addEventListener('message', handleMessage, false);
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
      iframe.setAttribute('width', '100%');

      // iframe
      element.append(iframe);
      createdElements = true;
    } catch (e) {
      console.error(e);
    }
  }
  window.addEventListener('message', event => {
    if (event.data === 'valid') {
      valid.next(true);
    } else if (event.data === 'invalid') {
      valid.next(false);
    }
  });
  function validateCardInfo() {
    return valid;
  }
  function pay() {
    document.getElementById('card-form-iframe').setAttribute('src', "".concat(iframeUrl, "#send"));
  }
  function handleMessage(event) {
    const {
      action,
      status
    } = event.data;
    const isValidAction = action === 'PaymentStatus';
    const hasSuccessCallback = successCallback && typeof successCallback === 'function';
    const hasErrorCallback = errorCallback && typeof errorCallback === 'function';
    if (isValidAction) {
      if (status === 'Success' && hasSuccessCallback) {
        successCallback();
      } else if (status === 'Fail' && hasErrorCallback) {
        errorCallback();
      } else {
        console.error('missing callback:', status);
      }
    } else {
      console.error('Invalid action:', action);
    }
  }
  return {
    renderCardInfo,
    pay,
    validateCardInfo
  };
}
module.exports.Payze = Payze;
