// import controller
import {register,verifyOtp,password,login} from "../controller/authController.js";
import express from "express";

// create router
const router = express.Router();

// routes
router.post("/register", register);
router.post("/verify/:id", verifyOtp);
router.post("/password/:id", password);
router.post("/login", login);


export default router

