import { FiX, FiDownload } from "react-icons/fi";
import "../../styles/PDFViewer.css";

const PDFViewerModal = ({ record, isOpen, onClose }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="pdf-modal-backdrop" onClick={onClose}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdf-modal-header">
          <div>
            <h4 className="pdf-modal-title">{record.title}</h4>
            <p className="pdf-modal-subtitle">
              by Dr. {record.doctor} · {record.date}
            </p>
          </div>
          <button className="pdf-close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* PDF Preview / Embed */}
        <div className="pdf-modal-body">
          <iframe
            src={`${record.fileUrl}#toolbar=0`}
            className="pdf-iframe"
            title={record.title}
          />
        </div>

        {/* Footer */}
        <div className="pdf-modal-footer">
          <p className="pdf-info">
            📄 {record.type} · {record.fileUrl?.split("/").pop()}
          </p>
          <div className="pdf-actions">
            <a
              href={record.fileUrl}
              download
              className="btn btn-outline-primary"
            >
              <FiDownload /> Download PDF
            </a>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
