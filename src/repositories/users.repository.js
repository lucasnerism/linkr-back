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

export default {
  getUserById,
  getUsersBySearch
};