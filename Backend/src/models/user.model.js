import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recentlyViewed: [
      ,
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;
