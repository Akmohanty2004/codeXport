import React, { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   INLINE SVG ICONS - Optimized for fast loading
═══════════════════════════════════════════════════════════ */
const SVG = {
  HTML5: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.005 112.198-45.019 12.48z"></path><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"></path><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zM64 88.198l-.061.017-15.327-4.14-.979-10.977H33.816l1.928 21.609 28.193 7.822.063-.017z"></path><path fill="#fff" d="M63.952 52.455v13.897h16.795l-1.587 17.776-15.208 4.102v13.936l27.977-7.747.205-2.298 3.207-35.928.335-3.738zM63.952 24.599v13.886h26.331l.223-2.496.516-5.767.33-3.623z"></path></svg>`,
  CSS3: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.054 112.771-45.247 12.543z"></path><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"></path><path fill="#EBEBEB" d="M64.001 51.429h-18.59l-1.237-14.039h19.827v-13.8h-34.64l.331 3.743 3.382 38.05h30.927zM64.001 88.038l-.047.012-15.398-4.126-.984-11.123h-13.78l1.928 21.892 28.192 7.799.063-.015z"></path><path fill="#fff" d="M64.001 51.429v13.783h16.844l-1.577 17.711-15.267 4.106v13.804l28.058-7.776.207-2.301 3.215-35.986.335-3.737zM64.001 24.596v13.807h26.475l.222-2.488.516-5.774.33-3.545z"></path></svg>`,
  JS: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.047 3.617-4.135 6.922-3.358 2.513.563 4.816 2.084 6.187 5.011.523-1.29.994-2.543 1.514-3.793 2.518-6.021 5.192-11.813 7.759-17.589-7.023-2.796-13.584-4.291-20.234-4.291-.114 0-.227.002-.341.006-3.131.112-6.184.748-9.083 1.852-2.638.996-5.105 2.367-7.26 4.065-2.333 1.864-3.871 3.764-4.919 6.036-2.345 5.293-1.977 12.456 1.218 17.749 4.358 6.972 11.673 10.526 20.661 13.841 3.889 1.514 7.869 3.026 9.941 6.103.979 1.442 1.127 2.995.805 4.807-.508 3.146-2.792 4.973-6.099 5.382-4.284.636-8.241-1.189-10.128-4.732-1.137-1.918-1.72-3.996-2.272-6.092-.576.876-1.167 1.742-1.736 2.62-3.051 4.677-6.893 8.512-11.597 11.013-2.738 1.492-6.109 2.771-8.961 2.74-1.159-.012-2.31-.179-3.411-.524-2.619-.801-4.057-2.551-4.169-5.253-.095-1.787.369-3.571 1.155-5.186 2.297-4.173 7.203-6.568 12.733-7.424 3.054-.47 6.141-.447 9.178.144.281.059.562.124.842.189-1.025-2.461-2.111-4.901-3.156-7.354-5.674.471-11.322.087-16.848-.992-5.353-1.046-10.129-3.213-13.875-6.889-5.371-5.699-7.674-12.754-6.537-20.571.88-6.172 3.804-11.443 8.279-15.297 3.883-3.307 8.535-5.443 13.788-6.475 5.397-1.063 10.949-.987 16.411.115 4.745.958 9.145 2.605 13.047 5.163 1.979 1.321 3.727 2.926 5.197 4.792.881 1.132 1.875 2.251 2.522 3.555.206.403.388.815.556 1.233 2.602-5.078 5.249-10.146 7.858-15.231z"></path></svg>`,
  REACT: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="11.4" fill="#61DAFB"></circle><path fill="none" stroke="#61DAFB" stroke-width="3" d="M107.3 64c0-12.6-9.4-23.7-24.3-30.4c-9.5-4.2-20.7-6.4-32.2-6.4c-11.5 0-22.7 2.2-32.2 6.4C30.1 40.3 20.7 51.4 20.7 64c0 12.6 9.4 23.7 24.3 30.4c9.5 4.2 20.7 6.4 32.2 6.4c11.5 0 22.7-2.2 32.2-6.4c14.9-6.7 24.3-17.8 24.3-30.4z"></path><path fill="none" stroke="#61DAFB" stroke-width="3" d="M87.5 43.4c-6.2-10.9-14.4-19-23.5-23.5c-9.1-4.5-18.4-5-26.5-1.4c-8.1 3.6-13.9 11.9-17 23.6c-3.1 11.7-2.4 25.4 2 39.7c3.7 12.2 9.9 21.7 17.9 26.8c8 5.1 17 5.5 25.1 1.8c8.1-3.7 14-12.5 17.1-24.7c3.1-12.2 2.4-25.9-1.9-40.3z"></path><path fill="none" stroke="#61DAFB" stroke-width="3" d="M87.5 84.6c6.2-10.9 9.1-22.8 8.4-34.3c-.7-11.5-4.7-21.6-11.4-27.7c-6.7-6.1-15-8.8-23.9-7.8c-8.9 1-17.5 5.7-24.5 13.2c-7 7.5-11.2 17-13 27.6c-1.8 10.6-.7 21.3 3.2 31c3.9 9.7 10.4 17.1 18.6 20.7c8.2 3.6 17 3.5 25.2.2c8.2-3.3 14.6-10.5 18.4-20.1z"></path></svg>`,
  NODE: `<svg viewBox="0 0 128 128"><path fill="#3C873A" d="M64 3l55 31.8v63.6L64 129 9 97.2V33.8L64 2z"></path><path fill="#3C873A" opacity=".4" d="M64 29l33 19v38L64 105 31 86V48l33-19z"></path><path fill="#FFF" d="M52 78c0 6.8 4 10 10 10s10-3.2 10-10V62h-8v16c0 1.2-.8 2-2 2s-2-.8-2-2V78h-8z"></path></svg>`,
  MYSQL: `<svg viewBox="0 0 128 128"><path fill="#00758F" d="M8 64c0-15.4 12.6-28 28-28h56c15.4 0 28 12.6 28 28s-12.6 28-28 28H36c-15.4 0-28-12.6-28-28z" opacity=".15"></path><path fill="#00758F" d="M20 40h12v48H20zm18 0h12l16 32 16-32h12v48h-12V68l-12 24-12-24v20H38zM102 40h12v48h-12z"></path><path fill="#F29111" d="M102 64c0 10-8 18-18 18s-18-8-18-18 8-18 18-18 18 8 18 18z" opacity=".8"></path></svg>`,
  MONGO: `<svg viewBox="0 0 128 128"><path fill="#599636" d="M64 8c-4.8 8-8 14-8 24 0 12 6 20 8 26 2-6 8-14 8-26 0-10-3.2-16-8-24z"></path><path fill="#6CAC48" d="M64 58v62c14-4 24-20 24-40s-10-36-24-22z"></path><path fill="#599636" d="M64 58v62c-14-4-24-20-24-40s10-36 24-22z"></path></svg>`,
  GITHUB: `<svg viewBox="0 0 128 128"><path fillRule="evenodd" clipRule="evenodd" fill="#fff" d="M64 5.2c-32.5 0-58.9 26.4-58.9 58.9 0 26 16.9 48.1 40.3 55.9 2.9.5 4-1.3 4-2.8 0-1.4-.1-6-.1-10.9-14.2 2.6-17.8-3.4-18.9-6.6-.6-1.6-3.3-6.6-5.6-7.9-1.9-1-4.6-3.5-.1-3.6 4.3-.1 7.3 4 8.3 5.6 4.9 8.2 12.7 5.9 15.8 4.5.5-3.5 1.9-5.9 3.5-7.2-12.1-1.4-24.8-6-24.8-26.8 0-5.9 2.1-10.8 5.6-14.6-.6-1.4-2.4-6.9.5-14.3 0 0 4.6-1.5 15 5.5 4.4-1.2 9.1-1.8 13.7-1.8 4.7 0 9.3.6 13.7 1.8 10.4-7 15-5.5 15-5.5 2.9 7.4 1.1 12.9.5 14.3 3.5 3.8 5.6 8.7 5.6 14.6 0 20.8-12.7 25.4-24.8 26.8 2 1.7 3.7 5 3.7 10 0 7.2-.1 13-.1 14.8 0 1.5 1.1 3.3 4 2.8 23.4-7.8 40.3-29.9 40.3-55.9 0-32.5-26.4-58.9-58.9-58.9z"></path></svg>`,
};

const SKILLS = [
  { name: "HTML5", color: "#E34F26", svg: SVG.HTML5 },
  { name: "CSS3", color: "#1572B6", svg: SVG.CSS3 },
  { name: "JavaScript", color: "#F7DF1E", svg: SVG.JS },
  { name: "React", color: "#61DAFB", svg: SVG.REACT },
  { name: "Node.js", color: "#339933", svg: SVG.NODE },
  { name: "MySQL", color: "#4479A1", svg: SVG.MYSQL },
  { name: "MongoDB", color: "#47A248", svg: SVG.MONGO },
  { name: "GitHub", color: "#e2e8f0", svg: SVG.GITHUB },
];

const SERVICES = [
  { title: "Custom Websites", description: "Fully responsive, modern websites tailored to your brand identity and business goals.", icon: "🌐", color: "#10b981" },
  { title: "Digital Invitations", description: "Beautiful, interactive e-invites for weddings, events, and celebrations.", icon: "💌", color: "#f43f5e" },
  { title: "E-Commerce Solutions", description: "Powerful online stores with secure payments, inventory management.", icon: "🛒", color: "#f59e0b" },
  { title: "Business Portfolios", description: "Showcase your work with stunning portfolio websites that captivate visitors.", icon: "💼", color: "#8b5cf6" },
  { title: "SEO Optimization", description: "Boost your search engine ranking with on-page SEO and fast loading.", icon: "📈", color: "#06b6d4" },
  { title: "24/7 Support", description: "Round-the-clock technical support and maintenance.", icon: "🛡️", color: "#ec4899" },
];

const WHY_CHOOSE = [
  { title: "Creative & Unique Designs", description: "Stand out with custom designs.", icon: "🎨", color: "#10b981" },
  { title: "100% Responsive", description: "Perfect on all devices.", icon: "📱", color: "#06b6d4" },
  { title: "SEO Optimized", description: "Rank higher on search engines.", icon: "🔍", color: "#f43f5e" },
  { title: "Fast Loading Speed", description: "Lightning-fast performance.", icon: "⚡", color: "#f59e0b" },
  { title: "Secure & Reliable", description: "Enterprise-grade security.", icon: "🔒", color: "#8b5cf6" },
  { title: "24/7 Support", description: "Dedicated support team.", icon: "💬", color: "#ec4899" },
  { title: "Affordable Pricing", description: "Competitive rates.", icon: "💰", color: "#14b8a6" },
];

/* ═══════════════════════════════════════════════════════════
   REALISTIC NIGHT BACKGROUND with Stars, Black Hole, Trees
═══════════════════════════════════════════════════════════ */
function NightBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];
    let shootingStars = [];
    let blackHole = { x: 0, y: 0, radius: 70, rotation: 0, pulse: 0, innerGlow: 0 };
    
    const initStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      stars = Array.from({ length: 800 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.3,
        brightness: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };
    
    const addShootingStar = () => {
      if (Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * window.innerWidth,
          y: 0,
          length: 60 + Math.random() * 50,
          speed: 6 + Math.random() * 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 0.8,
        });
      }
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      blackHole.x = canvas.width * 0.85;
      blackHole.y = canvas.height * 0.28;
    };
    
    const drawRealisticBlackHole = () => {
      blackHole.rotation += 0.006;
      blackHole.pulse += 0.04;
      blackHole.innerGlow = 0.5 + Math.sin(blackHole.pulse) * 0.3;
      const pulseScale = 1 + Math.sin(blackHole.pulse) * 0.03;
      
      for (let layer = 0; layer < 3; layer++) {
        const layerRadius = blackHole.radius + 15 + layer * 18;
        const gradient = ctx.createRadialGradient(blackHole.x, blackHole.y, layerRadius - 10, blackHole.x, blackHole.y, layerRadius);
        gradient.addColorStop(0, `rgba(100, 50, 150, ${0.15 - layer * 0.03})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(blackHole.x, blackHole.y, layerRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      ctx.save();
      ctx.translate(blackHole.x, blackHole.y);
      ctx.rotate(blackHole.rotation);
      for (let ring = 0; ring < 3; ring++) {
        const radius = blackHole.radius + 8 + ring * 14;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 100, 180, ${0.25 - ring * 0.05})`;
        ctx.lineWidth = 3 - ring * 0.5;
        ctx.stroke();
      }
      for (let i = 0; i < 180; i += 12) {
        const rad = (i * Math.PI) / 180;
        const radius = blackHole.radius - 5;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 160, ${0.6 + Math.sin(Date.now() * 0.01 + i) * 0.3})`;
        ctx.fill();
      }
      ctx.restore();
      
      const coreGrad = ctx.createRadialGradient(blackHole.x, blackHole.y, 5, blackHole.x, blackHole.y, blackHole.radius);
      coreGrad.addColorStop(0, "rgba(0,0,0,1)");
      coreGrad.addColorStop(0.4, "rgba(15,0,30,0.98)");
      coreGrad.addColorStop(0.7, "rgba(40,0,70,0.9)");
      coreGrad.addColorStop(1, "rgba(80,20,120,0.6)");
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30, 0, 60, ${0.3 + blackHole.innerGlow * 0.2})`;
      ctx.fill();
      
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16 + blackHole.rotation;
        const x = blackHole.x + Math.cos(angle) * (blackHole.radius + 12);
        const y = blackHole.y + Math.sin(angle) * (blackHole.radius + 8);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 150, 200, ${0.2 + Math.sin(Date.now() * 0.008 + i) * 0.1})`;
        ctx.fill();
      }
    };
    
    const drawStars = () => {
      for (let star of stars) {
        const twinkle = 0.3 + Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase) * 0.2;
        const opacity = star.brightness * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 220, ${opacity})`;
        ctx.fill();
        if (star.brightness > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 200, ${opacity * 0.2})`;
          ctx.fill();
        }
      }
    };
    
    const drawShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        for (let t = 0; t < 5; t++) {
          const trailX = s.x - Math.cos(s.angle) * t * 8;
          const trailY = s.y - Math.sin(s.angle) * t * 8;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 1.5 - t * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 200, ${s.opacity * (1 - t * 0.15)})`;
          ctx.fill();
        }
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.02;
        if (s.opacity <= 0 || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          shootingStars.splice(i, 1);
        }
      }
    };
    
    const drawMoon = () => {
      const moonX = canvas.width * 0.12;
      const moonY = canvas.height * 0.1;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 20, moonX, moonY, 90);
      moonGlow.addColorStop(0, "rgba(255, 245, 200, 0.35)");
      moonGlow.addColorStop(0.5, "rgba(255, 235, 150, 0.15)");
      moonGlow.addColorStop(1, "rgba(255, 220, 100, 0)");
      ctx.beginPath();
      ctx.arc(moonX, moonY, 90, 0, Math.PI * 2);
      ctx.fillStyle = moonGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moonX, moonY, 42, 0, Math.PI * 2);
      ctx.fillStyle = "#fef9c3";
      ctx.shadowBlur = 35;
      ctx.shadowColor = "#fef08a";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#d4a574";
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(moonX - 14, moonY - 10, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moonX + 10, moonY + 8, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moonX - 6, moonY + 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(moonX + 16, moonY - 12, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };
    
    const drawRealisticTrees = () => {
      ctx.fillStyle = "#0d2b1f";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00000040";
      const leftX = canvas.width * 0.03;
      const baseY = canvas.height;
      ctx.fillRect(leftX + 8, baseY - 140, 18, 140);
      ctx.fillStyle = "#0f3322";
      ctx.beginPath();
      ctx.moveTo(leftX + 17, baseY - 180);
      ctx.lineTo(leftX, baseY - 130);
      ctx.lineTo(leftX + 34, baseY - 130);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(leftX + 17, baseY - 210);
      ctx.lineTo(leftX, baseY - 160);
      ctx.lineTo(leftX + 34, baseY - 160);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(leftX + 17, baseY - 240);
      ctx.lineTo(leftX + 3, baseY - 190);
      ctx.lineTo(leftX + 31, baseY - 190);
      ctx.fill();
      const rightX = canvas.width * 0.93;
      ctx.fillStyle = "#0d2b1f";
      ctx.fillRect(rightX, baseY - 160, 20, 160);
      ctx.fillStyle = "#0f3322";
      ctx.beginPath();
      ctx.moveTo(rightX + 10, baseY - 205);
      ctx.lineTo(rightX - 8, baseY - 150);
      ctx.lineTo(rightX + 28, baseY - 150);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(rightX + 10, baseY - 240);
      ctx.lineTo(rightX - 5, baseY - 185);
      ctx.lineTo(rightX + 25, baseY - 185);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(rightX + 10, baseY - 275);
      ctx.lineTo(rightX - 2, baseY - 220);
      ctx.lineTo(rightX + 22, baseY - 220);
      ctx.fill();
      ctx.fillStyle = "#0a2a1a";
      for (let i = 0; i < 8; i++) {
        const treeX = canvas.width * (0.1 + i * 0.1);
        const treeHeight = 60 + Math.random() * 40;
        ctx.fillRect(treeX, baseY - treeHeight, 8, treeHeight);
        ctx.beginPath();
        ctx.moveTo(treeX + 4, baseY - treeHeight - 25);
        ctx.lineTo(treeX - 6, baseY - treeHeight);
        ctx.lineTo(treeX + 14, baseY - treeHeight);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };
    
    const drawNightAnimals = () => {
      ctx.font = "36px sans-serif";
      ctx.fillStyle = "rgba(180, 160, 200, 0.55)";
      ctx.fillText("🦉", canvas.width * 0.07, canvas.height - 65);
      ctx.fillText("🦊", canvas.width * 0.18, canvas.height - 48);
      ctx.fillText("🦌", canvas.width * 0.75, canvas.height - 55);
      ctx.fillText("🐺", canvas.width * 0.88, canvas.height - 42);
      ctx.fillText("🦔", canvas.width * 0.5, canvas.height - 50);
      ctx.fillText("🐿️", canvas.width * 0.95, canvas.height - 38);
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a2a");
      gradient.addColorStop(0.5, "#0d0d35");
      gradient.addColorStop(1, "#0a0a2a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawShootingStars();
      drawMoon();
      drawRealisticBlackHole();
      drawRealisticTrees();
      drawNightAnimals();
      addShootingStar();
      animationId = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════════════════════
   LIGHT MODE BACKGROUND
═══════════════════════════════════════════════════════════ */
function LightBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #fef9e6 0%, #fff5e6 30%, #e6f7ff 70%, #d4f1f9 100%)" }} />
      <div style={{ position: "absolute", top: "5%", right: "5%", width: "80px", height: "80px", background: "radial-gradient(circle, #fffb85 0%, #fbbf24 80%, #f59e0b 100%)", borderRadius: "50%", boxShadow: "0 0 50px rgba(251,191,36,0.5)", animation: "sunGlow 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "10%", left: "-100px", whiteSpace: "nowrap", animation: "cloudFloat 25s linear infinite" }}>
        <svg width="140" height="70" viewBox="0 0 140 70"><ellipse cx="35" cy="40" rx="40" ry="28" fill="white" fillOpacity="0.7"/><ellipse cx="75" cy="30" rx="45" ry="32" fill="white" fillOpacity="0.8"/></svg>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position: "absolute", fontSize: "22px", opacity: 0.45, animation: `birdFly ${14 + i * 2}s linear infinite`, top: `${10 + (i * 6)}%`, left: `-5%` }}>🐦</div>
      ))}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "130px", pointerEvents: "none" }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,150 L0,120 Q40,100 80,115 Q120,95 160,110 Q200,90 240,105 Q280,85 320,100 Q360,80 400,95 Q440,75 480,90 Q520,70 560,85 Q600,65 640,80 Q680,60 720,75 Q760,55 800,70 Q840,50 880,65 Q920,45 960,60 Q1000,40 1040,55 Q1080,35 1120,50 Q1160,40 1200,55 L1200,150 Z" fill="#2d6a4f" fillOpacity="0.2" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: "20px", left: "8%", animation: "animalBob 3s ease-in-out infinite", fontSize: "38px" }}>🦊</div>
      <div style={{ position: "absolute", bottom: "15px", right: "15%", animation: "animalBob 3.5s ease-in-out infinite 0.5s", fontSize: "42px" }}>🐿️</div>
      <div style={{ position: "absolute", bottom: "28px", left: "28%", animation: "animalBob 4s ease-in-out infinite 1s", fontSize: "34px" }}>🐦</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════════════════════ */
function TypingAnimation() {
  const words = ["Digital Experiences", "Modern Website", "Creative Solutions", "Powerful Brands"];
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < currentWord.length) {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);
  
  return (
    <span style={{ 
      background: "linear-gradient(135deg,#8b5cf6,#c4b5fd,#e9d5ff)", 
      backgroundSize: "300% 300%", 
      animation: "gradientShift 4s ease infinite", 
      WebkitBackgroundClip: "text", 
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    }}>
      {displayText}<span style={{ animation: "cursorBlink 0.8s step-end infinite", color: "#8b5cf6" }}>|</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.1, rootMargin: "50px" });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(35px)",
      transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}s, transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}s`,
    }}>{children}</div>
  );
}

function SvgIcon({ svg, size = 34 }) {
  return <div style={{ width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg ", `<svg width="${size}" height="${size}" `) }} />;
}

/* ═══════════════════════════════════════════════════════════
   CREATIVE BUTTON
═══════════════════════════════════════════════════════════ */
function CreativeButton({ children, onClick, variant = "primary", style = {}, darkMode = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = variant === "primary" 
    ? (darkMode ? "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4c1d95 100%)" : "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)")
    : (darkMode ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)" : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)");
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "12px 28px",
        borderRadius: 50,
        border: "none",
        background: gradient,
        color: "#fff",
        fontWeight: 700,
        fontSize: "clamp(13px, 3.5vw, 14px)",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered 
          ? `0 12px 28px ${darkMode ? "rgba(139,92,246,0.5)" : "rgba(16,185,129,0.5)"}, 0 0 0 2px rgba(255,255,255,0.2) inset` 
          : `0 6px 16px ${darkMode ? "rgba(139,92,246,0.3)" : "rgba(16,185,129,0.3)"}`,
        letterSpacing: "0.03em",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
        {children}
        {isHovered && <span style={{ animation: "arrowBounce 0.5s ease" }}>→</span>}
      </span>
      {isHovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          animation: "shine 0.8s ease-in-out",
          pointerEvents: "none",
        }} />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
function Nav({ darkMode, toggleDarkMode }) {
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const go = (id) => { setMobileMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const navLinks = ["Home", "About", "Portfolio", "Services", "Why Us", "Contact"];
  const linkColors = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
  
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: "auto", minHeight: 64,
      padding: "10px 6%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
      background: darkMode 
        ? (scroll ? "rgba(10,10,42,0.95)" : "rgba(10,10,42,0.85)")
        : (scroll ? "rgba(255,245,230,0.95)" : "rgba(255,250,240,0.85)"),
      backdropFilter: "blur(20px)", 
      borderBottom: darkMode 
        ? (scroll ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(139,92,246,0.1)")
        : (scroll ? "1px solid rgba(5,150,105,0.15)" : "1px solid rgba(5,150,105,0.08)"),
      transition: "all 0.4s ease", boxSizing: "border-box",
      boxShadow: scroll ? (darkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)") : "none",
    }}>
      <div onClick={() => go("home")} style={{ 
        fontWeight: 900, fontSize: "clamp(22px, 5vw, 28px)", letterSpacing: "0.02em", 
        color: darkMode ? "#c4b5fd" : "#065f46", cursor: "pointer", whiteSpace: "nowrap",
      }}>
        <span style={{color:"red"}}>code</span>Xpert
      </div>
      
      <div style={{ display: mobileMenuOpen ? "none" : "flex", gap: "clamp(20px, 4vw, 36px)", alignItems: "center", flexWrap: "wrap" }} className="desktop-nav">
        {navLinks.map((l, idx) => (
          <button
            key={l}
            onClick={() => go(l.toLowerCase().replace(/ /g, ''))}
            onMouseEnter={() => setHoveredLink(idx)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 4px",
              color: hoveredLink === idx ? linkColors[idx] : (darkMode ? "#c4b5fd" : "#4b5563"),
              fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600,
              borderBottom: hoveredLink === idx ? `2px solid ${linkColors[idx]}` : "2px solid transparent",
              transition: "all 0.3s ease", whiteSpace: "nowrap",
              transform: hoveredLink === idx ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode ? "rgba(139,92,246,0.2)" : "rgba(5,150,105,0.1)",
            border: darkMode ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(5,150,105,0.2)",
            borderRadius: "50%", width: 42, height: 42, cursor: "pointer", fontSize: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <CreativeButton onClick={() => go("contact")} darkMode={darkMode} style={{ padding: "8px 20px", fontSize: "clamp(11px, 3vw, 13px)" }}>
          📞 Get Started
        </CreativeButton>
      </div>
      
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
        display: "none", background: darkMode ? "rgba(139,92,246,0.2)" : "rgba(5,150,105,0.1)",
        border: darkMode ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(5,150,105,0.2)",
        borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: darkMode ? "#c4b5fd" : "#065f46", fontSize: 20,
      }} className="mobile-menu-btn">{mobileMenuOpen ? "✕" : "☰"}</button>
      
      {mobileMenuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, 
          background: darkMode ? "rgba(10,10,42,0.98)" : "rgba(255,250,240,0.98)",
          backdropFilter: "blur(20px)", borderBottom: darkMode ? "1px solid rgba(139,92,246,0.15)" : "1px solid rgba(5,150,105,0.1)",
          padding: "16px 6%", display: "flex", flexDirection: "column", gap: 16, zIndex: 199,
        }}>
          {navLinks.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase().replace(/ /g, ''))} style={{
              background: "none", border: "none", color: darkMode ? "#c4b5fd" : "#374151", fontSize: 16, fontWeight: 500,
              padding: "10px 0", textAlign: "left", cursor: "pointer", borderBottom: darkMode ? "1px solid rgba(139,92,246,0.1)" : "1px solid rgba(5,150,105,0.1)",
            }}>{l}</button>
          ))}
          <CreativeButton onClick={() => go("contact")} darkMode={darkMode} style={{ marginTop: 8, padding: "10px 20px" }}>Get Started</CreativeButton>
        </div>
      )}
    </nav>
  );
}

function ServiceCard({ service, darkMode }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      borderRadius: 24, padding: "clamp(20px, 5vw, 28px)",
      background: darkMode 
        ? (hov ? `linear-gradient(145deg, ${service.color}20, rgba(30,30,60,0.9))` : "rgba(30,30,60,0.6)")
        : (hov ? `linear-gradient(145deg, ${service.color}10, rgba(255,255,255,0.9))` : "rgba(255,255,255,0.85)"),
      border: darkMode 
        ? `1px solid ${hov ? service.color + "88" : "rgba(139,92,246,0.2)"}`
        : `1px solid ${hov ? service.color + "66" : "rgba(5,150,105,0.15)"}`,
      transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
      transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      boxShadow: hov ? (darkMode ? `0 20px 35px ${service.color}40` : `0 20px 35px ${service.color}20`) : "none",
      cursor: "pointer", height: "100%", color: darkMode ? "#e2e8f0" : "#1f2937",
    }}>
      <div style={{ fontSize: 44, marginBottom: 16, transition: "transform 0.3s ease", transform: hov ? "scale(1.1)" : "scale(1)" }}>{service.icon}</div>
      <h3 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 700, marginBottom: 10, color: hov ? service.color : (darkMode ? "#c4b5fd" : "#065f46") }}>{service.title}</h3>
      <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: darkMode ? "#9ca3af" : "#4b5563", lineHeight: 1.6 }}>{service.description}</p>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, opacity: hov ? 1 : 0.6, transition: "opacity 0.3s" }}>
        <span style={{ fontSize: 13, color: service.color, fontWeight: 600 }}>Learn More →</span>
      </div>
    </div>
  );
}

function WhyCard({ item, darkMode }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      borderRadius: 20, padding: "16px 14px",
      background: darkMode 
        ? (hov ? `linear-gradient(145deg, ${item.color}20, rgba(30,30,60,0.9))` : "rgba(30,30,60,0.5)")
        : (hov ? `linear-gradient(145deg, ${item.color}10, rgba(255,255,255,0.95))` : "rgba(255,255,255,0.8)"),
      border: darkMode 
        ? `1px solid ${hov ? item.color + "66" : "rgba(139,92,246,0.2)"}`
        : `1px solid ${hov ? item.color + "44" : "rgba(5,150,105,0.1)"}`,
      transition: "all 0.3s ease", transform: hov ? "translateY(-5px) scale(1.02)" : "translateY(0)",
      textAlign: "center", color: darkMode ? "#e2e8f0" : "#1f2937",
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, color: hov ? item.color : (darkMode ? "#c4b5fd" : "#065f46") }}>{item.title}</h4>
      <p style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280", lineHeight: 1.5 }}>{item.description}</p>
    </div>
  );
}

function PortfolioShowcase({ darkMode }) {
  const portfolios = [
    { title: "Wedding Bliss", type: "Digital Invitation", image: "https://assets.unlayer.com/projects/0/1781163472043-WhatsApp%20Image%202026-06-11%20at%201.03.20%20PM%20(2).jpeg", category: "invitation" },
    { title: "Elegant E-Invite", type: "Digital Invitation", image: "https://assets.unlayer.com/projects/0/1781163581006-WhatsApp%20Image%202026-06-11%20at%201.03.20%20PM.jpeg", category: "invitation" },
    { title: "Fashion Hub", type: "E-Commerce", image: "https://assets.unlayer.com/projects/0/1781163629048-WhatsApp%20Image%202026-06-11%20at%201.03.20%20PM%20(1).jpeg", category: "ecommerce" },
    { title: "Corporate Portfolio", type: "Business Site", image: "https://assets.unlayer.com/projects/0/1781183620939-Screenshot%202026-06-11%20184305.png", category: "business" },
  ];
  const [selected, setSelected] = useState("all");
  const [hoveredPortfolio, setHoveredPortfolio] = useState(null);
  const filtered = selected === "all" ? portfolios : portfolios.filter(p => p.category === selected);
  
  return (
    <div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 35 }}>
        {["all", "invitation", "ecommerce", "business"].map(cat => (
          <button key={cat} onClick={() => setSelected(cat)} style={{
            padding: "7px 22px", borderRadius: 40, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
            transition: "all 0.3s ease", background: selected === cat 
              ? (darkMode ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "linear-gradient(135deg,#059669,#10b981)")
              : (darkMode ? "rgba(30,30,60,0.6)" : "rgba(255,255,255,0.8)"),
            color: selected === cat ? "#fff" : (darkMode ? "#c4b5fd" : "#065f46"),
            border: selected === cat ? "none" : (darkMode ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(5,150,105,0.2)"),
          }}>{cat === "all" ? "All Projects" : cat === "invitation" ? "Invitations" : cat === "ecommerce" ? "E-Commerce" : "Business"}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25 }}>
        {filtered.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div 
              onMouseEnter={() => setHoveredPortfolio(i)} 
              onMouseLeave={() => setHoveredPortfolio(null)}
              style={{
                borderRadius: 20, overflow: "hidden",
                background: darkMode ? "rgba(30,30,60,0.6)" : "rgba(255,255,255,0.9)",
                border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.15)",
                transition: "all 0.35s ease", cursor: "pointer",
                transform: hoveredPortfolio === i ? "translateY(-8px) scale(1.02)" : "translateY(0)",
                boxShadow: hoveredPortfolio === i ? (darkMode ? "0 20px 35px rgba(139,92,246,0.3)" : "0 20px 35px rgba(0,0,0,0.15)") : "none",
              }}
            >
              <img src={item.image} alt={item.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hoveredPortfolio === i ? "scale(1.05)" : "scale(1)" }} />
              <div style={{ padding: "16px 18px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 5, color: darkMode ? "#e2e8f0" : "#1f2937" }}>{item.title}</h3>
                <p style={{ fontSize: 12, color: darkMode ? "#a78bfa" : "#059669", fontWeight: 600 }}>{item.type}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Footer({ darkMode }) {
  const [hovered, setHovered] = useState(null);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const footerBg = darkMode 
    ? "linear-gradient(180deg, rgba(10,10,42,0.95), rgba(5,5,30,0.98))"
    : "linear-gradient(180deg, rgba(255,250,240,0.95), rgba(236,253,245,0.98))";
  
  return (
    <footer style={{ background: footerBg, borderTop: darkMode ? "1px solid rgba(139,92,246,0.15)" : "1px solid rgba(5,150,105,0.1)", padding: "45px 6% 25px", position: "relative", zIndex: 2 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 35, maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 14, color: darkMode ? "#c4b5fd" : "#065f46" }}>
            <span >code</span>Xpert
          </h3>
          <p style={{ fontSize: 12, color: darkMode ? "#9ca3af" : "#4b5563", lineHeight: 1.6, marginBottom: 18 }}>We create stunning websites that drive results and grow brands.</p>
          <div style={{ display: "flex", gap: 14 }}>
            {["🐙", "📘", "📸", "🔗"].map((icon, idx) => (
              <a key={idx} href="#" style={{ fontSize: 20, opacity: 0.7, transition: "all 0.3s", display: "inline-block", textDecoration: "none", transform: hovered === idx ? "translateY(-4px) scale(1.1)" : "translateY(0)" }} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}>{icon}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: darkMode ? "#c4b5fd" : "#065f46" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Home", "About", "Portfolio", "Services", "Why Us", "Contact"].map(l => (
              <li key={l} style={{ marginBottom: 10 }}>
                <button onClick={() => go(l.toLowerCase().replace(/ /g, ''))} style={{ background: "none", border: "none", color: darkMode ? "#9ca3af" : "#4b5563", cursor: "pointer", fontSize: 12, transition: "color 0.2s", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = darkMode ? "#a78bfa" : "#059669"} onMouseLeave={e => e.currentTarget.style.color = darkMode ? "#9ca3af" : "#4b5563"}>{l}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: darkMode ? "#c4b5fd" : "#065f46" }}>Our Services</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: 10, color: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}>Custom Websites</li>
            <li style={{ marginBottom: 10, color: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}>Digital Invitations</li>
            <li style={{ marginBottom: 10, color: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}>E-Commerce Solutions</li>
            <li style={{ marginBottom: 10, color: darkMode ? "#9ca3af" : "#4b5563", fontSize: 12 }}>SEO Optimization</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: darkMode ? "#c4b5fd" : "#065f46" }}>Contact Info</h4>
          <p style={{ fontSize: 12, color: darkMode ? "#9ca3af" : "#4b5563", marginBottom: 10 }}>📞 <a href="tel:+919938776630" style={{ color: darkMode ? "#9ca3af" : "#4b5563", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = darkMode ? "#a78bfa" : "#059669"} onMouseLeave={e => e.currentTarget.style.color = darkMode ? "#9ca3af" : "#4b5563"}>+91 99387 76630</a></p>
          <p style={{ fontSize: 12, color: darkMode ? "#9ca3af" : "#4b5563", marginBottom: 10 }}>✉ <a href="mailto:codexpert759@gmail.com" style={{ color: darkMode ? "#9ca3af" : "#4b5563", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = darkMode ? "#a78bfa" : "#059669"} onMouseLeave={e => e.currentTarget.style.color = darkMode ? "#9ca3af" : "#4b5563"}>codexpert759@gmail.com</a></p>
          <p style={{ fontSize: 12, color: darkMode ? "#9ca3af" : "#4b5563" }}>🌐 <a href="https://myprotfolioashis.netlify.app/" target="_blank" rel="noreferrer" style={{ color: darkMode ? "#9ca3af" : "#4b5563", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = darkMode ? "#a78bfa" : "#059669"} onMouseLeave={e => e.currentTarget.style.color = darkMode ? "#9ca3af" : "#4b5563"}>View Portfolio ↗</a></p>
        </div>
      </div>
      
      <div style={{ marginTop: 40, padding: "18px 0", textAlign: "center", borderTop: darkMode ? "1px solid rgba(139,92,246,0.1)" : "1px solid rgba(5,150,105,0.1)" }}>
        <img 
          src="https://assets.unlayer.com/projects/0/1781182834440-cute-cartoon-girl-student-character-on-transparent-background-generative-ai-png.webp" 
          alt="Cartoon characters" 
          style={{ maxWidth: "200px", width: "100%", opacity: 1, transition: "transform 0.4s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <p style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#9ca3af", marginTop: 10 }}>Our creative team at work</p>
      </div>
      
      <div style={{ textAlign: "center", marginTop: 20, paddingTop: 15 }}>
        <p style={{ fontSize: 11, color: darkMode ? "#4b5563" : "#9ca3af" }}>© 2026 codeXpert. All rights reserved. | Built with React & ❤️</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP - Light mode default
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } .hero-grid { grid-template-columns: 1fr !important; text-align: center; } .hero-image { margin-top: 30px; } }
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{overflow-x:hidden;font-family:'Inter',sans-serif;}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:${darkMode ? "#1a1a2e" : "#fef3c7"}}
      ::-webkit-scrollbar-thumb{background:${darkMode ? "linear-gradient(#8b5cf6,#6d28d9)" : "linear-gradient(#10b981,#059669)"};border-radius:5px}
      @keyframes cursorBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
      @keyframes floatImage { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      @keyframes cloudFloat { 0% { transform: translateX(0); } 100% { transform: translateX(calc(100vw + 200px)); } }
      @keyframes birdFly { 0% { transform: translateX(-10vw); opacity: 0.5; } 100% { transform: translateX(110vw); opacity: 0; } }
      @keyframes animalBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes sunGlow { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      @keyframes glowBox { 0%,100% { box-shadow: 0 0 5px rgba(139,92,246,0.2); } 50% { box-shadow: 0 0 15px rgba(139,92,246,0.4); } }
      @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      @keyframes arrowBounce { 0% { transform: translateX(-8px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
      @keyframes profileGlow { 0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); } 70% { box-shadow: 0 0 0 15px rgba(139,92,246,0); } 100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); } }
      @keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <div style={{ 
      fontFamily: "'Inter','Segoe UI',sans-serif", 
      background: darkMode ? "#0a0a2a" : "#fef9e6", 
      minHeight: "100vh", 
      color: darkMode ? "#e2e8f0" : "#1f2937", 
      overflowX: "hidden", 
      position: "relative",
      transition: "background 0.4s ease",
    }}>
      {darkMode ? <NightBackground /> : <LightBackground />}
      
      {/* Background Video for Night Mode */}
      {darkMode && (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <source src="https://spaceportfolio.netlify.app/videos/skills-bg.webm" type="video/webm" />
        </video>
      )}
      
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 6% 70px", position: "relative", zIndex: 2 }}>
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 40, alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 18px", borderRadius: 99,
              background: darkMode ? "rgba(139,92,246,0.15)" : "rgba(5,150,105,0.1)",
              border: darkMode ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(5,150,105,0.3)",
              fontSize: 11, color: darkMode ? "#a78bfa" : "#059669", marginBottom: 22, fontWeight: 600,
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: darkMode ? "#a78bfa" : "#10b981", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} /> 
              Web Development Agency
            </div>
            <h1 style={{ fontSize: "clamp(2.2rem, 6.5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 18, color: darkMode ? "#fff" : "#1f2937" }}>
              We Build{" "}
              <TypingAnimation />
              <br />For Modern Businesses
            </h1>
            <p style={{ fontSize: "clamp(13px, 4vw, 15px)", lineHeight: 1.6, color: darkMode ? "#9ca3af" : "#4b5563", marginBottom: 28 }}>
              We create stunning websites that drive results and grow brands. From beautiful websites to powerful business solutions, we bring your ideas to life.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-start" }}>
              <CreativeButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} darkMode={darkMode}>Get Started →</CreativeButton>
              <CreativeButton onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} variant="secondary" darkMode={darkMode}>View Work</CreativeButton>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }} className="stats-container">
              <div style={{ textAlign: "center" }}><div style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: 900, color: darkMode ? "#a78bfa" : "#059669" }}>100+</div><div style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Happy Clients</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: 900, color: darkMode ? "#a78bfa" : "#059669" }}>50+</div><div style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Projects</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: 900, color: darkMode ? "#a78bfa" : "#059669" }}>24/7</div><div style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Support</div></div>
            </div>
          </div>
          <div className="hero-image" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div 
              style={{ 
                width: "clamp(180px, 25vw, 260px)", height: "clamp(180px, 25vw, 260px)",
                borderRadius: "50%", overflow: "hidden", 
                boxShadow: darkMode ? "0 20px 40px rgba(139,92,246,0.4)" : "0 20px 40px rgba(0,0,0,0.1)",
                border: darkMode ? "3px solid rgba(139,92,246,0.5)" : "3px solid rgba(5,150,105,0.2)",
                animation: "profileGlow 2s ease-in-out infinite",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(139,92,246,0.8)";
                setTimeout(() => {
                  e.currentTarget.style.transform = "scale(1)";
                }, 300);
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <img 
                src="https://assets.unlayer.com/projects/0/1781182610395-90817e9b-a1f6-4572-9075-db539468937b.jpeg" 
                alt="Profile" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 768px) {
          .stats-container {
            justify-content: center !important;
          }
        }
      `}</style>
      
      {/* Skills Marquee */}
      <div style={{ padding: "25px 0", overflow: "hidden", position: "relative", zIndex: 2, background: darkMode ? "rgba(139,92,246,0.04)" : "rgba(5,150,105,0.02)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 18, width: "max-content", animation: "marquee 22s linear infinite" }}>
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
              <div key={i} style={{ 
                flexShrink: 0, width: 80, height: 80, padding: 12, borderRadius: 16,
                background: darkMode ? "rgba(30,30,60,0.7)" : "rgba(255,255,255,0.8)",
                border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                <SvgIcon svg={skill.svg} size={44} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <section id="about" style={{ padding: "clamp(50px, 10vw, 80px) 6%", position: "relative", zIndex: 2 }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 45 }}><span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.18em", color: darkMode ? "#a78bfa" : "#059669", textTransform: "uppercase", marginBottom: 8, padding: "4px 14px", borderRadius: 99, background: darkMode ? "rgba(139,92,246,0.1)" : "rgba(5,150,105,0.1)", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)" }}>✦ About Us ✦</span><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800, marginTop: 6, color: darkMode ? "#fff" : "#1f2937" }}>Who We Are</h2></div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 35, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><img src="https://assets.unlayer.com/projects/0/1781188161335-1a159463-f806-4a81-a46b-c44ceb00dde1.jpeg" alt="Team" style={{ width: "100%", borderRadius: 20, boxShadow: darkMode ? "0 20px 35px rgba(0,0,0,0.3)" : "0 20px 35px rgba(0,0,0,0.1)" }} /></Reveal>
          <Reveal delay={0.15}><div><p style={{ fontSize: "clamp(13px, 4vw, 15px)", lineHeight: 1.65, color: darkMode ? "#9ca3af" : "#4b5563", marginBottom: 20 }}>At codeXpert, we're passionate about creating digital solutions that help businesses thrive. With a team of experienced developers and designers, we craft websites that are visually stunning, highly functional, and optimized for performance.</p><p style={{ fontSize: "clamp(13px, 4vw, 15px)", lineHeight: 1.65, color: darkMode ? "#9ca3af" : "#4b5563", marginBottom: 20 }}>From custom websites to e-commerce platforms and digital invitations, we bring your vision to life with cutting-edge technology and creative design.</p><div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "flex-start" }}><div><span style={{ fontSize: 26, fontWeight: 800, color: darkMode ? "#a78bfa" : "#059669" }}>50+</span><p style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Projects</p></div><div><span style={{ fontSize: 26, fontWeight: 800, color: darkMode ? "#a78bfa" : "#059669" }}>100+</span><p style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Clients</p></div><div><span style={{ fontSize: 26, fontWeight: 800, color: darkMode ? "#a78bfa" : "#059669" }}>4+</span><p style={{ fontSize: 11, color: darkMode ? "#6b7280" : "#6b7280" }}>Years</p></div></div></div></Reveal>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio" style={{ padding: "clamp(50px, 10vw, 80px) 6%", position: "relative", zIndex: 2, background: darkMode ? "rgba(139,92,246,0.02)" : "rgba(5,150,105,0.01)" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 45 }}><span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.18em", color: darkMode ? "#a78bfa" : "#059669", textTransform: "uppercase", marginBottom: 8, padding: "4px 14px", borderRadius: 99, background: darkMode ? "rgba(139,92,246,0.1)" : "rgba(5,150,105,0.1)", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)" }}>✦ Our Work ✦</span><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800, marginTop: 6, color: darkMode ? "#fff" : "#1f2937" }}>Recent Projects</h2><p style={{ color: darkMode ? "#6b7280" : "#6b7280", marginTop: 10, fontSize: "clamp(12px, 3.5vw, 14px)" }}>Check out some of our amazing work</p></div></Reveal>
        <PortfolioShowcase darkMode={darkMode} />
        <Reveal delay={0.25}><div style={{ textAlign: "center", marginTop: 40 }}><a href="https://myprotfolioashis.netlify.app/" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "10px 28px", borderRadius: 50, border: darkMode ? "1.5px solid rgba(139,92,246,0.4)" : "1.5px solid rgba(5,150,105,0.4)", color: darkMode ? "#a78bfa" : "#059669", fontSize: "clamp(11px, 3.5vw, 13px)", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease", background: darkMode ? "rgba(139,92,246,0.05)" : "rgba(5,150,105,0.05)" }} onMouseEnter={e => { e.target.style.background = darkMode ? "rgba(139,92,246,0.15)" : "rgba(5,150,105,0.15)"; e.target.style.borderColor = darkMode ? "#a78bfa" : "#059669"; e.target.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.target.style.background = darkMode ? "rgba(139,92,246,0.05)" : "rgba(5,150,105,0.05)"; e.target.style.borderColor = darkMode ? "rgba(139,92,246,0.4)" : "rgba(5,150,105,0.4)"; e.target.style.transform = "translateY(0)"; }}>View Full Portfolio →</a></div></Reveal>
      </section>
      
      {/* Services Section */}
      <section id="services" style={{ padding: "clamp(50px, 10vw, 80px) 6%", position: "relative", zIndex: 2 }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 45 }}><span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.18em", color: darkMode ? "#a78bfa" : "#059669", textTransform: "uppercase", marginBottom: 8, padding: "4px 14px", borderRadius: 99, background: darkMode ? "rgba(139,92,246,0.1)" : "rgba(5,150,105,0.1)", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)" }}>✦ What We Offer ✦</span><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800, marginTop: 6, color: darkMode ? "#fff" : "#1f2937" }}>Our Services</h2><p style={{ color: darkMode ? "#6b7280" : "#6b7280", marginTop: 10 }}>Comprehensive web solutions tailored to your needs</p></div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25, maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES.map((service, i) => (<Reveal key={i} delay={i * 0.08}><ServiceCard service={service} darkMode={darkMode} /></Reveal>))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section id="whyus" style={{ padding: "clamp(50px, 10vw, 80px) 6%", position: "relative", zIndex: 2, background: darkMode ? "rgba(139,92,246,0.02)" : "rgba(5,150,105,0.01)" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 45 }}><span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.18em", color: darkMode ? "#a78bfa" : "#059669", textTransform: "uppercase", marginBottom: 8, padding: "4px 14px", borderRadius: 99, background: darkMode ? "rgba(139,92,246,0.1)" : "rgba(5,150,105,0.1)", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)" }}>✦ Why Us ✦</span><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800, marginTop: 6, color: darkMode ? "#fff" : "#1f2937" }}>Why Choose codeXpert ?</h2></div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18, maxWidth: 1100, margin: "0 auto" }}>
          {WHY_CHOOSE.map((item, i) => (<Reveal key={i} delay={i * 0.04}><WhyCard item={item} darkMode={darkMode} /></Reveal>))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" style={{ padding: "clamp(50px, 10vw, 80px) 6%", position: "relative", zIndex: 2 }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 45 }}><span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.18em", color: darkMode ? "#a78bfa" : "#059669", textTransform: "uppercase", marginBottom: 8, padding: "4px 14px", borderRadius: 99, background: darkMode ? "rgba(139,92,246,0.1)" : "rgba(5,150,105,0.1)", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)" }}>✦ Get In Touch ✦</span><h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800, marginTop: 6, color: darkMode ? "#fff" : "#1f2937" }}>Let's Build Your Dream Website</h2><p style={{ color: darkMode ? "#6b7280" : "#6b7280", marginTop: 10 }}>Ready to take your business to the next level? Contact us today!</p></div></Reveal>
        <div style={{ maxWidth: 600, margin: "0 auto", background: darkMode ? "rgba(30,30,60,0.7)" : "rgba(255,255,255,0.85)", borderRadius: 28, padding: "clamp(25px, 6vw, 40px)", textAlign: "center", border: darkMode ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.15)", boxShadow: darkMode ? "0 20px 35px rgba(0,0,0,0.3)" : "0 20px 35px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>📞</div>
            <h3 style={{ fontSize: 20, marginBottom: 14, color: darkMode ? "#e2e8f0" : "#1f2937" }}>Call or Email Us</h3>
            <p style={{ fontSize: 17, marginBottom: 8 }}><a href="tel:+919938776630" style={{ color: darkMode ? "#a78bfa" : "#059669", textDecoration: "none", fontWeight: 600 }}>+91 99387 76630</a></p>
            <p style={{ fontSize: 15, marginBottom: 18 }}><a href="mailto:codexpert759@gmail.com" style={{ color: darkMode ? "#a78bfa" : "#059669", textDecoration: "none" }}>codexpert759@gmail.com</a></p>
            <p><a href="https://myprotfolioashis.netlify.app/" target="_blank" rel="noreferrer" style={{ color: darkMode ? "#a78bfa" : "#059669", textDecoration: "none", fontWeight: 500 }}>🌐 View Our Portfolio</a></p>
          </div>
          <CreativeButton onClick={() => window.location.href = "tel:+919938776630"} darkMode={darkMode} style={{ padding: "10px 28px" }}>Call Now →</CreativeButton>
        </div>
      </section>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}