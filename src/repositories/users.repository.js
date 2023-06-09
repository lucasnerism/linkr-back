import { db } from "../database/connect.js";

const getUserById = (id, userId, offset) => {
  return db.query(`
  SELECT
    u.id,u.name,u.profile_picture AS "image", EXISTS(SELECT * FROM follows WHERE follower_id = $2 and following_id = $1) AS following,
    COALESCE(JSONB_AGG(p.* ORDER BY created_at DESC) FILTER (WHERE p.id IS NOT NULL),'[]') AS posts
  FROM
    users u  
  LEFT JOIN LATERAL(
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
    h.hashtag AS "hashtags",
    JSONB_BUILD_OBJECT('total',l.total,'users',l.users) AS likes,
    p.created_at,
    p.updated_at,
    NULL AS reposted_by
  FROM
    posts p
  JOIN
    users u ON p.user_id=u.id
  CROSS JOIN LATERAL(
    SELECT COALESCE(JSONB_AGG(h.name),'[]') AS hashtag
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
    p.user_id = $1
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
    h.hashtag AS "hashtags",
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
    SELECT COALESCE(JSONB_AGG(h.name),'[]') AS hashtag
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
    rp.user_id = $1
  ) p ON TRUE
  WHERE
    u.id=$1  
  GROUP BY
    u.id,u.name,u.profile_picture
  LIMIT 10
  OFFSET $3
  ;`, [id, userId, offset]);
};

const getUsersBySearch = (name, id) => {
  const pattern = `%${name}%`;
  return db.query(`
  SELECT
    u.id,u.name,u.profile_picture AS "image", EXISTS(SELECT * FROM follows WHERE follower_id = $2 and following_id = u.id) AS following
  FROM
    users u
  WHERE
    u.name ILIKE $1
  ORDER BY
    following DESC;
  `, [pattern, id]);
};

const createFollow = (body) => {
  return db.query(`
    INSERT INTO 
      follows 
        (following_id, follower_id) 
      VALUES 
        ($1, $2)
    `, [body.following_id, body.follower_id]);
};

const deleteFollow = (body) => {
  return db.query(`
    DELETE FROM
      follows 
    WHERE 
      following_id=$1 AND follower_id=$2   
    `, [body.following_id, body.follower_id]);
};

export default {
  getUserById,
  getUsersBySearch,
  deleteFollow,
  createFollow
};