const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Routes for /api/users

// Register a new user
// POST /api/users
router.post("/", registerUser);

// Login a user and get a token
// POST /api/users/login
router.post("/login", loginUser);

// Get the logged-in user's profile data
// GET /api/users/me
// Protected route - requires valid JWT
router.get("/me", protect, getMe);

module.exports = router;
