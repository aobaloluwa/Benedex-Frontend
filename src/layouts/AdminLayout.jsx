import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  FiBell,
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiPlayCircle,
  FiClipboard,
  FiUsers,
  FiAlertCircle,
  FiActivity,
  FiCpu, // Added for the AI Syllabus Generator navigation link
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { MdPayments } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const links = useMemo(
    () => [
      {
        label: "Dashboard",
        path: "/admin",
        icon: <FiGrid />
      },

      {
        label: "Users",
        path: "/admin/users",
        icon: <FiUsers />
      },

      {
        label: "Courses",
        path: "/admin/courses",
        icon: <FiBookOpen />
      },

      {
        label: "AI Course Generator",
        path: "/admin/syllabus-generator",
        icon: <FiCpu />
      },

      {
        label: "Payments",
        path: "/admin/payments",
        icon: <MdPayments />
      },

      {
        label: "Analytics",
        path: "/admin/analytics",
        icon: <GrAnalytics />
      },

      {
        label: "Support Tickets",
        path: "/admin/tickets",
        icon: <FiAlertCircle />
      },

      {
        label: "Notifications",
        path: "/admin/notifications",
        icon: <FiBell />
      },

      {
        label: "Activity",
        path: "/admin/activity-logs",
        icon: <FiActivity />
      },

      {
        label: "Settings",
        path: "/admin/settings",
        icon: <CiSettings />
      }
    ],
    []
  );

  return (
    <div className="student-shell">
      <Sidebar links={links} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="student-main">
        <Topbar onMenuClick={() => setSidebarOpen((open) => !open)} />

        <main className="student-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;