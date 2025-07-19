import express from "express";
import {
  allBusinessIdeas,
  getBusinessIdeaById,
  createBusinessIdea,
} from "../controllers/BIController.js";
import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js"

const businessIdeaRouter = express.Router();

// GET all business ideas
businessIdeaRouter.get("/", allBusinessIdeas);

// GET a specific business idea by ID
businessIdeaRouter.get("/:id", getBusinessIdeaById);

// POST a new business idea (only for authenticated entrepreneurs)
businessIdeaRouter.post(
  "/",
  isAuthenticated,
  requireRole("entrepreneur"),
  createBusinessIdea
);

export default businessIdeaRouter;
