import { motion } from "framer-motion";
import { FiCheckCircle, FiBarChart2, FiLayers, FiSmartphone, FiAward, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const panels = [
    { id: 1, icon: <FiBarChart2 size={24} />, title: "Student Analytics", tag: "PROGRESS ENGINE" },
    { id: 2, icon: <FiBookOpen size={24} />, title: "Interactive Modules", tag: "COURSE CONTENT" },
    { id: 3, icon: <FiLayers size={28} />, title: "Learning Workspace", tag: "ACTIVE LEARNER", isCenter: true },
    { id: 4, icon: <FiAward size={24} />, title: "Verified Certificates", tag: "CREDENTIAL HUB" },
    { id: 5, icon: <FiSmartphone size={24} />, title: "PWA Mobile App", tag: "OFFLINE SYNC" }
  ];

  return (
    <section className="bx-hero-section">
      {/* SEAMLESS GEOMETRIC LIGHT ARCHITECTURAL GRID OVERLAY */}
      <div className="bx-hero-grid-matrix" />

      <div className="bx-hero-container">

        {/* UPPER CONSOLE CHIP BADGE */}
        <motion.div
          className="bx-hero-badge-chip"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bx-hero-badge-icon">⚡</span>
          <span>Benedex E-Learning Platform • LMS Architecture</span>
        </motion.div>

        {/* MAIN TYPOGRAPHY HEADER STACK */}
        <motion.h1
          className="bx-hero-main-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Premium Digital Learning, <br />
          <span className="bx-hero-title-accent">Driven by Intelligence.</span>
        </motion.h1>

        {/* CALL TO ACTION BUTTON CLUSTERS */}
        <motion.div
          className="bx-hero-action-row"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/login" className="bx-hero-btn-primary">Sign In to Portal</Link>
          <Link to="/courses" className="bx-hero-btn-secondary">Explore Courses</Link>
        </motion.div>

        {/* INLINE SUB-FEATURE INDEX STRIP */}
        <motion.div
          className="bx-hero-feature-tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bx-hero-tag-item">
            <FiCheckCircle className="bx-hero-tag-icon" />
            <span>Multi-Role Dashboards</span>
          </div>
          <div className="bx-hero-tag-item">
            <FiCheckCircle className="bx-hero-tag-icon" />
            <span>Live Classrooms & Quizzes</span>
          </div>
          <div className="bx-hero-tag-item">
            <FiCheckCircle className="bx-hero-tag-icon" />
            <span>PWA Home Screen Access</span>
          </div>
        </motion.div>

        {/* PERSPECTIVE HARDWARE CARD PERSPECTIVE WAVE */}
        <div className="bx-hero-wave-display">
          {/* FLOATING GEOMETRIC CENTER NODE */}
          <div className="bx-hero-wave-emitter-node" />

          {/* TOUCH ORIENTED MOBILE SWIPE WRAPPER FRAME */}
          <div className="bx-hero-scroll-wrapper">
            <div className="bx-hero-wave-grid-flow">
              {panels.map((panel, idx) => (
                <motion.div
                  key={panel.id}
                  className={`bx-hero-wave-card-node card-position-${idx + 1} ${panel.isCenter ? "is-central-node" : ""}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + (idx * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="bx-hero-card-inner-shell">
                    <div className="bx-hero-card-header-accent">
                      <div className="bx-hero-card-window-dots">
                        <span /><span /><span />
                      </div>
                      <span className="bx-hero-card-tag-text">{panel.tag}</span>
                    </div>

                    <div className="bx-hero-card-body-telemetry">
                      <div className="bx-hero-card-icon-frame">
                        {panel.icon}
                      </div>
                      <h3 className="bx-hero-card-title-text">{panel.title}</h3>
                      <div className="bx-hero-card-fake-bars">
                        <span className="bar-long" />
                        <span className="bar-med" />
                        <span className="bar-short" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VISUAL SWIPE PROMPT HUD FOR SMARTPHONES */}
          <div className="bx-hero-mobile-swipe-indicator">
            <span>Swipe to explore platform modules</span>
            <div className="bx-indicator-line">
              <div className="bx-indicator-progress" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;