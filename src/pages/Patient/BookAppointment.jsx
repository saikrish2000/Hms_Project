import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useAppointments } from "../../context/AppointmentsContext";

import { MOCK_DOCTORS } from "../../data/doctors";
import { saveAppointment } from "../../data/appointments";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { notify } = useNotifications();
  const { addAppointment } = useAppointments();

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [success, setSuccess] = useState(false);

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/patient/book-appointment/${doctorId}` },
      });
    }
  }, [isAuthenticated, navigate, doctorId]);

  if (!doctor) {
    return (
      <div className="container py-5 text-center">
        <h3>Doctor not found</h3>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/patient/find-doctor")}
        >
          Back to Find Doctor
        </button>
      </div>
    );
  }

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      date: appointmentData.date,
      time: appointmentData.time,
      reason: appointmentData.reason,
      status: "confirmed",
    };

    addAppointment(newAppointment);

    notify(`Appointment booked with ${doctor.name}`, "success");
    setSuccess(true);

    setTimeout(() => {
      navigate("/patient/appointments");
    }, 1500);
  };

  /* ---------------- SUCCESS UI ---------------- */
  if (success) {
    return (
      <div className="container py-5 text-center">
        <FiCheckCircle className="text-success" size={64} />
        <h2 className="mt-3">Appointment Booked!</h2>
        <p className="text-muted">
          Your appointment with {doctor.name} is confirmed.
        </p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Book Appointment</h1>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h4 className="fw-bold">{doctor.name}</h4>
              <p className="text-primary">{doctor.specialty}</p>
              <p className="text-muted">
                {doctor.hospital} • {doctor.experience} yrs
              </p>
              <p>{doctor.bio}</p>
              <strong>₹{doctor.consultationFee}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FiCalendar className="me-2" />
                Date
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                required
                value={appointmentData.date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FiClock className="me-2" />
                Time
              </label>
              <select
                name="time"
                className="form-select"
                required
                value={appointmentData.time}
                onChange={handleChange}
              >
                <option value="">Select slot</option>
                {doctor.availableSlots.map((slot) => (
                  <option key={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">
                <FiMessageSquare className="me-2" />
                Reason
              </label>
              <textarea
                name="reason"
                rows={3}
                className="form-control"
                required
                value={appointmentData.reason}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary w-100">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
