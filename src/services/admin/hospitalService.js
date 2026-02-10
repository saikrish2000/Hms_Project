/**
 * Hospital Management Service
 * Using real-time data from application
 */

import { MOCK_DOCTORS } from "../../data/doctors";
import { getAppointments } from "../../data/appointments";

// Get unique hospitals from doctors data
const getUniqueHospitals = () => {
  const hospitals = [...new Set(MOCK_DOCTORS.map(d => d.hospital))];
  return hospitals.map((name, idx) => ({
    id: idx + 1,
    name: name,
    email: `admin@${name.toLowerCase().replace(/\s+/g, "")}.com`,
    phone: `555-010${idx + 1}`,
    address: `${100 + idx} Medical St`,
    city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][idx] || "New York",
    state: ["NY", "CA", "IL", "TX", "AZ"][idx] || "NY",
    zipCode: `${10000 + idx * 1000}`,
    totalBeds: [500, 350, 450, 300, 280][idx] || 300,
    departments: MOCK_DOCTORS.filter(d => d.hospital === name).map(d => d.specialty),
    registrationNumber: `REG00${idx + 1}`,
    status: "active"
  }));
};

/**
 * Get all hospitals from real data
 */
export const getAllHospitals = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let hospitals = getUniqueHospitals();
      if (filters.city) hospitals = hospitals.filter(h => h.city === filters.city);
      if (filters.state) hospitals = hospitals.filter(h => h.state === filters.state);
      resolve(hospitals);
    }, 500);
  });
};

/**
 * Get single hospital details
 */
export const getHospitalById = async (hospitalId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hospitals = getUniqueHospitals();
      const hospital = hospitals.find(h => h.id === parseInt(hospitalId));
      if (hospital) resolve(hospital);
      else reject(new Error(`Hospital ${hospitalId} not found`));
    }, 300);
  });
};

/**
 * Create new hospital
 */
export const createHospital = async (hospitalData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hospitals = getUniqueHospitals();
      const newHospital = {
        id: hospitals.length + 1,
        ...hospitalData,
        status: "active"
      };
      hospitals.push(newHospital);
      resolve({ success: true, message: "Hospital created", hospital: newHospital });
    }, 500);
  });
};

/**
 * Update hospital
 */
export const updateHospital = async (hospitalId, hospitalData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hospitals = getUniqueHospitals();
      const hospital = hospitals.find(h => h.id === parseInt(hospitalId));
      if (hospital) {
        Object.assign(hospital, hospitalData);
        resolve({ success: true, message: "Hospital updated", hospital });
      }
    }, 300);
  });
};

/**
 * Delete hospital
 */
export const deleteHospital = async (hospitalId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hospitals = getUniqueHospitals();
      const index = hospitals.findIndex(h => h.id === parseInt(hospitalId));
      if (index > -1) {
        hospitals.splice(index, 1);
        resolve({ success: true, message: "Hospital deleted" });
      }
    }, 300);
  });
};

/**
 * Get hospital statistics from real data
 */
export const getHospitalStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hospitals = getUniqueHospitals();
      const appointments = getAppointments();
      const stats = {
        total: hospitals.length,
        active: hospitals.filter(h => h.status === "active").length,
        totalBeds: hospitals.reduce((sum, h) => sum + h.totalBeds, 0),
        occupiedBeds: Math.floor((appointments.length / Math.max(hospitals.length, 1)) * 50),
        appointmentsAcrossHospitals: appointments.length,
        averageOccupancy: "68%"
      };
      resolve(stats);
    }, 300);
  });
};
