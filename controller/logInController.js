import userSchema from "../models/userSchema.js";
import { comparePassword, createJWT } from "../utils/utils.js";

export const logInController = async (req, res, next) => {
  const { email, password } = req.body;
  const registeredUser = await userSchema.findOne({ email });
  if (!registeredUser) return next("User is not registered. Please register now");
  if (registeredUser.email !== email ||!(await comparePassword(password, registeredUser.password))) return next("Email or Password is incorrect");
  const token = await createJWT(registeredUser._id);
  registeredUser.password = undefined;
  
  res.status(200).send({
    Success: true,
    message: "User logged in Successfully",
    registeredUser,
    token,
  });
};
