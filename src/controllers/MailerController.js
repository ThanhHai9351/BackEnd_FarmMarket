const Joi = require("joi");
const MailerService = require("../services/MailerService");

const sendMail = async (req, res) => {
  // Define the validation schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    message: Joi.string().required(),
  });

  // Validate the request body
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, title, message } = req.body;
    const respon = await MailerService.sendMailService(email, title, message);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { sendMail };
