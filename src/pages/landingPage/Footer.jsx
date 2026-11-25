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
              <img src={Logo} alt="Benedex Innovations Ltd" className="bx-footer-logo-img" />
            </Link>

            <p className="bx-footer-brand-desc">
              <strong>Benedex Innovations Ltd</strong> — Technology, Digital Solutions & Professional Development. Advancing digital transformation through practical technology solutions, continuous learning, and innovation.
            </p>

            {/* PRODUCT QUICK BADGES */}
            <div className="bx-footer-product-pills">
              <Link to="/login" className="bx-ft-pill pill-blue">
                <FiBookOpen size={13} /> Benedex E-Learning
              </Link>
              <Link to="/solutions#vitaltron" className="bx-ft-pill pill-green">
                <FiActivity size={13} /> Vitaltron Health (In Development)
              </Link>
            </div>
          </div>

          {/* 4-COLUMN LINK ARRAY */}
          <div className="bx-footer-links-wrapper">

            {/* COL 1: COMPANY */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Company</h4>
              <ul className="bx-footer-list">
                <li><Link to="/about" className="bx-footer-link-item">About Us</Link></li>
                <li><Link to="/services" className="bx-footer-link-item">Our Services</Link></li>
                <li><Link to="/about#vision" className="bx-footer-link-item">Our Vision</Link></li>
                <li><Link to="/contact" className="bx-footer-link-item">Contact Us</Link></li>
              </ul>
            </div>

            {/* COL 2: PLATFORMS */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Platforms</h4>
              <ul className="bx-footer-list">
                <li><Link to="/login" className="bx-footer-link-item">Benedex E-Learning</Link></li>
                <li><Link to="/solutions#vitaltron" className="bx-footer-link-item">Vitaltron Health</Link></li>
                <li><Link to="/solutions" className="bx-footer-link-item">Our Solutions</Link></li>
              </ul>
            </div>

            {/* COL 3: RESOURCES */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Resources</h4>
              <ul className="bx-footer-list">
                <li><Link to="/training" className="bx-footer-link-item">Training & Development</Link></li>
                <li><a href="https://thecpdregister.com/providers/cpd-group--providers--791495" target="_blank" rel="noopener noreferrer" className="bx-footer-link-item">CPD Provider Listing</a></li>
              </ul>
            </div>

            {/* COL 4: LEGAL & SECURITY */}
            <div className="bx-footer-link-col">
              <h4 className="bx-footer-col-heading">Legal</h4>
              <ul className="bx-footer-list">
                <li><Link to="/privacy" className="bx-footer-link-item">Privacy Policy</Link></li>
                <li><Link to="/terms" className="bx-footer-link-item">Terms of Service</Link></li>
                <li><Link to="/security" className="bx-footer-link-item">Data Protection</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="bx-footer-bottom-bar">
          <p>© {currentYear} Benedex Innovations Ltd. All rights reserved.</p>
          <div className="bx-footer-subline">
            <span>Benedex E-Learning Platform &bull; Vitaltron Health (In Development)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;