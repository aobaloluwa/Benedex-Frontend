import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiActivity } from "react-icons/fi";
import "./Footer.css";
import Logo from "../../assets/20260623_190852.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bx-footer-section">
      <div className="bx-footer-container">

        {/* TOP CONTENT GRID */}
        <div className="bx-footer-top-grid">

          {/* BRAND COLUMN */}
          <div className="bx-footer-brand-col">
            <Link to="/" className="bx-footer-brand-header">
              <img src={Logo} alt="Benedex Innovations" className="bx-footer-logo-img" />
            </Link>

            <p className="bx-footer-brand-desc">
              Architecting high-performance digital ecosystems in Education & Healthcare. Pushing the boundaries of human potential through AI and secure cloud infrastructure.
            </p>

            {/* PRODUCT QUICK BADGES */}
            <div className="bx-footer-product-pills">
              <Link to="/elearning" className="bx-ft-pill pill-blue">
                <FiBookOpen size={13} /> Benedex E-Learning
              </Link>
              <Link to="/vitaltron" className="bx-ft-pill pill-green">
                <FiActivity size={13} /> Vitaltron Health
              </Link>
            </div>
          </div>

          {/* 4-COLUMN LINK ARRAY */}
          <div className="bx-footer-links-wrapper">

            {/* COL 1: PARENT COMPANY */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Benedex Firm</h4>
              <ul className="bx-footer-list">
                <li><Link to="/" className="bx-footer-link-item">About Us</Link></li>
                <li><Link to="/elearning" className="bx-footer-link-item">E-Learning Portal</Link></li>
                <li><Link to="/vitaltron" className="bx-footer-link-item">Vitaltron Health</Link></li>
                <li><Link to="/security" className="bx-footer-link-item">Data Security</Link></li>
              </ul>
            </div>

            {/* COL 2: E-LEARNING */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">E-Learning</h4>
              <ul className="bx-footer-list">
                <li><Link to="/elearning" className="bx-footer-link-item">E-Learning Portal</Link></li>
                <li><Link to="/login" className="bx-footer-link-item">Student Sign In</Link></li>
                <li><Link to="/register" className="bx-footer-link-item">Register Account</Link></li>
              </ul>
            </div>

            {/* COL 3: VITALTRON HEALTH */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Vitaltron Health</h4>
              <ul className="bx-footer-list">
                <li><Link to="/vitaltron" className="bx-footer-link-item">Health App Overview</Link></li>
                <li><Link to="/vitaltron" className="bx-footer-link-item">Coming Soon Portal</Link></li>
              </ul>
            </div>

            {/* COL 4: LEGAL & SECURITY */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Security & Legal</h4>
              <ul className="bx-footer-list">
                <li><Link to="/privacy" className="bx-footer-link-item">Privacy Policy</Link></li>
                <li><Link to="/terms" className="bx-footer-link-item">Terms of Service</Link></li>
                <li><Link to="/security" className="bx-footer-link-item">NDPA & Security</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="bx-footer-bottom-bar">
          <p>© {currentYear} Benedex Innovations. All rights reserved.</p>
          <div className="bx-footer-subline">
            <span>Benedex E-Learning Platform &bull; Vitaltron Health Mobile</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;