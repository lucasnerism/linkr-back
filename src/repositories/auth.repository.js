import { db } from "../database/connect.js";

export function getTokenDB(token){
    return db.query(`SELECT * FROM sessions WHERE token=$1`, [token])
}

export function deleteSessionDB(token){
    return db.query(`DELETE FROM sessions WHERE token=$1`, [token])
}