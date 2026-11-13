import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  FiVideo,
  FiCalendar,
  FiUsers,
  FiPlayCircle,
  FiClock,
  FiActivity,
  FiAlertCircle,
  FiRadio
} from "react-icons/fi";
import { BsBroadcast } from "react-icons/bs";
import { motion } from "framer-motion";
import "./LiveClasses.css";

function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await API.get("/live-classes/student");
        setClasses(res.data || []);
      } catch (error) {
        console.error("Error fetching live classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleJoinClass = async (liveClass) => {
    try {
      const res = await API.post(`/live-classes/join/${liveClass._id}`);
      const meetingLink = res.data?.meetingLink || liveClass.meetingLink;

      if (meetingLink) {
        window.open(meetingLink, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Live room connection error:", error);
    }
  };

  const upcomingClasses = classes.filter(
    (item) => new Date(item.startTime) > new Date()
  );

  if (loading) {
    return (
      <div className="bx-lc-loading-pane">
        <div className="bx-lc-spinner" />
        <p className="mt-3 text-muted font-weight-bold">Initializing Live Streaming Rooms...</p>
      </div>
    );
  }

  return (
    <div className="bx-lc-workspace">

      {/* ADMIN-STYLE BRAND HEADER STRIP */}
      <header className="bx-lc-header mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bx-lc-icon-box">
              <BsBroadcast size={24} />
              <span className="bx-lc-pulse-light" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h1 className="h3 mb-0 font-weight-bold text-dark">Live Interactive Classes</h1>
                <span className="bx-lc-ver-badge">Live Learning Network</span>
              </div>
              <p className="text-muted mb-0 small">
                Join real-time streaming rooms, interactive workshops, and live mentorship sessions.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ADMIN-STYLE METRICS SUMMARY ROW */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-lc-stat-card">
            <div className="bx-lc-stat-icon-box color-blue">
              <FiVideo size={20} />
            </div>
            <div>
              <span className="bx-lc-stat-label">Total Stream Rooms</span>
              <h3 className="bx-lc-stat-number">{classes.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-lc-stat-card">
            <div className="bx-lc-stat-icon-box color-green">
              <FiCalendar size={20} />
            </div>
            <div>
              <span className="bx-lc-stat-label">Scheduled Live Sessions</span>
              <h3 className="bx-lc-stat-number">{upcomingClasses.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="bx-lc-stat-card">
            <div className="bx-lc-stat-icon-box color-amber">
              <FiActivity size={20} />
            </div>
            <div>
              <span className="bx-lc-stat-label">Broadcaster Status</span>
              <h3 className="bx-lc-stat-number">Active</h3>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE CLASSES SECTION */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 font-weight-bold text-dark mb-0">Active Broadcasters</h2>
        <span className="badge bg-light text-dark border">{classes.length} Available Rooms</span>
      </div>

      {classes.length > 0 ? (
        <div className="row g-4">
          {classes.map((liveClass) => (
            <div key={liveClass._id} className="col-12 col-md-6 col-xl-4">
              <div className="bx-lc-card h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="bx-lc-live-badge">
                    <BsBroadcast className="bx-pulse-icon" /> Live Transmission
                  </span>
                </div>

                <h3 className="h6 font-weight-bold text-dark mb-3">{liveClass.title}</h3>

                <div className="bx-lc-meta-list mb-4">
                  <div className="bx-lc-meta-item">
                    <FiUsers className="text-muted" />
                    <span>Faculty: <strong>{liveClass.instructor?.fullName || "Unassigned Faculty"}</strong></span>
                  </div>

                  <div className="bx-lc-meta-item">
                    <FiCalendar className="text-muted" />
                    <span>Date: <strong>{new Date(liveClass.startTime).toLocaleDateString()}</strong></span>
                  </div>

                  <div className="bx-lc-meta-item">
                    <FiClock className="text-muted" />
                    <span>Time: <strong>{new Date(liveClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  className="bx-lc-btn-join w-100"
                  onClick={() => handleJoinClass(liveClass)}
                >
                  <FiPlayCircle /> Join Live Stream Room
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bx-lc-card bx-lc-empty-card text-center py-5">
          <div className="bx-lc-empty-icon mb-3">
            <FiAlertCircle size={36} />
          </div>
          <h3 className="h5 font-weight-bold text-dark mb-2">No Stream Feeds Broadcasting</h3>
          <p className="text-muted small mb-0 max-width-400 mx-auto">
            Your currently enrolled course modules do not have active live streaming sessions scheduled right now.
          </p>
        </div>
      )}
    </div>
  );
}

export default LiveClasses;