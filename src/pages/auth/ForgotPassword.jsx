import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail, FiCheckCircle, FiLock, FiShield, FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";
import Logo from "../../assets/20260623_190807.png";

function ForgotPassword() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Wizard Step: 1 = Email Input, 2 = 6-Digit OTP Code, 3 = New Password, 4 = Success
  const [step, setStep] = useState(1);

  // Form states
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown timer & status
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const otpRefs = useRef([]);

  // 60-second countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Step 1: Request 6-digit verification code
  const handleRequestCode = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (forgotPassword) {
        await forgotPassword(email.trim());
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStep(2);
      setCountdown(60); // Start 1-minute countdown
    } catch (err) {
      const backendMessage = err.message || err.response?.data?.message || "Server Error";
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // Step 2 OTP Box Input Handlers
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1); // Single digit only
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setError("");

    // Auto-focus next input box if a digit is entered
    if (digit && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous box on Backspace if current is empty
    if (e.key === "Backspace" && !otpDigits[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newDigits = ["", "", "", "", "", ""];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setOtpDigits(newDigits);

    const targetIdx = Math.min(pastedData.length, 5);
    if (otpRefs.current[targetIdx]) {
      otpRefs.current[targetIdx].focus();
    }
  };

  // Step 2 Confirm OTP & Proceed to Password
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");

    const fullCode = otpDigits.join("");
    if (fullCode.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setStep(3); // Advance to New Password step
  };

  // Step 3 Submit Code & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const fullCode = otpDigits.join("");

    try {
      if (resetPassword) {
        const res = await resetPassword(fullCode.trim(), password);
        setSuccessMsg(res?.message || "Password successfully updated!");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStep(4); // Advance to Success step
    } catch (err) {
      const backendMessage = err.message || err.response?.data?.message || "Failed to reset password. Verify the code.";
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-shell">
      {/* Left Branding Panel */}
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
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <>
              <div className="login-form-header">
                <span className="login-form-eyebrow">Reset Password</span>
                <h1>No worries. We&apos;ll get you back on track.</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "10px", lineHeight: "1.5" }}>
                  Enter your email address and we will dispatch a 6-digit secure verification code.
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

          {/* STEP 2: 6-Digit OTP Code Inputs with Resend Timer */}
          {step === 2 && (
            <>
              <div className="login-form-header">
                <span className="login-form-eyebrow" style={{ backgroundColor: "rgba(30, 132, 79, 0.1)", color: "#1E844F" }}>
                  Step 2 of 3 • Code Sent
                </span>
                <h1>Enter 6-Digit Code</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "10px", lineHeight: "1.5" }}>
                  We sent a 6-digit verification code to <strong style={{ color: "#0f172a" }}>{email}</strong>.
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="login-form">
                <label className="login-field">
                  <span className="d-flex justify-content-between align-items-center">
                    <span>Verification Code</span>
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none p-0 extra-small"
                      style={{ color: countdown > 0 ? "#94a3b8" : "#07335c", fontWeight: 600, cursor: countdown > 0 ? "not-allowed" : "pointer" }}
                      disabled={countdown > 0 || loading}
                      onClick={() => handleRequestCode()}
                    >
                      <FiRefreshCw className={loading ? "bx-as-spin" : ""} style={{ marginRight: 4 }} />
                      {countdown > 0 ? `Resend Code in ${countdown}s` : "Resend Code"}
                    </button>
                  </span>

                  {/* 6 RECTANGLE OTP DIGIT BOXES */}
                  <div className="otp-boxes-container mt-2 mb-2" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-digit-box"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                </label>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="login-submit" disabled={otpDigits.join("").length < 6}>
                  Confirm Code
                </button>
              </form>
            </>
          )}

          {/* STEP 3: Enter New Password & Confirm Password */}
          {step === 3 && (
            <>
              <div className="login-form-header">
                <span className="login-form-eyebrow" style={{ backgroundColor: "rgba(30, 132, 79, 0.1)", color: "#1E844F" }}>
                  Step 3 of 3 • Code Verified
                </span>
                <h1>Create New Password</h1>
                <p style={{ color: "#6b7280", fontSize: "0.92rem", marginTop: "10px", lineHeight: "1.5" }}>
                  Enter your new password to secure your account.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="login-form">
                <label className="login-field">
                  <span>New Password</span>
                  <div className="login-input-shell">
                    <FiLock />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", position: "absolute", right: 12 }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </label>

                <label className="login-field">
                  <span>Confirm New Password</span>
                  <div className="login-input-shell">
                    <FiLock />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                      style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", position: "absolute", right: 12 }}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
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

          {/* STEP 4: Success Message Screen */}
          {step === 4 && (
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
                  {successMsg || "Your password has been successfully reset."}
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
          {step < 4 && (
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