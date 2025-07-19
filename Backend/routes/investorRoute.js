import express from "express";
import { registerInvestor } from "../controllers/investorController.js";
import { isAuthenticated } from "../middleware/authenticateUser.js";
import investorModel from "../models/investorModel.js";
import {
  getInvestorInvestments,
  getInvestorStats,
} from "../controllers/Dashboard/InvestorController.js";

const investorRouter = express.Router();

// Register a new investor
investorRouter.post("/register", registerInvestor);

// 🚨 NEW: Get current investor profile for autofill
// In investorRoute.js
investorRouter.get("/profile", isAuthenticated, async (req, res) => {
  try {
    // Populate the user reference to get personal details
    const investor = await investorModel
      .findOne({ user: req.user._id })
      .populate("user");
    if (!investor) {
      return res.status(404).json({ error: "Investor profile not found." });
    }
    // Merge user fields and investor fields
    const user = investor.user;
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      state: user.state,
      city: user.city,
      district: user.district,
      pincode: user.pincode,
      // Any other user fields you want
      ...investor.toObject(), // includes investmentFocus, riskAppetite, etc.
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});
// ✅ Get all investments of the logged-in user
investorRouter.get("/investments", isAuthenticated, getInvestorInvestments);

// ✅ Get investor dashboard stats: total amount, top sectors, etc.
investorRouter.get("/stats", isAuthenticated, getInvestorStats);

export default investorRouter;
