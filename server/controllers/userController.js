const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/*
  registerUser handles user registration.
  - Expects: name, email, password in req.body.
  - Checks for missing fields and returns error if any are missing.
  - Checks if a user with the given email already exists.
  - Hashes the password using bcrypt for security.
  - Creates a new user in the database with the provided details.
  - Returns the new user's id, name, email, and a JWT token if successful.
  - Returns an error if user creation fails.
*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Extract user input

  if (!name || !email || !password) {
    // Validate all fields are present
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email }); // Check for existing user

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10); // Generate salt for hashing with 10 rounds(means the hashing algorithm repeats its process 10 times to make the hash more secure. More rounds make it harder for attackers to guess passwords, but also make hashing a bit slower)

  const hashedPassword = await bcrypt.hash(password, salt); // Hash password with the generated salt

  // Create user in database and the hashed password is stored ( not the plain text password )
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // If user creation is successful, return user data and token then the client stores it.
  if (user) {
    res.status(201).json({
      _id: user.id, // it is generated automatically by MongoDB
      name: user.name, // User's name
      email: user.email, // User's email
      token: generateToken(user._id), // Generates a JWT token for the newly registered user, enabling authentication throughout the application.
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/*
  loginUser handles user login.
  - Expects: email, password in req.body.
  - Finds user by email.
  - Compares provided password with stored hashed password.
  - Returns user's id, name, email, and a JWT token if credentials are valid.
  - Returns an error if credentials are invalid.
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extract login input

  const user = await User.findOne({ email }); // Find user by email

  if (user && (await bcrypt.compare(password, user.password))) {
    // converts your input password to hashed password and then compares it to the hashed password for the user in mongoDb

    // Validate password
    res.json({
      _id: user.id, // User's unique ID
      name: user.name, // User's name
      email: user.email, // User's email
      token: generateToken(user._id), // JWT token for authentication
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/*
  getMe returns the current authenticated user's data.
  - Expects: req.user to be set by authentication middleware.
  - Returns the user's data as JSON.
*/
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

/*
  generateToken creates a JWT token for a user.
  - Parameter: id (user's unique identifier)
  - Uses JWT_SECRET from environment variables.
  - Token expires in 30 days.
  - Returns the signed JWT token.
*/
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
