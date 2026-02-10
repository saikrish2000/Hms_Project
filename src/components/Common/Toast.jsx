import { FiX } from "react-icons/fi";

const Toast = ({ message, onUndo, onClose }) => {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-card">
        <span>{message}</span>

        <div className="toast-actions">
          {onUndo && (
            <button className="toast-undo" onClick={onUndo}>
              UNDO
            </button>
          )}
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
