import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { signin, signup } from "../controllers/auth-controller.js";

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signup));
authRouter.post("/signin", asyncHandler(signin));
