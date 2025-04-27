import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import "./layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    
    // Set initial sidebar state based on screen size
    setIsSidebarOpen(!isMobile);
    
    // Update on resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile !== isMobile) {
        setIsSidebarOpen(!mobile);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthenticated, navigate, isMobile]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      
      <div 
        className="main-content"
        style={{ 
          marginLeft: isMobile ? "70px" : (isSidebarOpen ? "70px" : "240px")
        }}
      >
        <header className="app-header">
          <div className="app-title">
            <h4>School Management System</h4>
          </div>
          <div className="user-controls">
            <div className="user-info">
              <span>Admin</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>
        
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;