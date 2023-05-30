import { db } from "../database/connect.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp (req, res){
    const {email, password, username, profile_picture} = req.body;

    try {
        const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkEmail.rows.length > 0) return res.status(409).send('Email already exists!');

        const hashPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (email, password, username, profile_picture) VALUES ($1, $2, $3, $4);`, [email, hashPassword, username, profile_picture]);
        res.sendStatus(201);

    }catch (err){
        res.status(500).send(err.message);
    }
};
