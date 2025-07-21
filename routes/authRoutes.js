import express from "express";


import {register,  verifyOTP, resendOTP, Login, logout,Dashboard, addStudent} from "../controllers/authController.js";

import authmiddleware from "../middleware/authmidleware.js";

const router = express.Router()


router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp',resendOTP);
router.post('/login', Login);
router.post('/logout', logout);
router.get('/dashboard',authmiddleware , Dashboard);
router.post('/addStudent',addStudent );


export default router;