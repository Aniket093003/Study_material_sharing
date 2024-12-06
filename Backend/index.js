import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import materialRouter from "./routes/material.route.js";
connectDB();
import cors from "cors";
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST"],
}));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/material", materialRouter);

app.listen(process.env.PORT, () => {
  console.log("server in running");
});
