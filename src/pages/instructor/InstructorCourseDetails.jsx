import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";
import {
  FiLayers,
  FiPlus,
  FiBookOpen,
  FiArrowLeft,
  FiCalendar,
  FiChevronRight,
  FiActivity,
  FiFolderMinus
} from "react-icons/fi";
import "./InstructorCourseDetails.css";

function InstructorCourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, modulesRes] = await Promise.all([
          API.get(`/courses/${courseId}`),
          API.get(`/modules/${courseId}`)
        ]);
        
        setCourse(courseRes.data);
        setModules(modulesRes.data || []);
      } catch (err) {
        console.error("Error fetching course detail framework matrices:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="bx-details-loader-screen">
        <div className="bx-details-spinner" />
        <p>Assembling Syllabus Framework...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bx-details-workspace container py-5 text-center">
        <h2 className="font-weight-bold">Course Not Found</h2>
        <p className="text-muted">The requested course could not be found.</p>
        <button onClick={() => navigate(-1)} className="bx-details-back-btn mx-auto mt-3">
          <FiArrowLeft /> <span>Go Back</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bx-details-workspace container-fluid py-4">
      
      {/* NAVIGATION TIER & BACK ACTIONS UNIT */}
      <div className="mb-4 d-flex align-items-center gap-2">
        <button 
          type="button" 
          className="bx-details-back-btn" 
          onClick={() => navigate("/instructor/courses")}
          title="Return to management matrix catalog"
        >
          <FiArrowLeft />
        </button>
        <span className="text-muted small font-weight-medium">Back to Management Panel</span>
      </div>

      {/* COMPACT INTERACTIVE HERO SECTION CARD */}
      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="bx-details-hero-card">
            <div className="bx-details-hero-body">
              <span className="bx-details-badge mb-2">Instructor Console</span>
              <h1 className="h2 mb-2 font-weight-bold text-white">{course.title}</h1>
              <p className="text-white-50 mb-0 bx-details-hero-desc">{course.description || "No class syllabus details provided yet."}</p>
              
              <div className="bx-details-quick-meta mt-4 d-flex flex-wrap gap-4 text-white-50 small">
                <div className="d-flex align-items-center gap-2">
                  <FiLayers className="text-warning" />
                  <span><strong>{modules.length}</strong> Modules Structured</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FiActivity className="text-info" />
                  <span>Price: <strong>{Number(course.price) === 0 ? "Free" : `₦${Number(course.price).toLocaleString()}`}</strong></span>
                </div>
              </div>
            </div>

            {/* QUICK LINK PANEL MANAGEMENT DEPLOYMENT SHORTCUTS */}
            <div className="bx-details-hero-actions-panel">
              <Link to={`/instructor/create-module/${course._id}`} className="bx-details-action-cta secondary">
                <FiPlus />
                <span>Configure Module</span>
              </Link>
              <Link to={`/instructor/create-assignment/${course._id}`} className="bx-details-action-cta primary">
                <FiBookOpen />
                <span>Deploy Assignment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SUBORDINATE CURRICULUM SYLLABUS GRID COMPONENT */}
      <div className="row">
        <div className="col-12 col-xl-9 mx-auto">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h3 className="h4 font-weight-bold mb-1 text-dark">Course Syllabus Blocks</h3>
              <p className="text-muted small mb-0">Structural breakdown of curriculum blocks grouped chronological by month timelines.</p>
            </div>
          </div>

          {modules.length === 0 ? (
            <motion.div 
              className="bx-details-empty-alert"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiFolderMinus className="bx-empty-alert-icon" />
              <h4>No Syllabus Modules Configured</h4>
              <p>This class layout profile has no registered course modules mapped to its timeline sequence architecture.</p>
              <Link to={`/instructor/create-module/${course._id}`} className="bx-details-create-shortcut-btn">
                <FiPlus /> Initialize First Module Block
              </Link>
            </motion.div>
          ) : (
            <div className="bx-details-timeline-stack d-flex flex-column gap-3">
              {modules
                .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
                .map((mod, index) => (
                  <motion.div 
                    className="bx-details-module-row-card"
                    key={mod._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="bx-module-row-info-zone">
                      <div className="bx-module-row-avatar">
                        <FiLayers />
                      </div>
                      <div className="bx-module-row-text">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                          <h4 className="h6 mb-0 font-weight-bold text-dark">{mod.title}</h4>
                          <span className="bx-module-order-badge">Sequence #{mod.order || (index + 1)}</span>
                        </div>
                        <div className="bx-module-row-sub-meta d-flex gap-3 text-muted small">
                          <span className="d-flex align-items-center gap-1">
                            <FiCalendar size={13} /> Month Tracking: {mod.month || "N/A"}
                          </span>
                          <span>•</span>
                          <span><strong>{mod.content?.length || 0}</strong> Active Lesson Components</span>
                        </div>
                      </div>
                    </div>

                    <div className="bx-module-row-link-zone">
                      <Link to={`/instructor/lessons/${mod._id}`} className="bx-module-row-action-link">
                        <span>Manage Lessons</span>
                        <FiChevronRight />
                      </Link>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default InstructorCourseDetails;