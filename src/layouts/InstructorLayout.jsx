import { Outlet } from "react-router-dom";

import { useMemo, useState } from "react";


import {
  FiBell,
  FiBookOpen,
  FiGrid,
  FiMessageSquare,
  FiPlayCircle,
  FiClipboard,
  FiUsers
} from "react-icons/fi";


import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function InstructorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = useMemo(
    () => [

      {
        label: "Dashboard",
        path: "/instructor",
        icon: <FiGrid />
      },

      {
        label: "Courses",
        path: "/instructor/courses",
        icon: <FiBookOpen />
      },

      {
        label: "Assignments",
        path: "/instructor/assignments",
        icon: <FiClipboard />
      },

      {
        label: "Students",
        path: "/instructor/students",
        icon: <FiUsers />
      },

      {
        label: "Live Classes",
        path: "/instructor/live-classes",
        icon: <FiPlayCircle />
      },

      {
        label: "Notifications",
        path: "/instructor/notifications",
        icon: <FiBell />
      },

      {
        label: "Messages",
        path: "/instructor/messages",
        icon: <FiMessageSquare />
      },

      {
        label: "Grade Submissions",
        path: "/instructor/grade-submissions",
        icon: <FiClipboard />
      }

    ]
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

export default InstructorLayout;