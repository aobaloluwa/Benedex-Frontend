import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheckCircle } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import SEO from "../../components/SEO";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organisation: "",
    enquiryType: "General Enquiry",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bx-corp-wrapper">
      <SEO
        title="Contact Us | Benedex Innovations Ltd"
        description="Have an enquiry about our services, training opportunities, or digital platforms? Contact Benedex Innovations Ltd."
        path="/contact"
      />
      <Navbar />

      <section className="bx-hero-section bx-corp-hero-bg">
        <div className="bx-hero-grid-matrix" />
        <div className="bx-hero-container">
          <span className="bx-eyebrow-tag">GET IN TOUCH</span>
          <h1 className="bx-section-title text-white mt-2">Contact Benedex Innovations Ltd</h1>
          <p className="bx-corp-hero-centered-desc">
            Have an enquiry about our services, training opportunities, digital platforms or potential collaborations? We would be pleased to hear from you.
          </p>
        </div>
      </section>

      <section className="bx-section-padding bx-bg-white">
        <div className="bx-container">
          <div className="bx-about-content-box">
            {submitted ? (
              <div className="bx-cpd-showcase-card text-center py-5">
                <FiCheckCircle size={48} className="text-success mb-3" />
                <h2 className="h3 font-weight-bold text-navy mb-2">Message Sent Successfully</h2>
                <p className="text-muted mb-4">
                  Thank you for contacting <strong>Benedex Innovations Ltd</strong>. Our team has received your enquiry and will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bx-hero-btn-primary mx-auto"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bx-cpd-showcase-card">
                <div className="mb-4">
                  <label className="form-label font-weight-bold text-navy">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label font-weight-bold text-navy">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label font-weight-bold text-navy">Organisation (Optional)</label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="Company or institution name"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label font-weight-bold text-navy">Enquiry Type</label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="form-select py-2"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Services & Technology">Services & Technology</option>
                    <option value="Training & CPD">Training & CPD Programmes</option>
                    <option value="Digital Platforms">Digital Platforms (E-Learning / Vitaltron)</option>
                    <option value="Partnership">Partnership & Collaboration</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label font-weight-bold text-navy">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="consent" className="form-check-label small text-muted">
                    I agree to the processing of my information in accordance with the Benedex Privacy Policy.
                  </label>
                </div>

                <button type="submit" className="bx-hero-btn-primary w-100 justify-content-center">
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
