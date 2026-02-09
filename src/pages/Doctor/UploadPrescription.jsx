import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UploadPrescription = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  if (user.role !== "doctor") {
    return <p>Access denied</p>;
  }

  const handleUpload = () => {
    console.log("Uploading prescription:", file?.name);

    // API READY
    // const formData = new FormData();
    // formData.append("file", file);
    // await api.post("/records/upload", formData);
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Upload Prescription</h4>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control mb-3"
      />

      <button
        className="btn btn-primary"
        disabled={!file}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPrescription;
