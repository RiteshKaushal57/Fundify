import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoute.js";
import entrepreneurRoute from "./routes/entreRoute.js";
import businessIdeaRouter from "./routes/BIRoute.js";
import investorRouter from "./routes/investorRoute.js";
import locationRouter from "./routes/locationRoute.js";
import advisorRouter from "./routes/advisorRoutes.js";
import investmentRouter from "./routes/investmentRoutes.js";
import uploadRouter from "./storage/uploadRoute.js";
import advisorQueryRouter from "./routes/advisorQueryRouter.js";
import queryRouter from "./routes/queryRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
const allowedOrigins = ['https://fundify-frontend-pi.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);
app.use("/entrepreneur", entrepreneurRoute);
app.use("/business-idea", businessIdeaRouter);
app.use("/investor", investorRouter);
app.use("/location", locationRouter);
app.use("/advisor", advisorRouter);
app.use("/investment", investmentRouter);
app.use("/queries", queryRouter);
app.use("/upload-documents", uploadRouter);
app.use("/advisor/queries", advisorQueryRouter);

const PORT = process.env.PORT || 4000;

app.use('/', (req, res) => {
  res.send("Welcome to Fundify Backend API");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

  export default app;