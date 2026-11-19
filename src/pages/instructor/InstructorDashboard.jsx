import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api"; // Axios configuration bundle containing global JWT mapping headers
import {
  FiBookOpen,
  FiUsers,
  FiClock,
  FiCheckSquare,
  FiPlus,
  FiTrendingUp,
  FiAlertTriangle,
  FiArrowRight,
  FiActivity,
  FiBarChart2,
  FiCpu,
  FiRefreshCw
} from "react-icons/fi";
import "./InstructorDashboard.css";

function InstructorDashboard() {
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  
  // Normalized single-source structural registers
  const [dashboardData, setDashboardData] = useState({
    metrics: { totalStudents: 0, completionRate: 0, pendingGrading: 0, activeCourses: 0 },
    courses: [],
    weeklyEngagement: [],
    atRiskStudents: [] // Used to safely stream active student roster arrays
  });

  const fetchDashboardTelemetry = async () => {
    try {
      setLoading(true);
      setErrorState(null);
      
      // Hit the single unified instructor aggregation analytics endpoint
      const res = await API.get("/instructor/dashboard");
      setDashboardData(res.data);
    } catch (error) {
      console.error("Critical dashboard telemetry fetch failure:", error);
      setErrorState(
        error.response?.data?.message || 
        "Pipeline Synchronization Error: Check authorization headers or routing connectivity."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardTelemetry();
  }, []);

  // EXACT MATCHING UNIFORM PLATFORM SYSTEM LOADER ACROSS PANELS
  if (loading) {
    return (
      <div className="bx-id-loading-screen">
        <div className="bx-id-spinner"></div>
        <p className="mt-3 text-muted font-weight-bold">Compiling Real-Time LMS Telemetry Matrices...</p>
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="bx-id-error-pane container py-5 text-center">
        <motion.div 
          className="alert alert-danger d-inline-block px-4 py-4 shadow-sm rounded-4" 
          role="alert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="d-flex align-items-center justify-content-center gap-2 text-danger mb-2">
            <FiAlertTriangle size={24} />
            <span className="font-weight-bold h5 mb-0">LMS Telemetry Disconnect</span>
          </div>
          <p className="text-muted small px-3 mb-0">{errorState}</p>
          <button 
            className="bx-id-retry-btn mt-3 font-weight-bold"
            onClick={fetchDashboardTelemetry}
          >
            <FiRefreshCw size={14} />
            <span>Retry Sync Connection</span>
          </button>
        </motion.div>
      </div>
    );
  }

  const { metrics, courses, weeklyEngagement, atRiskStudents } = dashboardData;

  return (
    <div className="bx-id-workspace container-fluid py-4">
      
      {/* PREMIUM HEADER CONSOLE BANNER */}
      <header className="bx-id-premium-banner mb-4">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-7 col-lg-8">
            <div className="d-flex align-items-center gap-3">
              <div className="bx-id-header-icon-box">
                <FiCpu size={24} />
                <span className="bx-id-pulse-indicator" />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h1 className="bx-id-main-title mb-0">Instructor Command Terminal</h1>
                  <span className="bx-id-system-badge">v2.4 Live</span>
                </div>
                <p className="bx-id-subtitle mb-0">
                  Monitor course performance indicators, evaluate telemetry tracking charts, and deploy syllabus blueprints.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 text-md-end d-flex justify-content-md-end gap-2">
            <button onClick={fetchDashboardTelemetry} className="bx-id-refresh-action-btn">
              <FiRefreshCw />
            </button>
            <Link to="/instructor/courses/new" className="bx-id-action-trigger-btn">
              <FiPlus size={18} />
              <span>Initialize Course Blueprint</span>
            </Link>
          </div>
        </div>
      </header>

      {/* METRIC KPI MONITOR STRIPS */}
      <section className="row g-3 mb-4">
        {[
          { label: "Aggregate Registered Students", val: metrics.totalStudents?.toLocaleString() || 0, icon: <FiUsers />, color: "blue" },
          { label: "Mean Completion Rate", val: `${metrics.completionRate || 0}%`, icon: <FiTrendingUp />, color: "green" },
          { label: "Pending Evaluation Queue", val: metrics.pendingGrading || 0, icon: <FiCheckSquare />, color: "amber" },
          { label: "Active Syllabus Managed", val: metrics.activeCourses || 0, icon: <FiBookOpen />, color: "purple" }
        ].map((kpi, idx) => (
          <div className="col-12 col-sm-6 col-xl-3" key={idx}>
            <motion.div 
              className="bx-id-kpi-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="bx-id-kpi-label">{kpi.label}</span>
                  <h2 className="bx-id-kpi-val mb-0 mt-1">{kpi.val}</h2>
                </div>
                <div className={`bx-id-kpi-icon-wrapper is-${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </section>

      {/* CENTRAL ANALYTICAL GRID ROWS */}
      <section className="row g-4 mb-4">
        
        {/* WEEKLY ENGAGEMENT CHART AREA */}
        <div className="col-12 col-lg-8">
          <motion.div 
            className="bx-id-card-panel h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="bx-id-panel-title mb-0">
                <FiBarChart2 />
                <span>Weekly Student Engagement Curve</span>
              </h3>
              <span className="bx-id-badge-info">Live Telemetry</span>
            </div>
            
            <div className="bx-id-chart-placeholder-frame">
              {weeklyEngagement && weeklyEngagement.length > 0 ? (
                weeklyEngagement.map((height, idx) => (
                  <div className="bx-id-chart-column-wrapper" key={idx}>
                    <div className="bx-id-bar-track">
                      <motion.div 
                        className="bx-id-chart-bar" 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.04 }}
                      >
                        <span className="bx-id-bar-tooltip">{height}%</span>
                      </motion.div>
                    </div>
                    <span className="bx-id-chart-label-text">Wk {idx + 1}</span>
                  </div>
                ))
              ) : (
                <div className="w-100 text-center py-5 text-muted small">No structural tracking metrics calculated yet for this period.</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* PENDING GRADING ITEM BLOCK LIST */}
        <div className="col-12 col-lg-4">
          <motion.div 
            className="bx-id-card-panel h-100 d-flex flex-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="bx-id-panel-title mb-3">
              <FiCheckSquare />
              <span>Pending Grading Queue</span>
            </h3>
            
            <div className="bx-id-grading-scroll-list d-flex flex-column gap-2 flex-grow-1">
              {courses && courses.some(c => c.pendingTasks?.length > 0) ? (
                courses.flatMap(c => c.pendingTasks || []).map((item, idx) => (
                  <div className="bx-id-grading-item-row" key={idx}>
                    <div className="min-w-0 flex-grow-1">
                      <h4 className="bx-id-grading-task-title text-truncate mb-1">{item.taskName}</h4>
                      <span className="bx-id-mini-tag">{item.courseCode}</span>
                    </div>
                    <div className="text-end flex-shrink-0">
                      <span className="bx-id-time-elapsed d-block mb-1"><FiClock size={11} /> {item.submittedAt}</span>
                      <Link to={`/instructor/evaluate/${item.submissionId}`} className="bx-id-row-action-link text-decoration-none small font-weight-bold">Evaluate</Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bx-id-empty-queue-message text-center py-5 m-auto">
                  <p className="text-muted small mb-0">Grading clear. No items pending manual human verification arrays.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOWER ARCHITECTURE ROWS: MANAGEMENT TILES vs MONITOR ROSTER */}
      <section className="row g-4">
        
        {/* ACTIVE COURSE BLUEPRINTS TILES */}
        <div className="col-12 col-xl-8">
          <motion.div 
            className="bx-id-card-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="bx-id-panel-title mb-4">
              <FiBookOpen />
              <span>Active Course Directory Architecture</span>
            </h3>

            <div className="row g-3">
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <div className="col-12" key={course._id || course.id}>
                    <div className="bx-id-course-strip-card">
                      <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-6">
                          <h4 className="bx-id-course-strip-title mb-2">{course.title}</h4>
                          <div className="d-flex flex-wrap gap-2 gap-md-3 text-muted small">
                            <span><strong>{course.studentsCount || 0}</strong> Enrolled Students</span>
                            <span className="d-none d-sm-inline">•</span>
                            <span><strong>{course.modulesCount || 0}</strong> Architecture Modules</span>
                          </div>
                        </div>

                        <div className="col-12 col-md-4">
                          <div className="d-flex justify-content-between align-items-center mb-1 small text-muted">
                            <span>Mean Course Completion</span>
                            <span className="font-weight-bold text-dark">{course.completionRate || 0}%</span>
                          </div>
                          <div className="bx-id-progress-track">
                            <motion.div 
                              className="bx-id-progress-bar" 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.completionRate || 0}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-2 text-md-end">
                          <Link to={`/instructor/lessons/module/${course._id || course.id}`} className="bx-id-arrow-btn w-100 w-md-auto" title="Open module system builder">
                            <FiArrowRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted small">No course records mapped to this instructor identity block.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ACTIVE STUDENT MONITOR ROSTER */}
        <div className="col-12 col-xl-4">
          <motion.div 
            className="bx-id-card-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiActivity className="text-primary" size={18} />
              <h3 className="bx-id-panel-title mb-0">Active Student Monitor</h3>
            </div>
            <p className="text-muted small mb-3">Live performance index tracking active student profiles registered across your blueprints.</p>

            <div className="table-responsive">
              <table className="bx-id-radar-table w-100">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Status</th>
                    <th className="text-end">Roster</th>
                  </tr>
                </thead>
                <tbody>
                  {atRiskStudents && atRiskStudents.length > 0 ? (
                    atRiskStudents.map((student, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className="bx-id-student-name d-block">{student.studentName}</span>
                          <span className="bx-id-student-meta text-muted">{student.lastActiveWindow || "Active Matrix"}</span>
                        </td>
                        <td>
                          <span className={`bx-id-deviation-badge ${student.performanceDropPercentage > 20 ? "is-danger" : "is-warning"}`}>
                            {student.performanceDropPercentage}% Delta
                          </span>
                        </td>
                        <td className="text-end">
                          <button type="button" className="bx-id-action-icon-btn" title="View Detailed Student Log">
                            <FiArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-muted small">No active student matrix data flowing into this roster block yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

      </section>

    </div>
  );
}

export default InstructorDashboard;