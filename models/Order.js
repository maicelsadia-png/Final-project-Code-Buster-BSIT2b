const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  // Reference to user who made the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // Array of products in the order
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],

  // Total price
  totalAmount: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);