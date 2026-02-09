import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
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
import BloodBankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";
import UrgentRequests from "./pages/Bloodbank/UrgentRequests";
import Donors from "./pages/Bloodbank/Donors";
import BloodBankProfile from "./pages/Bloodbank/Profile";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

// Misc
import EmergencyDemo from "./pages/EmergencyDemo";
import NotFound from "./pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/card-ui.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Patient */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            {/* ✅ PUBLIC: Users can see doctors without login, login required for booking */}
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
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientAppointments />
                </ProtectedRoute>
              }
            />
            {/* ✅ PUBLIC: Users can see blood info, login required for donation */}
            <Route path="/patient/blood-donation" element={<BloodDonation />} />

            {/* Doctor */}
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

            {/* Blood Bank */}
            <Route
              path="/bloodbank/dashboard"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <BloodBankDashboard />
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
                  <UrgentRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloodbank/donors"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <Donors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloodbank/profile"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <BloodBankProfile />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
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

            {/* Other */}
            <Route path="/emergency" element={<EmergencyDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
