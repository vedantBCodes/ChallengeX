import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import './signup.css';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          // alert("success"); ❌ Remove this
          toast.success("Signup Successfully");
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          // alert("error"); ❌ Remove this
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="close-button-container">
            <Link to="/" className="close-button">✕</Link>
          </div>

          <h3 style={{color:'blue'}}>Signup</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your fullname"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && <p className="error">This field is required</p>}
          </div>

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
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="error">This field is required</p>}
          </div>

          <div className="form-actions">
            <button type="submit">Signup</button>
          </div>

          <div className="login-link">
            <span>Have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
