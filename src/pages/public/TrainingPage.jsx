import React from "react";
import { Link } from "react-router-dom";
import { FiAward, FiBookOpen, FiArrowRight, FiExternalLink } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import SEO from "../../components/SEO";

function TrainingPage() {
  return (
    <div className="bx-corp-wrapper">
      <SEO
        title="Training & Professional Development | Benedex Innovations Ltd"
        description="Build knowledge, strengthen professional skills, and support lifelong learning through Benedex educational initiatives."
        path="/training"
      />
      <Navbar />

      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />
        <div className="bx-hero-container">
          <span className="bx-eyebrow-tag">PROFESSIONAL LEARNING</span>
          <h1 className="bx-section-title text-white mt-2">Training & Professional Development</h1>
          <p className="bx-corp-hero-centered-desc">
            Explore opportunities to build knowledge, strengthen professional skills and support lifelong learning through Benedex educational initiatives.
          </p>
        </div>
      </section>

      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-cpd-showcase-card mb-5">
            <div className="bx-cpd-badge-header">
              <FiAward size={32} className="text-navy" />
              <div>
                <span className="bx-cpd-eyebrow">APPROVED PROVIDER</span>
                <h3>Committed to Professional Learning Standards</h3>
              </div>
            </div>

            <p className="bx-cpd-body-text">
              Benedex Innovations Ltd is an <strong>Approved CPD Provider with The CPD Group</strong>, reflecting an important milestone in our commitment to structured professional development. As we continue to develop our training portfolio, we aim to deliver programmes that promote meaningful learning experiences and practical skills development.
            </p>

            <div className="bx-cpd-actions-row">
              <Link to="/login" className="bx-hero-btn-primary">
                Explore Available Courses <FiBookOpen />
              </Link>
              <a
                href="https://thecpdregister.com/providers/cpd-group--providers--791495"
                target="_blank"
                rel="noopener noreferrer"
                className="bx-inline-link d-inline-flex align-items-center gap-2"
              >
                View Our CPD Provider Listing <FiExternalLink />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default TrainingPage;
