import PatientLayout from "../../components/Layout/PatientLayout";
import UploadRecordButton from "../../components/Medical/UploadRecordButton";
import PDFViewerModal from "../../components/Medical/PDFViewerModal";
import { useState, useMemo } from "react";
import { FiEye, FiDownload } from "react-icons/fi";

import { MEDICAL_RECORDS, PRESCRIPTIONS } from "../../data/medicalData";

const TABS = [
  "All",
  "Prescription",
  "Lab",
  "Imaging",
  "Consultation",
  "Vaccination",
];

const PatientRecords = () => {
  const [records, setRecords] = useState([
    ...PRESCRIPTIONS,
    ...MEDICAL_RECORDS,
  ]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (activeTab !== "All" && r.type !== activeTab) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        (r.doctor || "").toLowerCase().includes(q) ||
        (r.type || "").toLowerCase().includes(q)
      );
    });
  }, [records, query, activeTab]);

  return (
    <PatientLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Reports & Prescriptions</h3>
        <UploadRecordButton
          onUpload={(rec) => setRecords((prev) => [rec, ...prev])}
        />
      </div>

      {/* Search + Tabs */}
      <div className="mb-4">
        <div className="d-flex gap-3 mb-3">
          <input
            className="form-control"
            placeholder="Search records by title, doctor, or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2 mb-3">
          {TABS.map((t) => (
            <button
              key={t}
              className={`btn ${activeTab === t ? "btn-primary" : "btn-outline-secondary"} btn-sm`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Single-column list of records so sidebar toggle won't shift layout */}
      <div className="d-flex flex-column gap-3">
        {filtered.map((rec) => (
          <div key={rec.id} className="w-100">
            <div className="card-shell">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-bold">{rec.title}</div>
                  <div className="text-muted small">
                    {rec.doctor} · {rec.date}
                  </div>
                  <div className="mt-2">
                    <span className="badge bg-light text-dark">{rec.type}</span>
                  </div>
                  {rec.type === "Prescription" && rec.medicines && (
                    <ul className="mt-3 small mb-0">
                      {rec.medicines.slice(0, 3).map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                      {rec.medicines.length > 3 && <li>+ more...</li>}
                    </ul>
                  )}
                </div>

                <div className="d-flex flex-column align-items-end gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedRecord(rec)}
                  >
                    <FiEye /> View
                  </button>
                  <a
                    href={rec.fileUrl}
                    download
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <FiDownload /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF VIEWER MODAL */}
      <PDFViewerModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </PatientLayout>
  );
};

export default PatientRecords;
