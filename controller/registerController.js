import userSchema from "../models/userSchema.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userSchema.create({
    name,
    password,
    email,
  });
  // const token = await createJWT(user._id);
  user.password = undefined;
  res.status(200).send({
    Success: true,
    message: "User created Successfully",
    user,
    // token,
  });
};
