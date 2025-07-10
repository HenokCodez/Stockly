const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    // The product name being ordered (required)
    name: {
      type: String,
      required: [true, "Please add a product name for the order"],
    },

    // Quantity of the product ordered (required, must be >= 1)
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
      min: 1,
    },

    // Optional size or variant of the product
    size: {
      type: String,
    },

    // Optional notes for special instructions
    notes: {
      type: String,
    },

    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Optional: status of the order (pending, shipped, delivered, etc.)
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },

    // Optional: total price (you can calculate this on the server)
    totalPrice: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the Order model based on the schema
module.exports = mongoose.model("Order", orderSchema);
