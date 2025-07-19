import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./routes/userRoute.js";
import entrepreneurRoute from "./routes/entreRoute.js";
import businessIdeaRouter from "./routes/BIRoute.js";
import investorRouter from "./routes/investorRoute.js";
import locationRouter from "./routes/locationRoute.js";
import advisorRouter from "./routes/advisorRoutes.js";
import investmentRouter from "./routes/investmentRoutes.js";
import Queryrouter from "./routes/QueryRoutes.js";
import uploadRouter from "./storage/uploadRoute.js";
import advisorQueryRouter from "./routes/advisorQueryRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ========== Debug Logging Before Each Route ==========
console.log("Mounting /user");
app.use("/user", userRouter);

console.log("Mounting /entrepreneur");
app.use("/entrepreneur", entrepreneurRoute);

console.log("Mounting /business-idea");
app.use("/business-idea", businessIdeaRouter);

console.log("Mounting /investor");
app.use("/investor", investorRouter);

console.log("Mounting /location");
app.use("/location", locationRouter);

console.log("Mounting /advisor");
app.use("/advisor", advisorRouter);

console.log("Mounting /investment");
app.use("/investment", investmentRouter);

console.log("Mounting /queries");
app.use("/queries", Queryrouter);

console.log("Mounting /upload-documents");
app.use("/upload-documents", uploadRouter);

console.log("Mounting /advisor/queries");
app.use("/advisor/queries", advisorQueryRouter);
// =====================================================

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
