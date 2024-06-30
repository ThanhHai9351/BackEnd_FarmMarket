const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, role } = req.body;
    const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !phone || !password || !role) {
      return res
        .status(200)
        .json({ status: "ERR", message: "All fields are required" });
    } else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "Email is invalid" });
    } else if (password !== confirmPassword) {
      return res
        .status(200)
        .json({ status: "ERR", message: "Password not match" });
    }
    const respon = await UserService.createUserService(req.body);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res
        .status(200)
        .json({ status: "ERR", message: "All fields are required" });
    } else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "Email is invalid" });
    }
    const respon = await UserService.loginUserService(req.body);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const data = req.body;
    console.log(userID);
    if (!userID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await UserService.updateUserService(userID, data);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await UserService.deleteUserService(userID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { limit, page, filter } = req.query;
    const respon = await UserService.getAllUserService(
      Number(limit) || 10,
      Number(page) || 0,
      filter || ""
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await UserService.getDetailUser(userID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Don't find access_token" });
    }
    const respon = await UserService.getCurrentUserService(token);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  getCurrentUser,
};
