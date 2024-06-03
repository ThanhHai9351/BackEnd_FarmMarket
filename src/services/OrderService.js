const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      userid,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    } = data;

    try {
      const checkUser = await User.findById(userid);
      if (!checkUser) {
        return resolve({
          status: "ERROR",
          message: "User not found",
        });
      }

      for (let item of orderItems) {
        const checkProduct = await Product.findById(item.productid);
        if (!checkProduct) {
          return resolve({
            status: "ERROR",
            message: `Product not found: ${item.product}`,
          });
        }
      }

      const createOrder = await Order.create({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        userid,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
      });

      if (createOrder) {
        resolve({
          status: "OK",
          message: "Success create order",
          data: createOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrderService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({ _id: id });
      await Order.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE ORDER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createOrderService, deleteOrderService };
