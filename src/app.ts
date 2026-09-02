import express from "express";
import cardRouter from "./routes/card.routes";

const app = express();

app.use(express.json());

app.use("/api/cards", cardRouter);

export default app;
