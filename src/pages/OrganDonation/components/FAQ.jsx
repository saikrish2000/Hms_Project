import React from 'react';

const FAQ = () => {
    const faqs = [
        "Who can become an organ donor?",
        "Will my religion allow organ donation?",
        "Can I change my mind after registering?",
        "Will organ donation affect my funeral?"
    ];

    return (
        <section className="py-5">
            <div className="text-center mb-5">
                <span className="badge bg-light text-success rounded-pill px-3 py-2 mb-3">FAQs</span>
                <h2 className="fw-bold">Common Questions</h2>
            </div>
            <div className="mx-auto" style={{ maxWidth: '800px' }}>
                <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden" id="faqAccordion">
                    {faqs.map((question, index) => (
                        <div className="accordion-item border-bottom" key={index}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed py-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                    <span className="text-success me-3">?</span> {question}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body text-muted">
                                    Organ donation is a generous act that can save many lives. Most people can be donors regardless of age or medical history.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;