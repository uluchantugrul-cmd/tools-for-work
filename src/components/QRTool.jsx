import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ArrowLeft, Download, Copy, Check, Type, Globe, Wifi, Settings, Info, HelpCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const QRTool = ({ onBack }) => {
    const [text, setText] = useState('https://toolsforwork.io');
    const [fgColor, setFgColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#0f172a');
    const [size, setSize] = useState(256);
    const [copied, setCopied] = useState(false);
    const [type, setType] = useState('link');
    const [qrPadding, setQrPadding] = useState(true);

    const downloadQR = () => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `TF_QR_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const copyImage = async () => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                alert('Copying image directly is only supported in secure Chrome/Edge browsers. Please use Download.');
            }
        });
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart QR Studio</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Generate high-resolution QR codes with full branding.</p>
                </div>

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <section>
                            <h4 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Settings size={16} /> Content Type
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <button className={type === 'link' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => { setType('link'); setText('https://'); }}>Link</button>
                                <button className={type === 'text' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => { setType('text'); setText(''); }}>Text</button>
                                <button className={type === 'wifi' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => { setType('wifi'); setText('WIFI:S:SSID;T:WPA;P:PASS;;'); }}>WiFi</button>
                            </div>
                        </section>

                        <section>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', display: 'block' }}>Input Data</label>
                            {type === 'text' ? (
                                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." className="qr-field" style={{ height: '80px', resize: 'none' }} />
                            ) : (
                                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="qr-field" />
                            )}
                        </section>

                        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Color</label>
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="qr-color-btn" />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>BG Color</label>
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="qr-color-btn" />
                            </div>
                        </section>
                    </div>

                    {/* Preview Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', padding: '32px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ padding: '24px', background: bgColor, borderRadius: '16px', maxWidth: '100%', overflow: 'hidden' }}>
                            <QRCodeCanvas value={text || ' '} size={200} fgColor={fgColor} bgColor={bgColor} level="H" includeMargin={qrPadding} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                            <button onClick={downloadQR} className="button-primary" style={{ width: '100%' }}><Download size={18} /> Download PNG</button>
                            <button onClick={copyImage} className="button-secondary" style={{ width: '100%' }}>{copied ? 'Copied!' : 'Copy Image'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .qr-field { width: 100%; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--glass-border); border-radius: 12px; padding: 12px; color: white; outline: none; }
                .qr-type-btn { flex: 1; min-width: 80px; padding: 12px; border-radius: 12px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.03); color: var(--text-muted); cursor: pointer; font-size: 0.9rem; }
                .qr-type-btn.active { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }
                .qr-color-btn { width: 100%; height: 44px; border: none; background: none; cursor: pointer; }
                @media (max-width: 768px) {
                    .responsive-grid { grid-template-columns: 1fr !important; }
                }
            `}} />
        </div>
    );
};

export default QRTool;
