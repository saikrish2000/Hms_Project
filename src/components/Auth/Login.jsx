import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login(email, password);

      // Redirect to intended page or role-based dashboard
      const dest = location.state?.from || `/${user.role}/dashboard`;
      navigate(dest);
    } catch (err) {
      setError("Invalid email or password.");
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
                  <div className="alert alert-danger alert-dismissible fade show">
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
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control border-0 bg-light"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <FiLock />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control border-0 bg-light"
                        placeholder="Your password"
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
                    className="btn btn-primary w-100 fw-bold py-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <hr className="my-4" />

                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    to="/"
                    className="text-decoration-none text-primary fw-bold"
                  >
                    Back to Home
                  </Link>
                  <small className="text-muted">
                    Don’t have an account?{" "}
                    <Link to="/register" className="fw-bold text-primary">
                      Register
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
