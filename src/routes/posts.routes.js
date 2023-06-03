import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/posts.schema.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const postsRouter = Router();

postsRouter.post('/posts', validateSchema(postSchema), postsController.createPost);
postsRouter.get('/posts', postsController.getPosts);
postsRouter.get('/hashtag', postsController.getTrendingHashtags);
postsRouter.get('/hashtag/:hashtag', postsController.getPostsByHashtag);
postsRouter.post('/post/:id/like', validateToken, postsController.likePost);
postsRouter.post('/post/:id/dislike', validateToken, postsController.dislikePost);

export default postsRouter;