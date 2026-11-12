
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      role,
      experience,
      skills,
      companyName,
      companyLocation,
      companyWebsite,
    } = req.body;

    // Validate common required fields
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and mobile are required",
      });
    }

    // Validate input types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof mobile !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Validate common fields
    if (!name.trim() || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email cannot be empty",
      });
    }

    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    // Validate role
    const userRole = role || "jobseeker";

    if (!["jobseeker", "employer"].includes(userRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prepare user data
    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      mobile: mobile.trim(),
      role: userRole,
    };

    // Job Seeker Fields
    if (userRole === "jobseeker") {
      if (!["Fresher", "Experienced"].includes(experience)) {
        return res.status(400).json({
          success: false,
          message: "Please select a valid experience level",
        });
      }

      if (
        skills !== undefined &&
        typeof skills !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid skills data",
        });
      }

      userData.experience = experience;
      userData.skills = skills
        ? skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];
    }

    // Employer Fields
    if (userRole === "employer") {
      if (
        typeof companyName !== "string" ||
        typeof companyLocation !== "string" ||
        !companyName.trim() ||
        !companyLocation.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Company name and location are required",
        });
      }

      if (
        companyWebsite &&
        typeof companyWebsite !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid company website",
        });
      }

      userData.companyName = companyName.trim();
      userData.companyLocation = companyLocation.trim();
      userData.companyWebsite = companyWebsite
        ? companyWebsite.trim()
        : "";
    }

    // Create user
    const user = await User.create(userData);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        experience: user.experience,
        skills: user.skills,
        companyName: user.companyName,
        companyLocation: user.companyLocation,
        companyWebsite: user.companyWebsite,
      },
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to register user",
    });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
});

module.exports = router;


