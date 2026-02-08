import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const PasswordGenerator = ({ onBack }) => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState(0);

    const generatePassword = () => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const nums = '0123456789';
        const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = '';
        if (options.uppercase) chars += upper;
        if (options.lowercase) chars += lower;
        if (options.numbers) chars += nums;
        if (options.symbols) chars += syms;

        if (chars === '') return;

        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generated);
        calculateStrength(generated);
    };

    const calculateStrength = (pass) => {
        let score = 0;
        if (pass.length > 10) score++;
        if (pass.length > 14) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        setStrength(score);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    const getStrengthLabel = () => {
        if (strength < 2) return { text: 'Weak', color: '#ef4444', icon: ShieldAlert };
        if (strength < 4) return { text: 'Medium', color: '#f59e0b', icon: Shield };
        return { text: 'Strong', color: '#10b981', icon: ShieldCheck };
    };

    const strengthInfo = getStrengthLabel();
    const StrengthIcon = strengthInfo.icon;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secure Password Generator</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Generate cryptographically strong passwords locally.
                    </p>
                </div>

                <div style={{ 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '16px', 
                    padding: '32px', 
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap'
                }}>
                    <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '1.5rem', color: strengthInfo.color, wordBreak: 'break-all', fontWeight: 600 }}>
                        {password}
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={generatePassword} className="button-secondary" style={{ padding: '12px', minHeight: 'auto' }}>
                            <RefreshCw size={20} />
                        </button>
                        <button onClick={copyToClipboard} className="button-primary" style={{ padding: '12px 24px', minHeight: 'auto' }}>
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <label style={{ fontWeight: 600 }}>Length: {length}</label>
                        </div>
                        <input 
                            type="range" 
                            min="8" 
                            max="64" 
                            value={length} 
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            style={{ width: '100%', cursor: 'pointer', height: '6px', borderRadius: '4px', background: 'var(--glass-border)' }}
                        />
                        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <StrengthIcon size={24} color={strengthInfo.color} />
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Strength Estimate</div>
                                <div style={{ color: strengthInfo.color, fontWeight: 700 }}>{strengthInfo.text}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {Object.keys(options).map( key => (
                            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', transition: '0.2s' }} className="option-label">
                                <input 
                                    type="checkbox" 
                                    checked={options[key]} 
                                    onChange={() => setOptions({...options, [key]: !options[key]})}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <span style={{ textTransform: 'capitalize' }}>{key}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
             <style dangerouslySetInnerHTML={{
                __html: `
                .option-label:hover { background: rgba(255,255,255,0.06) !important; }
            `}} />
        </div>
    );
};

export default PasswordGenerator;
