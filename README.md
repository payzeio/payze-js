<div id="top"></div>

[comment]: <> ([![Stargazers][stars-shield]][stars-url])



<!-- PROJECT LOGO -->
<br />
<div style="text-align: center">
  <a href="https://payze.io" target="_blank">
    <img src="https://payze.io/assets/payze.svg" alt="Logo" height="40">
  </a>

<h3 align="center">Payze JS SDK</h3>

[comment]: <> (  <p align="center">)

[comment]: <> (    <a href="">View Demo</a>)

[comment]: <> (    ·)

[comment]: <> (    <a href="">Report Bug</a>)

[comment]: <> (  </p>)
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Payze is the best software platform for running an internet business. We handle money movement flow for our customers by
giving them tools they need.

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Install payze package in your project
   ```sh
   npm install @payze/payze-js
   ```

### Basic Usage

1. Import payze-js SDK
   ```ts
   import {Payze} from "@payze/payze-js";
   ```
2. initialize payze
   ```ts
   const payze = Payze('transactionId', {});
   ```
3. include following html
   ```html
   <div id="card">
     <div id="card-info">

     </div>
   </div>
   ```
4. Render Card Elements
   ```ts
    payze.renderCardInfo();
   ```
5. Validate Card Elements
   ```ts
    this.payze.validateCardInfo().subscribe((valid) => {
      this.valid = valid; // true or false
    });
   ```
6. Pay functionality
   ```ts
    payze.pay();
    ```

### Customization

```js
// Payze SDK accepts 2 arguments: transactionId and styles object
// styles object is optional and can be used to customize card inputs
// Example usage: 
const payze = Payze('transactionId', {
  pan: 'font-size: 20px;',
  name: 'background-color: red;',
  date: 'font-size: 20px;background-color: #f00;',
  cvv: 'font-size: 20px;color: #f00;border-radius: 10px;',
  iframeHeight: '400', // height of iframe in pixels (default: 200)
  panError: 'Card number is invalid!', // error message for pan input
  expirationDateError: 'Date is invalid!', // error message for expiration date input
  cardHolderError: 'Cardholder name is required!', // error message for cardholder name input
  cvvError: 'CVV/CVC is required!', // error message for cvv/cvc input
  cardHolderPlaceholder: 'Cardholder Name', // placeholder for cardholder name input
  expirationDatePlaceholder: 'MM/YY', // placeholder for expiration date input
  successCallback: successCallbackFunction, // success callback
  errorCallback: errorCallbackFunction, // error callback
});
 ```

| Parameters                    | Description                               |
|:------------------------------|:------------------------------------------|
| pan                           | Card Number input                         |
| name                          | Cardholder Name input                     |
| date                          | Expiration Date input                     |
| iframeHeight                  | Iframe Height (Default: 200px)            |
| panError                      | Error message for pan (Card number) input |
| expirationDateError           | Error message for expiration date input   |
| cardHolderError               | Error message for Cardholder name         |
| cvvError                      | Error message for CVV/CVC input           |
| cardHolderPlaceholder         | Placeholder for cardholder name           |
| expirationDatePlaceholder     | Placeholder for expiration date input     |


| Dependencies      | Version |
|:------------------|:--------|
| Rxjs              | ^7.5.7  |



<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge

[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-url]: https://github.com/LICENSE.txt
