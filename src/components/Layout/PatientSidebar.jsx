import { NavLink } from "react-router-dom";
import {
  FiCalendar,
  FiDroplet,
  FiHeart,
  FiFileText,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const PatientSidebar = ({ collapsed = false, onToggle = () => {} }) => {
  return (
    <aside className={`patient-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between mb-3">
        <h5 className="sidebar-title">{!collapsed ? "Patient Menu" : ""}</h5>
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
          to="/patient/dashboard"
          icon={<FiUser />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/patient/appointments"
          icon={<FiCalendar />}
          label="My Appointments"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/patient/find-doctor"
          icon={<FiCalendar />}
          label="Find / Book Doctor"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/patient/blood-donation"
          icon={<FiDroplet />}
          label="Blood Donation"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/patient/organ-donation"
          icon={<FiHeart />}
          label="Organ Donation"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/patient/records"
          icon={<FiFileText />}
          label="Reports & Prescriptions"
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

export default PatientSidebar;
