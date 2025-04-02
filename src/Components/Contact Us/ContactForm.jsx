import { useState } from "react";
import './contactform.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          <strong>Name</strong>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name :"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>E-Mail</strong>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address :"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>TEXT</strong>
          <textarea
            name="message"
            placeholder="Enter Something"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" id="contactUsSubmitBtn">SUBMIT</button>
      </form>
    </div>
  );
};

export default ContactForm;
