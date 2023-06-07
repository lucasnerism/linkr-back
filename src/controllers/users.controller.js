import { db } from "../database/connect.js";
import usersService from "../services/users.service.js";

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await usersService.getUserById(id);
  res.status(status).json(response);
};

const searchUsers = async (req, res) => {
  const { name } = req.query;
  const { status, response } = await usersService.searchUsers(name);
  res.status(status).json(response);
};

const getFollow = async (req, res) => {
  const following_id = res.locals.userId;
  const follower_id = req.params.id;

  const body = {following_id, follower_id}

  const { status, response } = await usersService.getFollow(body);
  res.status(status).json(response);

}

const createFollow = async (req, res) => {
  const following_id = req.params.id;
  const follower_id = res.locals.userId;

  const body = {following_id, follower_id}

  const { status, response } = await usersService.createFollow(body);
  res.status(status).json(response);

}

const deleteFollow = async (req, res) => {
  const following_id = req.params.id;
  const follower_id = res.locals.userId;

  const body = {following_id, follower_id}

  const { status, response } = await usersService.deleteFollow(body);
  res.status(status).json(response);

}

const getTest = async (req, res) => {
  try {
    // const {rows: response} = await db.query(`INSERT INTO posts (user_id, link, comment, 
    //   title, description, image)
    //   VALUES (5, 'https://pt.stackoverflow.com/questions/411048/como-criar-uma-nova-branch-no-github', 'esse post o usuario teste@teste.com vai poder editar',
    //   'stackoverflow o maior', 'conheça o site mais popular entre os devs', 'https://w7.pngwing.com/pngs/164/944/png-transparent-stack-overflow-stack-exchange-computer-icons-icon-design-software-developer-others-angle-text-rectangle-thumbnail.png')`)
    const {rows: response} = await db.query(`SELECT follows.id, follow.name AS follower, following.name AS following
      FROM follows
      JOIN users AS follow ON follows.follower_id=follow.id
      JOIN users AS following ON follows.following_id=following.id`)

    // const {rows: response} = await db.query(`INSERT INTO follows (following_id, follower_id) VALUES (5, 2)`)
    res.status(200).send(response);
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
}

export default {
  getUserById,
  searchUsers,
  getTest,
  createFollow,
  deleteFollow
};