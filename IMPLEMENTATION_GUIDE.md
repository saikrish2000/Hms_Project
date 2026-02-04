# Hospital Management System (HMS) - Implementation Guide

## Using React Router, Bootstrap, React Icons & Vite JSX

## Overview

This guide provides step-by-step instructions to build a complete Hospital Management System with role-based access, appointment booking, doctor finder, and dynamic UI based on user roles.

**Stack:** Vite + React (JSX) + Bootstrap + React Router DOM + React Icons

**Reference Site:** https://qwerty1234.lovable.app/

---

## 🎯 Project Architecture

### User Roles

1. **Patient** - Find doctors, book appointments, view prescriptions, donate blood/organs
2. **Doctor** - Manage appointments, view patient history, upload prescriptions
3. **Blood Bank** - Manage blood inventory, respond to requests
4. **Admin** - User management, hospital oversight, system monitoring

### Key Features

- Role-based login & registration
- Dynamic navbar based on user role
- Common header & footer for all users
- Find & Book Doctor
- Patient Dashboard
- Doctor Dashboard
- Blood Bank Management
- Admin Panel

---

## 📁 Project Structure

```
hms-project/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── Common/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   └── RoleCards.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Patient/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FindDoctor.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── BloodDonation.jsx
│   │   │   └── OrganDonation.jsx
│   │   ├── Doctor/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageAppointments.jsx
│   │   │   ├── PatientRecords.jsx
│   │   │   └── UploadPrescription.jsx
│   │   ├── Bloodbank/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageInventory.jsx
│   │   │   └── BloodRequests.jsx
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── HospitalManagement.jsx
│   │   │   └── Reports.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── package.json
└── index.html
```

---

## 🚀 Step-by-Step Implementation

### PHASE 1: Project Setup (Steps 1-3)

#### Step 1: Install Dependencies

```bash
cd hms-project
npm install

# Install required dependencies:
npm install react-router-dom axios react-icons bootstrap
```

**Installed packages:**

- `react-router-dom`: Multi-page navigation with role-based routing
- `axios`: API calls to backend
- `react-icons`: Beautiful icon library with multiple icon sets
- `bootstrap`: Responsive UI framework with pre-built components

---

#### Step 2: Update package.json Scripts

Update your `package.json` to include Bootstrap CSS in your main entry:

```json
{
  "name": "hms-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^7.13.0",
    "axios": "^1.6.0",
    "react-icons": "^5.5.0",
    "bootstrap": "^5.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

---

#### Step 3: Setup Authentication Context

Create `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    // TODO: Replace with actual API call
    const mockUser = {
      id: "1",
      name: "John Doe",
      email,
      role: "patient",
      phone: "+1234567890",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const register = async (userData) => {
    // TODO: Replace with actual API call
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

---

#### Step 4: Create ProtectedRoute Component

Create `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

### PHASE 2: Layout Components (Steps 5-7)

#### Step 5: Create Navbar Component with Bootstrap

Create `src/components/Layout/Navbar.jsx`:

```jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  // Navigation items based on user role
  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { label: "Find Doctors", path: "/doctors", icon: null },
        { label: "Blood Donation", path: "/blood-donation", icon: null },
        { label: "Organ Donation", path: "/organ-donation", icon: null },
      ];
    }

    const baseItems = [{ label: "Home", path: "/", icon: null }];

    switch (user?.role) {
      case "patient":
        return [
          ...baseItems,
          { label: "Find Doctor", path: "/patient/find-doctor", icon: null },
          {
            label: "My Appointments",
            path: "/patient/appointments",
            icon: null,
          },
          {
            label: "Blood Donation",
            path: "/patient/blood-donation",
            icon: null,
          },
          { label: "My Profile", path: "/patient/profile", icon: null },
        ];
      case "doctor":
        return [
          ...baseItems,
          {
            label: "My Appointments",
            path: "/doctor/appointments",
            icon: null,
          },
          { label: "Patient Records", path: "/doctor/records", icon: null },
          {
            label: "Upload Prescription",
            path: "/doctor/prescription",
            icon: null,
          },
          { label: "My Profile", path: "/doctor/profile", icon: null },
        ];
      case "bloodbank":
        return [
          ...baseItems,
          { label: "Inventory", path: "/bloodbank/inventory", icon: null },
          { label: "Blood Requests", path: "/bloodbank/requests", icon: null },
          { label: "Dashboard", path: "/bloodbank/dashboard", icon: null },
        ];
      case "admin":
        return [
          ...baseItems,
          { label: "Users", path: "/admin/users", icon: null },
          { label: "Hospitals", path: "/admin/hospitals", icon: null },
          { label: "Reports", path: "/admin/reports", icon: null },
          { label: "Dashboard", path: "/admin/dashboard", icon: null },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          <span className="me-2">🏥</span>HealthHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="me-2">{user?.name}</span>
                    <span
                      className={`badge bg-${getRoleBadgeColor(user?.role)}`}
                    >
                      {user?.role}
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link
                        to={`/${user?.role}/dashboard`}
                        className="dropdown-item"
                      >
                        <MdDashboard className="me-2" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <FiLogOut className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link btn btn-primary text-white ms-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const getRoleBadgeColor = (role) => {
  switch (role) {
    case "patient":
      return "success";
    case "doctor":
      return "info";
    case "bloodbank":
      return "danger";
    case "admin":
      return "warning";
    default:
      return "secondary";
  }
};

export default Navbar;
```

---

#### Step 6: Create Header Component

Create `src/components/Layout/Header.jsx`:

```jsx
const Header = () => {
  return (
    <header
      className="bg-gradient py-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="text-white fw-bold mb-2">🏥 HealthHub</h1>
            <p className="text-white-50">Your Complete Healthcare Platform</p>
          </div>
          <div className="col-md-6">
            <div className="row text-center text-white">
              <div className="col-4">
                <h4 className="fw-bold">50,000+</h4>
                <small>Registered Patients</small>
              </div>
              <div className="col-4">
                <h4 className="fw-bold">500+</h4>
                <small>Expert Doctors</small>
              </div>
              <div className="col-4">
                <h4 className="fw-bold">24/7</h4>
                <small>Emergency Support</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

---

#### Step 7: Create Footer Component

Create `src/components/Layout/Footer.jsx`:

```jsx
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">HealthHub</h5>
            <p className="small">
              Your complete healthcare platform for finding doctors, donating
              blood, and registering for organ donation.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Services</h5>
            <ul className="list-unstyled small">
              <li>
                <Link to="/doctors" className="text-decoration-none text-light">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/blood-donation"
                  className="text-decoration-none text-light"
                >
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/organ-donation"
                  className="text-decoration-none text-light"
                >
                  Organ Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-decoration-none text-light"
                >
                  Emergency Services
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li>
                <Link to="/about" className="text-decoration-none text-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-decoration-none text-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-light">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <div className="small">
              <p className="mb-2">
                <FiMail className="me-2" />
                support@healthhub.com
              </p>
              <p className="mb-2">
                <FiPhone className="me-2" />
                +1 (555) 123-4567
              </p>
              <p className="mb-0">
                <FiMapPin className="me-2" />
                123 Healthcare Ave, NY 10001
              </p>
            </div>
          </div>
        </div>

        <hr className="bg-secondary" />
        <div className="text-center">
          <small>
            &copy; 2026 HealthHub. All rights reserved. Built with care for
            better healthcare.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

#### Step 8: Create Layout Wrapper Component

Create `src/components/Layout/Layout.jsx`:

```jsx
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, showHeader = false }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
```

---

### PHASE 3: Authentication Pages (Steps 9-10)

#### Step 9: Create Login Component with Bootstrap

Create `src/components/Auth/Login.jsx`:

```jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(searchParams.get("role") || "patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <h1 className="h3 text-center mb-2 fw-bold">Welcome Back</h1>
                <p className="text-center text-muted mb-4">
                  Login to your HealthHub account
                </p>

                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-500">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-select"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="bloodbank">Blood Bank</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="form-control border-0 bg-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        className="form-control border-0 bg-light"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-light border-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-600 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : null}
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center text-muted small">
                  Don't have an account?{" "}
                  <a href="/register" className="text-primary fw-600">
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

---

#### Step 10: Create Register Component with Bootstrap

Create `src/components/Auth/Register.jsx`:

```jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBuilding,
  FiAward,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: searchParams.get("role") || "patient",
    specialization: "",
    hospitalName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      navigate(`/${formData.role}/dashboard`);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <h1 className="h3 text-center mb-2 fw-bold">Create Account</h1>
                <p className="text-center text-muted mb-4">
                  Join HealthHub and access quality healthcare
                </p>

                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-500">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="form-control border-0 bg-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Email</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="form-control border-0 bg-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Phone</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiPhone />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1234567890"
                        className="form-control border-0 bg-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiLock />
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="form-control border-0 bg-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-500">Register as</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="bloodbank">Blood Bank</option>
                    </select>
                  </div>

                  {formData.role === "doctor" && (
                    <div className="mb-3">
                      <label className="form-label fw-500">
                        Specialization
                      </label>
                      <div className="input-group">
                        <span className="input-group-text border-0 bg-light">
                          <FiAward />
                        </span>
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          placeholder="e.g., Cardiology"
                          className="form-control border-0 bg-light"
                        />
                      </div>
                    </div>
                  )}

                  {formData.role === "bloodbank" && (
                    <div className="mb-3">
                      <label className="form-label fw-500">
                        Hospital/Bank Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text border-0 bg-light">
                          <FiBuilding />
                        </span>
                        <input
                          type="text"
                          name="hospitalName"
                          value={formData.hospitalName}
                          onChange={handleChange}
                          placeholder="Hospital or Blood Bank name"
                          className="form-control border-0 bg-light"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-600 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : null}
                    {loading ? "Creating account..." : "Register"}
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center text-muted small">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary fw-600">
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
```

---

### PHASE 4: Patient Pages (Steps 11-13)

#### Step 11: Create Find Doctor Page with Bootstrap

Create `src/pages/Patient/FindDoctor.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiStar, FiClock, FiUsers, FiDollarSign } from "react-icons/fi";

// Mock data
const MOCK_DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 15,
    hospital: "Central Hospital",
    rating: 4.8,
    availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
    consultationFee: 500,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    experience: 12,
    hospital: "Medical Plaza",
    rating: 4.6,
    availableSlots: ["11:00 AM", "3:00 PM"],
    consultationFee: 450,
  },
  {
    id: "3",
    name: "Dr. Emma Wilson",
    specialty: "Cardiology",
    experience: 10,
    hospital: "City Medical",
    rating: 4.7,
    availableSlots: ["9:00 AM", "1:00 PM"],
    consultationFee: 500,
  },
];

const FindDoctor = () => {
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [specialty, setSpecialty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    let filtered = MOCK_DOCTORS;

    if (specialty) {
      filtered = filtered.filter((d) =>
        d.specialty.toLowerCase().includes(specialty.toLowerCase()),
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.hospital.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setDoctors(filtered);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Find & Book a Doctor</h1>

      <div className="row g-3 mb-5">
        <div className="col-md-5">
          <input
            type="text"
            placeholder="Search by doctor name or hospital"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>

        <div className="col-md-4">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="form-select form-select-lg"
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>
        </div>

        <div className="col-md-3">
          <button
            onClick={handleSearch}
            className="btn btn-primary btn-lg w-100"
          >
            Search
          </button>
        </div>
      </div>

      <div className="row g-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 hover-effect">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title fw-bold">{doctor.name}</h5>
                  <span className="badge bg-warning text-dark">
                    <FiStar className="me-1" />
                    {doctor.rating}
                  </span>
                </div>

                <p className="text-primary fw-600 mb-2">{doctor.specialty}</p>

                <div className="small text-muted mb-3">
                  <p className="mb-1">
                    <FiClock className="me-2" />
                    Experience: {doctor.experience} years
                  </p>
                  <p className="mb-2">
                    <FiUsers className="me-2" />
                    {doctor.hospital}
                  </p>
                  <p className="mb-3">
                    <FiDollarSign className="me-2" />
                    Consultation: ₹{doctor.consultationFee}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/patient/book-appointment/${doctor.id}`)
                  }
                  className="btn btn-primary w-100"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted">
            No doctors found. Try adjusting your search.
          </h5>
        </div>
      )}
    </div>
  );
};

export default FindDoctor;
```

---

#### Step 12: Create Book Appointment Page

Create `src/pages/Patient/BookAppointment.jsx`:

```jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiMessageSquare } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Send appointment data to backend
    console.log("Booking appointment:", { doctorId, ...appointmentData });

    setSuccess(true);
    setTimeout(() => {
      navigate("/patient/appointments");
    }, 2000);
  };

  if (success) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <FiCheckCircle className="text-success" size={64} />
            <h2 className="text-success mt-3 mb-2">
              Appointment Booked Successfully!
            </h2>
            <p className="text-muted">
              Your appointment has been confirmed. Check your email for details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold">Book an Appointment</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiCalendar className="me-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiClock className="me-2" />
                    Select Time
                  </label>
                  <select
                    name="time"
                    value={appointmentData.time}
                    onChange={handleChange}
                    className="form-select form-select-lg"
                    required
                  >
                    <option value="">Choose a time slot</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-600 mb-2">
                    <FiMessageSquare className="me-2" />
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    value={appointmentData.reason}
                    onChange={handleChange}
                    placeholder="Describe your symptoms or reason for visit"
                    className="form-control"
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
```

---

#### Step 13: Create Patient Appointments Page

Create `src/pages/Patient/Appointments.jsx`:

```jsx
import { useState } from "react";
import { FiCalendar, FiClock, FiUser, FiTrendingUp } from "react-icons/fi";

const PatientAppointments = () => {
  // Mock appointments data
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2026-02-10",
      time: "10:00 AM",
      status: "confirmed",
      reason: "Heart checkup",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Neurology",
      date: "2026-02-15",
      time: "2:00 PM",
      status: "pending",
      reason: "Consultation",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="badge bg-success">Confirmed</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "completed":
        return <span className="badge bg-info">Completed</span>;
      case "cancelled":
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Appointments Yet</h5>
          <p>
            You haven't booked any appointments.{" "}
            <a href="/patient/find-doctor">Find a doctor</a> to get started.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="col-md-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title fw-bold mb-1">
                        {apt.doctorName}
                      </h5>
                      <p className="text-primary small mb-0">{apt.specialty}</p>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>

                  <hr />

                  <div className="small text-muted">
                    <p className="mb-2">
                      <FiCalendar className="me-2" />
                      <strong>Date:</strong>{" "}
                      {new Date(apt.date).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <FiClock className="me-2" />
                      <strong>Time:</strong> {apt.time}
                    </p>
                    <p className="mb-3">
                      <FiTrendingUp className="me-2" />
                      <strong>Reason:</strong> {apt.reason}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      Reschedule
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
```

---

### PHASE 5: App Routing & Integration (Steps 13-15)

#### Step 13: Update App.jsx with Routing

Create `src/App.jsx`:

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";

// Auth Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Common Pages
import Home from "./pages/Home";

// Patient Pages
import PatientDashboard from "./pages/Patient/Dashboard";
import FindDoctor from "./pages/Patient/FindDoctor";
import BookAppointment from "./pages/Patient/BookAppointment";
import PatientAppointments from "./pages/Patient/Appointments";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ManageAppointments from "./pages/Doctor/ManageAppointments";

// Blood Bank Pages
import BloodbankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

// 404
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/find-doctor" element={<FindDoctor />} />
            <Route
              path="/patient/book-appointment/:doctorId"
              element={<BookAppointment />}
            />
            <Route
              path="/patient/appointments"
              element={<PatientAppointments />}
            />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor/appointments"
              element={<ManageAppointments />}
            />

            {/* Blood Bank Routes */}
            <Route
              path="/bloodbank/dashboard"
              element={<BloodbankDashboard />}
            />
            <Route path="/bloodbank/inventory" element={<ManageInventory />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

#### Step 14: Create Home Page

Create `src/pages/Home.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Complete Healthcare At Your Fingertips</h1>
          <p>Connect with top doctors, donate blood to save lives, and register for organ donation. All in one integrated platform designed for your health needs.</p>
          <div className="hero-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/doctors" className="btn-primary btn-lg">
                  Find a Doctor
                </Link>
                <Link to="/register" className="btn-secondary btn-lg">
                  Get Started Free
                </Link>
              </>
            ) : (
              <Link to={`/${user?.role}/dashboard`} className="btn-primary btn-lg">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Expert Doctors</p>
        </div>
        <div className="stat-item">
          <h3>10K+</h3>
          <p>Blood Donors</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Emergency Support</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Everything You Need for Better Healthcare</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Find & Book Doctors</h3>
            <p>Search by specialty, location, and availability</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🩸</div>
            <h3>Blood Donation</h3>
            <p>Donate blood or find donors in emergencies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Organ Donation</h3>
            <p>Register as a donor and save lives</p>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      {!isAuthenticated && (
        <section className="role-section">
          <h2>Choose Your Role</h2>
          <div className="roles-grid">
            <div className="role-card patient">
              <h3>👤 Patient</h3>
              <p>Book appointments, request blood, register for organ donation, and manage your health records.</p>
              <Link to="/register?role=patient" className="btn-primary">Get Started</Link>
            </div>

            <div className="role-card doctor">
              <h3>👨‍⚕️ Doctor</h3>
              <p>Manage appointments, access patient records, and provide prescriptions through our platform.</p>
              <Link to="/register?role=doctor" className="btn-primary">Get Started</Link>
            </div>

            <div className="role-card bloodbank">
              <h3>🩸 Blood Bank</h3>
              <p>Manage blood inventory, respond to requests, and track donations efficiently.</p>
              <Link to="/register?role=bloodbank" className="btn-primary">Get Started</Link>
            </div>

            <div className="role-card admin">
              <h3>⚙️ Admin</h3>
              <p>Full control over the platform. Manage users, hospitals, and monitor all activities.</p>
              <Link to="/login?role=admin" className="btn-primary">Login</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
```

Create `src/pages/Home.css`:

```css
.home {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-content p {
  font-size: 18px;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 15px 40px;
  font-size: 16px;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
  display: inline-block;
}

.btn-primary:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: white;
  color: #667eea;
  border: 2px solid white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
  display: inline-block;
}

.btn-secondary:hover {
  background-color: transparent;
  color: white;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  background-color: #f8f9fa;
}

.stat-item h3 {
  font-size: 36px;
  color: #667eea;
  margin-bottom: 10px;
}

.stat-item p {
  color: #666;
  font-size: 16px;
}

.features {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.feature-card p {
  color: #666;
  font-size: 14px;
}

.role-section {
  background-color: #f8f9fa;
  padding: 80px 20px;
}

.role-section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #333;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.role-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 4px solid;
  transition: transform 0.3s;
}

.role-card:hover {
  transform: translateY(-5px);
}

.role-card.patient {
  border-top-color: #10b981;
}

.role-card.doctor {
  border-top-color: #3b82f6;
}

.role-card.bloodbank {
  border-top-color: #ef4444;
}

.role-card.admin {
  border-top-color: #f59e0b;
}

.role-card h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

.role-card p {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 32px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .hero {
    padding: 60px 20px;
  }

  .features {
    padding: 50px 20px;
  }

  .features h2 {
    font-size: 28px;
  }

  .role-section h2 {
    font-size: 28px;
  }
}
```

---

#### Step 15: Create Placeholder Pages

Create `src/pages/Patient/Dashboard.jsx`:

```jsx
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Welcome, {user?.name}!</h1>
      <p>
        This is your patient dashboard. Coming soon: appointment history,
        prescriptions, and health records.
      </p>
    </div>
  );
};

export default PatientDashboard;
```

Create `src/pages/Patient/Appointments.jsx`:

```jsx
const PatientAppointments = () => {
  return (
    <div className="container">
      <h1>My Appointments</h1>
      <p>Your appointment history will appear here.</p>
    </div>
  );
};

export default PatientAppointments;
```

Similar placeholder files for:

- `src/pages/Doctor/Dashboard.jsx`
- `src/pages/Doctor/ManageAppointments.jsx`
- `src/pages/Bloodbank/Dashboard.jsx`
- `src/pages/Bloodbank/ManageInventory.jsx`
- `src/pages/Admin/Dashboard.jsx`
- `src/pages/Admin/UserManagement.jsx`
- `src/pages/NotFound.jsx`

---

### PHASE 6: Final Styling & Tailwind Setup (Step 16)

#### Step 16: Configure Tailwind CSS

Create `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
      },
    },
  },
  plugins: [],
};
```

Create `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

html,
body,
#root {
  height: 100%;
}

#root {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
```

---

### PHASE 5: App Routing & Integration (Steps 14-16)

#### Step 14: Update App.jsx with Routing

Create `src/App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";

// Auth Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Common Pages
import Home from "./pages/Home";

// Patient Pages
import PatientDashboard from "./pages/Patient/Dashboard";
import FindDoctor from "./pages/Patient/FindDoctor";
import BookAppointment from "./pages/Patient/BookAppointment";
import PatientAppointments from "./pages/Patient/Appointments";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/Dashboard";
import ManageAppointments from "./pages/Doctor/ManageAppointments";

// Blood Bank Pages
import BloodbankDashboard from "./pages/Bloodbank/Dashboard";
import ManageInventory from "./pages/Bloodbank/ManageInventory";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";

// 404
import NotFound from "./pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/find-doctor"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <FindDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/book-appointment/:doctorId"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientAppointments />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <ManageAppointments />
                </ProtectedRoute>
              }
            />

            {/* Blood Bank Routes */}
            <Route
              path="/bloodbank/dashboard"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <BloodbankDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bloodbank/inventory"
              element={
                <ProtectedRoute allowedRoles={["bloodbank"]}>
                  <ManageInventory />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

#### Step 15: Update main.jsx

Create `src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

#### Step 16: Create Home Page with Bootstrap

Create `src/pages/Home.jsx`:

```jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiAward, FiDroplets, FiHeart } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        className="text-white py-5"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">
                Complete Healthcare At Your Fingertips
              </h1>
              <p className="lead mb-4">
                Connect with top doctors, donate blood to save lives, and
                register for organ donation. All in one integrated platform
                designed for your health needs.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/patient/find-doctor"
                      className="btn btn-light btn-lg fw-600"
                    >
                      Find a Doctor
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-outline-light btn-lg fw-600"
                    >
                      Get Started Free
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/${user?.role}/dashboard`}
                    className="btn btn-light btn-lg fw-600"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <MdLocalHospital size={200} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h3 className="text-primary fw-bold">500+</h3>
              <p className="text-muted">Expert Doctors</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-primary fw-bold">10K+</h3>
              <p className="text-muted">Blood Donors</p>
            </div>
            <div className="col-md-4">
              <h3 className="text-primary fw-bold">24/7</h3>
              <p className="text-muted">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            Everything You Need for Better Healthcare
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <FiAward className="text-primary mb-3" size={48} />
                  <h5 className="card-title fw-bold">Find & Book Doctors</h5>
                  <p className="card-text text-muted">
                    Search by specialty, location, and availability
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <FiDroplets className="text-danger mb-3" size={48} />
                  <h5 className="card-title fw-bold">Blood Donation</h5>
                  <p className="card-text text-muted">
                    Donate blood or find donors in emergencies
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <FiHeart className="text-success mb-3" size={48} />
                  <h5 className="card-title fw-bold">Organ Donation</h5>
                  <p className="card-text text-muted">
                    Register as a donor and save lives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      {!isAuthenticated && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center fw-bold mb-5">Choose Your Role</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 border-top border-success border-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">👤 Patient</h5>
                    <p className="card-text small text-muted mb-4">
                      Book appointments, request blood, register for organ
                      donation, and manage your health records.
                    </p>
                    <Link
                      to="/register?role=patient"
                      className="btn btn-primary w-100"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 border-top border-info border-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">👨‍⚕️ Doctor</h5>
                    <p className="card-text small text-muted mb-4">
                      Manage appointments, access patient records, and provide
                      prescriptions through our platform.
                    </p>
                    <Link
                      to="/register?role=doctor"
                      className="btn btn-primary w-100"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 border-top border-danger border-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">🩸 Blood Bank</h5>
                    <p className="card-text small text-muted mb-4">
                      Manage blood inventory, respond to requests, and track
                      donations efficiently.
                    </p>
                    <Link
                      to="/register?role=bloodbank"
                      className="btn btn-primary w-100"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 border-top border-warning border-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">⚙️ Admin</h5>
                    <p className="card-text small text-muted mb-4">
                      Full control over the platform. Manage users, hospitals,
                      and monitor all activities.
                    </p>
                    <Link
                      to="/login?role=admin"
                      className="btn btn-primary w-100"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
```

---

### PHASE 6: Create Placeholder Pages (Step 17)

#### Step 17: Create Placeholder Pages

All role-based dashboard pages can start as simple placeholders:

**Create `src/pages/Patient/Dashboard.jsx`:**

```jsx
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h1 className="mb-4">Welcome, {user?.name}!</h1>
      <div className="alert alert-info">
        Patient dashboard coming soon with appointment history, prescriptions,
        and health records.
      </div>
    </div>
  );
};

export default PatientDashboard;
```

**Create `src/pages/Doctor/Dashboard.jsx`:**

```jsx
const DoctorDashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Doctor Dashboard</h1>
      <div className="alert alert-info">
        Doctor dashboard coming soon with appointment management and patient
        records.
      </div>
    </div>
  );
};

export default DoctorDashboard;
```

**Create `src/pages/Bloodbank/Dashboard.jsx`:**

```jsx
const BloodbankDashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Blood Bank Dashboard</h1>
      <div className="alert alert-info">
        Blood bank dashboard coming soon with inventory management.
      </div>
    </div>
  );
};

export default BloodbankDashboard;
```

**Create `src/pages/Admin/Dashboard.jsx`:**

```jsx
const AdminDashboard = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="alert alert-info">
        Admin dashboard coming soon with user and hospital management.
      </div>
    </div>
  );
};

export default AdminDashboard;
```

**Create `src/pages/NotFound.jsx`:**

```jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
```

Create similar placeholder files for other routes:

- `src/pages/Doctor/ManageAppointments.jsx`
- `src/pages/Bloodbank/ManageInventory.jsx`
- `src/pages/Admin/UserManagement.jsx`

---

## 📋 Checklist for Completing the Project

### Backend Integration

- [ ] Connect Login/Register to backend API
- [ ] Implement JWT token management
- [ ] Setup user authentication
- [ ] Create database schema for users, doctors, appointments

### Patient Features

- [ ] Complete patient dashboard
- [ ] Implement appointment history
- [ ] Add prescription viewing
- [ ] Blood donation registration
- [ ] Organ donation registration

### Doctor Features

- [ ] Complete doctor dashboard
- [ ] Appointment management system
- [ ] Patient medical records access
- [ ] Prescription upload feature

### Blood Bank Features

- [ ] Blood inventory management
- [ ] Blood request handling
- [ ] Donation tracking

### Admin Features

- [ ] User management dashboard
- [ ] Hospital management
- [ ] System reports & analytics

### General

- [ ] Mobile responsiveness testing
- [ ] Error handling & validation
- [ ] Loading states
- [ ] API error handling
- [ ] Token refresh mechanism
- [ ] Protected routes/authentication guards

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## ✨ Key Features Used

### Bootstrap Components Used:

- **Navbar** - `navbar`, `navbar-collapse`, `dropdown`
- **Cards** - `card`, `card-body`, `card-title`
- **Forms** - `form-control`, `form-select`, `input-group`
- **Buttons** - `btn`, `btn-primary`, `btn-outline-*`
- **Alerts** - `alert`, `alert-*`
- **Grid** - `container`, `row`, `col-*`
- **Badges** - `badge`, `bg-*`
- **Utilities** - `d-flex`, `justify-content-*`, `align-items-*`, `gap-*`, `mb-*`, `py-*`, etc.

### React Icons Used:

- **Fi** (Feather Icons): FiMail, FiLock, FiEye, FiUser, FiPhone, etc.
- **Md** (Material Design): MdDashboard, MdLocalHospital, MdSchool, etc.
- All icons are responsive and easily customizable with `size` prop

### React Router DOM Features:

- `BrowserRouter` - Main router component
- `Routes` & `Route` - Route definitions
- `Link` & `useNavigate` - Navigation
- `useSearchParams` - Query parameters
- `ProtectedRoute` - Custom route guard component

---

## 🎨 Customization Tips

### Change Primary Color

Update Bootstrap theme by adding to `src/index.css`:

```css
:root {
  --bs-primary: #667eea;
  --bs-secondary: #764ba2;
}
```

### Add Custom Utilities

Add to `src/index.css`:

```css
.min-vh-100 {
  min-height: 100vh;
}

.hover-effect {
  transition: all 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-5px);
}
```

### Bootstrap Classes Quick Reference

- `mb-3` = margin-bottom
- `py-5` = padding top and bottom
- `fw-bold` = font-weight bold
- `text-center` = text alignment
- `d-flex` = display flex
- `gap-3` = gap between flex items
- `shadow-sm` = box shadow
- `rounded-4` = border radius
- `border-0` = no border
- `bg-light` = light background
- `text-muted` = muted text color

---

## 📝 Next Steps

1. **Create Placeholder Pages** - Add all remaining dashboard and management pages
2. **Backend Setup** - Create API endpoints for auth, doctors, appointments
3. **Database** - Setup MongoDB/PostgreSQL with schemas
4. **API Integration** - Replace mock data with real API calls using axios
5. **Authentication** - Implement JWT tokens and refresh mechanism
6. **Testing** - Write unit and integration tests
7. **Deployment** - Deploy to Vercel or Netlify
8. **Monitoring** - Add analytics and error tracking

---

## 📚 Useful Resources

- **Bootstrap Docs**: https://getbootstrap.com/docs/5.3/
- **React Icons**: https://react-icons.github.io/react-icons/
- **React Router**: https://reactrouter.com/en/main
- **Vite**: https://vitejs.dev/guide/

---

## 🎯 Project Summary

You now have a complete Hospital Management System template with:

- ✅ Role-based login and registration
- ✅ Dynamic navbar that changes based on user role
- ✅ Bootstrap-based responsive UI
- ✅ React Icons for beautiful icons
- ✅ React Router for multi-page navigation
- ✅ Protected routes with role verification
- ✅ Find & Book Doctor functionality
- ✅ Mock data for testing
- ✅ Clean, modular component structure

All components use JSX syntax with Vite and Bootstrap for styling. Ready to extend with backend integration and additional features!
