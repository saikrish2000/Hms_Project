import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiMessageSquare } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { MOCK_DOCTORS } from "../../data/doctors";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //i feel that ui is bit boring  but can we change few colours combination by refering the other sites through web
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Send appointment data to backend
    console.log("Booking appointment:", { doctorId, ...appointmentData });

    setSuccess(true);
    setTimeout(() => {
      navigate("/patient/appointments");
    }, 2000);
  };

  // Redirect unauthenticated users to login (preserve intended booking URL)
  useEffect(() => {
    if (!isAuthenticated) {
      // If user navigates directly to the booking page, send them to login
      // but preserve the desired booking path so they can be returned.
      navigate("/login", {
        state: { from: `/patient/book-appointment/${doctorId}` },
      });
    }
  }, [isAuthenticated, navigate, doctorId]);

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h3 className="mb-3">Doctor not found</h3>
            <p className="text-muted">
              We couldn't find the doctor you are trying to book. Please go back
              and try again.
            </p>
            <button
              className="btn btn-outline-primary mt-3"
              onClick={() => navigate("/patient/find-doctor")}
            >
              Back to Find Doctor
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <FiCheckCircle className="text-success" size={64} />
            <h2 className="text-success mt-3 mb-2">
              Appointment Booked Successfully!
            </h2>
            <p className="text-muted">
              Your appointment has been confirmed. Check your email for details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold">Book an Appointment</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  {doctor.photo && (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="img-fluid rounded"
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <h4 className="mb-1 fw-bold">{doctor.name}</h4>
                  <p className="mb-1 text-primary fw-600">{doctor.specialty}</p>
                  <p className="small text-muted mb-1">
                    {doctor.hospital} • {doctor.experience} yrs
                  </p>
                  <p className="mb-2">{doctor.bio}</p>
                  <p className="fw-600">
                    Consultation Fee: ₹{doctor.consultationFee}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiCalendar className="me-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiClock className="me-2" />
                    Select Time
                  </label>
                  <select
                    name="time"
                    value={appointmentData.time}
                    onChange={handleChange}
                    className="form-select form-select-lg"
                    required
                  >
                    <option value="">Choose a time slot</option>
                    {doctor.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiMessageSquare className="me-2" />
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    value={appointmentData.reason}
                    onChange={handleChange}
                    placeholder="Describe your symptoms or reason for visit"
                    className="form-control"
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
