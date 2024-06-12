const UserRouter = require("./UserRouter");
const ProductRoter = require("./ProductRouter");
const NSXRouter = require("./NSXRouter");
const ShoppingCartRoter = require("./ShoppingCartRouter");
const OrderRoter = require("./OrderRouter");
const CategoryRouter = require("./CategoryRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRoter);
  app.use("/api/nsx", NSXRouter);
  app.use("/api/shoppingcart", ShoppingCartRoter);
  app.use("/api/order", OrderRoter);
  app.use("/api/category", CategoryRouter);
};

module.exports = routes;
