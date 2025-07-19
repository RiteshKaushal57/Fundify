// advisorQueryRouter.js
import express from "express";
import {
  getUnansweredQueries,
  postAnswer,
} from '../controllers/advisorQueryController.js';
import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js";

const advisorQueryRouter = express.Router();

advisorQueryRouter.get("/", isAuthenticated, requireRole("Advisor"), getUnansweredQueries);
advisorQueryRouter.post("/:id/answer", isAuthenticated, requireRole("Advisor"), postAnswer);

export default advisorQueryRouter;
