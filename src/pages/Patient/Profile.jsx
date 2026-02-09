import React, { useState } from "react";
import PatientLayout from "../../components/Layout/PatientLayout";
import { useAuth } from "../../context/AuthContext";
import { FiEdit2 } from "react-icons/fi";

const PatientProfile = () => {
  const { user } = useAuth();

  // Local editable copy (in a real app this would sync with API)
  const [profile, setProfile] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "patient",
    bloodGroup: "O+",
    dob: "1990-01-01",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
    allergies: "",
    chronicConditions: "",
    insurance: {
      provider: "",
      policyNumber: "",
    },
  }));

  const handleChange = (path, value) => {
    if (path.includes(".")) {
      const [k, sub] = path.split(".");
      setProfile((p) => ({ ...p, [k]: { ...p[k], [sub]: value } }));
    } else {
      setProfile((p) => ({ ...p, [path]: value }));
    }
  };

  return (
    <PatientLayout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">My Profile</h3>
          <button className="btn btn-outline-primary">
            <FiEdit2 /> Edit
          </button>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card-shell text-center">
              <div style={{ maxWidth: 160, margin: "0 auto 12px" }}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.name || "Patient",
                  )}&background=2563eb&color=fff&size=160`}
                  alt="avatar"
                  style={{ width: 160, height: 160, borderRadius: "50%" }}
                />
              </div>
              <h5 className="fw-bold">{profile.name}</h5>
              <p className="text-muted small">{profile.email}</p>
              <p className="text-muted small">{profile.phone}</p>

              <hr />

              <div className="text-start">
                <div className="mb-2">
                  <strong>Blood Group:</strong>{" "}
                  <span>{profile.bloodGroup}</span>
                </div>
                <div className="mb-2">
                  <strong>Date of Birth:</strong> <span>{profile.dob}</span>
                </div>
                <div className="mb-2">
                  <strong>Role:</strong> <span>{profile.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card-shell">
              <h5 className="mb-3">Contact & Address</h5>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={profile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              <h5 className="mb-3 mt-4">Emergency Contact</h5>
              <div className="row g-2">
                <div className="col-12 col-md-4">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={profile.emergencyContact.name}
                    onChange={(e) =>
                      handleChange("emergencyContact.name", e.target.value)
                    }
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={profile.emergencyContact.phone}
                    onChange={(e) =>
                      handleChange("emergencyContact.phone", e.target.value)
                    }
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Relation</label>
                  <input
                    className="form-control"
                    value={profile.emergencyContact.relation}
                    onChange={(e) =>
                      handleChange("emergencyContact.relation", e.target.value)
                    }
                  />
                </div>
              </div>

              <h5 className="mb-3 mt-4">Medical Details</h5>
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <label className="form-label">Allergies</label>
                  <input
                    className="form-control"
                    value={profile.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Chronic Conditions</label>
                  <input
                    className="form-control"
                    value={profile.chronicConditions}
                    onChange={(e) =>
                      handleChange("chronicConditions", e.target.value)
                    }
                  />
                </div>
              </div>

              <h5 className="mb-3 mt-4">Insurance</h5>
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <label className="form-label">Provider</label>
                  <input
                    className="form-control"
                    value={profile.insurance.provider}
                    onChange={(e) =>
                      handleChange("insurance.provider", e.target.value)
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Policy Number</label>
                  <input
                    className="form-control"
                    value={profile.insurance.policyNumber}
                    onChange={(e) =>
                      handleChange("insurance.policyNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="mt-4 text-end">
                <button className="btn btn-primary">Save Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
