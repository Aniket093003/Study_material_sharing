import mongoose from "mongoose";
import DB_NAME from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("db connected");
    
  } catch (err) {
    console.log("Database connection failed", err);
  }
};
export default connectDB;