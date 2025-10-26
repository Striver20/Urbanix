const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create new order
router.post("/create", requireSignIn, createOrder);

// Get user orders
router.get("/user-orders", requireSignIn, getUserOrders);

// Get all orders (Admin only)
router.get("/all-orders", requireSignIn, isAdmin, getAllOrders);

// Update order status (Admin only)
router.put(
  "/update-status/:orderId",
  requireSignIn,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
