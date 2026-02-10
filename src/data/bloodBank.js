/* ================= BLOOD BANK DATA ================= */

// Blood inventory data
export const INITIAL_INVENTORY = [
  { type: "A+", units: 15, status: "good" },
  { type: "A-", units: 8, status: "low" },
  { type: "B+", units: 14, status: "good" },
  { type: "B-", units: 3, status: "critical" },
  { type: "AB+", units: 10, status: "low" },
  { type: "AB-", units: 2, status: "critical" },
  { type: "O+", units: 20, status: "good" },
  { type: "O-", units: 5, status: "critical" },
];

// Blood requests from hospitals and users
export const INITIAL_REQUESTS = [
  {
    id: "req1",
    hospital: "City General Hospital",
    blood: "O-",
    units: 3,
    priority: "critical",
    date: "Today, 2:30 PM",
    status: "pending",
  },
  {
    id: "req2",
    hospital: "St. Mary's Medical",
    blood: "AB-",
    units: 2,
    priority: "high",
    date: "Today, 1:15 PM",
    status: "pending",
  },
  {
    id: "req3",
    hospital: "Regional Trauma Center",
    blood: "B+",
    units: 4,
    priority: "medium",
    date: "Today, 12:45 PM",
    status: "pending",
  },
];

// Donor registrations from all users
export const INITIAL_DONORS = [
  {
    id: "donor1",
    name: "John Smith",
    group: "O+",
    date: "Today, 9:30 AM",
    status: "active",
  },
  {
    id: "donor2",
    name: "Emily Johnson",
    group: "A-",
    date: "Today, 10:15 AM",
    status: "active",
  },
  {
    id: "donor3",
    name: "Michael Brown",
    group: "B+",
    date: "Today, 11:00 AM",
    status: "active",
  },
  {
    id: "donor4",
    name: "Sarah Davis",
    group: "AB+",
    date: "Yesterday, 3:45 PM",
    status: "active",
  },
  {
    id: "donor5",
    name: "Robert Wilson",
    group: "O-",
    date: "Yesterday, 2:20 PM",
    status: "active",
  },
];

// Get blood inventory from localStorage
export const getInventory = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("bloodBankInventory")) || [];
    return stored.length ? stored : INITIAL_INVENTORY;
  } catch (e) {
    return INITIAL_INVENTORY;
  }
};

// Save blood inventory to localStorage
export const saveInventory = (inventory) => {
  localStorage.setItem("bloodBankInventory", JSON.stringify(inventory));
};

// Get blood requests from localStorage
export const getRequests = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("bloodBankRequests")) || [];
    return stored.length ? stored : INITIAL_REQUESTS;
  } catch (e) {
    return INITIAL_REQUESTS;
  }
};

// Save blood requests to localStorage
export const saveRequests = (requests) => {
  localStorage.setItem("bloodBankRequests", JSON.stringify(requests));
};

// Add new request
export const addRequest = (request) => {
  const existing = getRequests();
  const newRequest = {
    ...request,
    id: request.id || `req${Date.now()}`,
  };
  const updated = [...existing, newRequest];
  saveRequests(updated);
  return newRequest;
};

// Update request
export const updateRequest = (id, patch) => {
  const existing = getRequests();
  const updated = existing.map((req) =>
    req.id === id ? { ...req, ...patch } : req
  );
  saveRequests(updated);
  return updated.find((req) => req.id === id);
};

// Delete request
export const deleteRequest = (id) => {
  const existing = getRequests();
  const updated = existing.filter((req) => req.id !== id);
  saveRequests(updated);
};

// Get donors from localStorage
export const getDonors = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("bloodBankDonors")) || [];
    return stored.length ? stored : INITIAL_DONORS;
  } catch (e) {
    return INITIAL_DONORS;
  }
};

// Save donors to localStorage
export const saveDonors = (donors) => {
  localStorage.setItem("bloodBankDonors", JSON.stringify(donors));
};

// Add new donor
export const addDonor = (donor) => {
  const existing = getDonors();
  const newDonor = {
    ...donor,
    id: donor.id || `donor${Date.now()}`,
  };
  const updated = [...existing, newDonor];
  saveDonors(updated);
  return newDonor;
};

// Update inventory item
export const updateInventory = (bloodType, units) => {
  const existing = getInventory();
  const updated = existing.map((item) =>
    item.type === bloodType
      ? {
          ...item,
          units: units,
          status: units > 12 ? "good" : units > 6 ? "low" : "critical",
        }
      : item
  );
  saveInventory(updated);
  return updated.find((item) => item.type === bloodType);
};
