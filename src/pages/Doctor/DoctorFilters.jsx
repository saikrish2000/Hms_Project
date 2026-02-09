const DoctorFilters = ({
  search,
  setSearch,
  specialty,
  setSpecialty,
  availability,
  setAvailability,
  fee,
  setFee,
  onReset,
}) => {
  return (
    <div className="filter-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Search Filters</h6>
        <button onClick={onReset} className="btn btn-sm btn-link">
          Reset
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Doctor name or hospital"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label className="small fw-semibold">Specialization</label>
      <select
        className="form-select mb-3"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <option value="">All</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
        <option value="Dermatology">Dermatology</option>
      </select>

      <label className="small fw-semibold">Availability</label>
      <select
        className="form-select mb-3"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      >
        <option value="">Any</option>
        <option value="today">Available Today</option>
      </select>

      <label className="small fw-semibold">Consultation Fee</label>
      <select
        className="form-select"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      >
        <option value="">Any</option>
        <option value="low">Below ₹500</option>
        <option value="mid">₹500 - ₹1000</option>
        <option value="high">Above ₹1000</option>
      </select>
    </div>
  );
};

export default DoctorFilters;
