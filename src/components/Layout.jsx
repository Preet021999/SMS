import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  // State for the sidebar's visibility (default to closed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen); // Update the state based on the sidebar toggle
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {/* Sidebar with dynamic open/close */}
      <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: isSidebarOpen ? "100px" : "300px", // Dynamically adjust content based on sidebar state
          transition: "margin-left 0.3s ease", // Smooth transition for opening/closing sidebar
          padding: "20px", // Optional padding for content
        }}
      >
        <div
          style={{
            border: "1px solid #fff", // Border around the div
            padding: "10px",
            borderRadius: "10px",
            background: "#80808036",
            display: "flex",
            alignItems: "center", // Align items vertically in the center
            marginBottom: "20px", // Add margin bottom for spacing
          }}
        >
          <h4 style={{ flex: 1, margin: 0 }}>SMS</h4> {/* This will push the button to the right */}
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              icon:"fas fa-sign-out",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
