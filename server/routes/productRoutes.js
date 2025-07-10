const express = require("express");
const router = express.Router();
const { getProducts, setProduct, deleteProduct, updateProduct } = require("../controllers/productsController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Routes for /api/products

// GET / - Get all products
// POST / - Create a new product (admin only)
router.route("/").get(protect, getProducts).post(protect, admin, setProduct);

// PUT /:id - Update a product by ID (admin only)
// DELETE /:id - Delete a product by ID (admin only)
router.route("/:id").put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
