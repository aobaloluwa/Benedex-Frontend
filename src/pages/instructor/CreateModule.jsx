import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FiLayers,
  FiBookOpen,
  FiHash,
  FiArrowRight,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar
} from "react-icons/fi";
import "./CreateModule.css";

function CreateModule() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    month: 1,
    order: 1
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
      setLoading(true);
      await API.post("/modules", {
        title: formData.title.trim(),
        description: formData.description.trim(),
        course: courseId,
        month: Number(formData.month),
        order: Number(formData.order),
        content: []
      });

      showToast("success", "Syllabus chunk appended! Module configured successfully.");

      setTimeout(() => {
        navigate(`/instructor/course/${courseId}`);
      }, 1500);

    } catch (error) {
      console.error("Downstream framework setup failure:", error);
      showToast("error", error.response?.data?.message || "Failed to finalize module block.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bx-cm-workspace container py-4 position-relative">

      {/* GLOBAL DISCRETE FLOATING TOAST STRIPS */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            className={`bx-cm-toast ${toastNotification.type}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {toastNotification.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{toastNotification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE WORKSPACE CONSOLE HEADER ROUTING PANEL */}
      <header className="bx-cm-header d-flex align-items-center gap-3 mb-5">
        <button
          type="button"
          className="bx-cm-back-btn"
          onClick={() => navigate(`/instructor/course/${courseId}`)}
          title="Return to syllabus manager context view"
        >
          <FiArrowLeft />
        </button>
        <div className="bx-cm-title-zone">
          <div className="d-flex align-items-center gap-2 text-dark mb-1">
            <FiLayers className="text-muted" size={20} />
            <h1 className="h3 mb-0 font-weight-bold">Configure Syllabus Module</h1>
          </div>
          <p className="text-muted mb-0 small">Organize sequential syllabus segments, scheduling milestones, and operational delivery nodes.</p>
        </div>
      </header>

      {/* COMPACT SECURE FORM LAYOUT BOUNDS BLOCK */}
      <div className="row">
        <div className="col-12 col-lg-8 col-xl-7 mx-auto">
          <motion.div
            className="bx-cm-card-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">

              {/* COMPONENT TEXT INPUT FIELD BLOCK */}
              <div className="bx-cm-form-group">
                <label className="bx-cm-field-label">Structural Module Title</label>
                <div className="bx-cm-input-wrapper">
                  <FiBookOpen className="bx-cm-input-icon" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Module 1: Core Electronic Foundations & Logic Gates"
                    required
                  />
                </div>
              </div>

              {/* TEXTAREA DESCRIPTIVE COMPONENT ROW */}
              <div className="bx-cm-form-group">
                <label className="bx-cm-field-label">Curriculum Module Scope</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Outline explicit conceptual objectives, required prerequisite milestones, or target topics mapped to this specific unit tracking module..."
                  required
                />
              </div>

              {/* STEP ORDERING GRID SPLIT BLOCKS CHRONOLOGY */}
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="bx-cm-form-group">
                    <label className="bx-cm-field-label">Target Milestone Month</label>
                    <div className="bx-cm-input-wrapper">
                      <FiCalendar className="bx-cm-input-icon" />
                      <input
                        type="number"
                        min="1"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="bx-cm-form-group">
                    <label className="bx-cm-field-label">Syllabus Sequence Index Order</label>
                    <div className="bx-cm-input-wrapper">
                      <FiHash className="bx-cm-input-icon" />
                      <input
                        type="number"
                        min="1"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE CONTROLS TRIGGER ROW ELEMENT ACTION */}
              <div className="bx-cm-action-row pt-3 d-flex justify-content-end border-top mt-2">
                <button
                  type="submit"
                  className="bx-cm-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="bx-cm-spinner-sm me-2" />
                      <span>Adding Module...</span>
                    </>
                  ) : (
                    <>
                      <span>Commit Module Unit</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

export default CreateModule;