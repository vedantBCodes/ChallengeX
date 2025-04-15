import React from "react";
import { Link ,useLocation, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import './login.css'

function Login({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully");
          if (onClose) onClose();
          setTimeout(() => {
            localStorage.setItem("Name","vedant");
            localStorage.setItem("Users", JSON.stringify(res.data.user));            
            window.location.reload();
          }, 1000);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="login-modal">
      <div className="login-box">
    <div className="close-button-container">
      <Link to="/" onClick={onClose} className="close-button">✕</Link>
    </div>
  
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 style={{color:'blue'}}>Login</h3>
  
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="error">This field is required</span>}
      </div>
  
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="error">This field is required</span>}
      </div>
  
      <div className="form-actions">
        <button type="submit">Login</button>
      </div>
  
      <div className="signup-link">
        <span>Not registered? </span>
        <Link to="/signup">Signup</Link>
      </div>
    </form>
    </div>
  </div>
    );
}

export default Login;
