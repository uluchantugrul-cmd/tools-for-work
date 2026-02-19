import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shuffle, Copy, Check, Download, Lock, Unlock, Palette, Eye } from 'lucide-react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
};
const rgbToHsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};
const hslToHex = (h, s, l) => {
    l /= 100; s /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0'); };
    return `#${f(0)}${f(8)}${f(4)}`;
};
const getLuminance = (hex) => {
    const { r, g, b } = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    const [R, G, B] = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const getContrastRatio = (hex1, hex2) => {
    const l1 = getLuminance(hex1), l2 = getLuminance(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const contrastGrade = (ratio) => {
    if (ratio >= 7) return { grade: 'AAA', color: '#10b981' };
    if (ratio >= 4.5) return { grade: 'AA', color: '#60a5fa' };
    if (ratio >= 3) return { grade: 'AA Large', color: '#f59e0b' };
    return { grade: 'Fail', color: '#ef4444' };
};
const randomHue = () => Math.floor(Math.random() * 360);

const SCHEMES = ['Analogous', 'Complementary', 'Triadic', 'Split-Complementary', 'Monochromatic', 'Random'];

const generatePalette = (baseHue, scheme) => {
    const hues = [];
    switch (scheme) {
        case 'Analogous': for (let i = -2; i <= 2; i++) hues.push((baseHue + i * 30 + 360) % 360); break;
        case 'Complementary': [0, 180, 30, 150, 210].forEach(offset => hues.push((baseHue + offset) % 360)); break;
        case 'Triadic': [0, 120, 240, 60, 180].forEach(offset => hues.push((baseHue + offset) % 360)); break;
        case 'Split-Complementary': [0, 150, 210, 30, 180].forEach(offset => hues.push((baseHue + offset) % 360)); break;
        case 'Monochromatic': for (let i = 0; i < 5; i++) hues.push(baseHue); break;
        default: for (let i = 0; i < 5; i++) hues.push(randomHue()); break;
    }
    return hues.slice(0, 5).map((hue, i) => {
        const saturation = scheme === 'Monochromatic' ? 60 : Math.max(30, 70 + Math.sin(i * 1.2) * 20);
        const lightness = scheme === 'Monochromatic' ? 20 + i * 15 : [45, 55, 60, 50, 40][i];
        return hslToHex(hue, saturation, lightness);
    });
};

const ColorSwatch = ({ color, index, locked, onToggleLock }) => {
    const [copied, setCopied] = useState(false);
    const { r, g, b } = hexToRgb(color) || { r: 0, g: 0, b: 0 };
    const hsl = rgbToHsl({ r, g, b });
    const textColor = getLuminance(color) > 0.3 ? '#000' : '#fff';

    const copyColor = () => {
        navigator.clipboard.writeText(color).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            style={{ flex: 1, minWidth: '120px', borderRadius: '16px', overflow: 'hidden', background: color, aspectRatio: '1 / 1.5', position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
            <div style={{ padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}>
                <div style={{ color: textColor === '#fff' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px', fontFamily: 'monospace' }}>{color.toUpperCase()}</div>
                <div style={{ color: textColor === '#fff' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)', fontSize: '0.75rem' }}>HSL({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={copyColor} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                        {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button onClick={() => onToggleLock(index)} style={{ background: locked ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                        {locked ? <Lock size={12} /> : <Unlock size={12} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ColorPalette = ({ onBack }) => {
    const [scheme, setScheme] = useState('Analogous');
    const [baseHue, setBaseHue] = useState(() => randomHue());
    const [palette, setPalette] = useState(() => generatePalette(randomHue(), 'Analogous'));
    const [locked, setLocked] = useState([false, false, false, false, false]);
    const [copiedAll, setCopiedAll] = useState(false);
    const [activeView, setActiveView] = useState('palette'); // palette | contrast

    const regenerate = useCallback(() => {
        const newHue = randomHue();
        setBaseHue(newHue);
        const newPalette = generatePalette(newHue, scheme);
        setPalette(prev => prev.map((oldColor, i) => locked[i] ? oldColor : newPalette[i]));
    }, [scheme, locked]);

    const applyScheme = (newScheme) => {
        setScheme(newScheme);
        const newPalette = generatePalette(baseHue, newScheme);
        setPalette(prev => prev.map((old, i) => locked[i] ? old : newPalette[i]));
    };

    const toggleLock = (index) => setLocked(prev => { const nl = [...prev]; nl[index] = !nl[index]; return nl; });

    const copyAll = () => {
        const text = palette.join(', ');
        navigator.clipboard.writeText(text).then(() => { setCopiedAll(true); setTimeout(() => setCopiedAll(false), 2000); });
    };

    const exportCSS = () => {
        const css = `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
        const blob = new Blob([css], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'palette.css'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Home
            </button>

            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Color Palette Generator
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Generate beautiful, accessible color palettes. WCAG contrast checking included.
                </p>
            </header>

            {/* Controls */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>SCHEME:</span>
                        {SCHEMES.map(s => (
                            <button key={s} onClick={() => applyScheme(s)} style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, background: scheme === s ? 'white' : 'rgba(255,255,255,0.05)', color: scheme === s ? '#0f172a' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                                {s}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setActiveView(v => v === 'palette' ? 'contrast' : 'palette')} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Eye size={16} /> {activeView === 'palette' ? 'Contrast' : 'Palette'}
                        </button>
                        <button onClick={copyAll} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {copiedAll ? <Check size={16} /> : <Copy size={16} />} {copiedAll ? 'Copied!' : 'Copy All'}
                        </button>
                        <button onClick={exportCSS} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Download size={16} /> CSS
                        </button>
                        <button onClick={regenerate} className="button-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Shuffle size={16} /> Generate
                        </button>
                    </div>
                </div>

                {/* Base hue slider */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>BASE HUE:</span>
                    <input
                        type="range" min="0" max="359" value={baseHue}
                        onChange={e => { const h = parseInt(e.target.value); setBaseHue(h); const np = generatePalette(h, scheme); setPalette(prev => prev.map((old, i) => locked[i] ? old : np[i])); }}
                        style={{ flex: 1, accentColor: hslToHex(baseHue, 70, 55) }}
                    />
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: hslToHex(baseHue, 70, 55), flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
                </div>
            </div>

            {activeView === 'palette' ? (
                <AnimatePresence mode="wait">
                    <motion.div key="palette" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', gap: '12px', height: '400px', borderRadius: '20px', overflow: 'hidden' }}>
                        {palette.map((color, i) => (
                            <ColorSwatch key={`${color}-${i}`} color={color} index={i} locked={locked[i]} onToggleLock={toggleLock} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div key="contrast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-panel" style={{ padding: '24px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'white' }}>WCAG Contrast Grid</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}></th>
                                        {palette.map((c, i) => <th key={i} style={{ padding: '8px' }}><div style={{ width: '32px', height: '32px', borderRadius: '8px', background: c, margin: '0 auto' }} /></th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {palette.map((bgColor, bi) => (
                                        <tr key={bi}>
                                            <td style={{ padding: '8px' }}><div style={{ width: '32px', height: '32px', borderRadius: '8px', background: bgColor }} /></td>
                                            {palette.map((fgColor, fi) => {
                                                const ratio = getContrastRatio(bgColor, fgColor);
                                                const { grade, color } = contrastGrade(ratio);
                                                return (
                                                    <td key={fi} style={{ padding: '4px', textAlign: 'center' }}>
                                                        <div style={{ padding: '8px', borderRadius: '8px', background: bgColor, color: fgColor, fontSize: '0.7rem', fontWeight: 700 }}>
                                                            <div>{grade}</div>
                                                            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{ratio.toFixed(1)}:1</div>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}

            {/* CSS Preview */}
            <div className="glass-panel" style={{ padding: '24px', marginTop: '32px' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>CSS Variables</h3>
                <pre style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, overflow: 'auto' }}>
                    {`:root {
${palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}
}`}
                </pre>
            </div>
        </div>
    );
};

export default ColorPalette;
