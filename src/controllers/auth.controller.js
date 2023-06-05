import { db } from "../database/connect.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { deleteSessionDB } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
    const { email, password, username, profile_picture } = req.body;

    try {
        const checkEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkEmail.rows.length > 0) return res.status(409).send('Email already exists!');

        const hashPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (email, password, name, profile_picture) VALUES ($1, $2, $3, $4);`, [email, hashPassword, username, profile_picture]);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const checkUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (checkUser.rows.length === 0) return res.status(401).send('Email address not found!');

        const user = checkUser.rows[0];
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return res.sendStatus(401);

        const token = uuid();
        await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [user.id, token]);
        res.status(200).send({ id: user.id, token: token, profile_picture: user.profile_picture });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function signOut(req, res) {
    const { token } = res.locals;
    try {
        await deleteSessionDB(token);
        res.status(204).send({message: "Usuário deslogado"});
    } catch (error) {
        res.status(500).send(err.message);
    }
}

