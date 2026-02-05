import React from 'react';
import { ArrowLeft, Mail, Shield, Zap, Globe, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const About = ({ onBack }) => {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Home
            </button>

            <header style={{ marginBottom: '64px', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '24px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Empowering Modern Work
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    We build high-performance, local-first tools that respect your privacy. No servers, no tracking, just pure utility.
                </p>
            </header>

            <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 64px)', marginBottom: '40px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
                        <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#60a5fa' }}>
                            <Zap size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Our Mission</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                        In an era of bloated software and data surveillance, <strong>Tools for Work</strong> stands for a different philosophy. We believe that simple tasks should not require complex logins, slow cloud syncs, or invasitve tracking.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Our suite of tools—from Gantt charts to cryptographic utilities—is engineered to run entirely in your browser. This means your sensitive project data, financial plans, and code snippets never leave your device.
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <Shield size={32} className="text-green-400" style={{ marginBottom: '20px' }} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Privacy First</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        We don't collect cookies, user behavior, or input data. What happens on your screen stays on your screen.
                    </p>
                </div>
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <Globe size={32} className="text-purple-400" style={{ marginBottom: '20px' }} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Always Available</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        Our tools utilize modern Service Workers to function even when you're offline. Work from anywhere, anytime.
                    </p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Get in Touch</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                    Have a feature request, found a bug, or just want to say hi? We'd love to hear from you.
                </p>
                <a href="mailto:uluchantugrul@gmail.com" className="button-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 32px', fontSize: '1.1rem' }}>
                    <Mail size={20} /> uluchantugrul@gmail.com
                </a>
            </div>
        </div>
    );
};

export default About;
