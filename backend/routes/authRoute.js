const express = require("express");
const {
  registerController,
  loginController,
  sendOTPController,
  testController,
  verifyOTPController,
  updateProfileController,
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

// Protected User Auth Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin Auth Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Profile
router.put("/profile", requireSignIn, updateProfileController);

module.exports = router;
