import React, { useEffect, useRef } from 'react';
import './PosterCosmicIllustration.css';

/**
 * PosterCosmicIllustration - Moteur Canvas Cosmique Animé 60 FPS
 * 
 * 1. UNIVERS CENTRAL : Reproduction exacte et vivante de l'affiche "Gradient Studies | 11"
 *    - Planète centrale sphérique ultra-lisse (dégradé cyan-bleu électrique #38bdf8 / #2563eb vers ombre indigo)
 *    - Contre-jour corail/rose néon au sommet
 *    - Double anneau orbital 3D lumineux (ruban corail/rose & ruban cyan/lilas) avec profondeur devant/derrière
 *    - Photons et étincelles de lumière voyageant en temps réel le long des anneaux
 *    - Nœuds de lens flare étincelants et anamorphiques
 *    - Les 4 orbes satellites violets disposés exactement comme sur l'affiche
 * 
 * 2. AUTRES UNIVERS CÉLESTES AJOUTÉS :
 *    - Univers Haut-Gauche : Système Saturnien néon aux anneaux inclinés et lunes orbitales
 *    - Univers Haut-Droite : Système d'Étoiles Binaires en révolution continue avec pont de plasma
 *    - Univers Bas-Gauche : Vortex Cosmique Spirale aux bras logarithmiques tourbillonnants
 *    - Univers Bas-Droite : Géante Gazeuse et son trio de satellites kepleriens
 * 
 * 3. DYNAMISME & INTERACTION :
 *    - Parallaxe 3D interactive au déplacement du curseur
 *    - Étoiles scintillantes et comètes/étoiles filantes périodiques
 *    - Rendu Canvas 60 FPS haute définition (Retina/4K)
 */
export default function PosterCosmicIllustration({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Gestion du pointeur avec amortissement fluide pour la parallaxe 3D
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // ── 1. ÉTOILES DU FOND ──
    const STARS_COUNT = 85;
    const stars = [];
    for (let i = 0; i < STARS_COUNT; i++) {
      stars.push({
        relX: Math.random(),
        relY: Math.random(),
        r: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        isFlare: Math.random() > 0.82,
        flareAngle: Math.random() * 0.4 - 0.2,
      });
    }

    // ── 2. PARTICULES DU VORTEX SPIRALE (Univers 3) ──
    const VORTEX_PARTICLES = 36;
    const vortexParticles = [];
    for (let i = 0; i < VORTEX_PARTICLES; i++) {
      vortexParticles.push({
        arm: i % 2,
        t: Math.random(),
        speed: Math.random() * 0.003 + 0.0015,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    // ── 3. ÉTOILES FILANTES PÉRIODIQUES ──
    const shootingStars = [];
    let shootTimer = 0;
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.75 + width * 0.1,
        y: Math.random() * height * 0.35,
        len: Math.random() * 80 + 50,
        speed: Math.random() * 6 + 5,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        width: Math.random() * 1.5 + 0.8,
      });
    };

    // Redimensionnement haute définition (DPR)
    const handleResize = () => {
      const container = canvas.parentElement;
      width = container ? container.clientWidth : window.innerWidth;
      height = container ? container.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const y = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouse.targetX = x * 36;
      mouse.targetY = y * 28;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let time = 0;

    // =========================================================================
    // BOUCLE D'ANIMATION 60 FPS
    // =========================================================================
    const render = () => {
      time += 0.016;

      // Amortissement de la parallaxe
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Centre géométrique adaptatif de la planète centrale
      const centerX = width * 0.5 + mouse.x * 0.7;
      const centerY = height * 0.5 + mouse.y * 0.7;
      const baseR = Math.min(width * 0.22, height * 0.26, 175);

      // ───────────────────────────────────────────────────────────────────────
      // 1. ÉTOILES DU FOND & ÉTOILES FILANTES
      // ───────────────────────────────────────────────────────────────────────
      for (let s of stars) {
        const flicker = Math.sin(time * 3 + s.twinklePhase) * 0.35 + 0.65;
        const alpha = Math.max(0.1, Math.min(1, s.alpha * flicker));
        const px = s.relX * width + mouse.x * 0.2;
        const py = s.relY * height + mouse.y * 0.2;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Étoile brillante à 4 branches avec flare
        if (s.isFlare) {
          ctx.strokeStyle = `rgba(216, 180, 254, ${alpha * 0.75})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px - s.r * 4, py);
          ctx.lineTo(px + s.r * 4, py);
          ctx.moveTo(px, py - s.r * 4);
          ctx.lineTo(px, py + s.r * 4);
          ctx.stroke();

          // Halo doux
          ctx.fillStyle = `rgba(192, 132, 252, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Étoiles filantes
      shootTimer++;
      if (shootTimer > 200 && Math.random() < 0.05) {
        spawnShootingStar();
        shootTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;

        if (ss.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;
        const ssGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        ssGrad.addColorStop(0, 'transparent');
        ssGrad.addColorStop(0.7, 'rgba(236, 72, 153, 0.45)');
        ssGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = ss.width;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2. AUTRES UNIVERS (PÉRIPHÉRIQUE)
      // ───────────────────────────────────────────────────────────────────────

      // ── UNIVERS 1 (Haut-Gauche : Système Saturnien Néon) ──
      {
        const u1X = width * 0.15 + mouse.x * 0.45;
        const u1Y = height * 0.22 + mouse.y * 0.45 + Math.sin(time * 0.8) * 5;
        const u1R = 26;

        // Halo doux
        const u1Halo = ctx.createRadialGradient(u1X, u1Y, 5, u1X, u1Y, u1R * 2.5);
        u1Halo.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
        u1Halo.addColorStop(1, 'transparent');
        ctx.fillStyle = u1Halo;
        ctx.beginPath();
        ctx.arc(u1X, u1Y, u1R * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Anneau arrière
        ctx.save();
        ctx.translate(u1X, u1Y);
        ctx.rotate(-0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, u1R * 2.2, u1R * 0.6, 0, Math.PI, 0);
        ctx.strokeStyle = 'rgba(244, 114, 182, 0.55)';
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.restore();

        // Sphère planète améthyste
        const u1Grad = ctx.createRadialGradient(u1X - u1R * 0.35, u1Y - u1R * 0.35, 2, u1X, u1Y, u1R);
        u1Grad.addColorStop(0, '#c084fc');
        u1Grad.addColorStop(0.35, '#7c3aed');
        u1Grad.addColorStop(0.75, '#2e1065');
        u1Grad.addColorStop(1, '#0c051f');
        ctx.fillStyle = u1Grad;
        ctx.beginPath();
        ctx.arc(u1X, u1Y, u1R, 0, Math.PI * 2);
        ctx.fill();

        // Anneau avant
        ctx.save();
        ctx.translate(u1X, u1Y);
        ctx.rotate(-0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, u1R * 2.2, u1R * 0.6, 0, 0, Math.PI);
        ctx.strokeStyle = '#fda4af';
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Lunes en orbite dynamique
        const moonAngle1 = time * 0.9;
        const moonX = Math.cos(moonAngle1) * (u1R * 2.2);
        const moonY = Math.sin(moonAngle1) * (u1R * 0.6);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 3.2, 0, Math.PI * 2);
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── UNIVERS 2 (Haut-Droite : Étoiles Binaires en Révolution) ──
      {
        const u2X = width * 0.85 + mouse.x * 0.5;
        const u2Y = height * 0.2 + mouse.y * 0.5 + Math.cos(time * 0.7) * 4;
        const binaryAngle = time * 0.75;
        const orbitDist = 24;

        const star1X = u2X + Math.cos(binaryAngle) * orbitDist;
        const star1Y = u2Y + Math.sin(binaryAngle) * orbitDist * 0.6;
        const star2X = u2X - Math.cos(binaryAngle) * orbitDist;
        const star2Y = u2Y - Math.sin(binaryAngle) * orbitDist * 0.6;

        // Pont de plasma énergétique
        ctx.beginPath();
        ctx.moveTo(star1X, star1Y);
        ctx.lineTo(star2X, star2Y);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Étoile 1 : Corail / Rose
        const s1Grad = ctx.createRadialGradient(star1X, star1Y, 1, star1X, star1Y, 13);
        s1Grad.addColorStop(0, '#ffffff');
        s1Grad.addColorStop(0.35, '#fb7185');
        s1Grad.addColorStop(0.8, '#be185d');
        s1Grad.addColorStop(1, 'transparent');
        ctx.fillStyle = s1Grad;
        ctx.beginPath();
        ctx.arc(star1X, star1Y, 14, 0, Math.PI * 2);
        ctx.fill();

        // Étoile 2 : Violet / Lilas
        const s2Grad = ctx.createRadialGradient(star2X, star2Y, 1, star2X, star2Y, 10);
        s2Grad.addColorStop(0, '#ffffff');
        s2Grad.addColorStop(0.4, '#c084fc');
        s2Grad.addColorStop(0.85, '#6b21a8');
        s2Grad.addColorStop(1, 'transparent');
        ctx.fillStyle = s2Grad;
        ctx.beginPath();
        ctx.arc(star2X, star2Y, 11, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── UNIVERS 3 (Bas-Gauche : Vortex Cosmique Spirale) ──
      {
        const u3X = width * 0.16 + mouse.x * 0.4;
        const u3Y = height * 0.78 + mouse.y * 0.4;

        ctx.save();
        ctx.translate(u3X, u3Y);
        ctx.rotate(time * 0.35);

        // Bras spiraux logarithmiques dessinés de particules
        for (let p of vortexParticles) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;

          const r = p.t * 54;
          const theta = p.t * 3.8 + p.arm * Math.PI;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * (r * 0.55);

          const alpha = Math.sin(p.t * Math.PI) * p.alpha;
          ctx.fillStyle = p.arm === 0 ? `rgba(244, 114, 182, ${alpha})` : `rgba(192, 132, 252, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cœur du vortex
        const vCore = ctx.createRadialGradient(0, 0, 1, 0, 0, 14);
        vCore.addColorStop(0, '#ffffff');
        vCore.addColorStop(0.4, '#ec4899');
        vCore.addColorStop(0.8, '#4c1d95');
        vCore.addColorStop(1, 'transparent');
        ctx.fillStyle = vCore;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── UNIVERS 4 (Bas-Droite : Géante Gazeuse & Trio de Satellites) ──
      {
        const u4X = width * 0.84 + mouse.x * 0.45;
        const u4Y = height * 0.76 + mouse.y * 0.45;
        const u4R = 34;

        // Pistes orbitales elliptiques
        ctx.save();
        ctx.translate(u4X, u4Y);
        ctx.rotate(-0.25);

        ctx.beginPath();
        ctx.ellipse(0, 0, u4R * 1.8, u4R * 0.65, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(216, 180, 254, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, u4R * 2.4, u4R * 0.9, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.stroke();
        ctx.setLineDash([]);

        // Sphère de la géante
        const u4Grad = ctx.createRadialGradient(-u4R * 0.35, -u4R * 0.3, 2, 0, 0, u4R);
        u4Grad.addColorStop(0, '#a855f7');
        u4Grad.addColorStop(0.35, '#581c87');
        u4Grad.addColorStop(0.75, '#2e1065');
        u4Grad.addColorStop(1, '#0b041c');
        ctx.fillStyle = u4Grad;
        ctx.beginPath();
        ctx.arc(0, 0, u4R, 0, Math.PI * 2);
        ctx.fill();

        // 3 Satellites en mouvement
        const m1 = time * 1.2;
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(Math.cos(m1) * (u4R * 1.8), Math.sin(m1) * (u4R * 0.65), 3.8, 0, Math.PI * 2);
        ctx.fill();

        const m2 = time * 0.85 + 2.0;
        ctx.fillStyle = '#a5f3fc';
        ctx.beginPath();
        ctx.arc(Math.cos(m2) * (u4R * 2.4), Math.sin(m2) * (u4R * 0.9), 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ───────────────────────────────────────────────────────────────────────
      // 3. L'UNIVERS CENTRAL : L'AFFICHE "GRADIENT STUDIES | 11" EN MOTION 60 FPS
      // ───────────────────────────────────────────────────────────────────────

      // A. Halos concentriques d'atmosphère
      const breath = Math.sin(time * 0.9) * 0.05 + 1;

      // Halo externe violet
      const atmGrad = ctx.createRadialGradient(
        centerX, centerY, baseR * 0.5,
        centerX, centerY, baseR * 2.2 * breath
      );
      atmGrad.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
      atmGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.09)');
      atmGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR * 2.2 * breath, 0, Math.PI * 2);
      ctx.fill();

      // Couronne thermique corail / magenta (juste derrière la sphère)
      const coronaGrad = ctx.createRadialGradient(
        centerX + 5, centerY - 15, baseR * 0.4,
        centerX, centerY, baseR * 1.45 * breath
      );
      coronaGrad.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
      coronaGrad.addColorStop(0.45, 'rgba(236, 72, 153, 0.18)');
      coronaGrad.addColorStop(0.85, 'rgba(168, 85, 247, 0.05)');
      coronaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR * 1.45 * breath, 0, Math.PI * 2);
      ctx.fill();

      // B. ARCS ARRIÈRE DES 2 ANNEAUX ORBITAUX (Passent derrière la sphère)
      // Anneau 1 (Corail/Rose néon) - Incliné à -16 deg
      const r1Angle = -0.28;
      const r1A = baseR * 1.54;
      const r1B = baseR * 0.52;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(r1Angle);

      ctx.beginPath();
      ctx.ellipse(0, 0, r1A, r1B, 0, Math.PI, 0); // Arc haut = derrière
      ctx.strokeStyle = 'rgba(251, 113, 133, 0.7)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Anneau 2 (Cyan/Lilas) - Incliné à +14 deg
      const r2Angle = 0.24;
      const r2A = baseR * 1.82;
      const r2B = baseR * 0.62;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(r2Angle);

      ctx.beginPath();
      ctx.ellipse(0, 0, r2A, r2B, 0, Math.PI, 0); // Arc haut = derrière
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.65)';
      ctx.lineWidth = 2.8;
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // C. SPHÈRE CENTRALE DE LA PLANÈTE BLEUE & VIOLETTE
      // Contre-jour néon corail sur le contour supérieur
      ctx.beginPath();
      ctx.arc(centerX, centerY - 2, baseR + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.75)';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Corps principal de la planète avec dégradé sphérique exact de l'affiche
      const sphereGrad = ctx.createRadialGradient(
        centerX - baseR * 0.18, centerY - baseR * 0.25, baseR * 0.05,
        centerX, centerY, baseR
      );
      sphereGrad.addColorStop(0, '#38bdf8'); // Éclat cyan électrique
      sphereGrad.addColorStop(0.26, '#2563eb'); // Bleu royal éclatant
      sphereGrad.addColorStop(0.52, '#1e3a8a'); // Cobalt profond
      sphereGrad.addColorStop(0.78, '#1b114d'); // Indigo spatial
      sphereGrad.addColorStop(0.94, '#0d0726'); // Ombre abrupte
      sphereGrad.addColorStop(1, '#060314');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR, 0, Math.PI * 2);
      ctx.fill();

      // Ombre & lueurs internes découpées sur la sphère
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR, 0, Math.PI * 2);
      ctx.clip();

      // Lueur corail sur le dôme supérieur
      const topRim = ctx.createRadialGradient(
        centerX, centerY - baseR * 0.4, baseR * 0.3,
        centerX, centerY, baseR
      );
      topRim.addColorStop(0.7, 'transparent');
      topRim.addColorStop(0.94, 'rgba(251, 113, 133, 0.7)');
      topRim.addColorStop(1, 'rgba(253, 164, 175, 0.95)');
      ctx.fillStyle = topRim;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR, 0, Math.PI * 2);
      ctx.fill();

      // Ombre profonde inférieure droite
      const botShadow = ctx.createRadialGradient(
        centerX - baseR * 0.2, centerY - baseR * 0.2, baseR * 0.4,
        centerX, centerY, baseR
      );
      botShadow.addColorStop(0.5, 'transparent');
      botShadow.addColorStop(0.88, 'rgba(10, 5, 26, 0.65)');
      botShadow.addColorStop(1, 'rgba(4, 2, 12, 0.94)');
      ctx.fillStyle = botShadow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseR, 0, Math.PI * 2);
      ctx.fill();

      // Reflet d'ambiance violet sur le bord bas
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + baseR * 0.88, baseR * 0.75, baseR * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // D. ARCS AVANT DES 2 ANNEAUX + ÉTINCELLES DE PHOTONS EN VOYAGE CONTINU
      // 1. Anneau Corail/Rose néon (Arc avant)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(r1Angle);

      // Trait néon principal
      ctx.beginPath();
      ctx.ellipse(0, 0, r1A, r1B, 0, 0, Math.PI); // Arc bas = devant la sphère
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.8;
      ctx.shadowColor = '#ff5277';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Fil fin blanc au cœur
      ctx.beginPath();
      ctx.ellipse(0, 0, r1A, r1B, 0, 0, Math.PI);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Photons vivants circulant le long de l'anneau corail
      const photonSpeeds1 = [0.8, 0.8, 0.8];
      const photonOffsets1 = [0, 2.1, 4.2];
      for (let k = 0; k < 3; k++) {
        const pTheta = (time * photonSpeeds1[k] + photonOffsets1[k]) % (Math.PI * 2);
        // Si le photon est sur l'arc avant (0 à PI), on le dessine avec éclat
        const px = Math.cos(pTheta) * r1A;
        const py = Math.sin(pTheta) * r1B;
        const isFront = pTheta >= 0 && pTheta <= Math.PI;

        ctx.fillStyle = isFront ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(px, py, isFront ? 3.4 : 2, 0, Math.PI * 2);
        if (isFront) {
          ctx.shadowColor = '#fb7185';
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Lens flare permanent 1 (à gauche sur le bord)
      const flare1Angle = 2.45;
      const f1X = Math.cos(flare1Angle) * r1A;
      const f1Y = Math.sin(flare1Angle) * r1B;
      const fPulse = Math.sin(time * 4) * 0.2 + 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(f1X, f1Y, 3.6 * fPulse, 0, Math.PI * 2);
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 2. Anneau Cyan / Lilas (Arc avant)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(r2Angle);

      // Dégradé néon cyan/lilas le long de l'anneau
      const r2Grad = ctx.createLinearGradient(-r2A, 0, r2A, 0);
      r2Grad.addColorStop(0, '#ffffff');
      r2Grad.addColorStop(0.3, '#c084fc');
      r2Grad.addColorStop(0.7, '#818cf8');
      r2Grad.addColorStop(1, '#60a5fa');

      ctx.beginPath();
      ctx.ellipse(0, 0, r2A, r2B, 0, 0, Math.PI);
      ctx.strokeStyle = r2Grad;
      ctx.lineWidth = 3.2;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 16;
      ctx.stroke();

      // Cœur blanc
      ctx.beginPath();
      ctx.ellipse(0, 0, r2A, r2B, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Photons vivants circulant le long de l'anneau cyan/lilas
      const photonOffsets2 = [0.6, 2.7, 4.8];
      for (let k = 0; k < 3; k++) {
        const pTheta = (time * 0.95 + photonOffsets2[k]) % (Math.PI * 2);
        const px = Math.cos(pTheta) * r2A;
        const py = Math.sin(pTheta) * r2B;
        const isFront = pTheta >= 0 && pTheta <= Math.PI;

        ctx.fillStyle = isFront ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(px, py, isFront ? 3.8 : 2.2, 0, Math.PI * 2);
        if (isFront) {
          ctx.shadowColor = '#93c5fd';
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Grand lens flare anamorphique sur l'horizon gauche
      const fHorizonX = -r2A * 0.98;
      const fHorizonY = r2B * 0.12;
      const hPulse = Math.sin(time * 3.5) * 0.25 + 1;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fHorizonX, fHorizonY, 4.2 * hPulse, 0, Math.PI * 2);
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Rayon laser anamorphique horizontal
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(fHorizonX - 35 * hPulse, fHorizonY);
      ctx.lineTo(fHorizonX + 35 * hPulse, fHorizonY);
      ctx.stroke();

      // Flare secondaire au bas
      const fBotX = r2A * 0.35;
      const fBotY = r2B * 0.94;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fBotX, fBotY, 3.4 * hPulse, 0, Math.PI * 2);
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // E. LES 4 ORBES SATELLITES VIOLETS (Positions exactes de l'affiche)
      const satellites = [
        { rx: -0.68, ry: -0.65, r: 24, delay: 0 },
        { rx: 0.68, ry: -0.68, r: 28, delay: 1.5 },
        { rx: 0.72, ry: 0.64, r: 23, delay: 3 },
        { rx: -0.55, ry: 0.82, r: 36, delay: 4.5 },
      ];

      for (let sat of satellites) {
        const floatY = Math.sin(time * 1.1 + sat.delay) * 5;
        const satX = centerX + sat.rx * baseR * 1.5;
        const satY = centerY + sat.ry * baseR * 1.4 + floatY;

        const satGrad = ctx.createRadialGradient(
          satX - sat.r * 0.35, satY - sat.r * 0.35, 2,
          satX, satY, sat.r
        );
        satGrad.addColorStop(0, '#6b21a8');
        satGrad.addColorStop(0.38, '#4c1d95');
        satGrad.addColorStop(0.72, '#2e1065');
        satGrad.addColorStop(1, '#0f0728');

        ctx.fillStyle = satGrad;
        ctx.beginPath();
        ctx.arc(satX, satY, sat.r, 0, Math.PI * 2);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className={`poster-cosmic-container ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="poster-cosmic-canvas" />
    </div>
  );
}
