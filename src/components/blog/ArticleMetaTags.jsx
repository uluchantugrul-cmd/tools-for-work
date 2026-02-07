import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Code, Globe, ArrowRight } from 'lucide-react';

const ArticleMetaTags = ({ onBack, onNavigateTool }) => {
    return (
        <article className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Guides
            </button>

            <header style={{ marginBottom: '40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '100px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
                    <Search size={14} /> SEO & Engineering
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2, color: 'white' }}>
                    The 2026 Guide to Perfect SEO Meta Tags
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    Meta tags are still the backbone of sharing on the web. Here is the definitive checklist for getting your links clicked on Google, Slack, and X.
                </p>
                <div style={{ display: 'flex', gap: '24px', marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>By <strong>Tools for Work Team</strong></span>
                    <span>•</span>
                    <span>4 min read</span>
                </div>
            </header>

            <div className="article-content" style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p style={{ marginBottom: '24px' }}>
                    You spent weeks building the feature. You launched it. You pasted the link in Slack... and it looked like a broken URL. No image. No description. Just a cold, blue link.
                </p>
                <p style={{ marginBottom: '24px' }}>
                    In 2026, the "Unfurling" of a link—how it expands into a card on social platforms—is your first impression. If you get it wrong, your CTR (Click Through Rate) drops by up to 60%.
                </p>

                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginTop: '40px', marginBottom: '20px' }}>The 3 Essential Layers</h2>
                <p style={{ marginBottom: '24px' }}>
                    A modern website needs three distinct sets of meta tags to function correctly across the web ecosystem.
                </p>

                <h3 style={{ fontSize: '1.4rem', color: 'white', marginTop: '32px', marginBottom: '16px' }}>1. The Basic HTML Tags</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                    These are for Google Search results and browser tabs.
                </p>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '24px' }}>
                    &lt;title&gt;Page Title | Brand&lt;/title&gt;<br />
                    &lt;meta name="description" content="160 characters summary..."&gt;
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'white', marginTop: '32px', marginBottom: '16px' }}>2. Open Graph (OG)</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                    Created by Facebook, now the standard for LinkedIn, Slack, Discord, and iMessage.
                </p>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '24px' }}>
                    &lt;meta property="og:image" content="https://..."&gt;<br />
                    &lt;meta property="og:title" content="..."&gt;
                </div>

                <div
                    onClick={() => onNavigateTool('meta-tags')}
                    className="glass-panel"
                    style={{ cursor: 'pointer', padding: '32px', textAlign: 'center', marginBottom: '40px', border: '1px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)' }}
                >
                    <Code size={40} color="#c084fc" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '8px', fontWeight: 700 }}>Don't Write This Manually</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Use our visual generator to preview exactly how your link will look on Google and X before you deploy.
                    </p>
                    <button className="button-primary" style={{ margin: '0 auto' }}>
                        Open Meta Tag Generator <ArrowRight size={18} />
                    </button>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'white', marginTop: '32px', marginBottom: '16px' }}>3. Twitter Cards</h3>
                <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                    X (Twitter) has its own specific requirements for large images.
                </p>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '24px' }}>
                    &lt;meta name="twitter:card" content="summary_large_image"&gt;
                </div>

                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginTop: '40px', marginBottom: '20px' }}>Best Practices for 2026</h2>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px' }}>
                    <li style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                        <div style={{ color: '#10b981' }}>✓</div>
                        <div><strong>Title Length:</strong> Keep it under 60 characters to avoid truncation in SERPs.</div>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                        <div style={{ color: '#10b981' }}>✓</div>
                        <div><strong>Image Size:</strong> Use 1200x630px for the best quality on high-DPI screens.</div>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                        <div style={{ color: '#10b981' }}>✓</div>
                        <div><strong>Description:</strong> Focus on the "click". Why should the user open this link?</div>
                    </li>
                </ul>

                <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '40px 0' }} />

                <div style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>Fix your tags now</h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <button onClick={() => onNavigateTool('meta-tags')} className="button-primary">Launch Generator</button>
                        <button onClick={() => onNavigateTool('forge')} className="button-secondary">Other Dev Tools</button>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default ArticleMetaTags;
