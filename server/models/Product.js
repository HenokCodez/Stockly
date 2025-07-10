const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    // Name of the product (required string)
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },

    // Optional text description of the product
    description: {
      type: String,
    },

    // Product price (required number)
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0, // Price can't be negative
    },

    // Quantity in stock (required number)
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      min: 0,
    },

    // Size or variant (optional string)
    size: {
      type: String,
    },

    // Category (optional string, you can enforce enums if you want)
    category: {
      type: String,
    },

    // Image URL or path (optional string)
    image: {
      type: String,
    },

    // User who created/added the product (usually an admin)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Product model based on the schema
module.exports = mongoose.model("Product", productSchema);
