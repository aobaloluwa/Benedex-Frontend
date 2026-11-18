import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiAlertTriangle,
  FiSearch,
  FiArrowRight,
  FiHome,
  FiBookOpen,
  FiActivity,
  FiCompass
} from 'react-icons/fi';
import Navbar from '../landingPage/Navbar';
import Footer from '../landingPage/Footer';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bx-404-wrapper">
      {/* SHARED BRAND NAVBAR */}
      <Navbar />

      {/* 404 MAIN HERO SECTION */}
      <main className="bx-404-section">
        <div className="bx-hero-grid-matrix" />

        <div className="bx-404-container">

          {/* BADGE CHIP */}
          <motion.div
            className="bx-hero-badge-chip red-badge mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiAlertTriangle size={14} className="text-red-icon" />
            <span>404 ERROR • PAGE NOT FOUND</span>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            className="bx-404-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Oops! The Page You Are Looking For <br />
            <span className="text-navy">Does Not Exist.</span>
          </motion.h1>

          {/* DESCRIPTIVE SUBTITLE */}
          <motion.p
            className="bx-404-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The URL address might be misspelled, moved, renamed, or is temporarily unavailable. Check the web address or return to the main portal.
          </motion.p>

          {/* 404 ILLUSTRATION GRAPHIC CONTAINER */}
          <motion.div
            className="bx-404-illustration-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="bx-404-illustration-card">
              <div className="bx-404-radial-glow" />

              <div className="bx-404-number-stack">
                <span className="bx-404-digit">4</span>
                <div className="bx-404-center-icon-ring">
                  <FiCompass size={40} className="bx-compass-spin" />
                </div>
                <span className="bx-404-digit">4</span>
              </div>

              {/* FLOATING DECORATIVE BADGES */}
              <div className="bx-404-float-badge float-left-badge">
                <FiBookOpen size={16} className="text-navy" />
                <span>Benedex E-Learning</span>
              </div>

              <div className="bx-404-float-badge float-right-badge">
                <FiActivity size={16} className="text-emerald" />
                <span>Vitaltron Health</span>
              </div>
            </div>
          </motion.div>

          {/* ACTION BUTTONS CLUSTER */}
          <motion.div
            className="bx-404-actions-row"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <button
              onClick={() => navigate('/')}
              className="bx-hero-btn-primary shadow-navy"
            >
              <FiHome size={18} />
              <span>Return to Corporate Home</span>
            </button>

            <button
              onClick={() => navigate('/elearning')}
              className="bx-hero-btn-green shadow-green"
            >
              <FiBookOpen size={18} />
              <span>Go to E-Learning Portal</span>
            </button>
          </motion.div>

        </div>
      </main>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
}

export default NotFound;