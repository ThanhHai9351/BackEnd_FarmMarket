const mongoose = require("mongoose");
const cateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", cateSchema);
module.exports = Category;
