import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Copy, FileText, Layout, Eye, Edit3, Download, Trash2, Check, ExternalLink } from 'lucide-react';

const MarkdownTool = ({ onBack }) => {
    const [markdown, setMarkdown] = useState(() => {
        return localStorage.getItem('markdown_content') || '# Welcome to Markdown Pro\n\nEdit this text to see the live preview on the right. \n\n### Features:\n- **Instant** Live Preview\n- **Local-First** Persistence\n- **Clean** Workspace\n- **Download** as .md file\n\n```javascript\nfunction helloWorld() {\n  console.log("Privacy first!");\n}\n```';
    });
    const [view, setView] = useState('split'); // 'edit', 'preview', 'split'
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        localStorage.setItem('markdown_content', markdown);
    }, [markdown]);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        const element = document.createElement("a");
        const file = new Blob([markdown], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "workspace.md";
        document.body.appendChild(element);
        element.click();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Simple markdown renderer for preview (doesn't need complex libs for this use case)
    const renderSimpleMarkdown = (text) => {
        return text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' style='max-width:100%' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
            .replace(/\n$/gim, '<br />')
            .split('\n').join('<br />');
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={onBack} className="button-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={18} /> Back
                </button>

                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <button onClick={() => setView('edit')} style={{ background: view === 'edit' ? 'var(--accent-primary)' : 'transparent', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Edit3 size={16} /> Edit</button>
                    <button onClick={() => setView('split')} className="desktop-only" style={{ background: view === 'split' ? 'var(--accent-primary)' : 'transparent', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Layout size={16} /> Split</button>
                    <button onClick={() => setView('preview')} style={{ background: view === 'preview' ? 'var(--accent-primary)' : 'transparent', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> Preview</button>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleCopy} className="button-secondary" style={{ padding: '10px 16px' }}>{copied ? <Check size={18} /> : <Copy size={18} />}</button>
                    <button onClick={handleSave} className="button-primary" style={{ padding: '10px 16px' }}><Download size={18} /></button>
                </div>
            </div>

            <div className="glass-panel" style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: view === 'split' ? '1fr 1fr' : '1fr', padding: 0, overflow: 'hidden', minHeight: '500px' }}>
                {(view === 'edit' || view === 'split') && (
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Start writing..."
                        style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', color: 'white', padding: '32px', resize: 'none', outline: 'none', fontSize: '1.1rem', fontFamily: 'monospace', lineHeight: 1.6, borderRight: view === 'split' ? '1px solid var(--glass-border)' : 'none' }}
                    />
                )}
                {(view === 'preview' || view === 'split') && (
                    <div className="markdown-preview" style={{ width: '100%', height: '100%', padding: '32px', overflowY: 'auto', color: 'var(--text-main)', lineHeight: 1.8 }}>
                        <div dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(markdown) }} />
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .markdown-preview h1 { font-size: 2.5rem; margin-bottom: 24px; color: white; border-bottom: 1px solid var(--glass-border); padding-bottom: 12px; }
                .markdown-preview h2 { font-size: 1.8rem; margin: 32px 0 16px; color: white; }
                .markdown-preview h3 { font-size: 1.3rem; margin: 24px 0 12px; color: white; }
                .markdown-preview p { margin-bottom: 16px; color: #94a3b8; }
                .markdown-preview blockquote { border-left: 4px solid var(--accent-primary); padding-left: 20px; font-style: italic; color: #64748b; margin: 24px 0; }
                .markdown-preview pre { background: rgba(0,0,0,0.3); padding: 16px; borderRadius: 8px; font-family: monospace; overflow-x: auto; margin: 20px 0; }
                .markdown-preview a { color: var(--accent-primary); text-decoration: none; }
                .markdown-preview a:hover { text-decoration: underline; }
                @media (max-width: 768px) { .desktop-only { display: none !important; } }
            `}} />
        </div>
    );
};

export default MarkdownTool;
