import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAppointments as loadAppointments,
  saveAppointment as persistAppointment,
  updateAppointment as persistUpdate,
  replaceAppointments as persistReplace,
} from "../data/appointments";

const AppointmentsContext = createContext(null);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => loadAppointments());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "appointments") setAppointments(loadAppointments());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addAppointment = (appt) => {
    const saved = persistAppointment(appt);
    setAppointments((s) => [...s, saved]);
    return saved;
  };

  const update = (id, patch) => {
    const updated = persistUpdate(id, patch);
    setAppointments((s) =>
      s.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );
    return updated;
  };

  const replaceAll = (list) => {
    persistReplace(list);
    setAppointments(list);
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, update, replaceAll }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const ctx = useContext(AppointmentsContext);
  if (!ctx)
    throw new Error("useAppointments must be used within AppointmentsProvider");
  return ctx;
};

export default AppointmentsContext;
