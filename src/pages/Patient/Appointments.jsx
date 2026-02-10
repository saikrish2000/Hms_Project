import PatientLayout from "../../components/Layout/PatientLayout";
import { useNavigate } from "react-router-dom";
import { MOCK_DOCTORS } from "../../data/doctors";
import { useAppointments } from "../../context/AppointmentsContext";

const PatientAppointments = () => {
  const navigate = useNavigate();
  const { appointments: ctxAppointments } = useAppointments();

  const appointments = ctxAppointments.map((apt) => {
    const doctor = MOCK_DOCTORS.find((d) => d.id === apt.doctorId);
    return { ...apt, doctor };
  });

  const badgeClass = (status) => {
    if (status === "confirmed") return "badge-confirmed";
    if (status === "pending") return "badge-pending";
    return "badge-cancelled";
  };

  return (
    <PatientLayout>
      <h3 className="fw-bold mb-4">My Appointments</h3>

      {appointments.map((apt) => (
        <div key={apt.id} className="card-shell mb-3">
          <div className="card-row">
            <div className="card-left">
              <img src={apt.doctor.photo} className="card-avatar" />

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
              <span className={`badge-status ${badgeClass(apt.status)}`}>
                {apt.status}
              </span>

              <div className="card-actions mt-2">
                <button
                  className="btn-outline"
                  onClick={() =>
                    navigate(`/patient/book-appointment/${apt.doctor.id}`)
                  }
                >
                  Reschedule
                </button>
                <button className="btn-danger-text">✕ Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </PatientLayout>
  );
};

export default PatientAppointments;
