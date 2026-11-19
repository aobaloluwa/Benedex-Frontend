import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import { 
  FiSettings, FiGlobe, FiMail, FiSliders, FiAlertTriangle, 
  FiSave, FiCheckCircle, FiLoader, FiUserPlus, FiLock, FiShield 
} from "react-icons/fi";
import "./AdminSettings.css";

function AdminSettings() {
  // Application Settings States
  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // User Management Onboarding Form States
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student"
  });
  const [creatingUser, setCreatingUser] = useState(false);
  const [userSuccessMessage, setUserSuccessMessage] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await API.get("/settings");
        
        // Mapped using explicit database schema keys
        setSettings({
          siteName: res.data?.platformName || "",
          supportEmail: res.data?.contact?.email || "",
          maintenanceMode: res.data?.maintenanceMode === true
        });
      } catch (error) {
        console.error("Platform master configurations fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handler for Base Site System Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handler for Onboarding Sub-Form Inputs
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submits Site Customizations Core Settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveSuccess(false);

      // Explicit structured data translation layer for backend ingestion
      const payload = {
        siteName: settings.siteName,
        supportEmail: settings.supportEmail,
        maintenanceMode: settings.maintenanceMode === true
      };

      const res = await API.put("/settings", payload);
      
      // Update local state directly with returned data to prevent resetting
      if (res.data?.settings) {
        setSettings({
          siteName: res.data.settings.platformName || "",
          supportEmail: res.data.settings.contact?.email || "",
          maintenanceMode: res.data.settings.maintenanceMode === true
        });
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (error) {
      console.error("Configuration updates storage exception:", error);
      alert("Failed to write parameters: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Handles routing user payload data arrays into our users route
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreatingUser(true);
      setUserSuccessMessage("");
      setUserErrorMessage("");

      const res = await API.post("/users", newUser);
      
      setUserSuccessMessage(res.data?.message || "User credentials added successfully.");
      
      setNewUser({
        fullName: "",
        email: "",
        password: "",
        role: "student"
      });

      setTimeout(() => setUserSuccessMessage(""), 5000);
    } catch (error) {
      console.error("User provisioning matrix breakdown exception:", error);
      setUserErrorMessage(error.response?.data?.message || "User account creation failed. Please try again.");
      setTimeout(() => setUserErrorMessage(""), 6000);
    } finally {
      setCreatingUser(false);
    }
  };

  if (loading) {
    return (
      <div className="bx-st-loading-pane">
        <div className="bx-st-spinner"></div>
        <p className="mt-3 text-muted font-weight-bold">Accessing Master System Configuration Registry...</p>
      </div>
    );
  }

  return (
    <div className="bx-st-workspace container-fluid py-4">
      
      {/* HEADER MASTER STRIP */}
      <header className="bx-st-header mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bx-st-icon-box">
            <FiSettings size={24} />
            <span className="bx-st-pulse-light" />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h1 className="h3 mb-0 font-weight-bold">System Parameters</h1>
              <span className="bx-st-ver-badge">Core Config v1.1</span>
            </div>
            <p className="text-muted mb-0 small">Modify application metadata variables, create system roles, and override operational execution flags.</p>
          </div>
        </div>
      </header>

      {/* SYSTEM CONFIRMATION TOAST */}
      {saveSuccess && (
        <motion.div 
          className="bx-st-toast alert alert-success d-flex align-items-center gap-2 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiCheckCircle size={18} />
          <span><strong>Registry Update Complete:</strong> Variables successfully deployed across environment nodes.</span>
        </motion.div>
      )}

      <div className="row g-4">
        
        {/* LEFT COLUMN: PLATFORM CONFIGURATIONS */}
        <div className="col-12 col-xl-7">
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            
            {/* BRANDING AND METADATA CARD */}
            <div className="bx-st-card">
              <div className="bx-st-card-header d-flex align-items-center gap-2 mb-4">
                <FiGlobe className="text-muted" />
                <h2 className="h5 mb-0 font-weight-bold">Application Environmental Identity</h2>
              </div>
              
              <div className="bx-st-field-group mb-3">
                <label className="bx-st-input-label">Ecosystem Base Call-Sign (Site Name)</label>
                <div className="bx-st-input-wrapper">
                  <FiGlobe className="bx-st-field-icon" />
                  <input 
                    type="text" 
                    name="siteName" 
                    placeholder="e.g., Adonis College Portal" 
                    value={settings.siteName} 
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="bx-st-field-group">
                <label className="bx-st-input-label">System Default Support Communication Vector (Email)</label>
                <div className="bx-st-input-wrapper">
                  <FiMail className="bx-st-field-icon" />
                  <input 
                    type="email" 
                    name="supportEmail" 
                    placeholder="e.g., tech-ops@school.edu" 
                    value={settings.supportEmail} 
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECURITY & MAINTENANCE COMMAND CONTROL CARD */}
            <div className="bx-st-card">
              <div className="bx-st-card-header d-flex align-items-center gap-2 mb-3">
                <FiSliders className="text-muted" />
                <h2 className="h5 mb-0 font-weight-bold">Administrative System Overrides</h2>
              </div>
              <p className="text-muted small mb-4">
                Toggling systemic execution metrics alters operational availability configurations layout instantaneously.
              </p>

              {/* TOGGLE ELEMENT PIPELINE */}
              <div className="bx-st-toggle-row d-flex align-items-center justify-content-between p-3 rounded mb-3">
                <div className="pe-3">
                  <span className="d-block font-weight-bold text-dark small">Maintenance Execution Engine</span>
                  <span className="text-muted d-block extra-small mt-1">Locks non-administrative tokens out of the API query layer.</span>
                </div>
                <label className="bx-st-switch">
                  <input 
                    type="checkbox" 
                    name="maintenanceMode" 
                    checked={settings.maintenanceMode} 
                    onChange={handleChange} 
                  />
                  <span className="bx-st-slider"></span>
                </label>
              </div>

              {/* WARNING SHIELD VECTOR */}
              {settings.maintenanceMode && (
                <motion.div 
                  className="bx-st-warning-box p-3 rounded d-flex gap-3 align-items-start mb-3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <FiAlertTriangle className="text-warning flex-shrink-0 mt-1" size={18} />
                  <span className="small text-warning-muted">
                    <strong>Caution:</strong> Activating maintenance mode temporarily restricts platform access for Students and Instructors.
                  </span>
                </motion.div>
              )}

              {/* ACTION TRIGGERS AREA */}
              <div className="bx-st-action-zone mt-2 text-end">
                <button 
                  type="submit" 
                  className="bx-st-submit-btn"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FiLoader className="bx-st-spin-icon" />
                      <span>Synchronizing Variables...</span>
                    </>
                  ) : (
                    <>
                      <FiSave />
                      <span>Save Platform States</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: NEW USER PROVISIONING CORE PANEL */}
        <div className="col-12 col-xl-5">
          <div className="bx-st-card h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="bx-st-card-header d-flex align-items-center gap-2 mb-3">
                <FiUserPlus className="text-primary-theme" />
                <h2 className="h5 mb-0 font-weight-bold">Identity Provisioning Engine</h2>
              </div>
              <p className="text-muted small mb-4">
                Directly register and instantiate new authorization profiles. Bypass standard public sign-up registration hooks.
              </p>

              {/* ACTION FEEDBACK ALERT HANDLES */}
              {userSuccessMessage && (
                <motion.div 
                  className="alert alert-success d-flex align-items-center gap-2 p-2 extra-small mb-3"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheckCircle size={14} className="flex-shrink-0" />
                  <span>{userSuccessMessage}</span>
                </motion.div>
              )}

              {userErrorMessage && (
                <motion.div 
                  className="alert alert-danger d-flex align-items-center gap-2 p-2 extra-small mb-3"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle size={14} className="flex-shrink-0" />
                  <span>{userErrorMessage}</span>
                </motion.div>
              )}

              {/* PROVISIONING SUB-FORM LAYOUT */}
              <form onSubmit={handleCreateUserSubmit} className="d-flex flex-column gap-3">
                
                <div className="bx-st-field-group">
                  <label className="bx-st-input-label">Full Name</label>
                  <div className="bx-st-input-wrapper">
                    <FiUserPlus className="bx-st-field-icon" />
                    <input 
                      type="text"
                      name="fullName"
                      placeholder="e.g., Emmanuel Nuel"
                      value={newUser.fullName}
                      onChange={handleUserInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="bx-st-field-group">
                  <label className="bx-st-input-label">Email Address</label>
                  <div className="bx-st-input-wrapper">
                    <FiMail className="bx-st-field-icon" />
                    <input 
                      type="email"
                      name="email"
                      placeholder="e.g., creator@benedex.hub"
                      value={newUser.email}
                      onChange={handleUserInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="bx-st-field-group">
                  <label className="bx-st-input-label">Access Encryption Phrase (Password)</label>
                  <div className="bx-st-input-wrapper">
                    <FiLock className="bx-st-field-icon" />
                    <input 
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={newUser.password}
                      onChange={handleUserInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="bx-st-field-group">
                  <label className="bx-st-input-label">System Privileges Matrix (Role)</label>
                  <div className="bx-st-select-wrapper">
                    <FiShield className="bx-st-select-icon" />
                    <select 
                      name="role"
                      value={newUser.role}
                      onChange={handleUserInputChange}
                      className="bx-st-dropdown"
                    >
                      <option value="student">Student Account</option>
                      <option value="instructor">Instructor Account</option>
                      <option value="admin">System Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="bx-st-action-zone text-end mt-3 border-top pt-3">
                  <button 
                    type="submit" 
                    className="bx-st-submit-btn bx-st-btn-success w-100 justify-content-center"
                    disabled={creatingUser}
                  >
                    {creatingUser ? (
                      <>
                        <FiLoader className="bx-st-spin-icon" />
                        <span>Instantiating Profile Record...</span>
                      </>
                    ) : (
                      <>
                        <FiUserPlus />
                        <span>Deploy User Profile</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminSettings;