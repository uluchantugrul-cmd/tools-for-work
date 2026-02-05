import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import GanttTool from './components/GanttTool';
import WorkloadTool from './components/WorkloadTool';
import Blog from './components/Blog';
import ConverterTool from './components/ConverterTool';
import QRTool from './components/QRTool';
import ImageTool from './components/ImageTool';
import Legal from './components/Legal';
import StrategyMatrix from './components/StrategyMatrix';
import DevToolkit from './components/DevToolkit';
import UTMTool from './components/UTMTool';
import MarkdownTool from './components/MarkdownTool';
import PomodoroTool from './components/PomodoroTool';
import MeetingNotesTool from './components/MeetingNotesTool';
import AvailabilityTool from './components/AvailabilityTool';
import About from './components/About';
import AnalyticsTracker from './components/AnalyticsTracker';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    return (
        <Router>
            <AnalyticsTracker />
            <ScrollToTop />
            <div className="app">
                <NavbarWrapper />

                <main style={{ minHeight: '80vh' }}>
                    <Routes>
                        <Route path="/" element={<MenuWrapper />} />
                        <Route path="/gantt" element={<GanttToolWrapper />} />
                        <Route path="/workload" element={<WorkloadToolWrapper />} />
                        <Route path="/strategy" element={<StrategyWrapper />} />
                        <Route path="/converter" element={<ConverterToolWrapper />} />
                        <Route path="/qr" element={<QRToolWrapper />} />
                        <Route path="/image" element={<ImageToolWrapper />} />
                        <Route path="/forge" element={<DevToolkitWrapper />} />
                        <Route path="/utm" element={<UTMToolWrapper />} />
                        <Route path="/markdown" element={<MarkdownWrapper />} />
                        <Route path="/pomodoro" element={<PomodoroWrapper />} />
                        <Route path="/meeting" element={<MeetingWrapper />} />
                        <Route path="/availability" element={<AvailabilityWrapper />} />
                        <Route path="/guides" element={<BlogWrapper />} />
                        <Route path="/about" element={<AboutWrapper />} />
                        <Route path="/privacy" element={<LegalWrapper type="privacy" />} />
                        <Route path="/terms" element={<LegalWrapper type="terms" />} />
                        <Route path="*" element={<MenuWrapper />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

const NavbarWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Navbar onHome={() => navigate('/')} onBlog={() => navigate('/guides')} activePath={location.pathname} />;
};

const MenuWrapper = () => {
    const navigate = useNavigate();
    return <Menu onSelectTool={(id) => navigate(`/${id}`)} />;
};

const GanttToolWrapper = () => {
    const navigate = useNavigate();
    return <GanttTool onBack={() => navigate('/')} />;
};

const WorkloadToolWrapper = () => {
    const navigate = useNavigate();
    return <WorkloadTool onBack={() => navigate('/')} />;
};

const StrategyWrapper = () => {
    const navigate = useNavigate();
    return <StrategyMatrix onBack={() => navigate('/')} />;
};

const ConverterToolWrapper = () => {
    const navigate = useNavigate();
    return <ConverterTool onBack={() => navigate('/')} />;
};

const QRToolWrapper = () => {
    const navigate = useNavigate();
    return <QRTool onBack={() => navigate('/')} />;
};

const ImageToolWrapper = () => {
    const navigate = useNavigate();
    return <ImageTool onBack={() => navigate('/')} />;
};

const DevToolkitWrapper = () => {
    const navigate = useNavigate();
    return <DevToolkit onBack={() => navigate('/')} />;
};

const UTMToolWrapper = () => {
    const navigate = useNavigate();
    return <UTMTool onBack={() => navigate('/')} />;
};

const MarkdownWrapper = () => {
    const navigate = useNavigate();
    return <MarkdownTool onBack={() => navigate('/')} />;
};

const PomodoroWrapper = () => {
    const navigate = useNavigate();
    return <PomodoroTool onBack={() => navigate('/')} />;
};

const MeetingWrapper = () => {
    const navigate = useNavigate();
    return <MeetingNotesTool onBack={() => navigate('/')} />;
};

const AvailabilityWrapper = () => {
    const navigate = useNavigate();
    return <AvailabilityTool onBack={() => navigate('/')} />;
};

const BlogWrapper = () => {
    const navigate = useNavigate();
    return <Blog onBack={() => navigate('/')} onNavigateTool={(id) => navigate(id === 'menu' ? '/' : `/${id}`)} />;
};

const LegalWrapper = ({ type }) => {
    const navigate = useNavigate();
    return <Legal type={type} onBack={() => navigate('/')} />;
};

const AboutWrapper = () => {
    const navigate = useNavigate();
    return <About onBack={() => navigate('/')} />;
};

const Footer = () => {
    return (
        <footer style={{
            padding: '100px 0 60px',
            borderTop: '1px solid var(--glass-border)',
            marginTop: '100px',
            background: 'linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.8))'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '80px', textAlign: 'left' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tools for Work</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem', maxWidth: '400px' }}>
                            Local-first productivity tools built for speed and privacy. No data ever leaves your browser.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Project Suite</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <li style={{ marginBottom: '16px' }}><Link to="/gantt" className="footer-link">Gantt Chart Pro</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/workload" className="footer-link">Workload Planner</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/pomodoro" className="footer-link">Pomodoro Tracker</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/meeting" className="footer-link">Meeting Architect</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Resources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <li style={{ marginBottom: '16px' }}><Link to="/forge" className="footer-link">Forge Kit (Dev)</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/about" className="footer-link">About Us</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <p style={{ marginTop: '40px' }}>© 2025 Tools for Work. Empowering teams with private, high-performance tools.</p>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-link { color: inherit; text-decoration: none; transition: all 0.2s; display: inline-block; }
                .footer-link:hover { color: white; transform: translateX(4px); }
            `}} />
        </footer>
    );
};

export default App;
