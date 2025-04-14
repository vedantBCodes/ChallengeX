import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

export const emailSend = (fullname,email,message) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    message: message,
  };

  const toastId = toast.loading("📨 Sending your success...");

  emailjs
    .send(
      "EmailjsServiceID",
      "template_ek7wc0b",
      templateParams,
      "yo6arUy27NQyfNWHk"
    )
    .then(
      () => {
        toast.update(toastId, {
        //   render: "✅ Email sent successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      },
      () => {
        toast.update(toastId, {
          render: "❌ Failed to send email.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    );
};
