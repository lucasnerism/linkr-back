import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/auth.schema.js";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

export default authRouter;