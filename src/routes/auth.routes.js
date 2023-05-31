import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);
authRouter.delete("/sign-out", validateToken, signOut);

export default authRouter;