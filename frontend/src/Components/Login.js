import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false); // State for error triggering animation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://vrv-3.onrender.com/api/auth/login", formData);

      // Store the token in localStorage
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode the token to get the user's role
      const payload = JSON.parse(atob(token.split(".")[1])); // Decoding JWT
      const userRole = payload.role;

      // Toast notification for successful login
      toast.success("Login successful!", {
        style: successStyle,
        onClose: () => {
          // Navigate based on the user's role
          if (userRole === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        },
      });
    } catch (err) {
      // Error toast notification
      toast.error(err.response?.data?.error || "An error occurred during login.", {
        style: errorStyle,
      });

      // Trigger the shake animation
      setIsError(true);

      // Reset the error state after animation duration
      setTimeout(() => {
        setIsError(false);
      }, 500); // Duration of the animation
    }
  };

  // Inline styles for toast notifications
  const successStyle = {
    backgroundColor: "#4CAF50", // Green background
    color: "#fff", // White text
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    textAlign: "center",
  };

  const errorStyle = {
    backgroundColor: "#f44336", // Red background
    color: "#fff", // White text
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={{ ...formStyle, animation: isError ? "shake 0.5s ease" : "none" }} // Apply animation conditionally
      >
        <h2 style={headingStyle}>Login</h2>
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
        <button type="submit" style={buttonStyle}>Login</button>
      </form>

      {/* Link to register page styled attractively */}
      <div style={registerLinkContainer}>
        <p style={registerTextStyle}>
          Don't have an account?{" "}
          <Link to="/register" style={registerLinkStyle}>
            Click here to register
          </Link>
        </p>
      </div>

      {/* Copyright Notice */}
      <div style={copyrightStyle}>
        <p>&copy; <b>2024 Website created by Prathamesh Walvekar</b></p>
      </div>

      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ fontFamily: "Arial, sans-serif" }} // General toast styling
      />
    </div>
  );
};

// Inline styles for the container and form
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  boxSizing: "border-box",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  transition: "transform 0.3s ease",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#333",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  backgroundColor: "#f5576c",
  color: "#fff",
  fontSize: "18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginBottom: "20px",
};

const registerLinkContainer = {
  marginTop: "15px",
  textAlign: "center",
};

const registerTextStyle = {
  color: "#333",
  fontSize: "14px",
};

const registerLinkStyle = {
  textDecoration: "none",
  color: "#ff6347", // Vibrant orange color
  fontWeight: "bold",
  fontSize: "16px",
  transition: "color 0.3s ease",
};

const copyrightStyle = {
  position: "absolute",
  bottom: "10px",
  width: "100%",
  textAlign: "center",
  color: "#777",
  fontSize: "12px",
  fontWeight: "300",
};

export default Login;
