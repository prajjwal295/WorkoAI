const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const Port = process.env.PORT || 4000;
const { auth } = require("./middlewares/auth");

const userController = require("./controllers/UserController");

// db connect
const database = require("./config/database");
database.dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.post("/createUser", userController.registerUser);
app.get("/getUserDetails/:id", userController.getUserDetails);
app.get("/getUserList", userController.getAllUserList);
app.put("/updateUser", auth, userController.updateUserDetails);
app.patch("/updatePatchUser", auth, userController.updateUserPatchDetails);
app.post("/softDelete", userController.softDeleteUser);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

// activate server
app
  .listen(Port, () => {
    console.log(`app listens at ${Port}`);
  })
  .on("error", (err) => {
    console.error("Server start error:", err);
  });
