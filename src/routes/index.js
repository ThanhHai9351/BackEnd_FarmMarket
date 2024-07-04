const UserRouter = require("./UserRouter");
const ProductRoter = require("./ProductRouter");
const NSXRouter = require("./NSXRouter");
const ShoppingCartRoter = require("./ShoppingCartRouter");
const OrderRoter = require("./OrderRouter");
const CategoryRouter = require("./CategoryRouter");
const PaymentRouter = require("./PaymentRouter");
const MailerRouter = require("./MailerRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRoter);
  app.use("/api/nsx", NSXRouter);
  app.use("/api/shoppingcart", ShoppingCartRoter);
  app.use("/api/order", OrderRoter);
  app.use("/api/category", CategoryRouter);
  app.use("/api/mailer", MailerRouter);
  app.use(
    "/api/payment",
    (req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    },
    PaymentRouter
  );
};

module.exports = routes;
