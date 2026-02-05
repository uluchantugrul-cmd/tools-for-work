import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowLeft, Copy, Check, Trash2, Code, ShieldCheck, Hash, Link as LinkIcon, FileJson, HelpCircle } from 'lucide-react';

const DevToolkit = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('json');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const tabs = [
        { id: 'json', name: 'JSON Prettify', icon: <FileJson size={18} /> },
        { id: 'base64', name: 'Base64', icon: <Code size={18} /> },
        { id: 'hash', name: 'SHA-256', icon: <Hash size={18} /> },
        { id: 'url', name: 'URL Encoder', icon: <LinkIcon size={18} /> }
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const process = (val, mode = activeTab) => {
        setInput(val);
        setError(null);
        if (!val) {
            setOutput('');
            return;
        }

        try {
            switch (mode) {
                case 'json':
                    const parsed = JSON.parse(val);
                    setOutput(JSON.stringify(parsed, null, 4));
                    break;
                case 'base64':
                    try {
                        // Check if it might be encoded by trying to decode
                        const decoded = atob(val);
                        // If we are here, it was successfully decoded, but user might want to encode instead.
                        // For simplicity, we provide two buttons or a clearer logic.
                        // Let's default to auto-detect or just provide "Encoded" preview.
                        setOutput(btoa(val));
                    } catch {
                        setOutput(btoa(val));
                    }
                    break;
                case 'hash':
                    // We'll use subtle crypto for SHA-256
                    generateHash(val);
                    break;
                case 'url':
                    setOutput(encodeURIComponent(val));
                    break;
                default:
                    break;
            }
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const generateHash = async (text) => {
        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setOutput(hashHex);
    };

    const handleBase64Action = (action) => {
        try {
            if (action === 'encode') setOutput(btoa(input));
            else setOutput(atob(input));
            setError(null);
        } catch (err) {
            setError("Invalid input for this action.");
        }
    };

    const handleUrlAction = (action) => {
        try {
            if (action === 'encode') setOutput(encodeURIComponent(input));
            else setOutput(decodeURIComponent(input));
            setError(null);
        } catch (err) {
            setError("Invalid input for this action.");
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge Kit</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Essential developer utilities for everyday engineering.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '32px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1px', overflowX: 'auto' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setInput(''); setOutput(''); setError(null); }}
                            style={{
                                padding: '12px 24px',
                                background: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: '0.2s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '1px' }}>INPUT</span>
                        <button onClick={() => { setInput(''); setOutput(''); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Trash2 size={14} /> Clear
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => process(e.target.value)}
                        placeholder={`Paste your ${tabs.find(t => t.id === activeTab).name} here...`}
                        style={{ height: '400px', width: '100%', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '24px', color: 'white', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '1px' }}>OUTPUT</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {activeTab === 'base64' && (
                                <>
                                    <button onClick={() => handleBase64Action('encode')} className="button-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Encode</button>
                                    <button onClick={() => handleBase64Action('decode')} className="button-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Decode</button>
                                </>
                            )}
                            {activeTab === 'url' && (
                                <>
                                    <button onClick={() => handleUrlAction('encode')} className="button-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Encode</button>
                                    <button onClick={() => handleUrlAction('decode')} className="button-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Decode</button>
                                </>
                            )}
                            <button onClick={handleCopy} className="button-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem', marginLeft: '8px' }}>
                                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Result will appear here..."
                            style={{ height: '400px', width: '100%', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '24px', color: '#22d3ee', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                        />
                        {error && (
                            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', padding: '8px 12px', color: '#f87171', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
                        <ShieldCheck size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Security & Privacy</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8 }}>
                    <strong>Forge Kit</strong> operates entirely on the client side. Whether you are hashing sensitive passwords or decoding JSON, your data is never transmitted across the network.
                    We use the browser's built-in <code>SubtleCrypto</code> API for high-performance, secure hashing operations.
                </p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', color: 'white' }}>Offline Supported</div>
                    <div style={{ padding: '8px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', color: 'white' }}>Zero Server Latency</div>
                </div>
            </div>
        </div>
    );
};

const AlertCircle = ({ size, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

export default DevToolkit;
