import { motion } from "framer-motion";
import { FiShield, FiSliders, FiFileText } from "react-icons/fi";
import "./SplitCTA.css";

function SplitCTA() {
  // Variant configurations for entry animations
  const textContainerVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bx-split-section">
      <div className="bx-split-container">
        
        {/* LEFT TEXT PANEL LAYER */}
        <motion.div 
          className="bx-split-text-side"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* BRAND BADGE TAG */}
          <motion.div className="bx-split-tag" variants={itemVariants}>
            ACADEMIC SECURITY & PRIVACY
          </motion.div>

          {/* MAIN CARD HEADLINE */}
          <motion.h2 className="bx-split-title" variants={itemVariants}>
            Enterprise-Grade Security for Institutions & Students
          </motion.h2>

          {/* FEATURE ITEMS STACK */}
          <div className="bx-split-features-list">
            
            <motion.div className="bx-split-item" variants={itemVariants}>
              <div className="bx-split-icon-wrapper">
                <FiShield size={20} />
              </div>
              <div className="bx-split-item-content">
                <h3>Encrypted Student Data & SSO</h3>
                <p>256-bit encryption for student records, assignment submissions, and instructor data compliant with global privacy standards.</p>
              </div>
            </motion.div>

            <motion.div className="bx-split-item" variants={itemVariants}>
              <div className="bx-split-icon-wrapper">
                <FiSliders size={20} />
              </div>
              <div className="bx-split-item-content">
                <h3>Multi-Role Dashboard Control</h3>
                <p>Administrators can manage course permissions, instructor roles, and student enrollments from a centralized control panel.</p>
              </div>
            </motion.div>

            <motion.div className="bx-split-item" variants={itemVariants}>
              <div className="bx-split-icon-wrapper">
                <FiFileText size={20} />
              </div>
              <div className="bx-split-item-content">
                <h3>Automated Academic Analytics</h3>
                <p>Generate course engagement insights, student progression reports, and system usage statistics with a single click.</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* RIGHT PREVIEW SCREEN PANEL LAYER */}
        <motion.div 
          className="bx-split-mockup-side"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="bx-split-window-shell">
            {/* PLATFORM APP WINDOW ACCENT BAR */}
            <div className="bx-split-window-bar">
              <div className="bx-split-window-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <div className="bx-split-window-address">elearning.benedex.org/admin/security</div>
            </div>

            {/* TELEMETRY GRAPHICS CONTAINER */}
            <div className="bx-split-window-canvas">
              <div className="bx-mockup-dashboard-layout">
                <div className="bx-mockup-sidebar">
                  <div className="bx-line-short" />
                  <div className="bx-line-med" />
                  <div className="bx-line-short" />
                </div>
                <div className="bx-mockup-main">
                  <div className="bx-mockup-top-tiles">
                    <div className="bx-tile"><div className="bx-line-short"/></div>
                    <div className="bx-tile"><div className="bx-line-short"/></div>
                  </div>
                  <div className="bx-mockup-chart-block">
                    <div className="bx-mockup-chart-line" />
                    <div className="bx-mockup-bars-row">
                      <span style={{ height: "40%" }} />
                      <span style={{ height: "70%" }} />
                      <span style={{ height: "55%" }} />
                      <span style={{ height: "85%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default SplitCTA;