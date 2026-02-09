/**
 * API Configuration
 * Centralized API setup for all backend calls
 */

const API_CONFIG = {
  // Base URL - Change this when backend is deployed
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
  // API timeout settings (ms)
  TIMEOUT: 10000,
};

// API Endpoints Group by feature
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY_TOKEN: "/auth/verify",
  },

  // Admin Dashboard
  ADMIN: {
    DASHBOARD_STATS: "/admin/dashboard/stats",
    DASHBOARD_HEALTH: "/admin/dashboard/health",
    ACTIVITY_LOGS: "/admin/activity-logs",
  },

  // User Management
  USERS: {
    GET_ALL: "/admin/users",
    GET_ONE: "/admin/users/:id",
    UPDATE: "/admin/users/:id",
    ACTIVATE: "/admin/users/:id/activate",
    DEACTIVATE: "/admin/users/:id/deactivate",
    APPROVE_DOCTOR: "/admin/users/:id/approve-doctor",
    REJECT_DOCTOR: "/admin/users/:id/reject-doctor",
  },

  // Hospital Management
  HOSPITALS: {
    GET_ALL: "/hospitals",
    GET_ONE: "/hospitals/:id",
    CREATE: "/hotels",
    UPDATE: "/hospitals/:id",
    DELETE: "/hospitals/:id",
  },

  // Appointments
  APPOINTMENTS: {
    GET_ALL: "/appointments",
    GET_BY_STATUS: "/appointments?status=:status",
    UPDATE_STATUS: "/appointments/:id/status",
    GET_STATS: "/admin/appointments/stats",
  },

  // Reports
  REPORTS: {
    GENERATE: "/admin/reports/generate",
    GET_ALL: "/admin/reports",
    GET_ONE: "/admin/reports/:id",
    EXPORT: "/admin/reports/:id/export",
  },

  // Blood Bank
  BLOOD_BANK: {
    GET_INVENTORY: "/admin/blood-bank/inventory",
    UPDATE_INVENTORY: "/admin/blood-bank/inventory/update",
    GET_REQUESTS: "/admin/blood-requests",
    APPROVE_REQUEST: "/admin/blood-requests/:id/approve",
    REJECT_REQUEST: "/admin/blood-requests/:id/reject",
  },
};

export default API_CONFIG;
