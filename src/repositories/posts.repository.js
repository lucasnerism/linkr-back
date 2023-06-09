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

const getAllPosts = () => {
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
  LIMIT 20
  ;`);
};

const getPostById = (id) => {
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
  WHERE p.id=$1
  ;`, [id]);
};

const getPosts = (id, offset) => {
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
    JSONB_BUILD_OBJECT('total',l.total,'users',l.users) AS likes,
    p.created_at,
    p.updated_at,
    NULL AS reposted_by
  FROM
    posts p
  JOIN
    users u ON p.user_id=u.id
  CROSS JOIN LATERAL(
    SELECT JSONB_AGG(h.name) AS hashtag
    FROM hashtags h
    WHERE post_id = p.id
  ) h
  CROSS JOIN LATERAL(
    SELECT COALESCE(COUNT(l.id),0) AS "total", COALESCE(JSONB_AGG(JSONB_BUILD_OBJECT('id',u.id,'name',u.name)),'[]') AS "users"
    FROM likes l
    JOIN users u ON l.user_id = u.id
    WHERE post_id=p.id
  ) l
  WHERE
    u.id IN
      (
        SELECT
          following_id
        FROM
          follows
        WHERE
          follower_id = $1
        AND
          following_id = u.id
      )
  UNION
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
    JSONB_BUILD_OBJECT('total',l.total,'users',l.users) AS likes,
    rp.created_at,
    rp.created_at AS updated_at,
    rp.user_id AS reposted_by
  FROM
    posts p
  JOIN
    users u ON p.user_id=u.id
  JOIN
    reposts rp ON p.id = rp.post_id
  CROSS JOIN LATERAL(
    SELECT JSONB_AGG(h.name) AS hashtag
    FROM hashtags h
    WHERE post_id = p.id
  ) h
  CROSS JOIN LATERAL(
    SELECT COALESCE(COUNT(l.id),0) AS "total", COALESCE(JSONB_AGG(JSONB_BUILD_OBJECT('id',u.id,'name',u.name)),'[]') AS "users"
    FROM likes l
    JOIN users u ON l.user_id = u.id
    WHERE post_id=p.id
  ) l
  WHERE
    rp.user_id IN
      (
        SELECT
          following_id
        FROM
          follows
        WHERE
          follower_id = $1
        AND
          following_id = rp.user_id
      )  
  ORDER BY
    created_at DESC
  LIMIT 10
  OFFSET $2
  ;`, [id, offset]);
};

const getPostsByHashtag = (tag, offset) => {
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
  LIMIT 10
  OFFSET $2
  ;`, [tag, offset]);
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
  getAllPosts,
  getPostById,
  getPosts,
  getPostsByHashtag,
  deletePostById,
  editPostById
};