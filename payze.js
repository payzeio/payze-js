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
const {BehaviorSubject} = require("rxjs");

function Payze(trId, {pan = '', name = '', date = '', cvv = '', iframeHeight = '200', cardHolderError = 'Cardholder name is required!', expirationDateError = 'Date is invalid!', cvvError = 'CVV/CVC is required!', panError = 'Card number is invalid!', cardHolderPlaceholder = 'Cardholder Name', expirationDatePlaceholder = 'MM/YY', cvvPlaceholder = 'CVV/CVC'}) {
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
    iframeUrl = `${BASE_URL}/iframe/${trId}?cardholder_style=${_nameStyle}&pan_style=${_panStyle}&expirationDate_style=${_dateStyle}&cvv_style=${_cvvStyle}&pan_error=${panError}&cardholder_error=${cardHolderError}&expirationDate_error=${expirationDateError}&cvv_error=${cvvError}&cardholder_placeholder=${cardHolderPlaceholder}&expirationDate_placeholder=${expirationDatePlaceholder}&cvv_placeholder=${cvvPlaceholder}`;
    startPaymentUrl = `${BASE_URL}/page/twoFactorClient?transactionId=${trId}`;
  }

  function renderCardInfo() {
    try {
      if (createdElements) {
        return;
      }
      var element = document.getElementById('card-info');

      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', `${iframeUrl}`);
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
    document.getElementById('card-form-iframe').setAttribute('src', `${iframeUrl}#send`);
    setTimeout(() => {
      window.location.href = startPaymentUrl;
    }, 500);
  }

  return {
    renderCardInfo,
    pay,
    validateCardInfo
  };
}

module.exports.Payze = Payze;
