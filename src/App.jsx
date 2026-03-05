import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import SEO from './components/SEO';

// Lazy load components for route-based code splitting
const GanttTool = lazy(() => import('./components/GanttTool'));
const WorkloadTool = lazy(() => import('./components/WorkloadTool'));
const Blog = lazy(() => import('./components/Blog'));
const ConverterTool = lazy(() => import('./components/ConverterTool'));
const QRTool = lazy(() => import('./components/QRTool'));
const ImageTool = lazy(() => import('./components/ImageTool'));
const Legal = lazy(() => import('./components/Legal'));
const StrategyMatrix = lazy(() => import('./components/StrategyMatrix'));
const DevToolkit = lazy(() => import('./components/DevToolkit'));
const UTMTool = lazy(() => import('./components/UTMTool'));
const MarkdownTool = lazy(() => import('./components/MarkdownTool'));
const PomodoroTool = lazy(() => import('./components/PomodoroTool'));
const MeetingNotesTool = lazy(() => import('./components/MeetingNotesTool'));
const AvailabilityTool = lazy(() => import('./components/AvailabilityTool'));
const About = lazy(() => import('./components/About'));
const ROICalculator = lazy(() => import('./components/ROICalculator'));
const MetaTagGenerator = lazy(() => import('./components/MetaTagGenerator'));
const AnalyticsTracker = lazy(() => import('./components/AnalyticsTracker'));
const PasswordGenerator = lazy(() => import('./components/PasswordGenerator'));
const SalaryCalculator = lazy(() => import('./components/SalaryCalculator'));
const Services = lazy(() => import('./components/Services'));
const ExpenseTracker = lazy(() => import('./components/ExpenseTracker'));
const ColorPalette = lazy(() => import('./components/ColorPalette'));
const YoutubeDownloader = lazy(() => import('./components/YoutubeDownloader'));

const LoadingFallback = () => (
    <div style={{
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
    }}>
        <div className="animate-pulse" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading Studio...</div>
    </div>
);

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
                    <Suspense fallback={<LoadingFallback />}>
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
                            <Route path="/roi" element={<ROICalculatorWrapper />} />
                            <Route path="/meta-tags" element={<MetaTagGeneratorWrapper />} />
                            <Route path="/password" element={<PasswordGeneratorWrapper />} />
                            <Route path="/salary" element={<SalaryCalculatorWrapper />} />
                            <Route path="/expense" element={<ExpenseTrackerWrapper />} />
                            <Route path="/colors" element={<ColorPaletteWrapper />} />
                            <Route path="/services" element={<ServicesWrapper />} />
                            <Route path="/youtube" element={<YoutubeDownloaderWrapper />} />
                            <Route path="/about" element={<AboutWrapper />} />

                            <Route path="/privacy" element={<LegalWrapper type="privacy" />} />
                            <Route path="/terms" element={<LegalWrapper type="terms" />} />
                            <Route path="*" element={<MenuWrapper />} />
                        </Routes>
                    </Suspense>
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
    return (
        <>
            <SEO
                title="Privacy-First Business & Dev Tools"
                description="The ultimate local-first productivity suite. Gantt charts, calculators, password generators, and developer tools that respect your privacy."
            />
            <Menu onSelectTool={(id) => navigate(`/${id}`)} />
        </>
    );
};

const GanttToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO
                title="Gantt Chart Pro | Free Project Timeline Builder"
                description="Create professional Gantt charts and project timelines entirely in your browser. 100% private, offline-first project management."
                keywords="free gantt chart, project timeline, project planning tool, private gantt chart"
            />
            <GanttTool onBack={() => navigate('/')} />
        </>
    );
};

const WorkloadToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO
                title="Workload Planner | Team Capacity Management"
                description="Audit team capacity and manage workloads with our visual planner. Identify bottlenecks and balance tasks privately."
                keywords="workload management, team capacity planner, resource management tool"
            />
            <WorkloadTool onBack={() => navigate('/')} />
        </>
    );
};

const StrategyWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Strategy Matrix | Decision Alignment Tool" description="Visualize strategy and align priorities with the Eisenhower and Strategy Matrix tool." />
            <StrategyMatrix onBack={() => navigate('/')} />
        </>
    );
};

const ConverterToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Data Converter | JSON to CSV & More" description="Privacy-focused data conversion. Prettify JSON and convert formats without uploading data anywhere." />
            <ConverterTool onBack={() => navigate('/')} />
        </>
    );
};

const QRToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Smart QR Studio | Design Custom QR Codes" description="Generate beautiful, custom QR codes for your business or personal use. Privacy-first QR generation." />
            <QRTool onBack={() => navigate('/')} />
        </>
    );
};

const ImageToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Pixel Studio | Web Image Optimization" description="Compress and resize images locally in your browser. No server uploads, total privacy, maximum speed." />
            <ImageTool onBack={() => navigate('/')} />
        </>
    );
};

const DevToolkitWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Forge Kit | Essential Tools for Engineers" description="The ultimate developer Swiss Army Knife. JSON tools, base64 encoding, and more—all local-first." />
            <DevToolkit onBack={() => navigate('/')} />
        </>
    );
};

const UTMToolWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="UTM Architect | Campaign Link Builder" description="Build perfect UTM parameters for your marketing campaigns. Reliable, error-free link generation." />
            <UTMTool onBack={() => navigate('/')} />
        </>
    );
};

const MarkdownWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Markdown Pro | Live Markdown Editor" description="Write and preview markdown in real-time. Export clean HTML or MD files instantly." />
            <MarkdownTool onBack={() => navigate('/')} />
        </>
    );
};

const PomodoroWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Pomodoro Tracker | Focus & Productivity Timer" description="Boost your focus with the classic Pomodoro technique. Integrated with your distraction-free workspace." />
            <PomodoroTool onBack={() => navigate('/')} />
        </>
    );
};

const MeetingWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Meeting Architect | Structured Meeting Notes" description="Plan and document meetings with intent. Collaborative structure for actionable outcomes." />
            <MeetingNotesTool onBack={() => navigate('/')} />
        </>
    );
};

const AvailabilityWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Sync Matrix | Global Team Availability" description="Synchronize across timezones easily. Find the perfect window for global team collaboration." />
            <AvailabilityTool onBack={() => navigate('/')} />
        </>
    );
};

const BlogWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Productivity Guides & Insights" description="Deep dives into project excellence, remote work, and developer productivity tools." />
            <Blog onBack={() => navigate('/')} onNavigateTool={(id) => navigate(id === 'menu' ? '/' : `/${id}`)} />
        </>
    );
};

const ROICalculatorWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="ROI Calculator | Business Value Assessment" description="Calculate Return on Investment for your projects and tools with precision." />
            <ROICalculator onBack={() => navigate('/')} />
        </>
    );
};

const MetaTagGeneratorWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Meta Tag Generator | SEO Header Studio" description="Perfect your SEO meta tags for social media and search engines. Instant visual preview." />
            <MetaTagGenerator onBack={() => navigate('/')} />
        </>
    );
};

const PasswordGeneratorWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Password Gen | Secure Local-First Credentials" description="Generate strong, random passwords that never leave your device. Secure by design." />
            <PasswordGenerator onBack={() => navigate('/')} />
        </>
    );
};

const SalaryCalculatorWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO
                title="Salary & Rate Converter | Income Visualizer"
                description="Instantly convert your annual salary to hourly, monthly, or weekly rates. Visual income breakdown tool."
                keywords="salary calculator, hourly to annual converter, pay rate calculator, free income tool"
            />
            <SalaryCalculator onBack={() => navigate('/')} />
        </>
    );
};

const ExpenseTrackerWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Expense Tracker | Private Budgeting Tool" description="Track your spending and manage budgets privately. No cloud sync, your data stays in your browser." />
            <ExpenseTracker onBack={() => navigate('/')} />
        </>
    );
};

const ColorPaletteWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Color Palette | Designer Contrast Studio" description="Explore color palettes and check accessibility contrast for your next design project." />
            <ColorPalette onBack={() => navigate('/')} />
        </>
    );
};

const ServicesWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="Work With Us | Professional Team Solutions" description="Custom productivity tool development and engineering consulting for high-performing teams." />
            <Services onBack={() => navigate('/')} />
        </>
    );
};

const LegalWrapper = ({ type }) => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title={type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} />
            <Legal type={type} onBack={() => navigate('/')} />
        </>
    );
};

const AboutWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="About Tools for Work | Our Vision" description="Learn about our mission to build high-performance, local-first tools for the modern workforce." />
            <About onBack={() => navigate('/')} />
        </>
    );
};

const YoutubeDownloaderWrapper = () => {
    const navigate = useNavigate();
    return (
        <>
            <SEO title="YouTube Downloader | Private Video Studio" description="Download YouTube videos and audio for offline use. Fast, private, and simple." />
            <YoutubeDownloader onBack={() => navigate('/')} />
        </>
    );
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
                        <div style={{ marginTop: '24px' }}>
                            <Link to="/services" className="button-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', width: 'auto', display: 'inline-flex' }}>
                                Work With Us
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Project Suite</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <li style={{ marginBottom: '16px' }}><Link to="/gantt" className="footer-link">Gantt Chart Pro</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/workload" className="footer-link">Workload Planner</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/roi" className="footer-link">ROI Calculator</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/pomodoro" className="footer-link">Pomodoro Tracker</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/meeting" className="footer-link">Meeting Architect</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/salary" className="footer-link">Salary Calculator</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Engineering & Utilities</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>
                            <li style={{ marginBottom: '16px' }}><Link to="/meta-tags" className="footer-link">Meta Tag Generator</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/password" className="footer-link">Password Generator</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/forge" className="footer-link">Forge Kit (Dev)</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/about" className="footer-link">About Us</Link></li>
                            <li style={{ marginBottom: '16px' }}><Link to="/services" className="footer-link">Services</Link></li>
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
