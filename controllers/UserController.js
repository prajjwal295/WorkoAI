const userService = require("../services/userService");
const { userValidationSchema } = require("../config/schemaValidation");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, age, zipCode, city } = req.body;

    // Basic validation (additional validation can be added as needed)
    const { error, value } = userValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { token, user } = await userService.registerUser({
      name,
      email,
      password,
      city,
      age,
      zipCode,
    });

    user.password = undefined;
    user.deleted = undefined;

    res.status(201).json({ token, user });

    res.status(200).json({
      success: true,
      message: "User Creation Successfull",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is are required",
      });
    }

    const { user } = await userService.getUserDetailService(userId);

    res.status(200).json({
      success: true,
      message: "User details fetched Successfull",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllUserList = async (req, res) => {
  try {
    const { AllUserList } = await userService.getAllUserService();

    res.status(200).json({
      success: true,
      message: "User List Fetched Successfull",
      AllUserList,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const userData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is not available",
      });
    }

    if (!userData) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const { updatedUser } = await userService.updateUserDetailService(
      userId,
      userData
    );

    res.status(200).json({
      success: true,
      message: "User details fetched Successfull",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUserPatchDetails = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const userData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is not available",
      });
    }

    if (!userData) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const { updatedUser } = await userService.updateUserDetailPatchService(
      userId,
      userData
    );

    res.status(200).json({
      success: true,
      message: "User details fetched Successfull",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const userId = req.body._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is not available",
      });
    }

    const { deletedUser } = await userService.softDeleteService(userId);

    res.status(200).json({
      success: true,
      message: "User is temporarily deleted",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
