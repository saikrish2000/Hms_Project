import { NavLink } from "react-router-dom";
import {
  FiLayout,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const DoctorSidebar = ({ collapsed = false, onToggle = () => {} }) => {
  return (
    <aside className={`doctor-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between mb-3">
        <h5 className="sidebar-title">{!collapsed ? "Doctor Menu" : ""}</h5>
        <button
          className="sidebar-toggle btn btn-sm btn-outline-light"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <SidebarLink
          to="/doctor/dashboard"
          icon={<FiLayout />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/doctor/appointments"
          icon={<FiCalendar />}
          label="Appointments"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/doctor/patients"
          icon={<FiUsers />}
          label="Patients"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/doctor/consultations"
          icon={<FiBriefcase />}
          label="Consultations"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
      title={collapsed ? label : undefined}
    >
      <span className="icon">{icon}</span>
      {!collapsed && <span className="text">{label}</span>}
    </NavLink>
  );
};

export default DoctorSidebar;
