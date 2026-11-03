import React, { useState, useEffect, useRef } from 'react';
import './AboutCosmicTechBackground.css';

/**
 * AboutCosmicTechBackground
 * 
 * Reproduction fidèle, agrandie et sublimée du Système 3D Orrery Planétaire :
 * - Univers agrandi et volumétrique ("grosseur augmentée", présence majestueuse au centre)
 * - ZÉRO COULEUR JAUNE pour la planète centrale (palette cosmique améthyste / lilas / perle nacrée)
 * - 4 Anneaux orbitaux 3D inclinés en perspective (tubes néon rose/lilas éclatants)
 * - Planètes satellites stylisées et astéroïdes agrandis
 * - LOGOS DES TECHNOLOGIES TRÈS VISIBLES SANS FOND BLANC :
 *   • Médaillons en verre cosmique sombre violet (#130924 / #220f42) avec halo néon éclatant
 *   • Bordure néon lumineuse aux couleurs officielles de chaque technologie
 *   • Icônes agrandies, contrastées et ultra-nettes
 *   • Capsules de nom en verre sombre avec bordure néon et typographie blanche nette
 * - Révolution 3D continue, fluide et mathématiquement exacte le long des ellipses (60/120 FPS via rAF)
 * - Ralentissement doux au survol pour consultation interactive
 */

const CX = 720;
const CY = 410;
const TILT_DEG = -13;

// 4 Anneaux orbitaux agrandis pour un univers imposant et généreux
const RX1 = 215;
const RY1 = 95;

const RX2 = 330;
const RY2 = 145;

const RX3 = 445;
const RY3 = 195;

const RX4 = 540;
const RY4 = 236;

// Formule mathématique exacte pour positionner un point sur une ellipse 3D inclinée
export const getEllipsePoint = (rx, ry, angleRad, tiltDeg = TILT_DEG) => {
  const tiltRad = (tiltDeg * Math.PI) / 180;
  const x0 = rx * Math.cos(angleRad);
  const y0 = ry * Math.sin(angleRad);
  const x = CX + (x0 * Math.cos(tiltRad) - y0 * Math.sin(tiltRad));
  const y = CY + (x0 * Math.sin(tiltRad) + y0 * Math.cos(tiltRad));
  return { x, y };
};

export default function AboutCosmicTechBackground() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const techRefs = useRef({});
  const isHoveredRef = useRef(false);

  // Technologies réparties sur les 3 anneaux - Médaillons cosmiques agrandis SANS BLANC
  // ORBITE 1 (Intérieure, rx=215, ry=95) : 2 technologies opposées (180°)
  const orbit1Techs = [
    {
      id: 'react',
      name: 'React 19',
      color: '#38bdf8',
      initialAngle: 0,
      renderIcon: () => (
        <g>
          <ellipse rx="12" ry="4.5" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <ellipse rx="12" ry="4.5" transform="rotate(60)" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <ellipse rx="12" ry="4.5" transform="rotate(120)" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <circle r="3" fill="#38bdf8" filter="url(#techGlowSubtle)" />
        </g>
      )
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      color: '#60a5fa',
      initialAngle: Math.PI, // 180°
      renderIcon: () => (
        <g>
          <rect x="-11.5" y="-11.5" width="23" height="23" rx="4.5" fill="#2563eb" />
          <text x="-4" y="5.5" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">T</text>
          <text x="5" y="5.5" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">S</text>
        </g>
      )
    }
  ];

  // ORBITE 2 (Médiane, rx=330, ry=145) : 3 technologies espacées à 120°
  const orbit2Techs = [
    {
      id: 'nextjs',
      name: 'Next.js 15',
      color: '#e2e8f0',
      initialAngle: 0,
      renderIcon: () => (
        <g>
          <circle r="13" fill="#090514" stroke="#e2e8f0" strokeWidth="1.5" />
          <path d="M -6.5 7.5 L -6.5 -7.5 L -4 -7.5 L 4 3.8 L 4 -7.5 L 6.5 -7.5 L 6.5 7.5 L 4 7.5 L -4 -3.8 L -4 7.5 Z" fill="#ffffff" />
          <path d="M 4 2.5 L 6.5 6.5 L 6.5 7.5 L 4 3.8 Z" fill="#c084fc" />
        </g>
      )
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      color: '#38bdf8',
      initialAngle: (2 * Math.PI) / 3, // 120°
      renderIcon: () => (
        <g>
          <path d="M -10 -1.5 C -8 -4.5 -6 -5.5 -4 -4.5 C -1.5 -3.5 -0.5 0 1.5 1 C 4.5 2.2 6.5 1.2 8.5 -1 C 6.5 3 4.5 4.5 2.5 3.5 C 0 2.5 0 -0.5 -2.5 -1.5 C -5 -2.5 -7 -1.5 -10 -1.5 Z" fill="#38bdf8" />
          <path d="M -10 5.5 C -8 2.5 -6 1.5 -4 2.5 C -1.5 3.5 -0.5 7 1.5 8 C 4.5 9.2 6.5 8.2 8.5 6 C 6.5 10 4.5 11.5 2.5 10.5 C 0 9.5 0 6.5 -2.5 5.5 C -5 4.5 -7 5.5 -10 5.5 Z" fill="#38bdf8" />
        </g>
      )
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      color: '#4ade80',
      initialAngle: (4 * Math.PI) / 3, // 240°
      renderIcon: () => (
        <g>
          <path d="M 0 -12 L 10.5 -6 L 10.5 6 L 0 12 L -10.5 6 L -10.5 -6 Z" fill="#16a34a" stroke="#4ade80" strokeWidth="1.2" />
          <path d="M 0 -7 L 6.5 -3.5 L 6.5 3.5 L 0 7 L -6.5 3.5 L -6.5 -3.5 Z" fill="#ffffff" />
        </g>
      )
    }
  ];

  // ORBITE 3 (Extérieure, rx=445, ry=195) : 4 technologies espacées à 90°
  const orbit3Techs = [
    {
      id: 'figma',
      name: 'Figma',
      color: '#fb923c',
      initialAngle: 0,
      renderIcon: () => (
        <g>
          <path d="M -7.5 -10.5 H 0 V -3.5 H -4.5 A 4 4 0 0 1 -7.5 -7.5 Z" fill="#f24e1e" />
          <path d="M 0 -10.5 H 4.5 A 4 4 0 0 1 8.5 -7.5 A 4 4 0 0 1 4.5 -3.5 H 0 Z" fill="#ff7262" />
          <path d="M 0 -3.5 H 4.5 A 4 4 0 0 1 8.5 0.5 A 4 4 0 0 1 4.5 4.5 H 0 Z" fill="#1abcfe" />
          <path d="M -7.5 -3.5 H 0 V 4.5 H -4.5 A 4 4 0 0 1 -7.5 0.5 Z" fill="#a259ff" />
          <path d="M -7.5 4.5 H 0 V 8.5 A 4 4 0 0 1 -4.5 12.5 A 4 4 0 0 1 -7.5 8.5 Z" fill="#0acf83" />
        </g>
      )
    },
    {
      id: 'python',
      name: 'Python',
      color: '#38bdf8',
      initialAngle: Math.PI / 2, // 90°
      renderIcon: () => (
        <g>
          <path d="M -0.8 -11 C -5 -11 -5.5 -9 -5.5 -9 V -6.5 H -0.8 V -5.2 H -7.5 C -10 -5.2 -11 -3.5 -11 -1 C -11 1.5 -9 2.5 -9 2.5 H -7.5 V 0.5 C -7.5 -1.5 -5.5 -1.5 -5.5 -1.5 H -1.8 C 0 -1.5 0 -3.5 0 -3.5 V -9 C 0 -9 -0.8 -11 -0.8 -11 Z" fill="#38bdf8" />
          <circle cx="-3.5" cy="-8.5" r="1.1" fill="#ffffff" />
          <path d="M 0.8 11 C 5 11 5.5 9 5.5 9 V 6.5 H 0.8 V 5.2 H 7.5 C 10 5.2 11 3.5 11 1 C 11 -1.5 9 -2.5 9 -2.5 H 7.5 V -0.5 C 7.5 1.5 5.5 1.5 5.5 1.5 H 1.8 C 0 1.5 0 3.5 0 3.5 V 9 C 0 9 0.8 11 0.8 11 Z" fill="#facc15" />
          <circle cx="3.5" cy="8.5" r="1.1" fill="#130924" />
        </g>
      )
    },
    {
      id: 'docker',
      name: 'Docker',
      color: '#38bdf8',
      initialAngle: Math.PI, // 180°
      renderIcon: () => (
        <g>
          <rect x="-7" y="-7" width="3.5" height="3.5" rx="0.6" fill="#38bdf8" />
          <rect x="-2.8" y="-7" width="3.5" height="3.5" rx="0.6" fill="#38bdf8" />
          <rect x="1.4" y="-7" width="3.5" height="3.5" rx="0.6" fill="#38bdf8" />
          <rect x="-4.8" y="-11.2" width="3.5" height="3.5" rx="0.6" fill="#38bdf8" />
          <rect x="-0.6" y="-11.2" width="3.5" height="3.5" rx="0.6" fill="#38bdf8" />
          <path d="M -12 -2 C -12 5.5 -4.5 8.5 2 8.5 C 8 8.5 12 5.5 12.5 0.5 C 9.5 -0.3 7.5 -2 5 -2 C 1.2 -2 -12 -2 -12 -2 Z" fill="#38bdf8" />
          <circle cx="-6" cy="1.5" r="1.2" fill="#ffffff" />
        </g>
      )
    },
    {
      id: 'vite',
      name: 'Vite',
      color: '#c084fc',
      initialAngle: (3 * Math.PI) / 2, // 270°
      renderIcon: () => (
        <g>
          <path d="M -9 -10 L 0 10.5 L 9 -10 L 4 -10 L 0 -1.5 L -4 -10 Z" fill="#38bdf8" opacity="0.9" />
          <path d="M 6.5 -11.5 L -7.5 1.5 L -1.5 1.5 L -4.5 11 L 8 -1.5 L 2 -1.5 Z" fill="#facc15" stroke="#9333ea" strokeWidth="1.2" />
        </g>
      )
    }
  ];

  // ===================================================================
  // ANIMATION CONTINUE FLUIDE DIRECTEMENT LE LONG DES COURBES ELLIPTIQUES
  // 60/120 FPS via requestAnimationFrame + manipulation directe des refs SVG (zéro re-render React)
  // ===================================================================
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    let a1 = 0;
    let a2 = 0;
    let a3 = 0;

    // Vitesse de révolution orbitale majestueuse
    const SPEED_1 = (2 * Math.PI) / 32;       // ~32s par tour complet (sens horaire)
    const SPEED_2 = -(2 * Math.PI) / 44;      // ~44s par tour complet (sens anti-horaire)
    const SPEED_3 = (2 * Math.PI) / 58;       // ~58s par tour complet (sens horaire)

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Au survol, décélération douce (8% de la vitesse) pour permettre la lecture
      const mult = isHoveredRef.current ? 0.08 : 1.0;

      a1 += SPEED_1 * dt * mult;
      a2 += SPEED_2 * dt * mult;
      a3 += SPEED_3 * dt * mult;

      // Mise à jour Orbit 1 (React 19, TypeScript)
      orbit1Techs.forEach(t => {
        const el = techRefs.current[t.id];
        if (!el) return;
        const curAngle = a1 + t.initialAngle;
        const pt = getEllipsePoint(RX1, RY1, curAngle);
        const depth = Math.sin(curAngle);
        const scale = 1.18 + 0.17 * ((depth + 1) / 2);
        const opacity = 0.90 + 0.10 * ((depth + 1) / 2);
        el.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) scale(${scale.toFixed(3)})`);
        el.setAttribute('opacity', opacity.toFixed(2));
      });

      // Mise à jour Orbit 2 (Next.js, Tailwind, Node.js)
      orbit2Techs.forEach(t => {
        const el = techRefs.current[t.id];
        if (!el) return;
        const curAngle = a2 + t.initialAngle;
        const pt = getEllipsePoint(RX2, RY2, curAngle);
        const depth = Math.sin(curAngle);
        const scale = 1.18 + 0.17 * ((depth + 1) / 2);
        const opacity = 0.90 + 0.10 * ((depth + 1) / 2);
        el.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) scale(${scale.toFixed(3)})`);
        el.setAttribute('opacity', opacity.toFixed(2));
      });

      // Mise à jour Orbit 3 (Figma, Python, Docker, Vite)
      orbit3Techs.forEach(t => {
        const el = techRefs.current[t.id];
        if (!el) return;
        const curAngle = a3 + t.initialAngle;
        const pt = getEllipsePoint(RX3, RY3, curAngle);
        const depth = Math.sin(curAngle);
        const scale = 1.18 + 0.17 * ((depth + 1) / 2);
        const opacity = 0.90 + 0.10 * ((depth + 1) / 2);
        el.setAttribute('transform', `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}) scale(${scale.toFixed(3)})`);
        el.setAttribute('opacity', opacity.toFixed(2));
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="cosmic-about-bg-container" aria-hidden="true">
      {/* 1. Halo d'ambiance cosmique élargi */}
      <div className="cosmic-central-halo" />

      {/* 2. Rendu SVG 3D Orrery Planétaire Agrandie (viewBox 1440x820, centré à 720, 410) */}
      <svg
        className="cosmic-svg-canvas"
        viewBox="0 0 1440 820"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Dégradé de la Planète Centrale SANS JAUNE : Améthyste / Lilas / Perle nacrée */}
          <radialGradient id="centralOpalGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#f3e8ff" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="80%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>

          {/* Atmosphère lumineuse de la planète centrale */}
          <radialGradient id="centralAtmoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#9333ea" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#9e98eb" stopOpacity="0" />
          </radialGradient>

          {/* Dégradé fond de verre sombre cosmique pour les médaillons (PAS DE BLANC) */}
          <linearGradient id="techDarkGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#251249" />
            <stop offset="50%" stopColor="#1a0b36" />
            <stop offset="100%" stopColor="#0f0521" />
          </linearGradient>

          {/* Dégradé tube 3D pour les anneaux orbitaux roses / fuchsia néon */}
          <linearGradient id="ringTubePink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="35%" stopColor="#ec4899" />
            <stop offset="70%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Dégradé planète rayée rouge */}
          <linearGradient id="planetRedStriped" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e11d48" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          {/* Dégradé planète bleue */}
          <linearGradient id="planetBlueStriped" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Astéroïdes rocheux */}
          <linearGradient id="asteroidRockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Filtres d'ombre & de lueur cosmique */}
          <filter id="orreryMedallionShadow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#070212" floodOpacity="0.85" />
          </filter>

          <filter id="neonPinkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="techGlowSubtle" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===================================================================
            A. LES 4 ANNEAUX ORBITAUX 3D INCLINÉS (Perspective agrandie & tubes néon)
            =================================================================== */}
        <g className="orrery-rings-group">
          {/* Anneau 4 (Le plus grand extérieur : rx=540, ry=236) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX4}
            ry={RY4}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="url(#ringTubePink)"
            strokeWidth="3.4"
            strokeOpacity="0.55"
            fill="none"
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX4}
            ry={RY4}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="#ffffff"
            strokeWidth="1.1"
            strokeOpacity="0.75"
            fill="none"
          />

          {/* Anneau 3 (Extérieur : rx=445, ry=195) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX3}
            ry={RY3}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="url(#ringTubePink)"
            strokeWidth="3.8"
            fill="none"
            filter="url(#neonPinkGlow)"
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX3}
            ry={RY3}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="#ffffff"
            strokeWidth="1.3"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* Anneau 2 (Médian : rx=330, ry=145) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX2}
            ry={RY2}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="url(#ringTubePink)"
            strokeWidth="3.6"
            fill="none"
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX2}
            ry={RY2}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.8"
            fill="none"
          />

          {/* Anneau 1 (Intérieur : rx=215, ry=95) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX1}
            ry={RY1}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="url(#ringTubePink)"
            strokeWidth="3.2"
            fill="none"
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX1}
            ry={RY1}
            transform={`rotate(${TILT_DEG}, ${CX}, ${CY})`}
            stroke="#ffffff"
            strokeWidth="1.1"
            strokeOpacity="0.75"
            fill="none"
          />
        </g>

        {/* ===================================================================
            B. PLANÈTES ET ASTÉROÏDES CARACTÉRISTIQUES DE L'UNIVERS (Agrandis)
            =================================================================== */}
        
        {/* 1. Planète Rouge Rayée avec anneau (Haut Gauche, sur l'anneau extérieur) */}
        <g transform="translate(260, 400)">
          <ellipse rx="38" ry="13" transform="rotate(-20)" stroke="#fbcfe8" strokeWidth="2.8" fill="none" opacity="0.9" />
          <circle r="24" fill="url(#planetRedStriped)" />
          <path d="M -19 -8 Q -5 -13 19 -7" stroke="#ffffff" strokeWidth="2.4" fill="none" opacity="0.85" />
          <path d="M -21 1 Q -4 0 21 7" stroke="#ffffff" strokeWidth="2.6" fill="none" opacity="0.85" />
          <path d="M -18 12 Q -1 11 18 14" stroke="#ffffff" strokeWidth="2.1" fill="none" opacity="0.7" />
          <path d="M -36 13 C -22 22, 22 17, 36 0" stroke="#ffffff" strokeWidth="3.2" fill="none" />
        </g>

        {/* 2. Planète Bleue/Verte rayée avec anneau (Bas Gauche, sur anneau 3) */}
        <g transform="translate(450, 605)">
          <ellipse rx="40" ry="13" transform="rotate(-15)" stroke="#67e8f9" strokeWidth="2.6" fill="none" opacity="0.85" />
          <circle r="26" fill="url(#planetBlueStriped)" />
          <path d="M -21 -5 Q -5 -1 21 -7" stroke="#10b981" strokeWidth="2.6" fill="none" />
          <path d="M -23 4 Q -5 9 23 1" stroke="#67e8f9" strokeWidth="2.8" fill="none" />
          <path d="M -36 12 C -22 22, 22 17, 36 1" stroke="#ffffff" strokeWidth="2.8" fill="none" />
        </g>

        {/* 3. Petite Planète Rouge avec anneau vertical (sous le centre) */}
        <g transform="translate(805, 532)">
          <ellipse rx="16" ry="26" transform="rotate(8)" stroke="#f472b6" strokeWidth="2.2" fill="none" />
          <circle r="14" fill="#ef4444" />
          <path d="M -11 -1 Q 0 2 11 0" stroke="#fecdd3" strokeWidth="1.8" fill="none" />
        </g>

        {/* 4. Lune Lilas à rayures fines (sur l'anneau supérieur droit) */}
        <g transform="translate(895, 260)">
          <circle r="16" fill="#f472b6" />
          <path d="M -13 -2 Q 0 -6 13 -3" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
          <path d="M -14 2 Q 0 1 14 3" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
        </g>

        {/* 5. Petite sphère turquoise émeraude */}
        <circle cx="610" cy="370" r="11" fill="#14b8a6" stroke="#5eead4" strokeWidth="1.6" />

        {/* 6. Grappe d'Astéroïdes Rocheux Réalistes (Côté Droit) */}
        <g transform="translate(1100, 520)" className="orrery-asteroid-rock">
          <polygon points="-13,-26 9,-30 28,-13 32,13 13,30 -15,26 -30,9 -26,-15" fill="url(#asteroidRockGrad)" stroke="#cbd5e1" strokeWidth="1.3" />
          <circle cx="2" cy="-3" r="5" fill="#334155" opacity="0.6" />
          <circle cx="-10" cy="7" r="4.2" fill="#334155" opacity="0.5" />
        </g>
        <g transform="translate(1145, 470)" className="orrery-asteroid-rock">
          <polygon points="-9,-16 7,-18 19,-6 21,9 9,19 -11,16 -19,3 -15,-11" fill="url(#asteroidRockGrad)" stroke="#cbd5e1" strokeWidth="1.1" />
          <circle cx="2" cy="0" r="3.5" fill="#334155" opacity="0.6" />
        </g>
        <g transform="translate(1165, 430)" className="orrery-asteroid-rock">
          <polygon points="-6,-12 4,-14 13,-4 14,6 6,13 -7,12 -13,1 -11,-7" fill="url(#asteroidRockGrad)" stroke="#cbd5e1" strokeWidth="0.9" />
        </g>

        {/* 7. Étoile Épineuse Verte (signature de l'illustration) */}
        <g transform="translate(190, 340)" className="orrery-spike-star">
          <polygon
            points="0,-17 4,-6 16,-11 7,0 17,6 6,6 10,17 0,7.5 -10,17 -6,6 -17,6 -7,0 -16,-11 -4,-6"
            fill="#10b981"
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="0" r="3.2" fill="#ffffff" />
        </g>

        {/* 8. Petites billes et sphères colorées flottantes */}
        <circle cx="280" cy="620" r="8" fill="#f43f5e" />
        <circle cx="530" cy="290" r="6" fill="#c084fc" />
        <circle cx="940" cy="540" r="7" fill="#cbd5e1" />
        <circle cx="1170" cy="370" r="11" fill="#06b6d4" stroke="#67e8f9" strokeWidth="1.5" />
        <circle cx="1200" cy="550" r="6" fill="#fb7185" />

        {/* ===================================================================
            C. PLANÈTE CENTRALE MAJESTUEUSE & VOLUMINEUSE (R=65, ZÉRO JAUNE, PERLE / AMÉTHYSTE)
            =================================================================== */}
        <g className="central-celestial-body">
          {/* Lueur d'atmosphère améthyste douce */}
          <circle cx={CX} cy={CY} r="96" fill="url(#centralAtmoGlow)" />

          {/* Corps de la planète centrale : Perle / Améthyste / Lilas (ZÉRO JAUNE) */}
          <circle
            cx={CX}
            cy={CY}
            r="65"
            fill="url(#centralOpalGrad)"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.8"
            style={{ filter: 'drop-shadow(0 12px 34px rgba(126, 34, 206, 0.65))' }}
          />

          {/* Bandes de texture nacrées et subtiles */}
          <ellipse cx={CX} cy={CY - 12} rx="50" ry="14" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2.2" fill="none" opacity="0.85" />
          <ellipse cx={CX} cy={CY + 14} rx="55" ry="16" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.4" fill="none" opacity="0.8" />

          {/* Reflet spéculaire éclatant sur le pôle supérieur */}
          <ellipse cx={CX - 18} cy={CY - 28} rx="18" ry="8" transform="rotate(-20, 702, 382)" fill="#ffffff" opacity="0.8" />
        </g>

        {/* ===================================================================
            D. LES TECHNOLOGIES EN ORBITE FLUIDE LE LONG DES ANNEAUX
            MÉDAILLONS EN VERRE COSMIQUE SOMBRE VIOLET (#130924) - PAS DE FOND BLANC !
            Bordure néon éclatante + Icône agrandie + Badge capsule sombre à bordure néon
            =================================================================== */}
        
        {/* ORBITE 1 (Intérieure, rx=215, ry=95) : React 19, TypeScript */}
        <g className="orbit-track-group">
          {orbit1Techs.map((tech) => {
            const initialPt = getEllipsePoint(RX1, RY1, tech.initialAngle);
            const isHov = hoveredTech === tech.id;
            return (
              <g
                key={tech.id}
                ref={el => { if (el) techRefs.current[tech.id] = el; }}
                transform={`translate(${initialPt.x}, ${initialPt.y})`}
                className="tech-medallion-group"
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredTech(tech.id);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredTech(null);
                }}
              >
                {/* Lueur halo externe vive aux teintes de la technologie */}
                <circle cx="0" cy="0" r="32" fill={tech.color} opacity={isHov ? '0.85' : '0.35'} filter="url(#neonPinkGlow)" />
                {/* Médaillon Cosmique en Verre Sombre (PAS DE BLANC) */}
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="url(#techDarkGlassGrad)"
                  stroke={tech.color}
                  strokeWidth={isHov ? '3.4' : '2.5'}
                  filter="url(#orreryMedallionShadow)"
                />
                {/* Lueur diffuse interne */}
                <circle cx="0" cy="0" r="21" fill={tech.color} opacity={isHov ? '0.35' : '0.15'} />
                {/* Icône officielle bien contrastée et agrandie */}
                <g>{tech.renderIcon()}</g>
                {/* Badge Nom : Capsule Verre Sombre Violette (#130924) avec bordure néon */}
                <g transform="translate(0, 36)">
                  <rect
                    x="-42"
                    y="-11.5"
                    width="84"
                    height="23"
                    rx="11.5"
                    fill="#130924"
                    stroke={tech.color}
                    strokeWidth={isHov ? '2' : '1.4'}
                    filter="url(#orreryMedallionShadow)"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    letterSpacing="0.02em"
                    fill="#ffffff"
                    fontFamily="sans-serif"
                  >
                    {tech.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* ORBITE 2 (Médiane, rx=330, ry=145) : Next.js 15, Tailwind CSS, Node.js */}
        <g className="orbit-track-group">
          {orbit2Techs.map((tech) => {
            const initialPt = getEllipsePoint(RX2, RY2, tech.initialAngle);
            const isHov = hoveredTech === tech.id;
            return (
              <g
                key={tech.id}
                ref={el => { if (el) techRefs.current[tech.id] = el; }}
                transform={`translate(${initialPt.x}, ${initialPt.y})`}
                className="tech-medallion-group"
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredTech(tech.id);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredTech(null);
                }}
              >
                <circle cx="0" cy="0" r="32" fill={tech.color} opacity={isHov ? '0.85' : '0.35'} filter="url(#neonPinkGlow)" />
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="url(#techDarkGlassGrad)"
                  stroke={tech.color}
                  strokeWidth={isHov ? '3.4' : '2.5'}
                  filter="url(#orreryMedallionShadow)"
                />
                <circle cx="0" cy="0" r="21" fill={tech.color} opacity={isHov ? '0.35' : '0.15'} />
                <g>{tech.renderIcon()}</g>
                <g transform="translate(0, 36)">
                  <rect
                    x="-42"
                    y="-11.5"
                    width="84"
                    height="23"
                    rx="11.5"
                    fill="#130924"
                    stroke={tech.color}
                    strokeWidth={isHov ? '2' : '1.4'}
                    filter="url(#orreryMedallionShadow)"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    letterSpacing="0.02em"
                    fill="#ffffff"
                    fontFamily="sans-serif"
                  >
                    {tech.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* ORBITE 3 (Extérieure, rx=445, ry=195) : Figma, Python, Docker, Vite */}
        <g className="orbit-track-group">
          {orbit3Techs.map((tech) => {
            const initialPt = getEllipsePoint(RX3, RY3, tech.initialAngle);
            const isHov = hoveredTech === tech.id;
            return (
              <g
                key={tech.id}
                ref={el => { if (el) techRefs.current[tech.id] = el; }}
                transform={`translate(${initialPt.x}, ${initialPt.y})`}
                className="tech-medallion-group"
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredTech(tech.id);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredTech(null);
                }}
              >
                <circle cx="0" cy="0" r="32" fill={tech.color} opacity={isHov ? '0.85' : '0.35'} filter="url(#neonPinkGlow)" />
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill="url(#techDarkGlassGrad)"
                  stroke={tech.color}
                  strokeWidth={isHov ? '3.4' : '2.5'}
                  filter="url(#orreryMedallionShadow)"
                />
                <circle cx="0" cy="0" r="21" fill={tech.color} opacity={isHov ? '0.35' : '0.15'} />
                <g>{tech.renderIcon()}</g>
                <g transform="translate(0, 36)">
                  <rect
                    x="-42"
                    y="-11.5"
                    width="84"
                    height="23"
                    rx="11.5"
                    fill="#130924"
                    stroke={tech.color}
                    strokeWidth={isHov ? '2' : '1.4'}
                    filter="url(#orreryMedallionShadow)"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    letterSpacing="0.02em"
                    fill="#ffffff"
                    fontFamily="sans-serif"
                  >
                    {tech.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

      </svg>
    </div>
  );
}
