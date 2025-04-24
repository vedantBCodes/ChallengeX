// emailService.js
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

export const emailSendToUser = (fullname, email, msgForUser, taskName) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    message2: msgForUser,
    taskName: taskName,
  };

  // const toastId = toast.loading("📨 Sending your success..."); // Commented out the toast for loading

  emailjs
    .send(
      "service_gi3rhwt",         // Replace with your actual Service ID
      "template_srn9r8a",        // Replace with your actual Template ID
      templateParams,
      "mIvU9OKH8EMLPZ3kP"        // Replace with your actual User/Public Key
    )
    .then(() => {
      // toast.update(toastId, {
      //   render: "✅ Email sent successfully!",
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 3000,
      // });
    })
    .catch((error) => {
      console.error("Email send failed:", error);
      toast.update(toastId, {
        render: "❌ Failed to send email.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    });
};
