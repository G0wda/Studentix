import mongoose from "mongoose";

import User from "./models/User.js";
import StudentData from "./models/StudentData.js";

const MONGO_URI = "mongodb://localhost:27017/Studentix";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB COnnected")
        await User.createCollection();
        await StudentData.createCollection();
        console.log("User collection Created!!");
        console.log("StudentData collection Created!!");

    }
    catch (err) {
        console.log('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};


connectDB();

export default connectDB;