const express = require("express");
const router = express.Router();
const nsxController = require("../controllers/NSXController");

router.post("/create", nsxController.createNSX);
router.post("/update/:id", nsxController.updateNSX);
router.delete("/delete/:id", nsxController.deleteNSX);
router.get("/getAll", nsxController.getAllNSX);
router.get("/detail/:id", nsxController.getDetailNSX);
router.get("/getNSXFromUser/:id", nsxController.getDetailNSXFromUser);

module.exports = router;
