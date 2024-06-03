const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const loggedUser = await User.findOne({ _id: decoded.payload.id });
    req.user = loggedUser;

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

const authorization = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "You are not authorized",
    });
  }
};

module.exports = { authMiddleware, authorization };
