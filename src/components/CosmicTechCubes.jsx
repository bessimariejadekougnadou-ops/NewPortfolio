import React, { useEffect, useRef, useState, useMemo } from 'react';
import './CosmicTechCubes.css';

/**
 * CosmicTechCubes
 * Reproduction exacte et fidèle des blocs 3D tournants de CodePen.io ("Build with Blocks, Not Barriers")
 * - Cubes 3D volumétriques avec 6 faces ombrées
 * - Logos de technologies sur les faces (React, TS, Tailwind, JS Hint, Markdown, Vue, Less, Sass, Next, Node, Python, Figma, GSAP, GraphQL, etc.)
 * - Rotation 3D continue et fluide à 360° sur les axes X, Y, Z (tumbling)
 * - Réaction et accélération naturelle au défilement (scroll parallax)
 * - Présent sur tout le site avec pointer-events-none (ne bloque aucun clic)
 */
export default function CosmicTechCubes() {
  const cubeRefs = useRef([]);
  const animFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Définition des cubes 3D avec logos CodePen authentiques
  const cubes = useMemo(() => [
    // 1. CUBE REACT 19 / VITE (Haut Gauche)
    {
      id: 'cube-react',
      theme: 'cube-theme-codepen',
      size: 58,
      left: '3%',
      top: '12%',
      baseRotX: 18,
      baseRotY: -25,
      baseRotZ: 10,
      spinSpeedX: 16,
      spinSpeedY: 28,
      spinSpeedZ: -12,
      scrollSpeedY: 0.22,
      scrollSpinX: 0.15,
      scrollSpinY: 0.25,
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

    // 2. CUBE JS HINT (Haut Gauche-Centre, exact comme CodePen)
    {
      id: 'cube-jshint',
      theme: 'cube-theme-codepen',
      size: 52,
      left: '12%',
      top: '6%',
      baseRotX: -22,
      baseRotY: 35,
      baseRotZ: -15,
      spinSpeedX: -18,
      spinSpeedY: 22,
      spinSpeedZ: 14,
      scrollSpeedY: 0.35,
      scrollSpinX: -0.2,
      scrollSpinY: 0.18,
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

    // 3. CUBE MARKDOWN [M↓] (Haut Centre-Gauche, exact comme CodePen)
    {
      id: 'cube-markdown',
      theme: 'cube-theme-codepen',
      size: 54,
      left: '22%',
      top: '15%',
      baseRotX: 25,
      baseRotY: -30,
      baseRotZ: 18,
      spinSpeedX: 20,
      spinSpeedY: -26,
      spinSpeedZ: -10,
      scrollSpeedY: 0.28,
      scrollSpinX: 0.22,
      scrollSpinY: -0.2,
      hideTablet: false,
      hideMobile: true,
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

    // 4. CUBE VUE (Haut Centre, exact comme CodePen)
    {
      id: 'cube-vue',
      theme: 'cube-theme-codepen',
      size: 50,
      left: '32%',
      top: '5%',
      baseRotX: -15,
      baseRotY: 40,
      baseRotZ: -12,
      spinSpeedX: -14,
      spinSpeedY: 30,
      spinSpeedZ: 16,
      scrollSpeedY: 0.42,
      scrollSpinX: -0.18,
      scrollSpinY: 0.26,
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

    // 5. CUBE TYPESCRIPT (Haut Centre-Droit, exact comme CodePen)
    {
      id: 'cube-ts',
      theme: 'cube-theme-codepen',
      size: 60,
      left: '66%',
      top: '8%',
      baseRotX: 20,
      baseRotY: -35,
      baseRotZ: 15,
      spinSpeedX: 18,
      spinSpeedY: -24,
      spinSpeedZ: 12,
      scrollSpeedY: 0.3,
      scrollSpinX: 0.16,
      scrollSpinY: -0.22,
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

    // 6. CUBE LESS (Haut Droit, exact comme CodePen)
    {
      id: 'cube-less',
      theme: 'cube-theme-codepen',
      size: 52,
      left: '76%',
      top: '16%',
      baseRotX: -24,
      baseRotY: 30,
      baseRotZ: -16,
      spinSpeedX: -20,
      spinSpeedY: 26,
      spinSpeedZ: -14,
      scrollSpeedY: 0.38,
      scrollSpinX: -0.15,
      scrollSpinY: 0.24,
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

    // 7. CUBE SASS (Haut Droit, exact comme CodePen)
    {
      id: 'cube-sass',
      theme: 'cube-theme-codepen',
      size: 56,
      left: '86%',
      top: '7%',
      baseRotX: 16,
      baseRotY: -38,
      baseRotZ: 20,
      spinSpeedX: 22,
      spinSpeedY: 20,
      spinSpeedZ: -18,
      scrollSpeedY: 0.26,
      scrollSpinX: 0.24,
      scrollSpinY: 0.16,
      hideTablet: false,
      hideMobile: true,
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

    // 8. CUBE TAILWIND CSS (Flanc Droit Médian)
    {
      id: 'cube-tailwind',
      theme: 'cube-theme-cosmic',
      size: 58,
      left: '93%',
      top: '25%',
      baseRotX: -18,
      baseRotY: 42,
      baseRotZ: -14,
      spinSpeedX: -16,
      spinSpeedY: -28,
      spinSpeedZ: 10,
      scrollSpeedY: 0.34,
      scrollSpinX: -0.18,
      scrollSpinY: -0.24,
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

    // 9. CUBE NEXT.JS (Flanc Gauche Médian)
    {
      id: 'cube-next',
      theme: 'cube-theme-cosmic',
      size: 54,
      left: '2%',
      top: '45%',
      baseRotX: 22,
      baseRotY: -32,
      baseRotZ: 14,
      spinSpeedX: 18,
      spinSpeedY: 26,
      spinSpeedZ: -12,
      scrollSpeedY: 0.28,
      scrollSpinX: 0.16,
      scrollSpinY: 0.22,
      hideTablet: false,
      hideMobile: true,
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

    // 10. CUBE PYTHON (Flanc Gauche Bas)
    {
      id: 'cube-python',
      theme: 'cube-theme-codepen',
      size: 52,
      left: '1%',
      top: '68%',
      baseRotX: -26,
      baseRotY: 34,
      baseRotZ: -18,
      spinSpeedX: -16,
      spinSpeedY: -22,
      spinSpeedZ: 14,
      scrollSpeedY: 0.36,
      scrollSpinX: -0.2,
      scrollSpinY: -0.18,
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

    // 11. CUBE GSAP (Flanc Droit Médian-Bas)
    {
      id: 'cube-gsap',
      theme: 'cube-theme-cosmic',
      size: 54,
      left: '94%',
      top: '52%',
      baseRotX: 20,
      baseRotY: -36,
      baseRotZ: 16,
      spinSpeedX: 24,
      spinSpeedY: -28,
      spinSpeedZ: -14,
      scrollSpeedY: 0.32,
      scrollSpinX: 0.2,
      scrollSpinY: -0.26,
      hideTablet: false,
      hideMobile: true,
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

    // 12. CUBE FIGMA (Flanc Droit Bas)
    {
      id: 'cube-figma',
      theme: 'cube-theme-codepen',
      size: 56,
      left: '88%',
      top: '72%',
      baseRotX: -22,
      baseRotY: 38,
      baseRotZ: -15,
      spinSpeedX: -18,
      spinSpeedY: 24,
      spinSpeedZ: 12,
      scrollSpeedY: 0.28,
      scrollSpinX: -0.16,
      scrollSpinY: 0.22,
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
    }
  ], []);

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

  // Boucle de rotation 3D continue + Parallaxe au scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let isRunning = true;
    let lastTime = performance.now();
    let totalIdleTime = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const update3DRotation = (now) => {
      if (!isRunning) return;

      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalIdleTime += deltaSec;

      // Lissage du défilement
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;

      // Mise à jour de chaque cube avec rotation 3D continue à 360°
      cubes.forEach((cube, index) => {
        const el = cubeRefs.current[index];
        if (!el) return;

        // Déplacement vertical avec décalage de scroll
        const translateY = -(currentScrollY * cube.scrollSpeedY);

        // Rotation 3D continue sur les axes X, Y, Z + accélération au scroll
        const rotX = (cube.baseRotX + totalIdleTime * cube.spinSpeedX + currentScrollY * cube.scrollSpinX) % 360;
        const rotY = (cube.baseRotY + totalIdleTime * cube.spinSpeedY + currentScrollY * cube.scrollSpinY) % 360;
        const rotZ = (cube.baseRotZ + totalIdleTime * cube.spinSpeedZ) % 360;

        // Flottement sinusoïdal organique
        const bobbingY = Math.sin(totalIdleTime * 1.2 + index) * 6;

        el.style.transform = `translate3d(0, ${translateY + bobbingY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
      });

      animFrameRef.current = requestAnimationFrame(update3DRotation);
    };

    animFrameRef.current = requestAnimationFrame(update3DRotation);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', onScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cubes, prefersReducedMotion]);

  return (
    <div className="cosmic-cubes-global-viewport" aria-hidden="true">
      <div className="cosmic-cubes-stage">
        {cubes.map((cube, index) => (
          <div
            key={cube.id}
            ref={(el) => (cubeRefs.current[index] = el)}
            className={`tech-cube-anchor ${cube.theme}`}
            data-hide-tablet={cube.hideTablet ? 'true' : 'false'}
            data-hide-mobile={cube.hideMobile ? 'true' : 'false'}
            style={{
              left: cube.left,
              top: cube.top,
              '--cube-w': `${cube.size}px`,
              transform: `translate3d(0, 0, 0) rotateX(${cube.baseRotX}deg) rotateY(${cube.baseRotY}deg) rotateZ(${cube.baseRotZ}deg)`,
            }}
          >
            <div className="tech-cube-box">
              {/* Face Avant (Logo Principal : React, TS, JS Hint, Markdown, Vue, Sass, etc.) */}
              <div className="tech-cube-face tech-cube-face-front">
                {cube.frontLogo}
              </div>

              {/* Face Arrière (Second Logo : Vite, JS, Nuxt, ESLint, etc.) */}
              <div className="tech-cube-face tech-cube-face-back">
                {cube.backLogo}
              </div>

              {/* Face Supérieure (Reflet isométrique zénithal clair) */}
              <div className="tech-cube-face tech-cube-face-top" />

              {/* Face Droite (Ombre isométrique latérale) */}
              <div className="tech-cube-face tech-cube-face-right" />

              {/* Face Gauche (Ombre douce) */}
              <div className="tech-cube-face tech-cube-face-left" />

              {/* Face Inférieure (Ombre portée) */}
              <div className="tech-cube-face tech-cube-face-bottom" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
