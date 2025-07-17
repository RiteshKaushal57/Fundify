import express from "express";
import multer from "multer";
import {
  registerEntrepreneur,
  getMyBusinessIdeas,
  updateBusinessIdea,
  deleteBusinessIdea,
} from "../controllers/entrepreneurController.js";

import {
  createBusinessIdea as createBusinessIdeaHandler,
  getBusinessIdeaById
} from "../controllers/BIController.js";

import {
  isAuthenticated,
  requireRole,
} from "../middleware/authenticateUser.js";
import entrepreneurModel from "../models/entrepreneurModel.js";

const entrepreneurRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Check if user is already an entrepreneur
const requireNotEntrepreneur = async (req, res, next) => {
  try {
    const entrepreneur = await entrepreneurModel.findOne({
      user: req.user._id,
    });
    if (entrepreneur) {
      return res.status(400).json({
        message: "You're already registered as an entrepreneur",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Register entrepreneur
entrepreneurRoute.post(
  "/register",
  isAuthenticated,
  requireNotEntrepreneur,
  upload.fields([
    { name: "aadhaarDocument", maxCount: 1 },
    { name: "panDocument", maxCount: 1 },
  ]),
  registerEntrepreneur
);

// Get entrepreneur profile
entrepreneurRoute.get(
  "/entAuth",
  isAuthenticated,
  requireRole("Entrepreneur"),
  async (req, res) => {
    try {
      const entrepreneur = await entrepreneurModel
        .findOne({ user: req.user._id })
        .populate("user");

      if (!entrepreneur) {
        return res.status(404).json({ error: "Entrepreneur profile not found." });
      }

      res.json(entrepreneur);
    } catch (err) {
      console.error("Error fetching profile:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ Business Idea Routes
entrepreneurRoute.post("/ideas", isAuthenticated, requireRole("Entrepreneur"), createBusinessIdeaHandler);
entrepreneurRoute.get("/ideas", isAuthenticated, requireRole("Entrepreneur"), getMyBusinessIdeas);
entrepreneurRoute.put("/ideas/:id", isAuthenticated, requireRole("Entrepreneur"), updateBusinessIdea);
entrepreneurRoute.delete("/ideas/:id", isAuthenticated, requireRole("Entrepreneur"), deleteBusinessIdea);

export default entrepreneurRoute;
