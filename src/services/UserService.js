const User = require("../models/User");

const createUserService = async (newUser) => {
  const { name, email, phone, password, confirmPassword, role } = newUser;
  try {
    const createdUser = await User.create({
      name,
      email,
      phone,
      password,
      confirmPassword,
      role,
    });

    return {
      status: "OK",
      message: "Success create user",
      data: createdUser,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = { createUserService };
