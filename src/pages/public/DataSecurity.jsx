import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiServer, FiCheckCircle, FiArrowLeft, FiZap } from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import "./LegalPages.css";

function DataSecurity() {
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
            className="bx-hero-badge-chip green-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiShield size={14} className="text-green-icon" />
            <span>ENTERPRISE ENCRYPTION • NDPR & HIPAA CERTIFIED</span>
          </motion.div>

          <h1 className="bx-legal-title">Data Protection & Security Compliance</h1>
          <p className="bx-legal-subtitle">
            Enterprise-Grade Infrastructure & Audited Nigerian Privacy Standards
          </p>
        </header>

        {/* SECURITY CONTENT DECK */}
        <article className="bx-legal-card">
          <section className="bx-legal-section">
            <h2>1. Security First Architecture</h2>
            <p>
              At <strong>Benedex Innovations Inc.</strong>, security is built into every layer of our platform infrastructure. We protect academic records, student submissions, and health telemetry data using zero-trust architectural principles.
            </p>
          </section>

          <section className="bx-legal-section">
            <h2>2. Encryption Standards</h2>
            <p>We enforce end-to-end encryption protocols across all student, instructor, and health app interactions:</p>
            <div className="bx-rights-grid">
              <div className="bx-right-box">
                <FiLock className="text-blue-icon" />
                <div>
                  <strong>Data in Transit (TLS 1.3)</strong>
                  <span>All communications between web browsers, mobile apps, and cloud servers are encrypted using TLS 1.3 protocols.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiServer className="text-blue-icon" />
                <div>
                  <strong>Data at Rest (256-Bit AES)</strong>
                  <span>Database volumes, student grades, and health telemetry logs are protected with AES-256 military-grade encryption.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiShield className="text-blue-icon" />
                <div>
                  <strong>Zero-Knowledge Biometric Storage</strong>
                  <span>Vitaltron health app telemetry is encrypted on-device before transmission, preventing unauthorized access.</span>
                </div>
              </div>

              <div className="bx-right-box">
                <FiZap className="text-blue-icon" />
                <div>
                  <strong>99.99% Cloud Availability</strong>
                  <span>Distributed multi-region cloud infrastructure guarantees high uptime and instant failover protection.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bx-legal-section">
            <h2>3. Compliance & Regulatory Standards</h2>
            <p>Benedex platforms adhere strictly to local and international compliance frameworks:</p>
            <ul>
              <li><strong>Nigeria Data Protection Act (NDPA 2023):</strong> Certified data handling practices registered with the NDPC.</li>
              <li><strong>HIPAA Health Guidelines:</strong> Biometric and health telemetry data from Vitaltron Health adheres to international HIPAA privacy standards.</li>
              <li><strong>PCI-DSS Payment Security:</strong> All financial transactions are processed by Level-1 PCI-DSS certified payment processors (Paystack, Flutterwave).</li>
            </ul>
          </section>

          <section className="bx-legal-section">
            <h2>4. Incident Response & 72-Hour Breach Notification</h2>
            <p>
              In accordance with Section 40 of the NDPA 2023, Benedex maintains an automated security incident response protocol. In the unlikely event of a verified data security breach, we will notify the <strong>Nigeria Data Protection Commission (NDPC)</strong> and affected users within <strong>72 hours</strong>.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default DataSecurity;