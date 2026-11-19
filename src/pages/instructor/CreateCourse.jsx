import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import { 
  FiBook, 
  FiTag, 
  FiFileText, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiAlertCircle,
  FiLayout,
  FiUsers
} from "react-icons/fi";
import "./CreateCourse.css";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function CreateCourse() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: ""
  });

  const showToast = (type, message) => {
    setToastNotification({ type, message });
    setTimeout(() => setToastNotification(null), 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await API.post("/courses", {
        title: formData.title.trim(),
        slug: `${slugify(formData.title)}-${Date.now()}`,
        description: formData.description.trim(),
        price: Number(formData.price)
      });

      showToast("success", "Curriculum initialized! Catalog entry created successfully.");
      
      // Delay redirection slightly so the user sees the confirmation message
      setTimeout(() => {
        navigate("/instructor/courses");
      }, 1500);

    } catch (error) {
      console.error("Downstream course creation failure:", error);
      showToast("error", error.response?.data?.message || "Failed to commit catalog track.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bx-cc-workspace container-fluid py-4 position-relative">
      
      {/* REAL-TIME FEEDBACK NOTIFICATION SYSTEM */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div 
            className={`bx-cc-toast ${toastNotification.type}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {toastNotification.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{toastNotification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WORKSPACE HEADER CONSOLE NAVIGATION */}
      <header className="bx-cc-header d-flex align-items-center gap-3 mb-4">
        <button 
          type="button" 
          className="bx-cc-back-btn" 
          onClick={() => navigate("/instructor/courses")}
          title="Return to management overview"
        >
          <FiArrowLeft />
        </button>
        <div className="bx-cc-title-zone">
          <h1 className="h3 mb-1 text-dark font-weight-bold">Initialize Course</h1>
          <p className="text-muted mb-0 small">Provision new educational tracks inside the catalog directory repository.</p>
        </div>
      </header>

      {/* CORE CONTENT SPLIT INTERFACE GRID */}
      <div className="row g-4">
        
        {/* COMPILATION METADATA PARAMETERS FORM */}
        <div className="col-12 col-xl-7">
          <motion.div 
            className="bx-cc-card-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            <div className="bx-cc-panel-header mb-4">
              <FiLayout className="bx-cc-header-icon" />
              <div>
                <h2 className="h5 mb-1 font-weight-bold">Catalog Configurations</h2>
                <span className="small text-muted">Draft core parameters required to open this learning sequence roster.</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bx-cc-form d-flex flex-column gap-4">
              
              {/* COURSE TITLE TEXT STRING LINK */}
              <div className="bx-cc-input-group">
                <label htmlFor="title"><FiBook /> Program Course Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g., Advanced Microcontrollers & Hardware Architectures"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              {/* COURSE SPECIFICATIONS MARKUP DESCRIPTION BOX */}
              <div className="bx-cc-input-group">
                <label htmlFor="description"><FiFileText /> Syllabus Abstract & Objectives</label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="Provide an overview of the curriculum path, learning benchmarks, and target competencies..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ACCOUNTING TIER PRICING METRIC */}
              <div className="bx-cc-input-group col-12 col-md-6 px-0">
                <label htmlFor="price"><FiTag /> Enrollment Rate Price (NGN)</label>
                <div className="bx-cc-price-wrapper">
                  <span className="bx-cc-currency-symbol">₦</span>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <span className="bx-cc-input-tip text-muted mt-1 small">Set to 0 for open public audit tracks.</span>
              </div>

              {/* CONTROL SUBMIT TRIGGER ACTION ROW */}
              <div className="bx-cc-action-row pt-2 d-flex justify-content-end">
                <button 
                  type="submit" 
                  className="bx-cc-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="bx-cc-spinner-sm me-2" />
                      <span>Creating Course Structure...</span>
                    </>
                  ) : (
                    <span>Publish Course Pathway</span>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>

        {/* COMPREHENSIVE LIVE PREVIEW VISUALIZER CONTAINER */}
        <div className="col-12 col-xl-5">
          <div className="bx-cc-sticky-sidebar d-flex flex-column gap-3">
            <span className="bx-cc-sidebar-label">Live Workspace Dashboard Preview</span>
            
            <div className="bx-cc-live-card">
              <div className="bx-cc-preview-banner">
                <div className="bx-cc-preview-gfx-fallback">
                  <FiBook className="bx-cc-preview-icon animate-float" />
                  <span>Benedex Virtual Core Workspace</span>
                </div>
                <div className="bx-cc-preview-price-tag">
                  <span>
                    {formData.price === "" || Number(formData.price) === 0 
                      ? "Free Access Track" 
                      : `₦${Number(formData.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
                  </span>
                </div>
              </div>

              <div className="bx-cc-preview-body">
                <div className="mb-2">
                  <span className="bx-cc-preview-pill">
                    <FiUsers /> 0 Students Active
                  </span>
                </div>
                
                <h3 className="h5 font-weight-bold text-dark text-truncate">
                  {formData.title.trim() || "Untitled Curriculum Pathway"}
                </h3>
                
                <p className="text-muted small mb-0 bx-cc-preview-clamp">
                  {formData.description.trim() || "As soon as you begin drafting structural specs or abstract scopes, this module container rendering updates dynamic data profiles in real-time."}
                </p>

                <div className="bx-cc-preview-dummy-actions-grid mt-4">
                  <div className="bx-cc-dummy-btn">Curriculum</div>
                  <div className="bx-cc-dummy-btn">Modules</div>
                  <div className="bx-cc-dummy-btn">Assignments</div>
                  <div className="bx-cc-dummy-btn primary">Analytics</div>
                </div>
              </div>
            </div>

            <div className="bx-cc-guidelines-box card bg-white border p-3 mt-2">
              <h5 className="h6 font-weight-bold text-dark mb-2">Publishing Requirements</h5>
              <p className="small text-muted mb-0">Once committed, you can access the module tracking systems to organize structural months, add lessons, and launch grading deliverables.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CreateCourse;