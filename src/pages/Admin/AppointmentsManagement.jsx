import { useState, useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useAdmin } from "../../context/AdminContext";
import {
  getAllAppointments,
  updateAppointmentStatus,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointmentStats,
} from "../../services/admin/appointmentService";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiActivity,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiRefreshCw,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

const AppointmentsManagement = () => {
  const { notify } = useNotifications();
  const {
    appointments,
    loading,
    errors,
    updateAppointments,
    updateAppointment,
    setLoadingState,
    setErrorState,
    clearError,
  } = useAdmin();

  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoadingState("appointments", true);
      clearError("appointments");
      const filters = filterStatus !== "all" ? { status: filterStatus } : {};
      const data = await getAllAppointments(filters);
      updateAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setErrorState("appointments", error.message || "Failed to load appointments");
      notify("Error loading appointments", "error");
    } finally {
      setLoadingState("appointments", false);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await confirmAppointment(appointmentId);
      updateAppointment(appointmentId, { status: "confirmed" });
      notify("Appointment confirmed", "success");
    } catch (error) {
      notify("Error confirming appointment", "error");
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await completeAppointment(appointmentId);
      updateAppointment(appointmentId, { status: "completed" });
      notify("Appointment marked as completed", "success");
    } catch (error) {
      notify("Error completing appointment", "error");
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await cancelAppointment(appointmentId);
      updateAppointment(appointmentId, { status: "cancelled" });
      notify("Appointment cancelled", "success");
    } catch (error) {
      notify("Error cancelling appointment", "error");
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: "warning",
      confirmed: "info",
      completed: "success",
      cancelled: "danger",
    };
    return colors[status] || "secondary";
  };

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((a) => a.status === filterStatus);

  if (loading.appointments && !appointments.length) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading appointments...</p>
      </div>
    );
  }

  if (errors.appointments) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <FiAlertCircle className="me-2" />
        <div className="mb-2">
          <strong>Error:</strong> {errors.appointments}
        </div>
        <small className="text-muted d-block mb-3">
          ℹ️ This is likely because the backend API is not running. Make sure your Node.js backend server is started at http://localhost:5000
        </small>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-danger" onClick={fetchAppointments}>
            <FiRefreshCw className="me-1" /> Retry
          </button>
          <button type="button" className="btn-close" onClick={() => clearError("appointments")} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Appointments Management</h2>
          <p className="text-muted mb-0">Manage and track appointments</p>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={fetchAppointments}
          disabled={loading.appointments}
        >
          <FiRefreshCw className={loading.appointments ? "spinner" : ""} />
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Total Appointments</p>
              <h3 className="fw-bold mb-0">{appointments.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Pending</p>
              <h3 className="fw-bold text-warning mb-0">
                {appointments.filter((a) => a.status === "pending").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Confirmed</p>
              <h3 className="fw-bold text-info mb-0">
                {appointments.filter((a) => a.status === "confirmed").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Completed</p>
              <h3 className="fw-bold text-success mb-0">
                {appointments.filter((a) => a.status === "completed").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                className={`btn btn-outline-primary ${
                  filterStatus === status ? "active" : ""
                }`}
                onClick={() => {
                  setFilterStatus(status);
                }}
              >
                <FiFilter size={14} className="me-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>
        <p className="text-muted mt-2 mb-0">
          Showing {filteredAppointments.length} appointment
          {filteredAppointments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            <p className="mb-0">No appointments found</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="card shadow-sm border-0">
              <div
                className="card-body p-0 cursor-pointer"
                onClick={() =>
                  setExpandedAppointmentId(
                    expandedAppointmentId === appointment.id ? null : appointment.id
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-2">
                        Appointment #{appointment.id}
                      </h6>
                      <div className="d-flex gap-3 flex-wrap">
                        <small className="text-muted">
                          <FiUser size={14} className="me-1" />
                          {appointment.patientName}
                        </small>
                        <small className="text-muted">
                          <FiActivity size={14} className="me-1" />
                          {appointment.doctorName}
                        </small>
                        <small className="text-muted">
                          <FiCalendar size={14} className="me-1" />
                          {appointment.appointmentDate}
                        </small>
                        <small className="text-muted">
                          <FiClock size={14} className="me-1" />
                          {appointment.appointmentTime}
                        </small>
                      </div>
                    </div>
                    <span
                      className={`badge bg-${getStatusBadgeColor(appointment.status)} ms-2`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>

                {expandedAppointmentId === appointment.id && (
                  <div className="border-top p-3 bg-light">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Department:</strong> {appointment.department}
                        </p>
                        <p className="mb-2">
                          <strong>Reason:</strong> {appointment.reasonForVisit}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Notes:</strong> {appointment.notes || "N/A"}
                        </p>
                      </div>
                    </div>

                    {appointment.status === "pending" && (
                      <div className="d-flex gap-2 pt-2 border-top">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleConfirm(appointment.id)}
                        >
                          <FiCheck className="me-1" /> Confirm
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <FiX className="me-1" /> Cancel
                        </button>
                      </div>
                    )}

                    {appointment.status === "confirmed" && (
                      <div className="d-flex gap-2 pt-2 border-top">
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleComplete(appointment.id)}
                        >
                          <FiCheck className="me-1" /> Mark Complete
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <FiX className="me-1" /> Cancel
                        </button>
                      </div>
                    )}

                    {(appointment.status === "cancelled" ||
                      appointment.status === "completed") && (
                      <div className="pt-2 border-top">
                        <small className="text-muted">
                          No actions available for {appointment.status} appointments
                        </small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsManagement;
