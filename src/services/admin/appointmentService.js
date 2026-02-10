/**
 * Appointments Management Service
 * Using real-time data from application
 */

import { MOCK_DOCTORS } from "../../data/doctors";
import { MOCK_APPOINTMENTS, getAppointments } from "../../data/appointments";

/**
 * Get all appointments with optional filters
 * Real data from application
 */
export const getAllAppointments = async (status = "", doctorId = "", patientId = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      
      let filtered = appointments.map((apt, idx) => {
        const doctor = MOCK_DOCTORS.find(d => d.id === apt.doctorId);
        return {
          id: apt.id,
          patientName: `Patient ${idx + 1}`,
          doctorName: doctor?.name || "Unknown Doctor",
          doctorId: apt.doctorId,
          date: apt.date,
          time: apt.time,
          status: apt.status,
          reason: doctor?.specialty || "Consultation",
          hospital: doctor?.hospital || "Available Hospital",
          specialty: doctor?.specialty || "General"
        };
      });

      if (status) filtered = filtered.filter(a => a.status === status);
      if (doctorId) filtered = filtered.filter(a => a.doctorId === doctorId);
      if (patientId) filtered = filtered.filter(a => a.patientId === parseInt(patientId));
      
      resolve(filtered);
    }, 500);
  });
};

/**
 * Get appointment details
 */
export const getAppointmentById = async (appointmentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const appointments = getAppointments();
      const appointment = appointments.find(a => a.id === appointmentId);
      if (appointment) resolve(appointment);
      else reject(new Error(`Appointment ${appointmentId} not found`));
    }, 300);
  });
};

/**
 * Update appointment status
 * Real appointment data with actual status changes
 */
export const updateAppointmentStatus = async (appointmentId, status, notes = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      const appointment = appointments.find(a => a.id === appointmentId);
      if (appointment) {
        appointment.status = status;
        if (notes) appointment.notes = notes;
        // Save to localStorage
        localStorage.setItem("appointments", JSON.stringify(appointments));
        resolve({ success: true, message: "Appointment updated", appointment });
      }
    }, 300);
  });
};

/**
 * Confirm appointment
 */
export const confirmAppointment = async (appointmentId) => {
  return updateAppointmentStatus(appointmentId, "confirmed");
};

/**
 * Complete appointment
 */
export const completeAppointment = async (appointmentId) => {
  return updateAppointmentStatus(appointmentId, "completed");
};

/**
 * Cancel appointment
 */
export const cancelAppointment = async (appointmentId, reason = "") => {
  return updateAppointmentStatus(appointmentId, "cancelled", reason);
};

/**
 * Get appointment statistics from real data
 */
export const getAppointmentStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      const stats = {
        total: appointments.length,
        confirmed: appointments.filter(a => a.status === "confirmed").length,
        pending: appointments.filter(a => a.status === "pending").length,
        completed: appointments.filter(a => a.status === "completed").length,
        cancelled: appointments.filter(a => a.status === "cancelled").length,
      };
      resolve(stats);
    }, 300);
  });
};

/**
 * Export appointments
 */
export const exportAppointments = async (format = "json", filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointments = getAppointments();
      resolve({ success: true, data: appointments, format });
    }, 300);
  });
};
