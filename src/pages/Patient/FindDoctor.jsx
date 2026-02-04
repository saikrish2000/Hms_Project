import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiStar, FiClock, FiUsers, FiDollarSign } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { MOCK_DOCTORS } from "../../data/doctors";

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

  // Live debounced search: updates `doctors` 300ms after user stops typing
  useEffect(() => {
    const delay = 300; // ms
    const handler = setTimeout(() => {
      let filtered = MOCK_DOCTORS;

      if (specialty) {
        filtered = filtered.filter((d) =>
          d.specialty.toLowerCase().includes(specialty.toLowerCase()),
        );
      }

      const q = searchTerm.trim().toLowerCase();
      if (q) {
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.hospital.toLowerCase().includes(q) ||
            d.specialty.toLowerCase().includes(q),
        );
      }

      setDoctors(filtered);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, specialty]);

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
              {doctor.photo && (
                <div className="text-center mt-4">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="doctor-avatar"
                  />
                </div>
              )}

              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title fw-bold">{doctor.name}</h5>
                  <span className="badge bg-warning text-dark">
                    <FiStar className="me-1" />
                    {doctor.rating}
                  </span>
                </div>

                <p className="text-primary fw-600 mb-2">{doctor.specialty}</p>

                <p className="mb-2 text-muted small">{doctor.bio}</p>

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

                <BookButton doctor={doctor} navigate={navigate} />
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

// Separate Book button component so it can check auth and redirect to login
function BookButton({ doctor, navigate }) {
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    const bookingPath = `/patient/book-appointment/${doctor.id}`;
    if (!isAuthenticated) {
      // redirect to login and preserve the intended booking path
      navigate("/login", { state: { from: bookingPath } });
      return;
    }
    navigate(bookingPath);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary w-100">
      Book Appointment
    </button>
  );
}
