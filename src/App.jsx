import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import Layout from "./components/Layout/Layout";
import PatientLayout from "./components/Layout/PatientLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Common
import Home from "./pages/Home";

// Patient
import PatientDashboard from "./pages/Patient/Dashboard";
import FindDoctor from "./pages/Patient/FindDoctor";
import BookAppointment from "./pages/Patient/BookAppointment";
import PatientAppointments from "./pages/Patient/Appointments";
import BloodDonation from "./pages/Patient/BloodDonation";
import PatientRecords from "./pages/Patient/Records";
import PatientProfile from "./pages/Patient/Profile";

// Doctor
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ManageAppointments from "./pages/Doctor/ManageAppointments";

// Blood Bank
import BloodbankDashboard from "./pages/Bloodbank/BloodBankDashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";
import UrgentRequestCard from "./pages/Bloodbank/UrgentRequestCard";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import HospitalManagement from "./pages/Admin/HospitalManagement";
import AppointmentsManagement from "./pages/Admin/AppointmentsManagement";
import ReportsAndAnalytics from "./pages/Admin/ReportsAndAnalytics";

// Misc
import EmergencyDemo from "./pages/EmergencyDemo";
import NotFound from "./pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/card-ui.css";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
        <Routes>
          {/* ===================== PUBLIC ROUTES ===================== */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/patient/find-doctor" element={<FindDoctor />} />
            <Route path="/patient/blood-donation" element={<BloodDonation />} />
            <Route path="/patient/book-appointment/:doctorId" element={<BookAppointment />} />
            <Route path="/emergency" element={<EmergencyDemo />} />
          </Route>

          {/* ===================== PATIENT ROUTES ===================== */}
          <Route element={<PatientLayout />}>
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/records"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/profile"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientAppointments />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ===================== DOCTOR ROUTES ===================== */}
          <Route element={<Layout />}>
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <ManageAppointments />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ===================== BLOOD BANK ROUTES ===================== */}
          <Route element={<Layout />}>
            <Route
              path="/bloodbank/dashboard"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <BloodbankDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloodbank/inventory"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <ManageInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloodbank/urgent-requests"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <UrgentRequestCard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ===================== ADMIN ROUTES ===================== */}
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hospitals"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <HospitalManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AppointmentsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ReportsAndAnalytics />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ===================== 404 NOT FOUND ===================== */}
          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
