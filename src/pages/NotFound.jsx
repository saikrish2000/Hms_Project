import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="text-center text-white">
        <h1 className="display-1 fw-bold mb-2">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-4 lead">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate("/")} className="btn btn-light btn-lg">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
