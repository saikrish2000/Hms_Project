import { NavLink } from "react-router-dom";
import {
  FiBarChart,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";

const AdminSidebar = ({ collapsed = false, onToggle = () => {} }) => {
  return (
    <aside className={`patient-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between mb-3">
        <h5 className="sidebar-title">{!collapsed ? "Admin Panel" : ""}</h5>
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
          to="/admin/dashboard"
          icon={<FiHome />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/admin/users"
          icon={<FiUsers />}
          label="User Management"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/admin/hospitals"
          icon={<FiMapPin />}
          label="Hospitals"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/admin/appointments"
          icon={<FiCalendar />}
          label="Appointments"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/admin/reports"
          icon={<FiTrendingUp />}
          label="Reports"
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

export default AdminSidebar;
