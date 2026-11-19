import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FiVideo,
  FiFileText,
  FiFile,
  FiPlus,
  FiBookOpen,
  FiHelpCircle,
  FiLayers,
  FiHash,
  FiLink,
  FiInbox
} from "react-icons/fi";
import "./InstructorLessons.css";

function InstructorLessons() {
  const { moduleId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "video",
    order: 1,
    content: "",
    videoUrl: "",
    documentUrl: ""
  });

  const fetchLessons = async () => {
    try {
      const res = await API.get(`/lessons/module/${moduleId}`);
      setLessons(res.data);
      // Auto-increment order field index dynamically based on array length sequence
      setFormData((prev) => ({ ...prev, order: res.data.length + 1 }));
    } catch (error) {
      console.error("Downstream index lookup error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [moduleId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await API.post("/lessons", {
        title: formData.title.trim(),
        type: formData.type,
        module: moduleId,
        order: Number(formData.order),
        content: formData.content.trim(),
        videoUrl: formData.videoUrl.trim(),
        documentUrl: formData.documentUrl.trim()
      });

      setFormData({
        title: "",
        type: "video",
        order: lessons.length + 2,
        content: "",
        videoUrl: "",
        documentUrl: ""
      });

      await fetchLessons();
    } catch (error) {
      console.error("Failed to commit syllabus track lesson node:", error);
    } finally {
      setCreating(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <FiVideo className="bx-il-icon-video" />;
      case "document":
        return <FiFile className="bx-il-icon-doc" />;
      default:
        return <FiFileText className="bx-il-icon-text" />;
    }
  };

  if (loading) {
    return (
      <div className="bx-il-skeleton-container container py-5">
        <div className="bx-il-skeleton-header mb-4 animate-pulse"></div>
        <div className="row g-4">
          <div className="col-12 col-lg-5"><div className="bx-il-skeleton-card animate-pulse"></div></div>
          <div className="col-12 col-lg-7"><div className="bx-il-skeleton-card animate-pulse"></div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bx-il-workspace container-fluid py-4">
      
      {/* HEADER UTILITY CONSOLE TERMINAL ROW */}
      <header className="bx-il-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-4 border-bottom">
        <div className="bx-il-title-zone">
          <div className="d-flex align-items-center gap-2 mb-1 text-dark">
            <FiBookOpen className="text-muted" size={22} />
            <h1 className="h3 mb-0 font-weight-bold">Lesson Architecture Console</h1>
          </div>
          <p className="text-muted mb-0 small">Compile deliverables, write textual frameworks, and deploy video tracks into the course directory timeline.</p>
        </div>

        <div className="bx-il-header-actions flex-shrink-0">
          <Link
            to={`/instructor/quiz-builder/${moduleId}`}
            className="bx-il-quiz-btn d-inline-flex align-items-center gap-2"
          >
            <FiHelpCircle size={16} />
            <span>Initialize Evaluative Quiz</span>
          </Link>
        </div>
      </header>

      {/* CORE WORKSPACE CONSOLE TWO-COLUMN SPLIT GRID */}
      <div className="row g-4">
        
        {/* STRUCTURAL DELIVERABLE PARAMETER PARSER FORM */}
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="bx-il-card-panel">
            <h3 className="bx-il-panel-title mb-4">
              <FiPlus />
              <span>Append Lesson Object</span>
            </h3>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              
              <div className="bx-il-form-group">
                <label className="bx-il-label">Lesson Title String</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Understanding Clock Cycles & Registers"
                  required
                />
              </div>

              <div className="bx-il-form-group">
                <label className="bx-il-label">Lesson Content Type</label>
                <div className="bx-il-select-wrapper">
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="video">🎥 High-Definition Streaming Video Track</option>
                    <option value="text">✍️ Rich Text Operational Syllabus Frame</option>
                    <option value="document">📁 Digital Document / Resource Schematic File</option>
                  </select>
                </div>
              </div>

              <div className="bx-il-form-group">
                <label className="bx-il-label">Timeline Deployment Index Order</label>
                <div className="bx-il-input-wrapper">
                  <FiHash className="bx-il-wrapper-icon" />
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

              {/* DYNAMIC SUBSECTION RENDERING SYSTEM NODES */}
              <AnimatePresence mode="wait">
                {formData.type === "video" && (
                  <motion.div
                    key="video"
                    className="bx-il-form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="bx-il-label">Cloud Streaming Video URL</label>
                    <div className="bx-il-input-wrapper">
                      <FiLink className="bx-il-wrapper-icon" />
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder="https://youtube.com/... or cloud CDN asset stream"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {formData.type === "document" && (
                  <motion.div
                    key="document"
                    className="bx-il-form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="bx-il-label">Cloud Resource Asset Repository URL</label>
                    <div className="bx-il-input-wrapper">
                      <FiLink className="bx-il-wrapper-icon" />
                      <input
                        type="url"
                        name="documentUrl"
                        value={formData.documentUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/... or secure endpoint source"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {formData.type === "text" && (
                  <motion.div
                    key="text"
                    className="bx-il-form-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="bx-il-label">Syllabus Markdown Content Specifications</label>
                    <textarea
                      rows={6}
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Compile complete step-by-step instruction materials, architectural blueprints, or engineering references here..."
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="bx-il-submit-btn mt-2"
                disabled={creating}
              >
                {creating ? (
                  <>
                    <div className="bx-il-spinner-sm" />
                    <span>Appending Asset Row...</span>
                  </>
                ) : (
                  <>
                    <FiPlus />
                    <span>Commit Lesson Entry</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* ACTIVE TIMELINE REGISTER ROW MODULE DIRECTORY LIST */}
        <div className="col-12 col-lg-7 col-xl-8">
          <div className="bx-il-card-panel">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <h3 className="bx-il-panel-title mb-0">
                <FiLayers />
                <span>Active Sequence Register</span>
              </h3>
              <span className="bx-il-badge-count">{lessons.length} Array Objects Loaded</span>
            </div>

            <div className="bx-il-scroll-container d-flex flex-column gap-2">
              {lessons.length > 0 ? (
                lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, idx) => (
                    <motion.div
                      key={lesson._id || idx}
                      className="bx-il-item-row"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <div className="bx-il-item-icon-frame">
                        {getIcon(lesson.type)}
                      </div>

                      <div className="bx-il-item-details">
                        <h4 className="bx-il-item-title mb-1">{lesson.title}</h4>
                        <div className="bx-il-meta-row d-flex align-items-center gap-2">
                          <span className="bx-il-type-tag text-uppercase">{lesson.type}</span>
                          <span className="bx-il-divider-dot">•</span>
                          <span className="text-muted small">Timeline Sequence Index #{lesson.order}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
              ) : (
                /* FUNCTIONAL EMPTY STATE INSTEAD OF VISUAL PLACEHOLDER SYSTEM */
                <div className="bx-il-empty-zone py-5 text-center d-flex flex-column align-items-center justify-content-center">
                  <div className="bx-il-empty-icon-wrapper mb-3">
                    <FiInbox size={32} />
                  </div>
                  <h4 className="h6 font-weight-bold text-dark mb-1">Index Register Void</h4>
                  <p className="text-muted small mb-0 px-3 max-width-320">
                    No active sequence lessons are appended inside this specific syllabus tracking module directory tree node yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default InstructorLessons;