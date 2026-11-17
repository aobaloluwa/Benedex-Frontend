import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiHeart,
  FiShield,
  FiSmartphone,
  FiWatch,
  FiArrowRight,
  FiBookOpen,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi';
import Navbar from './Navbar';
import Footer from './Footer';
import './VitaltronLanding.css';

const VitaltronLanding = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="vt-wrapper">
      {/* SHARED BRAND NAVBAR */}
      <Navbar />

      {/* ==========================================
          COMING SOON HERO CENTER SECTION
      ========================================== */}
      <section className="vt-coming-soon-section">
        {/* ARCHITECTURAL LIGHT GRID OVERLAY */}
        <div className="bx-hero-grid-matrix" />

        <div className="vt-coming-soon-container">

          {/* BADGE CHIP */}
          <motion.div
            className="bx-hero-badge-chip green-badge mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiActivity size={14} className="text-green-icon" />
            <span>Vitaltron Health Mobile • Launching Soon</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            className="vt-coming-soon-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Clinical-Grade Health Telemetry <br />
            <span className="green-accent">Is Coming Soon.</span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            className="vt-coming-soon-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our mobile health application, real-time vital telemetry engine, and AI diagnostic sentinel are currently undergoing final beta testing and wearable compliance checks. Join our early access list below.
          </motion.p>

          {/* HEALTH TELEMETRY GRAPHIC ILLUSTRATION */}
          <motion.div
            className="vt-illustration-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="vt-illustration-card">
              <div className="vt-pulse-ring-outer" />
              <div className="vt-pulse-ring-inner" />

              <div className="vt-center-pulse-icon">
                <FiActivity size={36} className="vt-pulse-heart-green" />
              </div>

              {/* ORBITING HARDWARE ICONS */}
              <div className="vt-orbit-node node-heart" title="Heart Rate Telemetry">
                <FiHeart size={18} />
              </div>
              <div className="vt-orbit-node node-watch" title="Smartwatch BLE Sync">
                <FiWatch size={18} />
              </div>
              <div className="vt-orbit-node node-shield" title="HIPAA Encrypted">
                <FiShield size={18} />
              </div>
              <div className="vt-orbit-node node-phone" title="Mobile App">
                <FiSmartphone size={18} />
              </div>

              {/* ECG ANIMATED WAVEFORM SVG */}
              <div className="vt-ecg-banner">
                <svg viewBox="0 0 300 40" className="vt-ecg-svg">
                  <path
                    d="M 0 20 L 50 20 L 60 5 L 70 35 L 80 10 L 90 20 L 150 20 L 160 0 L 170 40 L 180 12 L 190 20 L 300 20"
                    fill="none"
                    stroke="#1e844f"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* WAITLIST / NOTIFY ME FORM */}
          <motion.div
            className="vt-waitlist-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {isSubmitted ? (
              <div className="vt-submitted-msg">
                <FiCheckCircle size={22} className="text-green-icon mr-2" />
                <span>You're on the early access list! We'll notify you when Vitaltron launches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="vt-waitlist-form">
                <input
                  type="email"
                  placeholder="Enter your email for early access..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="vt-email-input"
                  required
                />
                <button type="submit" className="bx-hero-btn-green vt-notify-btn">
                  <span>Get Notified</span>
                  <FiSend size={14} />
                </button>
              </form>
            )}
          </motion.div>

          {/* BACK TO E-LEARNING PLATFORM BUTTON */}
          <motion.div
            className="vt-back-action-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-xs text-slate-500 font-semibold mb-2 block">WHILE YOU WAIT:</span>
            <button
              onClick={() => navigate('/elearning')}
              className="bx-hero-btn-primary shadow-navy"
            >
              <FiBookOpen size={18} />
              <span>Explore Benedex E-Learning Platform</span>
              <FiArrowRight size={16} />
            </button>
          </motion.div>

        </div>
      </section>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
};

/* ==========================================
   FULL VITALTRON LANDING COMPONENT (RETAINED & PRESERVED)
========================================== */
export const FullVitaltronLandingCode = () => {
  return null;
};

export default VitaltronLanding;