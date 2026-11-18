import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./CTA.css";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bx-cta-outer-wrapper">
      {/* FAINT GRID OVERLAY */}
      <div className="bx-cta-grid-bg">
        <div className="bx-cta-grid-lines" />
      </div>

      <div className="bx-cta-content-container">
        {/* DEAD-CENTERED FLOATING DEEP BLUE BLOCK CARD */}
        <motion.div 
          className="bx-cta-card-shell"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* CARD BACKGROUND GLOW SHADOW */}
          <div className="bx-cta-radial-glow" />

          <div className="bx-cta-card-inner">
            {/* SUBTITLE */}
            <motion.span 
              className="bx-cta-subtitle"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Ready to elevate your learning experience?
            </motion.span>

            {/* MAIN PARAGRAPH DESCRIPTIVE TEXT */}
            <motion.h2 
              className="bx-cta-main-text"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join thousands of students and instructors leveraging Benedex E-Learning to master new skills and streamline classroom management.
            </motion.h2>

            {/* CALL TO ACTION BUTTON CLUSTER */}
            <motion.div 
              className="bx-cta-button-cluster"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* PRIMARY SOLID CTA BUTTON */}
              <Link 
                to="/register"
                className="bx-btn-primary-green"
              >
                <span>Get Started Free</span>
              </Link>

              {/* SECONDARY OUTLINE BUTTON */}
              <button
                onClick={() => navigate('/courses')}
                className="bx-btn-secondary-outline"
              >
                <span>Explore Courses</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;