import React from "react";
import { Link } from "react-router-dom";
import {
  FiMessageSquare,
  FiDatabase,
  FiBookOpen,
  FiBriefcase,
  FiShield,
  FiZap,
  FiArrowRight
} from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import SEO from "../../components/SEO";

function ServicesPage() {
  return (
    <div className="bx-corp-wrapper">
      <SEO
        title="Our Services & Areas of Activity | Benedex Innovations Ltd"
        description="Explore the six complementary areas of technology, education, and digital transformation offered by Benedex Innovations Ltd."
        path="/services"
      />
      <Navbar />

      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />
        <div className="bx-hero-container">
          <span className="bx-eyebrow-tag">OUR SERVICES & AREAS OF ACTIVITY</span>
          <h1 className="bx-section-title text-white mt-2">Practical Digital Solutions for a Connected World</h1>
          <p className="bx-corp-hero-centered-desc">
            We work across six complementary areas of technology, education and digital transformation. Explore our focus areas and contact us to discuss specific needs and current service availability.
          </p>
        </div>
      </section>

      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-activity-grid">
            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiMessageSquare size={22} />
              </div>
              <h3>Digital Communication & Collaboration</h3>
              <p>
                We explore and support digital communication solutions that enable individuals, teams, and organisations to connect, exchange information, and collaborate effectively across different locations.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiDatabase size={22} />
              </div>
              <h3>Information Management & Business Automation</h3>
              <p>
                We focus on solutions that simplify information collection, storage, retrieval, and sharing, while supporting workflow automation, operational efficiency, and informed decision-making.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiBookOpen size={22} />
              </div>
              <h3>Digital Learning & Professional Development</h3>
              <p>
                We promote accessible education, skills development, and continuous professional learning through digital learning environments, structured training programmes, virtual classrooms, and educational resources.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiBriefcase size={22} />
              </div>
              <h3>Digital Business & Technology Solutions</h3>
              <p>
                We support the adoption of digital tools and technologies that enhance business operations, e-commerce, digital marketing, remote collaboration, and organisational transformation.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiShield size={22} />
              </div>
              <h3>Cybersecurity & Information Protection</h3>
              <p>
                We promote responsible digital practices, information security, data protection, access control, and the use of appropriate technologies to safeguard digital information and systems.
              </p>
            </div>

            <div className="bx-activity-card">
              <div className="bx-activity-icon-box">
                <FiZap size={22} />
              </div>
              <h3>Research, Technology & Innovation</h3>
              <p>
                We explore emerging technologies, innovative ideas, and practical digital solutions that address evolving challenges and create opportunities for individuals, businesses, and communities.
              </p>
            </div>
          </div>

          <div className="bx-cta-navy-card mt-5 text-center">
            <h3 className="bx-cta-heading">Interested in discussing service availability?</h3>
            <p className="bx-cta-desc">Contact our technology solutions team to explore opportunities for your organisation.</p>
            <Link to="/contact" className="bx-btn-primary-green">
              Contact Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ServicesPage;
