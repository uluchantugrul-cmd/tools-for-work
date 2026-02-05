import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Globe, Tag, MousePointer2, Megaphone, Type, Link as LinkIcon, RefreshCw } from 'lucide-react';

const UTMTool = ({ onBack }) => {
    const [baseUrl, setBaseUrl] = useState('');
    const [source, setSource] = useState('');
    const [medium, setMedium] = useState('');
    const [campaign, setCampaign] = useState('');
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!baseUrl) {
            setGeneratedUrl('');
            return;
        }

        try {
            const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
            if (source) url.searchParams.set('utm_source', source);
            if (medium) url.searchParams.set('utm_medium', medium);
            if (campaign) url.searchParams.set('utm_campaign', campaign);
            if (term) url.searchParams.set('utm_term', term);
            if (content) url.searchParams.set('utm_content', content);
            setGeneratedUrl(url.toString());
        } catch (e) {
            setGeneratedUrl('Invalid URL format');
        }
    }, [baseUrl, source, medium, campaign, term, content]);

    const handleCopy = () => {
        if (!generatedUrl || generatedUrl === 'Invalid URL format') return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setBaseUrl('');
        setSource('');
        setMedium('');
        setCampaign('');
        setTerm('');
        setContent('');
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UTM Architect</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Create trackable marketing links for your campaigns instantly.</p>
                    </div>
                    <button className="button-secondary" onClick={clearAll} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={18} /> Reset Fields
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="responsive-grid">
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Globe size={20} className="text-blue-400" /> 1. Website Details
                    </h3>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>WEBSITE URL*</label>
                        <input
                            type="text"
                            className="qr-field"
                            placeholder="https://example.com"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: 'white', margin: '32px 0 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Tag size={20} className="text-orange-400" /> 2. Campaign Parameters
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>CAMPAIGN SOURCE*</label>
                            <input
                                type="text"
                                placeholder="google, newsletter"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>CAMPAIGN MEDIUM*</label>
                            <input
                                type="text"
                                placeholder="cpc, banner, email"
                                value={medium}
                                onChange={(e) => setMedium(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>CAMPAIGN NAME*</label>
                        <input
                            type="text"
                            placeholder="summer_sale"
                            value={campaign}
                            onChange={(e) => setCampaign(e.target.value)}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>CAMPAIGN TERM</label>
                            <input
                                type="text"
                                placeholder="running+shoes"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>CAMPAIGN CONTENT</label>
                            <input
                                type="text"
                                placeholder="logolink"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 16px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-panel" style={{ padding: '32px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <LinkIcon size={20} className="text-emerald-400" /> Generated URL
                        </h3>
                        <div style={{ flexGrow: 1, background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', padding: '24px', border: '1px solid var(--glass-border)', wordBreak: 'break-all', fontSize: '0.95rem', color: generatedUrl === 'Invalid URL format' ? '#f87171' : 'white', minHeight: '120px', marginBottom: '24px', fontFamily: 'monospace', lineHeight: 1.6 }}>
                            {generatedUrl || 'Fill in the fields on the left to generate your UTM link...'}
                        </div>
                        <button
                            className="button-primary"
                            onClick={handleCopy}
                            disabled={!generatedUrl || generatedUrl === 'Invalid URL format'}
                            style={{ width: '100%', background: 'var(--gradient-main)', opacity: !generatedUrl || generatedUrl === 'Invalid URL format' ? 0.5 : 1 }}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>

                    <div className="glass-panel" style={{ padding: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px dashed rgba(245, 158, 11, 0.2)' }}>
                        <h4 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Megaphone size={16} className="text-orange-400" /> Marketing Tip
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            Always use lowercase for your UTM parameters to avoid data fragmentation in Google Analytics. For example, use <strong>email</strong> instead of <strong>Email</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '40px', marginTop: '32px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>UTM Parameter Glossary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                    <div>
                        <h5 style={{ color: 'white', marginBottom: '8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Type size={16} className="text-blue-400" /> utm_source</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The referrer: (e.g. google, newsletter, facebook). Identifies which site sent the traffic.</p>
                    </div>
                    <div>
                        <h5 style={{ color: 'white', marginBottom: '8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><MousePointer2 size={16} className="text-purple-400" /> utm_medium</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The marketing medium: (e.g. cpc, banner, email). Identifies the type of traffic.</p>
                    </div>
                    <div>
                        <h5 style={{ color: 'white', marginBottom: '8px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} className="text-orange-400" /> utm_campaign</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The specific product promotion or strategic campaign: (e.g. spring_sale, brand_launch).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UTMTool;
