const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const User = require("../models/User");

// Get all orders for the logged-in user
const getOrders = asyncHandler(async (req, res) => {
  // We use the user's ID from the auth middleware (req.user.id)
  // to find only orders that belong to this user
  const orders = await Order.find({ user: req.user.id });

  // Return the list of this user's orders with 200 OK
  res.status(200).json(orders);
});

// Add a new order
const setOrder = asyncHandler(async (req, res) => {
  // Basic validation: make sure required fields are present
  if (!req.body.name || !req.body.quantity) {
    res.status(400);
    throw new Error("Please include name and quantity for the order");
  }

  // Create the new order document in the database
  // Link it to the user placing the order
  const order = await Order.create({
    name: req.body.name,
    quantity: req.body.quantity,
    size: req.body.size,
    notes: req.body.notes,
    user: req.user.id,
  });

  // Return the newly created order with 201 Created status
  res.status(201).json(order);
});

// Update an existing order
const updateOrder = asyncHandler(async (req, res) => {
  // Find the order in the database by its ID (from URL param)
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Ensure the request comes from an authenticated user
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Make sure this user owns this order (users can only update their own)
  if (order.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized to update this order");
  }

  // Update the order with new data
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Return the updated document
  );

  // Return the updated order
  res.status(200).json(updatedOrder);
});

// Delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Ensure the request comes from an authenticated user
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Make sure this user owns this order
  if (order.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized to delete this order");
  }

  // Remove the order from the database
  await order.deleteOne();

  // Return the ID of the deleted order for confirmation on frontend
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getOrders,
  setOrder,
  updateOrder,
  deleteOrder,
};
