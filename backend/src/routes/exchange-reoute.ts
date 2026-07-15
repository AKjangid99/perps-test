import { Router } from "express";
import { requireAuth } from "../utils/auth.js";
import { asyncHandler } from "../utils/async-handler.js";
import { addbalance, cancelOrder, createOrder, getDepth, getOrder, getUserBalance } from "../controllers/exchange-controller.js";

export const exchangeRouter = Router();


exchangeRouter.post("/addbalance", requireAuth, asyncHandler(addbalance))
exchangeRouter.post("/Createorder", requireAuth, asyncHandler(createOrder))
exchangeRouter.get("/getdepth", requireAuth, asyncHandler(getDepth))
exchangeRouter.get("/getuserbalance", requireAuth, asyncHandler(getUserBalance))
exchangeRouter.get("/getorder", requireAuth, asyncHandler(getOrder))
exchangeRouter.post("/canelorder", requireAuth, asyncHandler(cancelOrder))