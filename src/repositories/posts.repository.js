import { db } from "../database/connect.js";

const createPost = ({ user_id, link, comment, title, description, image }) => {
  return db.query(`
  INSERT INTO
    posts (user_id,link,comment,title,description,image)
  VALUES
    ($1,$2,$3,$4,$5,$6)
  RETURNING id;
  `, [user_id, link, comment, title, description, image]);
};

const getPosts = () => {
  return db.query(`
  SELECT
    p.id,
    p.user_id AS "userId",
    u.name AS "userName",
    u.profile_picture AS "userImage",
    p.comment,
    p.link,
    p.title,
    p.description,
    p.image,
    COALESCE(h.hashtag,'[]') AS "hashtags",
    JSON_BUILD_OBJECT('total',l.total,'users',l.users) AS likes
  FROM
    posts p
  JOIN
    users u ON p.user_id=u.id
  CROSS JOIN LATERAL(
    SELECT JSON_AGG(h.name) AS hashtag
    FROM hashtags h
    WHERE post_id = p.id
  ) h
  CROSS JOIN LATERAL(
    SELECT COALESCE(COUNT(l.id),0) AS "total", COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id',u.id,'name',u.name)),'[]') AS "users"
    FROM likes l
    JOIN users u ON l.user_id = u.id
    WHERE post_id=p.id
  ) l
  ORDER BY
    id DESC
  ;`);
};

const getPostsByHashtag = (tag) => {
  return db.query(`
  SELECT
    p.id,
    p.user_id AS "userId",
    u.name AS "userName",
    u.profile_picture AS "userImage",
    p.comment,
    p.link,
    p.title,
    p.description,
    p.image,
    COALESCE(h.hashtag,'[]') AS "hashtags",
    JSON_BUILD_OBJECT('total',l.total,'users',l.users) AS likes
  FROM
    posts p
  JOIN
    users u ON p.user_id=u.id
  CROSS JOIN LATERAL(
    SELECT JSON_AGG(h.name) AS hashtag
    FROM hashtags h
    WHERE post_id = p.id
  ) h
  CROSS JOIN LATERAL(
    SELECT COALESCE(COUNT(l.id),0) AS "total", COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id',u.id,'name',u.name)),'[]') AS "users"
    FROM likes l
    JOIN users u ON l.user_id = u.id
    WHERE post_id=p.id
  ) l
  WHERE
    p.id IN
    (SELECT
          post_id
     FROM
          hashtags h
     WHERE
          h.name ILIKE $1
    )
  ORDER BY
    id DESC
  ;`, [tag]);
};

const deletePostById = (id) => {
  return db.query(
    `DELETE FROM posts WHERE id=$1`, [id]
  );
};

const editPostById = (newComment, id) => {
  return db.query(
    `UPDATE posts SET comment=$1, updated_at=NOW() WHERE id=$2`, [newComment, id]
  );
};

export default {
  createPost,
  getPosts,
  getPostsByHashtag,
  deletePostById,
  editPostById
};