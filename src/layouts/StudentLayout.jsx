import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FiBell,
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiPlayCircle,
  FiClipboard,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import AiSupportWidget from "../components/layout/AiSupportWidget"; // <-- Imported Support Widget

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const links = useMemo(
    () => [
      {
        label: "Dashboard",
        path: "/student",
        icon: <FiGrid />,
      },
      {
        label: "My Courses",
        path: "/student/courses",
        icon: <FiBookOpen />,
      },
      {
        label: "Assignments",
        path: "/student/assignments",
        icon: <FiClipboard />,
      },
      {
        label: "Live Classes",
        path: "/student/live-classes",
        icon: <FiPlayCircle />,
      },
      {
        label: "Messages",
        path: "/student/messages",
        icon: <FiMessageSquare />,
      },
      {
        label: "Notifications",
        path: "/student/notifications",
        icon: <FiBell />,
      },
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

      {/* Floating AI widget sitting over the layout shell structure natively */}
      <AiSupportWidget />
    </div>
  );
}

export default StudentLayout;