import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, X, ArrowLeft, ExternalLink, Bookmark, Hash, LayoutGrid, Users } from 'lucide-react';

const Blog = ({ onBack, onNavigateTool }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [filter, setFilter] = useState('All');

    const articles = [
        {
            id: 1105,
            title: "Top 5 Free Productivity Tools for Remote Teams (2025 Edition)",
            category: "Management",
            date: "Feb 06, 2025",
            readTime: "15 min read",
            excerpt: "Exhausted by subscription fees? We've curated the best zero-cost, privacy-first tools to manage projects, track time, and sync your global team.",
            content: `
                <h2>Quality Doesn't Always Have a Price</h2>
                <p>The SaaS market is saturated. Between Trello, Jira, and Monday, a small team can easily spend hundreds of dollars a month just to keep track of their work. But what if you could have professional-grade tools for free? Here are the top 5 tools we recommend for 2025.</p>
                
                <h3>1. Gantt Chart Pro (Project Planning)</h3>
                <p>Most Gantt tools limit your seats or task counts. <a href="#" data-tool="gantt">Gantt Chart Pro</a> allows you to upload any Excel file and visualize complex dependencies instantly. It's the perfect free alternative to TeamGantt.</p>
                
                <h3>2. Pomodoro Tracker (Deep Work)</h3>
                <p>Distraction is the enemy of velocity. Our <a href="#" data-tool="pomodoro">Pomodoro Tracker</a> helps you maintain focus by gamifying the work-rest cycle, with the added benefit of local-first reporting.</p>
                
                <h3>3. Team Sync Matrix (Scheduling)</h3>
                <p>Finding a meeting time shouldn't be a project in itself. The <a href="#" data-tool="availability">Sync Matrix</a> simplifies global coordination better than any paid calendar overlay.</p>
                
                <h3>4. Obsidian (Note Taking)</h3>
                <p>For personal knowledge management, Obsidian remains the gold standard. Like our tools, it's local-first and gives you full ownership of your data.</p>
                
                <h3>5. Forge Kit (Engineering)</h3>
                <p>Technical micro-tasks (JSON, Base64) are often overlooked. <a href="#" data-tool="forge">Forge Kit</a> provides a secure, offline environment for these tasks, replacing dozens of sketchy web utilities.</p>
            `
        },
        {
            id: 1103,
            title: "Deep Work vs. Burnout: The Pomodoro Defense",
            category: "Productivity",
            date: "Feb 05, 2025",
            readTime: "11 min read",
            excerpt: "Learn how to use Pomodoro cycles not just for time management, but as a mental defense mechanism against digital exhaustion.",
            content: `
                <h2>The Myth of the 8-Hour Focus</h2>
                <p>Human cognition wasn't designed for 8 hours of continuous, high-intensity focus. After approximately 90 minutes of brain work, our mental energy peaks and then begins a sharp decline. Pushing through this decline doesn't result in more work; it results in lower quality work and eventual burnout.</p>
                
                <h2>The 25-5 Rhythm</h2>
                <p>Our <a href="#" data-tool="pomodoro">Pomodoro Tracker</a> is built on the proven 25/5 rhythm. By working in 25-minute "sprints" followed by 5-minute "relief" breaks, you allow your brain to clear its cache. This prevents the accumulation of mental fatigue and keeps you in the 'flow zone' for much longer.</p>
                
                <h2>Why Project Tracking Matters</h2>
                <p>A simple timer isn't enough. To truly optimize your day, you need to know <em>where</em> your focus went. By linking your Pomodoro sessions to specific projects, you gain data-driven insights. Are you spending 10 pomodoros on email but only 2 on actual coding? This visual feedback is the first step to behavioral change.</p>
            `
        },
        {
            id: 1104,
            title: "Global Sync: Navigating the Time Zone Trap",
            category: "Management",
            date: "Feb 05, 2025",
            readTime: "13 min read",
            excerpt: "Working in a global team is a superpower, but time zones are its kryptonite. Learn the architecture of a perfect sync strategy.",
            content: `
                <h2>The Cost of 'When are you?'</h2>
                <p>In a distributed team, the question "When can we meet?" often leads to endless Slack threads and calendar gymnastics. This friction adds up, causing delays in decision-making and isolation for team members in fringe time zones.</p>
                
                <h2>The Visual Overlap Solution</h2>
                <p>Traditional calendars are bad at showing <em>müsaitlik</em> (availability) across a dozen locations. This is why we built the <a href="#" data-tool="availability">Team Sync Matrix</a>. Instead of 12 separate calendars, it provides a single, unified grid. By mapping everyone's 9-to-5 window relative to your current location, the 'Golden Hours' for meeting become instantly obvious.</p>
                
                <h2>Async-First, Sync-Optional</h2>
                <p>The goal of finding common meeting slots isn't to have more meetings—it's to have better ones. By identifying when everyone is available, you can reserve that precious overlap for high-bandwidth collaboration, leaving the rest of the day for deep, asynchronous work.</p>
            `
        },
        {
            id: 1101,
            title: "How to Build a UTM Strategy: The Science of Traffic Attribution",
            category: "Marketing",
            date: "Feb 05, 2025",
            readTime: "9 min read",
            excerpt: "Need a free alternative to Bitly or expensive UTM builders? Learn how to architect a consistent tagging system for Google Analytics 4.",
            content: `
                <h2>Attribution is the Key to ROI</h2>
                <p>If you don't know which campaign drove a sale, you're effectively flying blind. Traffic attribution is the process of identifying which marketing channels, ads, or links resulted in a user action. The industry standard for this is UTM (Urchin Tracking Module) parameters.</p>
                
                <h2>The 5 Pillars of UTM Tracking</h2>
                <p>A perfect tracking link uses five core parameters. Our <a href="#" data-tool="utm">UTM Architect</a> tool helps you build these without syntax errors:</p>
                <ul>
                    <li><strong>Source:</strong> The platform (e.g., twitter, linkedin).</li>
                    <li><strong>Medium:</strong> The category (e.g., cpc, organic, email).</li>
                    <li><strong>Campaign:</strong> The strategic name (e.g., product_launch_2025).</li>
                    <li><strong>Term:</strong> Used for paid keywords.</li>
                    <li><strong>Content:</strong> To differentiate version (e.g., A/B testing variations).</li>
                </ul>
                
                <h2>Strategy: The Lowercase Rule</h2>
                <p>Google Analytics is case-sensitive. If you use "Email" in one link and "email" in another, they will appear as two separate rows in your reports. Modern teams use our UTM Architect to enforce a consistent, lowercase-only naming convention across the organization.</p>
            `
        },
        {
            id: 1102,
            title: "Best Free Markdown Editor 2025: Why Engineers Prefer Local-First",
            category: "Engineering",
            date: "Feb 05, 2025",
            readTime: "10 min read",
            excerpt: "Discover why a browser-based, offline-first Markdown editor is the safest way to document project technical specifications.",
            content: `
                <h2>The Power of Structured Text</h2>
                <p>Markdown is the lingua franca of technical communication. From GitHub README files to large documentation sites, its simplicity allows engineers to focus on content rather than styling. However, a standard text editor lacks the visual feedback needed for complex layouts.</p>
                
                <h2>The Flow State Workspace</h2>
                <p>Our <a href="#" data-tool="markdown">Markdown Pro</a> editor is designed to minimize friction. By providing a live-preview side-by-side with your code, it allows you to see exactly how your headers, code blocks, and lists will render in real-time.</p>
                
                <h2>Security in Documentation</h2>
                <p>Many online markdown editors sync your drafts to a cloud database. For proprietary system architectures or internal project requirements, this is a security risk. Markdown Pro is local-first. Your drafts are stored in your browser's LocalStorage and never touch our servers. This ensures your technical specifications remain private.</p>
            `
        },
        {
            id: 101,
            title: "Why Local-First Dev Tools Are Safer: A Security Deep Dive",
            category: "Engineering",
            date: "Jan 28, 2025",
            readTime: "8 min read",
            excerpt: "Stop pasting your API keys and JWTs into online formatters. Learn why local-first utilities like Forge Kit are the new standard for operational security.",
            content: `
                <h2>The Hidden Danger of Online Utilities</h2>
                <p>Every day, thousands of developers paste sensitive JSON payloads, JWT tokens, and Base64 strings into random "free online formatters." While convenient, this practice poses a significant security risk. You are essentially handing over your internal data structures, and potentially credentials, to an unknown third-party server.</p>
                <p>In many cases, these free tools monetize by collecting data. Your production database dump or proprietary API schema could be logged, indexed, or even sold.</p>
                
                <h2>The Shift to Client-Side Cryptography</h2>
                <p>Modern browsers now support the <strong>Web Crypto API</strong>, a powerful set of primitives that allows for cryptographic operations to happen entirely within the user's device. This eliminates the need to send data to a backend for processing.</p>
                <p>Our <a href="#" data-tool="forge">Forge Kit</a> is engineering based on this "Local-First" philosophy. When you generate a SHA-256 hash or decode a Base64 string using our tools, the data never leaves your RAM. It is processed by your browser's engine and displayed instantly.</p>
                
                <h2>Operational Security Checklist</h2>
                <ul>
                    <li><strong>Audit your toolset:</strong> Ensure your team isn't using unverified web utilities for production data.</li>
                    <li><strong>Block known data sinks:</strong> Configure corporate firewalls to block generic "online converter" sites that require server-side processing.</li>
                    <li><strong>Use offline-capable tools:</strong> Tools like Forge Kit work without an internet connection, guaranteeing zero data egress.</li>
                </ul>
            `
        },
        {
            id: 201,
            title: "Mastering Critical Path Analysis with Gantt Charts",
            category: "Management",
            date: "Feb 01, 2025",
            readTime: "12 min read",
            excerpt: "The Critical Path Method (CPM) is the backbone of successful project delivery. Learn how to visualize and secure your timeline using modern Gantt tools.",
            content: `
                <h2>Understanding the Critical Path</h2>
                <p>In any complex project, the Critical Path is the sequence of dependent tasks that determines the shortest possible duration for the project. If any task on this path is delayed, the entire project deadline slips. Identifying this path is not just an academic exercise; it's a survival skill for Project Managers.</p>
                
                <h2>Automation vs. Manual Calculation</h2>
                <p>Traditionally, calculating the critical path required complex network diagrams. However, modern tools like <a href="#" data-tool="gantt">Gantt Chart Pro</a> automate this process. By simply defining your start dates and durations in an Excel sheet, the tool visually aligns your tasks.</p>
                <p>Visualizing dependencies helps you identifying "slack" (float) in non-critical tasks. This allows you to resource-level your team—moving resources from non-critical tasks to critical ones to secure the deadline.</p>

                <h2>Key Metrics to Watch</h2>
                <ul>
                    <li><strong>Total Float:</strong> How much a task can slip without delaying the project.</li>
                    <li><strong>Free Float:</strong> How much a task can slip without delaying its immediate successor.</li>
                    <li><strong>Resource Density:</strong> The ratio of critical tasks assigned to a single individual.</li>
                </ul>
            `
        },
        {
            id: 202,
            title: "Stop Multitasking: How Workload Visualization Prevents Burnout",
            category: "Productivity",
            date: "Feb 02, 2025",
            readTime: "10 min read",
            excerpt: "Context switching kills 40% of productivity. Learn how to use a visual Resource Planner to protect your deep work time.",
            content: `
                <h2>The 20% Penalty</h2>
                <p>Research shows that every time an engineer switches contexts between different projects or complex tasks, they lose approximately 20% of their cognitive capacity to "re-orientation." If a developer is assigned to three different projects simultaneously, they aren't working 33% on each. They are likely losing 60% of their time to context switching, leaving only a fraction for deep work.</p>
                
                <h2>Visualizing the Invisible</h2>
                <p>Standard project lists don't show these overlaps. A list of tasks looks linear. This is why <a href="#" data-tool="workload">Workload Pro</a> uses a "Collision Detection" algorithm. By mapping task durations on a timeline grouped by assignee, overlapping commitments become blazing red alerts.</p>
                
                <h2>Strategies to Reduce Switch Cost</h2>
                <ul>
                    <li><strong>Batching:</strong> Group similar tasks (e.g., code review, meetings) into dedicated blocks.</li>
                    <li><strong>Maker Schedules:</strong> Reserve 4-hour blocks of uninterrupted time for engineering work.</li>
                    <li><strong>Sequential Assignment:</strong> Avoid assigning parallel critical tasks to the same person.</li>
                </ul>
            `
        },
        {
            id: 301,
            title: "Eisenhower Matrix 2.0: Agile Prioritization",
            category: "Productivity",
            date: "Feb 03, 2025",
            readTime: "9 min read",
            excerpt: "Adapting the classic 4-Quadrant system for modern software development. How to handle Technical Debt vs. Feature Work.",
            content: `
                <h2>Beyond 'Urgent' and 'Important'</h2>
                <p>The classic Eisenhower Matrix is brilliant for personal productivity, but how does it apply to a Scrum team? We need to redefine the axes for software development.</p>
                
                <h3>Quadrant 1: Operational Crises (Do Now)</h3>
                <p>Production outages, P0 bugs, and blocking compliance issues. These are both urgent and important. If you ignore them, the business stops. Use the <a href="#" data-tool="strategy">Strategy Matrix</a> to isolate these items daily.</p>
                
                <h3>Quadrant 2: Strategic Engineering (Schedule)</h3>
                <p>This is where high-performing teams live. Refactoring legacy code, writing documentation, and setting up CI/CD pipelines. These are important but rarely "urgent" until they break. You must artificially create urgency for these tasks by scheduling them.</p>
                
                <h3>Quadrant 3: The Feature Factory (Delegate)</h3>
                <p>Requests that seem urgent (because a stakeholder is shouting) but add little long-term value. These are candidate for delegation or standardizing into templates.</p>
            `
        },
        {
            id: 401,
            title: "Bridge the Gap: O2O Marketing with Dynamic QR",
            category: "Marketing",
            date: "Feb 04, 2025",
            readTime: "7 min read",
            excerpt: "Online-to-Offline (O2O) is the new frontier. How high-fidelity QR codes are driving retail foot traffic to digital conversion funnels.",
            content: `
                <h2>The QR Renaissance</h2>
                <p>Post-2020, QR codes have become ubiquitous. However, most brands are still using ugly, black-and-white checkers that break their design language. <a href="#" data-tool="qr">Smart QR Studio</a> allows you to embed brand colors and logos directly into the data matrix.</p>
                
                <h2>Tracking Physical Conversion</h2>
                <p>By appending UTM parameters to the URLs encoded in your QRs, you can track the exact ROI of a physical billboard or magazine ad in your Google Analytics. This closes the loop between "Brand Awareness" and "Direct Response."</p>
                
                <h2>Best Practices for Print</h2>
                <ul>
                    <li><strong>Error Correction Level:</strong> Always set to 'High' (H) if you plan to add a logo to the center. This ensures the code remains scannable even if 30% is covered.</li>
                    <li><strong>Contrast Ratio:</strong> Ensure there is high contrast between the foreground and background. Dark blue on white works; light grey on white does not.</li>
                    <li><strong>Call to Action:</strong> Never place a QR code without a frame saying "Scan to [Benefit]."</li>
                </ul>
            `
        },
        {
            id: 501,
            title: "Data Migrations: JSON to CSV and Back Again",
            category: "Engineering",
            date: "Feb 04, 2025",
            readTime: "8 min read",
            excerpt: "Why the flat-file vs. nested-object debate is eternal, and how to seamlessly translate between them for data analysis.",
            content: `
                <h2>The Structure Mismatch</h2>
                <p>Modern APIs and NoSQL databases speak JSON (JavaScript Object Notation). It's nested, flexible, and hierarchical. However, the business world speaks CSV (Common Separated Values) because Excel is still the king of analysis.</p>
                
                <h2>Flattening the Curve</h2>
                <p>Converting JSON to CSV isn't just about changing delimiters. It involves "flattening" nested objects. For example, turning <code>{ user: { address: { city: "NY" } } }</code> into a column named <code>user.address.city</code>.</p>
                <p>Our <a href="#" data-tool="converter">Smart Converter</a> handles this recursive flattening automatically, allowing engineers to give Product Managers data in a format they can actually use.</p>
            `
        },
        {
            id: 601,
            title: "Web Asset Optimization: Speed is SEO",
            category: "Engineering",
            date: "Feb 05, 2025",
            readTime: "11 min read",
            excerpt: "Core Web Vitals are a ranking factor. Learn why resizing and formatting images locally is better than server-side approaches.",
            content: `
                <h2>Largest Contentful Paint (LCP)</h2>
                <p>Google's LCP metric measures how long it takes for the main content of your page to load. In 90% of cases, this "main content" is a hero image. If you are serving a 4MB PNG where a 50KB WebP would suffice, you are killing your SEO ranking.</p>
                
                <h2>Local Processing vs. Cloud</h2>
                <p>Traditional workflows involve uploading an image to a CMS, waiting for the server to process it, and downloading the result. This is slow and privacy-invasive. Tools like <a href="#" data-tool="image">Pixel Studio</a> use the browser's Canvas API and WebAssembly to compress images instantly on your device.</p>
                
                <h2>Format Strategy</h2>
                <ul>
                    <li><strong>JPEG:</strong> Photographs with complex gradients.</li>
                    <li><strong>PNG:</strong> Interface assets requiring transparency.</li>
                    <li><strong>WebP:</strong> The modern standard. Offers 30% better compression than JPEG with same quality.</li>
                </ul>
            `
        },
        {
            id: 701,
            title: "Asynchronous Work: The Remote Team Superpower",
            category: "Management",
            date: "Feb 05, 2025",
            readTime: "14 min read",
            excerpt: "How to escape the 'Zoom Fatigue' trap by utilizing visual artifacts and local-first documentation tools.",
            content: `
                <h2>The Meeting That Should Have Been an Email</h2>
                <p>We've all been there. But effectively replacing meetings requires better artifacts. You can't just send a text wall. You need to send a visual plan.</p>
                
                <h2>The Artifact-Driven Workflow</h2>
                <p>Instead of a daily standup to discuss who is doing what, a shared <a href="#" data-tool="workload">Workload Chart</a> provides instant clarity. Instead of a roadmap meeting, a comprehensive <a href="#" data-tool="gantt">Gantt view</a> allows stakeholders to self-serve the status of dependencies.</p>
                <p>This shift to "pull-based" information consumption allows engineers to stay in the flow state for longer periods, drastically increasing output quality.</p>
            `
        },
        {
            id: 801,
            title: "Stakeholder Management 101: Visualizing Reality",
            category: "Management",
            date: "Jan 30, 2025",
            readTime: "9 min read",
            excerpt: "Non-technical stakeholders don't read JIRA tickets. They look at timelines. How to translate complex dev progress into executive summaries.",
            content: `
                <h2>The Translation Layer</h2>
                <p>There is often a disconnect between the engineering reality (unforeseen complexity, technical debt) and executive expectations (linear progress). The Project Manager's job is to be the translation layer.</p>
                <p>Using high-fidelity visuals rather than spreadsheet rows helps bridge this gap. Showing a dependency chain in <a href="#" data-tool="gantt">Gantt Pro</a> visually demonstrates <em>why</em> Feature B cannot start until Framework A is refactored.</p>
                <p>Visuals trigger a different part of the brain than text. They make constraints "feel" real to stakeholders who might otherwise push for impossible deadlines.</p>
            `
        },
        {
            id: 901,
            title: "The Rise of 'Offline-First' Developer Toolkits",
            category: "Engineering",
            date: "Jan 29, 2025",
            readTime: "8 min read",
            excerpt: "Why the next generation of developer tools is moving back to the desktop (and the browser edge). Speed, Privacy, and Reliability.",
            content: `
                <h2>The Cloud Latency Tax</h2>
                <p>For the last decade, we moved everything to the cloud. IDEs, compilers, formatters. But we reached a tipping point where the latency of a round-trip network request is noticeable and annoying for micro-tasks.</p>
                
                <h2>The Edge is Your Browser</h2>
                <p>With the advent of WebAssembly (Wasm) and powerful PWA capabilities, the browser is no longer just a document viewer; it's an operating system. Tools like <a href="#" data-tool="forge">Forge Kit</a> run natively on your machine.</p>
                <p>This "Offline-First" approach offers three massive benefits:</p>
                <ol>
                    <li><strong>Speed:</strong> Zero network latency.</li>
                    <li><strong>Privacy:</strong> Data sovereignty compliance (GDPR/CCPA).</li>
                    <li><strong>Resilience:</strong> Work continues even when AWS is down.</li>
                </ol>
            `
        },
        {
            id: 102,
            title: "Original: The Eisenhower Matrix Strategy",
            category: "Productivity",
            date: "Jan 25, 2025",
            readTime: "7 min read",
            excerpt: "It's not just for CEOs. See how senior engineers use the 4-Quadrant system to prioritize technical debt against feature work.",
            content: `
                <h2>Urgent vs. Important</h2>
                <p>In software development, everything feels urgent. A bug in production, a failing CI pipelines, or a DM from the PM. But are they all important? The <a href="#" data-tool="strategy">Strategy Matrix</a> tool allows you to visually categorize tasks into four distinct quadrants:</p>
                <ul>
                    <li><strong>Do First (Urgent & Important):</strong> Server outages, critical blockers.</li>
                    <li><strong>Schedule (Important, Not Urgent):</strong> Refactoring technical debt, documentation.</li>
                    <li><strong>Delegate (Urgent, Not Important):</strong> Routine meetings, minor UI tweaks.</li>
                    <li><strong>Delete (Neither):</strong> Doom-scrolling Hacker News.</li>
                </ul>
            `
        },
        {
            id: 103,
            title: "Original: Preventing Team Burnout",
            category: "Management",
            date: "Jan 22, 2025",
            readTime: "6 min read",
            excerpt: "Gantt charts show you 'when' tasks happen, but Workload charts show you 'who' is drowning. How to spot collisions before they happen.",
            content: `
                <h2>The Invisible Overload</h2>
                <p>A project plan might look perfect on a Gantt chart. All dependencies are met, and the timeline is green. But if one senior engineer is assigned to 3 critical path items simultaneously, that plan is a fantasy.</p>
                <p>Our <a href="#" data-tool="workload">Workload Pro</a> tool introduces "Collision Detection" for resource management. It parses your Excel schedules and highlights overlapping tasks for each assignee.</p>
            `
        },
        {
            id: 2,
            title: "Original: Maximizing SEO with Smart QR Code Strategies",
            category: "Marketing",
            date: "Jan 15, 2025",
            readTime: "6 min read",
            excerpt: "QR codes are back and more powerful than ever. Learn how to bridge the gap between physical marketing and digital SEO analytics.",
            content: `
                <h2>The QR Resurgence</h2>
                <p>QR codes have evolved from simple links to sophisticated marketing bridge systems. By customizing your QR codes with branded colors and high-resolution icons, you increase scan rates by up to 40%.</p>
                <p>Using a tool like <a href="#" data-tool="qr">Smart QR Studio</a>, you can generate high-contrast designs that are optimized for both mobile scanning and print resolution.</p>
            `
        }
    ];

    const categories = ['All', ...new Set(articles.map(a => a.category))];
    const filteredArticles = filter === 'All' ? articles : articles.filter(a => a.category === filter);

    const handleArticleLinkClick = (e) => {
        const toolId = e.target.getAttribute('data-tool');
        if (toolId) {
            e.preventDefault();
            onNavigateTool(toolId);
            setSelectedArticle(null);
        }
    };

    const ArticleModal = ({ article, onClose }) => {
        useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }, []);

        return createPortal(
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100dvh',
                    background: 'rgba(15, 23, 42, 0.98)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    padding: '0',
                    display: 'block'
                }}
            >
                <div className="container" style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '120px', position: 'relative' }}>
                    <button onClick={onClose} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', position: 'sticky', top: '20px', zIndex: 10, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)' }}>
                        <ArrowLeft size={18} /> Back to Guides
                    </button>

                    <div style={{ position: 'relative' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '100px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{article.category}</span>
                        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'white', marginTop: '24px', marginBottom: '32px', lineHeight: 1.1 }}>{article.title}</h1>

                        <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)', marginBottom: '48px', fontSize: '0.95rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '32px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} /> {article.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={18} /> {article.readTime}</span>
                        </div>

                        <div
                            className="article-body"
                            onClick={handleArticleLinkClick}
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.8 }}
                        />
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .article-body h2 { color: white; margin: 40px 0 20px; font-size: 1.8rem; }
                    .article-body p { margin-bottom: 24px; }
                    .article-body ul { margin-bottom: 24px; padding-left: 20px; }
                    .article-body li { margin-bottom: 12px; }
                    .article-body a { color: var(--accent-primary); text-decoration: none; font-weight: 600; border-bottom: 1px solid transparent; transition: 0.2s; }
                    .article-body a:hover { border-bottom-color: var(--accent-primary); }
                    .article-body strong { color: white; }
                `}} />
            </motion.div>,
            document.body
        );
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back to Home
            </button>

            <header style={{ marginBottom: '64px' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Workflow Guides</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '700px', lineHeight: 1.6 }}>
                    Expert insights on project management, secure engineering practices, and high-performance workflows.
                </p>

                <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '100px',
                                background: filter === cat ? 'white' : 'rgba(255,255,255,0.05)',
                                color: filter === cat ? '#0f172a' : 'var(--text-muted)',
                                border: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: '0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <div className="menu-grid">
                {filteredArticles.map(article => (
                    <motion.div
                        key={article.id}
                        whileHover={{ y: -8 }}
                        className="glass-panel"
                        onClick={() => setSelectedArticle(article)}
                        style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{article.category}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{article.date}</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: 700, lineHeight: 1.3 }}>{article.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', flexGrow: 1, marginBottom: '24px', lineHeight: 1.6 }}>{article.excerpt}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' }}>
                            Read Guide <ArrowRight size={18} className="text-blue-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedArticle && (
                    <ArticleModal
                        article={selectedArticle}
                        onClose={() => setSelectedArticle(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blog;
