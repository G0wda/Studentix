import User from "../models/User.js";
import StudentData from "../models/StudentData.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'iptcp.198@gmail.com',
        pass: 'jqzlpgxamtgxpptw'
    }
});

// Fix: generateOTP should return a string value
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already exists' });

        const otp = generateOTP();
        const optExpriy = new Date(Date.now() + 10 * 60 * 1000);

        user = new User({ name, email, password, otp, optExpriy });
        await user.save();

        await transporter.sendMail({
            from: 'iptcp.198@gmail.com',
            to: email,
            subject: "OTP Verification for your Studentix account",
            text: `Welcome to Studentix, Here is your OTP for E-mail verification\n OTP: ${otp}`
        });

        res.status(201).json({ message: "User registered successfully. Please check your email for verification OTP" });
    }
    catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        if (user.otp !== otp || user.optExpriy < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.optExpriy = undefined;
        await user.save();

        res.json({ message: "Email verification successful, you can login now" });

    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        const otp = generateOTP();
        const optExpriy = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.optExpriy = optExpriy;
        await user.save();

        await transporter.sendMail({
            from: 'iptcp.198@gmail.com',
            to: email,
            subject: "OTP Verification for your Studentix account",
            text: `Here is your new OTP for E-mail verification\n OTP: ${otp}`
        });

        res.status(200).json({ message: "OTP resent successfully. Please check your email for verification OTP" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.password !== password) return res.status(400).json({ message: "Incorrect password" });

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Email not verified. Please verify OTP.' });
        }
        req.session.user = { id: user._id, email: user.email, name: user.name };
        res.json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ message: "Error in logging in", error });
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.json({ message: "Logged out successfully" });
    });
};

export const Dashboard = async (req, res) => {
    res.json({ message: `Welcome to Dashboard, ${req.session.user.name}` });
};


export const addStudent = async (req,res) => {
    try{
        const {name,usn, addmissionNumber,gender,semester,section, branch,mobile_number,adharnumber,dateOfAdmissionname,nationality,kcet,comed_k} = req.body;

        let student = await StudentData.findOne({usn});

        if(student) return res.status(401).json({message:"Student already exists"});

        student = new StudentData({name,usn, addmissionNumber,gender,semester,section, branch,mobile_number,adharnumber,dateOfAdmissionname,nationality,kcet,comed_k});
        await student.save();

        res.status(201).json({ message: "Student added successfully" });

    }
    catch(error) {
        res.status(500).json({message:"Error in adding student",error});
    }
};