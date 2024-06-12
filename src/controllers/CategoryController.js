const Joi = require("joi");
const CategoryServive = require("../services/CategoryService");

const createCategory = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "ERROR",
        message: error.details[0].message,
      });
    }

    const respon = await CategoryServive.createCategoryService(value);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const respon = await CategoryServive.getAllCategoryService();
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const CateId = req.params.id;
    if (!CateId) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await CategoryServive.getDetailCategory(CateId);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = { createCategory, getAllCategory, getCategory };
