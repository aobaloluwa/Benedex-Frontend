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
  FiSettings,
  FiUsers,
  FiClipboard,
  FiPlayCircle,
  FiDollarSign,
  FiCpu,
  FiClock,
  FiUploadCloud,
  FiPrinter,
  FiCreditCard,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/20260623_190852.png";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState("general"); // 'general' | 'security' | 'activity' | 'idCard'
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Role Summary Metrics
  const [roleMetrics, setRoleMetrics] = useState({
    coursesCount: 0,
    submissionsCount: 0,
    unreadNotifications: 0,
  });

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
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  // Fetch fresh profile data & metrics on load
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

    const fetchRoleMetrics = async () => {
      const currentRole = user?.role || "student";

      try {
        if (currentRole === "student") {
          const res = await API.get("/dashboard/student");

          if (isMounted && res.data) {
            setRoleMetrics({
              coursesCount: res.data.enrolledCourses?.length || 0,
              submissionsCount: res.data.submissions?.length || 0,
              unreadNotifications: res.data.unreadActivityCount || 0,
            });
          }
        } else if (currentRole === "instructor") {
          const res = await API.get("/dashboard/instructor");

          if (isMounted && res.data) {
            setRoleMetrics({
              coursesCount: res.data.myCoursesCount || 0,
              submissionsCount: res.data.pendingSubmissions || 0,
              unreadNotifications: res.data.unreadActivityCount || 0,
            });
          }
        } else if (currentRole === "admin" || currentRole === "superadmin") {
          const res = await API.get("/admin/analytics");

          if (isMounted && res.data?.overview) {
            setRoleMetrics({
              coursesCount: res.data.overview.totalCourses || 0,
              submissionsCount: res.data.overview.totalStudents || 0,
              unreadNotifications: res.data.overview.pendingSubmissions || 0,
            });
          }
        }
      } catch (error) {
        console.log("Role metrics fetch:", error);
      }
    };

    fetchFreshProfile();
    fetchRoleMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  const showBanner = (type, message) => {
    setFeedback({ type, message });

    setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4000);
  };

  const handleBackToDashboard = () => {
    const targetRole = user?.role || "student";

    if (targetRole === "admin" || targetRole === "superadmin") {
      navigate("/admin");
    } else if (targetRole === "instructor") {
      navigate("/instructor");
    } else {
      navigate("/student");
    }
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  // Update Profile Name & Avatar
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
        profileImage,
      });

      if (res.data?.user) {
        updateUser(res.data.user);
      } else {
        updateUser({ fullName: fullName.trim(), profileImage });
      }

      showBanner("success", "Profile details updated successfully!");
    } catch (err) {
      showBanner(
        "error",
        err.response?.data?.message || "Failed to update profile."
      );
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
        profileImage: finalUrl,
      });

      if (res.data?.user) {
        updateUser(res.data.user);
      } else {
        updateUser({ profileImage: finalUrl });
      }

      showBanner("success", "Profile photo updated successfully!");
    } catch (err) {
      showBanner(
        "error",
        err.response?.data?.message || "Failed to update profile photo."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

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

  // Password Update
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
        newPassword: passwordData.newPassword,
      });

      showBanner("success", "Password updated successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      showBanner(
        "error",
        err.response?.data?.message ||
          "Failed to update password. Verify current credentials."
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
      showBanner(
        "error",
        err.response?.data?.message || "Could not send verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  const userRole = user?.role || "student";

  const issueDateFormatted = (user?.updatedAt || user?.createdAt)
    ? new Date(user.updatedAt || user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "January 1, 2026";

  const publicVerifyUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify-identity/${user?._id || "892014"}`
    : `https://benedex-frontend.onrender.com/verify-identity/${user?._id || "892014"}`;

  const realQrCodeImg = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(publicVerifyUrl)}`;

  const getAvatarUrl = (img) => {
    if (img && typeof img === "string" && img.trim() !== "") {
      return img.trim();
    }
    if (user?.profileImage && typeof user.profileImage === "string" && user.profileImage.trim() !== "") {
      return user.profileImage.trim();
    }
    const name = encodeURIComponent(user?.fullName || "Member");
    return `https://ui-avatars.com/api/?name=${name}&background=07335c&color=fff&size=128&bold=true`;
  };

  const userInitials = (user?.fullName || "B")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="prf-workspace">
      <div className="prf-container">
        {/* PAGE HEADER */}
        <header className="prf-page-header">
          <div className="prf-header-main">
            <div className="prf-header-icon">
              <FiUser />
            </div>

            <div className="prf-header-content">
              <span className="prf-eyebrow">Account & Settings</span>
              <h1>My Profile Architecture</h1>
              <p>Manage your account credentials, security preferences, and role privileges.</p>
            </div>
          </div>

          <div className="prf-header-actions">
            <button
              type="button"
              className="prf-header-btn-dash"
              onClick={handleBackToDashboard}
            >
              <FiGrid />
              <span>Go to Dashboard</span>
            </button>

            <button
              type="button"
              className="prf-header-btn-logout"
              onClick={handleSignOut}
            >
              <FiLogOut />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* FEEDBACK ALERT */}
        <AnimatePresence>
          {feedback.message && (
            <motion.div
              className={`prf-alert prf-alert-${
                feedback.type === "success" ? "success" : "error"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="prf-alert-icon">
                {feedback.type === "success" ? (
                  <FiCheckCircle />
                ) : (
                  <FiAlertCircle />
                )}
              </div>

              <span>{feedback.message}</span>

              <button
                className="prf-alert-close"
                onClick={() => setFeedback({ type: "", message: "" })}
              >
                <FiX />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUMMARY METRICS CARDS GRID */}
        <div className="prf-summary-grid">
          <div className="prf-summary-card">
            <div className="prf-summary-icon prf-summary-icon-green">
              <FiCheckCircle />
            </div>

            <div className="prf-summary-info">
              <span>Account Status</span>
              <strong>Active & Verified</strong>
            </div>
          </div>

          <div className="prf-summary-card">
            <div className="prf-summary-icon prf-summary-icon-blue">
              <FiShield />
            </div>

            <div className="prf-summary-info">
              <span>Access Level</span>
              <strong style={{ textTransform: "capitalize" }}>{userRole} Tier</strong>
            </div>
          </div>

          {userRole === "student" && (
            <>
              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-blue">
                  <FiBookOpen />
                </div>

                <div className="prf-summary-info">
                  <span>Enrolled Courses</span>
                  <strong>{roleMetrics.coursesCount} Courses</strong>
                </div>
              </div>

              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-warning">
                  <FiZap />
                </div>

                <div className="prf-summary-info">
                  <span>XP Progress</span>
                  <strong>{user?.xp || 0} XP</strong>
                </div>
              </div>
            </>
          )}

          {userRole === "instructor" && (
            <>
              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-purple">
                  <FiBookOpen />
                </div>

                <div className="prf-summary-info">
                  <span>Authored Courses</span>
                  <strong>{roleMetrics.coursesCount} Courses</strong>
                </div>
              </div>

              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-warning">
                  <FiClipboard />
                </div>

                <div className="prf-summary-info">
                  <span>Grading Queue</span>
                  <strong>{roleMetrics.submissionsCount} Pending</strong>
                </div>
              </div>
            </>
          )}

          {(userRole === "admin" || userRole === "superadmin") && (
            <>
              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-blue">
                  <FiUsers />
                </div>

                <div className="prf-summary-info">
                  <span>Managed Users</span>
                  <strong>{roleMetrics.submissionsCount} Directory</strong>
                </div>
              </div>

              <div className="prf-summary-card">
                <div className="prf-summary-icon prf-summary-icon-green">
                  <FiBookOpen />
                </div>

                <div className="prf-summary-info">
                  <span>Total Courses</span>
                  <strong>{roleMetrics.coursesCount} Courses</strong>
                </div>
              </div>
            </>
          )}
        </div>

        {/* MAIN CONTENT WORKSPACE GRID (MAIN FORM + RIGHT SIDEBAR) */}
        <div className="prf-content-layout">
          {/* LEFT COLUMN: MAIN WORKSPACE FORM CARD */}
          <main className="prf-main-content">
            <div className="prf-card">
              {/* SECTION HEADER */}
              <div className="prf-section-header">
                <div>
                  <span className="prf-section-eyebrow">
                    {activeTab === "general" && "Personal Settings"}
                    {activeTab === "security" && "Security Matrix"}
                    {activeTab === "activity" && "Permissions & Shortcuts"}
                  </span>

                  <h2>
                    {activeTab === "general" && "Personal Information"}
                    {activeTab === "security" && "Account Security & Credentials"}
                    {activeTab === "activity" && `Role Privileges (${userRole.toUpperCase()})`}
                  </h2>

                  <p>
                    {activeTab === "general" &&
                      "Update your public display name and avatar profile image."}
                    {activeTab === "security" &&
                      "Manage your password authentication credentials and recovery methods."}
                    {activeTab === "activity" &&
                      "Overview of system capabilities and shortcuts configured for your account tier."}
                  </p>
                </div>

                <div className="prf-section-icon">
                  {activeTab === "general" && <FiUser />}
                  {activeTab === "security" && <FiKey />}
                  {activeTab === "activity" && <FiActivity />}
                </div>
              </div>

              {/* FORM BODY */}
              <div className="prf-form-body">
                {/* TAB 1: PERSONAL INFORMATION */}
                {activeTab === "general" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* AVATAR IDENTITY BANNER */}
                    <div className="prf-avatar-banner">
                      <div className="prf-avatar-wrapper">
                        <img
                          src={getAvatarUrl(profileImage || user?.profileImage)}
                          alt={user?.fullName || "Profile"}
                          className="prf-avatar-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.fullName || "Member"
                            )}&background=07335c&color=fff&size=128&bold=true`;
                          }}
                        />

                        <button
                          type="button"
                          className="prf-avatar-edit-btn"
                          onClick={() => {
                            setTempImageUrl(profileImage || user?.profileImage || "");
                            setIsEditingAvatar(true);
                          }}
                          title="Change Profile Photo"
                        >
                          <FiCamera />
                        </button>
                      </div>

                      <div className="prf-avatar-meta">
                        <h3>{user?.fullName || "Benedex Member"}</h3>
                        <p>{user?.email || "user@benedex.org"}</p>

                        <span className={`prf-role-badge prf-role-${userRole}`}>
                          <FiShield size={12} /> {userRole}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                      <div className="prf-form-group">
                        <label>Full Name</label>

                        <div className="prf-input-wrapper">
                          <FiUser className="prf-input-icon" />

                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full display name"
                            required
                          />
                        </div>
                      </div>

                      <div className="prf-form-group">
                        <label>Email Address (Read-Only)</label>

                        <div className="prf-input-wrapper">
                          <FiMail className="prf-input-icon" />

                          <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <div className="prf-form-group">
                            <label>System Clearance</label>

                            <div className="prf-read-box">
                              <FiShield style={{ color: "#07335c" }} />
                              <span style={{ textTransform: "capitalize" }}>
                                {userRole} Level Access
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="prf-form-group">
                            <label>Verification Tier</label>

                            <div className="prf-read-box" style={{ color: "#15803d" }}>
                              <FiCheckCircle />
                              <span>Verified Credentials</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {user?.googleId && (
                        <div
                          className="p-3 rounded border mt-2"
                          style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 9,
                                background: "#eaf3fb",
                                color: "#2e7fc1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <FiZap size={18} />
                            </div>

                            <div>
                              <strong
                                style={{
                                  display: "block",
                                  fontSize: 13,
                                  color: "#07335c",
                                }}
                              >
                                Google Single Sign-On Connected
                              </strong>

                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#5f6b7a",
                                }}
                              >
                                Your identity profile is cryptographically verified via Google OAuth.
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="prf-submit-section">
                        <div className="d-flex align-items-center gap-2" style={{ color: "#5f6b7a", fontSize: 12 }}>
                          <FiCheckCircle size={16} style={{ color: "#15803d" }} />
                          <span>All edits sync automatically across the platform.</span>
                        </div>

                        <button
                          type="submit"
                          className="prf-submit-btn"
                          disabled={profileLoading}
                        >
                          {profileLoading ? (
                            <span>Saving Changes...</span>
                          ) : (
                            <>
                              <FiSave />
                              <span>Save Profile</span>
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
                    {user?.googleId && !user?.password ? (
                      <div
                        className="p-4 rounded border"
                        style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}
                      >
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#07335c", margin: "0 0 6px" }}>
                          Google OAuth Single Sign-On Active
                        </h3>

                        <p style={{ fontSize: 12, color: "#5f6b7a", margin: "0 0 16px", lineHeight: 1.6 }}>
                          You authenticate via Google Auth. To configure an optional local password credential, trigger the verification code email sequence below.
                        </p>

                        <button
                          type="button"
                          className="prf-submit-btn"
                          onClick={handleTriggerResetToken}
                          disabled={loading}
                        >
                          <FiKey />
                          <span>{loading ? "Sending..." : "Set Up Local Password"}</span>
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleUpdatePassword}>
                        <div className="prf-form-group">
                          <label>Current Password</label>

                          <div className="prf-input-wrapper">
                            <FiLock className="prf-input-icon" />

                            <input
                              type={showCurrentPw ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData((prev) => ({
                                  ...prev,
                                  currentPassword: e.target.value,
                                }))
                              }
                              placeholder="••••••••"
                              required
                            />

                            <button
                              type="button"
                              className="prf-pw-toggle"
                              onClick={() => setShowCurrentPw(!showCurrentPw)}
                            >
                              {showCurrentPw ? <FiEyeOff /> : <FiEye />}
                            </button>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <div className="prf-form-group">
                              <label>New Password</label>

                              <div className="prf-input-wrapper">
                                <FiKey className="prf-input-icon" />

                                <input
                                  type={showNewPw ? "text" : "password"}
                                  value={passwordData.newPassword}
                                  onChange={(e) =>
                                    setPasswordData((prev) => ({
                                      ...prev,
                                      newPassword: e.target.value,
                                    }))
                                  }
                                  placeholder="Min. 6 characters"
                                  required
                                />

                                <button
                                  type="button"
                                  className="prf-pw-toggle"
                                  onClick={() => setShowNewPw(!showNewPw)}
                                >
                                  {showNewPw ? <FiEyeOff /> : <FiEye />}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="prf-form-group">
                              <label>Confirm New Password</label>

                              <div className="prf-input-wrapper">
                                <FiKey className="prf-input-icon" />

                                <input
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) =>
                                    setPasswordData((prev) => ({
                                      ...prev,
                                      confirmPassword: e.target.value,
                                    }))
                                  }
                                  placeholder="Re-enter new password"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="prf-submit-section">
                          <button
                            type="button"
                            style={{
                              background: "none",
                              border: "none",
                              color: "#2e7fc1",
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: "pointer",
                              padding: 0,
                            }}
                            onClick={handleTriggerResetToken}
                            disabled={loading}
                          >
                            Forgot password? Send recovery email
                          </button>

                          <button
                            type="submit"
                            className="prf-submit-btn"
                            disabled={loading}
                          >
                            <FiSave />
                            <span>{loading ? "Updating..." : "Update Password"}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* TAB 3: ROLE CAPABILITIES */}
                {activeTab === "activity" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* ROLE SPECIFIC OVERVIEW */}
                    {userRole === "student" && (
                      <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiBookOpen style={{ color: "#2e7fc1" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>Learning Overview</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: "0 0 4px" }}>
                              Enrolled Courses: <strong>{roleMetrics.coursesCount} Active</strong>
                            </p>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Completed Submissions: <strong>{roleMetrics.submissionsCount} Records</strong>
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiAward style={{ color: "#15803d" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>XP & Achievement</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: "0 0 4px" }}>
                              Total XP: <strong>{user?.xp || 0} XP Points</strong>
                            </p>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Badges Earned: <strong>{user?.badges?.length || 0} Badges</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {userRole === "instructor" && (
                      <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiBookOpen style={{ color: "#2e7fc1" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>Faculty Authoring</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: "0 0 4px" }}>
                              Authored Courses: <strong>{roleMetrics.coursesCount} Courses</strong>
                            </p>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Pending Grading: <strong>{roleMetrics.submissionsCount} Submissions</strong>
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiUsers style={{ color: "#2e7fc1" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>Cohorts & Live Streams</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Full instructor rights to publish modules, schedule live classes, issue assignments, and grade student submissions.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {(userRole === "admin" || userRole === "superadmin") && (
                      <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiShield style={{ color: "#07335c" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>System Directory</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: "0 0 4px" }}>
                              Platform Accounts: <strong>{roleMetrics.submissionsCount} Users</strong>
                            </p>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Total Courses: <strong>{roleMetrics.coursesCount} Courses</strong>
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="p-3 rounded border" style={{ background: "#f8fafc", borderColor: "#e5e9ef" }}>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <FiSettings style={{ color: "#2e7fc1" }} size={18} />
                              <strong style={{ fontSize: 13, color: "#07335c" }}>Master Controls</strong>
                            </div>

                            <p style={{ fontSize: 11, color: "#5f6b7a", margin: 0 }}>
                              Full rights over AI course generators, user role assignments, ticket resolutions, system settings, and activity logs.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB 4: OFFICIAL CORPORATE ID CARD */}
                {activeTab === "idCard" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="prf-id-wrapper">
                      {/* ID CARD 3D STAGE */}
                      <div className="prf-id-card-stage">
                        <div className={`prf-id-card-3d ${isCardFlipped ? "flipped" : ""}`}>
                          {/* FRONT FACE */}
                          <div className="prf-id-card-face prf-id-card-front">
                            {/* GEOMETRIC CHECKERED STRIP (RIGHT EDGE) */}
                            <div className="prf-id-geometric-strip">
                              <div className="prf-id-pattern-grid">
                                {Array.from({ length: 44 }).map((_, pIdx) => {
                                  const colors = [
                                    "cell-dark",
                                    "cell-mid",
                                    "cell-light",
                                    "cell-soft",
                                    "cell-white",
                                  ];
                                  return (
                                    <div
                                      key={pIdx}
                                      className={`prf-id-pattern-cell ${
                                        colors[pIdx % colors.length]
                                      }`}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* AVATAR PHOTO */}
                            <div className="prf-id-avatar-box">
                              <img
                                src={getAvatarUrl(profileImage || user?.profileImage)}
                                alt={user?.fullName || "Member"}
                                className="prf-id-avatar-img"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user?.fullName || "Member"
                                  )}&background=07335c&color=fff&size=128&bold=true`;
                                }}
                              />
                            </div>

                            {/* USER NAME & TITLE */}
                            <div className="prf-id-details">
                              <h2 className="prf-id-name">{user?.fullName || "Babatunde Moyosore"}</h2>
                              <p className="prf-id-title">
                                {userRole === "superadmin"
                                  ? "Super Administrator"
                                  : "System Administrator"}{" "}
                                • Benedex
                              </p>

                              <div className="prf-id-meta-block">
                                <div className="prf-id-meta-row">
                                  <span>Official ID:</span>
                                  <strong>
                                    BX-{String(user?._id || "892014").slice(-6).toUpperCase()}-{userRole === "superadmin" ? "SADM" : "ADM"}
                                  </strong>
                                </div>
                                <div className="prf-id-meta-row">
                                  <span>Email:</span>
                                  <strong>{user?.email || "admin@benedex.org"}</strong>
                                </div>
                                <div className="prf-id-meta-row">
                                  <span>Issue Date:</span>
                                  <strong>{issueDateFormatted}</strong>
                                </div>
                                <div className="prf-id-meta-row">
                                  <span>Clearance Tier:</span>
                                  <strong style={{ color: "#15803d" }}>
                                    <FiCheckCircle size={10} /> VERIFIED OFFICIAL
                                  </strong>
                                </div>
                              </div>
                            </div>

                            {/* BRAND LOGO FOOTER */}
                            <div className="prf-id-logo-footer">
                              <img src={Logo} alt="Benedex" className="prf-id-logo-img" />
                            </div>
                          </div>

                          {/* BACK FACE */}
                          <div className="prf-id-card-face prf-id-card-back">
                            <div className="prf-id-back-content">
                              {/* CENTERED LOGO AND TEXT UNDER IT */}
                              <div className="prf-id-back-header">
                                <img src={Logo} alt="Benedex" className="prf-id-back-logo" />
                                <span className="prf-id-back-label">Official Security Credential</span>
                              </div>

                              {/* REAL SCANNABLE QR CODE */}
                              <div className="prf-id-qr-box my-2">
                                <img
                                  src={realQrCodeImg}
                                  alt="Scannable Security QR Code"
                                  style={{
                                    width: 105,
                                    height: 105,
                                    objectFit: "contain",
                                    display: "block",
                                    margin: "0 auto",
                                  }}
                                />
                                <div className="prf-id-barcode">
                                  *BX-{String(user?._id || "892014").slice(-6).toUpperCase()}*
                                </div>
                              </div>

                              <p className="prf-id-disclaimer">
                                Property of <strong>Benedex Innovations Inc.</strong> Scan QR code to verify authentic platform clearance.
                              </p>

                              <div style={{ fontSize: 10, color: "#07335c", fontWeight: 500 }}>
                                Security Support: security@benedex.org
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CONTROLS ROW */}
                      <div className="prf-id-actions-row mt-2">
                        <button
                          type="button"
                          className="prf-id-btn-flip"
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                        >
                          <FiRefreshCw />
                          <span>{isCardFlipped ? "View Front Side" : "View Back Side"}</span>
                        </button>

                        <button
                          type="button"
                          className="prf-id-btn-print"
                          onClick={() => window.print()}
                        >
                          <FiPrinter />
                          <span>Print ID Badge</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className="prf-sidebar">
            {/* CARD 1: SIDEBAR TAB NAVIGATION */}
            <div className="prf-sidebar-card">
              <div className="prf-sidebar-heading">
                <div className="prf-sidebar-heading-icon">
                  <FiUser />
                </div>

                <div>
                  <span>NAVIGATION</span>
                  <h3>Profile Sections</h3>
                </div>
              </div>

              <div className="prf-nav-list">
                <button
                  type="button"
                  className={`prf-nav-btn ${activeTab === "general" ? "active" : ""}`}
                  onClick={() => setActiveTab("general")}
                >
                  <div className="prf-nav-btn-icon">
                    <FiUser />
                  </div>

                  <div className="prf-nav-btn-content">
                    <strong>Personal Information</strong>
                    <span>Name, email & display photo</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`prf-nav-btn ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  <div className="prf-nav-btn-icon">
                    <FiShield />
                  </div>

                  <div className="prf-nav-btn-content">
                    <strong>Security & Password</strong>
                    <span>Password credentials & recovery</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`prf-nav-btn ${activeTab === "activity" ? "active" : ""}`}
                  onClick={() => setActiveTab("activity")}
                >
                  <div className="prf-nav-btn-icon">
                    <FiActivity />
                  </div>

                  <div className="prf-nav-btn-content">
                    <strong>Role & Capabilities</strong>
                    <span>{userRole.toUpperCase()} level shortcuts</span>
                  </div>
                </button>

                {(userRole === "admin" || userRole === "superadmin") && (
                  <button
                    type="button"
                    className={`prf-nav-btn ${activeTab === "idCard" ? "active" : ""}`}
                    onClick={() => setActiveTab("idCard")}
                  >
                    <div className="prf-nav-btn-icon">
                      <FiCreditCard />
                    </div>

                    <div className="prf-nav-btn-content">
                      <strong>Corporate ID Card</strong>
                      <span>View, print & download badge</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* CARD 2: QUICK SHORTCUTS MATCHING ROLE */}
            <div className="prf-sidebar-card">
              <div className="prf-sidebar-heading">
                <div className="prf-sidebar-heading-icon">
                  <FiGrid />
                </div>

                <div>
                  <span>SHORTCUTS</span>
                  <h3>Quick Portal Links</h3>
                </div>
              </div>

              <div className="prf-shortcuts-list">
                <button
                  type="button"
                  className="prf-shortcut-btn"
                  onClick={handleBackToDashboard}
                >
                  <FiGrid />
                  <span>Main Dashboard</span>
                </button>

                {userRole === "student" && (
                  <>
                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/student/courses")}
                    >
                      <FiBookOpen />
                      <span>My Enrolled Courses</span>
                    </button>

                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/student/assignments")}
                    >
                      <FiClipboard />
                      <span>Assignments</span>
                    </button>
                  </>
                )}

                {userRole === "instructor" && (
                  <>
                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/instructor/courses")}
                    >
                      <FiBookOpen />
                      <span>Manage Courses</span>
                    </button>

                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/instructor/grade-submissions")}
                    >
                      <FiClipboard />
                      <span>Grade Submissions</span>
                    </button>
                  </>
                )}

                {(userRole === "admin" || userRole === "superadmin") && (
                  <>
                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/admin/users")}
                    >
                      <FiUsers />
                      <span>User Management</span>
                    </button>

                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/admin/syllabus-generator")}
                    >
                      <FiCpu />
                      <span>AI Course Generator</span>
                    </button>

                    <button
                      type="button"
                      className="prf-shortcut-btn"
                      onClick={() => navigate("/admin/tickets")}
                    >
                      <FiAlertCircle />
                      <span>Support Tickets</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* AVATAR EDIT MODAL DIALOG */}
      <AnimatePresence>
        {isEditingAvatar && (
          <div className="prf-modal-backdrop">
            <motion.div
              className="prf-modal-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="prf-modal-header">
                <h3>Update Profile Photo</h3>

                <button
                  type="button"
                  className="prf-modal-close"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  <FiX />
                </button>
              </div>

              <div className="prf-modal-body">
                <div className="text-center mb-4">
                  <img
                    src={getAvatarUrl(tempImageUrl || profileImage || user?.profileImage)}
                    alt="Preview"
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #07335c",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.fullName || "Member"
                      )}&background=07335c&color=fff&size=128&bold=true`;
                    }}
                  />
                </div>

                <div className="prf-form-group">
                  <label>Image Web URL</label>

                  <div className="prf-input-wrapper">
                    <FiCamera className="prf-input-icon" />

                    <input
                      type="url"
                      value={tempImageUrl}
                      onChange={(e) => setTempImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>

                <div className="text-center my-2 text-muted" style={{ fontSize: 11 }}>
                  — OR UPLOAD LOCAL FILE —
                </div>

                <div
                  style={{
                    padding: 16,
                    border: "1.5px dashed #cbd5e1",
                    borderRadius: 10,
                    textAlign: "center",
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("prf-file-input")?.click()}
                >
                  <FiUploadCloud size={24} style={{ color: "#07335c", marginBottom: 4 }} />

                  <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#07335c" }}>
                    Click to select an image from your device
                  </span>

                  <span style={{ fontSize: 10, color: "#8993a1" }}>PNG, JPG or WEBP (Max 2MB)</span>

                  <input
                    id="prf-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="prf-modal-footer">
                <button
                  type="button"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d7dde5",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#5f6b7a",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsEditingAvatar(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="prf-submit-btn"
                  style={{ minWidth: "auto", height: 38, padding: "0 18px" }}
                  onClick={handleSaveAvatar}
                >
                  <FiCheck />
                  <span>Save Photo</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;
