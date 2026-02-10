import BloodBankLayout from "../../components/Layout/BloodBankLayout";
import { FiPhone, FiMapPin, FiUsers, FiDroplet, FiCheckCircle } from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";
import { useAuth } from "../../context/AuthContext";

const BloodBankProfile = () => {
  const { inventory, donors } = useBloodBank();
  const { user } = useAuth();

  // Blood bank profile data (from BloodDonation page)
  const bloodBankProfile = {
    name: "NTR Memorial Trust Blood Bank",
    phone: "040 4857 7888",
    location: "Road No. 2, Banjara Hills, Hyderabad",
    status: "Open",
    email: "info@ntrmemorial.org",
  };

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const lowStockItems = inventory.filter((item) => item.status !== "good").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "bg-success";
      case "low":
        return "bg-warning text-dark";
      case "critical":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case "good":
        return "Good Stock";
      case "low":
        return "Low Stock";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  return (
    <BloodBankLayout>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Blood Bank Profile</h2>
        <p className="text-muted">Blood bank information and real-time inventory status</p>
      </div>

      {/* Blood Bank Info Card */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0 fw-bold">{bloodBankProfile.name}</h4>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {/* Status */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <FiCheckCircle className="text-success fs-5" />
                    <div>
                      <p className="text-muted small mb-0">Status</p>
                      <p className="fw-bold mb-0">{bloodBankProfile.status}</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <FiPhone className="text-info fs-5" />
                    <div>
                      <p className="text-muted small mb-0">Phone</p>
                      <p className="fw-bold mb-0">{bloodBankProfile.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-2">
                    <FiMapPin className="text-danger fs-5 mt-1" />
                    <div>
                      <p className="text-muted small mb-0">Location</p>
                      <p className="fw-bold mb-0">{bloodBankProfile.location}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-warning fs-5">@</span>
                    <div>
                      <p className="text-muted small mb-0">Email</p>
                      <p className="fw-bold mb-0">{bloodBankProfile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FiDroplet className="text-danger fs-5" />
                <p className="text-muted small mb-0">Total Inventory</p>
              </div>
              <h3 className="fw-bold text-danger mb-0">{totalUnits} Units</h3>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FiUsers className="text-warning fs-5" />
                <p className="text-muted small mb-0">Active Donors</p>
              </div>
              <h3 className="fw-bold text-warning mb-0">{donors.length}</h3>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="text-info fs-5">⚠️</span>
                <p className="text-muted small mb-0">Low Stock Items</p>
              </div>
              <h3 className="fw-bold text-info mb-0">{lowStockItems}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Current Blood Inventory */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0 fw-bold">Current Blood Inventory</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Blood Type</th>
                  <th>Units Available</th>
                  <th>Status</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.type}>
                    <td className="fw-bold fs-5">{item.type}</td>
                    <td>
                      <span className="fw-bold text-danger">{item.units}</span> units
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(item.status)}`}>
                        {getStatusDescription(item.status)}
                      </span>
                    </td>
                    <td>
                      <div className="progress" style={{ height: "24px" }}>
                        <div
                          className={`progress-bar ${
                            item.status === "good"
                              ? "bg-success"
                              : item.status === "low"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                          role="progressbar"
                          style={{ width: `${Math.min((item.units / 25) * 100, 100)}%` }}
                          aria-valuenow={item.units}
                          aria-valuemin="0"
                          aria-valuemax="25"
                        >
                          {Math.min((item.units / 25) * 100, 100).toFixed(0)}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Blood Bank Highlights */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Operating Hours</h5>
            </div>
            <div className="card-body">
              <p className="mb-2">
                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
              </p>
              <p className="mb-2">
                <strong>Saturday:</strong> 9:00 AM - 4:00 PM
              </p>
              <p className="mb-0">
                <strong>Sunday:</strong> Closed
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Quick Info</h5>
            </div>
            <div className="card-body">
              <p className="mb-2">✅ ISO 9001:2015 Certified</p>
              <p className="mb-2">✅ 24/7 Emergency Support</p>
              <p className="mb-0">✅ Same-day Delivery Available</p>
            </div>
          </div>
        </div>
      </div>
    </BloodBankLayout>
  );
};

export default BloodBankProfile;
