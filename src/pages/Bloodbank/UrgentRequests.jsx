import { useState } from "react";
import BloodBankLayout from "../../components/Layout/BloodBankLayout";
import Toast from "../../components/Common/Toast";
import { FiAlertCircle, FiCheckCircle, FiTrash2, FiDroplet } from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";

const UrgentRequests = () => {
  const { requests, updateRequest, deleteRequest } = useBloodBank();
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("pending");

  const handleFulfill = (id) => {
    updateRequest(id, { status: "fulfilled" });
    setToast("Request fulfilled successfully");
  };

  const handleDelete = (id) => {
    deleteRequest(id);
    setToast("Request deleted");
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-danger";
      case "high":
        return "bg-warning text-dark";
      case "medium":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "fulfilled":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <BloodBankLayout>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Blood Requests Management</h2>
        <p className="text-muted">Handle urgent and routine blood requests from hospitals</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          {["pending", "fulfilled", "all"].map((status) => (
            <button
              key={status}
              className={`btn ${
                filter === status ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== "all" && (
                <span className="badge bg-light text-dark ms-2">
                  {requests.filter((r) => r.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0 fw-bold">
            {filter === "all" ? "All Requests" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
          </h5>
        </div>
        <div className="card-body">
          {filteredRequests.length === 0 ? (
            <p className="text-center text-muted py-4">
              No {filter} requests at the moment
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Hospital</th>
                    <th>Blood Type</th>
                    <th>Units Needed</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date/Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="fw-bold">{req.hospital}</td>
                      <td className="fw-bold text-danger">{req.blood}</td>
                      <td>{req.units}</td>
                      <td>
                        <span className={`badge ${getPriorityColor(req.priority)}`}>
                          {req.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(req.status)}`}>
                          {req.status.charAt(0).toUpperCase() +
                            req.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-muted small">{req.date}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {req.status === "pending" && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleFulfill(req.id)}
                            >
                              <FiCheckCircle className="me-1" /> Fulfill
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(req.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FiAlertCircle className="text-warning mb-2" size={32} />
              <h3 className="fw-bold text-warning">
                {requests.filter((r) => r.status === "pending").length}
              </h3>
              <p className="text-muted small mb-0">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FiCheckCircle className="text-success mb-2" size={32} />
              <h3 className="fw-bold text-success">
                {requests.filter((r) => r.status === "fulfilled").length}
              </h3>
              <p className="text-muted small mb-0">Fulfilled</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <FiDroplet className="text-danger mb-2" size={32} />
              <h3 className="fw-bold text-danger">
                {requests.reduce((sum, r) => sum + r.units, 0)}
              </h3>
              <p className="text-muted small mb-0">Total Units Needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </BloodBankLayout>
  );
};

export default UrgentRequests;
