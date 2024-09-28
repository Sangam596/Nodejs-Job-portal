import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import { validate } from "deep-email-validator";

export const registerAuth = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return next("Please enter a name");
  // Validate the email
  const validationResult = await validate(email);
  if (!email && !validationResult.valid) return next("Please enter an email");
  if (!password) return next("Please enter a password");
  if (password?.length < 6) return next("Password length should be at least 6 characters");

  const existingUser = await userSchema.findOne({email});
  if (existingUser) return next("User already registered please login");
  next();
};

export const loginAuth = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next("Please enter your email & password");
  next();
};

export const userAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) return next("Authorization Failed");
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return next("Authorization Failed");
  }
};
