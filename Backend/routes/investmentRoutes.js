import express from 'express';
import { isAuthenticated, requireRole } from "../middleware/authenticateUser.js";
import { investInBusiness } from "../controllers/investmentController.js";

const investmentRouter = express.Router();

// POST /api/invest
investmentRouter.post('/invest', isAuthenticated, requireRole("Investor"), investInBusiness);

export default investmentRouter;
