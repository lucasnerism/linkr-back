import postsService from "../services/posts.service.js";

const createPost = async (req, res) => {
  const user_id = res.locals.userId;
  const { status, response } = await postsService.createPost({ ...req.body, user_id });
  res.status(status).json(response);
};

const getPosts = async (req, res) => {
  const { userId } = res.locals;
  const { offset } = req.query;
  const { status, response } = await postsService.getPosts(userId, offset);
  res.status(status).json(response);
};

const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  const { status, response } = await postsService.getPostsByHashtag(hashtag);
  res.status(status).json(response);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await postsService.deletePostById(id);
  res.status(status).json(response);
};

const editPostById = async (req, res) => {
  const { id } = req.params;
  const { newComment } = req.body;
  const { status, response } = await postsService.editPostById(newComment, id);
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

const createComment = async (req, res) => {
  const { id: post_id } = req.params;
  const { userId } = res.locals;
  const { comment } = req.body;
  const { status, response } = await postsService.createComment(comment, userId, post_id);
  res.status(status).json(response);
};

const getPostComments = async (req, res) => {
  const { id: post_id } = req.params;
  const { userId } = res.locals;
  const { status, response } = await postsService.getPostComments(userId, post_id);
  res.status(status).json(response);
};

export default {
  createPost,
  getPosts,
  getPostsByHashtag,
  editPostById,
  deletePostById,
  likePost,
  dislikePost,
  getTrendingHashtags,
  createComment,
  getPostComments
};
