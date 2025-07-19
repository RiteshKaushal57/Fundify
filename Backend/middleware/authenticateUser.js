import dotenv from 'dotenv'
dotenv.config();
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded.roles is an array
    next(); 
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (...allowedRoles) => (req, res, next) => {
  // Normalize both user roles and allowedRoles to lower case for comparison
  const userRoles = req.user?.roles?.map(r => r.toLowerCase());
  const allowed = allowedRoles.map(r => r.toLowerCase());

  if (!userRoles || !Array.isArray(userRoles)) {
    return res.status(403).json({ error: "No roles assigned." });
  }
  const hasRole = allowed.some(role => userRoles.includes(role));
  if (!hasRole) {
    return res.status(403).json({ error: `Access denied. Only [${allowedRoles.join(', ')}] allowed.` });
  }
  next();
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
