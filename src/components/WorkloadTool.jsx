import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowLeft, Upload, FileDown, Calendar, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { format, differenceInDays, addDays, startOfDay } from 'date-fns';
import { robustParseDate, checkOverlap } from '../utils/helpers';

const WorkloadTool = ({ onBack }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'array' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const rawData = XLSX.utils.sheet_to_json(ws);

                if (rawData.length === 0) throw new Error("The Excel file is empty.");

                const processed = rawData.map((row, index) => {
                    const start = robustParseDate(row['Start Date'] || row['start']);
                    const end = robustParseDate(row['End Date'] || row['end']);
                    const assignee = (row['Assignee'] || row['Owner'] || row['Person'] || 'Unassigned').toString();

                    if (!start || !end) throw new Error(`Invalid dates at row ${index + 2}`);

                    return {
                        id: `work-${index}`,
                        task: (row['Task'] || `Task ${index + 1}`).toString(),
                        assignee,
                        start,
                        end,
                        color: row['Color'] || '#3b82f6'
                    };
                });

                const groups = {};
                processed.forEach(task => {
                    if (!groups[task.assignee]) groups[task.assignee] = [];
                    groups[task.assignee].push(task);
                });

                setData(Object.keys(groups).map(name => ({
                    name,
                    tasks: groups[name]
                })));
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadSample = () => {
        const sample = [
            { Task: 'Frontend Dev', 'Start Date': '2025-04-01', 'End Date': '2025-04-10', Assignee: 'Alex' },
            { Task: 'API Integration', 'Start Date': '2025-04-05', 'End Date': '2025-04-15', Assignee: 'Alex' },
            { Task: 'Database Design', 'Start Date': '2025-04-02', 'End Date': '2025-04-08', Assignee: 'Sarah' },
            { Task: 'Security Audit', 'Start Date': '2025-04-12', 'End Date': '2025-04-20', Assignee: 'Sarah' },
        ];
        const ws = XLSX.utils.json_to_sheet(sample);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Resources");
        XLSX.writeFile(wb, "Resource_Planner_Template.xlsx");
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Workload Pro</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Analyze resource allocation and prevent over-capacity burnout.</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <button className="button-primary" style={{ background: 'var(--accent-secondary)' }} onClick={() => fileInputRef.current.click()} disabled={isLoading}>
                            <Upload size={18} /> Upload Excel
                        </button>
                        <button className="button-secondary" onClick={downloadSample}><FileDown size={18} /> Sample</button>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx, .xls" style={{ display: 'none' }} />
                {error && <div style={{ color: '#f87171', marginTop: '16px', fontSize: '0.9rem' }}>{error}</div>}
            </div>

            <AnimatePresence>
                {data && (
                    <div style={{ overflowX: 'auto', border: '1px solid var(--glass-border)', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.4)' }}>
                        <WorkloadRenderer resourceData={data} />
                    </div>
                )}
            </AnimatePresence>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <HelpCircle size={24} className="text-purple-400" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>How Workload Pro Works</h3>
                </div>
                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>1. Assignee Detection</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We use the <strong>Assignee</strong> column to group tasks by person.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>2. Collision Alerts</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>If a person has overlapping tasks, the bars will highlight red to warn of over-allocation.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>3. Secure Local Viz</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your team data is never uploaded. Visualization happens 100% on your device.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkloadRenderer = ({ resourceData }) => {
    const allTasks = resourceData.flatMap(r => r.tasks);
    const minDate = startOfDay(new Date(Math.min(...allTasks.map(t => t.start))));
    const maxDate = startOfDay(new Date(Math.max(...allTasks.map(t => t.end))));
    const chartStart = addDays(minDate, -5);
    const chartEnd = addDays(maxDate, 10);
    const totalDays = differenceInDays(chartEnd, chartStart) + 1;

    const dayWidth = 40;
    const chartWidth = totalDays * dayWidth;
    const sidebarWidth = 200;

    return (
        <div style={{ width: chartWidth + sidebarWidth }}>
            <div style={{ display: 'flex', height: '40px', background: '#1e293b', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ width: sidebarWidth, borderRight: '2px solid var(--accent-secondary)', padding: '0 16px', lineHeight: '40px', fontSize: '0.75rem', fontWeight: 800 }}>RESOURCE</div>
                <div style={{ display: 'flex' }}>
                    {Array.from({ length: totalDays }).map((_, i) => (
                        <div key={i} style={{ width: dayWidth, textAlign: 'center', lineHeight: '40px', fontSize: '0.65rem', color: 'var(--text-muted)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                            {format(addDays(chartStart, i), 'd')}
                        </div>
                    ))}
                </div>
            </div>

            {resourceData.map((resource, idx) => (
                <div key={idx} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', minHeight: '80px' }}>
                    <div style={{ width: sidebarWidth, position: 'sticky', left: 0, background: '#0f172a', borderRight: '2px solid var(--accent-secondary)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 5 }}>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>{resource.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{resource.tasks.length} tasks</span>
                    </div>
                    <div style={{ flexGrow: 1, position: 'relative', height: '100%' }}>
                        {resource.tasks.map((task, tidx) => {
                            const left = differenceInDays(task.start, chartStart) * dayWidth;
                            const width = (differenceInDays(task.end, task.start) + 1) * dayWidth;

                            const hasCollision = resource.tasks.some(other =>
                                other.id !== task.id &&
                                checkOverlap(task.start, task.end, other.start, other.end)
                            );

                            return (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        position: 'absolute',
                                        top: `${10 + (tidx * 30)}px`,
                                        left: `${left}px`,
                                        width: `${width}px`,
                                        height: '24px',
                                        background: hasCollision ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                                        border: `1px solid ${hasCollision ? '#ef4444' : 'var(--accent-secondary)'}`,
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 8px',
                                        fontSize: '0.7rem',
                                        color: hasCollision ? '#f87171' : 'white',
                                        whiteSpace: 'nowrap',
                                        zIndex: hasCollision ? 2 : 1,
                                        boxShadow: hasCollision ? '0 0 10px rgba(239, 68, 68, 0.1)' : 'none'
                                    }}
                                >
                                    {hasCollision && <AlertTriangle size={12} style={{ marginRight: '4px' }} />}
                                    {task.task}
                                </motion.div>
                            );
                        })}
                        <div style={{ height: `${20 + (resource.tasks.length * 30)}px` }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkloadTool;
