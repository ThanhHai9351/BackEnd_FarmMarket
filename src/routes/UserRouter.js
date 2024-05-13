const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.createUser);

module.exports = router;