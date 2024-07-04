const express = require("express");
const router = express.Router();
const mailerController = require("../controllers/MailerController");

router.post("/sendMail", mailerController.sendMail);

module.exports = router;
