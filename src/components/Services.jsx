import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = ({ onBack }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        service: 'Custom Development'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Home
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>

                {/* Left Side: Pitch */}
                <div>
                    <span style={{ padding: '6px 12px', borderRadius: '100px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Work With Us</span>
                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 800, marginTop: '24px', marginBottom: '24px', lineHeight: 1.1 }}>
                        Let's build something <span className="text-gradient">extraordinary.</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '40px' }}>
                        We help ambitious teams build high-performance web applications, internal tools, and automation systems. From concept to code, we deliver pixel-perfect quality.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="service-card">
                            <h3>Custom Web Development</h3>
                            <p>React, Next.js, and Node.js applications built for scale and speed.</p>
                        </div>
                        <div className="service-card">
                            <h3>Internal Tooling</h3>
                            <p>Streamline your operations with custom dashboards, CRMs, and admin panels.</p>
                        </div>
                        <div className="service-card">
                            <h3>UI/UX Design</h3>
                            <p>World-class interfaces that are intuitive, accessible, and beautiful.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div>
                    <div className="glass-panel" style={{ padding: '40px' }}>
                        {!submitted ? (
                            <form onSubmit={handleSubmit}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', fontWeight: 700 }}>Contact Us</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fill out the form below and we'll get back to you within 24 hours.</p>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder="John Doe"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="input-field"
                                        placeholder="john@example.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Service Interest</label>
                                    <select
                                        className="input-field"
                                        value={formState.service}
                                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                                    >
                                        <option>Custom Development</option>
                                        <option>Internal Tooling</option>
                                        <option>UI/UX Design</option>
                                        <option>Consultancy</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '32px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Project Details</label>
                                    <textarea
                                        required
                                        className="input-field"
                                        rows="4"
                                        placeholder="Tell us about your project..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="button-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: '80px', height: '80px', background: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white' }}>
                                    <Check size={40} />
                                </div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. We will be in touch shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="button-secondary" style={{ marginTop: '32px' }}>
                                    Send Another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .text-gradient {
                    background: linear-gradient(to right, #60a5fa, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .service-card {
                    padding: 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    transition: transform 0.2s;
                }
                .service-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255,255,255,0.05);
                }
                .service-card h3 {
                    font-size: 1.2rem;
                    margin-bottom: 8px;
                    color: white;
                }
                .service-card p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    margin: 0;
                }
                .input-field {
                    width: 100%;
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 16px;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .input-field:focus {
                    border-color: var(--accent-primary);
                }
            `}} />
        </div>
    );
};

export default Services;
