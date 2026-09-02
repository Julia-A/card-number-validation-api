import { Router } from "express";
import { validateCard } from "../controllers/card.controller";

const cardRouter = Router();

cardRouter.post("/validate", validateCard);

export default cardRouter;
