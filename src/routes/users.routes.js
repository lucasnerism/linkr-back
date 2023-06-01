import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const usersRouter = Router();

usersRouter.get('/user/:id', validateToken, usersController.getUserById);
usersRouter.get('/user/', validateToken, usersController.searchUsers);

export default usersRouter;