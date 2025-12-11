import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const [showCourses, setShowCourses] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const instructorToken = localStorage.getItem("instructorToken");

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  const handleHome = () => {
    window.location.href = "/home";
  };

  const handleAdmin = () => {
    window.location.href = "/admin";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("instructorToken");
    window.location.href = "/login";
  };

  const toggleCourses = () => {
    setShowCourses((prev) => !prev);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
    setShowCourses(false);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="logo">OCMS</h2>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for courses..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="dropdown">
         
          {showCourses && (
            <div className="dropdown-content">
              <button onClick={() => handleNavigation("/courses/web-development")}>
                Web Development
              </button>
              <button onClick={() => handleNavigation("/courses/frontend")}>
                Frontend
              </button>
              <button onClick={() => handleNavigation("/courses/backend")}>
                Backend
              </button>
              <button onClick={() => handleNavigation("/courses/design")}>
                Design
              </button>
            </div>
          )}
        </div>

        

        {!adminToken && !userToken && !instructorToken ? (
          <>
          
            <button className="nav-btn home" onClick={handleHome}>
              Home
            </button>
            <button className="nav-btn login-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="nav-btn signup-btn" onClick={handleSignup}>
              Signup
            </button>
          </>
        ) : (
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;