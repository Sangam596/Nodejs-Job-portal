import userSchema from "../models/userSchema.js";
import { validate } from "deep-email-validator";
import { createJWT } from "../utils/utils.js";


export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name) return next("Please enter a name");
    // Validate the email
   const validationResult = await validate(email);
    if (!email && !validationResult.valid) return next("Please enter an email");
    if (!password) return next("Please enter a password");
    if (password?.length < 6) return next("Password length should be at least 6 characters");

    const existingUser = await userSchema.findOne({
      email
    });

    if (existingUser) return next("User already registered please login");
    const user = await userSchema.create({
      name,
      password,
      email,
    });
    const token = await createJWT(user._id);
    console.log("token",token);
    res.status(200).send({
      Success: true,
      message: "User created Successfully",
      user,
      token
    });
};
