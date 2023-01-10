/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 * @param style  Form CSS Styles.
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
 */
import {Observable} from "rxjs";

export function Payze(trId: string, style?: any): {
  renderCardInfo: () => void;
  pay: () => void;
  validateCardInfo: () => Observable<boolean>;
};
