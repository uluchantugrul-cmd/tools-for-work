import React, { useState, useRef, useEffect } from 'react';
import { Hammer, BookOpen, Menu, X, Home, ChevronDown, BarChart2, Users, LayoutGrid, Terminal, QrCode, FileCode, Camera, Megaphone, FileText, Timer, Target, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onHome, onBlog, activePath }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItemStyle = (path) => ({
        color: activePath === path ? 'white' : 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: activePath === path ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    });

    const handleToolSelect = (path) => {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
        navigate(path);
    };

    return (
        <nav style={{
            height: '80px',
            borderBottom: '1px solid var(--glass-border)',
            backdropFilter: 'blur(20px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.8)'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
                <div
                    onClick={() => { onHome(); setIsMenuOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', zIndex: 1100 }}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'var(--gradient-main)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}>
                        <Hammer size={24} />
                    </div>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        letterSpacing: '-1px',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Tools for Work
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '1rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            Products <ChevronDown size={16} />
                        </button>

                        {isDropdownOpen && (
                            <div className="animate-fade-in" style={{
                                position: 'absolute',
                                top: '100%',
                                right: -100,
                                width: '300px',
                                background: 'var(--bg-dark)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '16px',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                                marginTop: '16px'
                            }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>PROJECT & PRODUCTIVITY</div>
                                <div onClick={() => handleToolSelect('/gantt')} className="dropdown-item">
                                    <BarChart2 size={18} className="text-blue-500" /> Gantt Chart Pro
                                </div>
                                <div onClick={() => handleToolSelect('/workload')} className="dropdown-item">
                                    <Users size={18} className="text-purple-500" /> Workload Planner
                                </div>
                                <div onClick={() => handleToolSelect('/strategy')} className="dropdown-item">
                                    <LayoutGrid size={18} className="text-red-500" /> Strategy Matrix
                                </div>

                                <div style={{ height: '1px', background: 'var(--glass-border)', margin: '16px 0' }} />

                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>UTILITIES</div>
                                <div onClick={() => handleToolSelect('/forge')} className="dropdown-item">
                                    <Terminal size={18} className="text-indigo-500" /> Forge Kit <span style={{ fontSize: '0.7em', padding: '2px 6px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '4px', marginLeft: 'auto' }}>NEW</span>
                                </div>
                                <div onClick={() => handleToolSelect('/qr')} className="dropdown-item">
                                    <QrCode size={18} className="text-orange-500" /> Smart QR Studio
                                </div>
                                <div onClick={() => handleToolSelect('/converter')} className="dropdown-item">
                                    <FileCode size={18} className="text-emerald-500" /> Converter
                                </div>
                                <div onClick={() => handleToolSelect('/image')} className="dropdown-item">
                                    <Camera size={18} className="text-pink-500" /> Pixel Studio
                                </div>
                                <div onClick={() => handleToolSelect('/utm')} className="dropdown-item">
                                    <Megaphone size={18} className="text-orange-400" /> UTM Architect
                                </div>
                                <div onClick={() => handleToolSelect('/markdown')} className="dropdown-item">
                                    <FileText size={18} className="text-sky-400" /> Markdown Pro
                                </div>
                                <div onClick={() => handleToolSelect('/pomodoro')} className="dropdown-item">
                                    <Timer size={18} className="text-red-400" /> Pomodoro Tracker <span style={{ fontSize: '0.7em', padding: '2px 6px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderRadius: '4px', marginLeft: 'auto' }}>HOT</span>
                                </div>
                                <div onClick={() => handleToolSelect('/meeting')} className="dropdown-item">
                                    <Target size={18} className="text-blue-400" /> Meeting Architect
                                </div>
                                <div onClick={() => handleToolSelect('/availability')} className="dropdown-item">
                                    <Clock size={18} className="text-emerald-400" /> Sync Matrix
                                </div>
                            </div>
                        )}
                    </div>

                    <a href="#" onClick={(e) => { e.preventDefault(); onBlog(); }} style={navItemStyle('/guides')}>
                        <BookOpen size={18} /> Guides
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', zIndex: 1100, color: 'white' }}>
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.98)',
                    zIndex: 1050,
                    overflowY: 'auto',
                    padding: '100px 24px 40px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '8px' }}>SUITE</div>
                        <button onClick={() => handleToolSelect('/gantt')} className="mobile-item"><BarChart2 size={20} /> Gantt Chart Pro</button>
                        <button onClick={() => handleToolSelect('/workload')} className="mobile-item"><Users size={20} /> Workload Planner</button>
                        <button onClick={() => handleToolSelect('/strategy')} className="mobile-item"><LayoutGrid size={20} /> Strategy Matrix</button>

                        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '16px 0' }} />

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '8px' }}>TOOLS</div>
                        <button onClick={() => handleToolSelect('/forge')} className="mobile-item"><Terminal size={20} /> Forge Kit</button>
                        <button onClick={() => handleToolSelect('/qr')} className="mobile-item"><QrCode size={20} /> Smart QR Studio</button>
                        <button onClick={() => handleToolSelect('/converter')} className="mobile-item"><FileCode size={20} /> converter</button>
                        <button onClick={() => handleToolSelect('/image')} className="mobile-item"><Camera size={20} /> Pixel Studio</button>
                        <button onClick={() => handleToolSelect('/utm')} className="mobile-item"><Megaphone size={20} /> UTM Architect</button>
                        <button onClick={() => handleToolSelect('/markdown')} className="mobile-item"><FileText size={20} /> Markdown Pro</button>
                        <button onClick={() => handleToolSelect('/pomodoro')} className="mobile-item"><Timer size={20} /> Pomodoro Tracker</button>
                        <button onClick={() => handleToolSelect('/meeting')} className="mobile-item"><Target size={20} /> Meeting Architect</button>
                        <button onClick={() => handleToolSelect('/availability')} className="mobile-item"><Clock size={20} /> Sync Matrix</button>

                        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '16px 0' }} />

                        <button onClick={() => handleToolSelect('/guides')} className="button-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                            <BookOpen size={20} /> Read Guides
                        </button>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .dropdown-item {
                    padding: 10px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: white;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .dropdown-item:hover {
                    background: rgba(255,255,255,0.05);
                    transform: translateX(4px);
                }
                .mobile-item {
                    background: transparent;
                    border: none;
                    color: white;
                    padding: 16px;
                    text-align: left;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                    width: 100%;
                }
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}} />
        </nav>
    );
};

export default Navbar;
