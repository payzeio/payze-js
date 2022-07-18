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
 *
 */

export function Payze(trId: string, style?: any): {
  renderCardInfo: () => void;
  pay: () => void;
};
