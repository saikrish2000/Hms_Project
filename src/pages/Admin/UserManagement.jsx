import { useState } from "react";
import { MOCK_DOCTORS } from "../../data/doctors";
import { useNotifications } from "../../context/NotificationContext";

const UserManagement = () => {
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const { notify } = useNotifications();

  const approveDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, approved: true } : doc)),
    );

    const doctor = doctors.find((d) => d.id === id);

    notify(
      `${doctor.name} has been approved and can now access the dashboard`,
      "success",
    );
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Doctor Approvals</h3>

      {doctors.map((doc) => (
        <div key={doc.id} className="card p-3 mb-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0">{doc.name}</h6>
              <small className="text-muted">{doc.specialty}</small>
            </div>

            {!doc.approved ? (
              <button
                className="btn btn-success btn-sm"
                onClick={() => approveDoctor(doc.id)}
              >
                Approve
              </button>
            ) : (
              <span className="badge bg-success">Approved</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
