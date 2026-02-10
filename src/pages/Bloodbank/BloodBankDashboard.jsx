import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BloodBankDashboard.css";


const BloodBankDashboard = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("overview"); // Controls the View
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Data State
  const [inventory, setInventory] = useState([
    { type: "A+", units: 15, status: "good" },
    { type: "A-", units: 8, status: "good" },
    { type: "B+", units: 12, status: "good" },
    { type: "B-", units: 3, status: "critical" },
    { type: "AB+", units: 6, status: "low" },
    { type: "AB-", units: 2, status: "critical" },
    { type: "O+", units: 20, status: "good" },
    { type: "O-", units: 5, status: "low" },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      hospital: "City General Hospital",
      blood: "O-",
      units: 3,
      priority: "Critical",
    },
    {
      id: 2,
      hospital: "St. Mary's Medical",
      blood: "AB-",
      units: 2,
      priority: "High",
    },
    {
      id: 3,
      hospital: "Regional Trauma Center",
      blood: "B+",
      units: 4,
      priority: "Medium",
    },
  ]);

  const [donors] = useState([
    { name: "John Smith", group: "O+", date: "Today, 9:30 AM" },
    { name: "Emily Johnson", group: "A-", date: "Today, 10:15 AM" },
    { name: "Michael Brown", group: "B+", date: "Today, 11:00 AM" },
  ]);

  // Modal State
  const [selectedBlood, setSelectedBlood] = useState("A+");
  const [amount, setAmount] = useState("");

  // --- HELPERS ---
  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateStock = () => {
    const updated = inventory.map((item) =>
      item.type === selectedBlood
        ? { ...item, units: parseInt(amount) || 0 }
        : item,
    );
    setInventory(updated);
    setShowModal(false);
    showNotification("Stock Updated Successfully");
  };

  const handleFulfill = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    showNotification("Request Fulfilled");
  };

  // --- CONTENT RENDERER ---
  const renderContent = () => {
    switch (activeTab) {
      // 1. OVERVIEW VIEW (Matches your Screenshot)
      case "overview":
        return (
          <>
            {/* Stats Row */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="icon-box bg-red">📦</div>
                <div>
                  <h3>{inventory.reduce((a, b) => a + b.units, 0)}</h3>
                  <p>Total Units</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="icon-box bg-orange">⚠️</div>
                <div>
                  <h3>{requests.length}</h3>
                  <p>Pending</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="icon-box bg-green">👥</div>
                <div>
                  <h3>156</h3>
                  <p>Active Donors</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="icon-box bg-blue">📈</div>
                <div>
                  <h3>28</h3>
                  <p>This Week</p>
                </div>
              </div>
            </div>

            {/* Split Content */}
            <div className="overview-grid">
              {/* Quick Actions */}
              <div className="dashboard-card">
                <h3>Quick Actions</h3>
                <button
                  className="action-btn-large btn-teal"
                  onClick={() => setShowModal(true)}
                >
                  📦 Update Stock
                </button>
                <button
                  className="action-btn-large btn-red"
                  onClick={() => {
                    setRequests([
                      ...requests,
                      {
                        id: Date.now(),
                        hospital: "Emergency Walk-In",
                        blood: "O-",
                        units: 2,
                        priority: "Critical",
                      },
                    ]);
                    showNotification("Emergency Request Created!");
                  }}
                >
                  ⚠️ Create Emergency Request
                </button>
                <button
                  className="action-btn-large btn-blue"
                  onClick={() => showNotification("Donors Notified!")}
                >
                  📢 Notify Donors
                </button>
              </div>

              {/* Recent Activity */}
              <div className="dashboard-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {requests.map((r) => (
                    <div key={r.id} className="activity-item">
                      <span className="dot dot-red"></span>
                      <b>{r.hospital}</b> requested <b>{r.units}</b> units of{" "}
                      {r.blood}
                    </div>
                  ))}
                  {donors.map((d, i) => (
                    <div key={i} className="activity-item">
                      <span className="dot dot-green"></span>
                      <b>{d.name}</b> donated <b>{d.group}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      // 2. INVENTORY VIEW
      case "inventory":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2>Blood Stock</h2>
              <button
                className="action-btn-large btn-teal"
                style={{ width: "auto" }}
                onClick={() => setShowModal(true)}
              >
                + Update
              </button>
            </div>
            <div className="grid-container">
              {inventory.map((item) => (
                <div key={item.type} className={`inv-card ${item.status}`}>
                  <h1 style={{ fontSize: "2.5rem", margin: "10px 0" }}>
                    {item.type}
                  </h1>
                  <h3 style={{ fontSize: "1.5rem", margin: 0 }}>
                    {item.units}{" "}
                    <span style={{ fontSize: "0.8rem", color: "#666" }}>
                      UNITS
                    </span>
                  </h3>
                  <p
                    style={{
                      color:
                        item.status === "good"
                          ? "#16a34a"
                          : item.status === "low"
                            ? "#eab308"
                            : "#ef4444",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      // 3. REQUESTS VIEW
      case "requests":
        return (
          <div>
            <h2>Pending Requests</h2>
            {requests.map((req) => (
              <div key={req.id} className="req-card">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div
                    className="icon-box bg-red"
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    {req.blood}
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>{req.hospital}</h4>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                      {req.units} Units • {req.priority} Priority
                    </p>
                  </div>
                </div>
                <button
                  className="action-btn-large btn-red"
                  style={{ width: "auto", padding: "8px 20px", margin: 0 }}
                  onClick={() => handleFulfill(req.id)}
                >
                  Fulfill
                </button>
              </div>
            ))}
          </div>
        );

      // 4. DONORS VIEW
      case "donors":
        return (
          <div>
            <h2>Registered Donors</h2>
            {donors.map((d, i) => (
              <div key={i} className="req-card">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div className="icon-box bg-green">👤</div>
                  <div>
                    <h4 style={{ margin: 0 }}>{d.name}</h4>
                    <p style={{ margin: 0, color: "#666" }}>
                      Group: {d.group} • {d.date}
                    </p>
                  </div>
                </div>
                <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                  Active
                </span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <span style={{ color: "#0f766e", marginRight: "8px" }}>♥</span>{" "}
          HealthHub
        </div>
        <div className="sidebar-menu">
          <div
            className={`menu-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span>📊</span> Overview
          </div>
          <div
            className={`menu-item ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            <span>🩸</span> Inventory
          </div>
          <div
            className={`menu-item ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            <span>🚑</span> Requests
            {requests.length > 0 && (
              <span className="badge">{requests.length}</span>
            )}
          </div>
          <div
            className={`menu-item ${activeTab === "donors" ? "active" : ""}`}
            onClick={() => setActiveTab("donors")}
          >
            <span>👥</span> Donors
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">BB</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "white", fontSize: "0.9rem" }}>
                City Bank
              </div>
              <div style={{ fontSize: "0.75rem" }}>Admin</div>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              ↪
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <p>Welcome back, Administrator</p>
        </div>

        {renderContent()}
      </div>

      {/* Update Stock Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 style={{ marginTop: 0 }}>Update Stock</h2>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Blood Type
              </label>
              <select
                style={{ width: "100%", padding: "10px" }}
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
              >
                {inventory.map((i) => (
                  <option key={i.type} value={i.type}>
                    {i.type}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                New Quantity
              </label>
              <input
                type="number"
                style={{ width: "100%", padding: "10px" }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="action-btn-large"
                style={{ background: "#ccc", color: "#333" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="action-btn-large btn-teal"
                onClick={handleUpdateStock}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className={`toast ${notification.type}`}>{notification.msg}</div>
      )}
    </div>
  );
};

export default BloodBankDashboard;
