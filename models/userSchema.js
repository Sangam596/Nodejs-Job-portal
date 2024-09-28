import mongoose from "mongoose";
import validator from "validator";
import { encryptPassword } from "../utils/utils.js";

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter proper mail address']
        Validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters']

    },
    location: {
        type: String,
        default: 'India'
    },
}, 
{ timestamp: true }
);

// middleware to encrypt password
userSchema.pre('save', async function (){
   this.password = await encryptPassword(this.password)
});

export default mongoose.model('User', userSchema);