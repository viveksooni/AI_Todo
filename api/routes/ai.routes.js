import { Router } from "express";
import { generateDescription } from "../controllers/ai.controller.js";

export const AiRouter = Router();

AiRouter.post("/getDescription", generateDescription);
