import { useEffect, useState } from "react";
import { FiPhoneCall, FiMapPin, FiAlertCircle } from "react-icons/fi";

const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "City Medical Center",
    address: "123 Healthcare Ave, NY",
    distance: "0.8 mi",
  },
  {
    id: 2,
    name: "St. Mary's Hospital",
    address: "456 Wellness Blvd, NY",
    distance: "1.2 mi",
  },
  {
    id: 3,
    name: "General Hospital Emergency",
    address: "789 Emergency Lane, NY",
    distance: "2.1 mi",
  },
];

const EmergencyPanel = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setLocation(null),
    );
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h6 className="fw-bold text-danger mb-3">
          <FiAlertCircle className="me-2" />
          Emergency Contacts
        </h6>

        {/* EMERGENCY NUMBERS */}
        <div className="list-group mb-4">
          <a
            href="tel:911"
            className="list-group-item d-flex justify-content-between"
          >
            Emergency Services <strong className="text-danger">911</strong>
          </a>
          <a
            href="tel:18002221222"
            className="list-group-item d-flex justify-content-between"
          >
            Poison Control{" "}
            <strong className="text-danger">1-800-222-1222</strong>
          </a>
          <a
            href="tel:1800BLOOD"
            className="list-group-item d-flex justify-content-between"
          >
            Blood Bank Hotline{" "}
            <strong className="text-danger">1-800-BLOOD</strong>
          </a>
        </div>

        {/* NEARBY HOSPITALS */}
        <h6 className="fw-bold mb-2">Nearby Hospitals</h6>

        {MOCK_HOSPITALS.map((h) => (
          <div key={h.id} className="border rounded p-3 mb-2">
            <div className="fw-bold">{h.name}</div>
            <div className="small text-muted">
              <FiMapPin className="me-1" />
              {h.address}
            </div>
            <div className="small text-success">{h.distance}</div>

            <div className="d-flex gap-2 mt-2">
              <a href="tel:911" className="btn btn-outline-primary btn-sm">
                <FiPhoneCall /> Call
              </a>
              {location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${h.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary btn-sm"
                >
                  Navigate
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyPanel;
