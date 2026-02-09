/**
 * Admin Context
 * Global state management for admin data
 * Similar to AppointmentsContext for patient module
 */

import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const AdminContext = createContext();

// Custom hook to use AdminContext
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

// Provider component
export const AdminProvider = ({ children }) => {
  // Dashboard data
  const [dashboardStats, setDashboardStats] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);

  // User data
  const [users, setUsers] = useState([]);
  const [userFilters, setUserFilters] = useState({
    role: "",
    status: "",
    searchTerm: "",
  });

  // Hospital data
  const [hospitals, setHospitals] = useState([]);
  const [hospitalStats, setHospitalStats] = useState(null);

  // Appointment data
  const [appointments, setAppointments] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState(null);

  // Report data
  const [reports, setReports] = useState([]);
  const [generatedReports, setGeneratedReports] = useState([]);

  // Loading states
  const [loading, setLoading] = useState({
    dashboard: false,
    users: false,
    hospitals: false,
    appointments: false,
    reports: false,
  });

  // Error states
  const [errors, setErrors] = useState({
    dashboard: null,
    users: null,
    hospitals: null,
    appointments: null,
    reports: null,
  });

  // ===================== DASHBOARD =====================

  const updateDashboardStats = useCallback((stats) => {
    setDashboardStats(stats);
  }, []);

  const updateSystemHealth = useCallback((health) => {
    setSystemHealth(health);
  }, []);

  const addActivityLog = useCallback((log) => {
    setActivityLogs((prev) => [log, ...prev].slice(0, 50)); // Keep last 50
  }, []);

  const clearActivityLogs = useCallback(() => {
    setActivityLogs([]);
  }, []);

  // ===================== USERS =====================

  const updateUsers = useCallback((newUsers) => {
    setUsers(newUsers);
  }, []);

  const updateUser = useCallback((userId, userData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...userData } : user
      )
    );
  }, []);

  const removeUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  const setUserFiltersState = useCallback((filters) => {
    setUserFilters(filters);
  }, []);

  // ===================== HOSPITALS =====================

  const updateHospitals = useCallback((newHospitals) => {
    setHospitals(newHospitals);
  }, []);

  const addHospital = useCallback((hospital) => {
    setHospitals((prev) => [...prev, hospital]);
  }, []);

  const updateHospital = useCallback((hospitalId, hospitalData) => {
    setHospitals((prev) =>
      prev.map((hospital) =>
        hospital.id === hospitalId
          ? { ...hospital, ...hospitalData }
          : hospital
      )
    );
  }, []);

  const removeHospital = useCallback((hospitalId) => {
    setHospitals((prev) => prev.filter((h) => h.id !== hospitalId));
  }, []);

  const updateHospitalStats = useCallback((stats) => {
    setHospitalStats(stats);
  }, []);

  // ===================== APPOINTMENTS =====================

  const updateAppointments = useCallback((newAppointments) => {
    setAppointments(newAppointments);
  }, []);

  const updateAppointment = useCallback((appointmentId, appointmentData) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId
          ? { ...appt, ...appointmentData }
          : appt
      )
    );
  }, []);

  const updateAppointmentStats = useCallback((stats) => {
    setAppointmentStats(stats);
  }, []);

  // ===================== REPORTS =====================

  const updateReports = useCallback((newReports) => {
    setReports(newReports);
  }, []);

  const addGeneratedReport = useCallback((report) => {
    setGeneratedReports((prev) => [report, ...prev]);
  }, []);

  const clearReports = useCallback(() => {
    setReports([]);
    setGeneratedReports([]);
  }, []);

  // ===================== LOADING & ERRORS =====================

  const setLoadingState = useCallback((key, isLoading) => {
    setLoading((prev) => ({ ...prev, [key]: isLoading }));
  }, []);

  const setErrorState = useCallback((key, error) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  }, []);

  const clearError = useCallback((key) => {
    setErrors((prev) => ({ ...prev, [key]: null }));
  }, []);

  // ===================== CONTEXT VALUE =====================

  const value = {
    // Dashboard
    dashboardStats,
    systemHealth,
    activityLogs,
    updateDashboardStats,
    updateSystemHealth,
    addActivityLog,
    clearActivityLogs,

    // Users
    users,
    userFilters,
    updateUsers,
    updateUser,
    removeUser,
    setUserFilters: setUserFiltersState,

    // Hospitals
    hospitals,
    hospitalStats,
    updateHospitals,
    addHospital,
    updateHospital,
    removeHospital,
    updateHospitalStats,

    // Appointments
    appointments,
    appointmentStats,
    updateAppointments,
    updateAppointment,
    updateAppointmentStats,

    // Reports
    reports,
    generatedReports,
    updateReports,
    addGeneratedReport,
    clearReports,

    // Loading & Errors
    loading,
    errors,
    setLoadingState,
    setErrorState,
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
