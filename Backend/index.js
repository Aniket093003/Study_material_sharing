import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import userRouter from "./src/routes/user.routes.js";
import materialRouter from "./src/routes/material.route.js";
connectDB();
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/material", materialRouter);

app.listen(process.env.PORT, () => {
  console.log("server in running");
});
