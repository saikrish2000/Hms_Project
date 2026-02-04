import { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiTrendingUp } from "react-icons/fi";

const PatientAppointments = () => {
  // Mock appointments data
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2026-02-10",
      time: "10:00 AM",
      status: "confirmed",
      reason: "Heart checkup",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Neurology",
      date: "2026-02-15",
      time: "2:00 PM",
      status: "pending",
      reason: "Consultation",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="badge bg-success">Confirmed</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "completed":
        return <span className="badge bg-info">Completed</span>;
      case "cancelled":
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Appointments Yet</h5>
          <p>
            You haven't booked any appointments.{" "}
            <a href="/patient/find-doctor">Find a doctor</a> to get started.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="col-md-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title fw-bold mb-1">
                        {apt.doctorName}
                      </h5>
                      <p className="text-primary small mb-0">{apt.specialty}</p>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>

                  <hr />

                  <div className="small text-muted">
                    <p className="mb-2">
                      <FiCalendar className="me-2" />
                      <strong>Date:</strong>{" "}
                      {new Date(apt.date).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <FiClock className="me-2" />
                      <strong>Time:</strong> {apt.time}
                    </p>
                    <p className="mb-3">
                      <FiTrendingUp className="me-2" />
                      <strong>Reason:</strong> {apt.reason}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      Reschedule
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
