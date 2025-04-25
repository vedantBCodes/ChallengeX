import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import './signup.css';

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
    // console.log("User Info to send:", data);
  
    // Display loading toast
    const loadingToastId = toast.loading("Sending OTP...");
  
    try {
      await axios.post("http://localhost:4001/otp/send-otp", {
        email: data.email,
      });
      // Success: Close the loading toast and show a success message
      toast.success("OTP sent to email", { id: loadingToastId });
      setEmail(data.email); // Save email for OTP verification
      setStep(2); // Move to OTP verification step
    } catch (error) {
      // Error: Close the loading toast and show an error message
      toast.error("Failed to send OTP", { id: loadingToastId });
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
      const response = await axios.post("http://localhost:4001/otp/verify-otp", {
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
      email: data.email,
      phoneno: data.phoneno,
      upiid: data.upiid,
      upiid:data.upiid,
      password: data.password,
    };

    try {
      const response = await axios.post("http://localhost:4001/user/signup", userInfo);

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

          {/* Phone Number Field */}
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
  );
}

export default Signup;
