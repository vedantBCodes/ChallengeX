import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import './signup.css';
import { sendOtpToUser } from "../Components/Tasks/EmailSendToUser"; // adjust path
import { API_BASE_URL } from "../config/api";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [step, setStep] = useState(1); // Track whether the user is in OTP step
  const [email, setEmail] = useState(''); // Track the email for OTP

  // Handle initial form submission (to send OTP)
const onSubmit = async (data) => {
  const loadingToastId = toast.loading("Sending OTP...");
  const normalizedEmail = data.email?.trim().toLowerCase();
  const normalizedUpiId = data.upiid?.trim().toLowerCase();

  try {
    await axios.post(`${API_BASE_URL}/user/check-email`, {
      email: normalizedEmail,
    });

    // 1) Validate UPI with backend before sending OTP.
    const upiValidationResponse = await axios.post(`${API_BASE_URL}/upi/validate`, {
      upiid: normalizedUpiId,
    });

    if (!upiValidationResponse.data?.valid) {
      toast.error(upiValidationResponse.data?.message || "Invalid UPI ID", {
        id: loadingToastId,
      });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const OTPmsgForUser = `Your OTP : ${otp}`;

    // 1️⃣ Send OTP email (EmailJS – frontend)
    await sendOtpToUser(data.fullname, normalizedEmail, OTPmsgForUser);

    // 2) Store OTP in backend.
    await axios.post(`${API_BASE_URL}/otp/send-otp`, {
      email: normalizedEmail,
      otp,
    });

    toast.success("OTP sent to email", { id: loadingToastId });
    setEmail(normalizedEmail);
    setStep(2);
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to send OTP", { id: loadingToastId });
  }
};
  // Handle OTP verification submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otp = watch("otp");
  
    if (!otp || !email) {
      toast.error("OTP or email is missing.");
      return;
    }
  
    try {
      // Ensure you're sending the correct email and OTP
      const response = await axios.post(`${API_BASE_URL}/otp/verify-otp`, {
        email, // Ensure the correct email is being sent
        otp,   // Ensure the OTP value is captured correctly
      });
  
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        // After OTP verification, create the user
        createUser();
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error verifying OTP";
      toast.error(errorMessage);
    }
  };
  

  // Handle user creation after OTP verification
  const createUser = async () => {
    const data = watch(); // Get all form data

    const userInfo = {
      fullname: data.fullname,
      email: data.email?.trim().toLowerCase(),
      phoneno: data.phoneno,
      upiid: data.upiid?.trim().toLowerCase(),
      password: data.password,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/user/signup`, userInfo);

      if (response.data.success) {
        toast.success("Signup Successful!");
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        navigate(from, { replace: true });
      } else {
        toast.error("Signup Failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || "Failed to signup"));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-page">
        <section className="signup-intro">
          <p>START EARNING TODAY</p>
          <h1>Create your ChallengeX account.</h1>
          <span>
            Sign up to unlock tasks, track your progress, and start earning from the challenges you complete.
          </span>
        </section>

        <div className="signup-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="close-button-container">
              <Link to="/" className="close-button">✕</Link>
            </div>

            <h3 style={{ color: 'blue' }}>Signup</h3>

            {/* Fullname Field */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <p className="error">This field is required</p>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="error">This field is required</p>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter your Phone Number"
                {...register("phoneno", { required: true })}
              />
              {errors.phoneno && <p className="error">This field is required</p>}
            </div>

            {/* UPI ID Field */}
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="Enter your UPI ID"
                {...register("upiid", { required: true })}
              />
              {errors.upiid && <p className="error">This field is required</p>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="error">This field is required</p>}
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit">Send OTP</button>
            </div>
          </form>

          {/* OTP Verification Form (only shown after OTP is sent) */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...register("otp", { required: true })}
                />
                {errors.otp && <p className="error">OTP is required</p>}
              </div>

              <div className="form-actions">
                <button type="submit">Verify OTP</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
