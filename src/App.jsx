import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import UrgentRequests from "./pages/Bloodbank/UrgentRequests";
import Donors from "./pages/Bloodbank/Donors";
import BloodBankProfile from "./pages/Bloodbank/Profile";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

// 404
import NotFound from "./pages/NotFound";
import EmergencyDemo from "./pages/EmergencyDemo";

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

            {/* 🫀 Organ Donation */}
            <Route path="/organ-donation" element={<OrganDonation />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/find-doctor" element={<FindDoctor />} />

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

            {/* ✅ PUBLIC: Show booking form, auth check happens on submit */}
            <Route
              path="/patient/book-appointment/:doctorId"
              element={<BookAppointment />}
            />
            <Route
              path="/patient/appointments"
              element={<PatientAppointments />}
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
            <Route path="/emergency" element={<EmergencyDemo />} />
            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
  