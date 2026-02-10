import React from 'react';
import { FaHeart } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="hero-section text-center">
            <div className="container">
                {/* The "The Greatest Gift" Badge */}
                <div className="d-inline-flex align-items-center badge-custom mb-4">
                    <FaHeart className="me-2 fw-light" />
                    <span className="small">The Greatest Gift</span>
                </div>

                <h1 className="display-3 fw-bold mb-4 text-white">
                    One Donor Can Save <br /> Up to 8 Lives
                </h1>

                <p className="lead mx-auto mb-5 text-white opacity-90" style={{ maxWidth: '750px' }}>
                    Register as an organ donor today and give the gift of life. Your decision <br />
                    can transform the lives of those waiting for a second chance.
                </p>

                <div className="d-flex justify-content-center gap-3">
                    {/* Register Now: Solid light mint background */}
                    <button className="btn btn-register fw-bold d-flex align-items-center px-4 py-2 border-0 shadow-sm rounded-3">
                        <FaHeart className="me-2 text-success" /> Register Now
                    </button>

                    {/* Learn More: Transparent with thin white border */}
                    <button className="btn btn-outline-light fw-bold px-4 py-2 rounded-3 border-1 shadow-sm">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

// CRITICAL: This line fixes your Uncaught SyntaxError
export default HeroSection;