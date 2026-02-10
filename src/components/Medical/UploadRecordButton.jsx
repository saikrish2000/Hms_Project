import { useAuth } from "../../context/AuthContext";
import { FiUpload } from "react-icons/fi";

const UploadRecordButton = ({ onUpload }) => {
  const { user } = useAuth();

  if (user?.role !== "doctor") return null;

  const handleUpload = () => {
    const newRecord = {
      id: Date.now().toString(),
      type: "Prescription",
      title: "Prescription - New Upload",
      doctor: user.name,
      date: new Date().toDateString(),
      medicines: ["Sample Medicine 1", "Sample Medicine 2"],
      fileUrl: "/files/sample.pdf",
    };

    onUpload(newRecord);
  };

  return (
    <button className="btn btn-primary btn-sm" onClick={handleUpload}>
      <FiUpload className="me-1" /> Upload Record
    </button>
  );
};

export default UploadRecordButton;
