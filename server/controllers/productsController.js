const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  // Fetch all product documents from the database
  const products = await Product.find();
  // Return the list of products with a 200 OK status
  res.status(200).json(products);
});

// Add new product (Admin only)
const setProduct = asyncHandler(async (req, res) => {
  // Basic validation example: require a name
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please include a product name");
  }

  // You can add more validation here as needed for price, quantity, etc.

  // Create the new product in the database using data from the request body
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    size: req.body.size,
    category: req.body.category,
    image: req.body.image,
    createdBy: req.user.id, // track which admin created it (if you want audit logs)
  });

  // Respond with the created product and a 201 Created status
  res.status(201).json(product);
});

// Update/edit product (Admin only)
const updateProduct = asyncHandler(async (req, res) => {
  // Find the existing product by ID (from the dynamic URL param)
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Ensure the request comes from an authenticated user
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Update the product document with the new data from request body
  // { new: true } ensures we get back the updated version
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // Respond with the updated product
  res.status(200).json(updatedProduct);
});

// Delete product (Admin only)
const deleteProduct = asyncHandler(async (req, res) => {
  // Find the product to delete by ID
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Ensure the request is from an authenticated user
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Delete the product from the database
  await product.deleteOne();

  // Respond with the ID of the deleted product for frontend confirmation
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
