import usersRepository from "../repositories/users.repository.js";

const getUserById = async (id) => {
  try {
    const result = await usersRepository.getUserById();
    if (result.rowCount === 0) return { status: 404, response: { message: "Usuário não encontrado" } };

    return { status: 200, response: result.rows[0] };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const searchUsers = async (name) => {
  try {
    const result = await usersRepository.getUsersBySearch(name);
    return { status: 200, response: result.rows };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};
export default {
  getUserById,
  searchUsers
};