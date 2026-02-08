import React, { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Briefcase, Calendar, Clock } from 'lucide-react';

const SalaryCalculator = ({ onBack }) => {
    const [amount, setAmount] = useState(100000);
    const [period, setPeriod] = useState('year'); // year, month, hour
    const [hoursPerWeek, setHoursPerWeek] = useState(40);

    // Calculated values
    const [annual, setAnnual] = useState(0);

    useEffect(() => {
        let yearly = 0;
        const amt = parseFloat(amount) || 0;

        switch (period) {
            case 'year':
                yearly = amt;
                break;
            case 'month':
                yearly = amt * 12;
                break;
            case 'hour':
                yearly = amt * hoursPerWeek * 52;
                break;
            default:
                yearly = amt;
        }
        setAnnual(yearly);
    }, [amount, period, hoursPerWeek]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const breakdowns = [
        { label: 'Annually', value: annual, icon: Calendar },
        { label: 'Monthly', value: annual / 12, icon: Calendar },
        { label: 'Bi-Weekly', value: annual / 26, icon: Calendar },
        { label: 'Weekly', value: annual / 52, icon: Calendar },
        { label: 'Daily', value: annual / 260, icon: Calendar }, // Assuming 5 days a week * 52 weeks
        { label: 'Hourly', value: annual / (hoursPerWeek * 52), icon: Clock },
    ];

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Salary & Rate Converter</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Visualize your income across different timeframes.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>

                    {/* Input Section */}
                    <div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Amount</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        padding: '16px 16px 16px 44px',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Per</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {['year', 'month', 'hour'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPeriod(p)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: period === p ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize',
                                            fontWeight: 600,
                                            transition: '0.2s'
                                        }}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Hours per Week</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="number"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'rgba(15, 23, 42, 0.4)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        padding: '16px 16px 16px 44px',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                        {breakdowns.map((item, index) => (
                            <div key={item.label} style={{
                                padding: '20px',
                                borderBottom: index !== breakdowns.length - 1 ? '1px solid var(--glass-border)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: index === 0 ? 'var(--accent-primary)' : 'white' }}>
                                    {formatCurrency(item.value)}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SalaryCalculator;
