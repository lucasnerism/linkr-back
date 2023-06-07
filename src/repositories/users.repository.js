import { db } from "../database/connect.js";

const getUserById = (id, userId) => {
  return db.query(`
  SELECT
    u.id,u.name,u.profile_picture AS "image",
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id',p.id,
        'userId',p.user_id,
        'link',p.link,
        'comment',p.comment,
        'title',p.title,
        'description',p.description,
        'image',p.image,
        'hashtags',(COALESCE(h.hashtag,'[]')),
        'likes',l.*,
        'following',EXISTS(SELECT * FROM follows WHERE follower_id = $2 and following_id = u.id)
      )
    ) AS posts
  FROM
    users u
  INNER JOIN
    posts p ON p.user_id = u.id
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
    u.id=$1
  GROUP BY
    u.id,u.name,u.profile_picture
  ;`, [id, userId]);
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

const getFollow = (body) => {
  return db.query(`
  SELECT
        follower.name, following.name
  FROM
      follows
  JOIN users AS follower ON follower.id=following_id
  JOIN users AS following ON following.id=follower_id
  WHERE 
    follows.follower_id=$1 
    AND
    follows.following_id=$2
  
  `, [body.follower_id, body.following_id]);
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

export default {
  getUserById,
  getUsersBySearch,
  getFollow,
  createFollow
};