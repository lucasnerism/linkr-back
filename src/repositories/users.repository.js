import { db } from "../database/connect.js";

const getUserById = (id) => {
  return db.query(`
  SELECT
        u.id,u.name,u.profile_picture AS "image",
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id',p.id,
            'link',p.link,
            'description',p.description,
            'hashtags',(COALESCE(h.hashtag,'[]')),
            'likes',(SELECT COALESCE(COUNT(id),0) FROM likes WHERE post_id=p.id)
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

export default {
  getUserById,
  getUsersBySearch
};