const express = require("express");
const router = express.Router();
const { setOrder, deleteOrder, getOrders, updateOrder } = require("../controllers/ordersController");
const { protect } = require("../middleware/authMiddleware");

// Get all orders for the logged-in user
router.get("/", protect, getOrders);

// Create a new order for the logged-in user
router.post("/", protect, setOrder);

// Update an existing order by ID
router.put("/:orderId", protect, updateOrder);

// Delete an existing order by ID
router.delete("/:orderId", protect, deleteOrder);

module.exports = router;
