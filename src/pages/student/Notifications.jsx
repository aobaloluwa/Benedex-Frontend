import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiLogIn,
  FiPlayCircle,
  FiRadio,
  FiStar,
  FiUsers,
  FiBell,
  FiArchive
} from "react-icons/fi";
import API from "../../services/api";
import "./Notifications.css";

// Maps student personal activities (from dashboard log)
const activityIconMap = {
  account_registered: <FiUsers />,
  user_logged_in: <FiLogIn />,
  course_enrolled: <FiBookOpen />,
  assignment_submitted: <FiCheckCircle />,
  module_completed: <FiLayers />,
  lesson_started: <FiPlayCircle />,
  live_class_joined: <FiRadio />,
  xp_awarded: <FiStar />,
};

const formatTimeAgo = (value) => {
  if (!value) return "Just now";
  const date = new Date(value);
  const diffSeconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

function Notifications() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNotificationData = async () => {
      try {
        const dashboardRes = await API.get("/dashboard/student");

        if (isMounted) {
          setDashboard(dashboardRes.data);
        }

        await API.put("/student/dashboard/activities/viewed");
        window.dispatchEvent(new Event("student-activities-updated"));
      } catch (error) {
        console.error("Error fetching activity log feed:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotificationData();

    return () => {
      isMounted = false;
    };
  }, []);

  const recentActivities = useMemo(
    () => dashboard?.recentActivities || [],
    [dashboard]
  );

  if (loading) {
    return (
      <div className="bx-nt-loading-pane">
        <div className="bx-nt-spinner" />
        <p className="mt-3 text-muted font-weight-bold">Compiling Activity Log Feed...</p>
      </div>
    );
  }

  return (
    <div className="bx-nt-workspace">
      {/* ADMIN-STYLE BRAND HEADER STRIP */}
      <header className="bx-nt-header mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bx-nt-icon-box">
              <FiBell size={24} />
              <span className="bx-nt-pulse-light" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h1 className="h3 mb-0 font-weight-bold text-dark">Activity Log & Notifications</h1>
                <span className="bx-nt-ver-badge">{recentActivities.length} Activity Events</span>
              </div>
              <p className="text-muted mb-0 small">
                Track your course enrollments, milestone submissions, live class logins, and earned achievements.
              </p>
            </div>
          </div>

          <Link className="bx-nt-btn-back" to="/student">
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </header>

      {/* FEED LIST */}
      <div className="bx-nt-feed-container">
        <div className="d-flex flex-column gap-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((item, index) => (
              <motion.article
                key={item._id || `${item.type}-${item.createdAt}-${index}`}
                className="bx-nt-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <div className="bx-nt-avatar-icon">
                  {activityIconMap[item.type] || <FiClock />}
                </div>

                <div className="bx-nt-card-content">
                  <h3 className="h6 font-weight-bold text-dark mb-1">{item.title || "System Log Notification"}</h3>
                  <div className="d-flex align-items-center gap-2 text-muted extra-small">
                    <FiClock /> {formatTimeAgo(item.createdAt)}
                    <span>•</span>
                    <span className="text-capitalize">{item.type ? item.type.replaceAll("_", " ") : "Log Item"}</span>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="bx-nt-card bx-nt-empty-card text-center py-5">
              <div className="bx-nt-empty-icon mb-3">
                <FiClock size={36} />
              </div>
              <h3 className="h5 font-weight-bold text-dark mb-2">Activity Log Empty</h3>
              <p className="text-muted small mb-0 max-width-400 mx-auto">
                Actions like registering, enrolling, and submitting assignments will compile updates here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;