const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token || token.length < 10) {
      return res.status(401).json({ error: "Invalid or missing token" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const isAdmin = async (req, res, next) => {
  console.log("Middleware: isAdmin");
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User information is missing",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    console.log("User role:", user.role); // Log the role for debugging
    if (user.role !== "admin ") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (err) {
    console.error("Error checking admin: " + err.message);
    return res.status(500).json({
      success: false,
      message: "Admin verification failed",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
