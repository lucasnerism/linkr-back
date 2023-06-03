import { db } from "../database/connect.js";

const getPostLikes = (post_id) => {
  return db.query(`
    SELECT
      COALESCE(COUNT(l.id),0) AS "total", COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id',u.id,'name',u.name)),'[]') AS "users"
    FROM
      likes l
    JOIN
      users u ON l.user_id = u.id
    WHERE
      post_id=$1
  ;`, [post_id]);
};

const likePost = (user_id, post_id) => {
  return db.query(`
    INSERT INTO
      likes (user_id,post_id)
    VALUES
      ($1,$2)
  ;`, [user_id, post_id]);
};

const dislikePost = (user_id, post_id) => {
  return db.query(`
    DELETE FROM
      likes
    WHERE
      user_id=$1
    AND
      post_id=$2
  `, [user_id, post_id]);
};

export default {
  getPostLikes,
  likePost,
  dislikePost
};