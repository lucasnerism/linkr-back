import { Router } from "express";
import postsController from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postSchema } from "../schemas/posts.schema.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const postsRouter = Router();


postsRouter.post('/posts', validateSchema(postSchema), validateToken, postsController.createPost);
postsRouter.get('/posts', validateToken, postsController.getPosts);
postsRouter.get('/hashtag', validateToken, postsController.getTrendingHashtags);
postsRouter.get('/hashtag/:hashtag', validateToken, postsController.getPostsByHashtag);
postsRouter.post('/post/:id/like', validateToken, postsController.likePost);
postsRouter.post('/post/:id/dislike', validateToken, postsController.dislikePost);
postsRouter.delete('/posts/:id', validateToken, postsController.deletePostById);
postsRouter.put('/posts/:id', validateToken, postsController.editPostById);


export default postsRouter;

