import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import { traineeNav, trainerNav, adminNav } from "./utils/navConfig";

import Landing from "./pages/public/Landing";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import TrainersPage from "./pages/public/TrainersPage";
import CourseCatalog from "./pages/public/CourseCatalog";
import CourseDetails from "./pages/public/CourseDetails";
import Checkout from "./pages/public/Checkout";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import MyLearning from "./pages/trainee/MyLearning";
import LearningPlayer from "./pages/trainee/LearningPlayer";
import TraineeAssessments from "./pages/trainee/TraineeAssessments";
import AssessmentTake from "./pages/trainee/AssessmentTake";
import AssessmentResult from "./pages/trainee/AssessmentResult";
import TraineeCertificates from "./pages/trainee/TraineeCertificates";
import CertificateVerification from "./pages/trainee/CertificateVerification";
import TraineeResources from "./pages/trainee/TraineeResources";
import Feedback from "./pages/trainee/Feedback";
import TraineeProfile from "./pages/trainee/TraineeProfile";
import NotificationsPage from "./pages/trainee/NotificationsPage";

import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import CreateCourse from "./pages/trainer/CreateCourse";
import TrainerLibrary from "./pages/trainer/TrainerLibrary";
import TrainerAssessments from "./pages/trainer/TrainerAssessments";
import TraineePerformance from "./pages/trainer/TraineePerformance";
import TrainerProfile from "./pages/trainer/TrainerProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import { AdminEnrollments, AdminAssessments } from "./pages/admin/AdminEnrollmentsAssessments";
import CompetencyMapping from "./pages/admin/CompetencyMapping";
import AdminCertifications from "./pages/admin/AdminCertifications";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import { AdminReports, AdminSettings } from "./pages/admin/AdminReportsSettings";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick so the target section has mounted after route change.
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/courses/:id/checkout" element={<Checkout />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route
              path="/trainee"
              element={
                <ProtectedRoute role="trainee">
                  <DashboardLayout navItems={traineeNav} roleLabel="Trainee" title="Trainee Portal" notifPath="/trainee/notifications" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TraineeDashboard />} />
              <Route path="my-learning" element={<MyLearning />} />
              <Route path="learn/:id" element={<LearningPlayer />} />
              <Route path="assessments" element={<TraineeAssessments />} />
              <Route path="assessments/:id" element={<AssessmentTake />} />
              <Route path="assessments/:id/result" element={<AssessmentResult />} />
              <Route path="certificates" element={<TraineeCertificates />} />
              <Route path="certificate-verification" element={<CertificateVerification />} />
              <Route path="resources" element={<TraineeResources />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="profile" element={<TraineeProfile />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            <Route
              path="/trainer"
              element={
                <ProtectedRoute role="trainer">
                  <DashboardLayout navItems={trainerNav} roleLabel="Trainer" title="Trainer Portal" notifPath="/trainer/notifications" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TrainerDashboard />} />
              <Route path="courses" element={<TrainerCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route path="library" element={<TrainerLibrary />} />
              <Route path="assessments" element={<TrainerAssessments />} />
              <Route path="trainees" element={<TraineePerformance title="Trainees" />} />
              <Route path="performance" element={<TraineePerformance title="Performance Analytics" />} />
              <Route path="competency" element={<CompetencyMapping />} />
              <Route path="profile" element={<TrainerProfile />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <DashboardLayout navItems={adminNav} roleLabel="Admin" title="Admin Console" notifPath="/admin/notifications" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="enrollments" element={<AdminEnrollments />} />
              <Route path="assessments" element={<AdminAssessments />} />
              <Route path="competency" element={<CompetencyMapping />} />
              <Route path="certifications" element={<AdminCertifications />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
