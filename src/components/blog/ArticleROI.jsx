import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const ArticleROI = ({ onBack, onNavigateTool }) => {
    return (
        <article className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Guides
            </button>

            <header style={{ marginBottom: '40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '100px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
                    <TrendingUp size={14} /> Productivity & Business
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2, color: 'white' }}>
                    Stop Wasting Time: The True Cost of Manual Project Management
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    In 2026, manual tracking isn't just slow—it's expensive. Here's how to quantify the drain on your resources and why automation is the only way forward.
                </p>
                <div style={{ display: 'flex', gap: '24px', marginTop: '24px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>By <strong>Tools for Work Team</strong></span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>
            </header>

            <div style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent-primary)', padding: '24px', marginBottom: '40px', borderRadius: '0 12px 12px 0' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '8px', fontWeight: 700 }}>Key Takeaway</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    A team of 5 people wasting just 3 hours a week on manual tasks costs a company over <strong>$39,000 per year</strong>. Small inefficiencies compound into massive losses.
                </p>
            </div>

            <div className="article-content" style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p style={{ marginBottom: '24px' }}>
                    We've all been there. The "quick" team update that turns into a 45-minute syncing session. The spreadsheet that breaks every time someone adds a row. The manual copy-pasting of tasks from email to Trello.
                </p>
                <p style={{ marginBottom: '24px' }}>
                    These moments feel insignificant in isolation. "It's just 10 minutes," we say. But when you multiply that by every member of your team, every day of the week, the numbers become terrifying.
                </p>

                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginTop: '40px', marginBottom: '20px' }}>The Math Doesn't Lie</h2>
                <p style={{ marginBottom: '24px' }}>
                    Let's look at a conservative scenario. You have a small team of 5 developers or designers. Their average hourly rate constitutes a cost of roughly $50/hour (salary + overhead).
                </p>
                <p style={{ marginBottom: '24px' }}>
                    If each person spends just <strong>30 minutes a day</strong> on "work about work"—updating statuses, searching for files, or manual data entry—that's 2.5 hours per week, per person.
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '24px', color: 'var(--text-muted)' }}>
                    <li style={{ marginBottom: '8px' }}>5 people × 2.5 hours = 12.5 wasted hours/week</li>
                    <li style={{ marginBottom: '8px' }}>12.5 hours × $50 = $625 wasted/week</li>
                    <li style={{ marginBottom: '8px' }}>$625 × 52 weeks = <strong>$32,500 wasted/year</strong></li>
                </ul>

                <p style={{ marginBottom: '32px' }}>
                    That's the price of a brand new car, or a significant marketing budget, evaporated into thin air.
                </p>

                <div
                    onClick={() => onNavigateTool('roi')}
                    className="glass-panel"
                    style={{ cursor: 'pointer', padding: '32px', textAlign: 'center', marginBottom: '40px', border: '1px solid var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)' }}
                >
                    <DollarSign size={40} color="#60a5fa" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '8px', fontWeight: 700 }}>Calculate Your Team's Waste</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Don't guess. Use our free calculator to see exactly how much your current process is costing you.
                    </p>
                    <button className="button-primary" style={{ margin: '0 auto' }}>
                        Run ROI Calculator <ArrowRight size={18} />
                    </button>
                </div>

                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', marginTop: '40px', marginBottom: '20px' }}>The Solution: Radical Simplification</h2>
                <p style={{ marginBottom: '24px' }}>
                    The answer isn't necessarily more complex software. Often, enterprise tools like Jira or Salesforce add <em>more</em> friction because they require endless configuration.
                </p>
                <p style={{ marginBottom: '24px' }}>
                    The modern high-performance team needs tools that are:
                </p>
                <ol style={{ listStyle: 'decimal', paddingLeft: '24px', marginBottom: '24px', color: 'var(--text-muted)' }}>
                    <li style={{ marginBottom: '12px' }}><strong>Instant:</strong> No loading spinners or server lag.</li>
                    <li style={{ marginBottom: '12px' }}><strong>Focused:</strong> Do one thing extremely well.</li>
                    <li style={{ marginBottom: '12px' }}><strong>Local-First:</strong> Data stays on your machine, ensuring privacy and speed.</li>
                </ol>

                <p style={{ marginBottom: '24px' }}>
                    This is why we built the <span onClick={() => onNavigateTool('gantt')} style={{ color: '#60a5fa', cursor: 'pointer', textDecoration: 'underline' }}>Gantt Chart Pro</span> and <span onClick={() => onNavigateTool('workload')} style={{ color: '#a855f7', cursor: 'pointer', textDecoration: 'underline' }}>Workload Planner</span>. They are designed to let you visualize a project in 60 seconds, export it, and get back to work.
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '40px 0' }} />

                <div style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>Ready to optimize?</h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <button onClick={() => onNavigateTool('roi')} className="button-primary">Check ROI</button>
                        <button onClick={() => onNavigateTool('gantt')} className="button-secondary">Try Gantt Tool</button>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default ArticleROI;
