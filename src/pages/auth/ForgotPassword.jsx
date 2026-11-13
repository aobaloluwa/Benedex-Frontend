import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail, FiCheckCircle, FiLock, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import Logo from "../../assets/20260623_190807.png";

function ForgotPassword() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI Flow & status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // Step 1: Email submitted
  const [isResetComplete, setIsResetComplete] = useState(false); // Step 2: Code & New Password submitted

  // Step 1: Request 6-digit verification code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (forgotPassword) {
        await forgotPassword(email.trim());
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsCodeSent(true);
    } catch (err) {
      const backendMessage = err.message || err.response?.data?.message || "Server Error";
      setError(backendMessage);
      console.error("Password reset dispatch failure details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Code along with New Password to backend
  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      if (resetPassword) {
        // Passes code into parameter token block, password into body matching the controller
        const res = await resetPassword(code.trim(), password);
        setSuccessMsg(res?.message || "Password successfully updated!");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsResetComplete(true);
    } catch (err) {
      const backendMessage = err.message || err.response?.data?.message || "Failed to reset password.";
      setError(backendMessage);
      console.error("Password change sequence failure details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-shell">
      {/* Left Branding/Visual Panel */}
      <section className="login-visual-panel">
        <Link to="/" className="bx-nav-brand-group">
          <img src={Logo} alt="" className="bx-nav-logo2 d-flex" />
        </Link>

        <div className="login-visual-content">
          <span className="login-kicker">Account Security</span>
          <div className="login-message-card" style={{ marginTop: "22px" }}>
            <span className="login-message-tag">Password Recovery</span>
            <p className="login-message-title">
              Protecting your connection to digital excellence.
            </p>
          </div>
        </div>

        <p className="login-footnote">© 2026 Benedex Digital Hub. Built for African excellence.</p>
      </section>

      {/* Right Form Processing Panel */}
      <section className="login-form-panel">
        <motion.div
          className="login-form-card"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* STATE 1: Enter Email to Request Code */}
          {!isCodeSent && !isResetComplete && (
            <>
              <div className="login-form-header">
                <span className="login-form-eyebrow">Reset Password</span>
                <h1>No worries. We&apos;ll get you back on track.</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "10px", lineHeight: "1.5" }}>
                  Enter the email address tied to your account, and we will dispatch a 6-digit secure verification code.
                </p>
              </div>

              <form onSubmit={handleRequestCode} className="login-form">
                <label className="login-field">
                  <span>Email Address</span>
                  <div className="login-input-shell">
                    <FiMail />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="login-submit" disabled={loading}>
                  {loading ? (
                    <span className="login-spinner-row">
                      <span className="login-spinner" />
                      Sending Code...
                    </span>
                  ) : (
                    "Send Verification Code"
                  )}
                </button>
              </form>
            </>
          )}

          {/* STATE 2: Code Sent, Enter Verification Code & New Password Details */}
          {isCodeSent && !isResetComplete && (
            <>
              <div className="login-form-header">
                <span className="login-form-eyebrow" style={{ backgroundColor: "rgba(30, 132, 79, 0.1)", color: "#1E844F" }}>
                  Code Transmitted
                </span>
                <h1>Verify Identity</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "10px", lineHeight: "1.5" }}>
                  We sent a 6-digit confirmation code to <strong style={{ color: "#0f172a" }}>{email}</strong>. It expires tightly in 10 minutes.
                </p>
              </div>

              <form onSubmit={handleVerifyAndReset} className="login-form">
                <label className="login-field">
                  <span>Verification Code</span>
                  <div className="login-input-shell">
                    <FiShield />
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // Numbers only rule
                      required
                    />
                  </div>
                </label>

                <label className="login-field">
                  <span>New Password</span>
                  <div className="login-input-shell">
                    <FiLock />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </label>

                <label className="login-field">
                  <span>Confirm New Password</span>
                  <div className="login-input-shell">
                    <FiLock />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </label>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="login-submit" disabled={loading}>
                  {loading ? (
                    <span className="login-spinner-row">
                      <span className="login-spinner" />
                      Updating Password...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          )}

          {/* STATE 3: Final Success Message Overlay */}
          {isResetComplete && (
            <motion.div
              className="forgot-success-state"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center", padding: "10px 0" }}
            >
              <div style={{ fontSize: "3rem", color: "#1E844F", marginBottom: "16px", display: "grid", placeItems: "center" }}>
                <FiCheckCircle />
              </div>
              <div className="login-form-header" style={{ textAlign: "center" }}>
                <span className="login-form-eyebrow" style={{ justifyContent: "center", backgroundColor: "rgba(30, 132, 79, 0.1)", color: "#1E844F" }}>
                  Success
                </span>
                <h1 style={{ fontSize: "1.8rem" }}>Password Updated</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "12px", lineHeight: "1.5" }}>
                  {successMsg || "Your credentials have been successfully reset structure verified."}
                </p>
              </div>
              
              <button 
                onClick={() => navigate("/login")} 
                className="login-submit" 
                style={{ marginTop: "24px", cursor: "pointer" }}
              >
                Proceed to Sign In
              </button>
            </motion.div>
          )}

          {/* Bottom Nav Footer */}
          {!isResetComplete && (
            <>
              <div className="login-divider" style={{ margin: "32px 0 20px" }} />
              <p className="login-switch">
                <Link to="/login" className="login-link-button" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <FiArrowLeft /> Back to Sign In
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </section>
    </main>
  );
}

export default ForgotPassword;