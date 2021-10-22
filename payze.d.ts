/**
 * Init Payze SDK
 *
 * @param {string} trId  Transaction ID.
 */
export function Payze(trId: string): {
  setInputStyles: (style: any, inputType: string) => void;
  setButtonStyles: (style: any) => void;
  updateStyles: () => void;
  renderCardInfo: () => void;
  renderPayButton: (buttonText?: string | undefined) => void;
};
