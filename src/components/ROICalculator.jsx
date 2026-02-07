import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowLeft, DollarSign, Users, Clock, TrendingUp, Save, BarChart } from 'lucide-react';

const ROICalculator = ({ onBack }) => {
    const [teamSize, setTeamSize] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(3);
    const [currency, setCurrency] = useState('$');

    // Calculated values
    const weeklySavings = teamSize * hourlyRate * hoursSavedPerWeek;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = weeklySavings * 52;

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount).replace('$', currency);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ROI Calculator</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            Quantify the value of productivity improvements for your team.
                        </p>
                    </div>
                </div>

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    {/* INPUTS SIDE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}><Calculator size={18} /></div>
                            Input Data
                        </h3>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Team Size (People)</label>
                            <div style={{ position: 'relative' }}>
                                <Users size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="number"
                                    min="1"
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(Number(e.target.value))}
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1.1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Avg. Hourly Rate ({currency})</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="number"
                                    min="1"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1.1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Hours Saved (Per Person/Week)</label>
                            <div style={{ position: 'relative' }}>
                                <Clock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="number"
                                    min="0.5"
                                    step="0.5"
                                    value={hoursSavedPerWeek}
                                    onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1.1rem', outline: 'none' }}
                                />
                                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span style={{ color: '#10b981', fontWeight: 600 }}>Tip:</span> Automating a single daily meeting can save 2.5 hours/week.
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RESULTS SIDE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><TrendingUp size={18} /></div>
                            Projected Savings
                        </h3>

                        <div style={{
                            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(6, 78, 59, 0.2))',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '16px',
                            padding: '32px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            minHeight: '200px'
                        }}>
                            <span style={{ fontSize: '1rem', color: '#6ee7b7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Annual Savings</span>
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={yearlySavings}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'white' }}
                                >
                                    {formatMoney(yearlySavings)}
                                </motion.div>
                            </AnimatePresence>
                            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>Monthly</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{formatMoney(monthlySavings)}</div>
                                </div>
                                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>Weekly</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{formatMoney(weeklySavings)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(255,255,255,0.03)' }}>
                            <h4 style={{ fontSize: '1rem', color: 'white', marginBottom: '16px', fontWeight: 600 }}>Effect on Productivity</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}><Clock size={20} /></div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Hours Reclaimed (Yearly)</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{(teamSize * hoursSavedPerWeek * 52).toLocaleString()} hours</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '12px' }}>
                        <BarChart size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Why track ROI?</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Justify Tooling Costs</h4>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>When premium tools cost $10-20/user/month, showing a $2,000+ monthly savings makes approval easy.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Identify Bottlenecks</h4>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>If your team spends 5 hours/week on manual data entry, that's a signal to automate immediately.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ROICalculator;
