const MIN_CARD_LENGTH = 12;
const MAX_CARD_LENGTH = 19;

export function isCardNumberValid(cardNumber: string): boolean {
  // Remove spaces and hyphens before checking the number.
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

  // Work from the right, doubling every second digit.
  for (let index = cleanedCardNumber.length - 1; index >= 0; index -= 1) {
    let digit = Number(cleanedCardNumber[index]);

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        // Same as adding the two digits: 14 becomes 1 + 4 = 5.
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
