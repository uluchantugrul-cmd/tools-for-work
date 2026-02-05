import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, FileSpreadsheet, ArrowLeft, Download, Copy, Check, Repeat, Trash2, Clipboard, HelpCircle } from 'lucide-react';

const ConverterTool = ({ onBack }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('json-to-csv'); // 'json-to-csv' or 'csv-to-json'
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const convertData = () => {
        setError(null);
        try {
            if (!input.trim()) {
                setError("Please enter some data to convert.");
                return;
            }

            if (mode === 'json-to-csv') {
                const json = JSON.parse(input);
                const array = Array.isArray(json) ? json : [json];
                if (array.length === 0) {
                    setError("Empty JSON array provided.");
                    return;
                }

                const headers = Object.keys(array[0]);
                const csvRows = [
                    headers.join(','),
                    ...array.map(row => headers.map(header => {
                        let val = row[header];
                        if (val === null || val === undefined) return '';
                        val = val.toString();
                        return val.includes(',') || val.includes('"') || val.includes('\n')
                            ? `"${val.replace(/"/g, '""')}"`
                            : val;
                    }).join(','))
                ];
                setOutput(csvRows.join('\n'));
            } else {
                const lines = input.trim().split('\n');
                if (lines.length < 1) {
                    setError("Invalid CSV format.");
                    return;
                }
                const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                const jsonResult = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                    const obj = {};
                    headers.forEach((header, i) => {
                        const val = values[i];
                        obj[header] = (val === '' || val === undefined) ? null : (isNaN(val) ? val : Number(val));
                    });
                    return obj;
                });
                setOutput(JSON.stringify(jsonResult, null, 2));
            }
        } catch (err) {
            setError('Conversion failed: ' + err.message);
        }
    };

    const clear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
        } catch (err) {
            setError("Could not access clipboard. Please paste manually.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadFile = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'json-to-csv' ? 'data_converted.csv' : 'data_converted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Converter</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Professional-grade data transformation between JSON and CSV.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        className={mode === 'json-to-csv' ? 'button-primary' : 'button-secondary'}
                        onClick={() => { setMode('json-to-csv'); clear(); }}
                    >
                        <FileCode size={20} /> JSON ➔ CSV
                    </button>
                    <div style={{ color: 'var(--text-muted)', opacity: 0.5 }}><Repeat size={20} /></div>
                    <button
                        className={mode === 'csv-to-json' ? 'button-primary' : 'button-secondary'}
                        onClick={() => { setMode('csv-to-json'); clear(); }}
                    >
                        <FileSpreadsheet size={20} /> CSV ➔ JSON
                    </button>
                    <div style={{ flexGrow: 1 }} />
                    <button className="button-secondary" onClick={pasteFromClipboard} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clipboard size={18} /> Paste from Clipboard
                    </button>
                </div>

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', minHeight: '450px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>INPUT ({mode.split('-')[0].toUpperCase()})</span>
                            <button onClick={clear} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                                <Trash2 size={14} /> Clear
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === 'json-to-csv' ? '[\n  {\n    "id": 1,\n    "name": "Project Alpha",\n    "status": "Active"\n  }\n]' : 'id, name, status\n1, Project Alpha, Active'}
                            style={{ flexGrow: 1, width: '100%', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '24px', color: 'white', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>OUTPUT ({mode.split('-')[2].toUpperCase()})</span>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button onClick={copyToClipboard} className="button-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', opacity: output ? 1 : 0.5, pointerEvents: output ? 'all' : 'none' }}>
                                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                                </button>
                                <button onClick={downloadFile} className="button-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', opacity: output ? 1 : 0.5, pointerEvents: output ? 'all' : 'none' }}>
                                    <Download size={14} /> Export
                                </button>
                            </div>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Data will appear here..."
                            style={{ flexGrow: 1, width: '100%', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '24px', color: output ? '#22d3ee' : 'var(--text-muted)', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                        />
                    </div>
                </div>

                <button className="button-primary" onClick={convertData} style={{ marginTop: '40px', width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '20px' }}>
                    Transform Data
                </button>
            </div>

            {/* How to Use Section */}
            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px' }}>
                        <HelpCircle size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>How to use Smart Converter</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>01</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Choose Mode</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Select either <strong>JSON to CSV</strong> or <strong>CSV to JSON</strong> based on your source data.
                        </p>
                    </div>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>02</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Input Data</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Paste your code into the left editor. For CSV, ensure the first line contains headers. For JSON, ensure it is a valid object or array.
                        </p>
                    </div>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>03</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Export</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Click <strong>Transform</strong> to see the result. You can then copy it to clipboard or download as a file.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConverterTool;
