import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./controllers.js";

const router = express.Router();

// Create a new user
router.post("/users", createUser);

// Get all users
router.get("/users", getAllUsers);

// Get a user by ID
router.get("/users/:id", getUserById);

// Update a user
router.put("/users/:id", updateUser);

// Delete a user
router.delete("/users/:id", deleteUser);


router.all("/*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Invalid API routes",
  });
});


export default router;
