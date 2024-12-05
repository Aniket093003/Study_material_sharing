import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const signupUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!email || !password || !fullName) {
      return res.status(411).json({
        Error: true,
        message: "All feilds {email, password, fullName} required",
      });
    }
    try {
      const existingUser = await User.findOne({
        email,
      });
      if (existingUser) {
        return res.json({
          message: "you already have an account please login",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 5);
  
      const user = await User.create({
          fullName,
          email,
          password: hashedPassword,
      });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(token);
  
      res.json({
        message: "Congratulation, You are signed up as user",
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: true, message: "Internal server error" });
    }
  };   

const signinUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json('User not found');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');
  
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ 
        token,
         user,
    });
    } catch (err) {
      res.status(500).send(err.message);
    }
};

export {signinUser, signupUser};