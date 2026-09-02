import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCardNumberValid } from "../src/services/card.service";

describe("isCardNumberValid", () => {
  it("returns true for a card number with a valid checksum", () => {
    assert.equal(isCardNumberValid("4111111111111111"), true);
  });

  it("returns false for a card number with an invalid checksum", () => {
    assert.equal(isCardNumberValid("4111111111111112"), false);
  });

  it("accepts spaces and hyphens in the card number", () => {
    assert.equal(isCardNumberValid("4111-1111 1111-1111"), true);
  });

  it("returns false when letters are included", () => {
    assert.equal(isCardNumberValid("411111111111111a"), false);
  });

  it("returns false when the number has an invalid length", () => {
    assert.equal(isCardNumberValid("12345"), false);
  });
});
