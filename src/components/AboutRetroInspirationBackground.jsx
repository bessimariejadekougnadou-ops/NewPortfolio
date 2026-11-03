import React from 'react';
import './AboutRetroInspirationBackground.css';

/**
 * AboutRetroInspirationBackground
 * 
 * Reproduction fidèle de l'image de référence fournie par l'utilisateur :
 * - Fond cosmique sombre #130924 (couleur demandée par l'utilisateur)
 * - Sphère de verre translucide centrale avec planète solaire incandescente & anneau doré
 * - Grille 3D perspective retro-futuriste avec néons violet / magenta
 * - Cubes 3D isométriques flottants
 * - Capsules en verre dépoli flottantes autour avec les VRAIS LOGOS DE TECHNOLOGIES
 * - Bulles de dialogue en verre dépoli & billes de lumière
 * - Watermark "I N S P I R A T I O N"
 */
export default function AboutRetroInspirationBackground() {
  // Liste des technologies avec logos vectoriels officiels
  const techCapsules = [
    {
      id: 'react',
      name: 'React 19',
      badge: 'Core UI',
      posClass: 'capsule-pos-1',
      icon: (
        <svg viewBox="-12 -12 24 24" width="18" height="18">
          <ellipse rx="10" ry="4" stroke="#38bdf8" strokeWidth="1.6" fill="none" />
          <ellipse rx="10" ry="4" transform="rotate(60)" stroke="#38bdf8" strokeWidth="1.6" fill="none" />
          <ellipse rx="10" ry="4" transform="rotate(120)" stroke="#38bdf8" strokeWidth="1.6" fill="none" />
          <circle r="2.2" fill="#38bdf8" />
        </svg>
      )
    },
    {
      id: 'nextjs',
      name: 'Next.js 15',
      badge: 'SSR / App',
      posClass: 'capsule-pos-2',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="10" fill="#ffffff" />
          <path d="M7 16V8h2.6l6 8H17V8h-2v5.4L8.8 8H7v8h2z" fill="#090714" />
        </svg>
      )
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      badge: 'Type Safe',
      posClass: 'capsule-pos-3',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <rect width="24" height="24" rx="4" fill="#3178c6" />
          <text x="5" y="17" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">T</text>
          <text x="13" y="17" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">S</text>
        </svg>
      )
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      badge: 'Modern UI',
      posClass: 'capsule-pos-4',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#38bdf8">
          <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-.9 3-.3.6.4 1 1 1.6 1.7 1 1.1 2.2 2.4 4.9 2.4 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 .9-3 .3-.6-.4-1-1-1.6-1.7-1-1.1-2.2-2.4-4.9-2.4zm-7.5 7.2c-2.4 0-3.9 1.2-4.5 3.6 1-.8 2-.9 3-.3.6.4 1 1 1.6 1.7 1 1.1 2.2 2.4 4.9 2.4 2.4 0 3.9-1.2 4.5-3.6-1 .8-2 .9-3 .3-.6-.4-1-1-1.6-1.7-1-1.1-2.2-2.4-4.9-2.4z" />
        </svg>
      )
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      badge: 'Backend',
      posClass: 'capsule-pos-5',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#22c55e">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 3.5L5.5 9v6.5L12 19.3l6.5-3.8V9L12 5.5z" />
        </svg>
      )
    },
    {
      id: 'figma',
      name: 'Figma',
      badge: 'UI / UX',
      posClass: 'capsule-pos-6',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#f24e1e" />
          <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#ff7262" />
          <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1abcfe" />
          <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#a259ff" />
          <path d="M8 12h4v4.5A2.5 2.5 0 0 1 8 19a2.5 2.5 0 0 1-2.5-2.5A2.5 2.5 0 0 1 8 12z" fill="#0acf83" />
        </svg>
      )
    },
    {
      id: 'python',
      name: 'Python',
      badge: 'Logic & IA',
      posClass: 'capsule-pos-7',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.8H6.5S4 5.2 4 8.4s2.2 3.1 2.2 3.1h1.3V9.7s-.1-2.2 2.2-2.2h3.7s2.1.1 2.1-2.1V4.2S15.6 2 11.9 2zm-1.8 1.4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#38bdf8" />
          <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.8h8.4s2.5.3 2.5-2.9-2.2-3.1-2.2-3.1h-1.3v1.8s.1 2.2-2.2 2.2h-3.7s-2.1-.1-2.1 2.1v1.2S8.4 22 12.1 22zm1.8-1.4a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#facc15" />
        </svg>
      )
    },
    {
      id: 'docker',
      name: 'Docker',
      badge: 'DevOps',
      posClass: 'capsule-pos-8',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#38bdf8">
          <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm6 3h2v2h-2V8zm-15 5.5c0 4.1 3.4 7.5 7.5 7.5 4.5 0 8.3-2.9 9.5-7.1.6 0 1.5-.2 2-.5-1.1-.9-2.2-.9-3.2-.8-.4-1.9-2-3.3-3.8-3.3H3.5c-.3.7-.5 1.5-.5 2.2v2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="retro-inspiration-container" aria-hidden="true">
      {/* 1. Halo lumineux central pour une diffusion fluide vers #130924 */}
      <div className="retro-ambient-aurora" />

      {/* 2. Titre "INSPIRATION" en filigrane (conforme à l'image) */}
      <div className="retro-inspiration-watermark">
        <span className="retro-watermark-title">I N S P I R A T I O N</span>
        <span className="retro-watermark-subtitle">E X P E R T I S E &bull; T E C H N O L O G I E S</span>
      </div>

      {/* 3. Toile SVG Vectorielle : Sphère de verre, planète incandescente, anneau et grille 3D */}
      <svg
        className="retro-svg-canvas"
        viewBox="0 0 1440 960"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Noyau Planétaire Incandescent (Orange/Pêche au centre -> Magenta/Violet) */}
          <radialGradient id="sun-core-grad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fed7aa" />
            <stop offset="55%" stopColor="#fb7185" />essi@
            <stop offset="85%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>

          {/* Lueur externe intense du soleil */}
          <radialGradient id="sun-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#fed7aa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Sphère de verre externe (effet bulle translucide avec réfraction) */}
          <radialGradient id="glass-bubble-grad" cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </radialGradient>

          {/* Anneau doré de Saturne */}
          <linearGradient id="ring-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.4" />
          </linearGradient>

          {/* Dégradé des lignes de perspective de la grille (Blanches lumineuses) */}
          <linearGradient id="grid-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Dégradé des lignes horizontales de la grille (Blanches lumineuses) */}
          <linearGradient id="grid-horiz-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Filtre de lueur néon */}
          <filter id="neon-bloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* -----------------------------------------------------------------
            GRILLE 3D PERSPECTIVE RETRO-FUTURISTE (Sol en perspective)
            Converge vers le point d'horizon central (720, 520)
            ----------------------------------------------------------------- */}
        <g className="retro-grid-floor-group" opacity="0.85">
          {/* Lignes de fuite convergentes (Perspective Ray Lines) */}
          <line x1="720" y1="520" x2="-200" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />
          <line x1="720" y1="520" x2="-50" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />
          <line x1="720" y1="520" x2="100" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />
          <line x1="720" y1="520" x2="250" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.8" />
          <line x1="720" y1="520" x2="400" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2" />
          <line x1="720" y1="520" x2="520" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2.2" />
          <line x1="720" y1="520" x2="620" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2.4" />
          <line x1="720" y1="520" x2="720" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2.8" strokeOpacity="0.95" />
          <line x1="720" y1="520" x2="820" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2.4" />
          <line x1="720" y1="520" x2="920" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2.2" />
          <line x1="720" y1="520" x2="1040" y2="960" stroke="url(#grid-line-grad)" strokeWidth="2" />
          <line x1="720" y1="520" x2="1190" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.8" />
          <line x1="720" y1="520" x2="1340" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />
          <line x1="720" y1="520" x2="1490" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />
          <line x1="720" y1="520" x2="1640" y2="960" stroke="url(#grid-line-grad)" strokeWidth="1.6" />

          {/* Lignes horizontales à espacement exponentiel (Perspective Depth) */}
          <line x1="610" y1="535" x2="830" y2="535" stroke="url(#grid-horiz-grad)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="560" y1="550" x2="880" y2="550" stroke="url(#grid-horiz-grad)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="490" y1="570" x2="950" y2="570" stroke="url(#grid-horiz-grad)" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="400" y1="595" x2="1040" y2="595" stroke="url(#grid-horiz-grad)" strokeWidth="1.4" strokeOpacity="0.6" />
          <line x1="290" y1="630" x2="1150" y2="630" stroke="url(#grid-horiz-grad)" strokeWidth="1.6" strokeOpacity="0.7" />
          <line x1="160" y1="675" x2="1280" y2="675" stroke="url(#grid-horiz-grad)" strokeWidth="1.8" strokeOpacity="0.8" />
          <line x1="10" y1="735" x2="1430" y2="735" stroke="url(#grid-horiz-grad)" strokeWidth="2" strokeOpacity="0.85" />
          <line x1="-150" y1="810" x2="1590" y2="810" stroke="url(#grid-horiz-grad)" strokeWidth="2.2" strokeOpacity="0.9" />
          <line x1="-350" y1="905" x2="1790" y2="905" stroke="url(#grid-horiz-grad)" strokeWidth="2.4" strokeOpacity="0.95" />
        </g>

        {/* -----------------------------------------------------------------
            SPHÈRE CENTRALE DE VERRE & PLANÈTE INCANDESCENTE (Noyau + Anneau)
            ----------------------------------------------------------------- */}
        <g className="retro-center-orb-group">
          {/* 1. Lueur arrière diffuse du soleil */}
          <circle cx="720" cy="390" r="190" fill="url(#sun-glow-grad)" opacity="0.85" />

          {/* 2. Demi-anneau arrière (passe derrière le noyau) */}
          <path
            d="M 520 415 C 520 370, 920 330, 920 375"
            stroke="url(#ring-glow-grad)"
            strokeWidth="3.5"
            fill="none"
            opacity="0.65"
            filter="url(#neon-bloom)"
          />

          {/* 3. Noyau Planétaire Incandescent (Sphère solaire) */}
          <circle cx="720" cy="390" r="92" fill="url(#sun-core-grad)" filter="drop-shadow(0 0 25px rgba(254,215,170,0.8))" />

          {/* 4. Ondulations de surface internes du soleil */}
          <ellipse cx="720" cy="390" rx="60" ry="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" opacity="0.75" />
          <ellipse cx="720" cy="378" rx="42" ry="14" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" fill="none" opacity="0.85" />
          <ellipse cx="720" cy="368" rx="24" ry="8" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" fill="none" opacity="0.95" />

          {/* 5. Demi-anneau avant (passe devant le noyau avec satellite) */}
          <path
            d="M 520 415 C 520 460, 920 420, 920 375"
            stroke="url(#ring-glow-grad)"
            strokeWidth="4"
            fill="none"
            className="retro-ring-glow"
          />

          {/* Petite lune / satellite lumineux sur l'anneau avant */}
          <circle cx="685" cy="438" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />

          {/* 6. Grande Bulle de Verre Translucide enveloppante (Glass Dome) */}
          <circle
            cx="720"
            cy="390"
            r="165"
            fill="url(#glass-bubble-grad)"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2.2"
          />

          {/* Reflet de brillance sur la bulle de verre (coin supérieur gauche) */}
          <path
            d="M 610 280 C 650 250, 720 245, 780 255"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            filter="drop-shadow(0 0 6px #ffffff)"
          />
        </g>
      </svg>

      {/* 4. Cubes 3D Isométriques flottants en verre dépoli (comme sur l'image) */}
      {/* Cube Haut Droite */}
      <div className="retro-floating-cube cube-top-right">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          {/* Face Supérieure (Verre blanc pur) */}
          <polygon points="50,10 90,32 50,54 10,32" fill="#ffffff" opacity="0.85" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />
          {/* Face Gauche (Reflet verre dépoli) */}
          <polygon points="10,32 50,54 50,94 10,72" fill="rgba(255, 255, 255, 0.45)" opacity="0.85" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          {/* Face Droite (Reflet verre satiné) */}
          <polygon points="50,54 90,32 90,72 50,94" fill="rgba(255, 255, 255, 0.65)" opacity="0.9" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Cube Milieu Gauche */}
      <div className="retro-floating-cube cube-mid-left">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <polygon points="50,15 85,35 50,55 15,35" fill="#ffffff" opacity="0.8" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
          <polygon points="15,35 50,55 50,90 15,70" fill="rgba(255, 255, 255, 0.4)" opacity="0.85" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
          <polygon points="50,55 85,35 85,70 50,90" fill="rgba(255, 255, 255, 0.6)" opacity="0.9" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
        </svg>
      </div>

      {/* Dalle carrée en verre dépoli au sol (comme sur l'image de référence) */}
      <div className="retro-grid-floor-tile" />

      {/* 5. Bulles de dialogue en verre dépoli avec barres colorées (comme sur l'image) */}
      <div className="retro-speech-bubble bubble-left">
        <div className="speech-line-1" />
        <div className="speech-line-2" />
        <div className="speech-line-3" />
      </div>

      <div className="retro-speech-bubble bubble-right">
        <div className="speech-line-1" />
        <div className="speech-line-2" />
        <div className="speech-line-3" />
      </div>

      {/* 6. Sphères / Billes néon flottantes sur la grille (comme sur l'image) */}
      <div className="retro-neon-sphere sphere-1" />
      <div className="retro-neon-sphere sphere-2" />
      <div className="retro-neon-sphere sphere-3" />

      {/* 7. CAPSULES FLOTTANTES AVEC LES LOGOS DES TECHNOLOGIES (Demande explicite) */}
      <div className="retro-tech-capsules-layer">
        {techCapsules.map((tech) => (
          <div key={tech.id} className={`retro-tech-capsule ${tech.posClass}`}>
            <div className="retro-capsule-icon-wrap">
              {tech.icon}
            </div>
            <span className="retro-capsule-label">{tech.name}</span>
            <span className="retro-capsule-badge">{tech.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
