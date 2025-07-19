// queryRouter.js
import express from "express";
import {
  postQuery,
  getQueriesForBusiness,
} from '../controllers/advisorQueryController.js';
import { isAuthenticated } from "../middleware/authenticateUser.js";

const queryRouter = express.Router();

queryRouter.post("/:businessId", isAuthenticated, postQuery);
queryRouter.get("/:businessId", isAuthenticated, getQueriesForBusiness);

export default queryRouter;
