import { db } from "../database/connect.js";

const createHashtag = (tag, post_id) => {
  return db.query(`
    INSERT INTO
      hashtags (name,post_id)
    VALUES
      ($1,$2)
  ;`, [tag, post_id]);
};

const getTrendingHashtags = () => {
  return db.query(`
    SELECT
      h.name, COALESCE(COUNT(h.name),'0') AS count
    FROM
      hashtags h
    GROUP BY
      h.name
    ORDER BY
      count DESC
    LIMIT 10
  ;`);
};

export default {
  createHashtag,
  getTrendingHashtags
};