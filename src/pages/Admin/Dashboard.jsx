import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiAlertCircle, FiTrendingUp, FiRefreshCw, FiUsers, FiCalendar } from "react-icons/fi";

import { useAdmin } from "../../context/AdminContext";
import { getDashboardStats, getSystemHealth, getActivityLogs } from "../../services/admin/dashboardService";
import Toast from "../../components/Common/Toast";

const AdminDashboard = () => {
  const {
    dashboardStats,
    systemHealth,
    activityLogs,
    loading,
    errors,
    updateDashboardStats,
    updateSystemHealth,
    setLoadingState,
    setErrorState,
    clearError,
  } = useAdmin();

  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoadingState("dashboard", true);
      clearError("dashboard");

      const [statsData, healthData, logsData] = await Promise.all([
        getDashboardStats(),
        getSystemHealth(),
        getActivityLogs(10),
      ]);

      updateDashboardStats(statsData);
      updateSystemHealth(healthData);
      setToast("Dashboard updated");
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
      setErrorState("dashboard", error.message || "Failed to load dashboard");
      setToast("Error loading dashboard");
    } finally {
      setLoadingState("dashboard", false);
    }
  };

  if (loading.dashboard && !dashboardStats) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );
  }

  if (errors.dashboard && !dashboardStats) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <FiAlertCircle className="me-2" />
        <div className="mb-2">
          <strong>Error:</strong> {errors.dashboard}
        </div>
        <small className="text-muted d-block mb-3">
          ℹ️ This is likely because the backend API is not running. Make sure your Node.js backend server is started at http://localhost:5000
        </small>
        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-sm btn-danger"
            onClick={fetchDashboardData}
          >
            <FiRefreshCw className="me-1" /> Retry
          </button>
          <button type="button" className="btn-close" onClick={() => clearError("dashboard")} />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header with Refresh */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Welcome back! System overview</p>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={fetchDashboardData}
          disabled={loading.dashboard}
        >
          <FiRefreshCw className={loading.dashboard ? "spinner" : ""} size={18} />
        </button>
      </div>

      {/* System Health Alert */}
      {systemHealth && (
        <div className="alert alert-info d-flex align-items-center mb-4">
          <FiActivity className="me-3" size={24} />
          <div>
            <strong>System Health: {systemHealth.overallHealth}</strong> |
            Uptime: {systemHealth.metrics?.systemUptime || "N/A"} |
            Users: {systemHealth.metrics?.activeUsers || 0}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">Total Users</p>
                  <h3 className="fw-bold mb-0">{dashboardStats?.totalUsers || 0}</h3>
                  <small className="text-success">Active</small>
                </div>
                <FiUsers size={28} className="text-primary opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">Doctors</p>
                  <h3 className="fw-bold mb-0">{dashboardStats?.totalDoctors || 0}</h3>
                  <small className="text-success">{dashboardStats?.pendingApprovals || 0} pending</small>
                </div>
                <FiUsers size={28} className="text-success opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">Patients</p>
                  <h3 className="fw-bold mb-0">{dashboardStats?.totalPatients || 0}</h3>
                  <small className="text-success">Registered</small>
                </div>
                <FiUsers size={28} className="text-info opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">Appointments</p>
                  <h3 className="fw-bold mb-0">{dashboardStats?.totalAppointments || 0}</h3>
                  <small className="text-success">This month</small>
                </div>
                <FiCalendar size={28} className="text-warning opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Activity */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-light border-bottom">
              <h6 className="card-title mb-0 fw-bold">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/users" className="btn btn-outline-primary text-start">
                  <FiUsers className="me-2" /> Manage Users
                </Link>
                <Link to="/admin/hospitals" className="btn btn-outline-primary text-start">
                  <FiTrendingUp className="me-2" /> Hospitals
                </Link>
                <Link to="/admin/appointments" className="btn btn-outline-primary text-start">
                  <FiCalendar className="me-2" /> Appointments
                </Link>
                <Link to="/admin/reports" className="btn btn-outline-primary text-start">
                  <FiActivity className="me-2" /> Reports
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-light border-bottom">
              <h6 className="card-title mb-0 fw-bold">Recent Activity</h6>
            </div>
            <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {activityLogs && activityLogs.length > 0 ? (
                <div className="timeline">
                  {activityLogs.slice(0, 5).map((log, index) => (
                    <div key={index} className="mb-3 pb-3 border-bottom">
                      <p className="mb-1 fw-bold text-dark small">{log.action}</p>
                      <small className="text-muted">{log.details}</small>
                      <br />
                      <small className="text-muted">
                        {new Date(log.timestamp).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
};

export default AdminDashboard;
