import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let otpStore = {}; // Store OTPs in memory temporarily

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Save OTP to in-memory store (email -> otp)
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes validity
    };

    console.log(`OTP ${otp} sent to ${email}`);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ success: false, message: "OTP not found or expired" });
  }

  if (record.expiresAt < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp.toString() !== otp.toString()) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // OTP is valid
  delete otpStore[email]; // Remove after successful verification
  res.status(200).json({ success: true, message: "OTP verified successfully" });
};
