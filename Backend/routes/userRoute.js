import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  addRole,
  completeKYC,
} from '../controllers/userController.js';
import { isAuthenticated, verifyToken } from '../middleware/authenticateUser.js';
import userModel from '../models/userModel.js';
import { sanitizeUser } from '../utils/sanitizeUser.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/add-role', addRole);

// Simulated KYC route (protected)
userRouter.post('/kyc', isAuthenticated, completeKYC);
userRouter.get("/auth", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ user: null });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(200).json({ user: null });
    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(200).json({ user: null });
  }
});

userRouter.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
  console.error("Error in /user/me route:", err.message, err.stack);
  res.status(500).json({ message: "Something went wrong" });
}

});

export default userRouter;
