<div id="top"></div>

[comment]: <> ([![Stargazers][stars-shield]][stars-url])
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://payze.io" target="_blank">
    <img src="https://payze.io/assets/images/logo_v2.svg" alt="Logo" height="40">
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
  iframeHeight: '400' // height of iframe in pixels (default: 200)
});
 ```

| Parameters | Description                    |
|:-----------|:-------------------------------|
| pan        | Card Number input              |
| name       | Cardholder Name input          |
| date       | Expiration Date input          |
| cvv        | Card Verification Number input |

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge

[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-url]: https://github.com/LICENSE.txt
