import React from "react";

const Header = () => {
  return (
    <header
      className="bg-gradient py-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="text-white fw-bold mb-2">🏥 HealthHub</h1>
            <p className="text-white-50">Your Complete Healthcare Platform</p>
          </div>
          <div className="col-md-6">
            <div className="row text-center text-white">
              <div className="col-4">
                <h4 className="fw-bold">50,000+</h4>
                <small>Registered Patients</small>
              </div>
              <div className="col-4">
                <h4 className="fw-bold">500+</h4>
                <small>Expert Doctors</small>
              </div>
              <div className="col-4">
                <h4 className="fw-bold">24/7</h4>
                <small>Emergency Support</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
