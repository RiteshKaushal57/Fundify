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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())



app.use("/", userRouter);
app.use('/entrepreneur', entrepreneurRoute)
app.use('/', businessIdeaRouter)
app.use('/investor', investRouter)
app.use('/location', locationRouter)
app.use('/advisor', advisorRouter)
app.use(investmentRouter)
app.use(Queryrouter)



app.use('/', uploadRouter)


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });
    res.redirect(process.env.GOOGLE_REDIRECT_URL);
    console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the Fundify");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

connectToMongoDB();
