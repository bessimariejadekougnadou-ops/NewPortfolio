import React, { useEffect, useRef, useState, useMemo } from 'react';
import './CosmicZigzagCubesStream.css';

/**
 * CosmicZigzagCubesStream
 * Flux complet en zigzag de cubes 3D CodePen ("Build with Blocks")
 * se déployant le long de tout le portfolio (Accueil -> À propos -> Projets -> Compétences -> Parcours -> Contact).
 * - Tisse des zigzags continus d'un côté à l'autre de chaque page
 * - Utilise la palette violette cosmique de l'Accueil (#130924) avec reflets améthystes et néon violet
 * - Rotation 3D continue (tumbling) et accélération fluide au défilement
 * - pointer-events-none : zéro clic intercepté, texte et boutons 100% accessibles
 */
export default function CosmicZigzagCubesStream() {
  const cubeRefs = useRef([]);
  const animFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [docHeight, setDocHeight] = useState(7200);

  // 24 technologies réparties sur le zigzag tout au long des pages
  const cubeData = useMemo(() => [
    // --- ZONE 1 : ACCUEIL / HERO (y: 180 à 750) ---
    {
      id: 'cube-hero-react',
      theme: 'cube-theme-cosmic-stream',
      size: 56,
      yBase: 240,
      spinSpeedX: 45,
      spinSpeedY: 60,
      spinSpeedZ: -25,
      frontLogo: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8">
          <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
          <g stroke="#38bdf8" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
      backLogo: <div className="text-purple-300 font-black text-xs font-mono">⚡ VITE</div>
    },
    {
      id: 'cube-hero-ts',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 480,
      spinSpeedX: -50,
      spinSpeedY: 55,
      spinSpeedZ: 30,
      frontLogo: <div className="w-8 h-8 rounded bg-[#3178c6] text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">TS</div>,
      backLogo: <div className="w-8 h-8 rounded bg-[#f7df1e] text-slate-950 font-black text-xs flex items-center justify-center font-mono shadow-xs">JS</div>
    },
    {
      id: 'cube-hero-tailwind',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 720,
      spinSpeedX: 35,
      spinSpeedY: -50,
      spinSpeedZ: -20,
      frontLogo: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#38bdf8]">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
      backLogo: <div className="text-purple-200 font-bold text-[9px] font-mono">TW v4</div>
    },

    // --- ZONE 2 : TRANSITION VERS À PROPOS (y: 950 à 1800) ---
    {
      id: 'cube-about-jshint',
      theme: 'cube-theme-codepen-stream',
      size: 52,
      yBase: 980,
      spinSpeedX: -40,
      spinSpeedY: 65,
      spinSpeedZ: 25,
      frontLogo: (
        <div className="px-1.5 py-0.5 rounded bg-[#f7df1e] text-[#1a1a1a] font-black text-[9px] font-mono leading-none flex flex-col items-center">
          <span>JS</span>
          <span className="text-[7.5px] font-bold">Hint</span>
        </div>
      ),
      backLogo: <div className="text-purple-300 font-bold text-[9px] font-mono">ESLint</div>
    },
    {
      id: 'cube-about-markdown',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 1220,
      spinSpeedX: 45,
      spinSpeedY: -45,
      spinSpeedZ: -30,
      frontLogo: <div className="w-7 h-6 border-2 border-slate-800 rounded bg-white text-slate-900 font-black text-[10px] flex items-center justify-center font-mono">M↓</div>,
      backLogo: <div className="text-purple-200 font-bold text-[9px] font-mono">DOCS</div>
    },
    {
      id: 'cube-about-vue',
      theme: 'cube-theme-codepen-stream',
      size: 50,
      yBase: 1480,
      spinSpeedX: -35,
      spinSpeedY: 60,
      spinSpeedZ: 20,
      frontLogo: (
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z" />
          <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.5L64,76.8l38.5-66.8H78.8z" />
        </svg>
      ),
      backLogo: <div className="text-emerald-400 font-black text-[9px] font-mono">Nuxt</div>
    },
    {
      id: 'cube-about-less',
      theme: 'cube-theme-codepen-stream',
      size: 50,
      yBase: 1720,
      spinSpeedX: 50,
      spinSpeedY: 45,
      spinSpeedZ: -25,
      frontLogo: <div className="px-1.5 py-0.5 rounded bg-[#1d365d] text-white font-black text-[9px] font-mono">{'{less}'}</div>,
      backLogo: <div className="text-purple-200 font-bold text-[9px] font-mono">CSS</div>
    },

    // --- ZONE 3 : PROJETS (y: 1950 à 3000) ---
    {
      id: 'cube-proj-sass',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 1980,
      spinSpeedX: -45,
      spinSpeedY: -55,
      spinSpeedZ: 30,
      frontLogo: <div className="w-7 h-7 rounded bg-[#cf649a] text-white font-black text-[9px] flex items-center justify-center font-mono">Sass</div>,
      backLogo: <div className="text-pink-300 font-bold text-[9px] font-mono">SCSS</div>
    },
    {
      id: 'cube-proj-next',
      theme: 'cube-theme-cosmic-stream',
      size: 56,
      yBase: 2240,
      spinSpeedX: 55,
      spinSpeedY: 50,
      spinSpeedZ: -25,
      frontLogo: <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-sm font-sans border border-white/40 shadow-inner">▲</div>,
      backLogo: <div className="text-purple-200 font-bold text-[9px] font-mono">SSR</div>
    },
    {
      id: 'cube-proj-node',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 2500,
      spinSpeedX: -40,
      spinSpeedY: 60,
      spinSpeedZ: 20,
      frontLogo: <div className="w-7 h-7 rounded bg-[#339933] text-white flex items-center justify-center font-black text-[9px] font-mono">node</div>,
      backLogo: <div className="text-emerald-300 font-bold text-[9px] font-mono">NPM</div>
    },
    {
      id: 'cube-proj-python',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 2780,
      spinSpeedX: 45,
      spinSpeedY: -45,
      spinSpeedZ: -25,
      frontLogo: <div className="w-7 h-7 rounded bg-gradient-to-br from-[#3776ab] to-[#ffd438] text-slate-950 font-black text-xs flex items-center justify-center font-mono">py</div>,
      backLogo: <div className="text-emerald-400 font-bold text-[9px] font-mono">FastAPI</div>
    },

    // --- ZONE 4 : COMPÉTENCES / SKILLS (y: 3050 à 4100) ---
    {
      id: 'cube-skills-figma',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 3100,
      spinSpeedX: -50,
      spinSpeedY: 50,
      spinSpeedZ: 25,
      frontLogo: (
        <div className="flex flex-col gap-0.5 items-center justify-center">
          <div className="flex gap-0.5"><span className="w-2 h-2 rounded-full bg-[#f24e1e]" /><span className="w-2 h-2 rounded-full bg-[#ff7262]" /></div>
          <div className="flex gap-0.5"><span className="w-2 h-2 rounded-full bg-[#a259ff]" /><span className="w-2 h-2 rounded-full bg-[#1abcfe]" /></div>
          <span className="w-2 h-2 rounded-full bg-[#0acf83]" />
        </div>
      ),
      backLogo: <div className="text-purple-200 font-bold text-[9px] font-mono">UI/UX</div>
    },
    {
      id: 'cube-skills-gsap',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 3380,
      spinSpeedX: 60,
      spinSpeedY: -55,
      spinSpeedZ: -30,
      frontLogo: <div className="w-7 h-7 rounded bg-[#0ae448] text-black font-black text-[9px] flex items-center justify-center font-mono">GSAP</div>,
      backLogo: <div className="text-emerald-400 font-bold text-[9px] font-mono">Motion</div>
    },
    {
      id: 'cube-skills-graphql',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 3660,
      spinSpeedX: -45,
      spinSpeedY: 60,
      spinSpeedZ: 20,
      frontLogo: <div className="w-7 h-7 rounded bg-[#e10098] text-white font-bold text-xs flex items-center justify-center font-mono">GQL</div>,
      backLogo: <div className="text-pink-300 font-bold text-[9px] font-mono">API</div>
    },
    {
      id: 'cube-skills-docker',
      theme: 'cube-theme-codepen-stream',
      size: 54,
      yBase: 3940,
      spinSpeedX: 45,
      spinSpeedY: 45,
      spinSpeedZ: -25,
      frontLogo: <div className="w-7 h-7 rounded bg-[#2496ed] text-white font-black text-[9px] flex items-center justify-center font-mono">DOC</div>,
      backLogo: <div className="text-blue-300 font-bold text-[9px] font-mono">Cloud</div>
    },

    // --- ZONE 5 : EXPÉRIENCE & TÉMOIGNAGES (y: 4200 à 5800) ---
    {
      id: 'cube-exp-postgres',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 4250,
      spinSpeedX: -55,
      spinSpeedY: -45,
      spinSpeedZ: 30,
      frontLogo: <div className="w-7 h-7 rounded bg-[#336791] text-white font-black text-[9px] flex items-center justify-center font-mono">SQL</div>,
      backLogo: <div className="text-cyan-300 font-bold text-[9px] font-mono">Data</div>
    },
    {
      id: 'cube-exp-babel',
      theme: 'cube-theme-codepen-stream',
      size: 50,
      yBase: 4550,
      spinSpeedX: 40,
      spinSpeedY: 60,
      spinSpeedZ: -20,
      frontLogo: <div className="w-7 h-7 rounded bg-[#f5da55] text-slate-900 flex items-center justify-center font-black text-[9px] font-mono">babel</div>,
      backLogo: <div className="text-amber-400 font-bold text-[9px] font-mono">ES6+</div>
    },
    {
      id: 'cube-exp-git',
      theme: 'cube-theme-cosmic-stream',
      size: 52,
      yBase: 4850,
      spinSpeedX: -45,
      spinSpeedY: 55,
      spinSpeedZ: 25,
      frontLogo: <div className="w-7 h-7 rounded bg-[#f05032] text-white font-black text-[10px] flex items-center justify-center font-mono">Git</div>,
      backLogo: <div className="text-orange-300 font-bold text-[9px] font-mono">Hub</div>
    },
    {
      id: 'cube-test-html',
      theme: 'cube-theme-codepen-stream',
      size: 52,
      yBase: 5180,
      spinSpeedX: 50,
      spinSpeedY: -50,
      spinSpeedZ: -25,
      frontLogo: <div className="w-7 h-7 rounded bg-[#e34f26] text-white font-black text-[9px] flex items-center justify-center font-mono">HTML5</div>,
      backLogo: <div className="text-orange-200 font-bold text-[9px] font-mono">W3C</div>
    },
    {
      id: 'cube-test-css',
      theme: 'cube-theme-codepen-stream',
      size: 52,
      yBase: 5480,
      spinSpeedX: -40,
      spinSpeedY: 60,
      spinSpeedZ: 20,
      frontLogo: <div className="w-7 h-7 rounded bg-[#1572b6] text-white font-black text-[9px] flex items-center justify-center font-mono">CSS3</div>,
      backLogo: <div className="text-blue-200 font-bold text-[9px] font-mono">Grid</div>
    },

    // --- ZONE 6 : CONTACT & BAS DE PAGE (y: 5800 à 7000) ---
    {
      id: 'cube-contact-react',
      theme: 'cube-theme-cosmic-stream',
      size: 56,
      yBase: 5850,
      spinSpeedX: 45,
      spinSpeedY: 50,
      spinSpeedZ: -25,
      frontLogo: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7">
          <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
          <g stroke="#38bdf8" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
      backLogo: <div className="text-purple-300 font-bold text-[9px] font-mono">React 19</div>
    },
    {
      id: 'cube-contact-node',
      theme: 'cube-theme-codepen-stream',
      size: 52,
      yBase: 6200,
      spinSpeedX: -50,
      spinSpeedY: -45,
      spinSpeedZ: 30,
      frontLogo: <div className="w-7 h-7 rounded bg-[#339933] text-white flex items-center justify-center font-black text-[9px] font-mono">node</div>,
      backLogo: <div className="text-emerald-400 font-bold text-[9px] font-mono">REST</div>
    },
    {
      id: 'cube-contact-ts',
      theme: 'cube-theme-cosmic-stream',
      size: 54,
      yBase: 6550,
      spinSpeedX: 40,
      spinSpeedY: 55,
      spinSpeedZ: -20,
      frontLogo: <div className="w-7 h-7 rounded bg-[#3178c6] text-white font-black text-xs flex items-center justify-center font-mono">TS</div>,
      backLogo: <div className="text-blue-300 font-bold text-[9px] font-mono">Strict</div>
    },
    {
      id: 'cube-footer-star',
      theme: 'cube-theme-cosmic-stream',
      size: 56,
      yBase: 6900,
      spinSpeedX: -45,
      spinSpeedY: 50,
      spinSpeedZ: 25,
      frontLogo: <div className="text-purple-200 font-black text-sm">✦ MJ</div>,
      backLogo: <div className="text-purple-300 font-bold text-xs">2026</div>
    }
  ], []);

  // Détection de la hauteur totale du document
  useEffect(() => {
    const updateDocHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        7200
      );
      setDocHeight(height);
    };

    updateDocHeight();
    window.addEventListener('resize', updateDocHeight);
    const timeout = setTimeout(updateDocHeight, 1500);
    return () => {
      window.removeEventListener('resize', updateDocHeight);
      clearTimeout(timeout);
    };
  }, []);

  // Détection prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Boucle d'animation avec optimisation viewport (ne calcule que les cubes visibles)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetScrollY = window.scrollY || 0;
    let lastScrollY = targetScrollY;
    let isRunning = true;
    let lastTime = performance.now();
    let totalTime = 0;
    let scrollVelocity = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const updateStream = (now) => {
      if (!isRunning) return;

      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalTime += deltaSec;

      const scrollDelta = targetScrollY - lastScrollY;
      lastScrollY = targetScrollY;
      scrollVelocity += (scrollDelta - scrollVelocity) * 0.15;

      const viewportTop = targetScrollY;
      const viewportBottom = targetScrollY + window.innerHeight;

      cubeData.forEach((cube, index) => {
        const el = cubeRefs.current[index];
        if (!el) return;

        // Optimisation : n'animer que si le cube est proche de la zone visible
        const yPos = cube.yBase;
        if (yPos < viewportTop - 600 || yPos > viewportBottom + 600) {
          return;
        }

        // Rotation 3D continue + accélération au scroll
        const rotX = (totalTime * cube.spinSpeedX * 1.5 + targetScrollY * 0.12) % 360;
        const rotY = (totalTime * cube.spinSpeedY * 1.8 + targetScrollY * 0.18) % 360;
        const rotZ = (totalTime * cube.spinSpeedZ * 1.2) % 360;

        // Légère oscillation sinusoïdale organique
        const waveX = Math.sin(totalTime * 1.2 + index) * 8;
        const waveY = Math.cos(totalTime * 1.5 + index) * 6;

        el.style.transform = `translate3d(${waveX}px, ${waveY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
      });

      animFrameRef.current = requestAnimationFrame(updateStream);
    };

    animFrameRef.current = requestAnimationFrame(updateStream);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', onScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cubeData, prefersReducedMotion]);

  // Construction du chemin SVG serpentine en zigzag qui traverse toutes les sections
  const svgPathData = useMemo(() => {
    let d = '';
    const step = 80;
    const maxH = Math.max(docHeight, 7200);

    for (let y = 100; y <= maxH; y += step) {
      // Formule du zigzag sinusoïdal : alterne de 15% à 85% de la largeur
      const xPercent = 50 + 35 * Math.sin((y / 850) * Math.PI);
      if (y === 100) {
        d += `M ${xPercent} ${y}`;
      } else {
        d += ` L ${xPercent} ${y}`;
      }
    }
    return d;
  }, [docHeight]);

  return (
    <div className="cosmic-zigzag-viewport" aria-hidden="true" style={{ height: `${docHeight}px` }}>

      {/* Tracé SVG serpentine en pointillés lumineux sur toutes les pages */}
      <svg
        className="zigzag-svg-trail"
        viewBox={`0 0 100 ${docHeight}`}
        preserveAspectRatio="none"
        style={{ height: `${docHeight}px` }}
      >
        <path
          d={svgPathData}
          fill="none"
          stroke="rgba(168, 85, 247, 0.32)"
          strokeWidth="0.3"
          strokeDasharray="1.2 1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Cubes 3D disposés le long de la courbe en zigzag */}
      {cubeData.map((cube, index) => {
        const half = cube.size / 2;
        // Calcul de la position X sur la courbe sinusoïdale en zigzag
        const xPercent = 50 + 35 * Math.sin((cube.yBase / 850) * Math.PI);

        return (
          <div
            key={cube.id}
            ref={(el) => (cubeRefs.current[index] = el)}
            className={`zigzag-cube-anchor ${cube.theme}`}
            style={{
              top: `${cube.yBase}px`,
              left: `${xPercent}%`,
              width: `${cube.size}px`,
              height: `${cube.size}px`,
              marginLeft: `-${half}px`,
              marginTop: `-${half}px`,
            }}
          >
            <div
              className="zigzag-cube-box"
              style={{ width: `${cube.size}px`, height: `${cube.size}px` }}
            >
              {/* Face Avant (Logo Tech Principal avec lueur violette) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-front"
                style={{ transform: `translateZ(${half}px)` }}
              >
                {cube.frontLogo}
              </div>

              {/* Face Arrière (Second Logo Tech) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-back"
                style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
              >
                {cube.backLogo}
              </div>

              {/* Face Supérieure (Reflet améthyste clair) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-top"
                style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
              />

              {/* Face Droite (Ombre violet nuit) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-right"
                style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
              />

              {/* Face Gauche (Ombre douce) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-left"
                style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
              />

              {/* Face Inférieure (Ombre portée) */}
              <div
                className="zigzag-cube-face zigzag-cube-face-bottom"
                style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
              />
            </div>
          </div>
        );
      })}

    </div>
  );
}
