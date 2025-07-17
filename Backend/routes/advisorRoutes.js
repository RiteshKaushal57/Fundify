import express from 'express';
import {
  getAdvisorQueries,
  getAdvisorProfile,
  upsertAdvisorProfile,
  updateAdvisorAnswer,
  deleteAdvisorAnswer,
} from '../controllers/advisorController.js';

import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js";

const advisorRouter = express.Router();

// Advisor Profile
advisorRouter.get("/profile", isAuthenticated, requireRole("Advisor"), getAdvisorProfile);
advisorRouter.post("/profile", isAuthenticated, requireRole("Advisor"), upsertAdvisorProfile);

// Advisor Queries
advisorRouter.get("/queries", isAuthenticated, requireRole("Advisor"), getAdvisorQueries);
advisorRouter.patch("/queries/:id", isAuthenticated, requireRole("Advisor"), updateAdvisorAnswer);
advisorRouter.delete("/queries/:id", isAuthenticated, requireRole("Advisor"), deleteAdvisorAnswer);

export default advisorRouter;
