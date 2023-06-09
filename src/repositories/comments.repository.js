import { db } from "../database/connect.js";

const createComment = (comment, user_id, post_id) => {
    return db.query(`
    INSERT INTO 
     comments (comment, user_id, post_id)
    VALUES 
     ($1, $2, $3)
    ;`, [comment, user_id, post_id]);
};

const getPostComments = (user_id, post_id) => {
    return db.query(`
    SELECT comments.*, users.name, users.profile_picture,
      EXISTS (
        SELECT 1
        FROM follows
        WHERE follower_id = comments.user_id
          AND following_id = $2
      ) AS is_following,
      posts.user_id AS post_author
    FROM comments
    INNER JOIN users ON comments.user_id = users.id
    INNER JOIN posts ON comments.post_id = posts.id
    WHERE comments.post_id = $1
    ORDER BY comments.id ASC;
  `, [post_id, user_id]);
};

export default {
    createComment,
    getPostComments
}