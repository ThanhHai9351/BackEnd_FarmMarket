const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUserService = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, phone, password, confirmPassword, role } = newUser;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "The email is ready",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        phone,
        password: hash,
        confirmPassword: hash,
        role,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success create user",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUserService = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        role: checkUser.role,
      });

      resolve({
        status: "OK",
        message: "Success login user",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUserService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Success",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUserService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "GET ALL USER COMPLETE!",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      resolve({
        status: "OK",
        message: "GET USER COMPLETE!",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCurrentUserService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const loggedUser = await User.findOne({ _id: decoded.payload.id });
      resolve({
        status: "OK",
        message: "GET USER COMPLETE!",
        data: loggedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUserService,
  loginUserService,
  updateUserService,
  deleteUserService,
  getAllUserService,
  getDetailUser,
  getCurrentUserService,
};
