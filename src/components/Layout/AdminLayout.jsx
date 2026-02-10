import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('adminSidebarCollapsed');
      if (saved !== null) return saved === 'true';
    } catch (e) {}
    return typeof window !== 'undefined' ? window.innerWidth < 1000 : false;
  });

  const [isManual, setIsManual] = useState(() => {
    try {
      return localStorage.getItem('adminSidebarManual') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarCollapsed', collapsed ? 'true' : 'false');
    } catch (e) {}
  }, [collapsed]);

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarManual', isManual ? 'true' : 'false');
    } catch (e) {}
  }, [isManual]);

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 1000;
      if (!isManual) setCollapsed(shouldCollapse);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isManual]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => {
            setIsManual(true);
            setCollapsed((c) => !c);
          }}
        />
        <main className={`flex-grow-1 p-4 bg-light ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
