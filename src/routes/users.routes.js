import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const usersRouter = Router();

usersRouter.get('/user/:id', validateToken, usersController.getUserById);
usersRouter.get('/user/', validateToken, usersController.searchUsers);
usersRouter.get('/user/follow/:id', validateToken, usersController.getFollow)
// usersRouter.post('/user/follow/:id', validateToken, usersController.createFollow)

usersRouter.get('/teste', usersController.getTest)

export default usersRouter;