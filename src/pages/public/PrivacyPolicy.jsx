import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiCheckCircle, FiArrowLeft, FiFileText } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import "./LegalPages.css";

function PrivacyPolicy() {
  return (
    <div className="bx-legal-wrapper">
      <Navbar />

      <main className="bx-legal-container">
        {/* BREADCRUMB / BACK LINK */}
        <div className="bx-legal-top-bar">
          <Link to="/" className="bx-legal-back-link">
            <FiArrowLeft size={16} /> Return to Home
          </Link>
        </div>

        {/* HERO HEADER */}
        <header className="bx-legal-header">
          <motion.div
            className="bx-hero-badge-chip green-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiShield size={14} className="text-green-icon" />
            <span>NIGERIA DATA PROTECTION ACT (NDPA 2023) COMPLIANT</span>
          </motion.div>

          <h1 className="bx-legal-title">Privacy Policy</h1>
          <p className="bx-legal-subtitle">
            Effective Date: January 1, 2026 &bull; Governed under the Laws of the Federal Republic of Nigeria
          </p>
        </header>

        {/* POLICY CONTENT DECK */}
        <article className="bx-legal-card">
          <section className="bx-legal-section">
            <h2>1. Introduction & Statutory Framework</h2>
            <p>
              Benedex Innovations Inc. ("Benedex", "we", "us", or "our") operates the <strong>Benedex E-Learning Platform</strong> and <strong>Vitaltron Health Mobile</strong>. We are committed to protecting the privacy and biometric integrity of our students, instructors, and users.
            </p>
            <p>
              This Privacy Policy is formulated and enforced in strict compliance with the <strong>Nigeria Data Protection Act 2023 (NDPA)</strong>, the <strong>Nigeria Data Protection Regulation (NDPR)</strong>, and guidelines issued by the <strong>Nigeria Data Protection Commission (NDPC)</strong>.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>2. Information We Collect</h2>
            <p>In operating our educational and health telemetry platforms, we collect the following categories of personal data:</p>
            <ul>
              <li><strong>Personal Identifier Data:</strong> Full name, institutional or personal email address, telephone number, user role (Student, Instructor, Admin), and profile photographs.</li>
              <li><strong>Academic & Course Performance Data:</strong> Course enrollments, module completion status, quiz scores, assignment submissions, live classroom attendance logs, and verified certificate records.</li>
              <li><strong>Health Telemetry Data (Vitaltron Health Users):</strong> Heart Rate Variability (HRV), Blood Oxygen (SpO2), stress markers, smartwatch sensor logs, and emergency contact details (collected strictly with explicit user consent).</li>
              <li><strong>Payment & Transaction Information:</strong> Billing details and transaction reference numbers processed via licensed, PCI-DSS compliant Nigerian payment gateways (Paystack, Flutterwave). We do not store full credit/debit card numbers on our servers.</li>
              <li><strong>Technical Data:</strong> IP address, device operating system, browser type, cookies, and Progress Web App (PWA) installation tokens for offline push notifications.</li>
            </ul>
          </section>

          <section className="bx-legal-section">
            <h2>3. Legal Basis & Purpose of Processing</h2>
            <p>We process your personal data under the lawful bases defined in Section 24 of the Nigeria Data Protection Act 2023:</p>
            <ul>
              <li><strong>Contractual Necessity:</strong> To provide access to the Benedex E-Learning workspace, issue verified digital certificates, and enable student-instructor interactions.</li>
              <li><strong>Explicit Consent:</strong> To collect health telemetry streams via the Vitaltron mobile application and send PWA push notifications to your mobile home screen.</li>
              <li><strong>Legitimate Academic Interest:</strong> To generate anonymized educational engagement analytics and improve platform performance.</li>
            </ul>
          </section>

          <section className="bx-legal-section">
            <h2>4. Your Data Subject Rights under Nigerian Law</h2>
            <p>Under Part VI of the Nigeria Data Protection Act 2023, Nigerian citizens and residents possess the following statutory rights regarding their personal data:</p>
            <div className="bx-rights-grid">
              <div className="bx-right-box">
                <FiCheckCircle className="text-blue-icon" />
                <div>
                  <strong>Right to Access</strong>
                  <span>Request a copy of all personal data held about you on the Benedex Portal.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiCheckCircle className="text-blue-icon" />
                <div>
                  <strong>Right to Rectification</strong>
                  <span>Correct inaccurate or incomplete profile details via your student dashboard.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiCheckCircle className="text-blue-icon" />
                <div>
                  <strong>Right to Erasure ("Right to be Forgotten")</strong>
                  <span>Request complete deletion of your account and personal records upon graduation or termination.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiCheckCircle className="text-blue-icon" />
                <div>
                  <strong>Data Portability</strong>
                  <span>Download your academic transcripts, course progress, and verified certificate credentials in machine-readable format.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bx-legal-section">
            <h2>5. Data Security & Retention</h2>
            <p>
              Benedex employs 256-bit AES encryption for all data at rest and SSL/TLS 1.3 transport encryption for data in transit. Your personal information is retained only for the period necessary to fulfill academic records management or as required by Nigerian law.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>6. Data Protection Officer (DPO) Contact</h2>
            <p>
              If you wish to exercise your statutory rights under NDPA 2023 or have inquiries regarding our data processing practices, please contact our designated Data Protection Officer:
            </p>
            <div className="bx-contact-callout">
              <strong>Data Protection Officer (DPO)</strong>
              <span>Benedex Innovations Inc.</span>
              <span>Lagos, Federal Republic of Nigeria</span>
              <span>Email: <a href="mailto:dpo@benedex.com">dpo@benedex.com</a></span>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;