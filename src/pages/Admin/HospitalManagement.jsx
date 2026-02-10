import { useState, useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useAdmin } from "../../context/AdminContext";
import {
  getAllHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalStats,
} from "../../services/admin/hospitalService";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiPhone,
  FiMail,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

const HospitalManagement = () => {
  const { notify } = useNotifications();
  const {
    hospitals,
    loading,
    errors,
    updateHospitals,
    addHospital,
    removeHospital,
    setLoadingState,
    setErrorState,
    clearError,
  } = useAdmin();

  const [expandedHospitalId, setExpandedHospitalId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    totalBeds: "",
  });

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoadingState("hospitals", true);
      clearError("hospitals");
      const data = await getAllHospitals();
      updateHospitals(data);
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
      setErrorState("hospitals", error.message || "Failed to load hospitals");
      notify("Error loading hospitals", "error");
    } finally {
      setLoadingState("hospitals", false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      zipCode: "",
      totalBeds: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddHospital = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.city || !formData.email) {
      notify("Please fill all required fields", "error");
      return;
    }

    try {
      if (editingId) {
        await updateHospital(editingId, formData);
        notify("Hospital updated successfully", "success");
      } else {
        const newHospital = await createHospital(formData);
        addHospital(newHospital);
        notify("Hospital added successfully", "success");
      }
      fetchHospitals();
      resetForm();
    } catch (error) {
      notify("Error saving hospital", "error");
    }
  };

  const handleEditHospital = (hospital) => {
    setFormData(hospital);
    setEditingId(hospital.id);
    setShowForm(true);
  };

  const handleDeleteHospital = async (hospitalId) => {
    if (
      !window.confirm(
        "Are you sure? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteHospital(hospitalId);
      removeHospital(hospitalId);
      notify("Hospital deleted successfully", "success");
    } catch (error) {
      notify("Error deleting hospital", "error");
    }
  };

  if (loading.hospitals && !hospitals.length) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading hospitals...</p>
      </div>
    );
  }

  if (errors.hospitals) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <FiAlertCircle className="me-2" />
        <div className="mb-2">
          <strong>Error:</strong> {errors.hospitals}
        </div>
        <small className="text-muted d-block mb-3">
          ℹ️ This is likely because the backend API is not running. Make sure your Node.js backend server is started at http://localhost:5000
        </small>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-danger" onClick={fetchHospitals}>
            <FiRefreshCw className="me-1" /> Retry
          </button>
          <button type="button" className="btn-close" onClick={() => clearError("hospitals")} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Hospital Management</h2>
          <p className="text-muted mb-0">Manage hospitals and facilities</p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={fetchHospitals}
            disabled={loading.hospitals}
          >
            <FiRefreshCw className={loading.hospitals ? "spinner" : ""} />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FiPlus className="me-2" /> Add Hospital
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Total Hospitals</p>
              <h3 className="fw-bold mb-0">{hospitals.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Active</p>
              <h3 className="fw-bold mb-0">
                {hospitals.filter((h) => h.status === "active").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted small mb-1">Total Beds</p>
              <h3 className="fw-bold mb-0">
                {hospitals.reduce((sum, h) => sum + (h.totalBeds || 0), 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-light border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">
              {editingId ? "Edit Hospital" : "Add New Hospital"}
            </h6>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={resetForm}
            >
              <FiX />
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddHospital}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Hospital Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Total Beds</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.totalBeds}
                  onChange={(e) =>
                    setFormData({ ...formData, totalBeds: parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  <FiCheck className="me-2" /> Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hospitals List */}
      <div className="space-y-3">
        {hospitals.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            <p className="mb-0">No hospitals added yet</p>
          </div>
        ) : (
          hospitals.map((hospital) => (
            <div key={hospital.id} className="card shadow-sm border-0">
              <div
                className="card-body p-0 cursor-pointer"
                onClick={() =>
                  setExpandedHospitalId(
                    expandedHospitalId === hospital.id ? null : hospital.id
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-2">{hospital.name}</h6>
                      <div className="d-flex gap-3 flex-wrap">
                        {hospital.city && (
                          <small className="text-muted">
                            <FiMapPin size={14} className="me-1" />
                            {hospital.city}
                            {hospital.state && `, ${hospital.state}`}
                          </small>
                        )}
                        {hospital.phone && (
                          <small className="text-muted">
                            <FiPhone size={14} className="me-1" />
                            {hospital.phone}
                          </small>
                        )}
                        {hospital.email && (
                          <small className="text-muted">
                            <FiMail size={14} className="me-1" />
                            {hospital.email}
                          </small>
                        )}
                      </div>
                    </div>
                    <span className="badge bg-success ms-2">{hospital.status}</span>
                  </div>
                </div>

                {expandedHospitalId === hospital.id && (
                  <div className="border-top p-3 bg-light">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Total Beds:</strong> {hospital.totalBeds || "N/A"}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>City:</strong> {hospital.city}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex gap-2 pt-2 border-top">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditHospital(hospital)}
                      >
                        <FiEdit2 className="me-1" /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteHospital(hospital.id)}
                      >
                        <FiTrash2 className="me-1" /> Delete
                      </button>
                    </div>
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

export default HospitalManagement;
