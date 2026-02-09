import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BloodBankLayout from "../../components/Layout/BloodBankLayout";
import ConfirmModal from "../../components/Common/ConfirmModal";
import Toast from "../../components/Common/Toast";
import {
  FiPackage,
  FiAlertCircle,
  FiUsers,
  FiTrendingUp,
  FiEdit2,
  FiTrash2,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";
import { useAuth } from "../../context/AuthContext";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const BloodBankDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { inventory, requests, donors, updateInventory, updateRequest, deleteRequest, getTotalUnits, getLowStockItems } = useBloodBank();

  /* Local UI State */
  const [toast, setToast] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [editingBlood, setEditingBlood] = useState(null);
  const [newUnits, setNewUnits] = useState("");

  const handleUpdateStock = (bloodType) => {
    if (!newUnits || parseInt(newUnits) < 0) {
      setToast("Please enter valid units");
      return;
    }
    updateInventory(bloodType, parseInt(newUnits));
    setToast(`${bloodType} updated to ${newUnits} units`);
    setEditingBlood(null);
    setNewUnits("");
  };

  const handleFulfillRequest = (id) => {
    updateRequest(id, { status: "fulfilled" });
    setToast("Request fulfilled");
  };

  const handleDeleteRequest = (id) => {
    deleteRequest(id);
    setToast("Request deleted");
  };

  const totalUnits = getTotalUnits();
  const lowStockItems = getLowStockItems();
  const pendingRequests = requests.filter((r) => r.status === "pending");

  /* Computed Stats */
  const stats = [
    {
      title: "Total Units",
      value: totalUnits,
      icon: <FiPackage />,
      color: "text-danger",
    },
    {
      title: "Pending Requests",
      value: pendingRequests.length,
      icon: <FiAlertCircle />,
      color: "text-warning",
    },
    {
      title: "Active Donors",
      value: donors.length,
      icon: <FiUsers />,
      color: "text-success",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.length,
      icon: <FiTrendingUp />,
      color: "text-info",
    },
  ];

  const getStatusBadge = (status) => {
    const classes = {
      critical: "bg-danger",
      low: "bg-warning text-dark",
      good: "bg-success",
    };
    return classes[status] || "bg-secondary";
  };

  // Chart Data - Inventory Distribution
  const inventoryChartData = useMemo(() => ({
    labels: inventory.map((item) => item.type),
    datasets: [
      {
        label: "Units Available",
        data: inventory.map((item) => item.units),
        backgroundColor: [
          "#dc3545",
          "#fd7e14",
          "#ffc107",
          "#20c997",
          "#17a2b8",
          "#0d6efd",
          "#6f42c1",
          "#e83e8c",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  }), [inventory]);

  // Chart Data - Requests Priority Distribution (Pending Requests Only)
  const priorityChartData = useMemo(() => {
    const critical = pendingRequests.filter((r) => r.priority === "critical").length;
    const high = pendingRequests.filter((r) => r.priority === "high").length;
    const medium = pendingRequests.filter((r) => r.priority === "medium").length;

    return {
      labels: ["Critical", "High", "Medium"],
      datasets: [
        {
          label: "Number of Pending Requests",
          data: [critical, high, medium],
          backgroundColor: ["#dc3545", "#fd7e14", "#0dcaf0"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  }, [pendingRequests]);

  // Chart Data - Inventory Status Breakdown
  const statusChartData = useMemo(() => {
    const good = inventory.filter((i) => i.status === "good").length;
    const low = inventory.filter((i) => i.status === "low").length;
    const critical = inventory.filter((i) => i.status === "critical").length;

    return {
      labels: ["Good Stock", "Low Stock", "Critical"],
      datasets: [
        {
          label: "Inventory Status",
          data: [good, low, critical],
          backgroundColor: ["#198754", "#ffc107", "#dc3545"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  }, [inventory]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <BloodBankLayout>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Blood Bank Management Dashboard</h2>
        <p className="text-muted mb-0">Welcome back, {user?.name || "Blood Bank"}!</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-md-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted small mb-1">{stat.title}</p>
                    <h3 className={`fw-bold mb-0 ${stat.color}`}>{stat.value}</h3>
                  </div>
                  <span className={`fs-5 ${stat.color}`}>{stat.icon}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Requests Section - Top Priority */}
      {pendingRequests.length > 0 && (
        <div className="row g-4 mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light border-bottom">
                <h5 className="mb-0 fw-bold">Pending Blood Requests</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Hospital</th>
                        <th>Blood Type</th>
                        <th>Units</th>
                        <th>Priority</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((req) => (
                        <tr key={req.id}>
                          <td className="fw-bold">{req.hospital}</td>
                          <td>{req.blood}</td>
                          <td>{req.units}</td>
                          <td>
                            <span
                              className={`badge ${
                                req.priority === "critical"
                                  ? "bg-danger"
                                  : req.priority === "high"
                                  ? "bg-warning text-dark"
                                  : "bg-info"
                              }`}
                            >
                              {req.priority}
                            </span>
                          </td>
                          <td className="text-muted small">{req.date}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleFulfillRequest(req.id)}
                              >
                                Fulfill
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteRequest(req.id)}
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        {/* Inventory Distribution Chart */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <FiPieChart /> Blood Inventory Distribution
              </h6>
            </div>
            <div className="card-body" style={{ minHeight: "300px" }}>
              <Pie data={inventoryChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Requests Priority Chart */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <FiBarChart2 /> Requests by Priority
              </h6>
            </div>
            <div className="card-body" style={{ minHeight: "300px" }}>
              <Bar data={priorityChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Inventory Status Chart */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <FiBarChart2 /> Stock Status Overview
              </h6>
            </div>
            <div className="card-body" style={{ minHeight: "300px" }}>
              <Pie data={statusChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Inventory Section */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Blood Inventory</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Blood Type</th>
                      <th>Units</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.type}>
                        <td className="fw-bold">{item.type}</td>
                        <td>
                          {editingBlood === item.type ? (
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={newUnits}
                              onChange={(e) => setNewUnits(e.target.value)}
                              autoFocus
                              style={{ width: "60px" }}
                            />
                          ) : (
                            item.units
                          )}
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {editingBlood === item.type ? (
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() => handleUpdateStock(item.type)}
                                size="sm"
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-xs btn-secondary"
                                onClick={() => {
                                  setEditingBlood(null);
                                  setNewUnits("");
                                }}
                                size="sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setEditingBlood(item.type);
                                setNewUnits(item.units.toString());
                              }}
                            >
                              <FiEdit2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-bottom">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {[...requests, ...donors].length === 0 ? (
                  <p className="text-muted text-center py-4">No recent activity</p>
                ) : (
                  <>
                    <div className="mb-3">
                      <h6 className="fw-bold text-muted small mb-2">Requests</h6>
                      <div className="small text-muted mb-2">
                        <span className="me-2">🔴 Critical</span>
                        <span className="me-2">🟡 High</span>
                        <span>🔵 Medium</span>
                      </div>
                    </div>
                    {requests.slice(0, 3).map((req) => (
                      <div
                        key={req.id}
                        className="d-flex gap-2 mb-3 p-2 border rounded align-items-start"
                      >
                        <div className="flex-grow-1">
                          <p className="mb-1 fw-bold small">{req.hospital}</p>
                          <p className="mb-0 text-muted small">
                            {req.units} units of {req.blood} • {req.date}
                          </p>
                        </div>
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            marginTop: "4px",
                            backgroundColor:
                              req.priority === "critical"
                                ? "#dc3545"
                                : req.priority === "high"
                                ? "#ffc107"
                                : "#0dcaf0",
                          }}
                          title={req.priority}
                        ></span>
                      </div>
                    ))}
                    <hr className="my-3" />
                    <div className="mb-3">
                      <h6 className="fw-bold text-muted small mb-2">Donors</h6>
                      <div className="small text-muted mb-2">
                        <span>🟢 Active</span>
                      </div>
                    </div>
                    {donors.slice(0, 3).map((donor, idx) => (
                      <div
                        key={idx}
                        className="d-flex gap-2 mb-2 p-2 border rounded align-items-start"
                      >
                        <div className="flex-grow-1">
                          <p className="mb-1 fw-bold small">{donor.name}</p>
                          <p className="mb-0 text-muted small">
                            {donor.group} • {donor.date}
                          </p>
                        </div>
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            marginTop: "4px",
                            backgroundColor: "#198754",
                          }}
                          title="Active"
                        ></span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </BloodBankLayout>
  );
};

export default BloodBankDashboard;
