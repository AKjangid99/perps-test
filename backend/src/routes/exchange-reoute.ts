import { Router } from "express";
import { requireAuth } from "../utils/auth.js";
import { asyncHandler } from "../utils/async-handler.js";
import { addbalance } from "../controllers/exchange-controller.js";

export const exchangeRouter = Router();


exchangeRouter.post("/addbalance" , requireAuth , asyncHandler(addbalance))