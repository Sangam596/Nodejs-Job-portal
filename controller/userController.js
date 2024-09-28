import userSchema from "../models/userSchema.js";

export const userController = async ( req, res) =>{
    const { email } = req.body;
   res.status(200).send(`Your Email is ${email}`);
}

export const getUserController = async (req, res) =>{
    const users = await userSchema.find({});
    users.unshift({userCount:users.length});
    res.status(200).json(users);
}
export const deleteUserController = async (req, res, next) =>{
    const { userId } = req.params;
    if(!userId) return next('User Id param is required');
    const userExists = await userSchema.find({_id: userId});
    if(userExists.length==0) return next('User not found or already deleted');
    const deleted = await userSchema.deleteOne({_id: userId});
    deleted.message = `User deleted successfully`;
    res.status(200).json(deleted);
}