import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, ArrowLeft } from 'lucide-react';

const Legal = ({ type, onBack }) => {
    const renderContent = () => {
        if (type === 'privacy') {
            return (
                <div className="legal-content">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: February 5, 2025</p>

                    <h2>1. Our Privacy Commitment</h2>
                    <p>At Tools for Work, we believe privacy is a fundamental human right. Unlike most web-based tools, we process your data locally in your browser. This means your files, data, and images never leave your computer and are never uploaded to our servers.</p>

                    <h2>2. Information We DO NOT Collect</h2>
                    <p>We do not collect or store your personal documents, Excel files, converted JSON/CSV data, or images. All transformations and renderings are performed client-side using JavaScript.</p>

                    <h2>3. Cookies and Analytics</h2>
                    <p>We use minimal cookies for site performance and Google AdSense to sustain the platform. These cookies help us understand site usage and provide relevant advertising without compromising your personal data files.</p>

                    <h2>4. Third-Party Service Providers</h2>
                    <p>We use Google AdSense to serve ads. Google may use cookies to serve ads based on a user's prior visits to our website. Users may opt out of personalized advertising by visiting Google Ad Settings.</p>
                </div>
            );
        }

        return (
            <div className="legal-content">
                <h1>Terms of Service</h1>
                <p>Last updated: February 5, 2025</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing Tools for Work, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                <h2>2. Use License</h2>
                <p>Permission is granted to use these tools for personal or commercial productivity. You may not attempt to decompile or reverse engineer any software contained on the website.</p>

                <h2>3. Disclaimer</h2>
                <p>The materials on Tools for Work are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability.</p>

                <h2>4. Data Responsibility</h2>
                <p>Since all processing is local, the user is solely responsible for the safety and backup of their own data. We are not liable for any data loss occurring during local browser sessions.</p>
            </div>
        );
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: '60px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                    <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px' }}>
                        {type === 'privacy' ? <Shield size={32} /> : <FileText size={32} />}
                    </div>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Legal;
