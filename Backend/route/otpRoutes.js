import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const otpStore = {}; // { identifier: { otp, expiresAt } }

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASS,
  },
});

// OTP Generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Save OTP in memory
const saveOTP = (identifier, otp) => {
  otpStore[identifier] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };
  console.log("Saved OTP for", identifier, ":", otpStore[identifier]); // 🧪 Log it
};

// Validate OTP
const isValidOTP = (identifier, otp) => {
  const record = otpStore[identifier];
  if (!record) return false;
  const isValid = record.otp === otp && Date.now() < record.expiresAt;
  if (isValid) delete otpStore[identifier];
  return isValid;
};

// Send OTP via email
const sendEmail = async (to, content) => {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject: "Your OTP Verification Code",
    text: content,
  });
};

// Route to send email OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const emailOTP = generateOTP();
console.log("Generated OTP:", emailOTP); // 🧪 Add this
saveOTP(email, emailOTP);

    await sendEmail(email, `Your OTP is ${emailOTP}. It is valid for 5 minutes.`);
    res.status(200).json({ message: "Email OTP sent successfully" });
  } catch (error) {
    console.error("Email OTP Error:", error);
    res.status(500).json({ message: "Failed to send email OTP", error });
  }
});

// Route to verify OTP
// This is a simple example of the verify OTP route
// Verify OTP route
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  // console.log("Verifying OTP for:", email, "Entered:", otp, "Expected:", record?.otp);

  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
  }

  delete otpStore[email];
  res.json({ success: true, message: "OTP verified successfully" });
});


export default router;
