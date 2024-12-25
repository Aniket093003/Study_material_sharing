import { ApiError } from "../utils/ApiError.js";
import{ User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const generateAccessAndRefreshToken = async (user) => {
  try {
    console.log("Generating tokens for user:", user._id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log("Tokens generated successfully");
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// User Signup
const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate input fields
  if (!email || !password || !fullName) {
    return res.status(400).json({
      error: true,
      message: "All fields {email, password, fullName} are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "You already have an account. Please log in.",
      });
    }

    // Create a new user
    const user = await User.create({ fullName, email, password });

    // Exclude sensitive data from the response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json({
      message: "Congratulations! You have successfully signed up.",
      user: createdUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

// User Signin
const signinUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    // Validate password
    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid password");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    // Exclude sensitive data from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(error.statuscode || 500).json({
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

export { signupUser, signinUser };
