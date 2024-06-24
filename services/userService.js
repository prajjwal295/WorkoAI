const UserDto = require("../dtos/userDto");
const UserDao = require("../daos/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (userData) => {
  const { name, email, password, age, zipCode, city } = userData;
  const existingUser = await UserDao.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userDetails = {
    name,
    email,
    password: hashedPassword,
    age,
    zipCode,
    city,
  };

  console.log({ userDetails });

  const user = await UserDao.createUser(userDetails);

  const payload = {
    user: {
      id: user.id,
      emai: user.email,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { token, user };
};

const getUserDetailService = async (userId) => {
  const user = await UserDao.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return { user };
};

const updateUserDetailService = async (userId, userData) => {
  const user = await UserDao.findUserById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Does not Exists",
    });
  }

  const updatedUser = await UserDao.updateUser(userId, userData);

  return { updatedUser };
};

const updateUserDetailPatchService = async (userId, userData) => {
  const user = await UserDao.findUserById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Does not Exists",
    });
  }

  const updatedUser = await UserDao.updateUserPatch(userId, userData);

  return { updatedUser };
};

const getAllUserService = async () => {
  const AllUserList = await UserDao.findAllUsers();

  if (!AllUserList) {
    throw new Error("User not found");
  }

  return { AllUserList };
};

const softDeleteService = async (userId) => {
  const user = await UserDao.findUserById(userId);

  if (!user) {
    throw new Error(
      "User does not exist in the database || User Already Deleted"
    );
  }
  const deletedUser = await UserDao.softDeleteUser(userId);

  if (!deletedUser) {
    throw new Error("User Not deleted");
  }

  return { deletedUser };
};

module.exports = {
  registerUser,
  getUserDetailService,
  getAllUserService,
  updateUserDetailService,
  updateUserDetailPatchService,
  softDeleteService,
};
