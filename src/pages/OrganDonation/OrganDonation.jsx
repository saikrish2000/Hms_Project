import React from 'react';
import HeroSection from './components/HeroSection';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import RegisterForm from './components/RegisterForm';
import FAQ from './components/FAQ';
import './components/OrganDonation.css';

const OrganDonation = () => {
    return (
        <div className="organ-donation-page">
            <HeroSection />
            <Stats />
            <div className="container py-5">
                <HowItWorks />
                <RegisterForm />
                <FAQ />
            </div>
        </div>
    );
};

export default OrganDonation;