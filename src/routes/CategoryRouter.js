const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/create", categoryController.createCategory);
router.get("/getAll", categoryController.getAllCategory);
router.get("/detail/:id", categoryController.getCategory);
router.delete("/delete/:id", categoryController.deleteCategory);
router.post("/update/:id", categoryController.updateCategory);

module.exports = router;
