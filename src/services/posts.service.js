import postsRepository from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";

const createPost = async (body) => {
  try {
    const { link } = body;
    await urlMetadata(link);
    const title = metadata['og:title'];
    const description = metadata['og:description'];
    const image = metadata['og:image'];
    await postsRepository.createPost({ ...body, title, description, image });
    return { status: 201, response: { message: "Post criado com sucesso" } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getPosts = async () => {
  try {
    const result = await postsRepository.getPosts();
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getPostsByHashtag = async (tag) => {
  try {
    const result = await postsRepository.getPostsByHashtag(tag);
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const editPostById = async (newComment, id) => {
  try {
    const result = await postsRepository.editPostById(newComment, id);
    return { status: 200 };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const deletePostById = async (id) => {
  try {
    const result = await postsRepository.deletePostById(id);
    return { status: 200 };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};


export default {
  createPost,
  getPosts,
  getPostsByHashtag,
  editPostById,
  deletePostById
};