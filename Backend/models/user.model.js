import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function(){
  return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){}

const User = mongoose.model("User", userSchema);

export default User;
