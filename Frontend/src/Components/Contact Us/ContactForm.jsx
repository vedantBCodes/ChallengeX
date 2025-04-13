import './contactform.css';
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";


const ContactForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
  
    // Show pending toast
    const toastId = toast.loading('📨 Sending your message...');
  
    emailjs.sendForm('EmailjsServiceID', 'template_ek7wc0b', form.current, 'yo6arUy27NQyfNWHk')
      .then((result) => {
          console.log(result.text);
          toast.update(toastId, {
            render: '✅ Email sent successfully!',
            type: 'success',
            isLoading: false,
            closeButton: false,
            autoClose: 3000,
          });
          form.current.reset();
          setTimeout(()=> {
            navigate(from, { replace: true });
          },3100)
      }, (error) => {
          console.log(error.text);
          toast.update(toastId, {
            render: '❌ Failed to send email. Please try again.',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
      });
  };
  

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>
          <strong>Name</strong>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your Name :"
            required
          />
        </label>

        <label>
          <strong>E-Mail</strong>
          <input
            type="email"
            name="user_email"
            placeholder="Enter Email Address :"
            required
          />
        </label>

        <label>
          <strong>TEXT</strong>
          <textarea
            name="message"
            placeholder="Enter Something"
            required
          />
        </label>

        <button type="submit" id="contactUsSubmitBtn">SUBMIT</button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ContactForm;
