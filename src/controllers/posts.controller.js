import postsService from "../services/posts.service.js";

const createPost = async (req, res) => {
  const user_id = res.locals.userId;
  const { status, response } = await postsService.createPost({ ...req.body, user_id });
  res.status(status).json(response);
};

const getPosts = async (req, res) => {
  const { status, response } = await postsService.getPosts();
  res.status(status).json(response);
};

const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  const { status, response } = await postsService.getPostsByHashtag(hashtag);
  res.status(status).json(response);
};

const likePost = async (req, res) => {
  const { id: post_id } = req.params;
  const { userId } = res.locals;
  const { status, response } = await postsService.likePost(userId, post_id);
  res.status(status).json(response);
};

const dislikePost = async (req, res) => {
  const { id: post_id } = req.params;
  const { userId } = res.locals;
  const { status, response } = await postsService.dislikePost(userId, post_id);
  res.status(status).json(response);
};

const getTrendingHashtags = async (req, res) => {
  const { status, response } = await postsService.getTrendingHashtags();
  res.status(status).json(response);
};

export default {
  createPost,
  getPosts,
  getPostsByHashtag,
  likePost,
  dislikePost,
  getTrendingHashtags
};