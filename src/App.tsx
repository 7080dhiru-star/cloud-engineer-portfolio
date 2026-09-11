import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Server, Shield, Activity, Terminal as TerminalIcon, 
  ChevronDown, ExternalLink, Download, Mail, Phone, MapPin,
  Menu, X, FileText, Cpu, Network, Briefcase, GraduationCap,
  Layers, HardDrive, CheckCircle2, Lock, Zap, Clock,
  TrendingUp, Award, RefreshCw, Eye, ArrowUp, Check,
  Play, Pause, EyeOff, Radio, Sliders, ChevronLeft, ChevronRight,
  Video, Database, Globe
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

// ----------------------------------------------------
// OpenAI Astra-Inspired Fluid Mouse Cursor
// ----------------------------------------------------
function AstraCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [lagPos, setLagPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, input, [data-interactive], .astra-glow-container, [role="button"]');
      setIsHovering(!!interactive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // 60fps Spring Interpolation for outer halo
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const updateLag = () => {
      setLagPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.16,
        y: prev.y + (mousePos.y - prev.y) * 0.16,
      }));
      animId = requestAnimationFrame(updateLag);
    };
    animId = requestAnimationFrame(updateLag);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_8px_#60a5fa] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none ${
          isHovering
            ? 'w-12 h-12 bg-blue-500/15 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-110'
            : 'w-7 h-7 bg-blue-500/8 border border-blue-400/20'
        }`}
        style={{ left: `${lagPos.x}px`, top: `${lagPos.y}px` }}
      />
    </div>
  );
}

// ----------------------------------------------------
// Reusable OpenAI Astra Interactive Spotlight Card Component
// ----------------------------------------------------
function AstraCard({
  children,
  className = '',
  tilt = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.2;
      const rotateY = ((x - centerX) / centerX) * 2.2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    }
  };

  const handleMouseLeaveInner = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--mouse-x', `-1000px`);
    card.style.setProperty('--mouse-y', `-1000px`);
    if (tilt) {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
    if (onMouseLeave) onMouseLeave();
  };

  const handleMouseEnterInner = () => {
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveInner}
      onMouseEnter={handleMouseEnterInner}
      onClick={onClick}
      className={`astra-glow-container relative rounded-3xl bg-slate-900/60 border border-slate-800/90 shadow-xl overflow-hidden ${className}`}
    >
      <div className="astra-glow-overlay" />
      <div className="astra-border-highlight" />
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Pro Cloud Services Video & Cyber Infrastructure Background
// ----------------------------------------------------
function CloudServicesBackground({ 
  isVideoPlaying, 
  showVideoOverlay 
}: { 
  isVideoPlaying: boolean; 
  showVideoOverlay: boolean; 
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const nodeLabels = ['AWS::VPC', 'GCP::AlloyDB', 'VMware::ESXi', 'K8s::Cluster', 'Ubuntu::Prod', 'CI/CD::Runner', 'AWS::RDS', 'Cloudflare::DNS', 'Fortinet::IAM'];
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
      pulse: number;
      color: string;
    }> = [];

    const colors = ['#38bdf8', '#3b82f6', '#10b981', '#a855f7', '#06b6d4'];

    for (let i = 0; i < 22; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 2,
        label: nodeLabels[i % nodeLabels.length],
        pulse: Math.random() * Math.PI * 2,
        color: colors[i % colors.length]
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.45;
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.12)';
      ctx.lineWidth = 1;

      const vanishX = width * 0.5 + (mouse.x - width / 2) * 0.05;
      for (let x = -width * 0.5; x <= width * 1.5; x += width * 0.1) {
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const gridOffset = (frame * 0.4) % 40;
      for (let y = horizonY + gridOffset; y < height; y += 40) {
        const factor = (y - horizonY) / (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.03 + factor * 0.09})`;
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && mouse.active) {
          n.x -= (dx / dist) * 0.6;
          n.y -= (dy / dist) * 0.6;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist2 < 170) {
            const alpha = (1 - dist2 / 170) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            if ((frame + i * 10) % 120 === 0) {
              const packetPos = ((frame * 0.02) % 1);
              const px = n.x + (n2.x - n.x) * packetPos;
              const py = n.y + (n2.y - n.y) * packetPos;
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = '#38bdf8';
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }

        ctx.beginPath();
        const pulseSize = n.radius + Math.sin(n.pulse) * 0.8;
        ctx.arc(n.x, n.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (i % 3 === 0) {
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {showVideoOverlay && !videoError && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105 transition-opacity duration-1000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31912-large.mp4" type="video/mp4" />
            <source src={getAssetUrl('cloud-bg.mp4')} type="video/mp4" />
          </video>
        </div>
      )}

      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-65 z-[1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/85 via-[#07090e]/75 to-[#07090e] z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,transparent_20%,#07090e_90%)] z-[2]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-25 z-[3]" />
    </div>
  );
}

// ----------------------------------------------------
// Animated SVG Cloud Architecture Diagram
// ----------------------------------------------------
function CloudTopologyDiagram({ type }: { type: string }) {
  if (type === 'ch-aws') {
    return (
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-900/40 relative overflow-hidden flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 font-bold">
            <Cloud className="w-3.5 h-3.5" /> AWS VPC Architecture Flow
          </span>
          <span className="text-emerald-400 font-bold">● Multi-AZ Active</span>
        </div>
        
        {/* Animated Vector Topology */}
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono py-2 relative">
          <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/60 flex flex-col items-center">
            <Globe className="w-4 h-4 text-cyan-400 mb-1 animate-pulse" />
            <span className="text-white font-semibold">Route53</span>
            <span className="text-slate-500 text-[9px]">DNS Gateway</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/60 flex flex-col items-center">
            <Shield className="w-4 h-4 text-indigo-400 mb-1" />
            <span className="text-white font-semibold">VPC & IAM</span>
            <span className="text-slate-500 text-[9px]">Security Group</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/60 flex flex-col items-center">
            <Cpu className="w-4 h-4 text-blue-400 mb-1 animate-bounce" />
            <span className="text-white font-semibold">EC2 AutoScale</span>
            <span className="text-slate-500 text-[9px]">App Cluster</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/60 flex flex-col items-center">
            <Database className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-white font-semibold">RDS Multi-AZ</span>
            <span className="text-slate-500 text-[9px]">PostgreSQL</span>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Throughput: <strong className="text-white">1.4 GB/s</strong></span>
          <span>Health: <strong className="text-emerald-400">100% Passed</strong></span>
          <span>Failover: <strong className="text-blue-400">Automated</strong></span>
        </div>
      </div>
    );
  }

  if (type === 'ch-vmware') {
    return (
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-900/40 relative overflow-hidden flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5 font-bold">
            <Server className="w-3.5 h-3.5" /> VMware ESXi 8.x Hypervisor Topology
          </span>
          <span className="text-emerald-400 font-bold">● Bare-Metal OK</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono py-2">
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex flex-col items-center">
            <Server className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-white font-semibold">ESXi Host</span>
            <span className="text-slate-500 text-[9px]">vSphere vCenter</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex flex-col items-center">
            <Cpu className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-white font-semibold">VM Instances</span>
            <span className="text-slate-500 text-[9px]">Ubuntu/Windows</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex flex-col items-center">
            <HardDrive className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-white font-semibold">RAID-10 NVMe</span>
            <span className="text-slate-500 text-[9px]">Hardware Arrays</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span>Hypervisor CPU: <strong className="text-emerald-400">18.4%</strong></span>
          <span>Datastore: <strong className="text-cyan-400">RAID-10 Optimal</strong></span>
          <span>DR Snapshots: <strong className="text-white">Active</strong></span>
        </div>
      </div>
    );
  }

  // Default CI/CD or Security diagram
  return (
    <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-900/40 relative overflow-hidden flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-indigo-400 border-b border-slate-800 pb-2">
        <span className="flex items-center gap-1.5 font-bold">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> CI/CD Automated Pipeline Stream
        </span>
        <span className="text-amber-400 font-bold">● 20% Fast-Track</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono py-2">
        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex flex-col items-center">
          <TerminalIcon className="w-4 h-4 text-blue-400 mb-1" />
          <span className="text-white font-semibold">Git Push</span>
          <span className="text-slate-500 text-[9px]">Master Branch</span>
        </div>
        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex flex-col items-center">
          <Zap className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-white font-semibold">Docker Build</span>
          <span className="text-slate-500 text-[9px]">Image Layering</span>
        </div>
        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex flex-col items-center">
          <Shield className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-white font-semibold">Test & Audit</span>
          <span className="text-slate-500 text-[9px]">Zero Vulnerability</span>
        </div>
        <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/50 flex flex-col items-center">
          <Cloud className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-white font-semibold">Plesk Deploy</span>
          <span className="text-slate-500 text-[9px]">Zero-Downtime</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
        <span>Build Time: <strong className="text-emerald-400">42 seconds</strong></span>
        <span>Acceleration: <strong className="text-amber-400">+20% Faster</strong></span>
        <span>Status: <strong className="text-white">Automated</strong></span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Animated Datacenter Server Rack Visualizer
// ----------------------------------------------------
function AnimatedDatacenterRack() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => (p + 1) % 100), 500);
    return () => clearInterval(timer);
  }, []);

  const servers = [
    { name: "Node 01: Multi-Cloud Gateway (AWS/GCP)", cpu: "24%", ram: "38%", status: "OPTIMAL", led: "bg-emerald-400" },
    { name: "Node 02: VMware ESXi 8.x Hypervisor Cluster", cpu: "32%", ram: "64%", status: "HEALTHY", led: "bg-emerald-400" },
    { name: "Node 03: High-Availability Database Node", cpu: "41%", ram: "52%", status: "SYNCED", led: "bg-cyan-400" },
    { name: "Node 04: AI Telemetry & SIH Anomaly Engine", cpu: "18%", ram: "29%", status: "INFERENCE", led: "bg-blue-400" }
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-4 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <span className="text-emerald-400 font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          42U ENTERPRISE DATACENTER RACK
        </span>
        <span className="text-[11px] text-slate-500">21.4°C • RAID-10 ACTIVE</span>
      </div>

      {/* Rack Server Blades */}
      <div className="space-y-2.5">
        {servers.map((srv, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#090e18] border border-slate-800/90 flex flex-col gap-2 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${srv.led} ${pulse % 2 === 0 ? 'opacity-100' : 'opacity-60'}`} />
                <span className="font-semibold text-white">{srv.name}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">{srv.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
              <div>
                CPU: <strong className="text-slate-200">{srv.cpu}</strong>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: srv.cpu }} />
                </div>
              </div>
              <div>
                RAM: <strong className="text-slate-200">{srv.ram}</strong>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: srv.ram }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
        <span>SLA: <strong className="text-emerald-400">99.9% Production</strong></span>
        <span>Storage: <strong className="text-white">RAID-10 NVMe</strong></span>
        <span>Backup: <strong className="text-cyan-400">Scheduled</strong></span>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCert, setSelectedCert] = useState<{ name: string; issuer: string; id?: string; file: string | null } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setShowBackToTop(currentScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-300 relative overflow-x-hidden">
      <AstraCursor />

      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <CloudServicesBackground 
        isVideoPlaying={isVideoPlaying} 
        showVideoOverlay={showVideoOverlay}
      />

      <Header />
      
      <main className="relative z-10">
        <Hero 
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
          showVideoOverlay={showVideoOverlay}
          setShowVideoOverlay={setShowVideoOverlay}
        />
        <StatsBar />
        <CloudOpsLiveCenter />
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

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-blue-600/90 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-400/40 backdrop-blur-md transition-all hover:-translate-y-1 group cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

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
      
      const sections = ['home', 'live-ops', 'terminal', 'architecture', 'about', 'skills', 'career', 'projects', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#home', id: 'home' },
    { label: 'Cloud Video Ops', href: '#live-ops', id: 'live-ops' },
    { label: 'Shell', href: '#terminal', id: 'terminal' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Career', href: '#career', id: 'career' },
    { label: 'Projects Slide', href: '#projects', id: 'projects' },
    { label: 'Certs', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#07090e]/92 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
            <TerminalIcon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-2 group-hover:text-blue-300 transition-colors">
              <span>Abhishek Singh</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] font-mono text-slate-400">Cloud & DevOps Engineer</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 relative ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={getAssetUrl('Abhishek_Singh_ATS_Resume.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 text-xs font-semibold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/abhishek-singh-4489ab265"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-[#0a66c2] text-slate-300 hover:text-white border border-slate-800 hover:border-[#0a66c2] transition-all hover:scale-105 shadow-md"
            title="LinkedIn Profile"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/7080dhiru-star"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 transition-all hover:scale-105 shadow-md"
            title="GitHub Profile"
          >
            <GitHubIcon />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0d14]/98 border-b border-slate-800 px-6 py-6 overflow-hidden backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-3">
                <a
                  href={getAssetUrl('Abhishek_Singh_ATS_Resume.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25"
                >
                  <Download className="w-4 h-4" /> Download Official Resume (PDF)
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
// Hero Section with Orbiting Badges & Telemetry
// ----------------------------------------------------
function Hero({
  isVideoPlaying,
  setIsVideoPlaying,
  showVideoOverlay,
  setShowVideoOverlay
}: {
  isVideoPlaying: boolean;
  setIsVideoPlaying: (v: boolean) => void;
  showVideoOverlay: boolean;
  setShowVideoOverlay: (v: boolean) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Live Cloud Video Telemetry HUD Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-2 sm:p-2.5 rounded-2xl bg-slate-950/70 border border-blue-900/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-2xl max-w-4xl mx-auto lg:mx-0"
        >
          <div className="flex items-center gap-3 px-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-slate-300">
              <span className="text-blue-400">CLOUD INFRASTRUCTURE FEED:</span>
              <span className="text-emerald-400">LIVE STREAM</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="hidden sm:inline text-slate-500">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AWS / GCP MESH</span>
            </div>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>SLA: 99.9%</span>
            </div>

            <div className="flex items-center gap-1 ml-auto bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isVideoPlaying ? "Pause Background Stream" : "Play Background Stream"}
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-blue-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={() => setShowVideoOverlay(!showVideoOverlay)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={showVideoOverlay ? "Switch to 3D Cyber Mesh" : "Enable Video Overlay"}
              >
                {showVideoOverlay ? <Sliders className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-700/60 text-blue-400 text-xs font-mono font-semibold mb-6 backdrop-blur-md shadow-lg shadow-blue-950/40">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.9% PRODUCTION SLA • CLOUD & DEVOPS ENGINEER</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Architecting Resilient <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                  Cloud Infrastructure
                </span>
                <br />& Automated Pipelines
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Results-driven <strong className="text-white font-semibold">Cloud Engineer</strong> with hands-on expertise across <strong className="text-blue-400 font-semibold">AWS</strong>, <strong className="text-blue-400 font-semibold">GCP</strong>, <strong className="text-blue-400 font-semibold">VMware ESXi virtualization</strong>, Linux administration (Ubuntu), and enterprise datacenter operations. Standardizing CI/CD provisioning to accelerate release velocity and ensure high availability.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <a
                  href="#live-ops"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:-translate-y-1 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Watch Cloud Video Ops</span>
                </a>

                <a
                  href="#architecture"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-blue-500/50 font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/50 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Architecture Visualizer</span>
                </a>
                
                <a
                  href={getAssetUrl('Abhishek_Singh_ATS_Resume.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Resume (PDF)</span>
                </a>
              </div>

              {/* Quick Tech Highlights */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 hover:text-blue-300 transition-all cursor-default">
                  <Cloud className="w-4 h-4 text-blue-400" /> AWS & GCP
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 hover:text-emerald-300 transition-all cursor-default">
                  <Server className="w-4 h-4 text-emerald-400" /> VMware ESXi
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-800/80 hover:border-amber-500/40 hover:text-amber-300 transition-all cursor-default">
                  <TerminalIcon className="w-4 h-4 text-amber-400" /> Ubuntu Linux
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/40 hover:text-purple-300 transition-all cursor-default">
                  <Shield className="w-4 h-4 text-purple-400" /> OCI & Fortinet Certified
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual & Profile Image with Orbiting Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping [animation-duration:4s] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-cyan-500/20 [animation-duration:6s] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-transparent rounded-full blur-2xl -z-10" />

              <div className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full p-2.5 bg-gradient-to-b from-blue-500/40 via-slate-800 to-slate-900 border-2 border-blue-500/40 shadow-[0_0_50px_rgba(37,99,235,0.3)] relative group hover:border-blue-400 transition-all duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                  {!imageError ? (
                    <img
                      src={profilePhoto}
                      alt="Abhishek Singh - Cloud & DevOps Engineer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
                      <TerminalIcon className="w-16 h-16 text-blue-400 mb-2" />
                      <span className="font-bold text-white text-lg">Abhishek Singh</span>
                      <span className="text-xs text-blue-400 font-mono">Cloud Engineer</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Orbiting Badges with Live Animations */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-2 -left-4 bg-[#0d121d]/95 backdrop-blur-md border border-blue-500/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 hover:scale-105 hover:border-blue-400 transition-all cursor-default"
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
                  className="absolute bottom-6 -right-6 bg-[#0d121d]/95 backdrop-blur-md border border-emerald-500/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 hover:scale-105 hover:border-emerald-400 transition-all cursor-default"
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
                  className="absolute -bottom-4 left-6 bg-[#0d121d]/95 backdrop-blur-md border border-purple-500/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 hover:border-purple-400 transition-all cursor-default"
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
    <section className="py-8 bg-[#0b0f19] border-y border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <AstraCard key={idx} className="p-5 flex flex-row items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 transition-all duration-300">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">{stat.detail}</div>
              </div>
            </AstraCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Dedicated Live Cloud Video & Architecture Operations Center
// ----------------------------------------------------
function CloudOpsLiveCenter() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<'1x' | '2x'>('1x');
  const [slideProgress, setSlideProgress] = useState(0);

  const channels = [
    {
      id: "ch-aws",
      title: "AWS Multi-Region VPC & RDS Failover Topology",
      category: "AWS Cloud Architecture",
      sla: "99.9% Production SLA",
      metrics: { latency: "14ms", throughput: "1.4 GB/s", state: "HEALTHY", region: "us-east-1 & ap-south-1" },
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4",
      posterBg: "from-blue-950 via-slate-900 to-indigo-950",
      description: "Live telemetry stream of multi-cloud VPC peering, EC2 autoscaling groups, and multi-AZ RDS database replication ensuring continuous 99.9% uptime SLA.",
      logs: [
        "[AWS::VPC] Routing tables synchronized across subnets.",
        "[AWS::RDS] Multi-AZ heartbeat acknowledged: 0ms sync lag.",
        "[AWS::IAM] Least-privilege role validation passed for 48 instances."
      ]
    },
    {
      id: "ch-vmware",
      title: "VMware ESXi Hypervisor & Datacenter Storage Cluster",
      category: "Virtualization & Bare-Metal",
      sla: "Bare-Metal Active",
      metrics: { latency: "0.8ms", throughput: "4.8 GB/s", state: "OPTIMAL", region: "On-Premises Datacenter" },
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31912-large.mp4",
      posterBg: "from-emerald-950 via-slate-900 to-teal-950",
      description: "Direct hypervisor virtualization console: managing VM provisioning, CPU scheduling, datastore allocation, and hardware RAID array operations.",
      logs: [
        "[ESXi::Host] Hypervisor kernel vSphere 8.0 running healthy.",
        "[RAID::Controller] Array Status: RAID-10 Optimal, 0 degraded drives.",
        "[VM::Provision] Snapshot snapshot_nightly_backup completed successfully."
      ]
    },
    {
      id: "ch-cicd",
      title: "Automated CI/CD Pipeline & 20% Fast-Track Deployment",
      category: "DevOps & Automation",
      sla: "20% Faster Releases",
      metrics: { latency: "42s build", throughput: "100% Pass", state: "ACTIVE", region: "Automated Deployments" },
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4",
      posterBg: "from-amber-950 via-slate-900 to-orange-950",
      description: "Standardized continuous integration and deployment pipelines automating code compilation, Docker image scans, and zero-downtime Plesk push.",
      logs: [
        "[CI::Runner] Webhook triggered from GitHub repository master branch.",
        "[CD::Plesk] Static assets synced with atomic zero-downtime switch.",
        "[Perf::Audit] Deployment cycle completed in 42s (20% acceleration)."
      ]
    },
    {
      id: "ch-security",
      title: "Zero-Trust Fortinet Cybersecurity & Network Hardening",
      category: "Cybersecurity & IAM",
      sla: "Fortinet Hardened",
      metrics: { latency: "1.2ms inspect", throughput: "10 Gbps", state: "PROTECTED", region: "Zero-Trust Mesh" },
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31912-large.mp4",
      posterBg: "from-purple-950 via-slate-900 to-pink-950",
      description: "Active perimeter defense, deep packet inspection, TLS 1.3 encryption tunneling, and credential rotation certified by Fortinet Associate standards.",
      logs: [
        "[Fortinet::FW] Policy 104 enforced: 0 unauthorized ingress attempts.",
        "[VPN::Tunnel] IPSec secure tunnel established with 256-bit AES.",
        "[IAM::Security] Zero-Trust access token renewed with MFA validation."
      ]
    },
    {
      id: "ch-ai",
      title: "Women Safety Analytics & Threat AI Telemetry",
      category: "AI & Data Innovation",
      sla: "SIH Award Winner",
      metrics: { latency: "24ms infer", throughput: "Real-Time", state: "STREAMING", region: "Edge Analytics" },
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4",
      posterBg: "from-cyan-950 via-slate-900 to-blue-950",
      description: "Machine learning anomaly detection platform processing live behavioral threat signals and generating emergency telemetry alerts.",
      logs: [
        "[ML::Model] Scikit-learn anomaly classifier loaded in inference memory.",
        "[Telemetry::Feed] Anomaly threshold evaluated: Normal telemetry stream.",
        "[Award::SIH] Smart India Hackathon & Hackwith Uttarakhand recognized."
      ]
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const duration = speed === '1x' ? 8000 : 4000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveChannel((ch) => (ch + 1) % channels.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed, activeChannel, channels.length]);

  const handleNext = () => {
    setSlideProgress(0);
    setActiveChannel((prev) => (prev + 1) % channels.length);
  };

  const handlePrev = () => {
    setSlideProgress(0);
    setActiveChannel((prev) => (prev - 1 + channels.length) % channels.length);
  };

  const curr = channels[activeChannel];

  return (
    <section id="live-ops" className="py-24 bg-[#07090e]/95 border-t border-slate-800/80 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Video className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>LIVE CLOUD VIDEO & ARCHITECTURE SLIDE SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cloud Operations Command Center
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Switch between live infrastructure video channels, telemetry streams, and architectural topologies.
          </p>
        </motion.div>

        {/* Channel Navigation Slide Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {channels.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChannel(idx);
                setSlideProgress(0);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-mono whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                activeChannel === idx
                  ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] font-bold scale-105'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeChannel === idx ? 'bg-white animate-ping' : 'bg-slate-600'}`} />
              <span>CH {idx + 1}: {ch.category}</span>
            </button>
          ))}
        </div>

        {/* Main Video & Slide Showcase Player */}
        <AstraCard className="rounded-3xl bg-gradient-to-b from-[#0e1424] via-[#090d16] to-[#0a0f1d] border-blue-900/50 shadow-[0_0_50px_rgba(14,20,36,0.8)]">
          <div className="px-6 py-4 bg-[#0d121f]/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span>CHANNEL 0{activeChannel + 1} // {curr.category.toUpperCase()}</span>
                </span>
                <p className="text-[11px] text-slate-400 font-mono">{curr.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105 cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'AUTO-SLIDE' : 'PAUSED'}</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105 cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSpeed(speed === '1x' ? '2x' : '1x')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 hover:border-cyan-500/40 cursor-pointer"
              >
                {speed} SPEED
              </button>
            </div>
          </div>

          <div className="w-full h-1 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-75"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          {/* Video & Telemetry Display Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between relative min-h-[400px] bg-black/40">
              <div className="absolute inset-0 overflow-hidden opacity-35 mix-blend-screen pointer-events-none">
                <video
                  key={curr.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={curr.videoSrc} type="video/mp4" />
                </video>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-red-600/90 text-white text-[10px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  REC // LIVE
                </span>
                <span className="text-xs font-mono text-cyan-300 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
                  {curr.sla}
                </span>
              </div>

              {/* Real-time Animated Architecture Topology Diagram */}
              <div className="relative z-10 my-4">
                <CloudTopologyDiagram type={curr.id} />
              </div>

              <div className="relative z-10 mt-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  {curr.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed mb-6">
                  {curr.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">LATENCY</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{curr.metrics.latency}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">BANDWIDTH</div>
                    <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{curr.metrics.throughput}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">CLUSTER STATE</div>
                    <div className="text-sm font-bold text-blue-400 font-mono mt-0.5">{curr.metrics.state}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-500">REGION MESH</div>
                    <div className="text-xs font-bold text-slate-200 font-mono mt-0.5 truncate">{curr.metrics.region}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 bg-[#090d18] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-cyan-400" />
                    LIVE OPS LOGS
                  </span>
                  <span className="text-[10px] text-emerald-400 animate-pulse font-bold">STREAM ACTIVE</span>
                </div>

                <div className="space-y-3">
                  {curr.logs.map((log, lIdx) => (
                    <div key={lIdx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                      <span className="text-cyan-400 mr-2">❯</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {channels.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setActiveChannel(dotIdx);
                        setSlideProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeChannel === dotIdx ? 'w-6 bg-blue-500 shadow-md shadow-blue-500/50' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Jump to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <span className="text-slate-500 text-[11px]">
                  Slide 0{activeChannel + 1} / 0{channels.length}
                </span>
              </div>
            </div>

          </div>
        </AstraCard>

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
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const quickCommands = ['help', 'whoami', 'skills', 'infra', 'experience', 'certs', 'contact'];

  return (
    <section id="terminal" className="py-20 bg-[#07090e]/90 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLOUD SHELL</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Interactive Engineer Console</h2>
          <p className="text-sm text-slate-400 mt-2">Test my background and infrastructure knowledge directly via shell commands.</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-xs text-slate-500 font-mono">Quick CLI:</span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => executeCommand(q)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white text-blue-400 border border-slate-800 hover:border-blue-500 text-xs font-mono transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              ${q}
            </button>
          ))}
        </div>

        <AstraCard className="rounded-2xl bg-[#090d16]/95 border-slate-800 font-mono text-sm shadow-2xl">
          <div className="px-4 py-3 bg-[#0d121f] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block hover:scale-110 transition-transform cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:scale-110 transition-transform cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:scale-110 transition-transform cursor-pointer" />
              <span className="ml-2 text-xs text-slate-400 font-semibold">abhishek@cloud-node-01: ~</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>bash / zsh 5.9</span>
            </div>
          </div>

          <div ref={terminalContainerRef} className="p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-4">
            <div className="text-slate-500 text-xs">
              Welcome to Abhishek Singh Cloud Terminal v2.4 (x86_64-pc-linux-gnu).<br />
              Type <span className="text-blue-400 font-semibold">help</span> to view available system telemetry commands.
            </div>

            {history.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-semibold">abhishek@prod-cloud</span>
                  <span className="text-slate-600">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-white font-semibold">{item.cmd}</span>
                </div>
                <div className="text-slate-300 pl-4 border-l-2 border-blue-500/40 py-0.5 text-xs leading-relaxed bg-blue-950/10 rounded-r">
                  {item.output}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 text-slate-300 pt-2">
              <span className="text-emerald-400 font-semibold">abhishek@prod-cloud</span>
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
          </div>
        </AstraCard>
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
    <section id="architecture" className="py-24 bg-[#0a0d16]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>INFRASTRUCTURE TOPOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            End-to-End Cloud & DevOps Architecture
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            How I architect, secure, virtualize, and automate production workloads from code push to 99.9% SLA uptime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineSteps.map((step, idx) => (
            <AstraCard
              key={step.id}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              className="p-6 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white transition-transform duration-300 ${activeStep === idx ? 'scale-110 bg-blue-600/20 border-blue-500/40' : ''}`}>
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border transition-colors ${activeStep === idx ? 'bg-blue-600 text-white border-blue-400 font-bold' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                      Stage 0{step.id}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono font-semibold text-blue-400 mb-1">{step.badge}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{step.desc}</p>
              </div>
              
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="text-slate-500">Tech:</span>
                <span className="text-slate-200 font-semibold">{step.tech}</span>
              </div>
            </AstraCard>
          ))}
        </div>

        <AstraCard className="mt-12 p-7 bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Hybrid Cloud & Datacenter Reliability Model</h4>
              <p className="text-xs text-slate-400 mt-0.5">Combining VMware ESXi on-premise control with AWS & GCP elastic cloud scale.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono font-medium hover:scale-105 transition-transform cursor-default">
              ✓ 99.9% High Availability
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-mono font-medium hover:scale-105 transition-transform cursor-default">
              ✓ Automated DR & Backups
            </span>
          </div>
        </AstraCard>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// About Me Section
// ----------------------------------------------------
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#07090e]/95 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ENGINEER PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Engineering High-Availability Infrastructure with Precision
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a results-driven <strong className="text-white">Cloud Engineer</strong> currently managing production cloud and datacenter workloads at <strong className="text-blue-400 font-semibold">Purvaco Technology Pvt. Ltd.</strong> in Ghaziabad, India.
              </p>
              <p>
                My background bridges the full spectrum of modern infrastructure: from low-level datacenter hardware maintenance, RAID configuration, and VMware ESXi hypervisor virtualization, up to multi-cloud architecture across <strong className="text-white">AWS (EC2, S3, VPC, RDS, IAM)</strong> and <strong className="text-white">Google Cloud Platform (GCP, AlloyDB)</strong>.
              </p>
              <p>
                I have a strong track record of maintaining strict <strong className="text-emerald-400 font-semibold">99.9% uptime SLAs</strong> for business-critical client applications, executing disaster recovery protocols, hardening security policies, and standardizing CI/CD provisioning workflows that reduced deployment latency by <strong className="text-blue-400 font-semibold">20%</strong>.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white transition-all cursor-default hover:scale-105">
                <Check className="w-4 h-4 text-emerald-400" /> Multi-Cloud (AWS & GCP)
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white transition-all cursor-default hover:scale-105">
                <Check className="w-4 h-4 text-emerald-400" /> VMware ESXi Virtualization
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 hover:border-amber-500/50 hover:bg-slate-800 hover:text-white transition-all cursor-default hover:scale-105">
                <Check className="w-4 h-4 text-emerald-400" /> Linux & Windows Admin
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2 hover:border-purple-500/50 hover:bg-slate-800 hover:text-white transition-all cursor-default hover:scale-105">
                <Check className="w-4 h-4 text-emerald-400" /> Disaster Recovery & RAID
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AstraCard className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 transition-all duration-300">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Operations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resource rightsizing, cost optimization, IAM access management, and high availability deployments across AWS and GCP.
              </p>
            </AstraCard>

            <AstraCard className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 transition-all duration-300">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Virtualization & OS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                VMware ESXi hypervisors, capacity planning, VM provisioning, Ubuntu Linux administration, and Windows Server 2016-2022.
              </p>
            </AstraCard>

            <AstraCard className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4 transition-all duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Security & Networking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Firewall configuration, DNS, DHCP, VPN, TCP/IP, network troubleshooting, and cybersecurity compliance frameworks.
              </p>
            </AstraCard>

            <AstraCard className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4 transition-all duration-300">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Datacenter Ops</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hardware maintenance, RAID disk configuration, rack installations, network cabling, and disaster recovery execution.
              </p>
            </AstraCard>
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
    <section id="skills" className="py-24 bg-[#0a0d16]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>EXPERT CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Technical Skills
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Detailed breakdown of technologies, platforms, and operational tools verified by production experience and certifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((group, idx) => (
            <AstraCard key={idx} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800/80">
                  <div className="p-2.5 rounded-2xl bg-slate-800 text-white transition-all">
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
            </AstraCard>
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
    <section id="career" className="py-24 bg-[#07090e]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PROGRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience & Career History
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Verifiable track record in production cloud systems, hypervisor management, and infrastructure automation.
          </p>
        </motion.div>

        <div className="space-y-12 relative">
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative md:pl-20">
              <div className="hidden md:flex absolute left-5 top-7 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              </div>

              <AstraCard className="p-8 sm:p-10 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">{exp.type}</span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{exp.role}</h3>
                    <div className="text-sm font-medium text-slate-300 mt-1">{exp.company} • <span className="text-slate-500">{exp.location}</span></div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-950/70 border border-blue-800/70 text-blue-400 text-xs font-mono font-medium shadow-md">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-6 italic">{exp.description}</p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">Key Responsibilities & Deliverables:</h4>
                <ul className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, aIdx) => (
                    <li key={aIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-sm" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/40 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </AstraCard>
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
    <section className="py-20 bg-[#0a0d16]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AstraCard className="p-8 sm:p-12 bg-gradient-to-br from-[#0c1220] via-slate-900 to-[#0c1220] border-blue-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
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
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>VM Provisioning & Capacity Planning</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>RAID Configuration & Storage</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Hypervisor Patching & Upgrades</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Rack Installation & Network Cabling</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>VM Snapshots & Disaster Recovery</span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Server Deployment & Hardware Maint.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Animated Server Rack Chassis */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full">
                <AnimatedDatacenterRack />
              </div>
            </div>

          </div>
        </AstraCard>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Projects & Case Studies Interactive Slide Carousel
// ----------------------------------------------------
function ProjectsSection() {
  const [projectSlide, setProjectSlide] = useState(0);

  const projects = [
    {
      title: "Women Safety Analytics — AI & Threat Detection Platform",
      tagline: "Smart India Hackathon (SIH) & Hackwith Uttarakhand Award Winner",
      category: "AI & Threat Analytics",
      badgeColor: "border-blue-500/40 bg-blue-500/10 text-blue-400",
      description: "Engineered a real-time safety telemetry and anomaly detection platform using Python and Scikit-learn to detect irregular danger signals in public areas. Successfully deployed in 5+ field prototypes with Madadgar Foundation.",
      tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Anomaly Detection", "FastAPI"],
      highlights: [
        "Smart India Hackathon (SIH) Award Winner for technical architecture.",
        "Hackwith Uttarakhand Innovation Award for practical societal impact.",
        "5+ functional software prototypes deployed with Madadgar Foundation."
      ],
      metrics: "96.4% Detection Accuracy • Real-Time Alert Dispatch"
    },
    {
      title: "Enterprise Multi-Cloud Infrastructure & Automated CI/CD",
      tagline: "Purvaco Technology Pvt. Ltd. — 99.9% Production SLA",
      category: "Cloud & DevOps Architecture",
      badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      description: "Architected multi-cloud hosting environment on AWS (EC2, S3, RDS, VPC) and Google Cloud Platform with automated CI/CD deployment pipelines, cutting application rollout turnaround times by 20%.",
      tech: ["AWS", "GCP", "CI/CD Pipelines", "Ubuntu Linux", "Plesk", "Docker"],
      highlights: [
        "99.9% SLA sustained across client-facing production workloads.",
        "20% reduction in deployment turnaround time via pipeline automation.",
        "Multi-cloud disaster recovery and automated snapshot management."
      ],
      metrics: "99.9% Uptime SLA • 20% Release Velocity Boost"
    },
    {
      title: "Datacenter Virtualization & Hypervisor Optimization",
      tagline: "VMware ESXi Cluster & Bare-Metal Hardware Administration",
      category: "Datacenter & Hypervisors",
      badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-400",
      description: "Administering enterprise VMware ESXi virtualization cluster, hardware RAID disk arrays, rack installations, network cabling, and least-privilege zero-trust firewall configurations.",
      tech: ["VMware ESXi", "RAID Storage", "Windows Server", "Firewall Rules", "VPN Tunneling"],
      highlights: [
        "Zero data loss with scheduled snapshot backups and RAID fault tolerance.",
        "Full bare-metal lifecycle management from unboxing to hypervisor provisioning.",
        "Hardened firewall policies and secure VPN remote access tunnels."
      ],
      metrics: "0 Data Loss • Multi-Tier RAID Redundancy"
    }
  ];

  const nextSlide = () => setProjectSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setProjectSlide((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[projectSlide];

  return (
    <section id="projects" className="py-24 bg-[#07090e]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>INTERACTIVE PROJECT SLIDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Engineering Case Studies
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Slide through real-world cloud migrations, AI applications, and virtualization deployments.
          </p>
        </motion.div>

        <div className="flex items-center justify-between max-w-4xl mx-auto mb-6">
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setProjectSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  projectSlide === idx ? 'w-8 bg-blue-500 shadow-md shadow-blue-500/50' : 'w-2.5 bg-slate-800 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105 cursor-pointer shadow-md"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all hover:scale-105 cursor-pointer shadow-md"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={projectSlide}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35 }}
          >
            <AstraCard className="max-w-4xl mx-auto p-8 sm:p-12 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold border ${activeProject.badgeColor}`}>
                  {activeProject.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Project 0{projectSlide + 1} / 0{projects.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-snug">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-400 mb-6">
                {activeProject.tagline}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {activeProject.description}
              </p>

              <div className="mb-8 space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Key Outcomes:</div>
                {activeProject.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/60">
                  {activeProject.metrics}
                </span>
              </div>
            </AstraCard>
          </motion.div>
        </AnimatePresence>

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
    <section id="certifications" className="py-24 bg-[#0a0d16]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>VERIFIABLE CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Certifications
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Officially verified cloud, cybersecurity, and enterprise infrastructure credentials. Click to view documents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <AstraCard key={idx} className="p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {cert.year}
                  </span>
                </div>

                <div className="text-xs font-mono text-blue-400 font-semibold mb-1">{cert.badge}</div>
                <h3 className="font-bold text-white text-base leading-snug mb-2">{cert.name}</h3>
                <div className="text-xs text-slate-400 font-medium mb-3">Issued by {cert.issuer}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{cert.description}</p>

                {cert.id && (
                  <div className="p-2.5 rounded-xl bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800/80 mb-4 flex items-center justify-between">
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View PDF
                    </button>
                    <a
                      href={getAssetUrl(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all hover:scale-105"
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
            </AstraCard>
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
    <section className="py-20 bg-[#07090e]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Engineering Philosophy</h2>
          <p className="text-sm text-slate-400 mt-2">The fundamental architectural principles guiding every production deployment.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <AstraCard key={idx} className="p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center mb-4 transition-all duration-300">
                {p.icon}
              </div>
              <h3 className="font-bold text-white text-base mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </AstraCard>
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
    <section id="education" className="py-20 bg-[#0a0d16]/95 border-t border-slate-800/80 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AstraCard className="p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4 mx-auto">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology in Computer Science and Engineering</h3>
          <div className="text-blue-400 font-semibold text-base mb-4">Nitra Technical Campus, Ghaziabad, UP</div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            2022 — 2026 • Computer Science & Engineering
          </div>
          <p className="text-xs text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Focus on Operating Systems, Computer Networks, Distributed Computing, Database Management Systems, and Cloud Architectures.
          </p>
        </AstraCard>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Contact Section
// ----------------------------------------------------
function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#07090e]/95 border-t border-slate-800/80 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/70 text-blue-400 text-xs font-mono mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN FOR CLOUD & DEVOPS OPPORTUNITIES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let's Build Something Reliable.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Looking for a dedicated Cloud & DevOps Engineer to design resilient infrastructure, automate CI/CD pipelines, or optimize your cloud costs?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="mailto:7080dhiru@gmail.com"
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.65)] hover:-translate-y-1 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>7080dhiru@gmail.com</span>
            </a>

            <a
              href="https://linkedin.com/in/abhishek-singh-4489ab265"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-900/40 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <LinkedInIcon />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="https://github.com/7080dhiru-star"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-bold text-sm transition-all hover:-translate-y-1 shadow-md cursor-pointer"
            >
              <GitHubIcon />
              <span>GitHub Profile</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 9935953563</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Ghaziabad, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Immediate Availability</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Footer
// ----------------------------------------------------
function Footer() {
  return (
    <footer className="py-8 bg-[#05070a] border-t border-slate-900 text-center text-xs text-slate-500 font-mono relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Abhishek Singh. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#home" className="hover:text-blue-400 transition-colors">Back to Top ↑</a>
          <a href={getAssetUrl('Abhishek_Singh_ATS_Resume.pdf')} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Download Resume (PDF)</a>
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
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors hover:scale-105 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400">
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

        {pdfUrl ? (
          <div className="space-y-4">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center relative shadow-inner">
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" /> Open Fullscreen PDF
              </a>
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
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
