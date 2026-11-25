import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiShield, FiZap, FiBookOpen, FiGlobe, FiUsers, FiAward } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import SEO from "../../components/SEO";

function AboutUs() {
  return (
    <div className="bx-corp-wrapper">
      <SEO
        title="About Us | Benedex Innovations Ltd"
        description="Learn about Benedex Innovations Ltd, a Nigerian technology and innovation company committed to advancing digital transformation through practical solutions."
        path="/about"
      />
      <Navbar />

      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />
        <div className="bx-hero-container">
          <span className="bx-eyebrow-tag">ABOUT BENEDEX INNOVATIONS LTD</span>
          <h1 className="bx-section-title text-white style-h1 mt-2">Connecting Technology with Real-World Needs</h1>
          <p className="bx-corp-hero-centered-desc">
            Benedex Innovations Ltd is a Nigerian technology and innovation company working across digital solutions, information management, professional development, and emerging technology initiatives.
          </p>
        </div>
      </section>

      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-about-content-box">
            <h2 className="bx-section-title">Who We Are</h2>
            <p className="bx-body-paragraph">
              Benedex Innovations Ltd is committed to advancing digital transformation through practical solutions, professional development, and emerging technologies.
            </p>
            <p className="bx-body-paragraph">
              Our areas of activity encompass digital communication, information management, business automation, e-learning, digital business solutions, cybersecurity, and technology-driven innovation.
            </p>

            <h2 className="bx-section-title mt-5">Our Philosophy</h2>
            <p className="bx-body-paragraph">
              We believe technology should simplify processes, expand opportunities, improve access to information, and empower individuals and organisations to achieve more. Through our services, digital platforms, and developing initiatives, we aim to respond to evolving educational, professional, business, and societal needs.
            </p>

            <div className="bx-approach-pillars-grid mt-5">
              <div className="bx-pillar-card">
                <div className="bx-pillar-num">01</div>
                <h3>Practical Solutions</h3>
                <p>We focus on technologies and approaches that address real-world challenges and simplify everyday experiences.</p>
              </div>

              <div className="bx-pillar-card">
                <div className="bx-pillar-num">02</div>
                <h3>Continuous Learning</h3>
                <p>We recognise skills development as essential foundations for personal and organisational growth.</p>
              </div>

              <div className="bx-pillar-card">
                <div className="bx-pillar-num">03</div>
                <h3>Innovation & Adaptability</h3>
                <p>We embrace new ideas, emerging technologies, and continuous improvement in a changing environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
