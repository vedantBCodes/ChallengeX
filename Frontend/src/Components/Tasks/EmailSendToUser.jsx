// emailService.js
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const emailSendToUser = (fullname, email, msgForUser) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    message2: msgForUser,   // MUST match {{message}} in template
  };

  emailjs
    .send(
      "service_tm5bnf7",
      "template_ek7wc0b",
      templateParams,
      "yo6arUy27NQyfNWHk"
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
    OTPmsgForUser: OTPmsgForUser,
  };

  return emailjs.send(
    "service_tm5bnf7",
    "template_ek7wc0b", // 🔴 OTP template ID
    templateParams,
    "yo6arUy27NQyfNWHk"
  );
};

export {emailSendToUser , sendOtpToUser }
