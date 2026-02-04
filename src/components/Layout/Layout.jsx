import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    isAuthenticated;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar is always visible */}
      <Navbar />

      <main className="flex-grow-1">{children}</main>

      {/* Footer hidden conditionally */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
