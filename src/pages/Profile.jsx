import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import {
  FiUser,
  FiMail,
  FiShield,
  FiKey,
  FiCamera,
  FiCheckCircle,
  FiAlertCircle,
  FiLogOut,
  FiGrid,
  FiEdit3,
  FiEye,
  FiEyeOff,
  FiAward,
  FiZap,
  FiActivity,
  FiX,
  FiCheck,
  FiBookOpen,
  FiLock
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState("general"); // 'general' | 'security' | 'activity'
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Profile Edit State
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

  // Password Security Form State
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Sync user state on load
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  // Fetch fresh profile data from backend
  useEffect(() => {
    let isMounted = true;
    const fetchFreshProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        if (isMounted && res.data) {
          updateUser(res.data);
          setFullName(res.data.fullName || "");
          setProfileImage(res.data.profileImage || "");
        }
      } catch (err) {
        console.log("Profile refresh sync:", err);
      }
    };
    fetchFreshProfile();
    return () => { isMounted = false; };
  }, []);

  const showBanner = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4000);
  };

  // Back to Dashboard routing
  const handleBackToDashboard = () => {
    const targetRole = user?.role || "student";
    if (targetRole === "admin") navigate("/admin");
    else if (targetRole === "instructor") navigate("/instructor");
    else navigate("/student");
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // Update Profile (Name & Avatar)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showBanner("error", "Full name cannot be empty.");
      return;
    }

    setProfileLoading(true);
    try {
      const res = await API.put("/auth/update-profile", {
        fullName: fullName.trim(),
        profileImage
      });

      if (res.data?.user) {
        updateUser(res.data.user);
      } else {
        updateUser({ fullName: fullName.trim(), profileImage });
      }

      showBanner("success", "Profile details updated successfully!");
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Avatar Change from Modal
  const handleSaveAvatar = async () => {
    const finalUrl = tempImageUrl.trim();
    setProfileImage(finalUrl);
    setIsEditingAvatar(false);

    setProfileLoading(true);
    try {
      const res = await API.put("/auth/update-profile", {
        fullName,
        profileImage: finalUrl
      });
      if (res.data?.user) {
        updateUser(res.data.user);
      } else {
        updateUser({ profileImage: finalUrl });
      }
      showBanner("success", "Profile picture updated successfully!");
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to update profile picture.");
    } finally {
      setProfileLoading(false);
    }
  };

  // File to Base64 Avatar Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showBanner("error", "Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showBanner("error", "New passwords do not match.");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showBanner("error", "New password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await API.put("/auth/update-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      showBanner("success", "Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      showBanner(
        "error",
        err.response?.data?.message || "Failed to update password. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Trigger Forgot Password Code Dispatch
  const handleTriggerResetToken = async () => {
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email: user?.email });
      showBanner(
        "success",
        "A password verification code has been dispatched to your email address."
      );
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Could not send verification email.");
    } finally {
      setLoading(false);
    }
  };

  const userRole = user?.role || "student";
  const userInitials = (user?.fullName || "B")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bx-profile-wrapper">
      {/* HERO COVER HEADER CARD */}
      <div className="bx-profile-hero">
        <div className="bx-profile-hero-bg" />

        <div className="bx-profile-hero-content">
          <div className="bx-profile-avatar-container">
            {profileImage ? (
              <img src={profileImage} alt={user?.fullName} className="bx-profile-avatar-img" />
            ) : (
              <div className="bx-profile-avatar-fallback">{userInitials}</div>
            )}
            <button
              type="button"
              className="bx-profile-avatar-badge"
              onClick={() => {
                setTempImageUrl(profileImage);
                setIsEditingAvatar(true);
              }}
              title="Change Profile Photo"
            >
              <FiCamera />
            </button>
          </div>

          <div className="bx-profile-hero-info">
            <div className="bx-profile-name-row">
              <h2>{user?.fullName || "Benedex Member"}</h2>
              <span className={`bx-profile-role-pill role-${userRole}`}>
                <FiShield /> {userRole}
              </span>
            </div>
            <p className="bx-profile-email">
              <FiMail /> {user?.email || "user@benedex.org"}
            </p>
          </div>

          <div className="bx-profile-hero-actions">
            <button type="button" className="bx-btn-dashboard" onClick={handleBackToDashboard}>
              <FiGrid /> Return to Dashboard
            </button>
            <button type="button" className="bx-btn-logout" onClick={handleSignOut}>
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>

        {/* HERO STATS BAR */}
        <div className="bx-profile-stats-bar">
          <div className="bx-stat-item">
            <span className="bx-stat-label">Account Status</span>
            <span className="bx-stat-value status-active">
              <span className="status-dot" /> Active
            </span>
          </div>
          <div className="bx-stat-item">
            <span className="bx-stat-label">Role Privilege</span>
            <span className="bx-stat-value text-capitalize">{userRole} Access</span>
          </div>
          {user?.xp !== undefined && (
            <div className="bx-stat-item">
              <span className="bx-stat-label">Total Experience</span>
              <span className="bx-stat-value">
                <FiZap className="icon-gold" /> {user.xp} XP
              </span>
            </div>
          )}
          <div className="bx-stat-item">
            <span className="bx-stat-label">Security Tier</span>
            <span className="bx-stat-value text-success">
              <FiCheckCircle /> Verified
            </span>
          </div>
        </div>
      </div>

      {/* ALERT FEEDBACK TOAST */}
      <AnimatePresence>
        {feedback.message && (
          <motion.div
            className={`bx-profile-alert alert-${feedback.type}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {feedback.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{feedback.message}</span>
            <button className="bx-alert-close" onClick={() => setFeedback({ type: "", message: "" })}>
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BODY GRID LAYOUT */}
      <div className="bx-profile-body-grid">
        {/* SIDEBAR NAVIGATION TABS */}
        <aside className="bx-profile-nav-card">
          <button
            type="button"
            className={`bx-profile-nav-item ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <FiUser className="nav-icon" />
            <div className="nav-text">
              <strong>Personal Information</strong>
              <span>Name, photo & contact details</span>
            </div>
          </button>

          <button
            type="button"
            className={`bx-profile-nav-item ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <FiShield className="nav-icon" />
            <div className="nav-text">
              <strong>Security & Password</strong>
              <span>Password, auth & recovery</span>
            </div>
          </button>

          <button
            type="button"
            className={`bx-profile-nav-item ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            <FiActivity className="nav-icon" />
            <div className="nav-text">
              <strong>Account & Capabilities</strong>
              <span>Role overview & privileges</span>
            </div>
          </button>
        </aside>

        {/* MAIN PANEL CONTENT VIEWS */}
        <main className="bx-profile-panel-card">
          {/* TAB 1: GENERAL PERSONAL INFORMATION */}
          {activeTab === "general" && (
            <motion.div
              className="bx-profile-tab-content"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bx-panel-header">
                <div>
                  <h3>Personal Information</h3>
                  <p>Manage your account profile details and display preferences.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="bx-profile-form">
                <div className="form-group">
                  <label htmlFor="fullName">
                    <FiUser /> Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                  <span className="form-hint">This name will appear across your courses, certificates, and dashboard.</span>
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FiMail /> Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="input-disabled"
                  />
                  <span className="form-hint">Email address is tied to your primary authentication account.</span>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>
                      <FiShield /> Account Role
                    </label>
                    <div className="role-read-badge text-capitalize">{userRole} Account</div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiCheckCircle /> Verification Status
                    </label>
                    <div className="verification-status-badge">
                      <FiCheck /> Active & Verified
                    </div>
                  </div>
                </div>

                {user?.googleId && (
                  <div className="bx-social-connected-box">
                    <div className="social-icon-circle">⚡</div>
                    <div>
                      <strong>Google Single Sign-On Active</strong>
                      <p>Your account is linked to Google authentication for easy 1-click access.</p>
                    </div>
                  </div>
                )}

                <div className="bx-form-actions">
                  <button type="submit" className="bx-btn-primary" disabled={profileLoading}>
                    {profileLoading ? "Saving Changes..." : <><FiEdit3 /> Save Profile Changes</>}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* TAB 2: SECURITY & PASSWORD */}
          {activeTab === "security" && (
            <motion.div
              className="bx-profile-tab-content"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bx-panel-header">
                <div>
                  <h3>Security & Password</h3>
                  <p>Ensure your account remains safe with strong credentials.</p>
                </div>
              </div>

              {user?.googleId && !user?.password ? (
                <div className="bx-google-sec-box">
                  <div className="google-sec-icon">
                    <FiKey />
                  </div>
                  <div>
                    <h4>Using Google Authentication</h4>
                    <p>
                      You currently log in using Google OAuth. If you would like to set up a local password for your account, trigger the email verification sequence below.
                    </p>
                    <button
                      type="button"
                      className="bx-btn-secondary"
                      onClick={handleTriggerResetToken}
                      disabled={loading}
                    >
                      {loading ? "Dispatching Email..." : <><FiKey /> Set Up Local Password</>}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="bx-profile-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">
                      <FiLock /> Current Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        id="currentPassword"
                        type={showCurrentPw ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
                        }
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        tabIndex={-1}
                      >
                        {showCurrentPw ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-row-two">
                    <div className="form-group">
                      <label htmlFor="newPassword">
                        <FiKey /> New Password
                      </label>
                      <div className="password-input-wrapper">
                        <input
                          id="newPassword"
                          type={showNewPw ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
                          }
                          placeholder="Min. 6 characters"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowNewPw(!showNewPw)}
                          tabIndex={-1}
                        >
                          {showNewPw ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <FiKey /> Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                        }
                        placeholder="Re-enter new password"
                        required
                      />
                    </div>
                  </div>

                  <div className="bx-form-actions-split">
                    <button type="submit" className="bx-btn-primary" disabled={loading}>
                      {loading ? "Updating Password..." : "Update System Password"}
                    </button>
                    <button
                      type="button"
                      className="bx-btn-link"
                      onClick={handleTriggerResetToken}
                      disabled={loading}
                    >
                      Send password reset email
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* TAB 3: ACCOUNT & CAPABILITIES */}
          {activeTab === "activity" && (
            <motion.div
              className="bx-profile-tab-content"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bx-panel-header">
                <div>
                  <h3>Account & Capabilities</h3>
                  <p>Overview of your platform permissions and learning achievements.</p>
                </div>
              </div>

              <div className="bx-capabilities-grid">
                <div className="capability-card">
                  <div className="cap-icon color-blue">
                    <FiShield />
                  </div>
                  <div>
                    <h4>Role Level: <span className="text-capitalize">{userRole}</span></h4>
                    <p>
                      {userRole === "admin"
                        ? "Full administrative system permissions, user management, course audits, and site configuration."
                        : userRole === "instructor"
                        ? "Authoring tools, course management, live streams, student grading, and syllabus tools."
                        : "Access to enrolled courses, live interactive classes, assignments, and certified learning paths."}
                    </p>
                  </div>
                </div>

                <div className="capability-card">
                  <div className="cap-icon color-green">
                    <FiAward />
                  </div>
                  <div>
                    <h4>Gamification & Progress</h4>
                    <p>
                      Earned Points: <strong>{user?.xp || 0} XP</strong>
                    </p>
                    <p>
                      Unlocked Badges: <strong>{user?.badges?.length || 0} Badges</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bx-quick-navigation-box">
                <h4>Quick Workspace Shortcuts</h4>
                <div className="quick-links-row">
                  <button type="button" className="bx-shortcut-btn" onClick={handleBackToDashboard}>
                    <FiGrid /> Go to Dashboard
                  </button>
                  {userRole === "student" && (
                    <button type="button" className="bx-shortcut-btn" onClick={() => navigate("/student/courses")}>
                      <FiBookOpen /> My Enrolled Courses
                    </button>
                  )}
                  {userRole === "instructor" && (
                    <button type="button" className="bx-shortcut-btn" onClick={() => navigate("/instructor/courses")}>
                      <FiBookOpen /> Manage Courses
                    </button>
                  )}
                  {userRole === "admin" && (
                    <button type="button" className="bx-shortcut-btn" onClick={() => navigate("/admin/users")}>
                      <FiUser /> Users Directory
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* AVATAR EDIT MODAL */}
      <AnimatePresence>
        {isEditingAvatar && (
          <motion.div
            className="bx-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditingAvatar(false)}
          >
            <motion.div
              className="bx-modal-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bx-modal-header">
                <h3>Update Profile Photo</h3>
                <button className="bx-modal-close" onClick={() => setIsEditingAvatar(false)}>
                  <FiX />
                </button>
              </div>

              <div className="bx-modal-body">
                <div className="avatar-preview-box">
                  {tempImageUrl ? (
                    <img src={tempImageUrl} alt="Preview" className="avatar-preview-img" />
                  ) : (
                    <div className="avatar-preview-fallback">{userInitials}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="avatar-upload-divider">
                  <span>OR UPLOAD IMAGE</span>
                </div>

                <div className="form-group">
                  <label htmlFor="avatar-file" className="file-upload-btn">
                    <FiCamera /> Choose Image File (Max 2MB)
                  </label>
                  <input
                    id="avatar-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="bx-modal-footer">
                <button
                  type="button"
                  className="bx-btn-secondary"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bx-btn-primary"
                  onClick={handleSaveAvatar}
                  disabled={profileLoading}
                >
                  {profileLoading ? "Saving..." : "Save Picture"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;