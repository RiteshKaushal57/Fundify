import express from "express";
import {
  postQuery,
  getQueriesForBusiness,
  getUnansweredQueries,
  postAnswer,
} from '../controllers/advisorQueryController.js'
import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js";

const Queryrouter = express.Router();

// ✅ ENTREPRENEUR / INVESTOR PATHS
Queryrouter.post("/queries/:businessId", isAuthenticated, postQuery);
Queryrouter.get("/queries/:businessId", isAuthenticated, getQueriesForBusiness);

// ✅ ADVISOR-ONLY PATHS
Queryrouter.get("/advisor/queries", isAuthenticated, requireRole("Advisor"), getUnansweredQueries);
Queryrouter.post("/advisor/queries/:id/answer", isAuthenticated, requireRole("Advisor"), postAnswer);

export default Queryrouter;
