import mongoose from "mongoose";

//schema for register
const userSchema = new mongoose.Schema({
    name:'string',
    email: 'string',
    password: 'string',
    role: {
        type: 'string', //this makes the role key , string type
        enum: ['user', 'admin'],// this makes the role key must be either 'user' or 'admin' other values are invalid
        default: 'user'//this makes the role key user as default, this will automatically be user even if u dont mention it
        
    },
    status: {
        type: "string",
        enum: ["Active", "Deactive"],
        default: "Active"
    }
})

const User = mongoose.model('users', userSchema);

export default User;