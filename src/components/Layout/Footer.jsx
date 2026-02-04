import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">HealthHub</h5>
            <p className="small">
              Your complete healthcare platform for finding doctors, donating
              blood, and registering for organ donation.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Services</h5>
            <ul className="list-unstyled small">
              <li>
                <Link to="/doctors" className="text-decoration-none text-light">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/blood-donation"
                  className="text-decoration-none text-light"
                >
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/organ-donation"
                  className="text-decoration-none text-light"
                >
                  Organ Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-decoration-none text-light"
                >
                  Emergency Services
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li>
                <Link to="/about" className="text-decoration-none text-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-decoration-none text-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-light">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <div className="small">
              <p className="mb-2">
                <FiMail className="me-2" />
                support@healthhub.com
              </p>
              <p className="mb-2">
                <FiPhone className="me-2" />
                +1 (555) 123-4567
              </p>
              <p className="mb-0">
                <FiMapPin className="me-2" />
                123 Healthcare Ave, NY 10001
              </p>
            </div>
          </div>
        </div>

        <hr className="bg-secondary" />
        <div className="text-center">
          <small>
            &copy; 2026 HealthHub. All rights reserved. Built with care for
            better healthcare.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
