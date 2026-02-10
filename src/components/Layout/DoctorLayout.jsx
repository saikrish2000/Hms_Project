import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";

const DoctorLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("doctorSidebarCollapsed");
      if (saved !== null) return saved === "true";
    } catch (e) {}
    return typeof window !== "undefined" ? window.innerWidth < 1000 : false;
  });

  const [isManual, setIsManual] = useState(() => {
    try {
      return localStorage.getItem("doctorSidebarManual") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("doctorSidebarCollapsed", collapsed ? "true" : "false");
    } catch (e) {}
  }, [collapsed]);

  useEffect(() => {
    try {
      localStorage.setItem("doctorSidebarManual", isManual ? "true" : "false");
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

  return (
    <div className="d-flex">
      <DoctorSidebar
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

export default DoctorLayout;
