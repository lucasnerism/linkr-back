import hashtagsRepository from "../repositories/hashtags.repository.js";
import likesRepository from "../repositories/likes.repository.js";
import postsRepository from "../repositories/posts.repository.js";
import commentsRepository from "../repositories/comments.repository.js";
import urlMetadata from "url-metadata";

const createPost = async (body) => {
  try {
    const { user_id, link, comment: oldComment } = body;
    const commentArray = oldComment.split(' ');
    const hashtags = commentArray.filter(word => word.startsWith('#'));
    const comment = commentArray.filter(word => !word.startsWith('#')).join(' ');
    const metadata = await urlMetadata(link);
    const title = metadata['og:title'];
    const description = metadata['og:description'];
    const image = metadata['og:image'];
    const result = await postsRepository.createPost({ user_id, link, comment, title, description, image });
    for (const el of hashtags) {
      const tag = el.slice(1);
      await hashtagsRepository.createHashtag(tag, result.rows[0].id);
    }
    return { status: 201, response: { message: "Post criado com sucesso" } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getPosts = async (id, offset) => {
  try {
    const result = await postsRepository.getPosts(id, offset);
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getPostsByHashtag = async (tag, offset) => {
  try {
    const result = await postsRepository.getPostsByHashtag(tag, offset);
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

const likePost = async (user_id, post_id) => {
  try {
    await likesRepository.likePost(user_id, post_id);
    const result = await likesRepository.getPostLikes(post_id);
    return { status: 200, response: result.rows[0] };

  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const deletePostById = async (id) => {
  try {
    const result = await postsRepository.getPostById(id);
    if (result.rowCount === 0) return { status: 404, response: { message: "Post não encontrado" } };
    await likesRepository.deleteLikes(id);
    await postsRepository.deletePostById(id);
    return { status: 200 };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const dislikePost = async (user_id, post_id) => {
  try {
    await likesRepository.dislikePost(user_id, post_id);
    const result = await likesRepository.getPostLikes(post_id);
    return { status: 200, response: result.rows[0] };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getTrendingHashtags = async () => {
  try {
    const result = await hashtagsRepository.getTrendingHashtags();
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const createComment = async (comment, user_id, post_id) => {
  try {
    await commentsRepository.createComment(comment, user_id, post_id);
    const result = await commentsRepository.getPostComments(post_id);
    return { status: 200, response: result.rows };

  } catch (error) {
    return { status: 500, response: { message: error.message } };
  };
};

const getPostComments = async (user_id, post_id) => {
  try {
    const result = await commentsRepository.getPostComments(user_id, post_id);
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  };
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
