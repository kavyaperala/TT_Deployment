import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = ({ backendStatus }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">P</div>
        <span className="navbar-title">PlaceCheck</span>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Check Eligibility
        </Link>
        <Link 
          to="/dashboard" 
          className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/ai-assistant" 
          className={`nav-link ${location.pathname === "/ai-assistant" ? "active" : ""}`}
        >
          AI Eligibility
        </Link>
        <Link 
          to="/resume-analyzer" 
          className={`nav-link ${location.pathname === "/resume-analyzer" ? "active" : ""}`}
        >
          Resume Analyzer
        </Link>
        <Link 
          to="/improvements" 
          className={`nav-link ${location.pathname === "/improvements" ? "active" : ""}`}
        >
          Improvements
        </Link>
        <Link 
          to="/insights" 
          className={`nav-link ${location.pathname === "/insights" ? "active" : ""}`}
        >
          Company Insights
        </Link>
      </div>

      <div
        className={`navbar-status ${
          backendStatus === "online" ? "" : "offline"
        }`}
      >
        <span className="status-dot"></span>
        {backendStatus === "checking"
          ? "Connecting..."
          : backendStatus === "online"
          ? "Server Online"
          : "Server Offline"}
      </div>
    </nav>
  );
};

export default Navbar;
