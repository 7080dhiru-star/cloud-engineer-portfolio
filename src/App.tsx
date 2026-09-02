import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Server, Shield, Activity, Terminal, Code, Database, 
  ChevronDown, ExternalLink, Download, Mail, Linkedin, Github, 
  Menu, X, FileText, Cpu, Network, Briefcase, GraduationCap 
} from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications'];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-tighter text-textMain flex items-center gap-2">
          <Terminal className="text-primary h-5 w-5" />
          <span>Abhishek.</span>
        </a>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-textMuted">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors">{link}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="/Abhishek_Singh_Resume_30-08-2026.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-md text-sm font-semibold border border-primary/20">
            <Download className="w-4 h-4" /> Resume
          </a>
        </div>

        <button className="md:hidden text-textMain" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-white/5 shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-textMain hover:text-primary transition-colors">{link}</a>
            ))}
            <a href="/Abhishek_Singh_Resume_30-08-2026.pdf" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-primary text-white transition-colors rounded-md text-sm font-bold">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Opportunities
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Cloud Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
                & DevOps Specialist
              </span>
            </h1>
            
            <p className="text-lg text-textMuted max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Designing, securing, and automating scalable cloud infrastructure and enterprise datacenter operations. Focused on reliability, performance, and modern CI/CD workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#projects" className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-md font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] w-full sm:w-auto text-center">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-4 bg-surface hover:bg-secondary text-textMain rounded-md font-medium transition-all border border-white/10 w-full sm:w-auto text-center">
                Let's Connect
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="flex-1 flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-3xl -z-10" />
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl relative z-10 glass-panel p-2">
              <img 
                src="/Abhishek_Singh_JPG.jpg" 
                alt="Abhishek Singh" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Tech nodes floating */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 -left-6 glass-panel p-3 rounded-xl flex items-center gap-2">
              <Cloud className="text-blue-400 w-5 h-5" />
              <span className="text-xs font-semibold">AWS / GCP</span>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }} className="absolute bottom-10 -right-6 glass-panel p-3 rounded-xl flex items-center gap-2">
              <Server className="text-green-400 w-5 h-5" />
              <span className="text-xs font-semibold">VMware ESXi</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-textMuted hover:text-primary transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Uptime SLA Maintained", value: "99.9%" },
    { label: "Cloud Platforms", value: "AWS, GCP" },
    { label: "Deployment Speed", value: "+20%" },
    { label: "Certifications", value: "3+" },
  ];

  return (
    <section id="about" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Terminal className="text-primary" /> About Me
            </h2>
            <div className="space-y-4 text-textMuted leading-relaxed text-lg">
              <p>
                I am a results-driven Cloud Engineer with comprehensive hands-on experience across AWS, GCP, VMware ESXi virtualization, Linux administration, and enterprise datacenter operations. 
              </p>
              <p>
                My professional focus is on designing stable production infrastructure, enforcing cloud security, proactively monitoring environments, and driving resource and cost optimizations. I have a proven track record of maintaining highly available environments and ensuring business continuity through rigorous disaster recovery and backup management.
              </p>
              <p>
                Whether I'm rightsizing cloud workloads, managing business-critical Linux/Windows servers, or automating CI/CD provisioning workflows, I approach engineering with a philosophy rooted in <strong className="text-textMain">reliability, scalability, and security</strong>.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-textMuted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="w-5 h-5" />,
      skills: ["AWS (EC2, S3, VPC, IAM, RDS)", "Google Cloud Platform (GCP)", "AlloyDB", "Private Cloud Infrastructure"]
    },
    {
      title: "DevOps & Automation",
      icon: <Activity className="w-5 h-5" />,
      skills: ["CI/CD Pipelines", "Infrastructure Automation", "DevOps Fundamentals", "Plesk"]
    },
    {
      title: "Virtualization & OS",
      icon: <Server className="w-5 h-5" />,
      skills: ["VMware ESXi", "Virtual Machine Provisioning", "Ubuntu Linux", "Windows Server 2016/2019/2022"]
    },
    {
      title: "Infrastructure & DC",
      icon: <Network className="w-5 h-5" />,
      skills: ["Datacenter Operations", "Server Deployment", "RAID Configuration", "Rack Installation", "Hardware Maintenance"]
    },
    {
      title: "Networking & Security",
      icon: <Shield className="w-5 h-5" />,
      skills: ["DNS, DHCP, VPN, TCP/IP", "Firewall Configuration", "Cloud Security", "Cybersecurity Frameworks"]
    },
    {
      title: "Cloud Operations",
      icon: <Cpu className="w-5 h-5" />,
      skills: ["Monitoring & Troubleshooting", "Incident Management", "Disaster Recovery", "Cost Optimization"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-textMuted max-w-2xl mx-auto">Core competencies across cloud infrastructure, virtualized environments, and datacenter operations.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, j) => (
                  <li key={j} className="text-textMuted text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
                    <span className="flex-1">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-16 text-center">Professional Experience</h2>
        
        <div className="relative pl-8 md:pl-0">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-12 md:w-1/2 md:pr-12 md:text-right"
          >
            <div className="absolute left-[-41px] md:left-auto md:right-[-41px] top-1 w-6 h-6 rounded-full bg-surface border-4 border-primary z-10" />
            
            <div className="text-primary font-bold text-sm mb-1 tracking-wider uppercase">September 2025 — Present</div>
            <h3 className="text-xl font-bold mb-1">Cloud Engineer</h3>
            <div className="text-textMuted font-medium mb-4">Purvaco Technology Pvt. Ltd. · Ghaziabad, India</div>
            
            <div className="glass-panel p-6 rounded-xl text-left text-sm text-textMuted space-y-3">
              <p>• Managed cloud infrastructure across <strong>AWS and GCP</strong>, ensuring production workload stability with 99.9% uptime SLA.</p>
              <p>• Performed Linux administration (Ubuntu) and managed Windows Server environments for business-critical applications.</p>
              <p>• Administered <strong>VMware ESXi</strong> virtualization platform—virtual machine provisioning, hypervisor management, and capacity planning.</p>
              <p>• Implemented cloud security best practices, proactive monitoring, patch management, and enforced firewall policies.</p>
              <p>• Reduced deployment time by approximately <strong>20%</strong> through infrastructure automation and streamlined CI/CD deployment pipelines.</p>
              <p>• Supported datacenter operations including RAID configuration, rack installation, and disaster recovery planning.</p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Projects & Achievements</h2>
          <p className="text-textMuted max-w-2xl mx-auto">Selected engineering solutions and technical achievements.</p>
        </div>
        
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row hover:border-primary/30 transition-all duration-300">
          <div className="md:w-2/5 bg-gradient-to-br from-secondary to-background p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
            <Database className="w-24 h-24 text-primary/80 relative z-10" />
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-textMuted">Python</span>
              <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-textMuted">Machine Learning</span>
              <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-textMuted">Pandas</span>
              <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-textMuted">Scikit-learn</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-3">Women Safety Analytics</h3>
            <p className="text-textMuted text-sm mb-6 leading-relaxed">
              Engineered an AI-powered analytics solution for threat detection and public safety monitoring using anomaly detection and gender-based classification models. Collaborated with Madadgar Foundation to deliver 5+ working social-impact prototypes applying technology to real-world safety challenges.
            </p>
            
            <div className="flex items-start gap-3 text-sm text-primary/80 bg-primary/5 p-4 rounded-lg border border-primary/10">
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              <p><strong>Achievement:</strong> Awarded at Smart India Hackathon (SIH) and Hackwith Uttarakhand for innovative AI solution design and implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
      issuer: "Oracle",
      file: "/eCertificate oracle.pdf"
    },
    {
      name: "Fortinet Certified Associate in Cybersecurity",
      issuer: "Fortinet",
      id: "5144971646AS",
      file: "/Fortinet Certified Associate in Cybersecurity.pdf"
    },
    {
      name: "Google Cybersecurity Certificate",
      issuer: "Google",
      file: null
    },
    {
      name: "AlloyDB Resource Management",
      issuer: "Google Cloud",
      file: null
    },
    {
      name: "Open Source LLM Chatbot Development",
      issuer: "Various",
      file: null
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl flex flex-col h-full border border-white/5 hover:border-primary/20 transition-colors">
              <div className="p-3 bg-white/5 rounded-lg w-max mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg leading-tight mb-2 flex-1">{cert.name}</h3>
              <div className="text-sm text-textMuted mb-4">Issued by {cert.issuer}</div>
              
              {cert.id && (
                <div className="text-xs text-textMuted bg-black/20 p-2 rounded mb-4 font-mono">
                  ID: {cert.id}
                </div>
              )}
              
              {cert.file ? (
                <a href={cert.file} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-blue-400 font-medium transition-colors mt-auto">
                  View Certificate <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-sm text-textMuted/50 flex items-center gap-2 mt-auto">
                  Verified Credential
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Education</h2>
        <div className="glass-panel p-8 rounded-2xl inline-block text-center w-full">
          <h3 className="text-xl font-bold mb-2">Bachelor of Technology in Computer Science and Engineering</h3>
          <div className="text-primary font-medium mb-4">Nitra Technical Campus, Ghaziabad, UP</div>
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-sm font-medium text-textMuted border border-white/10">
            2022 – 2026
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">Let's Build Something Reliable.</h2>
        <p className="text-textMuted text-lg mb-10">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a href="mailto:7080dhiru@gmail.com" className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto">
            <Mail className="w-5 h-5" /> Say Hello
          </a>
          <a href="https://linkedin.com/in/abhishek-singh-4489ab265" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#0a66c2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors w-full sm:w-auto">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm text-textMuted">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            +91 9935953563
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            Ghaziabad, UP, India
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5 text-center text-textMuted text-sm bg-background">
      <p>© {new Date().getFullYear()} Abhishek Singh. All rights reserved.</p>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-textMain selection:bg-primary/30">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
