import PatientLayout from "../../components/Layout/PatientLayout";
import { PRESCRIPTIONS } from "../../data/medicalData";

const Prescriptions = () => (
  <PatientLayout>
    <h3 className="fw-bold mb-4">Prescriptions</h3>

    {PRESCRIPTIONS.map((rx) => (
      <div key={rx.id} className="card mb-3 p-3">
        <h6 className="fw-bold">{rx.title}</h6>
        <small className="text-muted">
          {rx.doctor} · {rx.date}
        </small>

        <ul className="mt-2">
          {rx.medicines.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        <a
          href={rx.fileUrl}
          download
          className="btn btn-sm btn-outline-primary"
        >
          Download Prescription
        </a>
      </div>
    ))}
  </PatientLayout>
);

export default Prescriptions;
