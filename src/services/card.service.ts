const MIN_CARD_LENGTH = 12;
const MAX_CARD_LENGTH = 19;

export function isCardNumberValid(cardNumber: string): boolean {
  const cleanedCardNumber = cardNumber.replace(/[ -]/g, "");

  if (!/^\d+$/.test(cleanedCardNumber)) {
    return false;
  }

  if (
    cleanedCardNumber.length < MIN_CARD_LENGTH ||
    cleanedCardNumber.length > MAX_CARD_LENGTH
  ) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let index = cleanedCardNumber.length - 1; index >= 0; index -= 1) {
    let digit = Number(cleanedCardNumber[index]);

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
