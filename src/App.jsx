/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Common
import Home from "./pages/Home";
import EmergencyDemo from "./pages/EmergencyDemo";
import NotFound from "./pages/NotFound";
import OrganDonation from "./pages/OrganDonation/OrganDonation";

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
import BloodBankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/card-ui.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/emergency" element={<EmergencyDemo />} />

            {/* Organ Donation */}
            <Route path="/organ-donation" element={<OrganDonation />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/find-doctor" element={<FindDoctor />} />
            <Route path="/patient/book-appointment/:doctorId" element={<BookAppointment />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />

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

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <ManageAppointments />
                </ProtectedRoute>
              }
            />

            {/* Blood Bank Routes */}
            <Route
              path="/bloodbank/dashboard"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <BloodBankDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/bloodbank/inventory" element={<ManageInventory />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
  