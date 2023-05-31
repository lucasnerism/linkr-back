import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get('/user/:id', usersController.getUserById);
usersRouter.get('/user/', usersController.searchUsers);

export default usersRouter;