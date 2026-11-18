import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FiBell,
  FiBookOpen,
  FiGrid,
  FiUsers,
  FiAlertCircle,
  FiActivity,
  FiCpu,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { MdPayments } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";

function AdminLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = useMemo(() => {
    const allLinks = [
      {
        label: "Dashboard",
        path: "/admin",
        icon: <FiGrid />,
        roles: ["admin", "superadmin"]
      },
      {
        label: "Users",
        path: "/admin/users",
        icon: <FiUsers />,
        roles: ["superadmin"]
      },
      {
        label: "Courses",
        path: "/admin/courses",
        icon: <FiBookOpen />,
        roles: ["admin", "superadmin"]
      },
      {
        label: "AI Course Generator",
        path: "/admin/syllabus-generator",
        icon: <FiCpu />,
        roles: ["admin", "superadmin"]
      },
      {
        label: "Payments",
        path: "/admin/payments",
        icon: <MdPayments />,
        roles: ["superadmin"]
      },
      {
        label: "Analytics",
        path: "/admin/analytics",
        icon: <GrAnalytics />,
        roles: ["superadmin"]
      },
      {
        label: "Support Tickets",
        path: "/admin/tickets",
        icon: <FiAlertCircle />,
        roles: ["admin", "superadmin"]
      },
      {
        label: "Notifications",
        path: "/admin/notifications",
        icon: <FiBell />,
        roles: ["admin", "superadmin"]
      },
      {
        label: "Activity",
        path: "/admin/activity-logs",
        icon: <FiActivity />,
        roles: ["superadmin"]
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: <CiSettings />,
        roles: ["superadmin"]
      }
    ];

    return allLinks.filter((link) => link.roles.includes(user?.role));
  }, [user?.role]);

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