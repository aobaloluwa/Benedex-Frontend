import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShieldOff,
  FiLock,
  FiArrowLeft,
  FiGrid,
  FiAlertOctagon,
} from "react-icons/fi";
import "./Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="bx-unauth-wrapper">
      <div className="bx-unauth-container">
        {/* BADGE CHIP */}
        <motion.div
          className="bx-unauth-badge-chip"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertOctagon size={14} />
          <span>403 FORBIDDEN • ACCESS RESTRICTED</span>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          className="bx-unauth-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Access Denied <br />
          <span className="text-red">Unauthorized Area</span>
        </motion.h1>

        {/* DESCRIPTIVE SUBTITLE */}
        <motion.p
          className="bx-unauth-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          You are not authorized to view this page. This section requires elevated Super Admin permissions.
          If you believe this is an error, please contact your platform super administrator.
        </motion.p>

        {/* ILLUSTRATION CONTAINER */}
        <motion.div
          className="bx-unauth-illustration-box"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="bx-unauth-illustration-card">
            <div className="bx-unauth-radial-glow" />

            {/* CUSTOM SVG SECURITY LOCK ILLUSTRATION */}
            <svg
              className="bx-unauth-svg-graphic"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="54" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="4 4" />
              <path
                d="M60 22C42.3269 22 28 36.3269 28 54V64H92V54C92 36.3269 77.6731 22 60 22Z"
                fill="#FEE2E2"
                opacity="0.5"
              />
              {/* SHIELD BASE */}
              <path
                d="M60 28L84 38V58C84 75.5 73.5 90.5 60 98C46.5 90.5 36 75.5 36 58V38L60 28Z"
                fill="#EF4444"
              />
              <path
                d="M60 28L84 38V58C84 75.5 73.5 90.5 60 98V28Z"
                fill="#DC2626"
              />
              {/* PADLOCK */}
              <rect x="48" y="56" width="24" height="20" rx="4" fill="#FFFFFF" />
              <path
                d="M53 56V50C53 46.134 56.134 43 60 43C63.866 43 67 46.134 67 50V56"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="64" r="2.5" fill="#DC2626" />
              <path d="M60 66.5V70" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* FLOATING DECORATIVE BADGES */}
            <div className="bx-unauth-float-badge float-left-badge-unauth">
              <FiLock size={15} style={{ color: "#dc2626" }} />
              <span>Privilege Lock</span>
            </div>

            <div className="bx-unauth-float-badge float-right-badge-unauth">
              <FiShieldOff size={15} style={{ color: "#d97706" }} />
              <span>Superadmin Only</span>
            </div>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          className="bx-unauth-actions-row"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <button
            onClick={() => navigate("/admin")}
            className="bx-unauth-btn-primary"
          >
            <FiGrid size={18} />
            <span>Go to Admin Dashboard</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bx-unauth-btn-outline"
          >
            <FiArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Unauthorized;
