import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import Logo from "../../assets/20260623_190852.png";
import Logo2 from "../../assets/20260623_191023.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bx-nav-container">
      <div className="bx-nav-wrapper">

        {/* LOGO NODE WITH RECTANGLE ICON HOLDER */}
        <Link to="/" className="bx-nav-brand-group">
          <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-flex d-none" />
          <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-none d-flex" />
          {/* <span className="bx-nav-brand-text student-sidebar-brand-copy">Benedex</span> */}
        </Link>

        {/* DESKTOP CENTER LINKS */}
        <div className="bx-nav-desktop-center">
          <Link to="/courses" className="bx-nav-link">Courses</Link>
          <Link to="/analytics" className="bx-nav-link">Analytics</Link>
          <Link to="/ai-subsystems" className="bx-nav-link">AI Subsystems</Link>
          <Link to="/support" className="bx-nav-link">Support Workspace</Link>
        </div>

        {/* DESKTOP ACTION CTA BUTTONS */}
        <div className="bx-nav-desktop-right">
          <Link to="/how-it-works" className="bx-nav-btn-outline">How It Works</Link>
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
            <Link to="/" className="bx-nav-brand-group">
              <img src={Logo} alt="Benedex" className="bx-nav-logo d-flex" />
              {/* <span className="bx-nav-brand-text student-sidebar-brand-copy">Benedex</span> */}
            </Link>
            <button className="bx-nav-close-btn" onClick={toggleMenu} aria-label="Close drawer menu">
              <FiX size={20} />
            </button>
          </div>

          <div className="bx-nav-drawer-body">
            <div className="bx-nav-drawer-links">
              <Link to="/courses" className="bx-nav-drawer-link" onClick={toggleMenu}>Courses</Link>
              <Link to="/analytics" className="bx-nav-drawer-link" onClick={toggleMenu}>Analytics</Link>
              <Link to="/ai-subsystems" className="bx-nav-drawer-link" onClick={toggleMenu}>AI Subsystems</Link>
              <Link to="/support" className="bx-nav-drawer-link" onClick={toggleMenu}>Support Workspace</Link>
            </div>

            <div className="bx-nav-drawer-actions">
              <Link to="/how-it-works" className="bx-nav-drawer-btn-outline" onClick={toggleMenu}>How It Works</Link>
              <Link to="/login" className="bx-nav-drawer-btn-solid" onClick={toggleMenu}>Sign In</Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;