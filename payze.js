/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 * @param {string} buttonStyle  Transaction ID.
 * @param {string} panStyle  Transaction ID.
 * @param {string} dateStyle  Transaction ID.
 * @param {string} cvvStyle  Transaction ID.
 *
 */
function Payze(trId, buttonStyle, panStyle, nameStyle, dateStyle, cvvStyle) {
  if (trId.length < 1) {
    throw 'transactionId is required';
  }

  const BASE_URL = "https://paygate.payze.io";
  const transactionId = trId;
  let iframeUrl = '';
  let startPaymentUrl = '';

  let createdElements = false;
  let createdPayButton = false;

  let _buttonStyles = buttonStyle;
  let _nameStyle = nameStyle;
  let _panStyle = panStyle;
  let _dateStyle = dateStyle;
  let _csvStyle = cvvStyle;

  generateIframeUrls(trId);

  let style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  document.getElementsByTagName('head')[0].appendChild(style);

  let loader = document.createElement('div');
  loader.setAttribute('id', 'loader')
  loader.setAttribute('style', 'display: none;width: 100%; height: 100%; background-color: #f3f3f350; left:0; top:0; position: absolute;');

  console.info('Payze SDK initialized');

  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */
  function generateIframeUrls(trId) {
    iframeUrl = `${BASE_URL}/iframe/${trId}?name_style=${styleObjToString(_nameStyle)}&pan_style=${styleObjToString(_panStyle)}&date_style=${styleObjToString(_dateStyle)}&csv_style=${styleObjToString(_csvStyle)}`;
    startPaymentUrl = `${BASE_URL}/iframe-rest/${trId}/start_payment`;
  }

  function updateStyles() {
    iframeUrl = `${BASE_URL}/iframe/${transactionId}?name_style=${styleObjToString(_nameStyle)}&pan_style=${styleObjToString(_panStyle)}&date_style=${styleObjToString(_dateStyle)}&csv_style=${styleObjToString(_csvStyle)}`;
  }

  /**
   * Set Button style
   *
   * @param {string} inputType Input Type - Default Value is 'PAN_DATA'
   * @param {string} style CSS Style - ex: 'background-color: #ff0000;'
   *
   */
  function setInputStyles(inputType, style) {
    let input = _panStyle;
    switch (inputType) {
      case 'PAN':
        input = _panStyle;
        break;
      case 'NAME':
        input = _nameStyle;
        break;
      case 'DATE':
        input = _dateStyle;
        break;
      case 'CVV':
        input = _csvStyle;
        break;
    }
    for (const property in style) {
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
    for (const property in style) {
      if (style.hasOwnProperty(property)) {
        _buttonStyles[property] = style[property];
      }
    }
  }

  function styleObjToString(obj) {
    if (!obj) {
      throw 'style obj is undefined!';
    }
    return Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';')
  }


  function renderCardInfo() {
    try {
      if (createdElements) {
        return;
      }
      let element = document.getElementById('card-info');

      let iframe = document.createElement('iframe');
      iframe.setAttribute('src', `${iframeUrl}`);
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
      let element = document.getElementById('pay');
      let card = document.getElementById('card');
      let loaderElement = document.getElementById('loader');
      let button = document.createElement('button');

      button.setAttribute('name', 'pay');
      button.setAttribute('style', styleObjToString(_buttonStyles));
      button.innerHTML = buttonText ? buttonText :  'PAY NOW';

      element.append(button);

      document.getElementById('card').setAttribute('style', 'position: relative')
      document.getElementById('card').appendChild(loader);

      button.addEventListener('click', event => {
        button.disabled = true;
        loader.style.display = 'unset';

        startPaymentReq().then(res => {
          if (res.success) {
            if (res.threeDSecureMajorVersion === 1) {
              location.href = res.redirectUrl;
            } else if (res.threeDSecureMajorVersion === 2) {
              let form = document.createElement('form');
              let input = document.createElement('input');
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
            document.getElementById('card-form-iframe').setAttribute('src', `${iframeUrl}`);
            alert("success: error");
          }
        });
        setTimeout(() => {
          document.getElementById('card-form-iframe').setAttribute('src', `${iframeUrl}#send`);
        }, 2000)
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
        body: JSON.stringify({'trId': transactionId})
      }).then(res => res.json());
    } catch (e) {
      console.error(e)
    }
  }

  return {
    setInputStyles,
    setButtonStyles,
    renderCardInfo,
    updateStyles,
    renderPayButton
  };
}

module.exports.Payze = Payze;
