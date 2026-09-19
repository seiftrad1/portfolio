'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================
// HOOKS
// ============================================

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold });

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [threshold]);

  return [ref, isInView];
};

// ============================================
// PERSONA CONFIGURATIONS
// ============================================

const personas = {
  engineer: {
    title: 'Software Engineer',
    subtitle: 'SYSTEM.ARCHITECT',
    color: '#00ff88',
    colorAlt: '#00cc6a',
    colorGlow: 'rgba(0, 255, 136, 0.3)',
    font: "'JetBrains Mono', 'Fira Code', monospace",
    bg: 'radial-gradient(ellipse at 20% 50%, rgba(0, 255, 136, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0, 204, 106, 0.05) 0%, transparent 40%), linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #010409 100%)',
    heroText: 'BUILDING_THE_FUTURE',
    tagline: '> Architecting digital experiences through elegant code',
    philosophy: 'Code is poetry. Systems are symphonies. Every function tells a story.',
    skills: [
      { name: 'REACT/NEXT.JS', level: 95, detail: 'production-ready' },
      { name: 'TYPESCRIPT', level: 92, detail: 'type-safe' },
      { name: 'NODE.JS', level: 88, detail: 'scalable' },
      { name: 'SYSTEM_DESIGN', level: 85, detail: 'distributed' },
      { name: 'CLOUD/AWS', level: 82, detail: 'serverless' },
      { name: 'PYTHON', level: 80, detail: 'ml-ready' },
    ],
    projects: [
      { id: 1, title: 'NEURAL_ANALYTICS', status: 'DEPLOYED', metrics: '1M+ events/day', tech: 'Python • Kafka • K8s', desc: 'Real-time ML pipeline for predictive analytics' },
      { id: 2, title: 'DEVFLOW_CLI', status: 'OPEN_SOURCE', metrics: '10K+ downloads', tech: 'Rust • GitHub API', desc: 'Developer productivity toolkit' },
      { id: 3, title: 'QUANTUM_UI', status: 'MAINTAINED', metrics: '50+ components', tech: 'React • TypeScript', desc: 'Accessible component library' },
    ],
    journey: [
      { year: '2024', event: 'Senior Engineer @ TechCorp' },
      { year: '2022', event: 'Lead Developer @ StartupX' },
      { year: '2020', event: 'Full Stack @ Agency' },
      { year: '2019', event: 'CS Degree • Top of Class' },
    ],
    socials: [
      { name: 'GitHub', icon: 'github', url: '#' },
      { name: 'LinkedIn', icon: 'linkedin', url: '#' },
      { name: 'Email', icon: 'email', url: '#' },
    ],
  },
  photographer: {
    title: 'Photographer',
    subtitle: 'VISUAL STORYTELLER',
    color: '#06b6d4',
    colorAlt: '#0891b2',
    colorGlow: 'rgba(6, 182, 212, 0.3)',
    font: "'Cormorant Garamond', Georgia, serif",
    bg: 'radial-gradient(ellipse at 30% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(8, 145, 178, 0.08) 0%, transparent 50%), linear-gradient(180deg, #020617 0%, #0c1929 50%, #020617 100%)',
    heroText: 'CAPTURING LIGHT',
    tagline: 'Moments frozen in time. Stories told through shadows.',
    philosophy: 'Every frame is a universe. Every click, a heartbeat preserved forever.',
    skills: [
      { name: 'Portrait', level: 95, detail: 'emotive' },
      { name: 'Street', level: 92, detail: 'candid' },
      { name: 'Landscape', level: 88, detail: 'epic' },
      { name: 'Lightroom', level: 90, detail: 'mastered' },
      { name: 'Composition', level: 94, detail: 'instinctive' },
      { name: 'Lighting', level: 87, detail: 'natural' },
    ],
    gallery: [
      { id: 1, title: 'Urban Dreams', category: 'STREET', aspect: 'portrait', gradient: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #0c4a6e 100%)' },
      { id: 2, title: 'Golden Hour', category: 'PORTRAIT', aspect: 'landscape', gradient: 'linear-gradient(45deg, #155e75 0%, #0e7490 50%, #155e75 100%)' },
      { id: 3, title: 'Ocean Depths', category: 'STREET', aspect: 'square', gradient: 'linear-gradient(225deg, #083344 0%, #0c4a6e 50%, #083344 100%)' },
      { id: 4, title: 'Silent Stories', category: 'DOCUMENTARY', aspect: 'portrait', gradient: 'linear-gradient(180deg, #0e7490 0%, #06b6d4 50%, #0e7490 100%)' },
      { id: 5, title: 'Reflections', category: 'LANDSCAPE', aspect: 'landscape', gradient: 'linear-gradient(135deg, #164e63 0%, #155e75 50%, #164e63 100%)' },
      { id: 6, title: 'The Moment', category: 'PORTRAIT', aspect: 'portrait', gradient: 'linear-gradient(45deg, #0891b2 0%, #06b6d4 50%, #0891b2 100%)' },
    ],
    journey: [
      { year: '2024', event: 'Featured in Vogue Italia' },
      { year: '2023', event: 'Solo Exhibition "Shadows"' },
      { year: '2021', event: 'Street Photo of the Year' },
      { year: '2018', event: 'First Published Work' },
    ],
    socials: [
      { name: 'Instagram', icon: 'instagram', url: '#' },
      { name: 'YouTube', icon: 'youtube', url: '#' },
      { name: 'Facebook', icon: 'facebook', url: '#' },
    ],
  },
  creator: {
    title: 'Digital Creator',
    subtitle: 'CONTENT ARCHITECT',
    color: '#a855f7',
    colorAlt: '#ec4899',
    colorGlow: 'rgba(168, 85, 247, 0.3)',
    font: "'Space Grotesk', sans-serif",
    bg: 'radial-gradient(ellipse at 30% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f0517 0%, #1a0a2e 30%, #150520 70%, #0a0510 100%)',
    heroText: 'CREATE. INSPIRE.',
    tagline: 'Building communities through authentic storytelling',
    philosophy: 'Every video is a conversation. Every post, a connection.',
    skills: [
      { name: 'Video Editing', level: 94, detail: 'cinematic' },
      { name: 'Storytelling', level: 92, detail: 'engaging' },
      { name: 'Social Strategy', level: 90, detail: 'viral' },
      { name: 'Community', level: 95, detail: 'authentic' },
      { name: 'Brand Deals', level: 88, detail: 'negotiated' },
      { name: 'Analytics', level: 85, detail: 'data-driven' },
    ],
    stats: [
      { label: 'YouTube', value: '250K', icon: '▶', growth: '+12%' },
      { label: 'Instagram', value: '180K', icon: '📷', growth: '+8%' },
      { label: 'TikTok', value: '70K', icon: '🎵', growth: '+25%' },
      { label: 'Brands', value: '50+', icon: '🤝', growth: 'this year' },
    ],
    content: [
      { id: 1, title: 'Tech Review: M3 Mac', platform: 'YouTube', views: '1.2M', gradient: 'linear-gradient(135deg, #a855f7, #6366f1)' },
      { id: 2, title: 'Day in My Life', platform: 'Instagram', views: '89K', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
      { id: 3, title: 'Setup Tour 2024', platform: 'YouTube', views: '850K', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)' },
      { id: 4, title: 'Viral Moment', platform: 'TikTok', views: '2.5M', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    ],
    journey: [
      { year: '2024', event: '500K Total Followers 🎉' },
      { year: '2023', event: 'YouTube Silver Play Button' },
      { year: '2022', event: 'First Brand Partnership' },
      { year: '2020', event: 'Started the Journey' },
    ],
    socials: [
      { name: 'YouTube', icon: 'youtube', url: '#' },
      { name: 'Instagram', icon: 'instagram', url: '#' },
      { name: 'TikTok', icon: 'tiktok', url: '#' },
    ],
  },
};

// ============================================
// ICONS
// ============================================

const Icons = {
  github: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  linkedin: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  youtube: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  facebook: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  tiktok: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  email: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>,
};

// ============================================
// CUSTOM CURSOR
// ============================================

const CustomCursor = ({ persona, mousePos }) => {
  const p = personas[persona];

  if (persona === 'photographer') {
    return (
      <>
        <div style={{
          position: 'fixed',
          left: mousePos.x - 25,
          top: mousePos.y - 25,
          width: 50,
          height: 50,
          border: `1px solid ${p.color}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }} />
        <div style={{
          position: 'fixed',
          left: mousePos.x - 3,
          top: mousePos.y - 3,
          width: 6,
          height: 6,
          background: p.color,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }} />
      </>
    );
  }

  if (persona === 'engineer') {
    return (
      <div style={{
        position: 'fixed',
        left: mousePos.x - 10,
        top: mousePos.y - 10,
        width: 20,
        height: 20,
        pointerEvents: 'none',
        zIndex: 9999,
      }}>
        <div style={{ position: 'absolute', left: 9, top: 0, width: 2, height: 20, background: p.color, opacity: 0.8 }} />
        <div style={{ position: 'absolute', left: 0, top: 9, width: 20, height: 2, background: p.color, opacity: 0.8 }} />
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      left: mousePos.x - 12,
      top: mousePos.y - 12,
      width: 24,
      height: 24,
      background: `linear-gradient(135deg, ${p.color}80, ${p.colorAlt}80)`,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9999,
      filter: 'blur(8px)',
    }} />
  );
};

// ============================================
// ANIMATED NAME COMPONENT - FIXED
// ============================================

const AnimatedName = ({ color, colorAlt, isLoaded }) => {
  const letters = ['S', 'E', 'I', 'F'];
  const colors = [color, colorAlt || color, color, colorAlt || color];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0px',
    }}>
      {letters.map((letter, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(5rem, 20vw, 14rem)',
            fontWeight: 900,
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: colors[i],
            textShadow: `0 0 80px ${colors[i]}50, 0 0 120px ${colors[i]}30`,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.8)',
            transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s`,
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

// ============================================
// MAGNETIC BUTTON
// ============================================

const MagneticButton = ({ children, color, onClick, style = {} }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTransform({ x: 0, y: 0 }); setIsHovered(false); }}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: 'transform 0.2s ease-out, background 0.3s ease, box-shadow 0.3s ease',
        border: `1px solid ${color}`,
        background: isHovered ? color : 'transparent',
        color: isHovered ? '#000' : color,
        padding: '14px 28px',
        borderRadius: '50px',
        cursor: 'pointer',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        boxShadow: isHovered ? `0 0 30px ${color}60` : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// ============================================
// TILT CARD
// ============================================

const TiltCard = ({ children, style = {} }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// SKILL CARD
// ============================================

const SkillCard = ({ skill, color, index }) => {
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard>
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered ? `linear-gradient(135deg, ${color}15, ${color}05)` : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isHovered ? color : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '16px',
          padding: '24px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: `all 0.6s ease ${index * 0.1}s`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{skill.name}</span>
          <span style={{ fontSize: '0.7rem', color, fontFamily: "'Space Mono', monospace", opacity: 0.8 }}>{skill.detail}</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            width: inView ? `${skill.level}%` : '0%',
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: '2px',
            transition: `width 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + 0.3}s`,
          }} />
        </div>
        <div style={{ marginTop: '12px', fontSize: '1.5rem', fontWeight: 700, color, fontFamily: "'Space Mono', monospace", textAlign: 'right' }}>
          {skill.level}%
        </div>
      </div>
    </TiltCard>
  );
};

// ============================================
// PROJECT CARD (ENGINEER)
// ============================================

const ProjectCard = ({ project, color, index }) => {
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard>
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${isHovered ? color : `${color}30`}`,
          borderRadius: '16px',
          padding: '28px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `all 0.6s ease ${index * 0.15}s`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', color }}>{project.title}</h3>
          <span style={{ fontSize: '0.6rem', padding: '4px 10px', background: `${color}20`, color, borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{project.status}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '20px', lineHeight: 1.6 }}>{project.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>{project.tech}</span>
          <span style={{ fontSize: '0.8rem', color, fontFamily: "'JetBrains Mono', monospace" }}>{project.metrics}</span>
        </div>
      </div>
    </TiltCard>
  );
};

// ============================================
// GALLERY CARD (PHOTOGRAPHER) - OCEAN THEMED
// ============================================

const GalleryCard = ({ item, color, index }) => {
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  const aspectStyles = {
    portrait: { gridRow: 'span 2' },
    landscape: { gridColumn: 'span 2' },
    square: {},
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        minHeight: '200px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.9)',
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        ...aspectStyles[item.aspect],
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: item.gradient,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 1s ease',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
        opacity: isHovered ? 1 : 0.5,
        transition: 'opacity 0.5s ease',
      }} />
      {/* Hover icon */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: `${color}30`,
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        border: `1px solid ${color}50`,
      }}>
        <span style={{ fontSize: '1.5rem' }}>🔍</span>
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.5s ease',
      }}>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color, marginBottom: '8px', fontFamily: "'Space Mono', monospace" }}>{item.category}</div>
        <h3 style={{ fontSize: '1.3rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: 'italic', color: '#fff' }}>{item.title}</h3>
      </div>
    </div>
  );
};

// ============================================
// STAT CARD (CREATOR)
// ============================================

const StatCard = ({ stat, color, index }) => {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  const targetValue = parseInt(stat.value.replace(/\D/g, ''));

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(targetValue * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      setTimeout(animate, index * 150);
    }
  }, [inView, targetValue, index]);

  return (
    <div
      ref={ref}
      style={{
        background: `linear-gradient(135deg, ${color}15, transparent)`,
        border: `1px solid ${color}30`,
        borderRadius: '24px',
        padding: '32px',
        textAlign: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{stat.icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color, textShadow: `0 0 40px ${color}60` }}>
        {count}{stat.value.includes('K') ? 'K' : stat.value.includes('+') ? '+' : ''}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '8px' }}>{stat.label}</div>
      <div style={{ fontSize: '0.7rem', color, marginTop: '8px', fontFamily: "'Space Mono', monospace" }}>{stat.growth}</div>
    </div>
  );
};

// ============================================
// CONTENT CARD (CREATOR)
// ============================================

const ContentCard = ({ item, color, index }) => {
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard>
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          height: '260px',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(60px)',
          transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: item.gradient,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.3s ease',
        }}>
          <span style={{ fontSize: '1.3rem', marginLeft: '4px' }}>▶</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', color: '#fff' }}>{item.platform}</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{item.views} views</span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{item.title}</h3>
        </div>
      </div>
    </TiltCard>
  );
};

// ============================================
// TIMELINE ITEM
// ============================================

const TimelineItem = ({ item, color, index }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        marginBottom: '32px',
        position: 'relative',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div style={{
        position: 'absolute',
        left: '-32px',
        top: '4px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#000',
        border: `2px solid ${color}`,
        boxShadow: `0 0 20px ${color}60`,
      }} />
      <div style={{ fontSize: '0.8rem', color, fontFamily: "'Space Mono', monospace", marginBottom: '6px' }}>{item.year}</div>
      <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>{item.event}</div>
    </div>
  );
};

// ============================================
// UNIVERSE PORTAL
// ============================================

const UniversePortal = ({ activePersona, onSelect }) => {
  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
      {Object.entries(personas).map(([key, p]) => (
        <TiltCard key={key}>
          <button
            onClick={() => onSelect(key)}
            style={{
              width: '150px',
              height: '180px',
              background: activePersona === key ? `linear-gradient(135deg, ${p.color}30, ${p.color}10)` : 'rgba(255,255,255,0.02)',
              border: `2px solid ${activePersona === key ? p.color : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '20px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.5s ease',
              transform: activePersona === key ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: activePersona === key ? `0 20px 60px ${p.color}40` : 'none',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px', marginTop: '30px', filter: activePersona === key ? `drop-shadow(0 0 20px ${p.color})` : 'none' }}>
              {key === 'engineer' ? '⚡' : key === 'photographer' ? '🌊' : '🎬'}
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', color: activePersona === key ? p.color : 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
              {p.title}
            </div>
            <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activePersona === key ? p.color : 'rgba(255,255,255,0.2)', boxShadow: activePersona === key ? `0 0 10px ${p.color}` : 'none' }} />
              <span style={{ fontSize: '0.55rem', fontFamily: "'Space Mono', monospace", color: 'rgba(255,255,255,0.4)' }}>{activePersona === key ? 'ACTIVE' : 'ENTER'}</span>
            </div>
          </button>
        </TiltCard>
      ))}
    </div>
  );
};

// ============================================
// SECTION TITLE
// ============================================

const SectionTitle = ({ subtitle, title, color, isPhotographer }) => {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '60px' }}>
      <div style={{
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        color,
        fontFamily: "'Space Mono', monospace",
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        {subtitle}
      </div>
      <h2 style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: isPhotographer ? 300 : 700,
        marginTop: '20px',
        fontStyle: isPhotographer ? 'italic' : 'normal',
        color: '#fff',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease 0.1s',
      }}>
        {title}
      </h2>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function SeifPortfolio() {
  const [activePersona, setActivePersona] = useState('engineer');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePos = useMousePosition();

  const persona = personas[activePersona];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const switchPersona = useCallback((newPersona) => {
    if (newPersona === activePersona || isTransitioning) return;
    setIsTransitioning(true);
    setIsLoaded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActivePersona(newPersona);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsLoaded(true);
      }, 300);
    }, 300);
  }, [activePersona, isTransitioning]);

  return (
    <div style={{
      minHeight: '100vh',
      background: persona.bg,
      color: '#fff',
      fontFamily: persona.font,
      transition: 'background 1s ease',
      overflowX: 'hidden',
      cursor: activePersona === 'photographer' ? 'none' : 'auto',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar-thumb { background: ${persona.color}40; border-radius: 3px; }
        ::selection { background: ${persona.color}40; }
      `}</style>

      {/* Custom Cursor */}
      <CustomCursor persona={activePersona} mousePos={mousePos} />

      {/* Transition Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 9000,
        opacity: isTransitioning ? 1 : 0,
        pointerEvents: isTransitioning ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }} />

      {/* Grid Overlay (Engineer) */}
      {activePersona === 'engineer' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* Ocean waves effect (Photographer) */}
      {activePersona === 'photographer' && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, rgba(6, 182, 212, 0.1), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* Spotlight */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${persona.colorGlow} 0%, transparent 70%)`,
        transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`,
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.5,
      }} />

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px',
        position: 'relative',
      }}>
        {/* Floating Elements */}
        {activePersona === 'engineer' && (
          <>
            <div style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: persona.color, opacity: 0.3 }}>{'<code>'}</div>
            <div style={{ position: 'absolute', bottom: '30%', right: '15%', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: persona.color, opacity: 0.3 }}>{'</code>'}</div>
          </>
        )}

        {activePersona === 'creator' && (
          <>
            <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${persona.color}30, transparent)`, filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${persona.colorAlt}20, transparent)`, filter: 'blur(80px)' }} />
          </>
        )}

        {/* Hero Content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            color: persona.color,
            marginBottom: '40px',
            fontFamily: "'Space Mono', monospace",
            opacity: isLoaded ? 0.8 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}>
            {persona.subtitle}
          </div>

          {/* ANIMATED NAME - FIXED */}
          <AnimatedName
            color={persona.color}
            colorAlt={persona.colorAlt}
            isLoaded={isLoaded}
          />

          <div style={{
            fontSize: activePersona === 'photographer' ? 'clamp(1.2rem, 3vw, 2rem)' : 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '40px',
            marginBottom: '20px',
            fontFamily: activePersona === 'photographer' ? "'Cormorant Garamond', serif" : "'Space Mono', monospace",
            fontStyle: activePersona === 'photographer' ? 'italic' : 'normal',
            fontWeight: activePersona === 'photographer' ? 300 : 400,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}>
            {persona.heroText}
          </div>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '500px',
            margin: '0 auto 60px',
            lineHeight: 1.8,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease 0.7s',
          }}>
            {persona.tagline}
          </p>
        </div>

        {/* Universe Portal */}
        <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease 0.9s' }}>
          <UniversePortal activePersona={activePersona} onSelect={switchPersona} />
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" }}></span>
          <div style={{ width: '1px', height: '50px', background: `linear-gradient(to bottom, ${persona.color}, transparent)` }} />
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section style={{ padding: '120px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <SectionTitle subtitle="PHILOSOPHY" title="How I Think" color={persona.color} isPhotographer={activePersona === 'photographer'} />
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 2, marginBottom: '40px' }}>{persona.philosophy}</p>
            <MagneticButton color={persona.color}>Learn More</MagneticButton>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${persona.color}, transparent)` }} />
            {persona.journey.map((item, i) => (
              <TimelineItem key={i} item={item} color={persona.color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section style={{ padding: '120px 20px', background: `linear-gradient(135deg, ${persona.color}08, transparent)` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionTitle subtitle="EXPERTISE" title="What I Master" color={persona.color} isPhotographer={activePersona === 'photographer'} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {persona.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} color={persona.color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section style={{ padding: '120px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle subtitle="PORTFOLIO" title="Proof of Work" color={persona.color} isPhotographer={activePersona === 'photographer'} />

          {/* Engineer Projects */}
          {activePersona === 'engineer' && persona.projects && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              {persona.projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} color={persona.color} index={i} />
              ))}
            </div>
          )}

          {/* Photographer Gallery - Ocean themed */}
          {activePersona === 'photographer' && persona.gallery && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gridAutoRows: '180px', gap: '12px' }}>
              {persona.gallery.map((item, i) => (
                <GalleryCard key={item.id} item={item} color={persona.color} index={i} />
              ))}
            </div>
          )}

          {/* Creator Content */}
          {activePersona === 'creator' && (
            <>
              {persona.stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                  {persona.stats.map((stat, i) => (
                    <StatCard key={i} stat={stat} color={persona.color} index={i} />
                  ))}
                </div>
              )}
              {persona.content && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {persona.content.map((item, i) => (
                    <ContentCard key={item.id} item={item} color={persona.color} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={{ padding: '120px 20px', background: `linear-gradient(to bottom, transparent, ${persona.color}10)` }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle subtitle="CONNECT" title="Let's Build" color={persona.color} isPhotographer={activePersona === 'photographer'} />
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', marginBottom: '50px', lineHeight: 1.8 }}>
            {activePersona === 'engineer' && '> Ready to architect something amazing together?'}
            {activePersona === 'photographer' && 'Every great story starts with a single frame.'}
            {activePersona === 'creator' && "Let's create something that breaks the internet."}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
            {persona.socials.map((social) => (
              <MagneticButton key={social.name} color={persona.color}>
                {Icons[social.icon]}
                {social.name}
              </MagneticButton>
            ))}
          </div>

          {/* QR Code */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '12px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="84" height="84" viewBox="0 0 100 100">
                <rect x="10" y="10" width="25" height="25" fill="#000"/>
                <rect x="65" y="10" width="25" height="25" fill="#000"/>
                <rect x="10" y="65" width="25" height="25" fill="#000"/>
                <rect x="15" y="15" width="15" height="15" fill="#fff"/>
                <rect x="70" y="15" width="15" height="15" fill="#fff"/>
                <rect x="15" y="70" width="15" height="15" fill="#fff"/>
                <rect x="20" y="20" width="5" height="5" fill="#000"/>
                <rect x="75" y="20" width="5" height="5" fill="#000"/>
                <rect x="20" y="75" width="5" height="5" fill="#000"/>
                <rect x="40" y="40" width="20" height="20" fill={persona.color} rx="4"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Space Mono', monospace" }}>Scan to connect</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 20px', borderTop: `1px solid ${persona.color}20`, textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono', monospace" }}>
          © 2024 SEIF • {persona.title.toUpperCase()} EDITION
        </p>
      </footer>
    </div>
  );
}
