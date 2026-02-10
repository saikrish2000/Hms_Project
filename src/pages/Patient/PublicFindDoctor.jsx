import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_DOCTORS } from "../../data/doctors";
import DoctorFilters from "../Doctor/DoctorFilters";
import { FiStar } from "react-icons/fi";

const PublicFindDoctor = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [fee, setFee] = useState("");
  const [filtered, setFiltered] = useState(MOCK_DOCTORS);

  useEffect(() => {
    let data = MOCK_DOCTORS;

    if (search) {
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.hospital.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (specialty) {
      data = data.filter((d) => d.specialty === specialty);
    }

    if (fee === "low") data = data.filter((d) => d.consultationFee < 500);
    if (fee === "mid")
      data = data.filter(
        (d) => d.consultationFee >= 500 && d.consultationFee <= 1000,
      );
    if (fee === "high") data = data.filter((d) => d.consultationFee > 1000);

    setFiltered(data);
  }, [search, specialty, availability, fee]);

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Find Your Doctor</h1>

      <div className="row">
        {/* FILTERS */}
        <div className="col-lg-3 mb-4">
          <DoctorFilters
            search={search}
            setSearch={setSearch}
            specialty={specialty}
            setSpecialty={setSpecialty}
            availability={availability}
            setAvailability={setAvailability}
            fee={fee}
            setFee={setFee}
            onReset={() => {
              setSearch("");
              setSpecialty("");
              setAvailability("");
              setFee("");
            }}
          />
        </div>

        {/* RESULTS */}
        <div className="col-lg-9">
          {filtered.map((doctor) => (
            <div key={doctor.id} className="card-shell mb-3">
              <div className="card-row">
                <div className="card-left">
                  <img src={doctor.photo} className="card-avatar" />
                  <div>
                    <div className="card-title">{doctor.name}</div>
                    <div className="card-sub">{doctor.specialty}</div>
                    <span className="text-muted small">
                      <FiStar className="text-warning me-1" />
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/login")}
                >
                  Login to Book
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-muted mt-4">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicFindDoctor;
