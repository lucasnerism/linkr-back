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


export default {
  getUserById,
  searchUsers
};