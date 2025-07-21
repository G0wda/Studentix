import User from "../models/User.js";

export default Register  = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message:'User already exists'});

        const otp = generateOTP();

        const optExpriy = new Date(Date.now() + 10*60*1000);

        user = new User({ name, email, password, otp, optExpriy});
        await user.save();

        await transporter.sendMail({
            from: 'iptcp.198@gmail.com',
            to:email,
            subject:"OTP Vertfication for your Studentix account",
            text: `Welcome to Studentix, Here is your OTP from E-mail verfication\n OTP: ${otp}`
        });

        res.status(201).json({message:"User register successfull. Please check your email for verfication OTP"})
    }
    catch(error) {
        res.status(500).json({message:"Error", error})
    }
};