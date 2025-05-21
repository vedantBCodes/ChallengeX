import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import './logout.css'

function Logout() {
  const [hover, setHover] = useState(false);

  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 1000);
    }
  };
  return (
    <div> 
      <Link id="logoutLink"
        style={{color: hover ? 'white' : 'rgba(233, 231, 231, 0.55)',transition:'1s',textDecoration:'none'}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
}

export default Logout;
