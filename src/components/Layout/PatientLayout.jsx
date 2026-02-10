import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";

const PatientLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebarCollapsed");
      if (saved !== null) return saved === "true";
    } catch (e) {}
    return typeof window !== "undefined" ? window.innerWidth < 1000 : false;
  });

  const [isManual, setIsManual] = useState(() => {
    try {
      return localStorage.getItem("sidebarManual") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", collapsed ? "true" : "false");
    } catch (e) {}
  }, [collapsed]);

  useEffect(() => {
    try {
      localStorage.setItem("sidebarManual", isManual ? "true" : "false");
    } catch (e) {}
  }, [isManual]);

  const location = useLocation();

  // Auto-collapse on small screens unless the user manually toggled
  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 1000;
      if (!isManual) setCollapsed(shouldCollapse);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isManual]);

  // Keep sidebar behavior consistent across pages.
  // Removed route-specific forcing so collapsed state is controlled only
  // by responsive resize and the user's manual toggle (persisted in localStorage).

  return (
    <div className="d-flex">
      <PatientSidebar
        collapsed={collapsed}
        onToggle={() => {
          setIsManual(true);
          setCollapsed((c) => !c);
        }}
      />
      <main
        className={`flex-grow-1 p-4 bg-light ${collapsed ? "sidebar-collapsed" : ""}`}
      >
        {children}
      </main>
    </div>
  );
};

export default PatientLayout;
