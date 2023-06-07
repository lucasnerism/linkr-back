import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const usersRouter = Router();

usersRouter.get('/user/:id', validateToken, usersController.getUserById);
usersRouter.get('/user/', validateToken, usersController.searchUsers);
usersRouter.post('/user/follow/:id', validateToken, usersController.createFollow)
usersRouter.delete('/user/follow/:id', validateToken, usersController.deleteFollow)

usersRouter.get('/teste', usersController.getTest)

export default usersRouter;