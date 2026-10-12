import { useEffect, useState, useRef } from "react";
import { FiBell, FiChevronDown, FiSearch, FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuUser } from "react-icons/lu";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ALL_DASHBOARD_PAGES = [
  // Student Scope
  { label: "Dashboard Home", path: "/student", role: "student" },
  { label: "My Courses", path: "/student/courses", role: "student" },
  { label: "Assignments", path: "/student/assignments", role: "student" },
  { label: "Live Classes", path: "/student/live-classes", role: "student" },
  { label: "Messages", path: "/student/messages", role: "student" },
  { label: "Notifications", path: "/student/notifications", role: "student" },

  // Instructor Scope
  { label: "Dashboard Home", path: "/instructor", role: "instructor" },
  { label: "Courses", path: "/instructor/courses", role: "instructor" },
  { label: "Assignments", path: "/instructor/assignments", role: "instructor" },
  { label: "Students", path: "/instructor/students", role: "instructor" },
  { label: "Live Classes", path: "/instructor/live-classes", role: "instructor" },
  { label: "Notifications", path: "/instructor/notifications", role: "instructor" },
  { label: "Messages", path: "/instructor/messages", role: "instructor" },
  { label: "Grade Submissions", path: "/instructor/grade-submissions", role: "instructor" },

  // Admin Scope
  { label: "Dashboard Home", path: "/admin", role: "admin" },
  { label: "Users Management", path: "/admin/users", role: "admin" },
  { label: "Courses Management", path: "/admin/courses", role: "admin" },
  { label: "Payments & Invoices", path: "/admin/payments", role: "admin" },
  { label: "Analytics Overview", path: "/admin/analytics", role: "admin" },
  { label: "System Settings", path: "/admin/settings", role: "admin" }
];

function Topbar({ onMenuClick = () => {} }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [notificationCount, setNotificationCount] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = user?.role?.toLowerCase() || "student";

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        let count = 0;

        if (currentRole === "student") {
          // 🛠️ Fetch from the main notifications broadcast list to calculate unread bulletins
          const res = await API.get("/notifications");
          const broadcasts = res.data || [];
          count = broadcasts.filter((item) => !item.isRead).length;
        } else if (currentRole === "admin") {
          // Fetch admin pending tasks overview counter
          const res = await API.get("/admin/analytics");
          count = res.data?.overview?.pendingSubmissions || 0;
        } else {
          // Instructors / default route matching fallback
          const res = await API.get(`/dashboard/${currentRole}`);
          count = res.data?.unreadActivityCount || 0;
        }

        if (isMounted) setNotificationCount(count);
      } catch (error) {
        console.log("Topbar metric sync failed:", error);
      }
    };

    fetchNotifications();
    return () => { isMounted = false; };
  }, [location.pathname, currentRole]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const allowedPages = ALL_DASHBOARD_PAGES.filter(page => page.role === currentRole);
    const filteredPages = allowedPages
      .filter(page => page.label.toLowerCase().includes(query.toLowerCase()))
      .map(page => ({
        title: page.label,
        path: page.path,
        type: "Navigation"
      }));

    if (query.trim().length < 2) {
      setResults(filteredPages);
      return;
    }

    setIsLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await API.get(`/search?q=${query}`);
        setResults([...filteredPages, ...response.data]);
      } catch (error) {
        console.error("Omnibox tracking sync error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, currentRole]);

  const handleSelectResult = (item) => {
    setQuery("");
    setIsOpen(false);

    // 🚨 CODES DIRECT REDIRECT ROUTING INTERCEPTOR TO DM
    if (item.isStudentRedirect && currentRole === "instructor") {
      navigate("/instructor/messages", {
        state: {
          redirectedFromRoster: true,
          targetStudentData: item.studentData
        }
      });
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  const initials = (user?.fullName || "User")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="student-topbar">
      <button
        type="button"
        className="student-menu-toggle"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        aria-controls="student-navigation"
      >
        <FiMenu aria-hidden="true" />
      </button>
      <div className="search-container-wrapper" ref={dropdownRef} style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
        <label className="student-search" htmlFor="student-search-input">
          <FiSearch aria-hidden="true" />
          <input
            id="student-search-input"
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            placeholder={`Search ${currentRole} pages, courses...`}
            autoComplete="off"
          />
          {isLoading && <span className="search-spinner-text">...</span>}
        </label>

        {isOpen && results.length > 0 && (
          <div className="search-results-dropdown">
            {results.map((item, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleSelectResult(item)}
              >
                <div className="search-item-info">
                  <span className="search-item-title">{item.title}</span>
                  <span className="search-item-type-tag">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="student-top-actions">
        <Link className="student-icon-button student-notification-button" to={`/${currentRole}/notifications`}>
          <FiBell />
          {notificationCount > 0 ? (
            <span className="student-notification-badge">{notificationCount}</span>
          ) : null}
        </Link>

        <Link to="/profile" className="student-user-chip navbar-profile-icon-btn" style={{ textDecoration: "none" }}>
          <span className="student-user-avatar">{initials}</span>
          <div className="student-user-copy">
            <strong>{user?.fullName || "User Account"}</strong>
            <span style={{ textTransform: "capitalize" }}>{currentRole}</span>
          </div>
          <FiChevronDown className="student-user-chevron" />
        </Link>
      </div>
    </header>
  );
}

export default Topbar;