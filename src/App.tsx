import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Server, Shield, Activity, Terminal as TerminalIcon, 
  ChevronDown, ExternalLink, Download, Mail, Phone, MapPin,
  Menu, X, FileText, Cpu, Network, Briefcase, GraduationCap,
  Layers, HardDrive, CheckCircle2, Lock, Zap, Clock, ArrowRight,
  TrendingUp, Award, RefreshCw, Eye
} from 'lucide-react';
import profilePhoto from './assets/Abhishek_Singh_JPG.jpg';

// Helper for public asset paths
const getAssetUrl = (filename: string) => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${filename.replace(/^\//, '')}`;
};

// Social Icons as SVGs for reliability
const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.22a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function App() {
  const [selectedCert, setSelectedCert] = useState<{ name: string; issuer: string; id?: string; file: string | null } | null>(null);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-300 relative overflow-x-hidden">
      {/* Dynamic Cyber Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
      
      {/* Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <Header />
      
      <main className="relative z-10">
        <Hero />
        <StatsBar />
        <InteractiveTerminal />
        <ArchitectureVisualizer />
        <AboutSection />
        <SkillsMatrix />
        <CareerJourney />
        <DatacenterSection />
        <ProjectsSection />
        <CertificationsSection onSelectCert={setSelectedCert} />
        <PhilosophySection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// Navigation Header
// ----------------------------------------------------
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const sections = ['home', 'terminal', 'architecture', 'about', 'skills', 'career', 'projects', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#home', id: 'home' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Career', href: '#career', id: 'career' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <TerminalIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>Abhishek Singh</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] font-mono text-slate-400">Cloud & DevOps Engineer</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getAssetUrl('Abhishek_Singh_Resume_30-08-2026.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/abhishek-singh-4489ab265"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-800 transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedInIcon />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0d14]/95 border-b border-slate-800 px-6 py-6 overflow-hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                    activeSection === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-3">
                <a
                  href={getAssetUrl('Abhishek_Singh_Resume_30-08-2026.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-4 h-4" /> Download Official Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----------------------------------------------------
// Hero Section
// ----------------------------------------------------
function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono font-medium mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.9% PRODUCTION UPTIME SLA • CLOUD & DEVOPS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Architecting Resilient <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                  Cloud Infrastructure
                </span>
                <br />& Automated Pipelines
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Results-driven <strong className="text-white font-semibold">Cloud Engineer</strong> with hands-on expertise across <strong className="text-blue-400">AWS</strong>, <strong className="text-blue-400">GCP</strong>, <strong className="text-blue-400">VMware ESXi virtualization</strong>, Linux administration (Ubuntu), and enterprise datacenter operations. Standardizing CI/CD provisioning to accelerate release velocity and ensure high availability.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <a
                  href="#architecture"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] hover:-translate-y-0.5"
                >
                  <Layers className="w-4 h-4" />
                  <span>Explore Infrastructure</span>
                </a>
                
                <a
                  href={getAssetUrl('Abhishek_Singh_Resume_30-08-2026.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-sm transition-all hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download Resume</span>
                </a>

                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-900/50 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Tech Highlights */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-blue-400" /> AWS & GCP
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" /> VMware ESXi
                </div>
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-amber-400" /> Ubuntu Linux
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" /> OCI & Fortinet Certified
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual & Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Animated Radar Pulse Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping [animation-duration:4s] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-cyan-500/20 [animation-duration:6s] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-transparent rounded-full blur-2xl -z-10" />

              {/* Profile Avatar Card */}
              <div className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full p-2.5 bg-gradient-to-b from-blue-500/40 via-slate-800 to-slate-900 border-2 border-blue-500/40 shadow-[0_0_50px_rgba(37,99,235,0.3)] relative group">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                  {!imageError ? (
                    <img
                      src={profilePhoto}
                      alt="Abhishek Singh - Cloud & DevOps Engineer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <TerminalIcon className="w-16 h-16 text-blue-400 mb-2" />
                      <span className="font-bold text-white text-lg">Abhishek Singh</span>
                      <span className="text-xs text-blue-400 font-mono">Cloud Engineer</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Orbiting Tech Badges */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-2 -left-4 bg-[#0d121d]/90 backdrop-blur-md border border-blue-500/30 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  <div>
                    <div className="text-[11px] font-bold text-white">AWS & GCP</div>
                    <div className="text-[9px] text-slate-400 font-mono">Multi-Cloud</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 -right-6 bg-[#0d121d]/90 backdrop-blur-md border border-emerald-500/30 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div>
                    <div className="text-[11px] font-bold text-white">VMware ESXi</div>
                    <div className="text-[9px] text-slate-400 font-mono">Virtualization</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-4 left-6 bg-[#0d121d]/90 backdrop-blur-md border border-purple-500/30 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-semibold text-slate-200">20% Deployment Speedup</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-slate-500 text-xs font-mono">
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Professional Stats Bar
// ----------------------------------------------------
function StatsBar() {
  const stats = [
    { label: "Production Workload Uptime", value: "99.9%", detail: "SLA Guaranteed across AWS & GCP", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { label: "Deployment Acceleration", value: "20%", detail: "Through CI/CD Pipeline Automation", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { label: "Cloud & Virtualization Platforms", value: "AWS, GCP, ESXi", detail: "Multi-Cloud & Hypervisors", icon: <Cloud className="w-5 h-5 text-blue-400" /> },
    { label: "Industry Certifications", value: "5+ Credentials", detail: "OCI Architect, Fortinet & Google", icon: <Award className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <section className="py-8 bg-[#0b0f19] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:border-blue-500/30 transition-all group">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">{stat.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Interactive Linux / Cloud Terminal Emulator
// ----------------------------------------------------
function InteractiveTerminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'whoami',
      output: 'Abhishek Singh — Cloud Engineer & DevOps Specialist (Purvaco Technology Pvt. Ltd.)'
    },
    {
      cmd: 'status --sla',
      output: 'All cloud clusters operating normally. AWS: ACTIVE | GCP: ACTIVE | VMware ESXi: HEALTHY | Uptime: 99.9%'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    let res: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        res = 'Available commands: whoami, skills, infra, sla, certs, experience, contact, clear, date';
        break;
      case 'whoami':
        res = 'Abhishek Singh | Cloud Engineer | B.Tech CSE (Nitra Technical Campus) | Specialist in AWS, GCP, VMware ESXi & Linux.';
        break;
      case 'skills':
        res = 'Cloud: AWS (EC2, S3, VPC, IAM, RDS), GCP, AlloyDB | Virt: VMware ESXi | OS: Ubuntu Linux, Windows Server | Net: DNS, DHCP, VPN, Firewalls | DevOps: CI/CD, Plesk, Automation.';
        break;
      case 'infra':
      case 'status --sla':
      case 'sla':
        res = 'AWS (EC2/RDS/S3) [OK] • GCP (AlloyDB/Compute) [OK] • VMware ESXi Cluster [OK] • SLA Maintained: 99.9% Uptime.';
        break;
      case 'certs':
        res = '1. Oracle Cloud Infrastructure 2025 Architect Associate • 2. Fortinet Cybersecurity (5144971646AS) • 3. Google Cybersecurity • 4. AlloyDB Resource Management.';
        break;
      case 'experience':
        res = 'Cloud Engineer @ Purvaco Technology Pvt. Ltd. (Sept 2025 – Present). Managing AWS/GCP, VMware ESXi, Ubuntu Linux, and datacenter hardware.';
        break;
      case 'contact':
        res = 'Email: 7080dhiru@gmail.com | Phone: +91 9935953563 | Location: Ghaziabad, UP, India | LinkedIn: linkedin.com/in/abhishek-singh-4489ab265';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'date':
        res = new Date().toUTCString();
        break;
      default:
        res = `zsh: command not found: ${rawCmd}. Type "help" for a list of valid commands.`;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output: res }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const quickCommands = ['help', 'whoami', 'skills', 'infra', 'experience', 'certs', 'contact'];

  return (
    <section id="terminal" className="py-20 bg-[#07090e] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLOUD SHELL</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Interactive Engineer Console</h2>
          <p className="text-sm text-slate-400 mt-2">Test my background and infrastructure knowledge directly via shell commands.</p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-xs text-slate-500 font-mono">Try running:</span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => executeCommand(q)}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-blue-900/40 text-blue-400 hover:text-blue-300 border border-slate-800 text-xs font-mono transition-colors"
            >
              ${q}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#0d121f] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-semibold">abhishek@cloud-node-01: ~</span>
            </div>
            <div className="text-[11px] text-slate-500">bash / zsh 5.9</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-4">
            <div className="text-slate-500 text-xs">
              Welcome to Abhishek Singh Cloud Terminal v2.4 (x86_64-pc-linux-gnu).<br />
              Type <span className="text-blue-400">help</span> to view available system telemetry commands.
            </div>

            {history.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">abhishek@prod-cloud</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-white font-semibold">{item.cmd}</span>
                </div>
                <div className="text-slate-300 pl-4 border-l border-slate-800 py-0.5 text-xs leading-relaxed">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Live Input Line */}
            <div className="flex items-center gap-2 text-slate-300 pt-2">
              <span className="text-emerald-400">abhishek@prod-cloud</span>
              <span className="text-slate-600">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-slate-500">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. whoami, skills, certs)..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-slate-700 focus:ring-0"
              />
            </div>
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Interactive Architecture & CI/CD Pipeline Visualizer
// ----------------------------------------------------
function ArchitectureVisualizer() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const pipelineSteps = [
    {
      id: 1,
      title: "Code & Version Control",
      badge: "Source Layer",
      tech: "Git, GitHub, GitHub Actions",
      icon: <TerminalIcon className="w-5 h-5 text-blue-400" />,
      desc: "Version controlled repositories with automated webhooks and standardized branch protection policies."
    },
    {
      id: 2,
      title: "CI/CD & Provisioning Workflows",
      badge: "Automation (20% Faster)",
      tech: "Jenkins, Pipelines, Plesk",
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      desc: "Standardized deployment automation pipelines reducing deployment time by 20% across environments."
    },
    {
      id: 3,
      title: "Virtualization & Hypervisor Layer",
      badge: "VMware Infrastructure",
      tech: "VMware ESXi, VMs, Snapshots",
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      desc: "Hypervisor management, capacity planning, VM provisioning, snapshot schedules, and high availability."
    },
    {
      id: 4,
      title: "Multi-Cloud Production Infrastructure",
      badge: "AWS & GCP",
      tech: "AWS (EC2, S3, VPC, RDS), GCP, AlloyDB",
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      desc: "Multi-cloud hosting maintaining 99.9% uptime SLA with continuous rightsizing and cost optimization."
    },
    {
      id: 5,
      title: "Security, IAM & Hardening",
      badge: "Cybersecurity",
      tech: "Firewall Policies, VPN, IAM, Compliance",
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      desc: "Enforcing infrastructure hardening, zero-trust IAM access controls, and Fortinet cybersecurity best practices."
    },
    {
      id: 6,
      title: "Monitoring, SLA & DR Ops",
      badge: "99.9% SLA & Continuity",
      tech: "Proactive Monitoring, RAID, Backups",
      icon: <Activity className="w-5 h-5 text-rose-400" />,
      desc: "Continuous proactive monitoring, rapid incident response, datastore backups, and disaster recovery execution."
    }
  ];

  return (
    <section id="architecture" className="py-24 bg-[#0a0d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>INFRASTRUCTURE TOPOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            End-to-End Cloud & DevOps Architecture
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            How I architect, secure, virtualize, and automate production workloads from code push to 99.9% SLA uptime.
          </p>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              className={`p-6 rounded-2xl bg-slate-900/60 border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                activeStep === idx 
                  ? 'border-blue-500 bg-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.2)] -translate-y-1' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Stage 0{step.id}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono font-medium text-blue-400 mb-1">{step.badge}</div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{step.desc}</p>
              
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="text-slate-500">Tech:</span>
                <span className="text-slate-300 font-semibold">{step.tech}</span>
              </div>

              {/* Glowing Corner Accent */}
              {activeStep === idx && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Multi-Cloud & Hypervisor Interconnect Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Hybrid Cloud & Datacenter Reliability Model</h4>
              <p className="text-xs text-slate-400 mt-0.5">Combining VMware ESXi on-premise control with AWS & GCP elastic cloud scale.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono">
              ✓ 99.9% High Availability
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-mono">
              ✓ Automated DR & Backups
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// About Me Section
// ----------------------------------------------------
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ENGINEER PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Engineering High-Availability Infrastructure with Precision
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a results-driven <strong className="text-white">Cloud Engineer</strong> currently managing production cloud and datacenter workloads at <strong className="text-blue-400">Purvaco Technology Pvt. Ltd.</strong> in Ghaziabad, India.
              </p>
              <p>
                My background bridges the full spectrum of modern infrastructure: from low-level datacenter hardware maintenance, RAID configuration, and VMware ESXi hypervisor virtualization, up to multi-cloud architecture across <strong className="text-white">AWS (EC2, S3, VPC, RDS, IAM)</strong> and <strong className="text-white">Google Cloud Platform (GCP, AlloyDB)</strong>.
              </p>
              <p>
                I have a strong track record of maintaining strict <strong className="text-emerald-400">99.9% uptime SLAs</strong> for business-critical client applications, executing disaster recovery protocols, hardening security policies, and standardizing CI/CD provisioning workflows that reduced deployment latency by <strong className="text-blue-400">20%</strong>.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Cloud (AWS & GCP)
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> VMware ESXi Virtualization
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Linux & Windows Admin
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Disaster Recovery & RAID
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Operations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resource rightsizing, cost optimization, IAM access management, and high availability deployments across AWS and GCP.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Virtualization & OS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                VMware ESXi hypervisors, capacity planning, VM provisioning, Ubuntu Linux administration, and Windows Server 2016-2022.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Security & Networking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Firewall configuration, DNS, DHCP, VPN, TCP/IP, network troubleshooting, and cybersecurity compliance frameworks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Datacenter Ops</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware maintenance, RAID disk configuration, rack installations, network cabling, and disaster recovery execution.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Technical Skills Matrix (All Skills from Resume)
// ----------------------------------------------------
function SkillsMatrix() {
  const skillCategories = [
    {
      category: "Cloud Platforms",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      skills: [
        "AWS (EC2, S3, VPC, IAM, RDS)",
        "Google Cloud Platform (GCP)",
        "AlloyDB",
        "Private Cloud Infrastructure",
        "Cloud Cost Optimization",
        "Workload Rightsizing"
      ]
    },
    {
      category: "Virtualization & Hypervisors",
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      skills: [
        "VMware ESXi",
        "Hypervisor Management",
        "Virtual Machine Provisioning",
        "Capacity Planning",
        "VM Snapshots & Backups",
        "Resource Allocation"
      ]
    },
    {
      category: "Operating Systems & Admin",
      icon: <TerminalIcon className="w-5 h-5 text-amber-400" />,
      skills: [
        "Ubuntu Linux",
        "Linux Server Administration",
        "Windows Server 2016/2019/2022",
        "Plesk Control Panel",
        "Patch Management",
        "Performance Optimization"
      ]
    },
    {
      category: "Datacenter & Hardware Ops",
      icon: <HardDrive className="w-5 h-5 text-rose-400" />,
      skills: [
        "Datacenter Operations",
        "Server Deployment",
        "RAID Configuration",
        "Hardware Maintenance",
        "Rack Installation",
        "Network Cabling"
      ]
    },
    {
      category: "Networking & Protocols",
      icon: <Network className="w-5 h-5 text-cyan-400" />,
      skills: [
        "DNS & DHCP Configuration",
        "VPN Connectivity",
        "TCP/IP Networking",
        "Firewall Policies & Rules",
        "Network Troubleshooting",
        "Secure Tunneling"
      ]
    },
    {
      category: "Cloud Operations & SRE",
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      skills: [
        "99.9% Uptime SLA Management",
        "Proactive Monitoring",
        "Incident Management",
        "Disaster Recovery (DR) Planning",
        "Backup Management",
        "Troubleshooting & RCA"
      ]
    },
    {
      category: "Security & IAM",
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      skills: [
        "Cloud Security Best Practices",
        "IAM Access Controls",
        "Infrastructure Hardening",
        "Cybersecurity Frameworks",
        "Compliance Standards",
        "Credential Management"
      ]
    },
    {
      category: "DevOps & Programming",
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      skills: [
        "CI/CD Deployment Pipelines",
        "Infrastructure Automation",
        "Python Scripting",
        "Java, SQL, C",
        "AI/ML Applications",
        "LLM Chatbot Integration"
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-[#0a0d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>EXPERT CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Technical Skills
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Detailed breakdown of technologies, platforms, and operational tools verified by production experience and certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-white group-hover:scale-110 transition-transform">
                    {group.icon}
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{group.category}</h3>
                </div>

                <ul className="space-y-2.5">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span className="leading-tight">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Professional Career Journey (Detailed Work Timeline)
// ----------------------------------------------------
function CareerJourney() {
  const experiences = [
    {
      role: "Cloud Engineer",
      company: "Purvaco Technology Pvt. Ltd.",
      location: "Ghaziabad, India",
      period: "September 2025 — Present",
      type: "Full-Time",
      description: "Leading multi-cloud management across AWS & GCP, administering VMware ESXi virtual environments, Linux servers, and maintaining 99.9% uptime SLA.",
      achievements: [
        "Manage and maintain cloud infrastructure across AWS (EC2, S3, VPC, RDS, IAM) and GCP, ensuring production workload stability with 99.9% uptime SLA.",
        "Perform Ubuntu Linux administration and manage Windows Server (2016/2019/2022) environments for business-critical applications.",
        "Administer VMware ESXi virtualization platform — virtual machine provisioning, hypervisor management, and capacity planning.",
        "Configure networking services including DNS, DHCP, VPN, and TCP/IP; enforce firewall policies for secure, reliable connectivity.",
        "Implement cloud security best practices: access controls, infrastructure hardening, and compliance standards across all cloud environments.",
        "Drive cost optimization by continuously monitoring resource utilization and rightsizing cloud workloads to reduce unnecessary spend.",
        "Collaborate with development teams to support cloud-hosted applications and streamline CI/CD deployment pipelines, reducing deployment time by approximately 20%.",
        "Support datacenter operations: RAID configuration, hardware maintenance, rack installation, and network cabling.",
        "Execute disaster recovery planning and backup management procedures to safeguard critical infrastructure and business continuity."
      ],
      technologies: ["AWS", "GCP", "VMware ESXi", "Ubuntu Linux", "Windows Server", "CI/CD", "Plesk", "RAID", "IAM", "DNS/VPN"]
    },
    {
      role: "AI & Innovation Engineer (Social Impact)",
      company: "Madadgar Foundation / Hackathons",
      location: "India",
      period: "2024 — 2025",
      type: "Project & Innovation",
      description: "Engineered AI-driven safety analytics and automated monitoring prototypes.",
      achievements: [
        "Engineered an AI-powered analytics solution for threat detection and public safety monitoring using anomaly detection and classification models.",
        "Awarded at Smart India Hackathon (SIH) and Hackwith Uttarakhand for innovative AI solution design and implementation.",
        "Collaborated with Madadgar Foundation to deliver 5+ working social-impact prototypes applying technology to real-world safety challenges."
      ],
      technologies: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "AI Anomaly Detection"]
    }
  ];

  return (
    <section id="career" className="py-24 bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PROGRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience & Career History
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Verifiable track record in production cloud systems, hypervisor management, and infrastructure automation.
          </p>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical Guide Line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative md:pl-20">
              {/* Timeline Indicator Dot */}
              <div className="hidden md:flex absolute left-5 top-7 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 items-center justify-center -translate-x-1/2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              </div>

              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">{exp.type}</span>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-medium text-slate-300">{exp.company} • <span className="text-slate-500">{exp.location}</span></div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-6 italic">{exp.description}</p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Responsibilities & Deliverables:</h4>
                <ul className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, aIdx) => (
                    <li key={aIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// VMware & Datacenter Operations Section
// ----------------------------------------------------
function DatacenterSection() {
  return (
    <section className="py-20 bg-[#0a0d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1220] via-slate-900 to-[#0c1220] border border-blue-900/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                <Server className="w-3.5 h-3.5" />
                <span>ON-PREM & VIRTUALIZATION ENGINE</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                VMware ESXi Hypervisors & Datacenter Operations
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Deep hands-on experience managing physical datacenter infrastructure alongside enterprise hypervisor virtualization. I handle the bare-metal foundation that powers modern cloud workloads.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>VM Provisioning & Capacity Planning</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>RAID Configuration & Storage</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Hypervisor Patching & Upgrades</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Rack Installation & Network Cabling</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>VM Snapshots & Disaster Recovery</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Server Deployment & Hardware Maint.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 w-full font-mono text-xs text-slate-300 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold">ESXi Host Telemetry</span>
                  <span className="text-slate-500">vSphere / ESXi 7.x/8.x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hypervisor State:</span>
                  <span className="text-emerald-400">RUNNING (Healthy)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Virtual Machines:</span>
                  <span className="text-white">Active Provisioned</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Storage Controller:</span>
                  <span className="text-white">Hardware RAID Configured</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Disaster Recovery:</span>
                  <span className="text-blue-400">Scheduled Snapshots</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                  Production Virtualization Tested & Verified
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Projects & Innovation Section
// ----------------------------------------------------
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>PROVEN DELIVERABLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Projects & Innovation
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Applying engineering and AI to solve real-world security and data monitoring challenges.
          </p>
        </div>

        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all shadow-2xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">Python</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">Machine Learning</span>
            <span className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono">Pandas & Scikit-learn</span>
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">Anomaly Detection</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Women Safety Analytics</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Engineered an AI-powered analytics solution for threat detection and public safety monitoring using anomaly detection and gender-based classification models. Applied machine learning algorithms to identify irregular threat signals and provide actionable telemetry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">🏆 Smart India Hackathon (SIH)</div>
              <div className="text-xs text-slate-400">Awarded for innovative AI solution architecture and real-time threat analysis.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-blue-400 font-bold mb-1">🤝 Madadgar Foundation</div>
              <div className="text-xs text-slate-400">Delivered 5+ working social-impact prototypes applying technology to safety.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 flex items-center justify-between">
            <span className="text-xs text-blue-300 font-medium">Winner: Hackwith Uttarakhand & SIH Awardee</span>
            <span className="text-xs font-mono text-blue-400">Production Tested Prototype</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Certifications & Verification Lightbox
// ----------------------------------------------------
function CertificationsSection({ onSelectCert }: { onSelectCert: (cert: any) => void }) {
  const certifications = [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
      issuer: "Oracle",
      year: "2025",
      badge: "Cloud Architecture",
      id: "Verified OCI Associate",
      file: "eCertificate oracle.pdf",
      description: "Official credential validating core OCI architecture, compute, VCN networking, security, storage, and identity."
    },
    {
      name: "Fortinet Certified Associate in Cybersecurity",
      issuer: "Fortinet",
      year: "2025",
      badge: "Network & Cyber Security",
      id: "5144971646AS",
      file: "Fortinet Certified Associate in Cybersecurity.pdf",
      description: "Industry credential validating threat detection, firewall security policies, VPN architecture, and zero-trust controls."
    },
    {
      name: "Google Cybersecurity Certificate",
      issuer: "Google",
      year: "2025",
      badge: "Security Operations",
      id: "Google Certified",
      file: null,
      description: "Covers security controls, Linux command line, SQL querying, SIEM tools, and network defense strategies."
    },
    {
      name: "AlloyDB Resource Management",
      issuer: "Google Cloud (GCP)",
      year: "2025",
      badge: "Cloud Database",
      id: "Google Cloud Skill",
      file: null,
      description: "Hands-on mastery in deploying, scaling, and managing PostgreSQL-compatible AlloyDB database clusters on GCP."
    },
    {
      name: "Open Source LLM Chatbot Development",
      issuer: "AI / Open Source",
      year: "2025",
      badge: "GenAI & LLMs",
      id: "AI Engineering",
      file: null,
      description: "Integration of modern open-weight LLMs, vector search, and intelligent retrieval workflows."
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-[#0a0d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>VERIFIABLE CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Certifications
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Officially verified cloud, cybersecurity, and enterprise infrastructure credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {cert.year}
                  </span>
                </div>

                <div className="text-xs font-mono text-blue-400 font-semibold mb-1">{cert.badge}</div>
                <h3 className="font-bold text-white text-base leading-snug mb-2">{cert.name}</h3>
                <div className="text-xs text-slate-400 font-medium mb-3">Issued by {cert.issuer}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{cert.description}</p>

                {cert.id && (
                  <div className="p-2 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800/80 mb-4 flex items-center justify-between">
                    <span>ID:</span>
                    <span className="text-slate-200 font-semibold">{cert.id}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                {cert.file ? (
                  <>
                    <button
                      onClick={() => onSelectCert(cert)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Certificate
                    </button>
                    <a
                      href={getAssetUrl(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Credential
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Engineering Philosophy
// ----------------------------------------------------
function PhilosophySection() {
  const pillars = [
    { title: "High Reliability", icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, desc: "Architecting for 99.9% uptime SLA with automated failovers and multi-zone resilience." },
    { title: "Infrastructure Automation", icon: <Zap className="w-5 h-5 text-amber-400" />, desc: "Eliminating manual toil through repeatable CI/CD pipelines and standardized provisioning." },
    { title: "Security in Depth", icon: <Lock className="w-5 h-5 text-purple-400" />, desc: "Enforcing least-privilege IAM, hardened firewalls, and continuous compliance protocols." },
    { title: "Proactive Observability", icon: <Activity className="w-5 h-5 text-blue-400" />, desc: "Real-time metrics, proactive incident prevention, and rapid root-cause resolution." }
  ];

  return (
    <section className="py-20 bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Engineering Philosophy</h2>
          <p className="text-sm text-slate-400 mt-2">The fundamental architectural principles guiding every production deployment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Education Section
// ----------------------------------------------------
function EducationSection() {
  return (
    <section id="education" className="py-20 bg-[#0a0d16] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIC FOUNDATION</span>
        </div>
        
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology in Computer Science and Engineering</h3>
          <div className="text-blue-400 font-medium text-base mb-4">Nitra Technical Campus, Ghaziabad, UP</div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            2022 — 2026 • Computer Science & Engineering
          </div>
          <p className="text-xs text-slate-400 mt-4 max-w-xl mx-auto">
            Focus on Operating Systems, Computer Networks, Distributed Computing, Database Management Systems, and Cloud Architectures.
          </p>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Contact Section
// ----------------------------------------------------
function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#07090e] border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OPEN FOR CLOUD & DEVOPS OPPORTUNITIES</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Let's Build Something Reliable.
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Looking for a dedicated Cloud & DevOps Engineer to design resilient infrastructure, automate CI/CD pipelines, or optimize your cloud costs?
        </p>

        {/* Direct Connect Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="mailto:7080dhiru@gmail.com"
            className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
          >
            <Mail className="w-4 h-4" />
            <span>7080dhiru@gmail.com</span>
          </a>

          <a
            href="https://linkedin.com/in/abhishek-singh-4489ab265"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
          >
            <LinkedInIcon />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href="https://github.com/7080dhiru-star"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-colors"
          >
            <GitHubIcon />
            <span>GitHub Profile</span>
          </a>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+91 9935953563</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Ghaziabad, Uttar Pradesh, India</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Immediate / High Availability</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Footer
// ----------------------------------------------------
function Footer() {
  return (
    <footer className="py-8 bg-[#05070a] border-t border-slate-900 text-center text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Abhishek Singh. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#home" className="hover:text-blue-400 transition-colors">Back to Top ↑</a>
          <a href={getAssetUrl('Abhishek_Singh_Resume_30-08-2026.pdf')} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Download Resume</a>
        </div>
      </div>
    </footer>
  );
}

// ----------------------------------------------------
// Certificate Lightbox Modal
// ----------------------------------------------------
function CertificateModal({ cert, onClose }: { cert: { name: string; issuer: string; id?: string; file: string | null }; onClose: () => void }) {
  const pdfUrl = cert.file ? getAssetUrl(cert.file) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#0d121f] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{cert.name}</h3>
            <p className="text-xs text-slate-400">Issued by {cert.issuer}</p>
          </div>
        </div>

        {cert.id && (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-6 flex justify-between">
            <span className="text-slate-500">Credential Verification ID:</span>
            <span className="text-emerald-400 font-bold">{cert.id}</span>
          </div>
        )}

        {/* Embedded PDF or Verification View */}
        {pdfUrl ? (
          <div className="space-y-4">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                title={cert.name}
                className="w-full h-full border-none"
              />
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Open Fullscreen PDF
              </a>
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4" /> Download Certificate
              </a>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-950 text-center border border-slate-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <div className="text-base font-bold text-white">Officially Completed Credential</div>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Verified through official technical coursework and certification program standards.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
