const Joi = require("joi");
const ShoppingCartService = require("../services/ShoppingCartService");

const createShoppingCart = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      total: Joi.number().required(),
      productid: Joi.string().required(),
      userid: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "ERR",
        message: error.details[0].message,
      });
    }

    const respon = await ShoppingCartService.createShoppingCartService(
      req.body
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllShoppingCarts = async (req, res) => {
  try {
    const { userid } = req.query;
    const respon = await ShoppingCartService.getAllShoppingCartsService(userid);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const deleteShoppingCart = async (req, res) => {
  try {
    const shoppingCartID = req.params.id;
    if (!shoppingCartID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The shopping cart is required" });
    }
    const respon = await ShoppingCartService.deleteShoppingCartService(
      shoppingCartID
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ status: "ERROR", message: e.message });
  }
};

const updateShoppingCart = async (req, res) => {
  try {
    const shoppingCartID = req.params.id;
    const data = req.body;
    if (!shoppingCartID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The product is required" });
    }
    const respon = await ShoppingCartService.updateShoppingCartService(
      shoppingCartID,
      data
    );
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = {
  createShoppingCart,
  getAllShoppingCarts,
  deleteShoppingCart,
  updateShoppingCart,
};
