import { NavLink } from "react-router-dom";
import {
  FiDroplet,
  FiPackage,
  FiAlertCircle,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";
import { useBloodBank } from "../../context/BloodBankContext";

const BloodBankSidebar = ({ collapsed = false, onToggle = () => {} }) => {
  const { requests } = useBloodBank();
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <aside className={`patient-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between mb-3">
        <h5 className="sidebar-title">{!collapsed ? "Blood Bank" : ""}</h5>
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
          to="/bloodbank/dashboard"
          icon={<FiDroplet />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/bloodbank/inventory"
          icon={<FiPackage />}
          label="Inventory"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/bloodbank/urgent-requests"
          icon={<FiAlertCircle />}
          label="Requests"
          badge={pendingCount > 0 ? pendingCount : null}
          collapsed={collapsed}
        />
        <SidebarLink
          to="/bloodbank/donors"
          icon={<FiUsers />}
          label="Donors"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/bloodbank/profile"
          icon={<FiInfo />}
          label="Profile"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, badge, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
      title={collapsed ? label : undefined}
    >
      <span className="icon d-flex align-items-center justify-content-between w-100">
        <span>{icon}</span>
        {badge && <span className="badge bg-danger rounded-circle ms-1">{badge}</span>}
      </span>
      {!collapsed && (
        <span className="text">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default BloodBankSidebar;
