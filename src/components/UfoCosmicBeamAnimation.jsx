import React, { useEffect, useRef } from 'react';

/**
 * UfoCosmicBeamAnimation
 * Animation cosmique haute fidélité en Canvas 60 FPS :
 * - Soucoupe volante compacte et élégante ("un peu petit, pas trop gros") en lévitation subtile au sommet
 * - Faisceau lumineux (tractor beam) conique animé avec vagues de lumière et particules flottantes
 * - Univers céleste animé : étoiles scintillantes, étoiles filantes périodiques, petites planètes en orbite
 * - Planète courbée stylisée au bas de la section
 * - Palette 100% fidèle aux couleurs du site (#210f44, violet néon, cyan électrique, lilas)
 */
export default function UfoCosmicBeamAnimation({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let width = 0;
    let height = 0;

    // 1. Initialisation des étoiles
    const STARS_COUNT = 90;
    const stars = [];
    for (let i = 0; i < STARS_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? '#ffffff' : Math.random() > 0.5 ? '#c084fc' : '#e9d5ff',
        isCross: Math.random() > 0.85
      });
    }

    // 2. Particules dans le faisceau
    const BEAM_PARTICLES = 35;
    const beamParticles = [];
    for (let i = 0; i < BEAM_PARTICLES; i++) {
      beamParticles.push({
        relY: Math.random(),
        relX: (Math.random() - 0.5), // Entre -0.5 et 0.5
        speed: Math.random() * 0.0018 + 0.0008,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    // 3. Étoiles filantes
    const shootingStars = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.3,
        len: Math.random() * 90 + 50,
        speed: Math.random() * 7 + 6,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        width: Math.random() * 1.5 + 1
      });
    };

    let shootTimer = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // ── A. Fond dégradé cosmique violet profond (couleurs exactes du site) ──
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.2, 50,
        width * 0.5, height * 0.5, width * 0.85
      );
      bgGrad.addColorStop(0, '#421a7c');
      bgGrad.addColorStop(0.35, '#2f135b');
      bgGrad.addColorStop(0.7, '#210f44');
      bgGrad.addColorStop(1, '#210f44');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── B. Nébuleuses douces en arrière-plan ──
      // Nébuleuse gauche (violette)
      const neb1 = ctx.createRadialGradient(width * 0.15, height * 0.35, 10, width * 0.15, height * 0.35, 260);
      neb1.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
      neb1.addColorStop(0.6, 'rgba(124, 58, 237, 0.05)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nébuleuse droite (violette / lilas)
      const neb2 = ctx.createRadialGradient(width * 0.85, height * 0.45, 10, width * 0.85, height * 0.45, 280);
      neb2.addColorStop(0, 'rgba(192, 132, 252, 0.14)');
      neb2.addColorStop(0.6, 'rgba(147, 51, 234, 0.05)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // ── C. Petite planète stylisée avec anneaux en haut à droite ──
      const planetX = width * 0.86;
      const planetY = height * 0.16;
      const planetR = 18;

      // Anneau arrière
      ctx.save();
      ctx.translate(planetX, planetY);
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 2.1, planetR * 0.55, 0, Math.PI, 0);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // Sphère planète
      const plGrad = ctx.createRadialGradient(planetX - 4, planetY - 4, 2, planetX, planetY, planetR);
      plGrad.addColorStop(0, '#e9d5ff');
      plGrad.addColorStop(0.4, '#a855f7');
      plGrad.addColorStop(1, '#3b0764');
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetR, 0, Math.PI * 2);
      ctx.fillStyle = plGrad;
      ctx.fill();

      // Anneau avant
      ctx.save();
      ctx.translate(planetX, planetY);
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 2.1, planetR * 0.55, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // Petite lune améthyste en haut à gauche
      const moonX = width * 0.12;
      const moonY = height * 0.22;
      const moonR = 11;
      const moonGrad = ctx.createRadialGradient(moonX - 2, moonY - 2, 1, moonX, moonY, moonR);
      moonGrad.addColorStop(0, '#c084fc');
      moonGrad.addColorStop(1, '#4c1d95');
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = moonGrad;
      ctx.fill();
      ctx.shadowColor = 'rgba(192, 132, 252, 0.6)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── D. Étoiles scintillantes ──
      for (let s of stars) {
        const flicker = Math.sin(time * 3 + s.speed * 800) * 0.35 + 0.65;
        const alpha = Math.max(0.1, Math.min(1, s.alpha * flicker));
        const px = s.x * width;
        const py = s.y * height;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;

        if (s.isCross) {
          // Étoile à 4 branches
          ctx.beginPath();
          ctx.arc(px, py, s.r * 1.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px - s.r * 3.5, py);
          ctx.lineTo(px + s.r * 3.5, py);
          ctx.moveTo(px, py - s.r * 3.5);
          ctx.lineTo(px, py + s.r * 3.5);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // ── E. Étoiles filantes ──
      shootTimer++;
      if (shootTimer > 160 && Math.random() < 0.04) {
        spawnShootingStar();
        shootTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.016;

        if (ss.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const ssGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        ssGrad.addColorStop(0, 'transparent');
        ssGrad.addColorStop(0.7, 'rgba(192, 132, 252, 0.4)');
        ssGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = ss.width;
        ctx.stroke();

        // Tête étincelante
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // ── F. Planète Courbée Stylisée au Bas ──
      const planetCenterX = width * 0.5;
      const planetRadius = width * 0.9;
      const planetCenterY = height + planetRadius * 0.82;

      const planetGrad = ctx.createRadialGradient(
        planetCenterX,
        planetCenterY - planetRadius * 0.6,
        planetRadius * 0.2,
        planetCenterX,
        planetCenterY,
        planetRadius
      );
      planetGrad.addColorStop(0, 'rgba(168, 85, 247, 0.45)');
      planetGrad.addColorStop(0.2, 'rgba(124, 58, 237, 0.28)');
      planetGrad.addColorStop(0.45, 'rgba(88, 28, 135, 0.15)');
      planetGrad.addColorStop(1, 'rgba(33, 15, 68, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // Arc de néon lumineux sur la courbure de la planète
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius, Math.PI * 1.18, Math.PI * 1.82);
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#e879f9';
      ctx.shadowBlur = 24;
      ctx.stroke();

      // Deuxième arc plus fin au-dessus
      ctx.beginPath();
      ctx.arc(planetCenterX, planetCenterY, planetRadius + 8, Math.PI * 1.25, Math.PI * 1.75);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // ── G. Position & Lévitation de la Soucoupe Volante (COMPACTE, DISCRÈTE EN ARRIÈRE-PLAN) ──
      const ufoWidth = 84;
      const ufoHeight = 26;
      const ufoX = width * 0.5;
      const hoverOffset = Math.sin(time * 2) * 3;
      const ufoY = 56 + hoverOffset;
      const tilt = Math.sin(time * 1.5) * 0.02;

      // ── H. LE FAISCEAU LUMINEUX CONIQUE (ATMOSPHÉRIQUE & SUBTIL) ──
      const beamTopWidth = 20;
      const beamBottomWidth = Math.min(width * 0.5, 460);
      const beamBottomY = height * 0.85;

      ctx.save();
      const beamGrad = ctx.createLinearGradient(ufoX, ufoY + 10, ufoX, beamBottomY);
      beamGrad.addColorStop(0, 'rgba(192, 132, 252, 0.18)');
      beamGrad.addColorStop(0.3, 'rgba(168, 85, 247, 0.08)');
      beamGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.03)');
      beamGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(ufoX - beamTopWidth * 0.5, ufoY + 10);
      ctx.lineTo(ufoX + beamTopWidth * 0.5, ufoY + 10);
      ctx.lineTo(ufoX + beamBottomWidth * 0.5, beamBottomY);
      ctx.lineTo(ufoX - beamBottomWidth * 0.5, beamBottomY);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Particules lumineuses subtiles dans le faisceau
      for (let p of beamParticles) {
        p.relY += p.speed * 0.8;
        if (p.relY > 1) {
          p.relY = 0;
          p.relX = (Math.random() - 0.5);
        }

        const currY = (ufoY + 14) + p.relY * (beamBottomY - ufoY - 14);
        const currWidth = beamTopWidth + p.relY * (beamBottomWidth - beamTopWidth);
        const currX = ufoX + p.relX * currWidth * 0.85;

        const partAlpha = Math.sin(p.relY * Math.PI) * p.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(currX, currY, p.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 180, 254, ${partAlpha})`;
        ctx.fill();
      }
      ctx.restore();

      // ── I. DESSIN DE LA SOUCOUPE VOLANTE (UFO) COMPACTE ──
      ctx.save();
      ctx.translate(ufoX, ufoY);
      ctx.rotate(tilt);

      // 1. Lueur d'ambiance sous la soucoupe
      const ufoGlow = ctx.createRadialGradient(0, 8, 5, 0, 8, ufoWidth * 0.7);
      ufoGlow.addColorStop(0, 'rgba(192, 132, 252, 0.65)');
      ufoGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
      ufoGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ufoGlow;
      ctx.beginPath();
      ctx.ellipse(0, 10, ufoWidth * 0.65, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Dôme supérieur du cockpit
      const domeR = ufoWidth * 0.26;
      const domeGrad = ctx.createLinearGradient(0, -ufoHeight * 0.65, 0, -ufoHeight * 0.05);
      domeGrad.addColorStop(0, '#fdf4ff');
      domeGrad.addColorStop(0.35, '#c084fc');
      domeGrad.addColorStop(0.7, '#581c87');
      domeGrad.addColorStop(1, '#2e1065');

      ctx.beginPath();
      ctx.ellipse(0, -ufoHeight * 0.12, domeR, ufoHeight * 0.42, 0, Math.PI, 0);
      ctx.fillStyle = domeGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Reflet sur la vitre du dôme
      ctx.beginPath();
      ctx.ellipse(-domeR * 0.32, -ufoHeight * 0.28, domeR * 0.32, ufoHeight * 0.15, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

      // 3. Disque principal métallique de la soucoupe
      const discGrad = ctx.createLinearGradient(0, -ufoHeight * 0.2, 0, ufoHeight * 0.25);
      discGrad.addColorStop(0, '#f1f5f9');
      discGrad.addColorStop(0.25, '#94a3b8');
      discGrad.addColorStop(0.55, '#334155');
      discGrad.addColorStop(0.85, '#1e1b4b');
      discGrad.addColorStop(1, '#0f0a24');

      ctx.beginPath();
      ctx.ellipse(0, 0, ufoWidth * 0.5, ufoHeight * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = discGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Sous-anneau inférieur métallique sombre
      const underGrad = ctx.createLinearGradient(0, ufoHeight * 0.1, 0, ufoHeight * 0.42);
      underGrad.addColorStop(0, '#c084fc');
      underGrad.addColorStop(0.3, '#3b0764');
      underGrad.addColorStop(1, '#090518');

      ctx.beginPath();
      ctx.ellipse(0, ufoHeight * 0.14, ufoWidth * 0.36, ufoHeight * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = underGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 5. Hublots lumineux clignotants le long de la tranche
      const LIGHTS_COUNT = 7;
      for (let i = 0; i < LIGHTS_COUNT; i++) {
        const angleRel = (i / (LIGHTS_COUNT - 1)) * Math.PI - (Math.PI * 0.5);
        const lx = Math.sin(angleRel) * (ufoWidth * 0.42);
        const ly = Math.cos(angleRel) * (ufoHeight * 0.16) + 2;

        const lightPulse = Math.sin(time * 6 + i * 0.85) * 0.4 + 0.6;
        const lightColor = i % 2 === 0 ? `rgba(250, 204, 21, ${lightPulse})` : `rgba(192, 132, 252, ${lightPulse})`;

        ctx.beginPath();
        ctx.arc(lx, ly, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = lightColor;
        ctx.shadowColor = i % 2 === 0 ? '#facc15' : '#c084fc';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 6. Émetteur central inférieur de rayon tracteur (noyau violet brillant)
      const coreGrad = ctx.createRadialGradient(0, ufoHeight * 0.18, 1, 0, ufoHeight * 0.18, 14);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#e9d5ff');
      coreGrad.addColorStop(0.7, '#a855f7');
      coreGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.ellipse(0, ufoHeight * 0.18, 14, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`ufo-cosmic-animation-container ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="ufo-cosmic-canvas" />
    </div>
  );
}
