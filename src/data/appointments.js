// src/data/appointments.js
export const MOCK_APPOINTMENTS = [
  {
    id: "apt1",
    doctorId: "1",
    date: "Feb 10, 2026",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "apt2",
    doctorId: "2",
    date: "Feb 15, 2026",
    time: "02:30 PM",
    status: "pending",
  },

  {
    id: "apt3",
    doctorId: "3",
    date: "Feb 15, 2026",
    time: "02:30 PM",
    status: "cancelled",
  },
];
export const getAppointments = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    // If user hasn't saved any appointments yet, fall back to MOCK_APPOINTMENTS
    return stored.length ? stored : MOCK_APPOINTMENTS;
  } catch (e) {
    return MOCK_APPOINTMENTS;
  }
};

export const saveAppointment = (appointment) => {
  const existing = getAppointments();
  const updated = [...existing, appointment];
  localStorage.setItem("appointments", JSON.stringify(updated));
};

export const updateAppointment = (appointment) => {
  const existing = getAppointments();
  const updated = existing.map((a) =>
    a.id === appointment.id ? appointment : a,
  );
  localStorage.setItem("appointments", JSON.stringify(updated));
  return updated;
};

export const replaceAppointments = (appointments) => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
};
