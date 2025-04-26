import express from "express";
import { sendOtp, verifyOtp } from "../controller/otpController.js"; // Correct path to your controller

const router = express.Router();

// POST /otp/send-otp
router.post("/send-otp", sendOtp);

// POST /otp/verify-otp
router.post("/verify-otp", verifyOtp);

export default router;
