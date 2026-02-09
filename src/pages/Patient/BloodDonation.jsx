import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PatientLayout from "../../components/Layout/PatientLayout";
import "../../styles/BloodDonation.css";
import UrgentRequestCard from "../Bloodbank/UrgentRequestCard";
import BloodBankCard from "../Bloodbank/BloodBankCard";

const BloodDonation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  // --- 1. DATA: List of all banks ---
  const allBanks = [
    {
      id: 1,
      name: "NTR Memorial Trust Blood Bank",
      status: "Open",
      distance: "10 km away",
      address: "Road No. 2, Banjara Hills, Hyderabad",
      phone: "040 4857 7888",
      displayPhone: "040 4857 7888",
      inventory: [
        { type: "A+", units: 25, level: "good" },
        { type: "A-", units: 12, level: "medium" },
        { type: "B+", units: 30, level: "good" },
        { type: "B-", units: 8, level: "low" },
        { type: "AB+", units: 15, level: "medium" },
        { type: "AB-", units: 5, level: "low" },
        { type: "O+", units: 40, level: "good" },
        { type: "O-", units: 18, level: "medium" },
      ],
    },
    {
      id: 2,
      name: "Osmania General Hospital Blood Bank",
      status: "Open",
      distance: "25 km away",
      address: "Osmania General Hospital premises, Afzalgunj",
      phone: "9849546995",
      displayPhone: "98495 46995",
      inventory: [
        { type: "A+", units: 5, level: "low" },
        { type: "A-", units: 2, level: "low" },
        { type: "B+", units: 10, level: "medium" },
        { type: "B-", units: 0, level: "low" },
        { type: "AB+", units: 8, level: "medium" },
        { type: "AB-", units: 1, level: "low" },
        { type: "O+", units: 15, level: "good" },
        { type: "O-", units: 5, level: "medium" },
      ],
    },
    {
      id: 3,
      name: "Life Voluntary Blood Bank",
      status: "Closed",
      distance: "7.2 km away",
      address: "MIG‑323, Road No.4, KPHB Phase 1, Kukatpally",
      phone: "040 2305 9222",
      displayPhone: "040 2305 9222",
      inventory: [
        { type: "A+", units: 0, level: "low" },
        { type: "A-", units: 5, level: "medium" },
        { type: "B+", units: 2, level: "low" },
        { type: "B-", units: 0, level: "low" },
        { type: "AB+", units: 0, level: "low" },
        { type: "AB-", units: 0, level: "low" },
        { type: "O+", units: 10, level: "medium" },
        { type: "O-", units: 8, level: "medium" },
      ],
    },
    {
      id: 4,
      name: "Indian Red Cross Society Blood Bank",
      status: "Open",
      distance: "7.2 km away",
      address:
        "H.No.1‑9‑310, Near Spencer’s Supermarket, Vidya Nagar, Hyderabad",
      phone: "040 2763 3087",
      displayPhone: "040 2763 3087",
      inventory: [
        { type: "A+", units: 3, level: "low" },
        { type: "A-", units: 2, level: "medium" },
        { type: "B+", units: 7, level: "low" },
        { type: "B-", units: 1, level: "low" },
        { type: "AB+", units: 2, level: "low" },
        { type: "AB-", units: 0, level: "low" },
        { type: "O+", units: 8, level: "medium" },
        { type: "O-", units: 8, level: "medium" },
      ],
    },
    {
      id: 5,
      name: "MaxCure / Medicover Blood Bank",
      status: "Open",
      distance: "5 km away",
      address: "HUDA Techno Enclave, HITEC City",
      phone: "040 4951 3345",
      displayPhone: "040 4951 3345",
      inventory: [
        { type: "A+", units: 25, level: "good" },
        { type: "A-", units: 12, level: "medium" },
        { type: "B+", units: 30, level: "good" },
        { type: "B-", units: 8, level: "low" },
        { type: "AB+", units: 15, level: "medium" },
        { type: "AB-", units: 5, level: "low" },
        { type: "O+", units: 40, level: "good" },
        { type: "O-", units: 18, level: "medium" },
      ],
    },
  ];

  // --- 2. URGENT DATA ---
  const urgentRequests = [
    {
      id: "u1",
      hospital: "NTR Memorial Trust Blood Bank",
      blood: "O-",
      time: "2 hours ago",
      units: "3 units needed",
      status: "Critical",
      address: "Road No. 2, Banjara Hills, Hyderabad",
      phone: "040 4857 7888",
      instructions:
        "Critical shortage. Please visit the reception immediately and mention ID: #URG-HYD-01.",
    },
    {
      id: "u2",
      hospital: "Osmania General Hospital Blood Bank",
      blood: "AB-",
      time: "5 hours ago",
      units: "2 units needed",
      status: "High",
      address: "Osmania General Hospital premises, Afzalgunj",
      phone: "9849546995",
      instructions:
        "Urgent need for trauma patient. Proceed to Blood Bank Wing, Ground Floor.",
    },
  ];

  // --- 3. STATE ---
  const [banks, setBanks] = useState(allBanks);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBlood, setSearchBlood] = useState("");

  // MODAL STATES
  const [selectedBank, setSelectedBank] = useState(null); // Standard Details
  const [selectedUrgent, setSelectedUrgent] = useState(null); // Urgent Popup
  const [noResultsModal, setNoResultsModal] = useState(false); // NEW: Search Error Popup

  // --- 4. HANDLERS ---
  const handleSearch = () => {
    const filtered = allBanks.filter((bank) => {
      const locationMatch =
        bank.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
        bank.name.toLowerCase().includes(searchLocation.toLowerCase());
      let bloodMatch = true;
      if (searchBlood) {
        const bloodType = bank.inventory.find((b) => b.type === searchBlood);
        bloodMatch = bloodType && bloodType.units > 0;
      }
      return locationMatch && bloodMatch;
    });

    setBanks(filtered);

    // LOGIC: If no results, OPEN THE POPUP MODAL
    if (filtered.length === 0) {
      setNoResultsModal(true);
    }
  };

  // Reset function called from the "No Results" popup
  const handleResetSearch = () => {
    setBanks(allBanks);
    setSearchLocation("");
    setSearchBlood("");
    setNoResultsModal(false);
  };

  const handleViewDetails = (bank) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/patient/blood-donation" } });
    } else {
      setSelectedBank(bank);
    }
  };

  const handleCloseModal = () => {
    setSelectedBank(null);
    setSelectedUrgent(null);
    setNoResultsModal(false);
  };

  const handleRespond = (requestItem) => {
    setSelectedUrgent(requestItem);
  };

  const openMaps = (address) => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      "_blank",
    );
  };
  const callBank = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const pageContent = (
    <div className="blood-page">
      {/* HERO SECTION */}
      <section className="blood-hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="pill-tag">❤️ Every Drop Counts</span>
            <h1>
              Donate Blood,
              <br />
              Save Lives
            </h1>
            <p>
              Your blood donation can be the difference between life and death.
              Join our community of heroes.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login", {
                      state: { from: "/patient/blood-donation" },
                    });
                  } else {
                    alert("Redirecting to Registration...");
                  }
                }}
              >
                {isAuthenticated ? "Become a Donor" : "Login to Donate"}
              </button>
              <button
                className="btn-secondary"
                onClick={() =>
                  document
                    .querySelector(".search-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Request Blood
              </button>
            </div>
          </div>
          <div className="hero-right">
            <h3 className="urgent-title">⚠️ Urgent Blood Requests</h3>
            {urgentRequests.map((req) => (
              <UrgentRequestCard
                key={req.id}
                blood={req.blood}
                hospital={req.hospital}
                time={req.time}
                units={req.units}
                status={req.status}
                onRespond={() => {
                  if (!isAuthenticated) {
                    navigate("/login", {
                      state: { from: "/patient/blood-donation" },
                    });
                  } else {
                    handleRespond(req);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-section">
        <div className="search-container">
          <h3>Find Blood Near You</h3>
          <div className="search-inputs">
            <div className="input-group">
              <span>📍</span>
              <input
                type="text"
                placeholder="Enter location (e.g., Downtown)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <select
              className="group-select"
              value={searchBlood}
              onChange={(e) => setSearchBlood(e.target.value)}
            >
              <option value="">Any Blood Group</option>
              <option value="A+">A+</option> <option value="A-">A-</option>{" "}
              <option value="B+">B+</option> <option value="B-">B-</option>{" "}
              <option value="AB+">AB+</option> <option value="AB-">AB-</option>{" "}
              <option value="O+">O+</option> <option value="O-">O-</option>
            </select>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* BANKS GRID SECTION */}
      <section className="banks-section">
        <h2>Nearby Blood Banks</h2>
        <div className="banks-grid">
          {/* If no banks are in the list, we show nothing here because the Modal will pop up! */}
          {banks.map((bank) => (
            <BloodBankCard
              key={bank.id}
              name={bank.name}
              status={bank.status}
              distance={bank.distance}
              address={bank.address}
              phone={bank.displayPhone}
              inventory={bank.inventory}
              onViewDetails={() => handleViewDetails(bank)}
            />
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section">
        <div className="benefits-left">
          <span className="pill-tag red-bg">Why Donate?</span>
          <h2>Benefits of Blood Donation</h2>
          <ul className="benefits-list">
            <li>
              <span className="check-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{" "}
              One donation can save up to 3 lives
            </li>

            <li>
              <span className="check-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{" "}
              Free health screening with every donation
            </li>

            <li>
              <span className="check-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{" "}
              Reduces risk of heart disease
            </li>

            <li>
              <span className="check-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>{" "}
              Burns approximately 650 calories
            </li>
          </ul>
        </div>
        <div className="benefits-right">
          <div className="stat-card">
            <div className="icon-box">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3b3b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>10K+</h3>
            <p>Active Donors</p>
          </div>
          <div className="stat-card">
            <div className="icon-box">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3b3b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3>25K+</h3>
            <p>Lives Saved</p>
          </div>
          <div className="stat-card">
            <div className="icon-box">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3b3b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.74 5.74c3.12 3.12 3.12 8.19 0 11.31C16.19 21.31 14.09 22 12 22s-4.19-.69-5.74-2.26c-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"></path>
              </svg>
            </div>
            <h3>50K+</h3>
            <p>Units Donated</p>
          </div>
          <div className="stat-card">
            <div className="icon-box">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3b3b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>24/7</h3>
            <p>Emergency Support</p>
          </div>
        </div>
      </section>

      {/* --- MODAL 1: FOR BLOOD BANKS --- */}
      {selectedBank && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedBank.name}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <span
                className={`status-pill ${selectedBank.status === "Open" ? "open" : "closed"}`}
              >
                Current Status: {selectedBank.status}
              </span>
              <p>
                <strong>📍 Address:</strong> <br /> {selectedBank.address}
              </p>
              <p>
                <strong>📞 Phone:</strong> <br />{" "}
                {selectedBank.displayPhone || selectedBank.phone}
              </p>
              <p>
                <strong>🚑 Emergency Services:</strong> Available 24/7
              </p>
              <p>
                <strong>🩸 Stock Update:</strong> Verified 1 hour ago
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="call-btn"
                onClick={() => callBank(selectedBank.phone)}
              >
                📞 Call Now
              </button>
              <button
                className="directions-btn"
                onClick={() => openMaps(selectedBank.address)}
              >
                📍 Get Directions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: FOR URGENT REQUESTS --- */}
      {selectedUrgent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content urgent-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-header"
              style={{ borderBottom: "2px solid #ff3b3b" }}
            >
              <h2 style={{ color: "#d60000" }}>
                ⚠️ Urgent Request: {selectedUrgent.blood}
              </h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <h3>{selectedUrgent.hospital}</h3>
              <p
                className="status-pill closed"
                style={{
                  background: "#ffe3e3",
                  color: "#d60000",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                Status: {selectedUrgent.status} Priority
              </p>
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "left",
                  background: "#fff5f5",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <p style={{ marginBottom: "10px" }}>
                  <strong>📍 Location:</strong>
                  <br /> {selectedUrgent.address}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <strong>📝 Instructions:</strong>
                  <br /> {selectedUrgent.instructions}
                </p>
                <p style={{ marginBottom: "0" }}>
                  <strong>📞 Contact:</strong>
                  <br /> {selectedUrgent.phone}
                </p>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button
                className="call-btn"
                onClick={() => callBank(selectedUrgent.phone)}
              >
                📞 Call Hospital
              </button>
              <button
                className="directions-btn"
                onClick={() => openMaps(selectedUrgent.address)}
              >
                📍 Get Directions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: NO RESULTS FOUND (THE NEW ONE) --- */}
      {noResultsModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ textAlign: "center", padding: "40px" }}
          >
            {/* Simple Close Button Top Right */}
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            {/* Icon */}
            <div
              style={{
                background: "#f1f5f9",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                fontSize: "2rem",
                color: "#64748b",
              }}
            >
              🔍
            </div>

            <h2 style={{ marginBottom: "10px", color: "#1e293b" }}>
              No Blood Banks Found
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                marginBottom: "25px",
                lineHeight: "1.5",
              }}
            >
              We couldn't find any results matching{" "}
              <strong>"{searchLocation}"</strong>.
              <br />
              Please try checking the spelling or searching for a different
              area.
            </p>

            {/* Clear Search Button */}
            <button
              className="call-btn"
              onClick={handleResetSearch}
              style={{
                background: "#334155",
                width: "100%",
                maxWidth: "200px",
              }}
            >
              🔄 Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Show patient sidebar only for authenticated users with role 'patient'
  if (isAuthenticated && user?.role === "patient") {
    return <PatientLayout>{pageContent}</PatientLayout>;
  }

  // Public view (no patient sidebar)
  return pageContent;
};

export default BloodDonation;
