import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const createJWT = async (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const verifyJWT = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
