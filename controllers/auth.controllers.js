const userNS = require("../models/user.model");
const { compareHash } = require("../utils/crypt");

const createUser = async (user) => {
  try {
    const { email, jwt, _id } = await userNS.create(user);
    return { email, jwt, _id };
  } catch {
    return null;
  }
};

const getUser = async (email, password) => {
  try {
    const user = await userNS.findOne({ email });
    if (user) {
      const check = await compareHash(password, user["password"]);
      if (check) {
        const { email: Email, jwt, _id } = user;
        return { email: Email, jwt, _id };
      }
    }
  } catch {
    return null;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await userNS.findOne({ email });
    if (user) {
      const { email: Email, jwt, _id } = user;
      return { email: Email, jwt, _id };
    }
  } catch {
    return null;
  }
};
// eslint-disable-next-line
const updateUser = async (id, toBeUpdated) => {};

// eslint-disable-next-line
const deleteUser = async (id) => {};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserByEmail,
};
