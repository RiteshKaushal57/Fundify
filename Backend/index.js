import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./MongoDB/connection.js";

// Importing routes
import userRouter from "./routes/userRoute.js";
import entrepreneurRoute from "./routes/entreRoute.js";
import businessIdeaRouter from "./routes/BIRoute.js";
import locationRouter from "./routes/locationRoute.js";
import uploadRouter from "./storage/uploadRoute.js";
import advisorRouter from "./routes/advisorRoutes.js";
import Queryrouter from "./routes/queryRoutes.js";
import investmentRouter from "./routes/investmentRoutes.js";
import advisorQueryRouter from "./routes/advisorQueryRouter.js";
import investorRouter from "./routes/investorRoute.js";

const app = express();

const allowedOrigins = [
  "https://fundify-frontend-pi.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS Policy"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight


app.use(express.json());
app.use(cookieParser());

// 🟩 2) Route mounting
app.use("/user", userRouter);
app.use("/entrepreneur", entrepreneurRoute);
app.use("/business-idea", businessIdeaRouter);
app.use("/investor", investorRouter);
app.use("/location", locationRouter);
app.use("/advisor", advisorRouter);
app.use("/investment",investmentRouter);
app.use("/queries",Queryrouter);
app.use("/upload-documents", uploadRouter);
app.use("/advisor/queries", advisorQueryRouter)

app.get("/", (req, res) => {
  res.send("Welcome to the Fundify");
});

connectToMongoDB(); // fire and forget

// After all app.use(...) calls
app.use((req, res) => {
  res.status(404).json({ error: `Route "${req.originalUrl}" not found` });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running");
});


