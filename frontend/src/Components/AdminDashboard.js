import React from "react";

const AdminDashboard = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Dashboard</h1>
      <p>Only accessible by admins.</p>

      <div style={copyrightStyle}>
        <p>&copy;<b>2024 Website created by Prathamesh Walvekar</b></p>
      </div>
    </div>
    
  );
  const copyrightStyle = {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    color: "#777",
    fontSize: "12px",
    fontWeight: "300",
  };
};

export default AdminDashboard;
