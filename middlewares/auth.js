const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    //   verify the token
    try {
      // paylod-->
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      console.log(req.user);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .send({ error: "Token expired.", expiredAt: ex.expiredAt });
      }
      return res.status(400).send({ error: "Invalid token." });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token verification authentication error",
    });
  }
};
