import postsService from "../services/posts.service.js";

const createPost = async (req, res) => {
  const { status, response } = await postsService.createPost(req.body);
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

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await postsService.deletePostById(id);
  res.status(status).json(response);
};


const editPostById = async (req, res) => {
  const { id } = req.params;
  const {newComment} = req.body;
  const { status, response } = await postsService.editPostById(newComment, id);
  res.status(status).json(response);
};


export default {
  createPost,
  getPosts,
  getPostsByHashtag,
  editPostById,
  deletePostById
};