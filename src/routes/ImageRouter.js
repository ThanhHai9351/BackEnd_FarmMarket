const express = require("express");
const router = express.Router();
const imageController = require("../controllers/ImageController");

router.post("/uploads", imageController.uploadImage);
router.get("/:filename", imageController.getImage);

module.exports = router;
