import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/landingPage/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintainance";
import CertificateVerification from "./pages/public/CertificateVerification";

import StudentLayout from "./layouts/StudentLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import AdminLayout from "./layouts/AdminLayout";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import CourseDetails from "./pages/student/StudentsCourseDetails";
import Assignments from "./pages/student/Assignments";
import Notifications from "./pages/student/Notifications";
import LiveClasses from "./pages/student/LiveClasses";
import Messages from "./pages/student/Messages";
import StudentQuiz from "./pages/student/StudentQuiz";
import CertificateView from "./pages/student/CertificateView";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import GradeSubmissions from "./pages/instructor/GradeSubmissions";
import InstructorLiveClasses from "./pages/instructor/InstructorLiveClasses";
import InstructorNotifications from "./pages/instructor/InstructorNotifications";
import InstructorMessages from "./pages/instructor/InstructorMessages";
import CreateCourse from "./pages/instructor/CreateCourse";
import CreateModule from "./pages/instructor/CreateModule";
import CreateAssignment from "./pages/instructor/CreateAssignment";
import InstructorStudents from "./pages/instructor/InstructorStudents";
import InstructorCourseDetails from "./pages/instructor/InstructorCourseDetails";
import InstructorLessons from "./pages/instructor/InstructorLessons";
import InstructorQuizBuilder from "./pages/instructor/InstructorQuizBuilder";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCourses from "./pages/admin/AdminCourses";
import PaymentCallback from "./pages/payments/PaymentCallback";
import AdminAiTickets from "./pages/admin/AdminAiTickets";
import AdminNotifications from "./pages/admin/AdminNotificationForm";
import AdminActivityLog from "./pages/admin/AdminActivityLog";
import AdminSyllabusGenerator from "./pages/admin/AdminSyllabusGenerator";
import AdminCourseReview from "./pages/admin/AdminCourseReview";


function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "student") {
    return <Navigate to="/student" replace />;
  }

  if (user.role === "instructor") {
    return <Navigate to="/instructor" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
}

function ProfileLayoutShell() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <AdminLayout />;
  }

  if (user.role === "instructor") {
    return <InstructorLayout />;
  }

  return <StudentLayout />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route
          path="/how-it-works"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["student", "instructor", "admin"]}>
              <ProfileLayoutShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
        </Route>

        <Route
          path="/payments/callback"
          element={<PaymentCallback />}
        />

        <Route
          path="/maintenance"
          element={<Maintenance />}
        />

        <Route
          path="/verify/:certificateId"
          element={<CertificateVerification />}
        />

        <Route
          path="/home"
          element={<HomeRedirect />}
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<StudentDashboard />}
          />

          <Route
            path="courses"
            element={<StudentCourses />}
          />

          <Route
            path="assignments"
            element={<Assignments />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="live-classes"
            element={<LiveClasses />}
          />

          <Route
            path="messages"
            element={<Messages />}
          />

          <Route
            path="quiz/:quizId"
            element={<StudentQuiz />}
          />

          <Route
            path="certificate/view/:courseId"
            element={<CertificateView />}
          />

          <Route
            path="certificate-callback"
            element={<PaymentCallback />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        <Route
          path="/student/courses/:courseId"
          element={
            <ProtectedRoute roles={["student"]}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<InstructorDashboard />}
          />

          <Route
            path="courses"
            element={<InstructorCourses />}
          />

          <Route
            path="create-course"
            element={<CreateCourse />}
          />

          <Route
            path="create-module/:courseId"
            element={<CreateModule />}
          />

          <Route
            path="create-assignment/:courseId"
            element={<CreateAssignment />}
          />

          <Route
            path="assignments"
            element={<CreateAssignment />}
          />

          <Route
            path="students"
            element={<InstructorStudents />}
          />

          <Route
            path="grade-submissions"
            element={<GradeSubmissions />}
          />

          <Route
            path="live-classes"
            element={<InstructorLiveClasses />}
          />

          <Route
            path="notifications"
            element={<InstructorNotifications />}
          />

          <Route
            path="messages"
            element={<InstructorMessages />}
          />

          <Route
            path="course/:courseId"
            element={<InstructorCourseDetails />}
          />

          <Route
            path="lessons/:moduleId"
            element={<InstructorLessons />}
          />

          <Route
            path="quiz-builder/:moduleId"
            element={<InstructorQuizBuilder />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="payments"
            element={<AdminPayments />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

          <Route
            path="courses"
            element={<AdminCourses />}
          />

          <Route
            path="tickets"
            element={<AdminAiTickets />}
          />

          <Route
            path="notifications"
            element={<AdminNotifications />}
          />

          <Route
            path="activity-logs"
            element={<AdminActivityLog />}
          />

          <Route
            path="syllabus-generator"
            element={<AdminSyllabusGenerator />}
          />

          <Route
            path="courses/:courseId/review"
            element={<AdminCourseReview />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;