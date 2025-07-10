const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // User's full name, required field
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    // User's email address, required and must be unique
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true, // convert email to lowercase before saving
      trim: true,
    },

    // User's hashed password, required field
    password: {
      type: String,
      required: [true, "Please add a password"],
    },

    // Optional role, e.g., 'user' or 'admin' - default is 'user'
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("User", userSchema);
