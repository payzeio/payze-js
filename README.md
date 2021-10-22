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

Payze is the best software platform for running an internet business. We handle money movement flow for our customers by giving them tools they need.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Install payze package in your project
   ```sh
   npm install @payze/payze-js
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


### Basic Usage

1. Import payze-js SDK
   ```js
   import {Payze} from "@payze/payze-js";
   ```
2. initialize payze
   ```js
   const payze = Payze('TransactionId');
   ```
3. include following html
   ```html
    <div id="card">
      <div id="card-info">
   
      </div>
   
      <div id="pay">
   
      </div>
    </div>
   ```
4. Render Card Elements
   ```js
    payze.renderCardInfo();
    payze.renderPayButton();
   ```


### Customization

1. Customize Card information inputs
   ```js
    // setInputStyles method updates styling of one of the available inputs, 
    // it accepts 2 arguments, 
    // Argument #1 is object containing css styles
    // Argument #2 is name of the input to be styled, supported names are: PAN, NAME, DATE, CVV
    // Example usage: 
    payze.setInputStyles({'font-size': '14px', 'color': 'lightblue'}, 'PAN');
   
    // input styles will not be rendered until updateStyles method is called
   
   ```
   ---
   > **PAN:**
   > Primary Account Number input
   > 
   > **NAME:**
   > Cardholder Name input
   > 
   > **DATE:**
   > Expiration Date input
   > 
   > **CVV:**
   > Card Verification Number input
   ---
   
2. Customize Pay Button 
   ```js
    // setButtonStyles method updates styling the pay button, 
    // it accepts 1 argument, an object containing css styles
    // Example usage: 
    payze.setButtonStyles({
      'font-size': '14px',
      'border': '0px solid grey',
      'border-radius': '0px',
      'padding': '10px',
      'margin': '10px 0px'
    });
   
    // button styles will not be rendered until updateStyles method is called
   ```   
   
3. Render Customized Element Styles
   ```js
    // updateStyles method renders the updated styles from one of the above mentioned methods
    payze.updateStyles();
   
    // NOTE: payze.renderCardInfo and payze.renderPayButton should be called after payze.updateStyles method call
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/LICENSE.txt
