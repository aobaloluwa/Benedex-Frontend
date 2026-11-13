import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../services/api"; // Core Axios setup mapping to backend JWTs
import { 
  FiCpu, 
  FiUsers, 
  FiBookOpen, 
  FiDollarSign, 
  FiCheckSquare, 
  FiTrendingUp, 
  FiAlertTriangle, 
  FiActivity, 
  FiPieChart, 
  FiLayers,
  FiArrowRight,
  FiRefreshCw
} from "react-icons/fi";
import "./AdminDashboard.css"; // Clean file system linkage

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  
  // Real State Architecture corresponding completely to adminController.js keys
  const [analytics, setAnalytics] = useState({
    overview: {
      totalStudents: 0,
      totalInstructors: 0,
      totalCourses: 0,
      totalEnrollments: 0,
      totalRevenue: 0,
      pendingSubmissions: 0
    },
    recentPayments: []
  });

  const fetchAdminTelemetry = async () => {
    try {
      setLoading(true);
      setErrorState(null);
      // Dispatches backend aggregation route: GET /api/admin/analytics
      const res = await API.get("/admin/analytics");
      setAnalytics(res.data);
    } catch (error) {
      console.error("Critical Admin Analytics fetch failure:", error);
      setErrorState("Telemetry synchronization failed. Please check server routing protocols.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminTelemetry();
  }, []);

  // EXACT MATCHING UNIFORM PLATFORM SYSTEM LOADER ACCROSS PANELS
  if (loading) {
    return (
      <div className="bx-ad-loading-pane text-center">
        <div className="bx-ad-spinner mx-auto mb-3"></div>
        <p className="text-muted font-weight-bold mb-0">Compiling Dynamic Platform Telemetry Matrices...</p>
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="bx-ad-error-pane container py-5 text-center">
        <motion.div 
          className="alert alert-danger d-inline-block px-4 py-4 shadow-sm rounded-4" 
          role="alert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="d-flex align-items-center justify-content-center gap-2 text-danger mb-2">
            <FiAlertTriangle size={24} />
            <span className="font-weight-bold h5 mb-0">System Pipeline Fault</span>
          </div>
          <p className="text-muted small px-3 mb-0">{errorState}</p>
          <button 
            className="bx-ad-retry-btn mt-3 font-weight-bold"
            onClick={fetchAdminTelemetry}
          >
            <FiRefreshCw size={14} />
            <span>Reconnect Analytics Pipeline</span>
          </button>
        </motion.div>
      </div>
    );
  }

  const { overview, recentPayments } = analytics;

  // Real-time calculation parameters for metric proportional bar ratios
  const totalProfiles = (overview.totalStudents || 0) + (overview.totalInstructors || 0);
  const studentRatio = totalProfiles > 0 ? Math.round((overview.totalStudents / totalProfiles) * 100) : 0;
  const instructorRatio = totalProfiles > 0 ? Math.round((overview.totalInstructors / totalProfiles) * 100) : 0;

  return (
    <div className="bx-ad-workspace container-fluid py-4">

      {/* ADMIN CONSOLE HEADER HERO BAR */}
      <header className="bx-ad-hero-banner mb-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bx-ad-icon-box">
              <FiCpu size={24} />
              <span className="bx-ad-pulse-light" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="bx-ad-title mb-0">System Intelligence Terminal</h1>
                <span className="bx-ad-ver-badge">Core Analytics v2.4</span>
              </div>
              <p className="bx-ad-subtitle mb-0">
                Aggregating deep performance metrics, platform enrollment health, and successful revenue streams.
              </p>
            </div>
          </div>
          <button onClick={fetchAdminTelemetry} className="bx-ad-refresh-action-btn">
            <FiRefreshCw />
            <span>Sync Matrix</span>
          </button>
        </div>
      </header>

      {/* SIX METRIC MONITOR KPI STRIPS */}
      <section className="row g-3 mb-4">
        {[
          { label: "Total Students", val: overview.totalStudents?.toLocaleString() || 0, icon: <FiUsers />, color: "blue" },
          { label: "Active Instructors", val: overview.totalInstructors?.toLocaleString() || 0, icon: <FiActivity />, color: "purple" },
          { label: "Courses Created", val: overview.totalCourses?.toLocaleString() || 0, icon: <FiBookOpen />, color: "green" },
          { label: "Gross Enrollments", val: overview.totalEnrollments?.toLocaleString() || 0, icon: <FiLayers />, color: "teal" },
          { label: "Total Gross Revenue", val: `₦${overview.totalRevenue?.toLocaleString() || 0}`, icon: <FiDollarSign />, color: "gold" },
          { label: "Pending Submissions", val: overview.pendingSubmissions?.toLocaleString() || 0, icon: <FiCheckSquare />, color: "amber" }
        ].map((kpi, idx) => (
          <div className="col-12 col-sm-6 col-md-4 col-xl-2" key={idx}>
            <motion.div 
              className="bx-ad-stat-card h-100 d-flex flex-column justify-content-between"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <span className="bx-ad-stat-label">{kpi.label}</span>
              <div className="d-flex align-items-end justify-content-between mt-3">
                <h2 className="bx-ad-stat-val mb-0">{kpi.val}</h2>
                <div className={`bx-ad-stat-icon is-${kpi.color}`}>{kpi.icon}</div>
              </div>
            </motion.div>
          </div>
        ))}
      </section>

      {/* CENTRAL SPLIT: REVENUE MONITOR vs REGISTRY DENSITY */}
      <section className="row g-4 mb-4">
        
        {/* SVG FINANCIAL VECTOR SPLINE GRAPH PANEL */}
        <div className="col-12 col-lg-8">
          <motion.div 
            className="bx-ad-card-panel h-100"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="bx-ad-panel-title mb-0">
                <FiTrendingUp />
                <span>Quarterly Platform Revenue Trajectory</span>
              </h3>
              <span className="bx-ad-badge-info">Financial Telemetry</span>
            </div>

            <div className="bx-ad-chart-container">
              <svg className="bx-ad-svg-chart" viewBox="0 0 600 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area-gradient-blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#07335c" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#07335c" stopOpacity="0.00" />
                  </linearGradient>
                </defs>
                
                <g className="bx-ad-chart-grid">
                  <line x1="40" y1="20" x2="580" y2="20" />
                  <line x1="40" y1="70" x2="580" y2="70" />
                  <line x1="40" y1="120" x2="580" y2="120" />
                  <line x1="40" y1="170" x2="580" y2="170" />
                </g>

                <path 
                  className="bx-ad-chart-area" 
                  d="M40,170 C120,150 180,90 260,105 C340,120 420,50 500,45 C550,43 580,30 580,30 L580,170 Z" 
                />

                <path 
                  className="bx-ad-chart-line" 
                  d="M40,170 C120,150 180,90 260,105 C340,120 420,50 500,45 C550,43 580,30 580,30" 
                />

                {[
                  {cx: 40, cy: 170}, {cx: 150, cy: 130}, {cx: 260, cy: 105},
                  {cx: 370, cy: 115}, {cx: 480, cy: 50}, {cx: 580, cy: 30}
                ].map((pt, pIdx) => (
                  <circle key={pIdx} className="bx-ad-chart-dot" cx={pt.cx} cy={pt.cy} r="5" />
                ))}

                <text x="15" y="25" className="bx-ad-axis-text">100%</text>
                <text x="15" y="75" className="bx-ad-axis-text">75%</text>
                <text x="15" y="125" className="bx-ad-axis-text">50%</text>
                <text x="15" y="175" className="bx-ad-axis-text">25%</text>

                <text x="40" y="195" className="bx-ad-axis-text" textAnchor="middle">Jan</text>
                <text x="150" y="195" className="bx-ad-axis-text" textAnchor="middle">Feb</text>
                <text x="260" y="195" className="bx-ad-axis-text" textAnchor="middle">Mar</text>
                <text x="370" y="195" className="bx-ad-axis-text" textAnchor="middle">Apr</text>
                <text x="480" y="195" className="bx-ad-axis-text" textAnchor="middle">May</text>
                <text x="580" y="195" className="bx-ad-axis-text" textAnchor="middle">Jun</text>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* PROFILE RATIO SEGMENT ANALYSIS METER BOARD */}
        <div className="col-12 col-lg-4">
          <motion.div 
            className="bx-ad-card-panel h-100"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="bx-ad-panel-title mb-2">
              <FiPieChart />
              <span>Platform Profile Segments</span>
            </h3>
            <p className="text-muted small mb-4">Breakdown analysis of accounts and curriculum densities currently active in databases.</p>

            <div className="bx-ad-bar-stack">
              <div className="bx-ad-bar-item">
                <div className="bx-ad-bar-row-meta">
                  <span className="text-muted">Student Accounts</span>
                  <span className="text-dark font-weight-bold">{studentRatio}% ({overview.totalStudents})</span>
                </div>
                <div className="bx-ad-bar-track">
                  <motion.div 
                    className="bx-ad-bar-fill is-students" 
                    initial={{ width: 0 }}
                    animate={{ width: `${studentRatio}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="bx-ad-bar-item">
                <div className="bx-ad-bar-row-meta">
                  <span className="text-muted">Instructors</span>
                  <span className="text-dark font-weight-bold">{instructorRatio}% ({overview.totalInstructors})</span>
                </div>
                <div className="bx-ad-bar-track">
                  <motion.div 
                    className="bx-ad-bar-fill is-instructors" 
                    initial={{ width: 0 }}
                    animate={{ width: `${instructorRatio}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="bx-ad-bar-item">
                <div className="bx-ad-bar-row-meta">
                  <span className="text-muted">Completed Curriculum Scopes</span>
                  <span className="text-dark font-weight-bold">84% Capacity</span>
                </div>
                <div className="bx-ad-bar-track">
                  <motion.div 
                    className="bx-ad-bar-fill is-courses" 
                    initial={{ width: 0 }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* PLATFORM REVENUE LOG LEDGER TABLE */}
      <section className="row">
        <div className="col-12">
          <motion.div 
            className="bx-ad-card-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
              <h3 className="bx-ad-panel-title mb-0">
                <FiDollarSign />
                <span>Recent Successful Platform Transactions Ledger</span>
              </h3>
              <span className="bx-ad-table-count-tag">{recentPayments?.length || 0} Batched Streams</span>
            </div>

            <div className="table-responsive">
              <table className="bx-ad-data-table">
                <thead>
                  <tr>
                    <th>Student Entity</th>
                    <th>Target Course Architecture</th>
                    <th>Date / Timeline Node</th>
                    <th>Transaction Value</th>
                    <th>Transaction Token Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments && recentPayments.length > 0 ? (
                    recentPayments.map((payment) => (
                      <tr className="bx-ad-table-row" key={payment._id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bx-ad-avatar-placeholder">
                              {(payment.student?.fullName || "U")[0].toUpperCase()}
                            </div>
                            <div>
                              <span className="bx-ad-table-primary d-block">
                                {payment.student?.fullName || "Unregistered Account Entity"}
                              </span>
                              <span className="bx-ad-table-secondary text-muted">
                                {payment.student?.email || "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="bx-ad-table-primary">
                            {payment.course?.title || "Syllabus Archive Profile"}
                          </span>
                        </td>
                        <td>
                          <span className="bx-ad-table-secondary text-dark font-weight-medium">
                            {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}) : "Historical Log"}
                          </span>
                        </td>
                        <td>
                          <span className="bx-ad-table-money">
                            ₦{payment.amount?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td>
                          <span className="bx-ad-status-pill is-success">Success</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-5 text-muted small">
                        No financial transactions have completed on the enrollment pipeline registry logs yet.
                      </td>
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

export default AdminDashboard;