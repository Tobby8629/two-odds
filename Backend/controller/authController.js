// import authentiction
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendOtp from "../Util/SendOtp.js";

const generateotp = () => {
    return Math.floor(1000 + Math.random() * 9000);
}
   // signup logic
export const register = async (req, res) => {
    try {
        const {  email,  } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const otp = generateotp();
        const user = new User({ 
            email,
            otp,
            otpCreatedat: new Date().toISOString()
        });

        await user.save();
        await sendOtp(email, otp);

        res.status(201).json({ user, message: "User registered successfully" , otp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


// verify otp

export const verifyOtp = async (req, res) => {
    try {
       const {id} = req.params;
        const { otp } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        user.otp = null;
        user.otpCreatedat = null;
        user.verify = true;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully" });

    } catch {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

// add passweord

export const password = async (req, res) => {
    try {
        const {id} = req.params;
        const {password} = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not found" });

        }
        if (!user.verify) {
            return res.status(400).json({ message: "User not verified" });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ message: "Password added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// login logic

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!user.verify) {
            return res.status(400).json({ message: "User not verified" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

