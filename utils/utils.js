import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const createJWT = async (id) => {
    console.log(`coming createJET`, id);
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
export const decryptPassword = async (password) => {};
