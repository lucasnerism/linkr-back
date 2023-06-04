import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/posts.schema.js";

const postsRouter = Router();

postsRouter.post('/posts', validateSchema(postSchema), postsController.createPost);
postsRouter.get('/posts', postsController.getPosts);
postsRouter.get('/hashtag/:hashtag', postsController.getPostsByHashtag);
postsRouter.delete('/posts/:id', postsController.deletePostById);
postsRouter.put('/posts/:id', postsController.editPostById);



export default postsRouter;