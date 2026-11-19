import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiShield,
  FiUser,
  FiMail,
  FiCalendar,
  FiHome,
  FiAlertTriangle,
} from "react-icons/fi";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";
import API from "../../services/api";
import "./IdentityVerification.css";

function IdentityVerification() {
  const { userId } = useParams();

  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/users/verify-public/${userId}`);
        setIdentity(res.data?.user || null);
      } catch (err) {
        console.error("Identity verification fetch failure:", err);
        setError("Unable to locate or verify this identity record in official platform registries.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchIdentity();
    }
  }, [userId]);

  return (
    <div className="bx-iv-wrapper">
      <Navbar />

      <main className="bx-iv-section">
        <div className="bx-iv-container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p className="text-muted font-weight-medium">Verifying Official Identity Credentials...</p>
            </div>
          ) : error || !identity ? (
            <div className="bx-iv-card text-center p-4">
              <FiAlertTriangle size={48} className="text-danger mb-3" />
              <h2 className="h4 font-weight-bold text-dark mb-2">Unverified Identity Record</h2>
              <p className="text-muted small mb-4">{error || "The requested identity code does not match active platform records."}</p>
              <Link to="/" className="bx-iv-btn-home">
                <FiHome /> Return to Corporate Portal
              </Link>
            </div>
          ) : (
            <motion.div
              className="bx-iv-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bx-iv-card-header">
                <div className="bx-iv-badge-chip">
                  <FiCheckCircle size={14} />
                  <span>Verified Official Credential</span>
                </div>
                <h1>Benedex Innovations Inc.</h1>
                <p>Corporate Identity Verification Portal</p>
              </div>

              <div className="bx-iv-card-body">
                <img
                  src={
                    identity.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      identity.fullName || "Member"
                    )}&background=07335c&color=fff&size=128&bold=true`
                  }
                  alt={identity.fullName}
                  className="bx-iv-avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      identity.fullName || "Member"
                    )}&background=07335c&color=fff&size=128&bold=true`;
                  }}
                />

                <h2 className="bx-iv-name">{identity.fullName}</h2>
                <p className="bx-iv-role">
                  {identity.role === "superadmin"
                    ? "Super Administrator"
                    : identity.role === "admin"
                    ? "System Administrator"
                    : identity.role === "instructor"
                    ? "Verified Faculty Instructor"
                    : "Enrolled Student"}{" "}
                  • Benedex
                </p>

                <div className="bx-iv-details-list">
                  <div className="bx-iv-detail-row">
                    <span>Official ID Code:</span>
                    <strong>
                      BX-{String(identity._id || "892014").slice(-6).toUpperCase()}-
                      {identity.role === "superadmin" ? "SADM" : "ADM"}
                    </strong>
                  </div>

                  <div className="bx-iv-detail-row">
                    <span>Corporate Email:</span>
                    <strong>{identity.email}</strong>
                  </div>

                  <div className="bx-iv-detail-row">
                    <span>Account Clearance:</span>
                    <strong style={{ color: "#15803d", textTransform: "uppercase" }}>
                      <FiShield size={12} /> {identity.role} (Active)
                    </strong>
                  </div>

                  <div className="bx-iv-detail-row">
                    <span>Assignment Date:</span>
                    <strong>
                      {new Date(identity.updatedAt || identity.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </strong>
                  </div>
                </div>

                <Link to="/" className="bx-iv-btn-home">
                  <FiHome /> Return to Corporate Portal
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default IdentityVerification;
