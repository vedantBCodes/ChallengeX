import dotenv from "dotenv";
dotenv.config();

// otpController.js
let otpStore = {};

export const sendOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  res.status(200).json({ success: true });
};


export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "OTP expired" });
  if (record.expiresAt < Date.now()) return res.status(400).json({ message: "OTP expired" });
  if (record.otp.toString() !== otp.toString())
    return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[email];
  res.json({ success: true, message: "OTP verified" });
};
