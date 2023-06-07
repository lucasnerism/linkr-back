import { db } from "../database/connect.js";

const getUserById = (id) => {
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
        'likes',l.*
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
  ;`, [id]);
};

const getUsersBySearch = (name) => {
  const pattern = `%${name}%`;
  return db.query(`
  SELECT
        u.id,u.name,u.profile_picture AS "image"
  FROM
      users u
  WHERE
      u.name ILIKE $1
  `, [pattern]);
};

const createFollow = (body) => {
  return db.query(`
    INSERT INTO 
      follows 
        (following_id, follower_id) 
      VALUES 
        ($1, $2)
    `, [body.following_id, body.follower_id])
}

const deleteFollow = (body) => {
  return db.query(`
    DELETE FROM
      follows 
    WHERE 
      following_id=$1 AND follower_id=$2   
    `, [body.following_id, body.follower_id])
}

export default {
  getUserById,
  getUsersBySearch,
  deleteFollow,
  createFollow
};