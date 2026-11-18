import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFileText, FiShield, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import "./LegalPages.css";

function TermsOfService() {
  return (
    <div className="bx-legal-wrapper">
      <Navbar />

      <main className="bx-legal-container">
        {/* BREADCRUMB */}
        <div className="bx-legal-top-bar">
          <Link to="/" className="bx-legal-back-link">
            <FiArrowLeft size={16} /> Return to Home
          </Link>
        </div>

        {/* HERO HEADER */}
        <header className="bx-legal-header">
          <motion.div
            className="bx-hero-badge-chip"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiShield size={14} className="text-blue-icon" />
            <span>BINDING LEGAL AGREEMENT • JURISDICTION OF NIGERIA</span>
          </motion.div>

          <h1 className="bx-legal-title">Terms of Service</h1>
          <p className="bx-legal-subtitle">
            Last Updated: January 1, 2026 &bull; Governed by the Laws of the Federal Republic of Nigeria
          </p>
        </header>

        {/* TERMS CONTENT DECK */}
        <article className="bx-legal-card">
          <section className="bx-legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              Welcome to <strong>Benedex Innovations Inc.</strong> ("Benedex", "we", "us"). By accessing or using the <strong>Benedex E-Learning Platform</strong> (accessible at <Link to="/elearning">/elearning</Link>) or the <strong>Vitaltron Health Mobile App</strong> (accessible at <Link to="/vitaltron">/vitaltron</Link>), you agree to be bound by these Terms of Service and all applicable Nigerian laws.
            </p>
            <p>
              If you do not agree to these terms, you must refrain from accessing or utilizing our educational workspaces, course materials, and health telemetry services.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>2. User Accounts & Academic Integrity</h2>
            <p>To access student, instructor, or admin workspaces, users must create a verified account:</p>
            <ul>
              <li><strong>Account Confidentiality:</strong> Users are responsible for maintaining the confidentiality of their login credentials and for all activities conducted under their account.</li>
              <li><strong>Academic Integrity:</strong> Students must submit authentic coursework. Plagiarism, automated examination cheating, or unauthorized sharing of instructor course materials is strictly prohibited and subject to immediate account termination.</li>
              <li><strong>Prohibited Conduct:</strong> Users shall not attempt to reverse engineer, scrape, distribute malware, or compromise the infrastructure of the Benedex Portal.</li>
            </ul>
          </section>

          <section className="bx-legal-section">
            <h2>3. Intellectual Property Rights</h2>
            <p>
              All proprietary platform software, source code, UI designs, logos, verified certificate verification engines, and underlying technology are the exclusive intellectual property of <strong>Benedex Innovations Inc.</strong> protected under the <strong>Copyright Act 2022 of Nigeria</strong> and international intellectual property treaties.
            </p>
            <p>
              Instructors retain copyright over their custom course content uploaded to the platform, granting Benedex a non-exclusive license to host, stream, and distribute the content to enrolled students.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>4. Fees, Payments & Currency</h2>
            <p>
              All course tuition fees, subscription plans, and platform transactions are denominated in <strong>Nigerian Naira (NGN)</strong> unless explicitly stated otherwise. Payments are processed securely via PCI-DSS compliant Nigerian payment processors (Paystack, Flutterwave). All fees paid are subject to our standard institutional refund policies.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted under the laws of the Federal Republic of Nigeria, Benedex Innovations Inc. shall not be liable for any indirect, incidental, or consequential damages resulting from platform downtime, internet disruptions, or unauthorized third-party access to user accounts.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>6. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>.
            </p>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms shall first be resolved through good-faith negotiation. If unresolved within 30 days, the dispute shall be referred to and finally resolved by Arbitration in <strong>Lagos State, Nigeria</strong> under the <strong>Arbitration and Mediation Act 2023</strong>.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>7. Contact Information</h2>
            <p>For legal inquiries, terms clarification, or institutional contract agreements, contact:</p>
            <div className="bx-contact-callout">
              <strong>Legal & Compliance Department</strong>
              <span>Benedex Innovations Inc.</span>
              <span>Lagos State, Nigeria</span>
              <span>Email: <a href="mailto:legal@benedex.com">legal@benedex.com</a></span>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfService;