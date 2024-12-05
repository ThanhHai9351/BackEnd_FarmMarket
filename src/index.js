const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("connect success");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  return res.send("hello");
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
