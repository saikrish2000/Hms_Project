import { useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBriefcase,
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
  const location = useLocation();

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
      const dest = location.state?.from || `/${formData.role}/dashboard`;
      navigate(dest);
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
                          <FiBriefcase />
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

                <div className="d-flex justify-content-between align-items-center">
                  <a href="/" className="btn btn-outline-secondary">
                    Back to Home
                  </a>
                  <p className="text-center text-muted small mb-0">
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
    </div>
  );
};

export default Register;
