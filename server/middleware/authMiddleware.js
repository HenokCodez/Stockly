// run: npm install jsonwebtoken bcryptjs express-async-handler

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler"); // It’s a tiny NPM package that wraps your async route handlers or middleware.It automatically catches errors in async functions and passes them to your error middleware.No need for try/catch

const protect = asyncHandler(async (req, res, next) => {
  // It checks the Authorization header in the request sent by client.
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      let token = req.headers.authorization.split(" ")[1];

      // decoded will contain the payload you signed when issuing the token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //  Uses your JWT secret (from .env) to verify the token.

      // Get user from the token and attache the user to req.user so later routes can use it.
      req.user = await User.findById(decoded.id).select("-password"); // Uses the decoded.id from the token to find the User in your MongoDB.

      next(); // If everything works, move to the next middleware or controller.
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
