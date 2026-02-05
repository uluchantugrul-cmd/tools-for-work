import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileDown, ArrowLeft, Calendar, AlertCircle, ChevronRight, ChevronDown, Check, HelpCircle, Target, Info, Search, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';
import { format, differenceInDays, addDays, startOfDay, isToday, isWithinInterval } from 'date-fns';
import { robustParseDate } from '../utils/helpers';

const GanttTool = ({ onBack }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef(null);

    const toggleGroup = (taskName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [taskName]: !prev[taskName]
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const rawData = XLSX.utils.sheet_to_json(ws);

                if (rawData.length === 0) throw new Error("The Excel file is empty.");

                const processedData = rawData.map((row, index) => {
                    const startDate = robustParseDate(row['Start Date'] || row['start'] || row['Start']);
                    const endDate = robustParseDate(row['End Date'] || row['end'] || row['End']);

                    if (!startDate || !endDate) {
                        throw new Error(`Invalid date format at row ${index + 2}.`);
                    }

                    const taskName = (row['Task'] || row['task'] || row['Name'] || `Task ${index + 1}`).toString();
                    const parentName = (row['Parent'] || row['parent'] || null)?.toString();

                    return {
                        id: `task-${index}-${taskName}`,
                        task: taskName,
                        parent: parentName,
                        start: startDate,
                        end: endDate,
                        progress: parseFloat(row['Progress'] || row['progress'] || 0) * (row['Progress'] > 1 ? 0.01 : 1),
                        color: row['Color'] || ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'][index % 6]
                    };
                });

                const taskMap = {};
                processedData.forEach(task => { taskMap[task.task] = { ...task, children: [] }; });

                const tree = [];
                processedData.forEach(task => {
                    if (task.parent && taskMap[task.parent]) {
                        taskMap[task.parent].children.push(taskMap[task.task]);
                    } else {
                        tree.push(taskMap[task.task]);
                    }
                });

                const flattened = [];
                const flatten = (nodes, depth = 0) => {
                    nodes.forEach(node => {
                        flattened.push({ ...node, depth });
                        if (node.children.length > 0) flatten(node.children, depth + 1);
                    });
                };
                flatten(tree);

                const initialExpanded = {};
                flattened.forEach(t => { if (t.children.length > 0) initialExpanded[t.task] = true; });
                setExpandedGroups(initialExpanded);

                setData(flattened);
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
        const sampleData = [
            { Task: 'Project Kickoff', 'Start Date': '2025-03-01', 'End Date': '2025-03-05', Parent: '', Progress: 1.0 },
            { Task: 'Design Phase', 'Start Date': '2025-03-06', 'End Date': '2025-03-20', Parent: '', Progress: 0.4 },
            { Task: 'UI Design', 'Start Date': '2025-03-06', 'End Date': '2025-03-12', Parent: 'Design Phase', Progress: 0.8 },
            { Task: 'UX Prototyping', 'Start Date': '2025-03-13', 'End Date': '2025-03-20', Parent: 'Design Phase', Progress: 0.2 },
            { Task: 'Development', 'Start Date': '2025-03-21', 'End Date': '2025-04-15', Parent: '', Progress: 0.1 },
        ];
        const ws = XLSX.utils.json_to_sheet(sampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Timeline");
        XLSX.writeFile(wb, "Gantt_Template.xlsx");
    };

    const filteredData = data?.filter(t => t.task.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gantt Pro</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>High-fidelity interactive project timelines.</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        {data && (
                            <div style={{ position: 'relative', marginRight: '8px' }}>
                                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Find task..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '10px 12px 10px 36px', color: 'white', width: '200px', outline: 'none' }}
                                />
                            </div>
                        )}
                        <button className="button-primary" onClick={() => fileInputRef.current.click()} disabled={isLoading}>
                            {isLoading ? '...' : <Upload size={18} />} Upload Excel
                        </button>
                        <button className="button-secondary" onClick={downloadSample}><FileDown size={18} /> Template</button>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx, .xls" style={{ display: 'none' }} />

                {data && (
                    <div style={{ display: 'flex', gap: '24px', marginTop: '32px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px dashed rgba(59, 130, 246, 0.2)' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TASKS</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{data.length}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>COMPLETION</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
                                {Math.round((data.reduce((acc, t) => acc + (t.progress || 0), 0) / data.length) * 100)}%
                            </span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TIMELINE</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>
                                {format(new Date(Math.min(...data.map(t => t.start))), 'MMM dd')} - {format(new Date(Math.max(...data.map(t => t.end))), 'MMM dd')}
                            </span>
                        </div>
                    </div>
                )}

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '24px', color: '#f87171', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} /> {error}
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {data && (
                    <div className="gantt-scroll-outer" style={{ border: '1px solid var(--glass-border)', borderRadius: '24px', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.6)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <GanttRenderer tasks={filteredData} expandedGroups={expandedGroups} toggleGroup={toggleGroup} />
                    </div>
                )}
            </AnimatePresence>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                        <Info size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>UX Guide</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} className="text-blue-400" /> Interaction</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Hover over task bars to see precise date ranges and duration. Click group icons to expand/collapse.</p>
                    </div>
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} className="text-green-400" /> Indicators</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>The vertical red line marks <strong>Today</strong>. Grid lines help align tasks to specific calendar dates.</p>
                    </div>
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Search size={16} className="text-purple-400" /> Smart Search</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Use the search bar to filter tasks instantly without losing your timeline context.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GanttRenderer = ({ tasks, expandedGroups, toggleGroup }) => {
    const [hoveredTask, setHoveredTask] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, task: null });
    const scrollContainerRef = useRef(null);
    const chartAreaRef = useRef(null);

    const isVisible = (task) => {
        if (!task.parent) return true;
        let p = task.parent;
        const processedTasks = tasks;
        while (p) {
            if (expandedGroups[p] === false) return false;
            const parentNode = processedTasks.find(t => t.task === p);
            p = parentNode?.parent;
        }
        return true;
    };

    const visibleTasks = tasks.filter(isVisible);
    const minDate = new Date(Math.min(...tasks.map(t => t.start)));
    const maxDate = new Date(Math.max(...tasks.map(t => t.end)));

    const chartStart = startOfDay(addDays(minDate, -7));
    const chartEnd = startOfDay(addDays(maxDate, 14));

    const totalDays = differenceInDays(chartEnd, chartStart) + 1;
    const dayWidth = 44;
    const rowHeight = 64;
    const chartWidth = totalDays * dayWidth;
    const sidebarWidth = 280;

    const handleTaskBarHover = (e, task) => {
        if (!scrollContainerRef.current) return;

        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const tooltipWidth = 220;

        let x = e.clientX - containerRect.left;
        const minX = 10;
        const maxX = containerRect.width - tooltipWidth - 10;
        const clampedX = Math.max(minX, Math.min(x - tooltipWidth / 2, maxX));

        setHoveredTask(task.id);
        setTooltipPos({
            x: clampedX,
            y: e.clientY - containerRect.top - 70,
            visible: true,
            task: task
        });
    };

    useEffect(() => {
        const today = new Date();
        const diff = differenceInDays(today, chartStart);
        if (diff > 0 && diff < totalDays && scrollContainerRef.current) {
            const scrollPos = (diff * dayWidth) - 200;
            scrollContainerRef.current.scrollLeft = scrollPos;
        }
    }, [tasks.length]);

    return (
        <div
            className="gantt-scroll-container"
            ref={scrollContainerRef}
            style={{
                overflowX: 'auto',
                position: 'relative',
                background: 'transparent'
            }}
        >
            <AnimatePresence>
                {tooltipPos.visible && tooltipPos.task && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            position: 'absolute',
                            left: tooltipPos.x + scrollContainerRef.current.scrollLeft,
                            top: tooltipPos.y,
                            zIndex: 100,
                            pointerEvents: 'none',
                            width: '220px'
                        }}
                    >
                        <div style={{ background: '#1e293b', border: '1px solid var(--accent-primary)', padding: '12px 16px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                            <div style={{ fontWeight: 800, color: 'white', fontSize: '0.85rem', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {tooltipPos.task.task}
                            </div>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>{format(tooltipPos.task.start, 'MMM d')} - {format(tooltipPos.task.end, 'MMM d')}</span>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{differenceInDays(tooltipPos.task.end, tooltipPos.task.start) + 1}D</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ width: chartWidth + sidebarWidth, minHeight: '500px', display: 'flex', position: 'relative' }} ref={chartAreaRef}>
                {isWithinInterval(new Date(), { start: chartStart, end: chartEnd }) && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${sidebarWidth + (differenceInDays(new Date(), chartStart) * dayWidth)}px`,
                            width: '2px',
                            background: '#ef4444',
                            zIndex: 15,
                            boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                        }}
                    >
                        <div style={{ position: 'sticky', top: '50px', background: '#ef4444', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', transform: 'translateX(-50%)', fontWeight: 800 }}>TODAY</div>
                    </div>
                )}

                <div style={{ width: `${sidebarWidth}px`, position: 'sticky', left: 0, zIndex: 20, background: '#0f172a', borderRight: '2px solid rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                    <div style={{ height: '60px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 24px', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '1px', fontSize: '0.75rem' }}>
                        PROJECT NAVIGATION
                    </div>
                    {visibleTasks.map((task) => {
                        const isParent = task.children.length > 0;
                        return (
                            <div
                                key={task.id}
                                style={{
                                    height: `${rowHeight}px`,
                                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: `${24 + (task.depth * 20)}px`,
                                    transition: '0.2s',
                                    background: hoveredTask === task.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                                    cursor: isParent ? 'pointer' : 'default',
                                    position: 'relative'
                                }}
                                onClick={() => isParent && toggleGroup(task.task)}
                                onMouseEnter={() => setHoveredTask(task.id)}
                                onMouseLeave={() => setHoveredTask(null)}
                            >
                                {isParent && (
                                    <motion.span animate={{ rotate: expandedGroups[task.task] ? 90 : 0 }} style={{ display: 'inline-block', marginRight: '8px' }}>
                                        <ChevronRight size={16} className="text-muted" />
                                    </motion.span>
                                )}
                                {!isParent && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.color, marginRight: '12px', opacity: 0.6 }} />}
                                <span style={{ fontSize: '0.9rem', fontWeight: isParent ? 700 : 400, color: isParent ? 'white' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.task}</span>
                                {task.depth > 0 && (
                                    <div style={{ position: 'absolute', left: `${24 + ((task.depth - 1) * 20) + 8}px`, top: 0, bottom: '50%', width: '1px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 0 0 4px' }} />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ flexGrow: 1, position: 'relative', overflow: 'visible' }}>
                    <div style={{ display: 'flex', height: '60px', position: 'sticky', top: 0, zIndex: 10, background: '#1e293b', borderBottom: '1px solid var(--glass-border)' }}>
                        {Array.from({ length: totalDays }).map((_, i) => {
                            const date = addDays(chartStart, i);
                            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                            return (
                                <div key={i} style={{ width: `${dayWidth}px`, borderRight: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.7rem', color: isToday(date) ? 'white' : 'var(--text-muted)', background: isToday(date) ? 'rgba(239, 68, 68, 0.1)' : isWeekend ? 'rgba(0,0,0,0.1)' : 'transparent', borderBottom: isToday(date) ? '2px solid #ef4444' : 'none' }}>
                                    <span style={{ opacity: 0.6 }}>{format(date, 'eee').toUpperCase()}</span>
                                    <span style={{ fontWeight: 800 }}>{format(date, 'd')}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ position: 'absolute', top: '60px', left: 0, right: 0, bottom: 0, display: 'flex', pointerEvents: 'none' }}>
                        {Array.from({ length: totalDays }).map((_, i) => (
                            <div key={i} style={{ width: `${dayWidth}px`, borderRight: '1px solid rgba(255,255,255,0.02)', height: '100%' }} />
                        ))}
                    </div>

                    {visibleTasks.map((task) => {
                        const isParent = task.children.length > 0;
                        const left = differenceInDays(task.start, chartStart) * dayWidth;
                        const durationDays = differenceInDays(task.end, task.start) + 1;
                        const width = Math.max(durationDays * dayWidth, 12);
                        return (
                            <div
                                key={task.id}
                                style={{ height: `${rowHeight}px`, borderBottom: '1px solid rgba(255,255,255,0.02)', position: 'relative', background: hoveredTask === task.id ? 'rgba(255,255,255,0.03)' : 'transparent', transition: '0.2s' }}
                                onMouseEnter={() => setHoveredTask(task.id)}
                                onMouseLeave={() => setHoveredTask(null)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onMouseMove={(e) => handleTaskBarHover(e, task)}
                                    onMouseLeave={() => setTooltipPos(prev => ({ ...prev, visible: false }))}
                                    style={{ position: 'absolute', top: isParent ? '26px' : '20px', left: `${left}px`, width: `${width}px`, height: isParent ? '12px' : '28px', borderRadius: isParent ? '2px' : '8px', background: isParent ? '#475569' : `linear-gradient(90deg, ${task.color}, #d946ef)`, boxShadow: isParent ? 'none' : `0 4px 15px -5px ${task.color}aa`, display: 'flex', alignItems: 'center', zIndex: 5, cursor: 'pointer' }}
                                >
                                    <div style={{ width: `${task.progress * 100}%`, height: '100%', background: 'rgba(255,255,255,0.25)', borderRadius: 'inherit', backdropFilter: 'blur(2px)' }} />
                                    {width > 120 && !isParent && (
                                        <span style={{ position: 'absolute', width: '100%', textAlign: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.5)', pointerEvents: 'none' }}>
                                            {Math.round(task.progress * 100)}%
                                        </span>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .gantt-scroll-container::-webkit-scrollbar { height: 12px; }
                .gantt-scroll-container::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 6px; }
                .gantt-scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
            `}} />
        </div>
    );
};

export default GanttTool;
