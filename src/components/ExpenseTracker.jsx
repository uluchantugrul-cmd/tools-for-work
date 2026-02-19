import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, DollarSign, TrendingDown, PieChart, Download, Tag, Calendar, Filter } from 'lucide-react';

const CATEGORIES = [
    { name: 'Housing', color: '#3b82f6', emoji: '🏠' },
    { name: 'Food & Dining', color: '#ef4444', emoji: '🍔' },
    { name: 'Transportation', color: '#f59e0b', emoji: '🚗' },
    { name: 'Entertainment', color: '#8b5cf6', emoji: '🎮' },
    { name: 'Healthcare', color: '#10b981', emoji: '💊' },
    { name: 'Shopping', color: '#ec4899', emoji: '🛍️' },
    { name: 'Education', color: '#06b6d4', emoji: '📚' },
    { name: 'Other', color: '#6b7280', emoji: '💡' }
];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const ExpenseTracker = ({ onBack }) => {
    const [expenses, setExpenses] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('expense_tracker_data') || '[]');
        } catch { return []; }
    });
    const [showForm, setShowForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterMonth, setFilterMonth] = useState('');
    const [form, setForm] = useState({ description: '', amount: '', category: 'Other', date: new Date().toISOString().split('T')[0] });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        localStorage.setItem('expense_tracker_data', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = () => {
        if (!form.description.trim()) { setFormError('Description is required.'); return; }
        if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) { setFormError('Enter a valid amount.'); return; }
        setExpenses(prev => [{ ...form, amount: parseFloat(form.amount), id: generateId() }, ...prev]);
        setForm({ description: '', amount: '', category: 'Other', date: new Date().toISOString().split('T')[0] });
        setFormError('');
        setShowForm(false);
    };

    const deleteExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id));

    const filteredExpenses = expenses.filter(e => {
        const matchCat = filterCategory === 'All' || e.category === filterCategory;
        const matchMonth = !filterMonth || e.date.startsWith(filterMonth);
        return matchCat && matchMonth;
    });

    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = CATEGORIES.map(cat => ({
        ...cat,
        total: filteredExpenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0)
    })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

    const exportCSV = () => {
        const rows = [['Date', 'Description', 'Category', 'Amount']];
        filteredExpenses.forEach(e => rows.push([e.date, e.description, e.category, e.amount.toFixed(2)]));
        const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'expenses.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Home
            </button>

            <header style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Expense Tracker
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            Track, categorize, and analyze your spending — 100% local, no account needed.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button onClick={exportCSV} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Download size={16} /> Export CSV
                        </button>
                        <button onClick={() => setShowForm(true)} className="button-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={16} /> Add Expense
                        </button>
                    </div>
                </div>
            </header>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <motion.div whileHover={{ y: -4 }} className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Spent</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>${total.toFixed(2)}</div>
                </motion.div>
                <motion.div whileHover={{ y: -4 }} className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Transactions</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>{filteredExpenses.length}</div>
                </motion.div>
                <motion.div whileHover={{ y: -4 }} className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg per Transaction</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa' }}>${filteredExpenses.length ? (total / filteredExpenses.length).toFixed(2) : '0.00'}</div>
                </motion.div>
                <motion.div whileHover={{ y: -4 }} className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Category</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{categoryTotals[0]?.emoji || '—'} {categoryTotals[0]?.name || '—'}</div>
                </motion.div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
                {/* Category Breakdown */}
                {categoryTotals.length > 0 && (
                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PieChart size={18} style={{ color: '#60a5fa' }} /> Breakdown by Category
                        </h2>
                        {categoryTotals.map(cat => (
                            <div key={cat.name} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>{cat.emoji} {cat.name}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>${cat.total.toFixed(2)}</span>
                                </div>
                                <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${total > 0 ? (cat.total / total) * 100 : 0}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        style={{ height: '100%', borderRadius: '3px', background: cat.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={18} style={{ color: '#60a5fa' }} /> Filters
                    </h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</label>
                        <select
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                        >
                            <option value="All">All Categories</option>
                            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Month</label>
                        <input
                            type="month"
                            value={filterMonth}
                            onChange={e => setFilterMonth(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                        />
                    </div>
                    {(filterCategory !== 'All' || filterMonth) && (
                        <button onClick={() => { setFilterCategory('All'); setFilterMonth(''); }} className="button-secondary" style={{ width: '100%', marginTop: '16px' }}>
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Expense List */}
            <div className="glass-panel" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingDown size={18} style={{ color: '#ef4444' }} /> Expenses ({filteredExpenses.length})
                </h2>
                {filteredExpenses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                        <DollarSign size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                        <p>No expenses yet. Click "Add Expense" to get started.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <AnimatePresence>
                            {filteredExpenses.map(expense => {
                                const cat = CATEGORIES.find(c => c.name === expense.category) || CATEGORIES[CATEGORIES.length - 1];
                                return (
                                    <motion.div
                                        key={expense.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
                                    >
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: cat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                                            {cat.emoji}
                                        </div>
                                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                                            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{expense.description}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>{expense.category} • {expense.date}</div>
                                        </div>
                                        <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>-${expense.amount.toFixed(2)}</div>
                                        <button onClick={() => deleteExpense(expense.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Add Expense Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowForm(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="glass-panel"
                            style={{ padding: '32px', width: '100%', maxWidth: '480px', border: '1px solid var(--glass-border)' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: 'white' }}>Add New Expense</h3>
                            {formError && <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>{formError}</div>}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Description</label>
                                    <input
                                        type="text"
                                        value={form.description}
                                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                        placeholder="e.g. Netflix subscription"
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Amount ($)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.amount}
                                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                        placeholder="0.00"
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Category</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        style={{ width: '100%', padding: '12px', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    >
                                        {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Date</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button onClick={() => { setShowForm(false); setFormError(''); }} className="button-secondary" style={{ flex: 1 }}>Cancel</button>
                                <button onClick={addExpense} className="button-primary" style={{ flex: 1 }}>Add Expense</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExpenseTracker;
