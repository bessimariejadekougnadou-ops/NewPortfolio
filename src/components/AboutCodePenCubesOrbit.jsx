import React, { useEffect, useRef, useState, useMemo } from 'react';
import './AboutCodePenCubesOrbit.css';

/**
 * AboutCodePenCubesOrbit
 * Reproduction fidèle du grand anneau orbital 3D de CodePen.io ("Build with Blocks")
 * disposé en cercle/ellipse tournante en arrière-plan de la section À Propos.
 * - Cubes 3D volumétriques tournants avec logos technologies
 * - Rotation 3D continue (tumbling) + révolution orbitale dynamique au défilement
 * - pointer-events-none pour préserver 100% l'interactivité du contenu
 */
export default function AboutCodePenCubesOrbit() {
  const containerRef = useRef(null);
  const cubeRefs = useRef([]);
  const animFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ rx: 520, ry: 260, rz: 180 });

  // 14 cubes technologiques fidèles à CodePen et à la stack de Marie-Jade
  const cubes = useMemo(() => [
    {
      id: 'cube-react',
      theme: 'cube-theme-codepen',
      size: 58,
      spinSpeedX: 45,
      spinSpeedY: 65,
      spinSpeedZ: -25,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8">
          <circle cx="0" cy="0" r="2.05" fill="#0284c7" />
          <g stroke="#0284c7" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#646cff] to-[#bd34fe] text-white flex items-center justify-center font-black text-xs font-mono shadow-xs">
          ⚡
        </div>
      )
    },
    {
      id: 'cube-jshint',
      theme: 'cube-theme-codepen',
      size: 52,
      spinSpeedX: -50,
      spinSpeedY: 55,
      spinSpeedZ: 30,
      hideTablet: false,
      hideMobile: true,
      frontLogo: (
        <div className="px-2 py-1 rounded bg-[#f7df1e] text-[#1a1a1a] font-black text-[10px] font-mono leading-none flex flex-col items-center shadow-xs border border-amber-400">
          <span>JS</span>
          <span className="text-[8px] font-bold">Hint</span>
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#4b32c3] text-white flex items-center justify-center font-black text-[10px] font-mono shadow-xs">
          ESL
        </div>
      )
    },
    {
      id: 'cube-markdown',
      theme: 'cube-theme-codepen',
      size: 54,
      spinSpeedX: 40,
      spinSpeedY: -60,
      spinSpeedZ: -35,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="w-8 h-7 border-2 border-slate-800 rounded bg-white text-slate-900 font-black text-[11px] flex items-center justify-center font-mono shadow-xs">
          M↓
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center font-mono">
          DOCS
        </div>
      )
    },
    {
      id: 'cube-vue',
      theme: 'cube-theme-codepen',
      size: 50,
      spinSpeedX: -45,
      spinSpeedY: 70,
      spinSpeedZ: 25,
      hideTablet: true,
      hideMobile: true,
      frontLogo: (
        <svg viewBox="0 0 128 128" className="w-7 h-7">
          <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z" />
          <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.5L64,76.8l38.5-66.8H78.8z" />
        </svg>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#00dc82] text-slate-900 font-black text-[10px] flex items-center justify-center font-mono">
          Nuxt
        </div>
      )
    },
    {
      id: 'cube-ts',
      theme: 'cube-theme-codepen',
      size: 60,
      spinSpeedX: 55,
      spinSpeedY: -50,
      spinSpeedZ: 30,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="w-9 h-9 rounded bg-[#3178c6] text-white font-black text-sm flex items-center justify-center font-mono shadow-md border border-blue-400">
          TS
        </div>
      ),
      backLogo: (
        <div className="w-9 h-9 rounded bg-[#f7df1e] text-slate-950 font-black text-sm flex items-center justify-center font-mono shadow-md border border-amber-400">
          JS
        </div>
      )
    },
    {
      id: 'cube-less',
      theme: 'cube-theme-codepen',
      size: 52,
      spinSpeedX: -60,
      spinSpeedY: 45,
      spinSpeedZ: -35,
      hideTablet: false,
      hideMobile: true,
      frontLogo: (
        <div className="px-2 py-1 rounded bg-[#1d365d] text-white font-black text-[10px] font-mono shadow-xs border border-blue-900">
          {'{less}'}
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#264de4] text-white font-black text-xs flex items-center justify-center font-mono">
          CSS3
        </div>
      )
    },
    {
      id: 'cube-sass',
      theme: 'cube-theme-codepen',
      size: 56,
      spinSpeedX: 50,
      spinSpeedY: 55,
      spinSpeedZ: -40,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="w-8 h-8 rounded bg-[#cf649a] text-white font-black text-[10px] flex items-center justify-center font-mono shadow-md border border-pink-300">
          Sass
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#f06529] text-white font-black text-[10px] flex items-center justify-center font-mono">
          HTML
        </div>
      )
    },
    {
      id: 'cube-tailwind',
      theme: 'cube-theme-cosmic',
      size: 58,
      spinSpeedX: -40,
      spinSpeedY: -65,
      spinSpeedZ: 25,
      hideTablet: true,
      hideMobile: true,
      frontLogo: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#38bdf8]">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#38bdf8] text-slate-950 font-black text-xs flex items-center justify-center font-mono">
          TW4
        </div>
      )
    },
    {
      id: 'cube-next',
      theme: 'cube-theme-cosmic',
      size: 54,
      spinSpeedX: 45,
      spinSpeedY: 55,
      spinSpeedZ: -30,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-sm font-sans border border-white/40 shadow-inner">
          ▲
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#339933] text-white flex items-center justify-center font-black text-[10px] font-mono">
          node
        </div>
      )
    },
    {
      id: 'cube-python',
      theme: 'cube-theme-codepen',
      size: 52,
      spinSpeedX: -40,
      spinSpeedY: -50,
      spinSpeedZ: 35,
      hideTablet: false,
      hideMobile: true,
      frontLogo: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#3776ab] to-[#ffd438] text-slate-950 font-black text-xs flex items-center justify-center font-mono shadow-md border border-amber-300">
          py
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#092e20] text-emerald-400 font-bold text-[9px] flex items-center justify-center font-mono">
          dj
        </div>
      )
    },
    {
      id: 'cube-gsap',
      theme: 'cube-theme-cosmic',
      size: 54,
      spinSpeedX: 60,
      spinSpeedY: -65,
      spinSpeedZ: -30,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="w-8 h-8 rounded bg-[#0ae448] text-black font-black text-[10px] flex items-center justify-center font-mono shadow-md border border-emerald-300">
          GSAP
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#e10098] text-white font-bold text-xs flex items-center justify-center font-mono">
          GQL
        </div>
      )
    },
    {
      id: 'cube-figma',
      theme: 'cube-theme-codepen',
      size: 56,
      spinSpeedX: -45,
      spinSpeedY: 55,
      spinSpeedZ: 30,
      hideTablet: false,
      hideMobile: false,
      frontLogo: (
        <div className="flex flex-col gap-0.5 items-center justify-center">
          <div className="flex gap-0.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f24e1e]"/><span className="w-2.5 h-2.5 rounded-full bg-[#ff7262]"/></div>
          <div className="flex gap-0.5"><span className="w-2.5 h-2.5 rounded-full bg-[#a259ff]"/><span className="w-2.5 h-2.5 rounded-full bg-[#1abcfe]"/></div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#0acf83]"/>
        </div>
      ),
      backLogo: (
        <div className="w-8 h-8 rounded bg-[#2496ed] text-white font-black text-[9px] flex items-center justify-center font-mono">
          DOC
        </div>
      )
    },
    {
      id: 'cube-node',
      theme: 'cube-theme-cosmic',
      size: 50,
      spinSpeedX: 40,
      spinSpeedY: -45,
      spinSpeedZ: 25,
      hideTablet: true,
      hideMobile: true,
      frontLogo: (
        <div className="w-7 h-7 rounded bg-[#339933] text-white flex items-center justify-center font-black text-[9px] font-mono shadow-xs">
          node
        </div>
      ),
      backLogo: (
        <div className="w-7 h-7 rounded bg-[#0284c7] text-white font-black text-[9px] font-mono">
          npm
        </div>
      )
    },
    {
      id: 'cube-babel',
      theme: 'cube-theme-codepen',
      size: 50,
      spinSpeedX: -35,
      spinSpeedY: 55,
      spinSpeedZ: -25,
      hideTablet: true,
      hideMobile: true,
      frontLogo: (
        <div className="w-7 h-7 rounded bg-[#f5da55] text-slate-900 flex items-center justify-center font-black text-[9px] font-mono shadow-xs border border-amber-300">
          babel
        </div>
      ),
      backLogo: (
        <div className="w-7 h-7 rounded bg-[#61dafb] text-slate-900 font-bold text-[8px] flex items-center justify-center font-mono">
          JSX
        </div>
      )
    }
  ], []);

  // Détection responsive du rayon orbital
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ rx: Math.min(w * 0.45, 170), ry: 160, rz: 110 });
      } else if (w < 1024) {
        setDimensions({ rx: Math.min(w * 0.44, 380), ry: 220, rz: 150 });
      } else {
        setDimensions({ rx: Math.min(w * 0.44, 540), ry: 260, rz: 180 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
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

  // Animation orbitale 3D continue + Réactivité forte et visible au défilement
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let lastScrollY = targetScrollY;
    let isRunning = true;
    let lastTime = performance.now();
    let orbitAngle = 0;
    let totalTime = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const totalCubes = cubes.length;

    const updateOrbit = (now) => {
      if (!isRunning) return;

      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalTime += deltaSec;

      // Calcul de la vitesse de scroll instantanée pour faire tourner les cubes
      const scrollDelta = targetScrollY - lastScrollY;
      lastScrollY = targetScrollY;

      // Lissage du défilement
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;

      // Vitesse orbitale visible et continue (~0.5 rad/sec = un tour complet en ~12s)
      // + Accélération dynamique pendant le scroll dans les deux sens
      const baseOrbitSpeed = 0.52; // radians / sec
      orbitAngle += (baseOrbitSpeed * deltaSec) + (scrollDelta * 0.0035);

      cubes.forEach((cube, index) => {
        const el = cubeRefs.current[index];
        if (!el) return;

        // Position angulaire sur l'anneau orbital
        const cubeAngle = orbitAngle + (index * (Math.PI * 2 / totalCubes));

        // Coordonnées 3D sur l'ellipse
        const x = Math.cos(cubeAngle) * dimensions.rx;
        const y = Math.sin(cubeAngle) * dimensions.ry;
        const z = Math.sin(cubeAngle) * dimensions.rz;

        // Échelle, opacité et ordre Z en fonction de la profondeur 3D
        const normZ = (z + dimensions.rz) / (2 * dimensions.rz); // 0 (arrière) à 1 (premier plan)
        const scale = 0.76 + (normZ * 0.38);
        const opacity = 0.65 + (normZ * 0.35);
        const zIndex = Math.round(normZ * 60);

        // Rotation 3D active (tumbling) : le cube tourne visiblement sur lui-même
        const rotX = (orbitAngle * 140 + cube.spinSpeedX * totalTime * 1.8) % 360;
        const rotY = (orbitAngle * 200 + cube.spinSpeedY * totalTime * 2.2) % 360;
        const rotZ = (cube.spinSpeedZ * totalTime * 1.4) % 360;

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
      });

      animFrameRef.current = requestAnimationFrame(updateOrbit);
    };

    animFrameRef.current = requestAnimationFrame(updateOrbit);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', onScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cubes, dimensions, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="about-cubes-orbit-container" aria-hidden="true">
      {/* Voile d'atmosphère dégradé */}
      <div className="about-cubes-atmosphere" />

      {/* Scène 3D inclinée au centre de l'orbite */}
      <div className="about-cubes-stage">
        
        {/* Anneau elliptique en pointillés (guide orbital CodePen) */}
        <svg
          className="orbit-svg-trail"
          width={dimensions.rx * 2 + 100}
          height={dimensions.ry * 2 + 80}
          viewBox={`0 0 ${dimensions.rx * 2 + 100} ${dimensions.ry * 2 + 80}`}
        >
          <ellipse
            cx={(dimensions.rx * 2 + 100) / 2}
            cy={(dimensions.ry * 2 + 80) / 2}
            rx={dimensions.rx}
            ry={dimensions.ry}
            fill="none"
            stroke="rgba(168, 85, 247, 0.32)"
            strokeWidth="1.8"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Cubes 3D disposés en orbite circulaire continue */}
        {cubes.map((cube, index) => {
          const half = cube.size / 2;
          return (
            <div
              key={cube.id}
              ref={(el) => (cubeRefs.current[index] = el)}
              className={`orbit-cube-anchor ${cube.theme}`}
              data-hide-tablet={cube.hideTablet ? 'true' : 'false'}
              data-hide-mobile={cube.hideMobile ? 'true' : 'false'}
              style={{
                width: `${cube.size}px`,
                height: `${cube.size}px`,
                '--cube-w': `${cube.size}px`,
              }}
            >
              <div 
                className="orbit-cube-box"
                style={{ width: `${cube.size}px`, height: `${cube.size}px` }}
              >
                {/* Face Avant (Logo Tech Principal : React, TS, JS Hint, Markdown, Vue, Sass, etc.) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-front"
                  style={{ transform: `translateZ(${half}px)` }}
                >
                  {cube.frontLogo}
                </div>

                {/* Face Arrière (Logo Tech Secondaire : Vite, JS, Nuxt, ESLint, etc.) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-back"
                  style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
                >
                  {cube.backLogo}
                </div>

                {/* Face Supérieure (Reflet isométrique zénithal clair) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-top"
                  style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
                />

                {/* Face Droite (Ombre isométrique latérale) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-right"
                  style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
                />

                {/* Face Gauche (Ombre douce) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-left"
                  style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
                />

                {/* Face Inférieure (Ombre portée) */}
                <div 
                  className="orbit-cube-face orbit-cube-face-bottom"
                  style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
