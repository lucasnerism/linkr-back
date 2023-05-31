import { db } from "../database/connect.js";

const getUserById = (id) => {
  return db.query(`
  SELECT
        u.name,u.profile_picture AS "image",
        JSON_AGG(
        JSON_BUILD_OBJECT('id',p.id,'link',p.link,'description',p.description,'hashtags',JSON_AGG(h.name))
        ) AS "posts"
  FROM
      users u
  JOIN
      posts p ON p.user_id = u.id
  JOIN
      hashtags h On h.post_id = p.id
  WHERE
      u.id=$1
  `, [id]);
};

const getUsersBySearch = ({ name }) => {
  return db.query(`
  SELECT
        id,name,profile_picture AS "image"
  FROM
      users
  WHERE
      name LIKE $1
  `, [name]);
};

export default {
  getUserById,
  getUsersBySearch
};