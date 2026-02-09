import { useState } from "react";
import BloodBankLayout from "../../components/Layout/BloodBankLayout";
import Toast from "../../components/Common/Toast";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";

const ManageInventory = () => {
  const { inventory, updateInventory } = useBloodBank();
  const [toast, setToast] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [newUnits, setNewUnits] = useState("");

  const handleUpdateStock = (bloodType) => {
    if (!newUnits || parseInt(newUnits) < 0) {
      setToast("Please enter valid units");
      return;
    }
    updateInventory(bloodType, parseInt(newUnits));
    setToast(`${bloodType} stock updated successfully`);
    setEditingType(null);
    setNewUnits("");
  };

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
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Inventory Management</h2>
        <p className="text-muted">Real-time blood stock monitoring and updates</p>
      </div>

      {/* Stats Overview */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Total Units</h6>
              <h3 className="fw-bold text-danger mb-0">
                {inventory.reduce((sum, item) => sum + item.units, 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Blood Types</h6>
              <h3 className="fw-bold text-info mb-0">{inventory.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted small mb-1">Low Stock Alert</h6>
              <h3 className="fw-bold text-warning mb-0">
                {inventory.filter((item) => item.status !== "good").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Grid View - Moved to Top */}
      <div className="mb-4">
        <h3 className="fw-bold mb-3">Inventory Grid View</h3>
        <div className="row g-2">
          {inventory.map((item) => (
            <div key={item.type} className="col-lg-2 col-md-3">
              <div className="card shadow-sm border-0 h-100">
                <div className={`card-header text-white py-2 ${item.status === "good" ? "bg-success" : item.status === "low" ? "bg-warning" : "bg-danger"}`}>
                  <h6 className="mb-0">{item.type}</h6>
                </div>
                <div className="card-body p-3">
                  <div className="mb-2">
                    <p className="text-muted small mb-1">Units</p>
                    <h4 className="fw-bold text-danger mb-0">{item.units}</h4>
                  </div>
                  <div className="mb-2">
                    <span className={`badge ${getStatusColor(item.status)}`}>
                      {getStatusDescription(item.status)}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => {
                      setEditingType(item.type);
                      setNewUnits(item.units.toString());
                    }}
                  >
                    <FiEdit2 size={12} className="me-1" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Type Inventory Table - Moved to Bottom */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0 fw-bold">Blood Type Inventory Details</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Blood Type</th>
                  <th>Available Units</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.type}>
                    <td className="fw-bold">{item.type}</td>
                    <td>
                      {editingType === item.type ? (
                        <div className="d-flex gap-1">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={newUnits}
                            onChange={(e) => setNewUnits(e.target.value)}
                            style={{ width: "80px" }}
                            autoFocus
                          />
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleUpdateStock(item.type)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setEditingType(null);
                              setNewUnits("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="fw-bold">{item.units}</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(item.status)}`}>
                        {getStatusDescription(item.status)}
                      </span>
                    </td>
                    <td className="text-muted small">Today</td>
                    <td>
                      {editingType !== item.type && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingType(item.type);
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

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </BloodBankLayout>
  );
};

export default ManageInventory;
