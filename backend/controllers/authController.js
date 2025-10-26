const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};

const registerController = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    // Trim all input fields to remove leading/trailing whitespace
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedAddress = address?.trim();
    const trimmedRole = role?.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !password ||
      !trimmedPhone ||
      !trimmedAddress ||
      !trimmedRole
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (user) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      phone: trimmedPhone,
      address: trimmedAddress,
      role: trimmedRole,
    });

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Error creating user: ", err.message);
    return res.status(500).send({
      success: false,
      message: "Error creating user",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = JWT.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (err) {
    console.error("Error logging in user", err.message);
    return res.status(500).send({
      success: false,
      message: "Error logging in user",
    });
  }
};
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;
const sendOTPController = (req, res) => {
  const { emailAddress } = req.body;

  const OTP = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[emailAddress] = OTP;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER_EMAIL,
      pass: USER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: USER_EMAIL,
    to: emailAddress,
    subject: "OTP Verification",
    text: `Your OTP is ${OTP}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).send({
        success: false,
        message: "Error sending OTP",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "OTP sent successfully",
      });
    }
  });
};

const verifyOTPController = async (req, res) => {
  const { emailAddress, otp } = req.body;
  try {
    if (otpStore[emailAddress] === otp) {
      delete otpStore[emailAddress];
      return res.status(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "OTP verification failed",
      });
    }
  } catch (err) {
    console.error("Error verifying OTP", err.message);
    return res.status(500).send({
      success: false,
      message: "Error verifying OTP",
    });
  }
};

const testController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Protected route accessed",
  });
};

// Cleanup controller to fix existing users with trailing spaces in roles
const cleanupRolesController = async (req, res) => {
  try {
    // Find all users with roles that have trailing/leading spaces
    const users = await User.find({});
    let updatedCount = 0;

    for (const user of users) {
      const trimmedRole = user.role?.trim();
      if (user.role !== trimmedRole) {
        await User.findByIdAndUpdate(user._id, { role: trimmedRole });
        updatedCount++;
        console.log(
          `Updated user ${user.email}: "${user.role}" -> "${trimmedRole}"`
        );
      }
    }

    res.status(200).send({
      success: true,
      message: `Cleanup completed. Updated ${updatedCount} users.`,
      updatedCount,
    });
  } catch (err) {
    console.error("Error cleaning up roles: ", err.message);
    res.status(500).send({
      success: false,
      message: "Error cleaning up roles",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    console.log("🔄 Profile update request received");
    console.log("📧 User:", req.user?.id || "No user ID");
    const { name, email, password, phone, address } = req.body;
    console.log("📝 Request body:", req.body);
    // Fetch the user from the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate and hash password if provided
    let hashedPassword;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Password must be at least 6 characters long",
        });
      }
      hashedPassword = await hashPassword(password); // Use the correct function
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    console.log("✅ Profile updated successfully for user:", req.user.id);
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (err) {
    console.error("❌ Error updating profile:", err.message);
    console.error("❌ Full error:", err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

// Get all users (Admin only)
const getAllUsersController = async (req, res) => {
  try {
    console.log("🔍 Fetching all users for admin");

    const users = await User.find({})
      .select("-password") // Exclude password field
      .sort({ created_at: -1 }); // Sort by newest first

    console.log(`✅ Found ${users.length} users`);

    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  sendOTPController,
  verifyOTPController,
  testController,
  updateProfileController,
  cleanupRolesController,
  getAllUsersController,
};
