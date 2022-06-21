/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 */
export function Payze(trId: string): {
  setInputStyles: (inputType: string, style: any) => void;
  setButtonStyles: (style: any) => void;
  updateStyles: () => void;
  renderCardInfo: () => void;
  renderPayButton: (buttonText?: string | undefined) => void;
};
