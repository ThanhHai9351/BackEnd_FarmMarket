const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
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

module.exports = { createUser };
