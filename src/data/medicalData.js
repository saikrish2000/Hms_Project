/* ================= PRESCRIPTIONS ================= */
export const PRESCRIPTIONS = [
  {
    id: "rx1",
    type: "Prescription",
    title: "Prescription - Hypertension",
    doctor: "Dr. vamshi krishna Chary",
    specialty: "Cardiology",
    hospital: "Seven Hills Hospital",
    date: "Jan 20, 2026",
    diagnosis: "Hypertension",
    medicines: ["Amlodipine 5mg", "Aspirin 75mg"],
    fileUrl: "/files/prescription-hypertension.html",
  },
  {
    id: "rx2",
    type: "Prescription",
    title: "Prescription - Migraine",
    doctor: "Dr. Ashok Bathina",
    specialty: "Neurology",
    hospital: "City Care Hospital",
    date: "Dec 15, 2025",
    diagnosis: "Migraine",
    medicines: ["Sumatriptan", "Paracetamol"],
    fileUrl: "/files/prescription-hypertension.html",
  },
];

/* ================= MEDICAL RECORDS ================= */
export const MEDICAL_RECORDS = [
  {
    id: "rec1",
    type: "Lab",
    title: "Blood Test Results - Complete Blood Count",
    doctor: "Dr. Sarah Johnson",
    date: "Jan 25, 2026",
    fileUrl: "/files/cbc-report.html",
  },
  {
    id: "rec2",
    type: "Imaging",
    title: "Chest X-Ray Report",
    doctor: "Dr. Sarah Johnson",
    date: "Jan 15, 2026",
    fileUrl: "/files/cbc-report.html",
  },
  {
    id: "rec3",
    type: "Consultation",
    title: "Annual Physical Examination",
    doctor: "Dr. Michael Chen",
    date: "Jan 10, 2026",
    fileUrl: "/files/cbc-report.html",
  },
  {
    id: "rec4",
    type: "Vaccination",
    title: "COVID-19 Vaccination Record",
    doctor: "Vaccination Center",
    date: "Dec 15, 2025",
    fileUrl: "/files/prescription-hypertension.html",
  },
];

/* ================= UNIFIED TIMELINE ================= */
export const MEDICAL_TIMELINE = [...PRESCRIPTIONS, ...MEDICAL_RECORDS].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
