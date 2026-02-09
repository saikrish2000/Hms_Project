/**
 * Admin Dashboard Service
 * Using real-time data from application data files
 */

import { MOCK_DOCTORS } from "../../data/doctors";
import { MOCK_APPOINTMENTS, getAppointments } from "../../data/appointments";
import { PRESCRIPTIONS } from "../../data/medicalData";

/**
 * Get dashboard statistics from real data
 */
export const getDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      
      const stats = {
        totalUsers: 1254, // TODO: will be calculated from actual users
        totalDoctors: MOCK_DOCTORS.length,
        totalPatients: 890,
        totalAppointments: appointments.length,
        pendingApprovals: MOCK_DOCTORS.filter(d => !d.approved).length,
        activeAppointments: appointments.filter(a => a.status === "confirmed").length,
        completedAppointments: appointments.filter(a => a.status === "completed").length,
        cancelledAppointments: appointments.filter(a => a.status === "cancelled").length,
        revenue: appointments.length * 500, // Estimated based on appointments
        averageRating: (MOCK_DOCTORS.reduce((sum, d) => sum + (d.rating || 0), 0) / MOCK_DOCTORS.length).toFixed(1),
      };
      
      resolve(stats);
    }, 500);
  });
};

/**
 * Get system health status
 */
export const getSystemHealth = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        uptime: "99.8%",
        activeUsers: 234,
        apiResponseTime: "45ms",
        databaseStatus: "Online",
        serverLoad: "35%",
        lastUpdated: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get activity logs from real data
 */
export const getActivityLogs = async (limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      const logs = [
        { id: 1, action: "Doctor Registered", user: MOCK_DOCTORS[0]?.name || "Dr. Unknown", timestamp: new Date(Date.now() - 3600000), description: `${MOCK_DOCTORS[0]?.name || "Doctor"} registered as ${MOCK_DOCTORS[0]?.specialty || "specialist"}` },
        ...appointments.slice(0, Math.min(5, limit - 1)).map((apt, idx) => ({
          id: idx + 2,
          action: "Appointment " + apt.status,
          user: "Patient",
          timestamp: new Date(Date.now() - ((idx + 1) * 3600000)),
          description: `Appointment with doctor for ${apt.date}`
        }))
      ];
      
      resolve(logs.slice(0, limit));
    }, 500);
  });
};
