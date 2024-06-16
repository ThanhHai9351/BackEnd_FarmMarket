const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
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

const getAllOrderSevice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      resolve({
        status: "OK",
        message: "GET ALL ORDER COMPLETE!",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderFromUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return resolve({
          status: "ERROR",
          message: "User not found",
        });
      } else {
        const allOrder = await Order.find({ userid: id });
        resolve({
          status: "OK",
          message: "GET ALL ORDER COMPLETE!",
          data: allOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailOrderService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({ _id: id });
      resolve({
        status: "OK",
        message: "GET ORDER COMPLETE!",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrderService,
  deleteOrderService,
  getAllOrderSevice,
  getAllOrderFromUserService,
  getDetailOrderService,
};
