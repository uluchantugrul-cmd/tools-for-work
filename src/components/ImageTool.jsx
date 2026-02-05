import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, ArrowLeft, Download, Upload, Maximize2, RefreshCw, Layers, Check, HelpCircle, FileImage } from 'lucide-react';

const ImageTool = ({ onBack }) => {
    const [originalImage, setOriginalImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [targetDimensions, setTargetDimensions] = useState({ width: 0, height: 0 });
    const [format, setFormat] = useState('image/png');
    const [quality, setQuality] = useState(0.8);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new window.Image();
            img.onload = () => {
                setOriginalImage(img);
                setDimensions({ width: img.width, height: img.height });
                setTargetDimensions({ width: img.width, height: img.height });
                setPreviewUrl(event.target.result);
                setDownloadUrl(null);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleResize = () => {
        if (!originalImage) return;
        setIsProcessing(true);

        const canvas = document.createElement('canvas');
        canvas.width = targetDimensions.width;
        canvas.height = targetDimensions.height;
        const ctx = canvas.getContext('2d');

        // Use high-quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(originalImage, 0, 0, targetDimensions.width, targetDimensions.height);

        const dataUrl = canvas.toDataURL(format, quality);
        setDownloadUrl(dataUrl);
        setIsProcessing(false);
    };

    const updateWidth = (w) => {
        const ratio = dimensions.height / dimensions.width;
        setTargetDimensions({
            width: parseInt(w) || 0,
            height: Math.round(parseInt(w) * ratio) || 0
        });
    };

    const updateHeight = (h) => {
        const ratio = dimensions.width / dimensions.height;
        setTargetDimensions({
            width: Math.round(parseInt(h) * ratio) || 0,
            height: parseInt(h) || 0
        });
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pixel Studio</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>
                            Hardware-accelerated image resizing and format conversion. Bulk processing results instantly in your browser.
                        </p>
                    </div>
                    <div>
                        <button className="button-primary" onClick={() => fileInputRef.current.click()}>
                            <Upload size={20} /> Select Image
                        </button>
                    </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            </div>

            {previewUrl && (
                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
                    {/* Preview Area */}
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PREVIEW CANVAS</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{dimensions.width} x {dimensions.height} px</span>
                        </div>
                        <div style={{
                            padding: '24px',
                            background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uPBAp8hhHAnmSY6M7GCUTMIs8CHpIhRcyfIDqL9T8SfsMUA468O+RhU778AAAAASUVORK5CYII=")',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '300px'
                        }}>
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '4px' }} />
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <SettingsIcon size={20} /> Optimization
                        </h3>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>TARGET WIDTH</label>
                            <input
                                type="number"
                                className="qr-field"
                                value={targetDimensions.width}
                                onChange={(e) => updateWidth(e.target.value)}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>TARGET HEIGHT</label>
                            <input
                                type="number"
                                className="qr-field"
                                value={targetDimensions.height}
                                onChange={(e) => updateHeight(e.target.value)}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>FORMAT</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                <button className={format === 'image/png' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => setFormat('image/png')}>PNG</button>
                                <button className={format === 'image/jpeg' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => setFormat('image/jpeg')}>JPG</button>
                                <button className={format === 'image/webp' ? 'qr-type-btn active' : 'qr-type-btn'} onClick={() => setFormat('image/webp')}>WEBP</button>
                            </div>
                        </div>

                        <button
                            className="button-primary"
                            style={{ width: '100%', padding: '16px' }}
                            onClick={handleResize}
                            disabled={isProcessing}
                        >
                            <RefreshCw size={20} className={isProcessing ? 'animate-spin' : ''} />
                            {isProcessing ? 'Processing...' : 'Apply Dimensions'}
                        </button>

                        <AnimatePresence>
                            {downloadUrl && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px' }}>
                                    <a
                                        href={downloadUrl}
                                        download={`export.${format.split('/')[1]}`}
                                        className="button-primary"
                                        style={{ width: '100%', padding: '16px', background: 'var(--accent-secondary)' }}
                                    >
                                        <Download size={20} /> Download Result
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* How to Use Section */}
            <div className="glass-panel" style={{ padding: '40px', marginTop: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px' }}>
                        <HelpCircle size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>How to optimize your images</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>01</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Upload Asset</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Drop or select your image. We support PNG, JPG, WEBP, and even high-res professional formats.
                        </p>
                    </div>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>02</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Smart Resizing</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Enter target width or height. Aspect ratio is maintained automatically to prevent distortion.
                        </p>
                    </div>
                    <div className="step-item">
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>03</div>
                        <h4 style={{ color: 'white', marginBottom: '12px' }}>Format Master</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            Choose PNG for transparency, JPG for web, or WEBP for maximum compression/performance.
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .qr-field {
                    width: 100%;
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 14px 18px;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                }
                .qr-type-btn {
                    flex: 1;
                    padding: 10px;
                    border-radius: 10px;
                    border: 1px solid var(--glass-border);
                    background: transparent;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-align: center;
                }
                .qr-type-btn.active {
                    background: var(--accent-primary);
                    color: white;
                    border-color: var(--accent-primary);
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
};

const SettingsIcon = ({ size }) => (
    <div style={{ padding: '6px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-secondary)', borderRadius: '8px' }}>
        <RefreshCw size={size} />
    </div>
);

export default ImageTool;
