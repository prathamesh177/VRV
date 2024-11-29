const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { fullName, email, password,role } = req.body;
  try {
    const user = new User({ fullName, email, password ,role});
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName ,role:user.role} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
const verifyToken = require("../middleware/auth");

// Get User
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const checkRole = require("../middleware/checkRole");

// Admin-only route
router.get("/admin", verifyToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

const sendEmail = require("../utils/sendEmail");

const otpStore = new Map(); // Temporary OTP storage

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Request OTP
router.post("/request-otp", async (req, res) => {
  

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate OTP and set expiration
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    otpStore.set(email, { otp, expiresAt });

    // Send OTP via email
    await sendEmail(email, "Your Login OTP", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process your request." });
  }
});

// Login with OTP
router.post("/login-with-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtpData = otpStore.get(email);

    if (!storedOtpData || storedOtpData.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (storedOtpData.expiresAt < Date.now()) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP expired" });
    }

    // Remove OTP from store after successful login
    otpStore.delete(email);

    // Generate JWT
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// Traditional Login (Email + Password) Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Login failed. Please try again." });
//   }
// });


// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(CLIENT_ID); // Replace with your actual Google Client ID

// Your login route for handling Google login
// router.post("/api/auth/google-login", async (req, res) => {
//   const { credential } = req.body; // The Google login token sent by the client

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: CLIENT_ID, // Specify the Client ID here
//     });
//     const payload = ticket.getPayload();
//     const userId = payload.sub;
//     const userEmail = payload.email;
    
//     // Check if the user exists, create a new user if not, etc.
//     // Generate your JWT token and send it back to the client
//     const token = jwt.sign({ userId, email: userEmail, role: "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     res.json({ token });
//   } catch (err) {
//     console.error("Google login error", err);
//     res.status(400).json({ error: "Google login failed" });
//   }
// });




module.exports = router;
