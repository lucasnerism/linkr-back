import { getTokenDB } from "../repositories/auth.repository.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    if(!token) return res.sendStatus(401);
    const validToken = await getTokenDB(token);
    if(!validToken.rowCount) return res.sendStatus(401)

    res.locals.token = token;
    next()
}