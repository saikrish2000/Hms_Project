const ConfirmModal = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-card">
        <h5>{title}</h5>
        <p>{message}</p>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-light" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
