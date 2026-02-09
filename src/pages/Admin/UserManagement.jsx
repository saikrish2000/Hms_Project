import { useState, useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useAdmin } from "../../context/AdminContext";
import {
  getAllUsers,
  approveDoctor,
  rejectDoctor,
  activateUser,
  deactivateUser,
} from "../../services/admin/userService";
import {
  FiChevronDown,
  FiCheck,
  FiX,
  FiSearch,
  FiFilter,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

const UserManagement = () => {
  const { notify } = useNotifications();
  const {
    users,
    userFilters,
    loading,
    errors,
    updateUsers,
    updateUser,
    setUserFilters,
    setLoadingState,
    setErrorState,
    clearError,
  } = useAdmin();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingState("users", true);
      clearError("users");
      const data = await getAllUsers(userFilters.role, userFilters.status);
      updateUsers(data);
      filterAndSort(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setErrorState("users", error.message || "Failed to load users");
      notify("Error loading users", "error");
    } finally {
      setLoadingState("users", false);
    }
  };

  const filterAndSort = (userList) => {
    let filtered = userList || users || [];

    if (userFilters.searchTerm?.trim()) {
      filtered = filtered.filter(
        (u) =>
          u.name?.toLowerCase().includes(userFilters.searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(userFilters.searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setUserFilters({ ...userFilters, searchTerm: value });
    filterAndSort(users);
  };

  const handleFilterRole = async (e) => {
    const value = e.target.value;
    setUserFilters({ ...userFilters, role: value });
    try {
      const data = await getAllUsers(value, userFilters.status);
      updateUsers(data);
      filterAndSort(data);
    } catch (error) {
      notify("Error filtering users", "error");
    }
  };

  const handleApproveDoctor = async (userId) => {
    try {
      await approveDoctor(userId);
      updateUser(userId, { status: "active", approved: true });
      const user = users.find((u) => u.id === userId);
      notify(`${user?.name} approved successfully`, "success");
      fetchUsers();
    } catch (error) {
      notify("Error approving doctor", "error");
    }
  };

  const handleRejectDoctor = async (userId) => {
    try {
      await rejectDoctor(userId, "Rejected by admin");
      const user = users.find((u) => u.id === userId);
      notify(`${user?.name} rejected`, "warning");
      fetchUsers();
    } catch (error) {
      notify("Error rejecting doctor", "error");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      if (user.status === "active") {
        await deactivateUser(userId, "Deactivated by admin");
        notify(`${user.name} deactivated`, "info");
      } else {
        await activateUser(userId);
        notify(`${user.name} activated`, "info");
      }
      updateUser(userId, {
        status: user.status === "active" ? "inactive" : "active",
      });
    } catch (error) {
      notify("Error updating user status", "error");
    }
  };

  const getUserBadgeColor = (role) => {
    const colors = {
      doctor: "bg-success",
      patient: "bg-info",
      admin: "bg-danger",
      bloodbank: "bg-warning",
    };
    return colors[role] || "bg-secondary";
  };

  const getStatusBadgeColor = (status) => {
    return status === "active" ? "bg-success" : status === "pending" ? "bg-warning" : "bg-danger";
  };

  if (loading.users && !users.length) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  if (errors.users) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <FiAlertCircle className="me-2" />
        <div className="mb-2">
          <strong>Error:</strong> {errors.users}
        </div>
        <small className="text-muted d-block mb-3">
          ℹ️ This is likely because the backend API is not running. Make sure your Node.js backend server is started at http://localhost:5000
        </small>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-sm btn-danger" onClick={fetchUsers}>
            <FiRefreshCw className="me-1" /> Retry
          </button>
          <button type="button" className="btn-close" onClick={() => clearError("users")} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">User Management</h2>
            <p className="text-muted mb-0">Manage and approve system users</p>
          </div>
          <button
            className="btn btn-outline-primary"
            onClick={fetchUsers}
            disabled={loading.users}
          >
            <FiRefreshCw className={loading.users ? "spinner" : ""} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="row gap-2 mb-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FiSearch />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-light"
                placeholder="Search by name or email..."
                value={userFilters.searchTerm || ""}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <FiFilter size={18} />
              </span>
              <select
                className="form-select border-0 bg-light"
                value={userFilters.role || ""}
                onChange={handleFilterRole}
              >
                <option value="">All Roles</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted small">
          Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
        </p>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            <p className="mb-0">No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div
                  className="d-flex justify-content-between align-items-center p-3"
                  onClick={() =>
                    setExpandedUserId(expandedUserId === user.id ? null : user.id)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center text-white ${getUserBadgeColor(user.role)}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}
                    >
                      {user.name?.charAt(0) || "U"}
                    </div>

                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{user.name}</h6>
                      <small className="text-muted">{user.email}</small>
                    </div>

                    <div className="d-flex gap-2 align-items-center">
                      <span className={`badge ${getUserBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className={`badge ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>

                  <FiChevronDown
                    size={20}
                    className="ms-2"
                    style={{
                      transform:
                        expandedUserId === user.id ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>

                {expandedUserId === user.id && (
                  <div className="border-top p-3 bg-light">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p className="mb-2">
                          <strong>Email:</strong> {user.email}
                        </p>
                        {user.phone && (
                          <p className="mb-2">
                            <strong>Phone:</strong> {user.phone}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        {user.specialty && (
                          <p className="mb-2">
                            <strong>Specialty:</strong> {user.specialty}
                          </p>
                        )}
                        {user.experience && (
                          <p className="mb-0">
                            <strong>Experience:</strong> {user.experience} years
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2 pt-2 border-top">
                      {user.role === "doctor" && user.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleApproveDoctor(user.id)}
                          >
                            <FiCheck className="me-1" /> Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRejectDoctor(user.id)}
                          >
                            <FiX className="me-1" /> Reject
                          </button>
                        </>
                      )}

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
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

export default UserManagement;
