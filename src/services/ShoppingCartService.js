const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");
const User = require("../models/User");

const createShoppingCartService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, quantity, total, productid, userid } = data;
    try {
      const checkUser = await User.findOne({ _id: userid });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "User not found",
        });
      }
      const checkProduct = await Product.findOne({ _id: productid });
      if (!checkProduct) {
        resolve({
          status: "ERROR",
          message: "Product not found",
        });
      }
      const checkShoppingCart = await ShoppingCart.findOne({
        productid: productid,
        userid: userid,
      });

      if (checkShoppingCart) {
        const updateSP = updateShoppingCartService(checkShoppingCart._id, {
          quantity: checkShoppingCart.quantity + 1,
          total: checkShoppingCart.price * (checkShoppingCart.quantity + 1),
        });
        if (updateSP) {
          resolve({
            status: "OK",
            message: "Success update shopping cart",
            data: updateSP,
          });
        }
      } else {
        const createShoppingCart = await ShoppingCart.create({
          name,
          price,
          quantity,
          total,
          productid,
          userid,
        });

        if (createShoppingCart) {
          resolve({
            status: "OK",
            message: "Success create shopping cart",
            data: createShoppingCart,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllShoppingCartsService = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {};
      if (userid) {
        query.userid = userid;
      }
      const allShoppingCart = await ShoppingCart.find(query);
      resolve({
        status: "OK",
        message: "GET ALL SHOPPING CART COMPLETE!",
        data: allShoppingCart,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteShoppingCartService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShoppingCart = await ShoppingCart.findOne({ _id: id });
      await ShoppingCart.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE SHOPPING CART SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateShoppingCartService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShoppingCart = await ShoppingCart.findOne({ _id: id });

      const updateShoppingCart = await ShoppingCart.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        }
      );

      resolve({
        status: "OK",
        message: "Success",
        data: updateShoppingCart,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteShoppingCartFromUserService = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkShoppingCart = await ShoppingCart.findOne({ userid: userid });
      if (!checkShoppingCart) {
        resolve({
          status: "ERROR",
          message: "Shopping Cart not found",
        });
      }
      await ShoppingCart.deleteMany({ userid: userid });

      resolve({
        status: "OK",
        message: "DELETE SHOPPING CART SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createShoppingCartService,
  getAllShoppingCartsService,
  deleteShoppingCartService,
  updateShoppingCartService,
  deleteShoppingCartFromUserService,
};
