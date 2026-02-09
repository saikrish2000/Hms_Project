import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getInventory as loadInventory,
  saveInventory,
  getRequests as loadRequests,
  saveRequests,
  getDonors as loadDonors,
  saveDonors,
  addRequest as addReq,
  updateRequest as updateReq,
  deleteRequest as deleteReq,
  addDonor as addDnr,
  updateInventory as updateInv,
} from "../data/bloodBank";

const BloodBankContext = createContext(null);

export const BloodBankProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => loadInventory());
  const [requests, setRequests] = useState(() => loadRequests());
  const [donors, setDonors] = useState(() => loadDonors());

  // Listen for storage changes (real-time updates across tabs/windows)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "bloodBankInventory") setInventory(loadInventory());
      if (e.key === "bloodBankRequests") setRequests(loadRequests());
      if (e.key === "bloodBankDonors") setDonors(loadDonors());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Add new blood request
  const addRequest = (request) => {
    const saved = addReq(request);
    setRequests((s) => [...s, saved]);
    return saved;
  };

  // Update blood request status
  const updateRequest = (id, patch) => {
    const updated = updateReq(id, patch);
    setRequests((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    return updated;
  };

  // Delete blood request
  const deleteRequest = (id) => {
    deleteReq(id);
    setRequests((s) => s.filter((r) => r.id !== id));
  };

  // Add new donor
  const addDonor = (donor) => {
    const saved = addDnr(donor);
    setDonors((s) => [...s, saved]);
    return saved;
  };

  // Update inventory for a blood type
  const updateInventory = (bloodType, units) => {
    const updated = updateInv(bloodType, units);
    setInventory((s) =>
      s.map((i) => (i.type === bloodType ? updated : i))
    );
    return updated;
  };

  // Get total units in inventory
  const getTotalUnits = () => {
    return inventory.reduce((sum, item) => sum + item.units, 0);
  };

  // Get low stock items
  const getLowStockItems = () => {
    return inventory.filter((item) => item.status !== "good");
  };

  return (
    <BloodBankContext.Provider
      value={{
        inventory,
        requests,
        donors,
        addRequest,
        updateRequest,
        deleteRequest,
        addDonor,
        updateInventory,
        getTotalUnits,
        getLowStockItems,
      }}
    >
      {children}
    </BloodBankContext.Provider>
  );
};

export const useBloodBank = () => {
  const ctx = useContext(BloodBankContext);
  if (!ctx) {
    throw new Error("useBloodBank must be used within BloodBankProvider");
  }
  return ctx;
};

export default BloodBankContext;
