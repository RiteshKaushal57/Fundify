import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { simulateKYC } from "../utils/kycSimulate.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

// 1. Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.roles.includes(role)) {
        return res.status(400).json({ message: `Email already registered as ${role}` });
      }
      existingUser.roles.push(role);
      await existingUser.save();
      return res.status(200).json({
        message: `Role ${role} added to existing account`,
        user: sanitizeUser(existingUser),
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword, roles: [role] });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Logout User
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4. Add Role
export const addRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.roles.includes(role)) {
      return res.status(400).json({ message: `User already has ${role} role` });
    }
    user.roles.push(role);
    await user.save();
    res.status(200).json({
      message: `Role ${role} added successfully`,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5. Complete KYC
export const completeKYC = async (req, res) => {
  try {
    const { panNumber, aadhaarNumber, aadhaarDocument, panDocument } = req.body;
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const kycApproved = simulateKYC(panNumber, aadhaarNumber);
    user.panNumber = panNumber;
    user.aadhaarNumber = aadhaarNumber;
    user.aadhaarDocument = aadhaarDocument;
    user.panDocument = panDocument;
    user.kycStatus = kycApproved;
    user.isVerified = !!kycApproved;
    await user.save();
    res.status(200).json({
      message: kycApproved ? "KYC Approved and user is verified." : "KYC Rejected. Please check your details.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
