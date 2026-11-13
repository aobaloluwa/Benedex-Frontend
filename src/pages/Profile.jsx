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
  FiEye,
  FiEyeOff,
  FiAward,
  FiZap,
  FiActivity,
  FiX,
  FiCheck,
  FiBookOpen,
  FiLock,
  FiSave,
  FiSettings
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

  // Profile Form States
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

  // Password Security Form States
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  // Sync profile details on load
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

  // Update Name & Avatar
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

  // Avatar Modal Save
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
      showBanner("success", "Profile photo updated successfully!");
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to update profile photo.");
    } finally {
      setProfileLoading(false);
    }
  };

  // File Upload to Data URI
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showBanner("error", "Image file must be smaller than 2MB.");
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
      showBanner("error", "New password must be at least 6 characters.");
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
        err.response?.data?.message || "Failed to update password. Verify current credentials."
      );
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bx-profile-container">
      {/* PAGE HEADER STRIP */}
      <header className="bx-profile-header mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bx-profile-icon-box">
              <FiUser size={24} />
              <span className="bx-profile-pulse-light" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="h3 mb-0 font-weight-bold text-dark">User Account & Profile</h1>
                <span className="bx-profile-ver-badge">{userRole} Node</span>
              </div>
              <p className="text-muted mb-0 small">
                Manage your identity credentials, profile photo, and password security.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button type="button" className="bx-profile-btn-dash" onClick={handleBackToDashboard}>
              <FiGrid /> Go to Dashboard
            </button>
            <button type="button" className="bx-profile-btn-logout" onClick={handleSignOut}>
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* FEEDBACK TOAST */}
      <AnimatePresence>
        {feedback.message && (
          <motion.div
            className={`alert alert-${feedback.type === "success" ? "success" : "danger"} d-flex align-items-center gap-2 mb-4 bx-profile-toast`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
            <span className="small">{feedback.message}</span>
            <button className="btn-close ms-auto" onClick={() => setFeedback({ type: "", message: "" })} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* IDENTITY SUMMARY HERO CARD */}
      <div className="bx-profile-hero-card mb-4">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <div className="bx-profile-avatar-wrapper">
            {profileImage ? (
              <img src={profileImage} alt={user?.fullName} className="bx-profile-avatar-img" />
            ) : (
              <div className="bx-profile-avatar-fallback">{userInitials}</div>
            )}
            <button
              type="button"
              className="bx-profile-avatar-edit-badge"
              onClick={() => {
                setTempImageUrl(profileImage);
                setIsEditingAvatar(true);
              }}
              title="Change Profile Photo"
            >
              <FiCamera />
            </button>
          </div>

          <div className="bx-profile-hero-meta">
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <h2 className="h4 mb-0 text-white font-weight-bold">{user?.fullName || "Benedex Member"}</h2>
              <span className={`bx-profile-role-tag role-${userRole}`}>
                <FiShield size={12} /> {userRole}
              </span>
            </div>
            <p className="text-white-50 mb-0 small d-flex align-items-center gap-2">
              <FiMail /> {user?.email || "user@benedex.org"}
            </p>
          </div>

          <div className="ms-auto d-flex align-items-center gap-3 bx-profile-hero-stats">
            <div className="bx-profile-stat-box">
              <span className="bx-profile-stat-label">Status</span>
              <span className="bx-profile-stat-val text-success">
                <span className="bx-profile-dot-green" /> Active
              </span>
            </div>
            {user?.xp !== undefined && (
              <div className="bx-profile-stat-box">
                <span className="bx-profile-stat-label">XP Points</span>
                <span className="bx-profile-stat-val text-warning">
                  <FiZap /> {user.xp} XP
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE GRID */}
      <div className="row g-4">
        {/* LEFT COLUMN: NAVIGATION TABS */}
        <div className="col-12 col-lg-4 col-xl-3">
          <div className="bx-profile-card">
            <div className="bx-profile-nav-list">
              <button
                type="button"
                className={`bx-profile-nav-btn ${activeTab === "general" ? "active" : ""}`}
                onClick={() => setActiveTab("general")}
              >
                <FiUser className="nav-btn-icon" />
                <div className="text-start">
                  <span className="d-block font-weight-bold small">Personal Information</span>
                  <span className="extra-small text-muted d-block">Name, email & profile photo</span>
                </div>
              </button>

              <button
                type="button"
                className={`bx-profile-nav-btn ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <FiShield className="nav-btn-icon" />
                <div className="text-start">
                  <span className="d-block font-weight-bold small">Security & Password</span>
                  <span className="extra-small text-muted d-block">System password & auth reset</span>
                </div>
              </button>

              <button
                type="button"
                className={`bx-profile-nav-btn ${activeTab === "activity" ? "active" : ""}`}
                onClick={() => setActiveTab("activity")}
              >
                <FiActivity className="nav-btn-icon" />
                <div className="text-start">
                  <span className="d-block font-weight-bold small">Account Capabilities</span>
                  <span className="extra-small text-muted d-block">Role privileges & shortcuts</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TAB CONTENT PANEL */}
        <div className="col-12 col-lg-8 col-xl-9">
          <div className="bx-profile-card">
            {/* TAB 1: PERSONAL INFORMATION */}
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="bx-profile-card-header mb-4">
                  <h2 className="h5 mb-1 font-weight-bold text-dark">Personal Information</h2>
                  <p className="text-muted small mb-0">Update your account display name and photo.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="d-flex flex-column gap-3">
                  <div className="bx-profile-field-group">
                    <label className="bx-profile-label">Full Name</label>
                    <div className="bx-profile-input-wrapper">
                      <FiUser className="bx-profile-field-icon" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="bx-profile-field-group">
                    <label className="bx-profile-label">Email Address (Read-Only)</label>
                    <div className="bx-profile-input-wrapper">
                      <FiMail className="bx-profile-field-icon" />
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-light"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mt-1">
                    <div className="col-12 col-md-6">
                      <div className="bx-profile-field-group">
                        <label className="bx-profile-label">Account Role</label>
                        <div className="bx-profile-read-badge text-capitalize">
                          <FiShield className="text-primary-theme" /> {userRole} Profile
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="bx-profile-field-group">
                        <label className="bx-profile-label">Security Tier</label>
                        <div className="bx-profile-read-badge text-success">
                          <FiCheckCircle /> Active & Verified
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.googleId && (
                    <div className="bx-profile-social-notice p-3 rounded mt-2">
                      <div className="d-flex align-items-start gap-3">
                        <span className="badge bg-primary rounded-circle p-2 text-white">
                          <FiZap size={14} />
                        </span>
                        <div>
                          <strong className="d-block text-dark small">Google Single Sign-On Active</strong>
                          <span className="text-muted extra-small">
                            Your authentication credentials are signed and verified directly via Google OAuth.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-end mt-3 pt-3 border-top">
                    <button
                      type="submit"
                      className="bx-profile-btn-submit"
                      disabled={profileLoading}
                    >
                      {profileLoading ? (
                        <span>Saving...</span>
                      ) : (
                        <>
                          <FiSave />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB 2: SECURITY & PASSWORD */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="bx-profile-card-header mb-4">
                  <h2 className="h5 mb-1 font-weight-bold text-dark">Security & Password</h2>
                  <p className="text-muted small mb-0">Update your access password and security settings.</p>
                </div>

                {user?.googleId && !user?.password ? (
                  <div className="p-3 bg-light rounded border">
                    <h3 className="h6 font-weight-bold text-dark mb-2">Google Single Sign-On Active</h3>
                    <p className="text-muted small mb-3">
                      You currently log in using Google Auth. If you want to set up a local password, trigger the password reset verification sequence below.
                    </p>
                    <button
                      type="button"
                      className="bx-profile-btn-outline"
                      onClick={handleTriggerResetToken}
                      disabled={loading}
                    >
                      <FiKey /> {loading ? "Sending..." : "Set Up Local Password"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdatePassword} className="d-flex flex-column gap-3">
                    <div className="bx-profile-field-group">
                      <label className="bx-profile-label">Current Password</label>
                      <div className="bx-profile-input-wrapper">
                        <FiLock className="bx-profile-field-icon" />
                        <input
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
                          className="bx-profile-pw-toggle"
                          onClick={() => setShowCurrentPw(!showCurrentPw)}
                        >
                          {showCurrentPw ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <div className="bx-profile-field-group">
                          <label className="bx-profile-label">New Password</label>
                          <div className="bx-profile-input-wrapper">
                            <FiKey className="bx-profile-field-icon" />
                            <input
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
                              className="bx-profile-pw-toggle"
                              onClick={() => setShowNewPw(!showNewPw)}
                            >
                              {showNewPw ? <FiEyeOff /> : <FiEye />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="bx-profile-field-group">
                          <label className="bx-profile-label">Confirm New Password</label>
                          <div className="bx-profile-input-wrapper">
                            <FiKey className="bx-profile-field-icon" />
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                              }
                              placeholder="Re-enter password"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3 pt-3 border-top">
                      <button
                        type="submit"
                        className="bx-profile-btn-submit"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update Password"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-link text-decoration-none small text-primary p-0"
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
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="bx-profile-card-header mb-4">
                  <h2 className="h5 mb-1 font-weight-bold text-dark">Account Capabilities</h2>
                  <p className="text-muted small mb-0">Overview of your role privileges and system shortcuts.</p>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded border bg-light">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FiShield className="text-primary-theme" size={20} />
                        <h3 className="h6 mb-0 font-weight-bold text-capitalize">{userRole} Account</h3>
                      </div>
                      <p className="text-muted extra-small mb-0">
                        {userRole === "admin"
                          ? "Administrative privileges across analytics, user management, payments, and site settings."
                          : userRole === "instructor"
                          ? "Course creation, assignment grading, student live classes, and lesson management."
                          : "Full access to enrolled courses, live learning rooms, assignments, and certificates."}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded border bg-light">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <FiAward className="text-success" size={20} />
                        <h3 className="h6 mb-0 font-weight-bold">Achievements</h3>
                      </div>
                      <p className="text-muted extra-small mb-1">
                        Total XP: <strong>{user?.xp || 0} XP</strong>
                      </p>
                      <p className="text-muted extra-small mb-0">
                        Badges: <strong>{user?.badges?.length || 0} Earned</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded border">
                  <h3 className="h6 font-weight-bold mb-3">Workspace Shortcuts</h3>
                  <div className="d-flex gap-2 flex-wrap">
                    <button type="button" className="bx-profile-shortcut-btn" onClick={handleBackToDashboard}>
                      <FiGrid /> Main Dashboard
                    </button>
                    {userRole === "student" && (
                      <button type="button" className="bx-profile-shortcut-btn" onClick={() => navigate("/student/courses")}>
                        <FiBookOpen /> My Courses
                      </button>
                    )}
                    {userRole === "instructor" && (
                      <button type="button" className="bx-profile-shortcut-btn" onClick={() => navigate("/instructor/courses")}>
                        <FiBookOpen /> Manage Courses
                      </button>
                    )}
                    {userRole === "admin" && (
                      <button type="button" className="bx-profile-shortcut-btn" onClick={() => navigate("/admin/users")}>
                        <FiUser /> Manage Users
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* AVATAR EDIT MODAL */}
      <AnimatePresence>
        {isEditingAvatar && (
          <motion.div
            className="bx-profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditingAvatar(false)}
          >
            <motion.div
              className="bx-profile-modal-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bx-profile-modal-header">
                <h3 className="h6 mb-0 font-weight-bold text-dark">Update Profile Photo</h3>
                <button type="button" className="btn-close" onClick={() => setIsEditingAvatar(false)} />
              </div>

              <div className="bx-profile-modal-body">
                <div className="text-center mb-3">
                  {tempImageUrl ? (
                    <img src={tempImageUrl} alt="Preview" className="bx-profile-avatar-img mx-auto" />
                  ) : (
                    <div className="bx-profile-avatar-fallback mx-auto">{userInitials}</div>
                  )}
                </div>

                <div className="bx-profile-field-group mb-3">
                  <label className="bx-profile-label">Image URL</label>
                  <input
                    type="url"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="text-center text-muted extra-small mb-2">— OR —</div>

                <label htmlFor="modal-avatar-file" className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
                  <FiCamera /> Choose Image File (Max 2MB)
                </label>
                <input
                  id="modal-avatar-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </div>

              <div className="bx-profile-modal-footer">
                <button
                  type="button"
                  className="btn btn-light btn-sm font-weight-bold"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bx-profile-btn-submit btn-sm"
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