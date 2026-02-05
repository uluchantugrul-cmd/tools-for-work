import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { LayoutGrid, ArrowLeft, Plus, Trash2, Download, HelpCircle, Save, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

const StrategyMatrix = ({ onBack }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tfw_strategy_tasks');
        return saved ? JSON.parse(saved) : {
            urgent_important: [{ id: '1', text: 'Critical Project Deadline' }],
            not_urgent_important: [{ id: '2', text: 'Strategic Planning' }],
            urgent_not_important: [{ id: '3', text: 'Respond to Emails' }],
            not_urgent_not_important: [{ id: '4', text: 'Social Media Browsing' }]
        };
    });

    const [input, setInput] = useState('');
    const [activeQuadrant, setActiveQuadrant] = useState('urgent_important');

    useEffect(() => {
        localStorage.setItem('tfw_strategy_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!input.trim()) return;
        const newTask = { id: Date.now().toString(), text: input };
        setTasks(prev => ({
            ...prev,
            [activeQuadrant]: [...prev[activeQuadrant], newTask]
        }));
        setInput('');
    };

    const removeTask = (quadrant, id) => {
        setTasks(prev => ({
            ...prev,
            [quadrant]: prev[quadrant].filter(t => t.id !== id)
        }));
    };

    const quadrants = [
        { id: 'urgent_important', title: 'Do Now', subtitle: 'Urgent & Important', color: '#ef4444', icon: <AlertCircle size={18} /> },
        { id: 'not_urgent_important', title: 'Schedule', subtitle: 'Important, Not Urgent', color: '#3b82f6', icon: <Star size={18} /> },
        { id: 'urgent_not_important', title: 'Delegate', subtitle: 'Urgent, Not Important', color: '#f59e0b', icon: <Plus size={18} /> },
        { id: 'not_urgent_not_important', title: 'Eliminate', subtitle: 'Not Urgent or Important', color: '#94a3b8', icon: <Trash2 size={18} /> }
    ];

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Strategy Matrix Pro</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Prioritize your tasks using the Eisenhower Matrix methodology.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '16px', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '500px' }}>
                        <select
                            value={activeQuadrant}
                            onChange={(e) => setActiveQuadrant(e.target.value)}
                            style={{ background: 'transparent', color: 'white', border: 'none', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                        >
                            {quadrants.map(q => <option key={q.id} value={q.id} style={{ background: '#1e293b' }}>{q.title}</option>)}
                        </select>
                        <input
                            type="text"
                            className="qr-field"
                            placeholder="Type a task and press Enter..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            style={{ flexGrow: 1, border: 'none', background: 'transparent', color: 'white', fontSize: '1rem' }}
                        />
                        <button className="button-primary" onClick={addTask} style={{ padding: '8px 16px', minHeight: '40px' }}><Plus size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {quadrants.map(q => (
                    <div key={q.id} className="glass-panel" style={{ padding: '32px', minHeight: '350px', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${q.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: q.color }}>{q.icon}</span>
                                    {q.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{q.subtitle}</p>
                            </div>
                            <div style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', color: q.color }}>
                                {tasks[q.id].length} Items
                            </div>
                        </div>

                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <AnimatePresence mode="popLayout">
                                {tasks[q.id].map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        style={{
                                            padding: '16px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '12px',
                                            border: '1px solid var(--glass-border)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            group: 'true'
                                        }}
                                    >
                                        <span style={{ color: 'white' }}>{task.text}</span>
                                        <button
                                            onClick={() => removeTask(q.id, task.id)}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.6 }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {tasks[q.id].length === 0 && (
                                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                                    No tasks prioritized here.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* How to Use Section */}
            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <HelpCircle size={24} className="text-blue-400" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mastering the Priority Matrix</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    <div>
                        <h4 style={{ color: '#ef4444', marginBottom: '12px' }}>1. Do (Urgent & Important)</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Tasks that need immediate attention and have high value. Do these first.</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#3b82f6', marginBottom: '12px' }}>2. Schedule (Important)</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>High-value tasks without an immediate deadline. Essential for long-term success.</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#f59e0b', marginBottom: '12px' }}>3. Delegate (Urgent)</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Tasks that need to be done but don't require your specific expertise.</p>
                    </div>
                </div>
                <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px dashed rgba(59, 130, 246, 0.2)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <strong>Privacy First:</strong> Your priority lists are saved in your browser's Local Storage. We never see your tasks.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .qr-field:focus { outline: none; }
                @media (max-width: 768px) {
                    .responsive-grid { grid-template-columns: 1fr !important; }
                }
            `}} />
        </div>
    );
};

export default StrategyMatrix;
