import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Download, Music, Video, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Settings2, ShieldCheck, Zap } from 'lucide-react';

const YoutubeDownloader = ({ onBack }) => {
    const [url, setUrl] = useState('');
    const [quality, setQuality] = useState('1080');
    const [isAudioOnly, setIsAudioOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [resultUrl, setResultUrl] = useState(null);

    const handleDownload = async (e) => {
        e.preventDefault();
        if (!url) {
            setError('Please enter a valid YouTube URL');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setResultUrl(null);

        // Try multiple instances in case one is down or blocking CORS
        const instances = [
            'https://cobalt.shaka.video/api/json',
            'https://co.wuk.sh/api/json',
            'https://api.cobalt.tools/api/json'
        ];

        let lastError = null;

        for (const instance of instances) {
            try {
                const response = await fetch(instance, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: url,
                        videoQuality: isAudioOnly ? '720' : quality,
                        audioFormat: 'mp3',
                        isAudioOnly: isAudioOnly,
                        downloadMode: 'auto'
                    })
                });

                if (!response.ok) {
                    continue; // Try next instance
                }

                const data = await response.json();

                if (data.status === 'error') {
                    lastError = data.text;
                    continue;
                }

                if (data.url) {
                    setResultUrl(data.url);
                    setSuccess(true);
                    window.open(data.url, '_blank');
                    setLoading(false);
                    return; // Success!
                }
            } catch (err) {
                lastError = err.message;
                console.warn(`Instance ${instance} failed:`, err);
                continue;
            }
        }

        setError(lastError || 'All download servers are currently busy. Please try again in a few minutes or with a different link.');
        setLoading(false);
    };

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="button-secondary"
                style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <ArrowLeft size={18} /> Back to Tools
            </motion.button>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)'
                        }}
                    >
                        <Youtube size={40} color="white" />
                    </motion.div>
                    <h1 style={{ marginBottom: '16px', fontSize: '3rem', fontWeight: 800 }}>
                        YouTube <span style={{ background: 'linear-gradient(to right, #FF0000, #FF4D4D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Downloader</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        High-quality YouTube video and audio downloader. Ad-free, fast, and simple.
                    </p>
                </div>

                <div className="glass-panel" style={{ padding: '40px' }}>
                    <form onSubmit={handleDownload}>
                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, color: 'white' }}>Video URL</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '16px',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                />
                                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                    <ShieldCheck size={20} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }} className="responsive-grid">
                            <div>
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, color: 'white' }}>Media Type</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsAudioOnly(false)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: !isAudioOnly ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.4)',
                                            border: `1px solid ${!isAudioOnly ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                                            color: !isAudioOnly ? '#60a5fa' : 'var(--text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontWeight: 600
                                        }}
                                    >
                                        <Video size={18} /> Video
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAudioOnly(true)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: isAudioOnly ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.4)',
                                            border: `1px solid ${isAudioOnly ? 'var(--accent-secondary)' : 'var(--glass-border)'}`,
                                            color: isAudioOnly ? '#a78bfa' : 'var(--text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontWeight: 600
                                        }}
                                    >
                                        <Music size={18} /> Audio
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isAudioOnly && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                    >
                                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, color: 'white' }}>Quality</label>
                                        <select
                                            value={quality}
                                            onChange={(e) => setQuality(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                background: 'rgba(15, 23, 42, 0.6)',
                                                border: '1px solid var(--glass-border)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="max">Original (Max)</option>
                                            <option value="2160">4K (2160p)</option>
                                            <option value="1440">2K (1440p)</option>
                                            <option value="1080">1080p</option>
                                            <option value="720">720p</option>
                                            <option value="480">480p</option>
                                            <option value="360">360p</option>
                                        </select>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="button-primary"
                            style={{
                                width: '100%',
                                height: '60px',
                                fontSize: '1.2rem',
                                opacity: loading ? 0.7 : 1,
                                background: isAudioOnly ? 'linear-gradient(135deg, var(--accent-secondary), #7c3aed)' : 'var(--gradient-main)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    <Download size={24} /> Download {isAudioOnly ? 'Audio' : 'Video'}
                                </>
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '24px',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    color: '#f87171',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {success && resultUrl && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '24px',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    color: '#4ade80',
                                    textAlign: 'center'
                                }}
                            >
                                <CheckCircle2 size={40} style={{ marginBottom: '12px' }} />
                                <h3 style={{ color: '#4ade80', marginBottom: '8px' }}>Ready to Download!</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your file has been processed successfully.</p>
                                <a
                                    href={resultUrl}
                                    className="button-primary"
                                    style={{
                                        background: '#22c55e',
                                        width: '100%',
                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                    }}
                                >
                                    <Download size={20} /> Click to Save File
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="responsive-grid">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-primary)', marginBottom: '12px' }}><Zap size={32} /></div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>Ultra Fast</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Lightning fast processing powered by the latest stream extraction tech.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-secondary)', marginBottom: '12px' }}><Video size={32} /></div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>4K Quality</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Support for all resolutions from 360p up to sparkling 4K Ultra HD.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#ec4899', marginBottom: '12px' }}><ShieldCheck size={32} /></div>
                        <h4 style={{ color: 'white', marginBottom: '8px' }}>Safe & Secure</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No trackers, no cookies, and no data leaves the processing server.</p>
                    </div>
                </div>

                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <h3 style={{ color: 'white', marginBottom: '16px' }}>Frequently Asked Questions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="responsive-grid">
                        <div>
                            <p style={{ color: 'white', fontWeight: 600, marginBottom: '8px' }}>Is it legal to download videos?</p>
                            <p>You should only download videos for which you have permission or which are under Creative Commons license. Please respect the creators' rights.</p>
                        </div>
                        <div>
                            <p style={{ color: 'white', fontWeight: 600, marginBottom: '8px' }}>Where are the files saved?</p>
                            <p>Files are saved directly to your browser's default download folder. You can usually find them in "Downloads".</p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
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

export default YoutubeDownloader;
