// queryRouter.js
import express from "express";
import {
  postQuery,
  getQueriesForBusiness,
} from '../controllers/advisorQueryController.js';
import { isAuthenticated } from "../middleware/authenticateUser.js";

const Queryrouter = express.Router();

Queryrouter.post("/:businessId", isAuthenticated, postQuery);
Queryrouter.get("/:businessId", isAuthenticated, getQueriesForBusiness);

export default Queryrouter;
