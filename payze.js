/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 */
function Payze(trId) {
  if (!trId) {
    throw 'transactionId undefined';
  }

  let BASE_URL = "https://paygate.payze.io";
  let transactionId = trId;
  let iframeUrl = '';
  let startPaymentUrl = '';

  let createdElements = false;
  let createdPayButton = false;

  let buttonStyles = {
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

  let nameStyle = {
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
  let panStyle = {
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
  let dateStyle = {
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
  let csvStyle = {
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

  let style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = '.loader {' +
    '  border: 8px solid #f3f3f3;' +
    '  border-radius: 50%;' +
    '  border-top: 8px solid #5033fe;' +
    '  width: 30px;' +
    '  height: 30px;' +
    '  -webkit-animation: spin 2s linear infinite;' +
    '  animation: spin 2s linear infinite;' +
    '}' +
    '@-webkit-keyframes spin {' +
    '  0% { -webkit-transform: rotate(0deg); }' +
    '  100% { -webkit-transform: rotate(360deg); }' +
    '}' +
    '@keyframes spin {' +
    '  0% { transform: rotate(0deg); }' +
    '  100% { transform: rotate(360deg); }' +
    '}';
  document.getElementsByTagName('head')[0].appendChild(style);

  let loader = document.createElement('div');
  loader.setAttribute('id', 'loader')
  loader.setAttribute('style', 'display: none;width: 100%; height: 100%; background-color: #f3f3f350; left:0; top:0; position: absolute;');

  console.info('Payze SDK');

  /**
   *
   * Generate iframe urls
   *
   * @param {string} trId  Transaction ID.
   */
  function generateIframeUrls(trId) {
    iframeUrl = `${BASE_URL}/iframe/${trId}?name_style=${styleObjToString(nameStyle)}&pan_style=${styleObjToString(panStyle)}&date_style=${styleObjToString(dateStyle)}&csv_style=${styleObjToString(csvStyle)}`;
    startPaymentUrl = `${BASE_URL}/iframe-rest/${trId}/start_payment`;
  }

  function updateStyles() {
    iframeUrl = `${BASE_URL}/iframe/${transactionId}?name_style=${styleObjToString(nameStyle)}&pan_style=${styleObjToString(panStyle)}&date_style=${styleObjToString(dateStyle)}&csv_style=${styleObjToString(csvStyle)}`;
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
    let input = panStyle;
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
        buttonStyles[property] = style[property];
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
      button.setAttribute('style', styleObjToString(buttonStyles));
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
              form.setAttribute('style', 'display:none');
              form.setAttribute('action', res.redirectUrl);
              form.setAttribute('method', 'POST');
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
      // document.getElementById('card-form').setAttribute('src', `${BASE_URL}/iframe/${transactionId}#send`);
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
