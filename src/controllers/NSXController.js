const Joi = require("joi");
const NSXService = require("../services/NSXService");

const createNSX = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    secretKey: Joi.string().required(),
    logo: Joi.string(),
    userid: Joi.string().required(),
  });

  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "ERROR",
        message: error.details[0].message,
      });
    }

    const respon = await NSXService.createNSXService(value);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updateNSX = async (req, res) => {
  try {
    const nsxID = req.params.id;
    const data = req.body;
    if (!nsxID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await NSXService.updateNSXService(nsxID, data);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const deleteNSX = async (req, res) => {
  try {
    const NSXId = req.params.id;
    if (!NSXId) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await NSXService.deleteNSXService(NSXId);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getAllNSX = async (req, res) => {
  try {
    const respon = await NSXService.getAllNSXService();
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getDetailNSX = async (req, res) => {
  try {
    const NSXID = req.params.id;
    if (!NSXID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await NSXService.getDetailNSX(NSXID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getDetailNSXFromUser = async (req, res) => {
  try {
    const userid = req.params.id;
    if (!userid) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await NSXService.getDetailNSXFromUserService(userid);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = {
  createNSX,
  updateNSX,
  deleteNSX,
  getAllNSX,
  getDetailNSX,
  getDetailNSXFromUser,
};
