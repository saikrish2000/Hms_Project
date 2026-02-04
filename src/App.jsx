import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";

// Auth Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Common Pages
import Home from "./pages/Home";

// Patient Pages
import PatientDashboard from "./pages/Patient/Dashboard";
import FindDoctor from "./pages/Patient/FindDoctor";
import BookAppointment from "./pages/Patient/BookAppointment";
import PatientAppointments from "./pages/Patient/Appointments";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ManageAppointments from "./pages/Doctor/ManageAppointments";

// Blood Bank Pages
import BloodbankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

// 404
import NotFound from "./pages/NotFound";
import EmergencyDemo from "./pages/EmergencyDemo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/find-doctor" element={<FindDoctor />} />
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
              element={<ManageAppointments />}
            />

            {/* Blood Bank Routes */}
            <Route
              path="/bloodbank/dashboard"
              element={<BloodbankDashboard />}
            />
            <Route path="/bloodbank/inventory" element={<ManageInventory />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />

            {/* 404 */}
            <Route path="/emergency" element={<EmergencyDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
