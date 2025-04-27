import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import image from "../../assets/react.svg";

const Sidebar = ({ isOpen, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(isOpen);
  const location = useLocation();

  // Update local state when props change
  useEffect(() => {
    setIsCollapsed(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState);
  };

  const handleLinkClick = () => {
    // Check if we're on mobile by window width
    if (window.innerWidth <= 768) {
      // Close sidebar on mobile when link is clicked
      setIsCollapsed(true);
      onToggle(true);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="wrapper">
      <nav id="sidebar" className={isCollapsed ? "active" : ""}>
        <button
          type="button"
          id="sidebarCollapse"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        >
          <i className={isCollapsed ? "fas fa-bars" : "fas fa-times"}></i>
        </button>
        
        <div className="sidebar-header">
          <img
            src={image}
            className="rounded-circle usr-image"
            height={isCollapsed ? "40" : "60"}
            width={isCollapsed ? "40" : "60"}
            alt="User"
          />
          <h3 className={isCollapsed ? "hidden" : ""}>Admin</h3>
        </div>

        <ul className="list-unstyled components">
          <li className={`list-item ${isActiveRoute("/dashboard") ? "active" : ""}`}>
            <Link to="/dashboard" onClick={handleLinkClick}>
              <i className="fas fa-tachometer-alt icon-color"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={`list-item ${isActiveRoute("/student-management") ? "active" : ""}`}>
            <Link to="/student-management" onClick={handleLinkClick}>
              <i className="fas fa-user-graduate icon-color"></i>
              <span>Students</span>
            </Link>
          </li>
          <li className={`list-item ${isActiveRoute("/attendance-management") ? "active" : ""}`}>
            <Link to="/attendance-management" onClick={handleLinkClick}>
              <i className="fas fa-calendar-check icon-color"></i>
              <span>Attendance</span>
            </Link>
          </li>
          <li className={`list-item ${isActiveRoute("/result-generation") ? "active" : ""}`}>
            <Link to="/result-generation" onClick={handleLinkClick}>
              <i className="fas fa-chart-line icon-color"></i>
              <span>Results</span>
            </Link>
          </li>
          <li className={`list-item ${isActiveRoute("/circular-management") ? "active" : ""}`}>
            <Link to="/circular-management" onClick={handleLinkClick}>
              <i className="fas fa-bullhorn icon-color"></i>
              <span>Circulars</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;