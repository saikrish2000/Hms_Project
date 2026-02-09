// Admin Data Management Utilities
import { MOCK_DOCTORS } from "../data/doctors";
import { MOCK_APPOINTMENTS } from "../data/appointments";

// Initialize default admin data
const initializeAdminData = () => {
  if (!localStorage.getItem("adminUsers")) {
    localStorage.setItem(
      "adminUsers",
      JSON.stringify([
        {
          id: "admin1",
          name: "Admin User",
          email: "admin@hms.com",
          role: "admin",
          phone: "+91-9876543210",
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ])
    );
  }

  if (!localStorage.getItem("hospitals")) {
    localStorage.setItem(
      "hospitals",
      JSON.stringify([
        {
          id: "h1",
          name: "Seven Hills Hospital",
          location: "Hyderabad, Telangana",
          beds: 500,
          departments: 15,
          phone: "+91-40-6666-7777",
          email: "info@sevenhills.com",
          status: "active",
        },
        {
          id: "h2",
          name: "City Care Hospital",
          location: "Bangalore, Karnataka",
          beds: 300,
          departments: 12,
          phone: "+91-80-2222-3333",
          email: "info@citycare.com",
          status: "active",
        },
        {
          id: "h3",
          name: "Apollo Clinics",
          location: "Chennai, Tamil Nadu",
          beds: 400,
          departments: 18,
          phone: "+91-44-4444-5555",
          email: "info@apollo.com",
          status: "active",
        },
      ])
    );
  }

  if (!localStorage.getItem("systemStats")) {
    localStorage.setItem(
      "systemStats",
      JSON.stringify({
        lastUpdated: new Date().toISOString(),
      })
    );
  }
};

// Initialize on module load
initializeAdminData();

// ==================== USERS ====================

export const getAllUsers = () => {
  const doctors = MOCK_DOCTORS.map((d) => ({
    ...d,
    role: "doctor",
    status: d.approved ? "active" : "pending",
  }));

  const admins = JSON.parse(localStorage.getItem("adminUsers") || "[]");

  // Mock patients
  const patients = [
    {
      id: "p1",
      name: "Ramya Kumar",
      email: "ramya.kumar@email.com",
      phone: "+91-9876543211",
      role: "patient",
      status: "active",
      gender: "Female",
      bloodType: "O+",
      joinedDate: "Jan 15, 2026",
    },
    {
      id: "p2",
      name: "Avi Sinha",
      email: "avi.sinha@email.com",
      phone: "+91-9876543212",
      role: "patient",
      status: "active",
      gender: "Male",
      bloodType: "B+",
      joinedDate: "Jan 20, 2026",
    },
    {
      id: "p3",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91-9876543213",
      role: "patient",
      status: "active",
      gender: "Female",
      bloodType: "AB-",
      joinedDate: "Jan 25, 2026",
    },
  ];

  return [...doctors, ...patients, ...admins];
};

export const approveDoctor = (doctorId) => {
  const doctors = JSON.parse(localStorage.getItem("approvedDoctors") || "[]");
  if (!doctors.includes(doctorId)) {
    doctors.push(doctorId);
    localStorage.setItem("approvedDoctors", JSON.stringify(doctors));
  }
  return true;
};

export const rejectDoctor = (doctorId) => {
  const rejected = JSON.parse(localStorage.getItem("rejectedDoctors") || "[]");
  if (!rejected.includes(doctorId)) {
    rejected.push(doctorId);
    localStorage.setItem("rejectedDoctors", JSON.stringify(rejected));
  }
  return true;
};

export const updateUserStatus = (userId, status) => {
  const admins = JSON.parse(localStorage.getItem("adminUsers") || "[]");
  const updated = admins.map((u) =>
    u.id === userId ? { ...u, status } : u
  );
  localStorage.setItem("adminUsers", JSON.stringify(updated));
  return updated;
};

// ==================== HOSPITALS ====================

export const getAllHospitals = () => {
  return JSON.parse(localStorage.getItem("hospitals") || "[]");
};

export const addHospital = (hospital) => {
  const hospitals = getAllHospitals();
  const newHospital = {
    ...hospital,
    id: "h" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  hospitals.push(newHospital);
  localStorage.setItem("hospitals", JSON.stringify(hospitals));
  return newHospital;
};

export const updateHospital = (hospitalId, updates) => {
  const hospitals = getAllHospitals();
  const updated = hospitals.map((h) =>
    h.id === hospitalId ? { ...h, ...updates } : h
  );
  localStorage.setItem("hospitals", JSON.stringify(updated));
  return updated;
};

export const deleteHospital = (hospitalId) => {
  const hospitals = getAllHospitals();
  const filtered = hospitals.filter((h) => h.id !== hospitalId);
  localStorage.setItem("hospitals", JSON.stringify(filtered));
  return filtered;
};

// ==================== APPOINTMENTS ====================

export const getAllAppointments = () => {
  return MOCK_APPOINTMENTS;
};

export const getAppointmentStats = () => {
  const appointments = getAllAppointments();
  return {
    total: appointments.length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };
};

export const updateAppointmentStatus = (appointmentId, status) => {
  const appointments = JSON.parse(
    localStorage.getItem("systemAppointments") || JSON.stringify(MOCK_APPOINTMENTS)
  );
  const updated = appointments.map((a) =>
    a.id === appointmentId ? { ...a, status } : a
  );
  localStorage.setItem("systemAppointments", JSON.stringify(updated));
  return updated;
};

// ==================== STATISTICS ====================

export const getDashboardStats = () => {
  const users = getAllUsers();
  const doctors = users.filter((u) => u.role === "doctor");
  const patients = users.filter((u) => u.role === "patient");
  const admins = users.filter((u) => u.role === "admin");
  const appointments = getAllAppointments();
  const hospitals = getAllHospitals();

  return {
    totalUsers: users.length,
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalAdmins: admins.length,
    totalAppointments: appointments.length,
    totalHospitals: hospitals.length,
    pendingApprovals: doctors.filter((d) => !d.approved).length,
    appointmentStats: getAppointmentStats(),
  };
};

// ==================== ACTIVITY LOG ====================

export const logActivity = (action, details) => {
  const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
  logs.push({
    id: "log" + Date.now(),
    timestamp: new Date().toISOString(),
    action,
    details,
  });
  // Keep only last 100 logs
  if (logs.length > 100) logs.shift();
  localStorage.setItem("activityLogs", JSON.stringify(logs));
};

export const getActivityLogs = (limit = 20) => {
  const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
  return logs.slice(-limit).reverse();
};

// ==================== BLOOD BANK ====================

export const getBloodBankStats = () => {
  const inventory = JSON.parse(localStorage.getItem("bloodInventory") || "{}");
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const stats = {};
  bloodTypes.forEach((type) => {
    stats[type] = inventory[type] || 0;
  });

  return stats;
};

export const updateBloodInventory = (bloodType, quantity) => {
  const inventory = JSON.parse(localStorage.getItem("bloodInventory") || "{}");
  inventory[bloodType] = (inventory[bloodType] || 0) + quantity;
  localStorage.setItem("bloodInventory", JSON.stringify(inventory));
  return inventory;
};

// ==================== REPORTS ====================

export const generateReport = (reportType, filters = {}) => {
  const timestamp = new Date().toISOString();

  switch (reportType) {
    case "monthly-appointments":
      return {
        id: "report" + Date.now(),
        type: "monthly-appointments",
        title: "Monthly Appointments Report",
        generatedAt: timestamp,
        stats: getAppointmentStats(),
      };

    case "doctor-performance":
      const doctors = MOCK_DOCTORS;
      return {
        id: "report" + Date.now(),
        type: "doctor-performance",
        title: "Doctor Performance Report",
        generatedAt: timestamp,
        data: doctors.map((d) => ({
          doctorId: d.id,
          name: d.name,
          specialty: d.specialty,
          rating: d.rating,
          experience: d.experience,
        })),
      };

    case "hospital-summary":
      return {
        id: "report" + Date.now(),
        type: "hospital-summary",
        title: "Hospital Summary Report",
        generatedAt: timestamp,
        data: getAllHospitals(),
      };

    default:
      return null;
  }
};

export const getSystemHealthStatus = () => {
  const stats = getDashboardStats();
  const appointments = getAppointmentStats();

  return {
    overallHealth: "Good",
    metrics: {
      userGrowth: "8.5%",
      appointmentCompletion: Math.round(
        (appointments.confirmed / appointments.total) * 100
      ),
      systemUptime: "99.8%",
      activeUsers: stats.totalPatients + stats.totalDoctors,
    },
  };
};
