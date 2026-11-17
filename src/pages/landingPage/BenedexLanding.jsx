import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookOpen,
  FiActivity,
  FiCpu,
  FiShield,
  FiArrowRight,
  FiZap,
  FiCheck,
  FiAward,
  FiUsers,
  FiHeart,
  FiSmartphone,
  FiLayers,
  FiCheckCircle
} from 'react-icons/fi';
import Navbar from './Navbar';
import Footer from './Footer';
import './BenedexLanding.css';

const BenedexLanding = () => {
  const navigate = useNavigate();
  const [activeDivision, setActiveDivision] = useState('elearning');

  return (
    <div className="bx-corp-wrapper">
      {/* SHARED BRAND NAVBAR */}
      <Navbar />

      {/* ==========================================
          NEW HERO SECTION (CENTER-ALIGNED MASTER SHOWCASE)
      ========================================== */}
      <section className="bx-hero-section bx-corp-hero-bg">
        {/* ARCHITECTURAL LIGHT GRID OVERLAY */}
        <div className="bx-hero-grid-matrix" />

        <div className="bx-hero-container">

          {/* BADGE CHIP */}
          <motion.div
            className="bx-hero-badge-chip"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bx-hero-badge-icon">⚡</span>
            <span>Benedex Innovations • Parent Technology Incubator</span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            className="bx-hero-main-title bx-hero-centered-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Architecting Next-Gen Intelligence for <br />
            <span className="bx-hero-title-accent text-gradient-corp">
              Education & Healthcare.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            className="bx-corp-hero-centered-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Benedex Innovations is the parent tech firm driving two flagship platforms: the <strong>Benedex E-Learning Platform</strong> and <strong>Vitaltron Health Mobile</strong>. Select a division below to launch its portal.
          </motion.p>

          {/* ACTION BUTTON CLUSTER */}
          <motion.div
            className="bx-hero-action-row justify-center-actions"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <button
              onClick={() => navigate('/elearning')}
              className="bx-hero-btn-primary shadow-navy"
            >
              <FiBookOpen size={18} /> Benedex E-Learning
            </button>
            <button
              onClick={() => navigate('/vitaltron')}
              className="bx-hero-btn-green shadow-green"
            >
              <FiActivity size={18} /> Vitaltron Health App
            </button>
          </motion.div>

          {/* METRICS STRIP BELOW CARDS */}
          <div className="bx-hero-stats-banner">
            <div className="bx-hero-stat">
              <strong>2</strong>
              <span>Product Ecosystems</span>
            </div>
            <div className="bx-hero-stat-sep" />
            <div className="bx-hero-stat">
              <strong>100+</strong>
              <span>Active Users Worldwide</span>
            </div>
            <div className="bx-hero-stat-sep" />
            <div className="bx-hero-stat">
              <strong>99.99%</strong>
              <span>Cloud Reliability Uptime</span>
            </div>
            <div className="bx-hero-stat-sep" />
            <div className="bx-hero-stat">
              <strong>24/7</strong>
              <span>Real-Time Telemetry</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          WIDE INTERACTIVE EXPLORER (NO CARD BG)
      ========================================== */}
      <section className="bx-corp-tab-section" id="products">
        <div className="bx-wide-explorer-container">

          <div className="bx-features-badge">Interactive Explorer</div>
          <h2 className="bx-features-main-heading">Inspect Product Capabilities</h2>

          {/* TAB BUTTON SEGMENTED CONTROL */}
          <div className="bx-explorer-tab-bar">
            <button
              className={`bx-exp-tab-btn ${activeDivision === 'elearning' ? 'active-blue-tab' : ''}`}
              onClick={() => setActiveDivision('elearning')}
            >
              <FiBookOpen size={18} /> Benedex E-Learning Platform
            </button>
            <button
              className={`bx-exp-tab-btn ${activeDivision === 'vitaltron' ? 'active-green-tab' : ''}`}
              onClick={() => setActiveDivision('vitaltron')}
            >
              <FiActivity size={18} /> Vitaltron Health Mobile App
            </button>
          </div>

          {/* SEAMLESS WIDE TAB DISPLAY */}
          <div className="bx-explorer-display-clean">
            <AnimatePresence mode="wait">
              {activeDivision === 'elearning' ? (
                <motion.div
                  key="exp-elearning"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bx-exp-grid-wide"
                >
                  {/* LEFT FEATURE TILES LIST */}
                  <div className="bx-exp-left">
                    <span className="bx-gw-badge badge-blue mb-2">EDTECH SUBSYSTEMS</span>
                    <h3 className="bx-exp-heading">Empowering Global Learning Through AI</h3>
                    <p className="bx-exp-desc">
                      Our LMS workspace blends real-time AI assistance with powerful classroom management tools, empowering instructors to craft intelligent course structures and students to master complex skills.
                    </p>

                    {/* 3 STRUCTURED FEATURE CARDS */}
                    <div className="bx-exp-tiles-stack">
                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-blue-bg"><FiSmartphone size={20} /></div>
                        <div>
                          <strong>PWA Mobile Home Screen Access</strong>
                          <span>Add Benedex Portal directly to your smartphone home screen for offline learning & instant push alerts.</span>
                        </div>
                      </div>

                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-blue-bg"><FiBookOpen size={20} /></div>
                        <div>
                          <strong>Live Virtual Classrooms & Video Lessons</strong>
                          <span>HD virtual video streaming, interactive whiteboards, and downloadable lesson resources.</span>
                        </div>
                      </div>

                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-blue-bg"><FiAward size={20} /></div>
                        <div>
                          <strong>Verified Public Credentials</strong>
                          <span>Public verification portal for authenticating student certificates and digital transcripts.</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => navigate('/elearning')} className="bx-hero-btn-primary mt-4">
                      <span>Launch E-Learning Portal</span>
                      <FiArrowRight />
                    </button>
                  </div>

                  {/* RIGHT MOCKUP DISPLAY CARD */}
                  <div className="bx-exp-right">
                    <div className="bx-exp-mockup-frame">
                      <div className="bx-exp-mockup-top">
                        <div className="bx-mockup-dots">
                          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
                        </div>
                        <span className="bx-exp-mockup-label">Benedex E-Learning Web App Features</span>
                      </div>

                      <div className="bx-exp-mockup-content">
                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box"><FiSmartphone size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>PWA Home Screen Installation</strong>
                            <span>Add Benedex Portal to your phone home screen for offline access</span>
                          </div>
                          <span className="bx-mock-pill pill-blue">PWA Ready</span>
                        </div>

                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box icon-green-bg"><FiBookOpen size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>Live Virtual Classroom Stream</strong>
                            <span>HD interactive video sessions & live instructor chat</span>
                          </div>
                          <span className="bx-mock-pill pill-green">Live Class</span>
                        </div>

                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box icon-purple-bg"><FiAward size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>Verified Digital Certificates</strong>
                            <span>Public QR code verification & shareable digital credentials</span>
                          </div>
                          <span className="bx-mock-pill pill-purple">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="exp-vitaltron"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bx-exp-grid-wide"
                >
                  {/* LEFT FEATURE TILES LIST */}
                  <div className="bx-exp-left">
                    <span className="bx-gw-badge badge-green mb-2">HEALTH TELEMETRY</span>
                    <h3 className="bx-exp-heading">Clinical-Grade Mobile Health & AI Warnings</h3>
                    <p className="bx-exp-desc">
                      Vitaltron brings real-time vital sign tracking, AI diagnostic warnings, and smartwatch telemetry sync right to your smartphone with bank-grade security.
                    </p>

                    {/* 3 STRUCTURED FEATURE CARDS */}
                    <div className="bx-exp-tiles-stack">
                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-green-bg"><FiHeart size={20} /></div>
                        <div>
                          <strong>24/7 Vital Telemetry Stream</strong>
                          <span>Continuous real-time tracking of Heart Rate Variability (HRV), SpO2, and Stress.</span>
                        </div>
                      </div>

                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-green-bg"><FiSmartphone size={20} /></div>
                        <div>
                          <strong>Universal Smartwatch BLE Sync</strong>
                          <span>Direct Bluetooth connection with Apple Watch, WearOS, and clinical sensors.</span>
                        </div>
                      </div>

                      <div className="bx-exp-tile">
                        <div className="bx-exp-tile-icon icon-green-bg"><FiZap size={20} /></div>
                        <div>
                          <strong>AI Sentinel & Emergency SOS</strong>
                          <span>Automated early risk alerts and instant emergency contact location dispatch.</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => navigate('/vitaltron')} className="bx-hero-btn-green mt-4">
                      <span>Explore Vitaltron App</span>
                      <FiArrowRight />
                    </button>
                  </div>

                  {/* RIGHT MOCKUP DISPLAY CARD */}
                  <div className="bx-exp-right">
                    <div className="bx-exp-mockup-frame green-mockup">
                      <div className="bx-exp-mockup-top">
                        <div className="bx-mockup-dots">
                          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
                        </div>
                        <span className="bx-exp-mockup-label">Vitaltron Telemetry Console</span>
                      </div>

                      <div className="bx-exp-mockup-content">
                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box icon-red-bg"><FiHeart size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>Heart Rate Monitoring</strong>
                            <span>72 BPM • Resting Baseline Normal</span>
                          </div>
                          <span className="bx-mock-pill pill-green">Normal</span>
                        </div>

                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box icon-cyan-bg"><FiActivity size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>Blood Oxygen (SpO2)</strong>
                            <span>98% Saturation Level</span>
                          </div>
                          <span className="bx-mock-pill pill-green">Optimal</span>
                        </div>

                        <div className="bx-exp-mock-item">
                          <div className="bx-mock-icon-box icon-green-bg"><FiCpu size={18} /></div>
                          <div className="bx-mock-details">
                            <strong>AI Diagnostic Sentinel</strong>
                            <span>Cardiovascular rhythm stable • 94% Recovery</span>
                          </div>
                          <span className="bx-mock-pill pill-purple">AI Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ==========================================
          CORE INNOVATION PILLARS
      ========================================== */}
      <section className="bx-features-section">
        <div className="bx-features-container">

          <div className="bx-features-badge">Parent Firm Foundation</div>
          <h2 className="bx-features-main-heading">Architected for Quality & Security</h2>

          <div className="bx-features-grid-shell">
            <motion.div className="bx-feature-card" whileHover={{ y: -6 }}>
              <div className="bx-feature-card-inner">
                <div className="bx-feature-icon-box icon-blue">
                  <FiCpu size={22} />
                </div>
                <h3 className="bx-feature-card-title">Human-Centric AI Layer</h3>
                <p className="bx-feature-card-desc">
                  Intelligent algorithms that generate educational content and monitor vital health telemetry without replacing human oversight.
                </p>
              </div>
            </motion.div>

            <motion.div className="bx-feature-card" whileHover={{ y: -6 }}>
              <div className="bx-feature-card-inner">
                <div className="bx-feature-icon-box icon-green">
                  <FiShield size={22} />
                </div>
                <h3 className="bx-feature-card-title">Enterprise & HIPAA Security</h3>
                <p className="bx-feature-card-desc">
                  Built on 256-bit AES encryption, multi-tenant isolation, and strict compliance for academic data and health telemetry.
                </p>
              </div>
            </motion.div>

            <motion.div className="bx-feature-card" whileHover={{ y: -6 }}>
              <div className="bx-feature-card-inner">
                <div className="bx-feature-icon-box icon-dark">
                  <FiZap size={22} />
                </div>
                <h3 className="bx-feature-card-title">High Reliability Cloud</h3>
                <p className="bx-feature-card-desc">
                  Distributed multi-region cloud infrastructure ensuring 99.99% system availability and sub-second response times.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SIGNATURE BENEDEX CTA BANNER
      ========================================== */}
      <section className="bx-cta-outer-wrapper">
        <div className="bx-cta-grid-bg">
          <div className="bx-cta-grid-lines" />
        </div>

        <div className="bx-cta-content-container">
          <motion.div
            className="bx-cta-card-shell"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bx-cta-radial-glow" />

            <div className="bx-cta-card-inner">
              <span className="bx-cta-subtitle">Benedex Innovations Inc.</span>
              <h2 className="bx-cta-main-text">
                Shaping the Future of Learning & Healthcare Technology.
              </h2>

              <div className="bx-cta-button-cluster">
                <button onClick={() => navigate('/elearning')} className="bx-btn-primary-green">
                  Benedex E-Learning
                </button>
                <button onClick={() => navigate('/vitaltron')} className="bx-btn-secondary-outline">
                  Vitaltron Health App
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
};

export default BenedexLanding;