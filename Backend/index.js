import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "./config/passport.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./MongoDB/connection.js";

// Importing routes
import userRouter from "./routes/userRoute.js";
import entrepreneurRoute from "./routes/entreRoute.js";
import businessIdeaRouter from "./routes/BIRoute.js";
import investRouter from "./routes/investorRoute.js";
import locationRouter from "./routes/locationRoute.js";
import uploadRouter from "./storage/uploadRoute.js";
import advisorRouter from "./routes/advisorRoutes.js";
import Queryrouter from "./routes/queryRoutes.js";
import investmentRouter from "./routes/investmentRoutes.js";

const app = express();

// 🟩 1) CORS — allow Vercel frontend (and optionally localhost dev)
const allowedOrigins = [
  "https://fundify-frontend-two.vercel.app", // your deployed frontend
  //"http://localhost:5173",                // for local dev — uncomment if needed
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// Make sure CORS works for preflight too
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// 🟩 2) Route mounting
app.use("/", userRouter);
app.use("/entrepreneur", entrepreneurRoute);
app.use("/", businessIdeaRouter);
app.use("/investor", investRouter);
app.use("/location", locationRouter);
app.use("/advisor", advisorRouter);
app.use(investmentRouter);
app.use(Queryrouter);
app.use("/", uploadRouter);

// 🟩 3) Google OAuth Callback — set secure cookie for Vercel!
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // Required for SameSite: "none"!
      sameSite: "none",       // Only works if frontend is also HTTPS!
      maxAge: 3600000,
    });
    res.redirect(process.env.GOOGLE_REDIRECT_URL);
    console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the Fundify");
});

await connectToMongoDB()
export default app;