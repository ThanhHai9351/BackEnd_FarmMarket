const Joi = require("joi");
const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  try {
    const schema = Joi.object({
      orderItems: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            quantity: Joi.number().integer().required(),
            price: Joi.number().required(),
            productid: Joi.string().required(),
          })
        )
        .required(),
      shippingAddress: Joi.object({
        city: Joi.string().required(),
        district: Joi.string().required(),
        street: Joi.string().required(),
      }).required(),
      paymentMethod: Joi.string().required(),
      taxPrice: Joi.number().required(),
      totalPrice: Joi.number().required(),
      userid: Joi.string().required(),
      isPaid: Joi.boolean(),
      paidAt: Joi.date(),
      isDelivered: Joi.boolean(),
      deliveredAt: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "ERR",
        message: error.details[0].message,
      });
    }

    const respon = await OrderService.createOrderService(req.body);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The order is required" });
    }
    const respon = await OrderService.deleteOrderService(orderId);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ status: "ERROR", message: e.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const respon = await OrderService.getAllOrderSevice();
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const getAllOrderFromUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "The user is required" });
    }
    const respon = await OrderService.getAllOrderFromUserService(userID);
    return res.status(200).json(respon);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = { createOrder, deleteOrder, getAllOrder, getAllOrderFromUser };
