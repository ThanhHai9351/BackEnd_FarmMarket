const mongoose = require("mongoose");
const nsxSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    secretKey: { type: String, required: true },
    logo: { type: String, default: "" },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const NSX = mongoose.model("NSX", nsxSchema);
module.exports = NSX;
