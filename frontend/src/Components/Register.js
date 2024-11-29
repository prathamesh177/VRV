import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      return;
    }

    try {
      const res = await axios.post("https://vrv-3.onrender.com/api/auth/register", formData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={containerStyle}>
      <div className="parallax" style={parallaxStyle}></div>
      <form
        onSubmit={handleSubmit}
        style={{
          ...formStyle,
          animation: isError ? "shake 0.5s ease" : "float 3s ease-in-out infinite",
        }}
      >
        <h2 style={headingStyle}>Create Account</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
      </form>
      <div style={loginLinkStyle}>
        <p>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Log In
          </Link>
        </p>
      </div>
      <div style={copyrightStyle}>
        <p>&copy; {new Date().getFullYear()} <b>Website created by Prathamesh Walvekar</b> </p>
      </div>
      <ToastContainer />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f4f9",
  fontFamily: "'Poppins', sans-serif",
  position: "relative",
  overflow: "hidden",
};

const parallaxStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  zIndex: -1,
};

const formStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
  width: "100%",
  maxWidth: "400px",
};

const headingStyle = {
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "14px",
  boxSizing: "border-box",
  transition: "0.3s",
  outline: "none",
  boxShadow: "0 0 0 0 transparent",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#f5576c",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.3s",
};

const loginLinkStyle = {
  textAlign: "center",
  marginTop: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#f5576c",
  fontWeight: "bold",
};

const copyrightStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "14px",
  color: "#333",
  textAlign: "center",
  marginTop: "20px",
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  input:focus {
    border-color: #f5576c;
    box-shadow: 0 0 8px #f5576c;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  button:hover {
    background-color: #f093fb;
    transform: scale(1.05);
  }
`, styleSheet.cssRules.length);

export default Register;
