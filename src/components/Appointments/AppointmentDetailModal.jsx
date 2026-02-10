import { FiX } from "react-icons/fi";

const AppointmentDetailModal = ({ appointment, doctor, isOpen, onClose }) => {
  if (!isOpen || !appointment || !doctor) return null;

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, parseInt(month) - 1, day).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  return (
    <div className="pdf-modal-backdrop" onClick={onClose}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdf-modal-header">
          <div>
            <h4 className="pdf-modal-title">Appointment Details</h4>
            <p className="pdf-modal-subtitle">with Dr. {doctor.name}</p>
          </div>
          <button className="pdf-close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div
          className="pdf-modal-body"
          style={{ padding: "20px", lineHeight: "1.8" }}
        >
          <div className="row mb-3">
            <div className="col-md-4">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="img-fluid rounded"
                style={{ maxHeight: 200 }}
              />
            </div>
            <div className="col-md-8">
              <h5 className="fw-bold">{doctor.name}</h5>
              <p className="text-primary">{doctor.specialty}</p>
              <p className="text-muted">
                {doctor.hospital} · {doctor.experience} years experience
              </p>
              <p>{doctor.bio}</p>
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <label className="text-muted">Date</label>
              <p className="fw-bold">{formatDate(appointment.date)}</p>
            </div>
            <div className="col-md-6">
              <label className="text-muted">Time</label>
              <p className="fw-bold">{appointment.time}</p>
            </div>
            <div className="col-12">
              <label className="text-muted">Reason</label>
              <p className="fw-bold" style={{ whiteSpace: "pre-wrap" }}>
                {appointment.reason}
              </p>
            </div>
            <div className="col-12">
              <label className="text-muted">Status</label>
              <p>
                <span
                  className={`badge ${
                    appointment.status === "confirmed"
                      ? "bg-success"
                      : appointment.status === "pending"
                        ? "bg-warning"
                        : "bg-danger"
                  }`}
                >
                  {appointment.status?.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="col-12">
              <label className="text-muted">Consultation Fee</label>
              <p className="fw-bold">₹{doctor.consultationFee}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;
