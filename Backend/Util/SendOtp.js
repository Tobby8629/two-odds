// import nodemailer

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// setup transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.UserEmail, // "9bGZJ@example.com",
        pass: process.env.UserPass, // "zqzqzqzqzqzq",
    },
});

// send otp

const sendOtp = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.UserEmail,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        };
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully");
    } catch (error) {    
        console.log(error);
    } 
};

export default sendOtp