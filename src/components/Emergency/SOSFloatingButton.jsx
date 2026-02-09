const SOSFloatingButton = () => {
  return (
    <button
      onClick={() => (window.location.href = "tel:911")}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        fontSize: "18px",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 8px 20px rgba(0,0,0,.3)",
      }}
    >
      SOS
    </button>
  );
};

export default SOSFloatingButton;
