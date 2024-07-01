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
    const { limit, page, filter } = req.query;
    const respon = await CategoryServive.getAllCategoryService(
      Number(limit) || 10,
      Number(page) || 0,
      filter || ""
    );
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

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The category is required" });
    }
    const respon = await CategoryServive.deleteCategoryService(categoryId);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const data = req.body;
    if (!categoryID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The product is required" });
    }
    const respon = await CategoryServive.updateCategoryService(
      categoryID,
      data
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};
