const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authorization,
} = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUsers);
router.get("/detail/:id", userController.getDetailUser);
router.get("/getUserToken/:token", userController.getCurrentUser);

module.exports = router;
