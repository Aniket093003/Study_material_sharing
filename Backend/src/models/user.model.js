import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({
      _id: this._id,
      email: this.email,
  },
      process.env.ACCESS_TOKEN_SECERT,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }

  )

}

userSchema.methods.generateRefreshToken = function () {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({
      _id: this._id,
  },
      process.env.REFRESH_TOKEN_SECERT,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )


}

console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);


export const User = mongoose.model("User", userSchema);


