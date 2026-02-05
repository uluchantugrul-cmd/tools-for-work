import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, ListTodo, BarChart3, ArrowLeft, Plus, Trash2, Save, Coffee } from 'lucide-react';

const PomodoroTool = ({ onBack }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro'); // pomodoro, short, long
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tfw_pomodoro_tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('tfw_pomodoro_history');
        return saved ? JSON.parse(saved) : [];
    });

    const timerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tfw_pomodoro_tasks', JSON.stringify(tasks));
        localStorage.setItem('tfw_pomodoro_history', JSON.stringify(history));
    }, [tasks, history]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const handleTimerComplete = () => {
        setIsActive(false);
        const completedTask = tasks.find(t => t.id === activeTaskId);

        const session = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            mode,
            taskId: activeTaskId,
            taskName: completedTask ? completedTask.name : 'No Task',
            duration: mode === 'pomodoro' ? 25 : mode === 'short' ? 5 : 15
        };

        setHistory(prev => [session, ...prev]);

        if (activeTaskId && mode === 'pomodoro') {
            setTasks(prev => prev.map(t =>
                t.id === activeTaskId ? { ...t, completedPomos: t.completedPomos + 1 } : t
            ));
        }

        // Notification logic here if needed
        alert(`${mode.toUpperCase()} session complete!`);
        resetTimer(mode);
    };

    const resetTimer = (newMode = mode) => {
        setIsActive(false);
        setMode(newMode);
        if (newMode === 'pomodoro') setTimeLeft(25 * 60);
        else if (newMode === 'short') setTimeLeft(5 * 60);
        else setTimeLeft(15 * 60);
    };

    const toggleTimer = () => setIsActive(!isActive);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const addTask = () => {
        if (!newTaskName.trim()) return;
        const newTask = {
            id: Date.now(),
            name: newTaskName,
            completedPomos: 0,
            createdAt: new Date().toISOString()
        };
        setTasks(prev => [...prev, newTask]);
        setNewTaskName('');
        if (!activeTaskId) setActiveTaskId(newTask.id);
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
        if (activeTaskId === id) setActiveTaskId(null);
    };

    const getDailyStats = () => {
        const today = new Date().toISOString().split('T')[0];
        const todaySessions = history.filter(s => s.timestamp.startsWith(today) && s.mode === 'pomodoro');

        const report = {};
        todaySessions.forEach(s => {
            report[s.taskId] = (report[s.taskId] || 0) + 1;
        });

        return Object.entries(report).map(([id, count]) => {
            const task = tasks.find(t => t.id.toString() === id) || { name: 'Deleted Task' };
            return { name: task.name, count };
        });
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }} className="responsive-grid">
                {/* Left Side: Timer and Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: mode === 'pomodoro' ? 'var(--accent-primary)' : '#10b981', opacity: 0.5 }} />

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
                            <button onClick={() => resetTimer('pomodoro')} className={mode === 'pomodoro' ? 'button-primary' : 'button-secondary'} style={{ padding: '8px 20px' }}>Pomodoro</button>
                            <button onClick={() => resetTimer('short')} className={mode === 'short' ? 'button-primary' : 'button-secondary'} style={{ padding: '8px 20px' }}>Short Break</button>
                            <button onClick={() => resetTimer('long')} className={mode === 'long' ? 'button-primary' : 'button-secondary'} style={{ padding: '8px 20px' }}>Long Break</button>
                        </div>

                        <h1 style={{ fontSize: '120px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '-5px', marginBottom: '40px', color: 'white' }}>
                            {formatTime(timeLeft)}
                        </h1>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                            <button onClick={toggleTimer} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', border: 'none', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
                                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
                            </button>
                            <button onClick={() => resetTimer(mode)} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <RotateCcw size={32} />
                            </button>
                        </div>

                        <div style={{ marginTop: '40px' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Currently Focusing on:</span>
                            <h3 style={{ fontSize: '1.5rem', marginTop: '8px', color: 'var(--accent-primary)' }}>
                                {tasks.find(t => t.id === activeTaskId)?.name || 'Select or create a task below'}
                            </h3>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BarChart3 size={24} className="text-purple-400" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Daily Report</h2>
                            </div>
                            {getDailyStats().length > 0 && (
                                <button
                                    onClick={() => {
                                        const csvContent = "data:text/csv;charset=utf-8,"
                                            + "Task,Pomodoros,Total Minutes\n"
                                            + getDailyStats().map(s => `${s.name},${s.count},${s.count * 25}`).join("\n");
                                        const encodedUri = encodeURI(csvContent);
                                        const link = document.createElement("a");
                                        link.setAttribute("href", encodedUri);
                                        link.setAttribute("download", `Productivity_Report_${new Date().toISOString().split('T')[0]}.csv`);
                                        document.body.appendChild(link);
                                        link.click();
                                    }}
                                    className="button-secondary"
                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                >
                                    Export CSV
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            {getDailyStats().length > 0 ? getDailyStats().map((stat, i) => (
                                <div key={i} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>{stat.name}</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.count} Pomos</span>
                                    <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#10b981' }}>{stat.count * 25} Minutes</div>
                                </div>
                            )) : (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No sessions recorded today yet. Stay focused!</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Task List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-panel" style={{ padding: '32px', height: 'fit-content' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <ListTodo size={24} className="text-blue-400" />
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Focus List</h2>
                        </div>

                        <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <input
                                type="text"
                                placeholder="Add a focus goal..."
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '12px 48px 12px 16px', color: 'white', outline: 'none' }}
                            />
                            <button onClick={addTask} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'var(--accent-primary)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                                <Plus size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    onClick={() => setActiveTaskId(task.id)}
                                    style={{
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: activeTaskId === task.id ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                                        border: activeTaskId === task.id ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: '0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: 600, color: activeTaskId === task.id ? 'white' : 'var(--text-muted)' }}>{task.name}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{task.completedPomos} pomodoros completed</span>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} style={{ background: 'transparent', border: 'none', color: '#f87171', opacity: 0.6, cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <Coffee size={20} className="text-orange-400" />
                            <h4 style={{ fontWeight: 700 }}>Pro Tip</h4>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            The primary rule is: if you get distracted, the pomodoro is void. Reset and start over for true deep and focused work.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTool;
