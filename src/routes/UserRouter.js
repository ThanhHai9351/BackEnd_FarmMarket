const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", userController.updateUser);

module.exports = router;
