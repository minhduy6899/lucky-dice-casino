// Import expresss
const express = require('express');

// Import user Middleware
const { printUserURLMiddleware } = require("../middlewares/userMiddle");


const {
  createUserOfDiceHistory,
  getAllUsersOfDiceHistory,
  getUserById,
  updateUserById,
  deleteUserById
} = require("../controllers/userController");

const router = express.Router();

router.post("/users", printUserURLMiddleware, createUserOfDiceHistory);
router.get("/users", printUserURLMiddleware, getAllUsersOfDiceHistory);
router.get("/users/:userId", printUserURLMiddleware, getUserById);
router.put("/users/:userId", printUserURLMiddleware, updateUserById);
router.delete("/users/:userId", printUserURLMiddleware, deleteUserById);

// Export router
module.exports = router;