const express = require("express");
const {
  registerController,
  loginController,
  sendOTPController,
  testController,
  verifyOTPController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Register Route
router.post("/register", registerController);

// Login Route
router.post("/login", loginController);

// Test Route
router.get("/test", requireSignIn, isAdmin, testController);

// OTP Routes
router.post("/send-otp", sendOTPController);
router.post("/verify-otp", verifyOTPController);

// Protected Route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin Route
router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
