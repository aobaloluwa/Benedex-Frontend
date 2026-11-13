import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import {
  FiFileText,
  FiUpload,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiMessageSquare,
  FiAlertCircle,
  FiPaperclip,
  FiCheck,
  FiLoader
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./Assignments.css";

function Assignments() {
  const { user } = useAuth();
  const location = useLocation();

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [assignmentsRes, submissionsRes] = await Promise.all([
          API.get("/assignments"),
          API.get("/assignments/my-submissions")
        ]);

        setAssignments(assignmentsRes.data || []);
        setSubmissions(submissionsRes.data || []);
      } catch (error) {
        console.error("Error loading assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage({ type: "", text: "" });
    }, 4000);
  };

  const handleFileChange = (assignmentId, file) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [assignmentId]: file,
    }));
  };

  const handleSubmit = async (assignmentId) => {
    const file = selectedFiles[assignmentId];
    if (!file) {
      showToast("error", "Please select a valid project file or document first.");
      return;
    }

    try {
      setSubmittingId(assignmentId);
      const formData = new FormData();
      formData.append("assignment", assignmentId);
      formData.append("file", file);

      await API.post("/assignments/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh submissions
      const submissionsRes = await API.get("/assignments/my-submissions");
      setSubmissions(submissionsRes.data || []);

      // Reset selected file for this assignment
      setSelectedFiles((prev) => {
        const copy = { ...prev };
        delete copy[assignmentId];
        return copy;
      });

      showToast("success", "Assignment submitted successfully!");
      window.dispatchEvent(new Event("student-activities-updated"));
    } catch (error) {
      console.error("Submission error:", error);
      showToast("error", error?.response?.data?.message || "Failed to submit assignment.");
    } finally {
      setSubmittingId(null);
    }
  };

  const getSubmission = (assignmentId) => {
    return submissions.find(
      (submission) => submission.assignment?._id === assignmentId
    );
  };

  if (loading) {
    return (
      <div className="bx-as-loading-pane">
        <div className="bx-as-spinner" />
        <p className="mt-3 text-muted font-weight-bold">Loading Academic Coursework & Assignments...</p>
      </div>
    );
  }

  const submittedCount = submissions.length;
  const pendingCount = Math.max(0, assignments.length - submittedCount);

  return (
    <div className="bx-as-workspace">

      {/* ADMIN-STYLE BRAND HEADER STRIP */}
      <header className="bx-as-header mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bx-as-icon-box">
              <FiFileText size={24} />
              <span className="bx-as-pulse-light" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h1 className="h3 mb-0 font-weight-bold text-dark">Coursework Assignments</h1>
                <span className="bx-as-ver-badge">Academic Workspace</span>
              </div>
              <p className="text-muted mb-0 small">
                Submit course milestones, view instructor feedback, and track assignment evaluation grades.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* TOAST FEEDBACK ALERT */}
      <AnimatePresence>
        {toastMessage.text && (
          <motion.div
            className={`alert alert-${toastMessage.type === "success" ? "success" : "danger"} d-flex align-items-center gap-2 mb-4 bx-as-toast`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {toastMessage.type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
            <span className="small">{toastMessage.text}</span>
            <button className="btn-close ms-auto" onClick={() => setToastMessage({ type: "", text: "" })} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN-STYLE METRICS SUMMARY ROW */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-as-stat-card">
            <div className="bx-as-stat-icon-box color-blue">
              <FiFileText size={20} />
            </div>
            <div>
              <span className="bx-as-stat-label">Total Assignments</span>
              <h3 className="bx-as-stat-number">{assignments.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-as-stat-card">
            <div className="bx-as-stat-icon-box color-green">
              <FiCheckCircle size={20} />
            </div>
            <div>
              <span className="bx-as-stat-label">Evaluated & Submitted</span>
              <h3 className="bx-as-stat-number">{submittedCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-as-stat-card">
            <div className="bx-as-stat-icon-box color-amber">
              <FiClock size={20} />
            </div>
            <div>
              <span className="bx-as-stat-label">Pending Submissions</span>
              <h3 className="bx-as-stat-number">{pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ASSIGNMENTS SECTION GRID */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 font-weight-bold text-dark mb-0">Assigned Course Milestones</h2>
        <span className="badge bg-light text-dark border">{assignments.length} Milestones</span>
      </div>

      {assignments.length === 0 ? (
        <div className="bx-as-card bx-as-empty-card text-center py-5">
          <div className="bx-as-empty-icon mb-3">
            <FiAlertCircle size={36} />
          </div>
          <h3 className="h5 font-weight-bold text-dark mb-2">No Coursework Records Found</h3>
          <p className="text-muted small mb-0 max-width-400 mx-auto">
            Your currently enrolled course modules do not have pending assignment submissions configured.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {assignments.map((assignment) => {
            const submission = getSubmission(assignment._id);
            const fileSelected = selectedFiles[assignment._id];
            const isSubmitting = submittingId === assignment._id;

            return (
              <div key={assignment._id} className="col-12 col-lg-6">
                <div className={`bx-as-card h-100 ${submission ? "is-submitted" : ""}`}>
                  {/* CARD HEADER */}
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                    <div>
                      <h3 className="h6 font-weight-bold text-dark mb-1">{assignment.title}</h3>
                      <span className="text-muted extra-small d-flex align-items-center gap-1">
                        <FiClock /> Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>

                    {submission ? (
                      <span className="bx-as-badge badge-submitted">
                        <FiCheck size={12} /> Submitted
                      </span>
                    ) : (
                      <span className="bx-as-badge badge-pending">
                        <FiClock size={12} /> Pending Entry
                      </span>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="bx-as-card-desc mb-3">
                    {assignment.description || "No project breakdown or specification provided for this milestone."}
                  </p>

                  {/* IF SUBMITTED: SHOW RECEIPT & GRADE */}
                  {submission && (
                    <div className="bx-as-receipt-box">
                      <div className="d-flex align-items-center gap-2 text-success font-weight-bold small mb-2">
                        <FiCheckCircle /> Record Locked & Uploaded
                      </div>

                      {submission.grade !== null && submission.grade !== undefined && (
                        <div className="bx-as-grade-box mb-2">
                          <FiAward className="text-warning" />
                          <span>
                            Grade Score: <strong>{submission.grade}%</strong>
                          </span>
                        </div>
                      )}

                      {submission.feedback && (
                        <div className="bx-as-feedback-box">
                          <div className="d-flex align-items-center gap-1 text-dark font-weight-bold extra-small mb-1">
                            <FiMessageSquare /> Instructor Advisory:
                          </div>
                          <p className="mb-0 extra-small text-muted fst-italic">"{submission.feedback}"</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* IF NOT SUBMITTED: UPLOAD ZONE */}
                  {!submission && (
                    <div className="bx-as-upload-zone mt-3 pt-3 border-top">
                      <label className="bx-as-file-dropzone mb-3" htmlFor={`file-${assignment._id}`}>
                        <FiPaperclip size={18} className="text-muted" />
                        <span className="small text-truncate">
                          {fileSelected ? fileSelected.name : "Choose source file or PDF document..."}
                        </span>
                        <input
                          id={`file-${assignment._id}`}
                          type="file"
                          onChange={(e) => handleFileChange(assignment._id, e.target.files[0])}
                          style={{ display: "none" }}
                        />
                      </label>

                      <button
                        type="button"
                        className="bx-as-submit-btn w-100"
                        onClick={() => handleSubmit(assignment._id)}
                        disabled={!fileSelected || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <FiLoader className="bx-as-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            <FiUpload /> Submit Assignment File
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Assignments;