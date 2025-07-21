import mongoose from "mongoose";

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    otp: {type: String},
    optExpriy: {typr:Date},
    isVerified: {type:Boolean, default:false},
});


const User = mongoose.model('User', UserSchema)

export default User;