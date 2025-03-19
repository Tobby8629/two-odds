
import {register,verifyOtp,password,login} from "../controller/authController.js";

import express from "express";


const router = express.Router();

router.post("/register", register);
router.post("/verify/:id", verifyOtp);
router.post("/password/:id", password);
router.post("/login", login);


export default router

