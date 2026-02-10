import React from 'react';

const RegisterForm = () => {
    const organOptions = [
        { name: "Heart", lives: "Can save 1 life" },
        { name: "Kidneys", lives: "Can save 2 lives" },
        { name: "Liver", lives: "Can save 1-2 lives" },
        { name: "Lungs", lives: "Can save 2 lives" },
        { name: "Pancreas", lives: "Can save 1 life" },
        { name: "Corneas", lives: "Can restore sight for 2" },
    ];

    return (
        <section className="py-5 mt-5">
            <div className="row g-5">
                {/* Left Side: Organ Selection */}
                <div className="col-lg-6">
                    <span className="badge bg-light text-success rounded-pill px-3 py-2 mb-3">Quick Registration</span>
                    <h2 className="fw-bold mb-3">Register as an Organ Donor</h2>
                    <p className="text-muted mb-4">Choose which organs you wish to donate. You can select all or specific organs based on your preference.</p>

                    <div className="row g-3">
                        {organOptions.map((organ, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="p-3 border rounded-3 d-flex align-items-center bg-white shadow-sm">
                                    <input type="checkbox" className="form-check-input me-3" id={`organ-${index}`} />
                                    <div>
                                        <label className="fw-bold d-block mb-0" htmlFor={`organ-${index}`}>{organ.name}</label>
                                        <small className="text-muted">{organ.lives}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-success w-100 mt-4 py-3 fw-bold shadow-sm">Select All Organs</button>
                </div>

                {/* Right Side: Form */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow p-4 rounded-4 bg-white">
                        <h5 className="fw-bold mb-4">Personal Information</h5>
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">First Name</label>
                                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="John" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Last Name</label>
                                    <input type="text" className="form-control bg-light border-0 py-2" placeholder="Doe" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Email Address</label>
                                    <input type="email" className="form-control bg-light border-0 py-2" placeholder="john@example.com" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Phone Number</label>
                                    <input type="tel" className="form-control bg-light border-0 py-2" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold">Date of Birth</label>
                                    <input type="date" className="form-control bg-light border-0 py-2" />
                                </div>
                                <div className="col-12">
                                    <div className="form-check small mt-2">
                                        <input className="form-check-input" type="checkbox" id="consent" />
                                        <label className="form-check-label text-muted" htmlFor="consent">
                                            I hereby give my consent to donate my organs as specified above after my death. I understand this is a voluntary decision.
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-success w-100 py-3 fw-bold">Complete Registration</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// THIS IS THE LINE THAT WAS MISSING
export default RegisterForm;