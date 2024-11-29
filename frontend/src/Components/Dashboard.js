import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("https://vrv-3.onrender.com/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      {user ? (
        <div style={userInfoStyle}>
          <h1 style={headerStyle}>Welcome, {user.fullName}!</h1>
          <p style={textStyle}>Email: {user.email}</p>
          <p style={textStyle}>Role: <span style={roleStyle(user.role)}>{user.role}</span></p>
          {user.role === "admin" && (
            <div>
              <p style={adminInfoStyle}>You have admin privileges.</p>
              <AdminDashboard />
            </div>
          )}
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>
      ) : (
        <p style={loadingTextStyle}>Loading...</p>
      )}
      <div style={copyrightStyle}>
        <p>&copy;<b>2024 Website created by Prathamesh Walvekar</b></p>
      </div>
    </div>
    
  );
};

// Inline styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f7f7f7",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  flexDirection: "column",
  textAlign: "center",
};

const userInfoStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "500px",
  animation: "fadeIn 1s ease",
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
  animation: "slideInFromTop 1s ease",
};

const textStyle = {
  fontSize: "16px",
  color: "#555",
  marginBottom: "10px",
  animation: "fadeIn 1s ease",
};

const roleStyle = (role) => ({
  fontWeight: "bold",
  color: role === "admin" ? "#FF5722" : "#4CAF50", // Different color for admin
  animation: "fadeIn 1s ease",
});

const adminInfoStyle = {
  fontSize: "16px",
  color: "#FF5722",
  fontWeight: "bold",
  marginBottom: "20px",
  animation: "fadeIn 1s ease",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
  animation: "fadeIn 1s ease",
};

const loadingTextStyle = {
  fontSize: "18px",
  color: "#777",
  animation: "fadeIn 1s ease",
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

// Adding CSS for animations
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes slideInFromTop {
    0% { transform: translateY(-20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`, styleSheet.cssRules.length);

export default Dashboard;
