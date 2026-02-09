// Example: App.jsx with Admin Module Routes Integrated
// This shows how to add the admin routes to your existing App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Module Components
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import HospitalManagement from "./pages/Admin/HospitalManagement";
import AppointmentsManagement from "./pages/Admin/AppointmentsManagement";
import ReportsAndAnalytics from "./pages/Admin/ReportsAndAnalytics";

// Patient Routes
import PatientLayout from "./components/Layout/PatientLayout";
import PatientDashboard from "./pages/Patient/Dashboard";
import FindDoctor from "./pages/Patient/FindDoctor";
import BookAppointment from "./pages/Patient/BookAppointment";
import Appointments from "./pages/Patient/Appointments";
import Prescriptions from "./pages/Patient/Prescriptions";
import Records from "./pages/Patient/Records";
import Profile from "./pages/Patient/Profile";
import HealthMetrics from "./pages/Patient/HealthMetrics";
import BloodDonation from "./pages/Patient/BloodDonation";

// Doctor Routes
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ManageAppointments from "./pages/Doctor/ManageAppointments";
import UploadPrescription from "./pages/Doctor/UploadPrescription";

// Blood Bank Routes
import BloodBankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";

function App() {
  return (
    <Router>
      <Routes>
        {/* ====================== PUBLIC ROUTES ====================== */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* ====================== ADMIN ROUTES ====================== */}
        {/* Main Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* User Management */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Hospital Management */}
        <Route
          path="/admin/hospitals"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <HospitalManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Appointments Management */}
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AppointmentsManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Reports & Analytics */}
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <ReportsAndAnalytics />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ====================== PATIENT ROUTES ====================== */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <PatientDashboard />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/find-doctor"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <FindDoctor />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <BookAppointment />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <Appointments />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/prescriptions"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <Prescriptions />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/records"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <Records />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/health-metrics"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <HealthMetrics />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/blood-donation"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <BloodDonation />
              </PatientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientLayout>
                <Profile />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        {/* ====================== DOCTOR ROUTES ====================== */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute requiredRole="doctor">
              <Layout>
                <DoctorDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute requiredRole="doctor">
              <Layout>
                <ManageAppointments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescriptions"
          element={
            <ProtectedRoute requiredRole="doctor">
              <Layout>
                <UploadPrescription />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ====================== BLOOD BANK ROUTES ====================== */}
        <Route
          path="/bloodbank"
          element={
            <ProtectedRoute requiredRole="bloodbank">
              <Layout>
                <BloodBankDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bloodbank/inventory"
          element={
            <ProtectedRoute requiredRole="bloodbank">
              <Layout>
                <ManageInventory />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ====================== 404 / NOT FOUND ====================== */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

/**
 * ============ IMPLEMENTATION NOTES ============
 * 
 * 1. This example assumes your ProtectedRoute component:
 *    - Accepts a 'requiredRole' prop
 *    - Validates user.role from AuthContext
 *    - Redirects to login if not authenticated
 *    - Redirects to 404 if role doesn't match
 * 
 * 2. Make sure your user object in AuthContext includes:
 *    {
 *      id: string,
 *      name: string,
 *      email: string,
 *      role: "admin" | "doctor" | "patient" | "bloodbank",
 *      ...otherFields
 *    }
 * 
 * 3. The admin routes are at the top level:
 *    - /admin
 *    - /admin/users
 *    - /admin/hospitals
 *    - /admin/appointments
 *    - /admin/reports
 * 
 * 4. All admin components have been created and are ready to use
 * 
 * 5. For better organization, you can also use lazy loading:
 *    
 *    const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
 *    const UserManagement = lazy(() => import('./pages/Admin/UserManagement'));
 *    // etc...
 *    
 *    Then wrap routes with <Suspense fallback={<LoadingSpinner />}>
 */
