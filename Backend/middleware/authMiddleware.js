import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authUser = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      message: "Authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authUser;
