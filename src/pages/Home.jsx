import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHeart } from "react-icons/fi";
import { MdLocalHospital, MdWaterDrop } from "react-icons/md";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section
        className="text-white"
        style={{
          background: "linear-gradient(135deg, #0ea5a4 0%, #2563eb 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            {/* LEFT CONTENT */}
            <div className="col-lg-6">
              <span className="badge bg-light text-dark mb-3 px-3 py-2 rounded-pill">
                Trusted by 50,000+ Patients
              </span>

              <h1 className="display-4 fw-bold mt-3 mb-4">
                Complete Healthcare <br /> At Your Fingertips
              </h1>

              <p className="lead mb-4">
                Connect with top doctors, donate blood to save lives, and
                register for organ donation — all in one integrated healthcare
                platform.
              </p>

              {!isAuthenticated ? (
                <div className="d-flex gap-3 flex-wrap mb-4">
                  <Link
                    to="/patient/find-doctor"
                    className="btn btn-success btn-lg"
                  >
                    Find a Doctor →
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-outline-light btn-lg"
                  >
                    Get Started Free
                  </Link>
                </div>
              ) : (
                <Link
                  to={`/${user?.role}/dashboard`}
                  className="btn btn-light btn-lg mb-4"
                >
                  Go to Dashboard
                </Link>
              )}

              {/* STATS */}
              <div className="row text-center text-white mt-4">
                <div className="col-4">
                  <h4 className="fw-bold">500+</h4>
                  <small>Expert Doctors</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold">10K+</h4>
                  <small>Blood Donors</small>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold">24/7</h4>
                  <small>Emergency Support</small>
                </div>
              </div>
            </div>

            {/* RIGHT FEATURE CARDS */}
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="d-grid gap-4">
                <FeatureCard
                  icon={<MdLocalHospital size={28} className="text-primary" />}
                  title="Find & Book Doctors"
                  desc="Search by specialty, location, and availability"
                  link="/patient/find-doctor"
                />

                {/* ✅ FIXED BLOOD DONATION NAVIGATION */}
                <FeatureCard
                  icon={<MdWaterDrop size={28} className="text-danger" />}
                  title="Blood Donation"
                  desc="Donate blood or find donors in emergencies"
                  link="/patient/blood-donation"
                />

                <FeatureCard
                  icon={<FiHeart size={28} className="text-success" />}
                  title="Organ Donation"
                  desc="Register as a donor and save lives"
                  link="/patient/organ-donation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose HealthHub?</h2>
            <p className="text-muted">
              A trusted digital healthcare ecosystem
            </p>
          </div>

          <div className="row g-4 text-center">
            {[
              { title: "Qualified Doctors", desc: "Verified professionals" },
              { title: "Secure Records", desc: "Your data is protected" },
              { title: "Fast Response", desc: "Quick appointments & requests" },
              { title: "Role-Based Access", desc: "Built for every user" },
            ].map((item) => (
              <div key={item.title} className="col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted small">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      {!isAuthenticated && (
        <section className="py-5 text-white bg-dark">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
            <p className="lead mb-4">
              Join thousands of users already using HealthHub
            </p>
            <Link to="/register" className="btn btn-success btn-lg">
              Sign Up Now
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

/* ================= FEATURE CARD COMPONENT ================= */
const FeatureCard = ({ icon, title, desc, link }) => {
  return (
    <Link to={link} className="text-decoration-none">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-light rounded-circle p-3">
              {icon}
            </div>
            <div>
              <h6 className="fw-bold mb-1">{title}</h6>
              <small className="text-muted">{desc}</small>
            </div>
          </div>
          <span className="fw-bold text-muted">→</span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
