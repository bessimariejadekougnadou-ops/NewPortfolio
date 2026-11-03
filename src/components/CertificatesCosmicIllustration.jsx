import React, { useEffect, useRef } from 'react';
import './CertificatesCosmicIllustration.css';

/**
 * CertificatesCosmicIllustration
 * 60 FPS HTML5 Canvas engine rendering the "Constellation of Credentials":
 * - Central celestial core with dual rotating golden/violet gyroscopic orbital rings
 * - 4 orbiting celestial nodes representing the 4 certification domains (Cloud, JS, Network, Python)
 * - Pulsing constellation laser filaments connecting the nodes
 * - Floating stellar dust, photon sparks, and subtle mouse parallax
 */
export default function CertificatesCosmicIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.parentElement.offsetHeight || 600;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Background stars
    const starCount = 65;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      speedY: Math.random() * 0.15 + 0.05
    }));

    // Floating photon particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: ['#c084fc', '#38bdf8', '#fbbf24', '#34d399'][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.5 + 0.2
    }));

    // The 4 Certification Nodes in orbit
    const nodes = [
      { name: 'Cloud Security', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.45)', orbitR: 190, speed: 0.008, phase: 0 },
      { name: 'JavaScript', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.45)', orbitR: 240, speed: -0.006, phase: Math.PI / 2 },
      { name: 'Networking', color: '#34d399', glow: 'rgba(52, 211, 153, 0.45)', orbitR: 160, speed: 0.01, phase: Math.PI },
      { name: 'Python', color: '#e879f9', glow: 'rgba(232, 121, 249, 0.45)', orbitR: 280, speed: -0.005, phase: (3 * Math.PI) / 2 }
    ];

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const parallaxX = (mouseX - width / 2) * 0.035;
      const parallaxY = (mouseY - height / 2) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Deep celestial ambient background vignette
      const coreCenterX = width / 2 + parallaxX;
      const coreCenterY = height / 2 + parallaxY;

      const radialGrad = ctx.createRadialGradient(
        coreCenterX,
        coreCenterY,
        20,
        coreCenterX,
        coreCenterY,
        Math.max(width, height) * 0.7
      );
      radialGrad.addColorStop(0, 'rgba(124, 58, 237, 0.18)');
      radialGrad.addColorStop(0.35, 'rgba(76, 29, 149, 0.12)');
      radialGrad.addColorStop(0.7, 'rgba(33, 15, 68, 0.05)');
      radialGrad.addColorStop(1, 'rgba(20, 10, 42, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Twinkling Background Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.2) s.alphaSpeed *= -1;
        s.y -= s.speedY;
        if (s.y < 0) s.y = height;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Dual Gyroscopic Orbit Tracks
      ctx.save();
      ctx.translate(coreCenterX, coreCenterY);

      // Orbit 1 - Violet inclined ellipse
      ctx.save();
      ctx.rotate(0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 85, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.restore();

      // Orbit 2 - Amber/Gold inclined ellipse
      ctx.save();
      ctx.rotate(-0.45);
      ctx.beginPath();
      ctx.ellipse(0, 0, 260, 95, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
      ctx.restore();

      // Central Glowing Celestial Core (Astrolabe of Wisdom)
      const corePulse = Math.sin(time * 1.5) * 4;
      const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 36 + corePulse);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#c084fc');
      coreGrad.addColorStop(0.7, '#7c3aed');
      coreGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 36 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      // Central ring sparkle
      ctx.save();
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Compute Node Positions and Draw Constellation Connectors
      const nodeCoords = nodes.map((node) => {
        const currentAngle = node.phase + time * node.speed;
        // 3D perspective projection onto 2D plane
        const x = Math.cos(currentAngle) * node.orbitR;
        const y = Math.sin(currentAngle) * (node.orbitR * 0.42);
        return { ...node, x, y };
      });

      // Draw constellation laser beams from core to nodes
      nodeCoords.forEach((node) => {
        const beamGrad = ctx.createLinearGradient(0, 0, node.x, node.y);
        beamGrad.addColorStop(0, 'rgba(192, 132, 252, 0.6)');
        beamGrad.addColorStop(0.6, node.color);
        beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      });

      // Inter-node secondary constellation threads
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let i = 0; i < nodeCoords.length; i++) {
        const next = nodeCoords[(i + 1) % nodeCoords.length];
        ctx.moveTo(nodeCoords[i].x, nodeCoords[i].y);
        ctx.lineTo(next.x, next.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw each orbiting node with radiant flares
      nodeCoords.forEach((node) => {
        // Outer aura
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 22);
        nodeGlow.addColorStop(0, node.color);
        nodeGlow.addColorStop(0.5, node.glow);
        nodeGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
        ctx.fill();

        // White hot center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting micro-satellite
        const satAngle = time * 2.5 + node.phase;
        const satX = node.x + Math.cos(satAngle) * 14;
        const satY = node.y + Math.sin(satAngle) * 14;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(satX, satY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 4. Floating photon particles drifting in foreground
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
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
    <div className="certificates-cosmic-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="certificates-cosmic-canvas" />
    </div>
  );
}
