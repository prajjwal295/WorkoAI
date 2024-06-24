const User = require("../model/User");

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.findUserById = async (userId) => {
  return await User.findOne({ _id: userId, deleted: false }).select(
    "-password -deleted"
  );
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email }, { deleted: false }).select(
    "-password,-deleted"
  );
};

exports.findAllUsers = async () => {
  return await User.find({ deleted: false });
};

exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.updateUserPatch = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

exports.softDeleteUser = async (userId) => {
  try {
    return await User.findByIdAndUpdate(
      userId,
      { deleted: true },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
