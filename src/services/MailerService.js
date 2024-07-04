const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendMailService = async (email, title, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"FarmMarket 👻" <${process.env.EMAIL}>`,
    to: email,
    subject: title,
    text: message,
    html: `<b>${message}</b>`,
  });
  return info;
};

module.exports = { sendMailService };
