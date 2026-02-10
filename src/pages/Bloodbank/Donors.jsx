import { useState } from "react";
import BloodBankLayout from "../../components/Layout/BloodBankLayout";
import Toast from "../../components/Common/Toast";
import { FiUsers, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";

const Donors = () => {
  const { donors, addDonor } = useBloodBank();
  const [toast, setToast] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    group: "O+",
    date: new Date().toLocaleString(),
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleAddDonor = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setToast("Please enter donor name");
      return;
    }
    addDonor({
      name: formData.name,
      group: formData.group,
      date: new Date().toLocaleString(),
      status: "active",
    });
    setToast("Donor registered successfully");
    setFormData({ name: "", group: "O+", date: new Date().toLocaleString() });
    setShowForm(false);
  };

  const activeDonors = donors.filter((d) => d.status === "active");
  const bloodGroupStats = bloodGroups.map((group) => ({
    group,
    count: donors.filter((d) => d.group === group).length,
  }));

  return (
    <BloodBankLayout>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-1">Donor Management</h2>
            <p className="text-muted">Manage blood donors and track donations</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <FiPlus className="me-1" /> Register Donor
          </button>
        </div>
      </div>

      {/* Add Donor Form */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-light border-bottom">
            <h5 className="mb-0 fw-bold">Register New Donor</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddDonor}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Donor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter donor name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Blood Group</label>
                  <select
                    className="form-select"
                    value={formData.group}
                    onChange={(e) =>
                      setFormData({ ...formData, group: e.target.value })
                    }
                  >
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  Register Donor
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Total Donors</h6>
              <h3 className="fw-bold text-success mb-0">{donors.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Active Donors</h6>
              <h3 className="fw-bold text-info mb-0">{activeDonors.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">O+ Donors</h6>
              <h3 className="fw-bold text-danger mb-0">
                {donors.filter((d) => d.group === "O+").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">O- Donors</h6>
              <h3 className="fw-bold text-danger mb-0">
                {donors.filter((d) => d.group === "O-").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Blood Group Distribution */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Blood Group Distribution</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Blood Group</th>
                      <th>Donors</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloodGroupStats.map((stat) => (
                      <tr key={stat.group}>
                        <td className="fw-bold">{stat.group}</td>
                        <td>{stat.count}</td>
                        <td>
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{
                                width: `${
                                  donors.length > 0
                                    ? (stat.count / donors.length) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donors */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Recent Donors</h5>
            </div>
            <div className="card-body">
              {donors.length === 0 ? (
                <p className="text-center text-muted py-4">No donors registered yet</p>
              ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {donors.slice(0, 10).map((donor) => (
                    <div
                      key={donor.id}
                      className="d-flex gap-2 mb-3 p-2 border rounded align-items-center"
                    >
                      <FiCheckCircle className="text-success" />
                      <div className="flex-grow-1">
                        <p className="mb-1 fw-bold small">{donor.name}</p>
                        <p className="mb-0 text-muted small">
                          {donor.group} • {donor.date}
                        </p>
                      </div>
                      <span className="badge bg-success">Active</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* All Donors Table */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0 fw-bold">All Registered Donors</h5>
        </div>
        <div className="card-body">
          {donors.length === 0 ? (
            <p className="text-center text-muted py-4">No donors registered yet</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor) => (
                    <tr key={donor.id}>
                      <td className="fw-bold">{donor.name}</td>
                      <td className="text-danger fw-bold">{donor.group}</td>
                      <td className="text-muted small">{donor.date}</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </BloodBankLayout>
  );
};

export default Donors;
