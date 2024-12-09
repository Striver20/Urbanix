const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};

const registerController = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  try {
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
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

const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log(req.body);
    // Fetch the user from the database
    const user = await User.findById(req.user._id);
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
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (err) {
    console.log("Error updating profile in backend: ", err.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
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
};
