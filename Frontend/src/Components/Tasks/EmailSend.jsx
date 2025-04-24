// emailService.js
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import { generatePDFReport } from './pdfGenerator';

export const emailSend = (fullname, email, upiid, msgForUser,msgForAdmin,taskName) => {
  const templateParams = {
    user_name: fullname,
    user_email: email,
    user_upiid: upiid,
<<<<<<< HEAD
    message2:msgForUser,
=======
>>>>>>> a8b0efa49977b26a23fff21bf973ec6249dd6883
    message: msgForAdmin,
    taskName:taskName,
  };

  const toastId = toast.loading("📨 Sending your success...");

  emailjs
    .send(
      "EmailjsServiceID",          // Replace with your actual Service ID
      "template_ner4c8j",          // Replace with your actual Template ID
      templateParams,
      "yo6arUy27NQyfNWHk"          // Replace with your actual User/Public Key
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
