import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, FileCode, QrCode, ArrowRight, Zap, Shield, Globe, Camera, LayoutGrid, Users, Terminal, Megaphone, FileText } from 'lucide-react';

const projectTools = [
  {
    id: 'gantt',
    name: 'Gantt Chart Pro',
    category: 'Analysis',
    description: 'Transform Excel files into professional Gantt charts with hierarchy and progress tracking.',
    icon: <BarChart2 size={32} />,
    color1: '#3b82f6',
    color2: '#22d3ee'
  },
  {
    id: 'workload',
    name: 'Workload Pro',
    category: 'Resource',
    description: 'Analyze team allocation and prevent burnout by identifying overlapping task collisions.',
    icon: <Users size={32} />,
    color1: '#8b5cf6',
    color2: '#d946ef'
  },
  {
    id: 'strategy',
    name: 'Strategy Matrix',
    category: 'Priority',
    description: 'Master your time with the Eisenhower Matrix. Organize tasks by urgency and impact.',
    icon: <LayoutGrid size={32} />,
    color1: '#ef4444',
    color2: '#f59e0b'
  }
];

const utilityTools = [
  {
    id: 'image',
    name: 'Pixel Studio',
    category: 'Design',
    description: 'High-speed image resizing and format conversion. Process assets entirely locally.',
    icon: <Camera size={32} />,
    color1: '#ec4899',
    color2: '#f43f5e'
  },
  {
    id: 'qr',
    name: 'Smart QR Studio',
    category: 'Marketing',
    description: 'Generate branded, high-res QR codes for URLs and WiFi access instantly.',
    icon: <QrCode size={32} />,
    color1: '#f59e0b',
    color2: '#ea580c'
  },
  {
    id: 'forge',
    name: 'Forge Kit',
    category: 'Engineering',
    description: 'Essential dev tools: JSON Prettify, Base64, SHA-256 Hash, and URL Encoding utilities.',
    icon: <Terminal size={32} />,
    color1: '#6366f1',
    color2: '#a855f7'
  },
  {
    id: 'converter',
    name: 'Smart Converter',
    category: 'Engineering',
    description: 'Secure, local-first transformation between JSON and CSV data formats.',
    icon: <FileCode size={32} />,
    color1: '#10b981',
    color2: '#059669'
  },
  {
    id: 'utm',
    name: 'UTM Architect',
    category: 'Marketing',
    description: 'Create trackable campaign links with proper UTM parameters for global analytics.',
    icon: <Megaphone size={32} />,
    color1: '#f97316',
    color2: '#fbbf24'
  },
  {
    id: 'markdown',
    name: 'Markdown Pro',
    category: 'Engineering',
    description: 'A distraction-free, local-first markdown editor with instant live preview and persistence.',
    icon: <FileText size={32} />,
    color1: '#0ea5e9',
    color2: '#6366f1'
  }
];

const faqs = [
  {
    q: "Are the tools really private?",
    a: "Yes. We use client-side logic only. Your files (Excel, Images, JSON) are processed in your browser memory and never uploaded to any server. This makes 'Tools for Work' suitable for sensitive corporate data."
  },
  {
    q: "Do I need to pay or sign up?",
    a: "No. Our mission is to provide high-quality developer and productivity tools for free, without the friction of accounts or subscriptions."
  },
  {
    q: "How do I save my work?",
    a: "Tools like the Strategy Matrix and Markdown Pro use LocalStorage to keep your data on your device. Other tools allow you to export your results as PDF, Excel, or Image files."
  }
];

const Menu = ({ onSelectTool }) => {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '60px', paddingBottom: '120px' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.2)' }}
        >
          <Zap size={14} /> NEW: FORGE KIT DEV TOOLS ADDED
        </motion.div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, marginBottom: '24px', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-2px' }}>
          Tools for Work
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', fontWeight: 300 }}>
          Precision-engineered tools for high-performance teams and creators. Local-first, private, and blazing fast.
        </p>
      </header>

      {/* Project Management Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Project Suite</h2>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }} />
        </div>
        <div className="menu-grid">
          {projectTools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool.id)} />)}
        </div>
      </section>

      {/* Utilities Section */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Asset & Engineering Suite</h2>
          <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }} />
        </div>
        <div className="menu-grid">
          {utilityTools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool.id)} />)}
        </div>
      </section>

      {/* Trust Band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', padding: ' clamp(30px, 5vw, 60px)', borderRadius: '32px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', marginTop: '100px' }}>
        <TrustItem icon={<Shield />} title="Private by Design" desc="We never see your data. Everything stays on your machine." />
        <TrustItem icon={<Zap />} title="Hyper Speed" desc="Hardware-accelerated rendering for large datasets and assets." />
        <TrustItem icon={<Globe />} title="Open Access" desc="No signups or subscription walls. Just tools that work." />
      </div>

      <FAQSection />
    </div>
  );
};

const ToolCard = ({ tool, onClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-panel"
    onClick={onClick}
    style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', background: 'rgba(30, 41, 59, 0.4)' }}
  >
    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `linear-gradient(135deg, ${tool.color1}, ${tool.color2})`, display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '24px', color: 'white', display: 'flex', justifyContent: 'center' }}>
      {tool.icon}
    </div>
    <span style={{ color: tool.color1, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{tool.category}</span>
    <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 700 }}>{tool.name}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '24px', fontWeight: 300 }}>{tool.description}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>
      Launch <ArrowRight size={16} className="text-blue-400" />
    </div>
  </motion.div>
);

const FAQSection = () => (
  <section style={{ marginTop: '120px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>Common Questions</h2>
      <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
      {faqs.map((faq, i) => (
        <div key={i} className="glass-panel" style={{ padding: '32px', background: 'rgba(255,255,255,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '16px', fontWeight: 700 }}>{faq.q}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const TrustItem = ({ icon, title, desc }) => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: 'var(--accent-primary)' }}>{icon}</div>
    <div>
      <h4 style={{ color: 'white', marginBottom: '4px' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{desc}</p>
    </div>
  </div>
);

export default Menu;
