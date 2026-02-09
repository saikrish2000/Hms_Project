import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PatientLayout from "../../components/Layout/PatientLayout";
import EmergencyPanel from "../../components/Emergency/EmergencyPanel";
import PanicButton from "../../components/Emergency/PanicButton";
import SOSFloatingButton from "../../components/Emergency/SOSFloatingButton";
import ConfirmModal from "../../components/Common/ConfirmModal";
import Toast from "../../components/Common/Toast";
import AppointmentDetailModal from "../../components/Appointments/AppointmentDetailModal";

import { FiCalendar, FiActivity, FiFileText } from "react-icons/fi";

import { MOCK_DOCTORS } from "../../data/doctors";
import { getAppointments, updateAppointment } from "../../data/appointments";
import { MEDICAL_TIMELINE } from "../../data/medicalData";

import { useNotifications } from "../../context/NotificationContext";
import { useAppointments } from "../../context/AppointmentsContext";
import HealthMetrics from "./HealthMetrics";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const { appointments: ctxAppointments, update: updateCtx } =
    useAppointments();

  /* ---------------- LOCAL STATE FOR VIEW LAYER ONLY ---------------- */
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast] = useState("");
  const [lastCancelled, setLastCancelled] = useState(null);
  const [searchHistory, setSearchHistory] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = useMemo(
    () =>
      ctxAppointments.map((apt) => {
        const doctor = MOCK_DOCTORS.find((d) => d.id === apt.doctorId);
        return { ...apt, doctor };
      }),
    [ctxAppointments],
  );

  /* ---------------- HANDLERS ---------------- */
  const handleCancel = (id) => {
    updateCtx(id, { status: "cancelled" });
    setLastCancelled(id);
    setToast("Appointment cancelled");
    notify("Appointment cancelled successfully", "warning");
  };

  const undoCancel = () => {
    updateCtx(lastCancelled, { status: "confirmed" });
    setToast("");
    setLastCancelled(null);
    notify("Cancellation undone", "success");
  };

  /* ---------------- UI ---------------- */
  return (
    <PatientLayout>
      <h2 className="fw-bold mb-4">Welcome back, John 👋</h2>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="row g-4 mb-4">
        {[
          {
            title: "Book Appointment",
            icon: <FiCalendar />,
            path: "/patient/find-doctor",
          },
          {
            title: "Blood Donation",
            icon: <FiActivity />,
            path: "/patient/blood-donation",
          },
          {
            title: "Organ Donation",
            icon: <FiActivity />,
            path: "/patient/organ-donation",
          },
          {
            title: "Medical Records",
            icon: <FiFileText />,
            path: "/patient/records",
          },
        ].map((item) => (
          <div key={item.title} className="col-md-3">
            <div
              className="card shadow-sm border-0 h-100 dashboard-action-card"
              role="button"
              onClick={() => navigate(item.path)}
            >
              <div className="card-body d-flex align-items-center gap-3">
                <span className="fs-4 text-primary">{item.icon}</span>
                <h6 className="fw-bold mb-0">{item.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="row g-4">
        {/* UPCOMING APPOINTMENTS */}
        <div className="col-lg-8">
          <h5 className="fw-bold mb-3">Upcoming Appointments</h5>

          {appointments
            .filter((apt) => apt.status !== "cancelled")
            .map((apt) => (
              <div key={apt.id} className="card-shell mb-3">
                <div className="card-row">
                  <div className="card-left">
                    <img
                      src={apt.doctor.photo}
                      className="card-avatar"
                      alt={apt.doctor.name}
                    />

                    <div>
                      <div className="card-title">{apt.doctor.name}</div>
                      <div className="card-sub">{apt.doctor.specialty}</div>

                      <div className="card-meta">
                        <span>📅 {apt.date}</span>
                        <span>⏰ {apt.time}</span>
                        <span>📍 {apt.doctor.hospital}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <span
                      className={`badge-status ${
                        apt.status === "confirmed"
                          ? "badge-confirmed"
                          : "badge-pending"
                      }`}
                    >
                      {apt.status}
                    </span>

                    <div className="card-actions mt-2">
                      <button
                        className="btn-outline"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        View
                      </button>

                      <button
                        className="btn-outline"
                        onClick={() =>
                          navigate(`/patient/book-appointment/${apt.doctor.id}`)
                        }
                      >
                        Reschedule
                      </button>

                      <button
                        className="btn-danger-text"
                        onClick={() => setConfirmId(apt.id)}
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {appointments.filter((a) => a.status !== "cancelled").length ===
            0 && <p className="text-muted">No upcoming appointments.</p>}

          {/* HEALTH METRICS */}
          <HealthMetrics />

          {/* MEDICAL TIMELINE */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-bold mt-4 mb-0">Recent Medical History</h5>
            <div style={{ maxWidth: 320, width: "100%" }}>
              <input
                className="form-control form-control-sm"
                placeholder="Search history by title, doctor, or type..."
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                id="dashboard-history-search"
              />
            </div>
          </div>

          {/* Filtered timeline - show compact cards with View button */}
          {useMemo(() => {
            const q = searchHistory.trim().toLowerCase();
            if (!q) return MEDICAL_TIMELINE.slice(0, 6);
            return MEDICAL_TIMELINE.filter((it) => {
              return (
                it.title.toLowerCase().includes(q) ||
                (it.doctor || "").toLowerCase().includes(q) ||
                (it.type || "").toLowerCase().includes(q)
              );
            }).slice(0, 6);
          }, [searchHistory]).map((item) => (
            <div
              key={item.id}
              className="card-shell mb-2 d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-bold">{item.title}</div>
                <small className="text-muted">
                  {item.doctor} · {item.date}
                </small>
              </div>
              <div className="d-flex flex-column align-items-end gap-2">
                <span className="badge bg-light text-secondary">
                  {item.type}
                </span>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/patient/records")}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMERGENCY MODULE */}
        <div className="col-lg-4">
          <EmergencyPanel />
          <div className="mt-3">
            <PanicButton />
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmId && (
        <ConfirmModal
          title="Cancel Appointment"
          message="Are you sure you want to cancel this appointment?"
          onConfirm={() => {
            handleCancel(confirmId);
            setConfirmId(null);
          }}
          onClose={() => setConfirmId(null)}
        />
      )}

      {/* TOAST WITH UNDO */}
      {toast && (
        <Toast message={toast} actionText="UNDO" onAction={undoCancel} />
      )}

      {/* APPOINTMENT DETAIL MODAL */}
      {selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          doctor={selectedAppointment.doctor}
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {/* GLOBAL SOS */}
      <SOSFloatingButton />
    </PatientLayout>
  );
};

export default PatientDashboard;
