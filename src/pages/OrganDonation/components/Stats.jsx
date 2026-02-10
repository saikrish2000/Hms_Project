import React from 'react';

const Stats = () => {
    const statsData = [
        { value: "100K+", label: "Waiting Patients" },
        { value: "8", label: "Lives Per Donor" },
        { value: "17", label: "Die Daily Waiting" },
        { value: "50K+", label: "Registered Donors" }
    ];

    return (
        <div className="container stats-container">
            <div className="row g-4 justify-content-center">
                {statsData.map((stat, i) => (
                    <div key={i} className="col-md-3 col-6">
                        <div className="card text-center border-0 shadow-sm py-4 rounded-4 h-100 stat-card">
                            <h2 className="fw-bold text-success mb-1">{stat.value}</h2>
                            <p className="text-muted small mb-0 fw-semibold">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;