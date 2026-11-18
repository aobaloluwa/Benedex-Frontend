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
  const [hoveredPoint, setHoveredPoint] = useState(null);

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

  const curriculumRate =
    overview.completedCurriculumRate !== undefined
      ? overview.completedCurriculumRate
      : (overview.totalCourses > 0 ? 100 : 0);

  const publishedCoursesCount =
    overview.publishedCourses !== undefined
      ? overview.publishedCourses
      : (overview.totalCourses || 0);

  // Real-time Revenue Trajectory Chart Calculations
  const defaultMonthlyData = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
  ];

  const monthlyRevenueData =
    analytics.monthlyRevenue && analytics.monthlyRevenue.length === 6
      ? analytics.monthlyRevenue
      : defaultMonthlyData;

  const maxRevenueVal = Math.max(
    ...monthlyRevenueData.map((d) => d.revenue || 0),
    1
  );

  const xCoordinates = [50, 154, 258, 362, 466, 570];

  const chartPoints = monthlyRevenueData.map((d, i) => {
    const x = xCoordinates[i];
    const ratio = maxRevenueVal > 0 ? (d.revenue || 0) / maxRevenueVal : 0;
    const y = 170 - ratio * 140;
    return { x, y, month: d.month, revenue: d.revenue || 0 };
  });

  const buildPathString = (pts) => {
    if (pts.length === 0) return "";
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const controlX = (p0.x + p1.x) / 2;
      path += ` C ${controlX},${p0.y} ${controlX},${p1.y} ${p1.x},${p1.y}`;
    }
    return path;
  };

  const linePathD = buildPathString(chartPoints);
  const areaPathD = `${linePathD} L 570,170 L 50,170 Z`;

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
                    <stop offset="0%" stopColor="#07335c" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#07335c" stopOpacity="0.00" />
                  </linearGradient>
                </defs>
                
                <g className="bx-ad-chart-grid">
                  <line x1="50" y1="30" x2="570" y2="30" />
                  <line x1="50" y1="65" x2="570" y2="65" />
                  <line x1="50" y1="100" x2="570" y2="100" />
                  <line x1="50" y1="135" x2="570" y2="135" />
                  <line x1="50" y1="170" x2="570" y2="170" />
                </g>

                <path className="bx-ad-chart-area" d={areaPathD} />
                <path className="bx-ad-chart-line" d={linePathD} />

                {chartPoints.map((pt, pIdx) => (
                  <circle
                    key={pIdx}
                    className="bx-ad-chart-dot"
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

                {/* Y-Axis Percentage Scale Ticks */}
                <text x="10" y="34" className="bx-ad-axis-text">100%</text>
                <text x="10" y="69" className="bx-ad-axis-text">75%</text>
                <text x="10" y="104" className="bx-ad-axis-text">50%</text>
                <text x="10" y="139" className="bx-ad-axis-text">25%</text>
                <text x="10" y="174" className="bx-ad-axis-text">0%</text>

                {/* X-Axis Month Labels */}
                {chartPoints.map((pt, pIdx) => (
                  <text
                    key={pIdx}
                    x={pt.x}
                    y="195"
                    className="bx-ad-axis-text"
                    textAnchor="middle"
                    style={{ fontWeight: 600 }}
                  >
                    {pt.month}
                  </text>
                ))}

                {/* Interactive Tooltip Overlay */}
                {hoveredPoint && (
                  <g>
                    <rect
                      x={Math.max(10, Math.min(480, hoveredPoint.x - 55))}
                      y={Math.max(5, hoveredPoint.y - 34)}
                      width="110"
                      height="26"
                      rx="6"
                      fill="#07335c"
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text
                      x={Math.max(10, Math.min(480, hoveredPoint.x - 55)) + 55}
                      y={Math.max(5, hoveredPoint.y - 34) + 17}
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {hoveredPoint.month}: ₦{hoveredPoint.revenue.toLocaleString()}
                    </text>
                  </g>
                )}
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
                  <span className="text-muted">Published Curriculum Ratio</span>
                  <span className="text-dark font-weight-bold">
                    {curriculumRate}% ({publishedCoursesCount}/{overview.totalCourses || 0} Courses)
                  </span>
                </div>
                <div className="bx-ad-bar-track">
                  <motion.div 
                    className="bx-ad-bar-fill is-courses" 
                    initial={{ width: 0 }}
                    animate={{ width: `${curriculumRate}%` }}
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