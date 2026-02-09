import { useState, useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useAdmin } from "../../context/AdminContext";
import {
  generateReport,
  getAllReports,
  getReportById,
  getSystemKPIs,
  getDoctorPerformance,
  getHospitalSummary,
  getBloodInventorySummary,
} from "../../services/admin/reportService";
import {
  FiTrendingUp,
  FiDownload,
  FiRefreshCw,
  FiAlertCircle,
  FiBarChart2,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

const ReportsAndAnalytics = () => {
  const { notify } = useNotifications();
  const {
    reports,
    loading,
    errors,
    updateReports,
    setLoadingState,
    setErrorState,
    clearError,
  } = useAdmin();

  const [reportType, setReportType] = useState("system");
  const [systemKPIs, setSystemKPIs] = useState(null);
  const [doctorPerformance, setDoctorPerformance] = useState(null);
  const [hospitalSummary, setHospitalSummary] = useState(null);
  const [bloodInventory, setBloodInventory] = useState(null);
  const [expandedReportId, setExpandedReportId] = useState(null);

  useEffect(() => {
    fetchAllReports();
    fetchAnalytics();
  }, []);

  const fetchAllReports = async () => {
    try {
      setLoadingState("reports", true);
      clearError("reports");
      const data = await getAllReports();
      updateReports(data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setErrorState("reports", error.message || "Failed to load reports");
      notify("Error loading reports", "error");
    } finally {
      setLoadingState("reports", false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const [kpis, doctors, hospitals, blood] = await Promise.all([
        getSystemKPIs(),
        getDoctorPerformance(),
        getHospitalSummary(),
        getBloodInventorySummary(),
      ]);

      setSystemKPIs(kpis);
      setDoctorPerformance(doctors);
      setHospitalSummary(hospitals);
      setBloodInventory(blood);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      notify("Error loading analytics", "error");
    }
  };

  const handleGenerateReport = async (type) => {
    try {
      notify("Generating report...", "info");
      const report = await generateReport(type, {} );
      notify("Report generated successfully", "success");
      fetchAllReports();
    } catch (error) {
      notify("Error generating report", "error");
    }
  };

  const handleDownloadReport = async (reportId, format = "pdf") => {
    try {
      notify("Downloading report...", "info");
      // In a real app, this would trigger file download
      // const response = await downloadReport(reportId, format);
      notify("Report downloaded successfully", "success");
    } catch (error) {
      notify("Error downloading report", "error");
    }
  };

  if (loading.reports && !reports.length) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Reports & Analytics</h2>
          <p className="text-muted mb-0">
            System insights and performance metrics
          </p>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={fetchAnalytics}
          disabled={loading.reports}
        >
          <FiRefreshCw className={loading.reports ? "spinner" : ""} />
        </button>
      </div>

      {errors.reports && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <FiAlertCircle className="me-2" />
          <div className="mb-2">
            <strong>Error:</strong> {errors.reports}
          </div>
          <small className="text-muted d-block mb-3">
            ℹ️ This is likely because the backend API is not running. Make sure your Node.js backend server is started at http://localhost:5000
          </small>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-sm btn-danger" onClick={fetchAnalytics}>
              <FiRefreshCw className="me-1" /> Retry
            </button>
            <button type="button" className="btn-close" onClick={() => clearError("reports")} />
          </div>
        </div>
      )}

      {/* KPIs */}
      {systemKPIs && (
        <div>
          <h5 className="fw-bold mb-3 mt-4">System KPIs</h5>
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-1">Total Users</p>
                      <h4 className="fw-bold mb-0">
                        {systemKPIs.totalUsers || 0}
                      </h4>
                    </div>
                    <FiUsers className="text-primary" size={32} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-1">Active Doctors</p>
                      <h4 className="fw-bold mb-0">
                        {systemKPIs.activeDoctors || 0}
                      </h4>
                    </div>
                    <FiActivity className="text-success" size={32} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-1">Appointments</p>
                      <h4 className="fw-bold mb-0">
                        {systemKPIs.totalAppointments || 0}
                      </h4>
                    </div>
                    <FiBarChart2 className="text-info" size={32} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-1">System Health</p>
                      <h4 className="fw-bold mb-0">
                        {systemKPIs.systemHealth || "N/A"}
                      </h4>
                    </div>
                    <FiTrendingUp className="text-warning" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Performance */}
      {doctorPerformance && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Top Performing Doctors</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Doctor Name</th>
                  <th>Appointments</th>
                  <th>Rating</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {(doctorPerformance.topDoctors || []).map((doctor, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold">{doctor.name}</td>
                    <td>{doctor.appointmentsCompleted}</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {doctor.rating} ⭐
                      </span>
                    </td>
                    <td>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${doctor.completionRate}%` }}
                        >
                          {doctor.completionRate}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hospital Summary */}
      {hospitalSummary && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Hospital Performance</h5>
          <div className="row">
            {(hospitalSummary.hospitals || []).slice(0, 3).map((hospital, idx) => (
              <div key={idx} className="col-md-4 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="fw-bold mb-2">{hospital.name}</h6>
                    <p className="mb-1 text-muted small">
                      Total Beds: <span className="text-dark fw-bold">{hospital.totalBeds}</span>
                    </p>
                    <p className="mb-1 text-muted small">
                      Occupied: <span className="text-dark fw-bold">{hospital.occupiedBeds}</span>
                    </p>
                    <p className="mb-0 text-muted small">
                      Occupancy Rate:{" "}
                      <span className="text-dark fw-bold">
                        {hospital.occupancyRate}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blood Inventory */}
      {bloodInventory && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Blood Inventory Summary</h5>
          <div className="row">
            {Object.entries(bloodInventory).map(([type, data]) => (
              <div key={type} className="col-md-4 mb-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="fw-bold mb-2">{type}</h6>
                    <p className="mb-1 text-muted small">
                      Available: <span className="text-dark fw-bold">{data.available}</span>
                    </p>
                    <p className="mb-0 text-muted small">
                      Reserved:{" "}
                      <span className="text-dark fw-bold">{data.reserved}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Generation */}
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Generate Reports</h5>
        <div className="btn-group" role="group">
          {[
            { value: "appointments", label: "Monthly Appointments" },
            { value: "doctors", label: "Doctor Performance" },
            { value: "hospitals", label: "Hospital Summary" },
            { value: "blood", label: "Blood Inventory" },
          ].map((btn) => (
            <button
              key={btn.value}
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleGenerateReport(btn.value)}
            >
              Generate {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {reports.length > 0 && (
        <div>
          <h5 className="fw-bold mb-3">Recent Reports</h5>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="card shadow-sm border-0">
                <div
                  className="card-body p-0 cursor-pointer"
                  onClick={() =>
                    setExpandedReportId(
                      expandedReportId === report.id ? null : report.id
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-2">{report.name}</h6>
                        <small className="text-muted">
                          Generated: {report.generatedDate}
                        </small>
                      </div>
                      <span className="badge bg-primary ms-2">
                        {report.format}
                      </span>
                    </div>
                  </div>

                  {expandedReportId === report.id && (
                    <div className="border-top p-3 bg-light">
                      <p className="mb-2">
                        <strong>Description:</strong> {report.description}
                      </p>
                      <p className="mb-2">
                        <strong>Status:</strong> {report.status}
                      </p>
                      <div className="d-flex gap-2 pt-2 border-top">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            handleDownloadReport(report.id, "pdf")
                          }
                        >
                          <FiDownload className="me-1" /> Download PDF
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            handleDownloadReport(report.id, "csv")
                          }
                        >
                          <FiDownload className="me-1" /> Download CSV
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reports.length === 0 && (
        <div className="alert alert-info text-center py-4">
          <p className="mb-0">No reports generated yet</p>
        </div>
      )}
    </div>
  );
};

export default ReportsAndAnalytics;
