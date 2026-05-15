// emailService.js
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { EMAILJS } from "../../config/emailjsConfig";

const emailSendToUser = (fullname, email, msgForUser) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    message2: msgForUser,   // MUST match {{message}} in template
  };

  emailjs
    .send(
      EMAILJS.user.serviceId,
      EMAILJS.user.templateId,
      templateParams,
      EMAILJS.user.publicKey
    )
    .then(() => {
      toast.success("✅ Email sent successfully!");
    })
    .catch((error) => {
      console.error("Email send failed:", error);
      toast.error("❌ Failed to send email.");
    });
};

const sendOtpToUser = (fullname, email, OTPmsgForUser) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    otp: OTPmsgForUser,
  };

  return emailjs.send(
    EMAILJS.otp.serviceId,
    EMAILJS.otp.templateId, // 🔴 OTP template ID
    templateParams,
    EMAILJS.otp.publicKey
  );
};

export {emailSendToUser , sendOtpToUser }
