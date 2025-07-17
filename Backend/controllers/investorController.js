import userModel from '../models/userModel.js';
import investorModel from "../models/investorModel.js";
import bcrypt from 'bcryptjs';

// Helper to get user from JWT if available, otherwise by email
async function getUserFromRequest(req) {
  if (req.user && req.user._id) {
    return await userModel.findById(req.user._id);
  }
  if (req.body.email) {
    return await userModel.findOne({ email: req.body.email });
  }
  return null;
}

export const registerInvestor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      country,
      state,
      pincode,
      investmentFocus,
      investmentRange,
      riskAppetite,
      pastInvestments,
    } = req.body;

    // Try to get user from JWT or by email
    let user = await getUserFromRequest(req);

    // If user exists
    if (user) {
      // If already has Investor role, block
      if (user.roles && user.roles.includes("Investor")) {
        return res.status(400).json({ message: "Email already registered as Investor" });
      }
      // Add Investor role
      user.roles.push("Investor");

      // Optionally update other profile fields if provided
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.city = city || user.city;
      user.country = country || user.country;
      user.state = state || user.state;
      user.pincode = pincode || user.pincode;

      // If password is provided and user doesn't have one (e.g. social login), set it
      if (password && !user.password) {
        // Password complexity validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
          });
        }
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      // Create or update investor profile
      let investmentProfile = await investorModel.findOne({ user: user._id });
      if (!investmentProfile) {
        investmentProfile = new investorModel({
          user: user._id,
          investmentFocus,
          investmentRange,
          riskAppetite,
          pastInvestments,
        });
      } else {
        investmentProfile.investmentFocus = investmentFocus || investmentProfile.investmentFocus;
        investmentProfile.investmentRange = investmentRange || investmentProfile.investmentRange;
        investmentProfile.riskAppetite = riskAppetite || investmentProfile.riskAppetite;
        investmentProfile.pastInvestments = pastInvestments || investmentProfile.pastInvestments;
      }
      await investmentProfile.save();

      // Optionally, link investmentProfile in User
      user.investorProfile = investmentProfile._id;
      await user.save();

      return res.status(200).json({
        message: "Investor role added to existing user",
        userId: user._id,
        investmentProfileId: investmentProfile._id,
      });
    }

    // If user does not exist, create new user with Investor role
    if (!password) {
      return res.status(400).json({ message: "Password is required for new investor registration" });
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      roles: ["Investor"],
      city,
      country,
      state,
      pincode,
      isVerified: false,
      kycStatus: "Pending",
    });
    await newUser.save();

    const investmentProfile = new investorModel({
      user: newUser._id,
      investmentFocus,
      investmentRange,
      riskAppetite,
      pastInvestments,
    });
    await investmentProfile.save();

    newUser.investorProfile = investmentProfile._id;
    await newUser.save();

    res.status(201).json({
      message: "Investor registered successfully",
      userId: newUser._id,
      investmentProfileId: investmentProfile._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
