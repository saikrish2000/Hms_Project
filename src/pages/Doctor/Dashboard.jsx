import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "../../components/Layout/DoctorLayout";
import {
  BsCalendarCheck,
  BsClockHistory,
  BsPeople,
  BsClipboardPulse,
  BsFileEarmarkText,
  BsCapsule
} from "react-icons/bs";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DoctorLayout>
      <div className="doctor-dashboard container-fluid py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold">Doctor Dashboard</h1>
        <p className="text-muted">
          Manage your appointments and patient consultations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <StatCard
          icon={<BsCalendarCheck />}
          value="12"
          label="Today's Appointments"
          color="primary"
        />
        <StatCard
          icon={<BsClockHistory />}
          value="5"
          label="Pending Requests"
          color="warning"
        />
        <StatCard
          icon={<BsPeople />}
          value="248"
          label="Total Patients"
          color="success"
        />
        <StatCard
          icon={<BsClipboardPulse />}
          value="87"
          label="Consultations"
          color="info"
        />
      </div>

      {/* Action Cards */}
      <div className="row g-4">
        <ActionCard
          icon={<BsCalendarCheck />}
          title="Today's Appointments"
          desc="View scheduled consultations"
        />
        <ActionCard
          icon={<BsPeople />}
          title="Patient Records"
          desc="Access patient information"
        />
        <ActionCard
          icon={<BsCapsule />}
          title="Prescribe Medication"
          desc="Create new prescription"
        />
        <ActionCard
          icon={<BsFileEarmarkText />}
          title="Lab Results"
          desc="Review test reports"
        />
      </div>
    </div>
    </DoctorLayout>
  );
};

const StatCard = ({ icon, value, label, color }) => (
  <div className="col-md-3">
    <div className="card stat-card shadow-sm border-0">
      <div className={`stat-icon text-${color}`}>{icon}</div>
      <h3 className={`fw-bold text-${color}`}>{value}</h3>
      <p className="text-muted mb-0">{label}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, desc }) => (
  <div className="col-md-3">
    <div className="card action-card h-100">
      <div className="action-icon">{icon}</div>
      <h5 className="fw-semibold mt-3">{title}</h5>
      <p className="text-muted">{desc}</p>
    </div>
  </div>
);

export default DoctorDashboard;
