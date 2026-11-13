import { motion } from "framer-motion";
import { FiGlobe, FiUsers } from "react-icons/fi";
import { Link } from 'react-router-dom';
import "./Footer.css";
import Logo from "../../assets/20260623_190852.png";
import Logo2 from "../../assets/20260623_191023.png"

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Portal",
      links: [
        { name: "Dashboard Overview", url: "/dashboard" },
        { name: "Course Management", url: "/courses" },
        { name: "Student Insights", url: "/insights" },
        { name: "Security Certs", url: "/security" }
      ]
    },
    {
      title: "AI Features",
      links: [
        { name: "Neural Search", url: "/search" },
        { name: "Auto-Grading Hub", url: "/grading" },
        { name: "LMS Integration", url: "/lms" },
        { name: "API Reference", url: "/api" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", url: "/help" },
        { name: "Documentation", url: "/docs" },
        { name: "Contact Sales", url: "/sales" },
        { name: "Privacy Policy", url: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="bx-footer-section">
      <div className="bx-footer-container">

        {/* TOP CONTENT GRID GRID MATRIX */}
        <div className="bx-footer-top-grid">

          {/* BRAND COLUMN / MATCHES NAVBAR IDENTITY STYLE */}
          <div className="bx-footer-brand-col">
            <Link to="/" className="bx-nav-brand-group">
              <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-flex d-none" />
              <img src={Logo} alt="Benedex" className="bx-nav-logo d-lg-none d-flex" />
            </Link>
            <p className="bx-footer-brand-desc">
              The intelligence layer for modern educational institutions. Professional, secure, and infinitely scalable.
            </p>

            {/* CIRCULAR UTILITY SOCIAL HOUSING */}
            <div className="bx-footer-social-row">
              <motion.a
                href="#network"
                className="bx-footer-social-circle"
                whileHover={{ y: -3, backgroundColor: "#e3edf7", color: "#194066" }}
                transition={{ duration: 0.2 }}
              >
                <FiGlobe size={18} />
              </motion.a>
              <motion.a
                href="#community"
                className="bx-footer-social-circle"
                whileHover={{ y: -3, backgroundColor: "#e3edf7", color: "#194066" }}
                transition={{ duration: 0.2 }}
              >
                <FiUsers size={18} />
              </motion.a>
            </div>
          </div>

          {/* DYNAMIC LIST COLUMNS LINK ARRAY */}
          <div className="bx-footer-links-wrapper">
            {footerLinks.map((group, groupIdx) => (
              <div key={groupIdx} className="bx-footer-link-col">
                <h4 className="bx-footer-col-heading">{group.title}</h4>
                <ul className="bx-footer-list">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href={link.url} className="bx-footer-link-item">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM COMPLIANCE BASELINE FOOTNOTE */}
        <div className="bx-footer-bottom-bar">
          <p>© {currentYear} Benedex Portal. All rights reserved. Precision academic engineering since 2021.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;