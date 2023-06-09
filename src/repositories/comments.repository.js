import { db } from "../database/connect.js";

const createComment = (comment, user_id, post_id) => {
    return db.query(`
    INSERT INTO 
     comments (comment, user_id, post_id)
    VALUES 
     ($1, $2, $3)
    ;`, [comment, user_id, post_id]);
};

const getPostComments = (post_id) => {
    return db.query(`
    SELECT * FROM
     comments
    WHERE 
     post_id = $1
    ;`, [post_id] )
};

export default {
    createComment,
    getPostComments
}