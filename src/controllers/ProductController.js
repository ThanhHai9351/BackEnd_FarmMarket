const Joi = require("joi");
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      categoryid: Joi.string().required(),
      image: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      nearType: Joi.string().required(),
      nsxid: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "ERR",
        message: error.details[0].message,
      });
    }

    const respon = await ProductService.createProductService(req.body);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, filter, categoryid, nsxid } = req.query;
    const respon = await ProductService.getAllProductsService(
      Number(limit) || 10,
      Number(page) || 0,
      sort || "asc",
      filter || "",
      categoryid,
      nsxid
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    if (!productID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The product is required" });
    }
    const respon = await ProductService.getDetailProductService(productID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const data = req.body;
    if (!productID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The product is required" });
    }
    const respon = await ProductService.updateProductService(productID, data);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    if (!productID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The product is required" });
    }
    const respon = await ProductService.deleteProductService(productID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ status: "ERROR", message: e.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getDetailProduct,
  updateProduct,
  deleteProduct,
};
