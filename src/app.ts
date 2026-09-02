import express, { NextFunction, Request, Response } from "express";
import path from "node:path";
import cardRouter from "./routes/card.routes";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/cards", cardRouter);

app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Express needs all four parameters to recognise an error handler.
function handleErrors(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof SyntaxError) {
    res.status(400).json({
      error: "Request body must contain valid JSON",
    });
    return;
  }

  res.status(500).json({
    error: "Internal server error",
  });
}

app.use(handleErrors);

export default app;
