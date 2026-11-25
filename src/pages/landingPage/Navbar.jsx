import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import Logo from "../../assets/20260623_190852.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bx-nav-container">
      <div className="bx-nav-wrapper">

        {/* LOGO NODE */}
        <Link to="/" className="bx-nav-brand-group">
          <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-flex d-none" />
          <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-none d-flex" />
        </Link>

        {/* DESKTOP CENTER LINKS */}
        <div className="bx-nav-desktop-center">
          <Link to="/" className="bx-nav-link">Home</Link>
          <Link to="/about" className="bx-nav-link">About Us</Link>
          <Link to="/services" className="bx-nav-link">Services</Link>
          <Link to="/training" className="bx-nav-link">Training & Development</Link>
          <Link to="/solutions" className="bx-nav-link">Our Solutions</Link>
          <Link to="/contact" className="bx-nav-link">Contact Us</Link>
        </div>

        {/* DESKTOP ACTION CTA BUTTONS */}
        <div className="bx-nav-desktop-right">
          <Link to="/login" className="bx-nav-btn-solid">Sign In</Link>
        </div>

        {/* MOBILE TOGGLE TRIGGER */}
        <button className="bx-nav-toggle-btn" onClick={toggleMenu} aria-label="Toggle drawer menu">
          <FiMenu size={20} />
        </button>

        {/* MOBILE RIGHT SLIDING SIDEBAR BACKDROP */}
        {isOpen && <div className="bx-nav-sidebar-backdrop" onClick={toggleMenu} />}

        {/* MOBILE RIGHT SLIDING SIDEBAR DRAWER PANEL */}
        <div className={`bx-nav-sidebar-drawer ${isOpen ? "is-active" : ""}`}>
          <div className="bx-nav-drawer-header">
            <Link to="/" className="bx-nav-brand-group" onClick={toggleMenu}>
              <img src={Logo} alt="Benedex" className="bx-nav-logo d-flex" />
            </Link>
            <button className="bx-nav-close-btn" onClick={toggleMenu} aria-label="Close drawer menu">
              <FiX size={20} />
            </button>
          </div>

          <div className="bx-nav-drawer-body">
            <div className="bx-nav-drawer-links">
              <Link to="/" className="bx-nav-drawer-link" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="bx-nav-drawer-link" onClick={toggleMenu}>About Us</Link>
              <Link to="/services" className="bx-nav-drawer-link" onClick={toggleMenu}>Services</Link>
              <Link to="/training" className="bx-nav-drawer-link" onClick={toggleMenu}>Training & Development</Link>
              <Link to="/solutions" className="bx-nav-drawer-link" onClick={toggleMenu}>Our Solutions</Link>
              <Link to="/contact" className="bx-nav-drawer-link" onClick={toggleMenu}>Contact Us</Link>
              <Link to="/privacy" className="bx-nav-drawer-link" onClick={toggleMenu}>Privacy Policy</Link>
            </div>

            <div className="bx-nav-drawer-actions">
              <Link to="/login" className="bx-nav-drawer-btn-solid" onClick={toggleMenu}>Sign In</Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;