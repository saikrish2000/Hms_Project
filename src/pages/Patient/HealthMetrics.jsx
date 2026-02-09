const HealthMetrics = () => (
  <div className="card shadow-sm border-0 p-3 mb-4">
    <h6 className="fw-bold mb-3">Health Metrics</h6>

    <div className="row g-3 text-center">
      <Metric label="Heart Rate" value="72 bpm" />
      <Metric label="Blood Pressure" value="120 / 80" />
      <Metric label="Temperature" value="98.6 °F" />
      <Metric label="Oxygen" value="98 %" />
    </div>
  </div>
);

const Metric = ({ label, value }) => (
  <div className="col-6">
    <div className="border rounded p-3">
      <small className="text-muted">{label}</small>
      <div className="fw-bold">{value}</div>
    </div>
  </div>
);

export default HealthMetrics;
