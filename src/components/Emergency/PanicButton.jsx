const PanicButton = () => {
  const handlePanic = () => {
    alert("🚨 Emergency Alert Sent!\nCalling emergency services...");
    window.location.href = "tel:911";
  };

  return (
    <button onClick={handlePanic} className="btn btn-danger w-100 fw-bold py-2">
      🚨 PANIC – CALL EMERGENCY
    </button>
  );
};

export default PanicButton;
