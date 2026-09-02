import { Request, Response } from "express";
import { isCardNumberValid } from "../services/card.service";

export function validateCard(req: Request, res: Response): void {
  const cardNumber: unknown = req.body?.cardNumber;

  if (cardNumber === undefined || cardNumber === null) {
    res.status(400).json({
      error: "cardNumber is required",
    });
    return;
  }

  if (typeof cardNumber !== "string" || cardNumber.trim() === "") {
    res.status(400).json({
      error: "cardNumber must be a non-empty string",
    });
    return;
  }

  const valid = isCardNumberValid(cardNumber);

  res.status(200).json({ valid });
}
