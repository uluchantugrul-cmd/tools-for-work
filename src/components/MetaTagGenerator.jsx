import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Globe, Twitter, Facebook, Copy, Check, Eye, Code, Image as ImageIcon } from 'lucide-react';

const MetaTagGenerator = ({ onBack }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        image: '',
        author: ''
    });
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateCode = () => {
        return `<!-- Primary Meta Tags -->
<title>${formData.title || 'Page Title'}</title>
<meta name="title" content="${formData.title || 'Page Title'}">
<meta name="description" content="${formData.description || 'Page description goes here'}">
<meta name="author" content="${formData.author || 'Author Name'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${formData.url || 'https://example.com'}">
<meta property="og:title" content="${formData.title || 'Page Title'}">
<meta property="og:description" content="${formData.description || 'Page description goes here'}">
<meta property="og:image" content="${formData.image || 'https://example.com/image.jpg'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${formData.url || 'https://example.com'}">
<meta property="twitter:title" content="${formData.title || 'Page Title'}">
<meta property="twitter:description" content="${formData.description || 'Page description goes here'}">
<meta property="twitter:image" content="${formData.image || 'https://example.com/image.jpg'}">`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Meta Tag Generator</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Create perfect SEO and Social Media meta tags for your website.
                    </p>
                </div>

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    {/* INPUTS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}><Code size={18} /></div>
                            Content Details
                        </h3>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Page Title (Recommended: 60 chars)</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Best SEO Tools 2026"
                                style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }}
                            />
                            <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '4px', color: formData.title.length > 60 ? '#ef4444' : 'var(--text-muted)' }}>
                                {formData.title.length} / 60
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Description (Recommended: 160 chars)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="A brief summary of your page content..."
                                style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                            />
                            <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '4px', color: formData.description.length > 160 ? '#ef4444' : 'var(--text-muted)' }}>
                                {formData.description.length} / 160
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Page URL</label>
                            <div style={{ position: 'relative' }}>
                                <Globe size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    placeholder="https://example.com/page"
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Image URL (OG Image)</label>
                            <div style={{ position: 'relative' }}>
                                <ImageIcon size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/og-image.jpg"
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* PREVIEWS & CODE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Google Preview */}
                        <div style={{ padding: '20px', background: 'white', borderRadius: '12px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
                                <span style={{ fontSize: '0.9rem', color: '#202124' }}>Google Search Preview</span>
                            </div>
                            <div style={{ fontFamily: 'arial, sans-serif' }}>
                                <div style={{ fontSize: '14px', color: '#202124', marginBottom: '4px' }}>{formData.url || 'https://example.com'}</div>
                                <div style={{ fontSize: '20px', color: '#1a0dab', lineHeight: '1.3', marginBottom: '4px', cursor: 'pointer', textDecoration: 'none' }}>{formData.title || 'Page Title'}</div>
                                <div style={{ fontSize: '14px', color: '#545454', lineHeight: '1.4' }}>
                                    {(formData.description || 'Page description goes here...').substring(0, 160)}
                                </div>
                            </div>
                        </div>

                        {/* Social Preview */}
                        <div style={{ padding: '0', background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                            <div style={{ height: '200px', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                                {formData.image ?
                                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none' }} /> :
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}><ImageIcon /> No Image</div>
                                }
                            </div>
                            <div style={{ padding: '16px', background: '#0f172a' }}>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>EXAMPLE.COM</div>
                                <div style={{ fontSize: '1rem', color: 'white', fontWeight: 700, marginBottom: '4px' }}>{formData.title || 'Page Title'}</div>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{(formData.description || 'Page description...').substring(0, 100)}</div>
                            </div>
                        </div>

                        {/* Code Block */}
                        <div style={{ position: 'relative', marginTop: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>HTML Code</span>
                                <button onClick={handleCopy} className="button-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <textarea
                                readOnly
                                value={generateCode()}
                                style={{ width: '100%', height: '300px', background: '#0d1117', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '16px', color: '#e6edf3', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem', resize: 'none', outline: 'none' }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaTagGenerator;
