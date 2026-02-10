import React from 'react';

const HowItWorks = () => {
    const steps = [
        { title: "Register Online", text: "Fill out our simple registration form with your details and consent.", icon: "📄" },
        { title: "Verification", text: "Your registration is verified for authenticity and security.", icon: "🛡️" },
        { title: "Receive Donor Card", text: "Get your official organ donor card and share with family.", icon: "🏅" },
        { title: "Save Lives", text: "Your gift can save up to 8 lives when the time comes.", icon: "❤️" }
    ];

    return (
        <section className="py-5 text-center">
            <span className="badge bg-light text-success rounded-pill px-3 py-2 mb-3">Simple Process</span>
            <h2 className="fw-bold mb-5">How to Become a Donor</h2>
            <div className="row g-4">
                {steps.map((step, i) => (
                    <div key={i} className="col-lg-3 col-md-6">
                        <div className="card h-100 border-0 shadow-sm p-4 position-relative">
                            <span className="step-number">{i + 1}</span>
                            <div className="fs-1 mb-3">{step.icon}</div>
                            <h5 className="fw-bold">{step.title}</h5>
                            <p className="text-muted small">{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;