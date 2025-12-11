import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of use</Link>
          </div>
          <div className="footer-right">
          ©2025 Open Course Management System. All Rights Reserved.
          </div>
        </div>
      </footer>
  );
};

export default Footer;

        