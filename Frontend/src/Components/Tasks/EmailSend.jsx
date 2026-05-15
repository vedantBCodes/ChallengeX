// emailService.js
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { generatePDFReport } from './pdfGenerator';
import { EMAILJS } from "../../config/emailjsConfig";

export const emailSend = (fullname, email ,msgForAdmin,msgForUser,taskName,upiid) => { //This is the function that sends email to admin
  const templateParams = {
    user_name: fullname,
    user_email: email,
    message: msgForAdmin,
    message2: msgForUser,
    taskName:taskName,
    user_upiid: upiid,
  };

  const toastId = toast.loading("📨 Sending your success...");

  emailjs
    .send(
      EMAILJS.admin.serviceId,          // Service ID
      EMAILJS.admin.templateId,          // Template ID
      templateParams,
      EMAILJS.admin.publicKey          // User/Public Key
    )
    .then(() => {
      toast.update(toastId, {
        render: "✅ Email sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // ✅ Trigger PDF download
      generatePDFReport(templateParams);

    }, () => {
      toast.update(toastId, {
        render: "❌ Failed to send email.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    });
};
