import './contactform.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";


const ContactForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const submitContactMessage = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const toastId = toast.loading('Saving your message...');

    try {
      await axios.post(`${API_BASE_URL}/contact`, payload);
      toast.update(toastId, {
        render: 'Message submitted successfully!',
        type: 'success',
        isLoading: false,
        closeButton: false,
        autoClose: 3000,
      });
      e.currentTarget.reset();
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 3100);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.update(toastId, {
        render: error.response?.data?.message || 'Failed to submit message. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={submitContactMessage} className="contact-form">
        <label>
          <strong>Name</strong>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name :"
            required
          />
        </label>

        <label>
          <strong>E-Mail</strong>
          <input
            type="email"
            name="email"
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
