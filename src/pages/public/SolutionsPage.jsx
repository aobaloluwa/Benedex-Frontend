import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookOpen, FiActivity, FiArrowRight, FiCheckCircle, FiCompass } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import SEO from "../../components/SEO";

function SolutionsPage() {
  const navigate = useNavigate();

  return (
    <div className="bx-corp-wrapper">
      <SEO
        title="Our Platforms & Initiatives | Benedex Innovations Ltd"
        description="Explore Benedex E-Learning platform and our developing Vitaltron Health digital health initiative."
        path="/solutions"
      />
      <Navbar />

      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />
        <div className="bx-hero-container">
          <span className="bx-eyebrow-tag">OUR PLATFORMS & INITIATIVES</span>
          <h1 className="bx-section-title text-white mt-2">Turning Ideas into Practical Digital Experiences</h1>
          <p className="bx-corp-hero-centered-desc">
            Explore our digital learning platform and our developing digital health initiative designed to address specific needs in education, professional development, and everyday life.
          </p>
        </div>
      </section>

      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-platforms-dual-grid">
            {/* PLATFORM 1: E-LEARNING */}
            <div className="bx-platform-card card-elearning">
              <div className="bx-platform-card-header">
                <span className="bx-status-badge badge-active">
                  <FiCheckCircle size={12} /> Existing Platform
                </span>
                <span className="bx-platform-tagline">Learn. Develop. Achieve.</span>
              </div>
              <h3>Benedex E-Learning</h3>
              <p>
                Benedex E-Learning is our digital learning platform designed to support education, professional training, skills acquisition, and lifelong learning. The platform provides an environment for structured courses, virtual learning experiences, educational resources, learner engagement, and professional development.
              </p>
              <div className="bx-platform-action">
                <button
                  onClick={() => navigate('/login')}
                  className="bx-hero-btn-primary shadow-navy"
                >
                  <FiBookOpen size={16} /> Explore Benedex E-Learning <FiArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* PLATFORM 2: VITALTRON HEALTH */}
            <div id="vitaltron" className="bx-platform-card card-vitaltron">
              <div className="bx-platform-card-header">
                <span className="bx-status-badge badge-dev">
                  <FiCompass size={12} /> In Development
                </span>
                <span className="bx-platform-tagline">Your Health. Your Identity. Your Journey.</span>
              </div>
              <h3>Vitaltron Health</h3>
              <p>
                Vitaltron Health is an emerging digital health initiative focused on improving how individuals access, organise, and manage their personal health information.
              </p>
              <p className="bx-platform-subtext">
                The platform is being developed with a vision to support personal health records, health tracking, and convenient access to relevant health information through a secure and user-friendly digital experience.
              </p>
              <div className="bx-platform-action">
                <Link to="/vitaltron" className="bx-hero-btn-secondary">
                  <FiActivity size={16} /> Discover Vitaltron Health <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SolutionsPage;
