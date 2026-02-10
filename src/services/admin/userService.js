/**
 * User Management Service
 * Using real-time data from application
 */

import { MOCK_DOCTORS } from "../../data/doctors";

/**
 * Get all users (with optional filters)
 * Real doctors from application data
 */
export const getAllUsers = async (role = "", status = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = MOCK_DOCTORS.map((doctor, idx) => ({
        id: parseInt(doctor.id),
        name: doctor.name,
        email: `${doctor.name.toLowerCase().replace(/\s+/g, ".")}@hospital.com`,
        role: "doctor",
        status: doctor.approved ? "approved" : "pending",
        joinDate: "2025-" + String((idx + 1)).padStart(2, "0") + "-15",
        specialization: doctor.specialty,
        experience: doctor.experience,
        hospital: doctor.hospital,
        rating: doctor.rating
      }));
      
      if (role) filtered = filtered.filter(u => u.role === role);
      if (status) filtered = filtered.filter(u => u.status === status);
      resolve(filtered);
    }, 500);
  });
};

/**
 * Get single user details
 */
export const getUserById = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        resolve({
          id: parseInt(doctor.id),
          name: doctor.name,
          email: `${doctor.name.toLowerCase().replace(/\s+/g, ".")}@hospital.com`,
          role: "doctor",
          status: doctor.approved ? "approved" : "pending",
          specialization: doctor.specialty,
          experience: doctor.experience,
          hospital: doctor.hospital,
          rating: doctor.rating,
          bio: doctor.bio,
          availableSlots: doctor.availableSlots
        });
      } else {
        reject(new Error(`User ${userId} not found`));
      }
    }, 300);
  });
};

/**
 * Update user profile
 */
export const updateUser = async (userId, userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        Object.assign(doctor, userData);
        resolve(doctor);
      }
    }, 300);
  });
};

/**
 * Approve doctor application
 */
export const approveDoctor = async (userId, notes = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        doctor.approved = true;
        resolve({ success: true, message: "Doctor approved", doctor });
      }
    }, 300);
  });
};

/**
 * Reject doctor application
 */
export const rejectDoctor = async (userId, reason = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        doctor.approved = false;
        resolve({ success: true, message: "Doctor rejected", doctor });
      }
    }, 300);
  });
};

/**
 * Activate user account
 */
export const activateUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        doctor.active = true;
        resolve({ success: true, message: "User activated", doctor });
      }
    }, 300);
  });
};

/**
 * Deactivate user account
 */
export const deactivateUser = async (userId, reason = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = MOCK_DOCTORS.find(d => parseInt(d.id) === parseInt(userId));
      if (doctor) {
        doctor.active = false;
        resolve({ success: true, message: "User deactivated", doctor });
      }
    }, 300);
  });
};
