import React, { useEffect, useRef } from 'react';

/**
 * GalaxyMotionBackground - Illustration Cosmique Animée Haute-Fidélité
 * Reconstruit fidèlement l'illustration cosmique demandée par l'utilisateur :
 * - Planètes stylisées aux bandes texturées et anneaux célestes (géante gazeuse, lune marbrée, anneaux)
 * - Rubans cosmiques éthérés et lumineux ondulant gracieusement dans l'espace
 * - Étoiles scintillantes en croix à 4 branches (lens flare) et nappe de poussière d'étoiles
 * - Fond indigo/violet cosmique profond et vibrant
 * - Animation fluide à 60 FPS avec parallaxe subtile au pointeur
 */
export default function GalaxyMotionBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = 0;
    let height = 0;

    let mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // 1. Définition des planètes stylisées (positions relatives 0-1)
    const planets = [
      {
        id: 'top-left',
        rx: 0.09,
        ry: 0.12,
        radius: 46,
        baseColor: '#341f59',
        stripes: [
          { yRel: -0.5, h: 9, color: '#68459e' },
          { yRel: -0.15, h: 12, color: '#43296c' },
          { yRel: 0.2, h: 14, color: '#8964cc' },
          { yRel: 0.55, h: 10, color: '#563588' },
        ],
        hasRing: false,
        tilt: 0.25,
        floatSpeed: 0.0008,
        floatAmp: 5,
        z: 0.4,
      },
      {
        id: 'upper-left-moon',
        rx: 0.52,
        ry: 0.15,
        radius: 52,
        baseColor: '#8ea7e8',
        stripes: [
          { yRel: -0.55, h: 14, color: '#c4d4fa' },
          { yRel: -0.2, h: 18, color: '#7a96df' },
          { yRel: 0.1, h: 22, color: '#e0eaff' },
          { yRel: 0.45, h: 16, color: '#9bb3ee' },
          { yRel: 0.7, h: 12, color: '#6684d4' },
        ],
        hasRing: false,
        tilt: -0.15,
        floatSpeed: 0.0006,
        floatAmp: 7,
        z: 0.7,
        crescentGlow: true,
      },
      {
        id: 'bottom-left-ringed',
        rx: 0.04,
        ry: 0.74,
        radius: 50,
        baseColor: '#2b3f7a',
        stripes: [
          { yRel: -0.4, h: 10, color: '#4d69b3' },
          { yRel: -0.05, h: 14, color: '#7090db' },
          { yRel: 0.35, h: 12, color: '#385094' },
        ],
        hasRing: true,
        ringAngle: -0.45,
        ringR: 85,
        ringWidth: 3.5,
        ringColor: 'rgba(180, 210, 255, 0.85)',
        tilt: -0.3,
        floatSpeed: 0.0009,
        floatAmp: 6,
        z: 0.5,
      },
      {
        id: 'bottom-center-moon',
        rx: 0.34,
        ry: 0.88,
        radius: 42,
        baseColor: '#3a2760',
        stripes: [
          { yRel: -0.4, h: 9, color: '#593e8e' },
          { yRel: 0.0, h: 12, color: '#7e5cb8' },
          { yRel: 0.4, h: 11, color: '#462e73' },
        ],
        hasRing: false,
        tilt: 0.35,
        floatSpeed: 0.0007,
        floatAmp: 5,
        z: 0.45,
      },
      {
        id: 'gas-giant-bottom-right',
        rx: 0.83,
        ry: 0.69,
        radius: 118,
        baseColor: '#4f4cb5',
        stripes: [
          { yRel: -0.65, h: 16, color: '#8884e8' },
          { yRel: -0.35, h: 22, color: '#37348f' },
          { yRel: -0.05, h: 28, color: '#6864d4' },
          { yRel: 0.3, h: 24, color: '#a09cf3' },
          { yRel: 0.6, h: 20, color: '#4441a1' },
        ],
        hasRing: false,
        tilt: 0.22,
        floatSpeed: 0.0005,
        floatAmp: 8,
        z: 0.85,
        hasAtmosphere: true,
      },
      {
        id: 'small-ringed-near-giant',
        rx: 0.71,
        ry: 0.85,
        radius: 26,
        baseColor: '#4988bf',
        stripes: [
          { yRel: -0.3, h: 6, color: '#7abbee' },
          { yRel: 0.1, h: 8, color: '#2f6797' },
          { yRel: 0.45, h: 6, color: '#97d0fd' },
        ],
        hasRing: true,
        ringAngle: -0.5,
        ringR: 48,
        ringWidth: 2.8,
        ringColor: 'rgba(210, 235, 255, 0.95)',
        tilt: -0.4,
        floatSpeed: 0.0011,
        floatAmp: 4,
        z: 0.6,
      },
      {
        id: 'spinning-aurora-planet',
        rx: 0.81,
        ry: 0.22,
        radius: 76,
        baseColor: '#251e44',
        stripes: [],
        stripeColors: [
          '#ede9ff',
          '#9e98eb',
          '#b8b0f8',
          '#6f62e8',
          '#8f88e3',
          '#6c5ce7',
          '#5345b8',
        ],
        isRotating: true,
        rotationSpeed: 0.0016,
        hasRing: true,
        ringAngle: -0.38,
        ringR: 138,
        ringWidth: 4.2,
        ringColor: 'rgba(237, 233, 255, 0.95)',
        hasInnerRing: true,
        innerRingR: 110,
        innerRingWidth: 2.2,
        innerRingColor: 'rgba(184, 176, 248, 0.75)',
        hasAtmosphere: true,
        atmosphereColor: 'rgba(158, 152, 235, 0.45)',
        hasSubMoon: true,
        subMoonR: 115,
        subMoonSpeed: 0.0018,
        crescentGlow: true,
        tilt: -0.22,
        floatSpeed: 0.0007,
        floatAmp: 6,
        z: 0.75,
      },
    ];

    // 2. Étoiles en croix à 4 branches (Lens Flare Stars comme sur l'image)
    const crossStars = [
      { rx: 0.19, ry: 0.55, size: 14, color: '#ffffff', speed: 0.002, phase: 0.2 },
      { rx: 0.39, ry: 0.54, size: 22, color: '#fbcfe8', speed: 0.0025, phase: 1.1 },
      { rx: 0.54, ry: 0.28, size: 18, color: '#f5d0fe', speed: 0.0018, phase: 2.4 },
      { rx: 0.58, ry: 0.14, size: 16, color: '#ffffff', speed: 0.0022, phase: 3.1 },
      { rx: 0.58, ry: 0.33, size: 24, color: '#ffffff', speed: 0.002, phase: 0.8 },
      { rx: 0.70, ry: 0.29, size: 17, color: '#e0e7ff', speed: 0.0019, phase: 1.9 },
      { rx: 0.77, ry: 0.17, size: 20, color: '#ffffff', speed: 0.0023, phase: 4.2 },
      { rx: 0.91, ry: 0.05, size: 20, color: '#ffffff', speed: 0.0021, phase: 2.8 },
      { rx: 0.94, ry: 0.32, size: 15, color: '#fce7f3', speed: 0.0017, phase: 5.1 },
      { rx: 0.49, ry: 0.74, size: 13, color: '#ffffff', speed: 0.0024, phase: 3.7 },
      { rx: 0.21, ry: 0.81, size: 15, color: '#ffffff', speed: 0.0019, phase: 1.5 },
      { rx: 0.07, ry: 0.78, size: 14, color: '#ffffff', speed: 0.0022, phase: 0.6 },
    ];

    // 3. Poussières d'étoiles d'arrière-plan (starfield dense)
    const starCount = 320;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() < 0.06 ? 2.2 : 0.6 + Math.random() * 1.2,
        baseAlpha: 0.25 + Math.random() * 0.75,
        twinkleSpeed: 0.015 + Math.random() * 0.035,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.65 ? '255, 255, 255' : Math.random() < 0.85 ? '224, 215, 255' : '190, 215, 255',
      });
    }

    // 4. Système d'étoiles filantes et comètes célestes
    const comets = [];
    const maxComets = 2;
    let nextCometTime = 1200;

    const spawnComet = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 degrés diagonale
      const speed = 8 + Math.random() * 6;
      const length = 140 + Math.random() * 120;
      comets.push({
        x: Math.random() * (width * 0.75),
        y: -40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: length,
        width: 1.6 + Math.random() * 1.6,
        color: Math.random() < 0.45 ? '#ffffff' : Math.random() < 0.75 ? '#c4b5fd' : '#fbcfe8',
        alpha: 1,
        fadeSpeed: 0.012 + Math.random() * 0.008,
      });
    };

    // 5. Ceinture de poussières d'étoiles orbitales (autour de la planète géante)
    const orbitalParticles = [];
    const orbitCount = 42;
    for (let i = 0; i < orbitCount; i++) {
      orbitalParticles.push({
        angle: (i / orbitCount) * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.004,
        radiusX: 145 + Math.random() * 40,
        radiusY: 44 + Math.random() * 14,
        size: 0.8 + Math.random() * 1.5,
        color: Math.random() < 0.55 ? '#ffffff' : Math.random() < 0.8 ? '#fbcfe8' : '#c4b5fd',
        alpha: 0.35 + Math.random() * 0.55,
      });
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX - width / 2) * 0.035;
      mouse.targetY = (clientY - height / 2) * 0.035;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    // Helper : Dessiner une étoile en croix à 4 branches (Lens Flare Cross Star)
    const drawCrossStar = (x, y, size, color, alpha) => {
      ctx.save();
      ctx.translate(x, y);

      // Cœur de lueur radiale
      const radGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.6);
      radGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
      radGlow.addColorStop(0.25, `rgba(240, 215, 255, ${alpha * 0.45})`);
      radGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Croix à 4 branches effilées (horizontale et verticale)
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;

      // Branche horizontale
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.quadraticCurveTo(0, -size * 0.12, size, 0);
      ctx.quadraticCurveTo(0, size * 0.12, -size, 0);
      ctx.fill();

      // Branche verticale
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(-size * 0.12, 0, 0, size);
      ctx.quadraticCurveTo(size * 0.12, 0, 0, -size);
      ctx.fill();

      // Noyau central brillant
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.2, size * 0.14), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Helper : Nuages de nébuleuses vivantes et volumétriques (remplace les bandes rigides)
    const drawLivingNebulae = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const t = time * 0.00035;

      // Nébuleuse 1 : Améthyste cosmique centrale fluide
      const n1x = width * 0.5 + Math.sin(t) * 35;
      const n1y = height * 0.42 + Math.cos(t * 0.8) * 25;
      const r1 = Math.min(width, height) * 0.55;
      const g1 = ctx.createRadialGradient(n1x, n1y, 20, n1x, n1y, r1);
      g1.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
      g1.addColorStop(0.4, 'rgba(139, 92, 246, 0.12)');
      g1.addColorStop(0.75, 'rgba(99, 102, 241, 0.04)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Nébuleuse 2 : Rose pourpre et poussière stellaire à droite
      const n2x = width * 0.78 + Math.cos(t * 0.7) * 30;
      const n2y = height * 0.62 + Math.sin(t * 0.9) * 20;
      const r2 = Math.min(width, height) * 0.46;
      const g2 = ctx.createRadialGradient(n2x, n2y, 10, n2x, n2y, r2);
      g2.addColorStop(0, 'rgba(236, 72, 153, 0.16)');
      g2.addColorStop(0.5, 'rgba(192, 132, 252, 0.08)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Nébuleuse 3 : Aurore céleste bleu profond / cyan vers la gauche
      const n3x = width * 0.22 + Math.sin(t * 0.6) * 25;
      const n3y = height * 0.28 + Math.cos(t * 0.7) * 18;
      const r3 = Math.min(width, height) * 0.42;
      const g3 = ctx.createRadialGradient(n3x, n3y, 10, n3x, n3y, r3);
      g3.addColorStop(0, 'rgba(56, 189, 248, 0.13)');
      g3.addColorStop(0.45, 'rgba(129, 140, 248, 0.06)');
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    // Helper : Constellations subtiles reliant quelques étoiles
    const drawConstellations = () => {
      ctx.save();
      const maxDist = 80;
      const sample = stars.slice(0, 70);
      for (let i = 0; i < sample.length; i++) {
        for (let j = i + 1; j < sample.length; j++) {
          const s1 = sample[i];
          const s2 = sample[j];
          const dx = (s1.x - s2.x) * width;
          const dy = (s1.y - s2.y) * height;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(216, 180, 254, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(s1.x * width + mouse.x * 0.02, s1.y * height + mouse.y * 0.02);
            ctx.lineTo(s2.x * width + mouse.x * 0.02, s2.y * height + mouse.y * 0.02);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    // Helper : Mise à jour et dessin des étoiles filantes & comètes
    const updateAndDrawComets = () => {
      if (time > nextCometTime && comets.length < maxComets) {
        spawnComet();
        nextCometTime = time + 2200 + Math.random() * 3200;
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.alpha -= c.fadeSpeed;

        if (c.alpha <= 0 || c.x > width + 100 || c.y > height + 100) {
          comets.splice(i, 1);
          continue;
        }

        ctx.save();
        const dist = Math.hypot(c.vx, c.vy) || 1;
        const tailX = c.x - (c.vx / dist) * c.length;
        const tailY = c.y - (c.vy / dist) * c.length;

        const cometGrad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        cometGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        cometGrad.addColorStop(0.65, `${c.color}aa`);
        cometGrad.addColorStop(1, `rgba(255, 255, 255, ${Math.max(0, c.alpha)})`);

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();

        // Tête étincelante
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, c.alpha)})`;
        ctx.shadowColor = c.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    // Helper : Poussières d'étoiles en orbite 3D
    const drawOrbitalParticles = (centerX, centerY) => {
      ctx.save();
      orbitalParticles.forEach((p) => {
        p.angle += p.speed;
        const px = centerX + Math.cos(p.angle) * p.radiusX;
        const py = centerY + Math.sin(p.angle) * p.radiusY;
        const depth = Math.sin(p.angle); // -1 arrière, +1 avant
        const alpha = p.alpha * (0.65 + depth * 0.35);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.85 + depth * 0.25), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    // Helper : Dessiner une planète stylisée (avec support de rotation 3D active)
    const drawPlanet = (planet) => {
      const px = planet.rx * width + mouse.x * planet.z;
      const floatY = Math.sin(time * planet.floatSpeed) * planet.floatAmp;
      const py = planet.ry * height + floatY + mouse.y * planet.z;
      const r = planet.radius;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(planet.tilt);

      // Calcul de la sous-lune en orbite (si présente)
      let moonX = 0, moonY = 0, isMoonFront = false;
      if (planet.hasSubMoon) {
        const moonAngle = time * (planet.subMoonSpeed || 0.002);
        moonX = Math.cos(moonAngle) * (planet.subMoonR || r * 1.6);
        moonY = Math.sin(moonAngle) * ((planet.subMoonR || r * 1.6) * 0.35);
        isMoonFront = Math.sin(moonAngle) > 0;

        // Si la sous-lune est derrière la planète, on la dessine d'abord
        if (!isMoonFront) {
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#e9d5ff';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(moonX, moonY, 3.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 1. Dessiner la partie arrière des anneaux (si présents)
      if (planet.hasRing) {
        ctx.save();
        ctx.rotate(planet.ringAngle);

        // Anneau interne (si présent)
        if (planet.hasInnerRing) {
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.innerRingR, planet.innerRingR * 0.32, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = planet.innerRingColor;
          ctx.lineWidth = planet.innerRingWidth;
          ctx.stroke();
        }

        // Anneau externe
        ctx.beginPath();
        ctx.ellipse(0, 0, planet.ringR, planet.ringR * 0.32, 0, Math.PI, Math.PI * 2);
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = planet.ringWidth;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Halo atmosphérique externe
      if (planet.hasAtmosphere) {
        const atmo = ctx.createRadialGradient(0, 0, r * 0.85, 0, 0, r * 1.3);
        const atmoCol = planet.atmosphereColor || 'rgba(167, 139, 250, 0.35)';
        atmo.addColorStop(0, atmoCol);
        atmo.addColorStop(0.65, 'rgba(129, 140, 248, 0.12)');
        atmo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = atmo;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Découpage sphérique de la planète
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();

      // Fond de base de la sphère
      ctx.fillStyle = planet.baseColor;
      ctx.fillRect(-r, -r, r * 2, r * 2);

      // Si la planète a une rotation active
      if (planet.isRotating) {
        const spin = time * (planet.rotationSpeed || 0.0015);
        const colors = planet.stripeColors || ['#ede9ff', '#9e98eb', '#b8b0f8', '#6f62e8', '#8f88e3', '#6c5ce7', '#5345b8'];
        const bandCount = colors.length;

        // Bandes nuageuses fluides avec rotation continue
        for (let b = 0; b < bandCount; b++) {
          const sy = -r * 0.72 + (b / bandCount) * r * 1.45;
          const bh = 9 + (b % 2) * 4;
          const bandSpeed = (b % 2 === 0 ? 1 : 1.3) * spin;
          const xOffset = Math.sin(bandSpeed) * (r * 0.22);

          ctx.fillStyle = colors[b];
          ctx.beginPath();
          ctx.moveTo(-r, sy);
          ctx.bezierCurveTo(
            -r * 0.3 + xOffset,
            sy + 5 + Math.sin(spin * 2 + b) * 2,
            r * 0.3 + xOffset,
            sy + 5 - Math.sin(spin * 2 + b) * 2,
            r,
            sy
          );
          ctx.lineTo(r, sy + bh);
          ctx.bezierCurveTo(
            r * 0.3 + xOffset,
            sy + bh + 5,
            -r * 0.3 + xOffset,
            sy + bh + 5,
            -r,
            sy + bh
          );
          ctx.closePath();
          ctx.fill();
        }

        // Grand Vortex / Cyclone planétaire rotatif (comme Jupiter)
        const stormAngle = spin * 1.8;
        const stormX = Math.cos(stormAngle) * (r * 0.62);
        const stormDepth = Math.sin(stormAngle);

        if (stormDepth > -0.2) {
          const stormY = -r * 0.08;
          const stormR = r * 0.22 * (0.85 + stormDepth * 0.15);

          ctx.save();
          ctx.translate(stormX, stormY);
          ctx.rotate(time * 0.004);

          const stormGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, stormR);
          stormGrad.addColorStop(0, '#ffffff');
          stormGrad.addColorStop(0.35, '#b8b0f8');
          stormGrad.addColorStop(0.75, '#6c5ce7');
          stormGrad.addColorStop(1, 'rgba(108, 92, 231, 0)');

          ctx.fillStyle = stormGrad;
          ctx.beginPath();
          ctx.ellipse(0, 0, stormR * 1.35, stormR * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (planet.stripes) {
        // Bandes statiques habituelles
        planet.stripes.forEach((stripe) => {
          ctx.fillStyle = stripe.color;
          ctx.beginPath();
          const sy = stripe.yRel * r;
          ctx.moveTo(-r, sy);
          ctx.bezierCurveTo(-r * 0.3, sy + 6, r * 0.3, sy + 6, r, sy);
          ctx.lineTo(r, sy + stripe.h);
          ctx.bezierCurveTo(r * 0.3, sy + stripe.h + 6, -r * 0.3, sy + stripe.h + 6, -r, sy + stripe.h);
          ctx.closePath();
          ctx.fill();
        });
      }

      // Ombrage 3D et croissant lumineux
      const shadowGrad = ctx.createLinearGradient(-r * 0.8, -r * 0.8, r * 0.8, r * 0.8);
      shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      shadowGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.05)');
      shadowGrad.addColorStop(0.65, 'rgba(10, 6, 25, 0.4)');
      shadowGrad.addColorStop(1, 'rgba(8, 4, 20, 0.78)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(-r, -r, r * 2, r * 2);

      // Croissant brillant sur le bord pour les lunes
      if (planet.crescentGlow) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, r - 2, Math.PI * 0.75, Math.PI * 1.75);
        ctx.stroke();
      }

      ctx.restore(); // Fin du clip sphère

      // 4. Dessiner la partie avant des anneaux
      if (planet.hasRing) {
        ctx.save();
        ctx.rotate(planet.ringAngle);

        if (planet.hasInnerRing) {
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.innerRingR, planet.innerRingR * 0.32, 0, 0, Math.PI);
          ctx.strokeStyle = planet.innerRingColor;
          ctx.lineWidth = planet.innerRingWidth;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, planet.ringR, planet.ringR * 0.32, 0, 0, Math.PI);
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = planet.ringWidth;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowBlur = 9;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Sous-lune devant la planète
      if (planet.hasSubMoon && isMoonFront) {
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#fbcfe8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // Boucle de rendu principale
    const render = () => {
      time += 16;
      ctx.clearRect(0, 0, width, height);

      // Amortissement fluide de la souris
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 1. Ciel Cosmique Profond (Palette violet/indigo intense de la référence)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#130924');
      bgGrad.addColorStop(0.35, '#200f3c');
      bgGrad.addColorStop(0.65, '#2d134f');
      bgGrad.addColorStop(0.85, '#3b1764');
      bgGrad.addColorStop(1, '#170b2b');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Halo nébuleux doux violet/bleu dans le ciel
      const nebulaGlow = ctx.createRadialGradient(
        width * 0.65,
        height * 0.45,
        50,
        width * 0.65,
        height * 0.45,
        width * 0.6
      );
      nebulaGlow.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
      nebulaGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.09)');
      nebulaGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Starfield de fond scintillant
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase);
        const alpha = Math.min(1, Math.max(0.12, star.baseAlpha + twinkle * 0.35));

        const sx = star.x * width + mouse.x * 0.02;
        const sy = star.y * height + mouse.y * 0.02;

        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Nébuleuses vivantes et volumétriques (nuages de gaz cosmique vaporeux et fluides)
      drawLivingNebulae();

      // 4. Constellations subtiles reliant les étoiles proches
      drawConstellations();

      // 5. Dessin de toutes les planètes stylisées
      planets.forEach((planet) => {
        drawPlanet(planet);
      });

      // 6. Ceinture de poussières d'étoiles en orbite 3D autour de la planète géante
      const giantPlanet = planets.find((p) => p.id === 'gas-giant-bottom-right');
      if (giantPlanet) {
        const gx = giantPlanet.rx * width + mouse.x * giantPlanet.z;
        const gy = giantPlanet.ry * height + Math.sin(time * giantPlanet.floatSpeed) * giantPlanet.floatAmp + mouse.y * giantPlanet.z;
        drawOrbitalParticles(gx, gy);
      }

      // 7. Étoiles filantes & comètes périodiques avec traînée phosphorescente
      updateAndDrawComets();

      // 5. Étoiles Scintillantes en Croix à 4 branches (Lens Flare Stars)
      crossStars.forEach((star) => {
        const starAlpha = 0.55 + Math.sin(time * star.speed + star.phase) * 0.42;
        const sx = star.rx * width + mouse.x * 0.04;
        const sy = star.ry * height + mouse.y * 0.04;
        drawCrossStar(sx, sy, star.size, star.color, starAlpha);
      });

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
    <div
      className={`galaxy-motion-container pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full transition-opacity duration-1000"
      />
      {/* Léger filtre doux pour fusion parfaite */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
