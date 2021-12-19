const userNS = require("../models/user.model");
const { compareHash } = require("../utils/crypt");

const createUser = async (user) => {
  try {
    const { email, jwt, name, role, _id } = await userNS.create(user);
    return { email, jwt, name, role, _id };
  } catch(error) {
    console.log(error);
    throw error;
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

const getUsersByEmail = async (emails) => {
  try {
    const user = await userNS.find({'email': {$in:emails}});
    if (user) {
      return user;
    }
  } catch {
    return null;
  }
};

const getUsersByRole = async (role) => {
  try {
    const users = await userNS.find({ role });
    if (users) {
      return users;
    }
  } catch {
    return null;
  }
};

// const getUserByEmail = async (email) => {
//   try {
//     const user = await userNS.findOne({ email });
//     if (user) {
//       const { email: Email, jwt, _id } = user;
//       return { email: Email, jwt, _id };
//     }
//   } catch {
//     return null;
//   }
// };

const doesUserExists = async (email) => {
  try {
    const user = await userNS.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// eslint-disable-next-line
const updateUser = async (id, toBeUpdated) => {};

// eslint-disable-next-line
const deleteUsers = async (emails) => {
  userNS.deleteMany({ 'email' : { $in: emails } }, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUsers,
  getUser,
  getUsersByEmail,
  doesUserExists,
  getUsersByRole,
};
