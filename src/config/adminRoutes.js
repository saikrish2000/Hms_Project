// Admin Routes Configuration
// Add this to your App.jsx or routing configuration file

import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import HospitalManagement from "./pages/Admin/HospitalManagement";
import AppointmentsManagement from "./pages/Admin/AppointmentsManagement";
import ReportsAndAnalytics from "./pages/Admin/ReportsAndAnalytics";

// Import ProtectedRoute from your existing implementation
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * Admin Module Routes
 * Add these routes to your main router configuration
 * 
 * Example integration in App.jsx:
 * 
 * import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 * 
 * function App() {
 *   return (
 *     <Router>
 *       <Routes>
 *         // ... other routes ...
 *         
 *         // Admin Routes (add this section)
 *         <Route
 *           path="/admin"
 *           element={
 *             <ProtectedRoute requiredRole="admin">
 *               <AdminDashboard />
 *             </ProtectedRoute>
 *           }
 *         />
 *         <Route
 *           path="/admin/users"
 *           element={
 *             <ProtectedRoute requiredRole="admin">
 *               <UserManagement />
 *             </ProtectedRoute>
 *           }
 *         />
 *         <Route
 *           path="/admin/hospitals"
 *           element={
 *             <ProtectedRoute requiredRole="admin">
 *               <HospitalManagement />
 *             </ProtectedRoute>
 *           }
 *         />
 *         <Route
 *           path="/admin/appointments"
 *           element={
 *             <ProtectedRoute requiredRole="admin">
 *               <AppointmentsManagement />
 *             </ProtectedRoute>
 *           }
 *         />
 *         <Route
 *           path="/admin/reports"
 *           element={
 *             <ProtectedRoute requiredRole="admin">
 *               <ReportsAndAnalytics />
 *             </ProtectedRoute>
 *           }
 *         />
 *       </Routes>
 *     </Router>
 *   );
 * }
 */

// Route Configuration Array (for cleaner organization)
export const ADMIN_ROUTES = [
  {
    path: "/admin",
    element: AdminDashboard,
    requiredRole: "admin",
    name: "Admin Dashboard",
    icon: "FiBarChart3",
  },
  {
    path: "/admin/users",
    element: UserManagement,
    requiredRole: "admin",
    name: "User Management",
    icon: "FiUsers",
  },
  {
    path: "/admin/hospitals",
    element: HospitalManagement,
    requiredRole: "admin",
    name: "Hospital Management",
    icon: "FiMapPin",
  },
  {
    path: "/admin/appointments",
    element: AppointmentsManagement,
    requiredRole: "admin",
    name: "Appointments",
    icon: "FiCalendar",
  },
  {
    path: "/admin/reports",
    element: ReportsAndAnalytics,
    requiredRole: "admin",
    name: "Reports & Analytics",
    icon: "FiBarChart2",
  },
];

/**
 * If you want to use the array-based configuration:
 * 
 * import { ADMIN_ROUTES } from './config/adminRoutes';
 * 
 * {ADMIN_ROUTES.map((route) => (
 *   <Route
 *     key={route.path}
 *     path={route.path}
 *     element={
 *       <ProtectedRoute requiredRole={route.requiredRole}>
 *         <route.element />
 *       </ProtectedRoute>
 *     }
 *   />
 * ))}
 */

// Navigation Items for Admin Menu
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: "FiHome",
  },
  {
    label: "User Management",
    path: "/admin/users",
    icon: "FiUsers",
  },
  {
    label: "Hospitals",
    path: "/admin/hospitals",
    icon: "FiMapPin",
  },
  {
    label: "Appointments",
    path: "/admin/appointments",
    icon: "FiCalendar",
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: "FiBarChart3",
  },
];

export default ADMIN_ROUTES;
