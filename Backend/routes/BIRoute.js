import express from "express";
import {
  allBusinessIdeas,
  getBusinessIdeaById,
  createBusinessIdea,
} from "../controllers/BIController.js";
import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js"

const businessIdeaRouter = express.Router();

// GET all business ideas
businessIdeaRouter.get("/business-ideas", allBusinessIdeas);

// GET a specific business idea by ID
businessIdeaRouter.get("/business-ideas/:id", getBusinessIdeaById);

// POST a new business idea (only for authenticated entrepreneurs)
businessIdeaRouter.post(
  "/business-ideas",
  isAuthenticated,
  requireRole("entrepreneur"),
  createBusinessIdea
);

export default businessIdeaRouter;
