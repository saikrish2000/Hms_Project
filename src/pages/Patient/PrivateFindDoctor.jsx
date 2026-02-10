import PatientLayout from "../../components/Layout/PatientLayout";
import { MOCK_DOCTORS } from "../../data/doctors";
import { useNavigate } from "react-router-dom";

const PrivateFindDoctor = () => {
  const navigate = useNavigate();

  return (
    <PatientLayout>
      <h3 className="fw-bold mb-4">Find & Book Doctors</h3>

      {MOCK_DOCTORS.map((doctor) => (
        <div key={doctor.id} className="card-shell mb-3">
          <div className="card-row">
            <div className="card-left">
              <img src={doctor.photo} className="card-avatar" />

              <div>
                <div className="card-title">{doctor.name}</div>
                <div className="card-sub">{doctor.specialty}</div>

                <div className="card-meta">
                  <span>⭐ {doctor.rating}</span>
                  <span>{doctor.hospital}</span>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      ))}
    </PatientLayout>
  );
};

export default PrivateFindDoctor;
