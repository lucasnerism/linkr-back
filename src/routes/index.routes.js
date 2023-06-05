import { Router } from "express";
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();
router.use(authRouter);
router.use(usersRouter);
router.use(postsRouter);

export default router;