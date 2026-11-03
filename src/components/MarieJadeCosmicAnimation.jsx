import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function MarieJadeCosmicAnimation() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const starAnchorRef = useRef(null);
  const starSvgRef = useRef(null);
  const arcPathRef = useRef(null);
  const cometRef = useRef(null);
  const flashRef = useRef(null);
  const particlesGroupRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [coords, setCoords] = useState({ startX: 10, startY: 75, apexX: 160, apexY: -10, endX: 320, endY: 42 });

  // 24 burst particles
  const particleCount = 24;
  const particleColors = ['#ffffff', '#fdf4ff', '#e879f9', '#c084fc', '#a855f7', '#38bdf8', '#f43f5e'];

  // Recalculate curve points based on actual DOM dimensions of the text and star
  const updateCoordinates = () => {
    if (!containerRef.current || !starAnchorRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const sRect = starAnchorRef.current.getBoundingClientRect();

    const endX = Math.round(sRect.left - cRect.left + sRect.width / 2);
    const endY = Math.round(sRect.top - cRect.top + sRect.height / 2);
    const startX = 6;
    const startY = Math.round(cRect.height * 0.72);
    const apexX = Math.round(endX * 0.48);
    const apexY = -14;

    setCoords({ startX, startY, apexX, apexY, endX, endY });
  };

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);

    // Initial trigger after mount so the user sees the comet & starburst right away
    const initTimer = setTimeout(() => {
      triggerAnimation();
    }, 450);

    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(initTimer);
    };
  }, []);

  const triggerAnimation = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const path = arcPathRef.current;
    const comet = cometRef.current;
    const starSvg = starSvgRef.current;
    const flash = flashRef.current;
    const text = textRef.current;
    const particlesContainer = particlesGroupRef.current;

    if (!path || !comet) {
      isAnimatingRef.current = false;
      return;
    }

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;
    path.style.opacity = '1';

    const particles = particlesContainer ? Array.from(particlesContainer.children) : [];

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // 1. Text illumination surge
    if (text) {
      tl.to(text, {
        textShadow:
          '0 0 15px rgba(244, 114, 182, 0.95), 0 0 32px rgba(192, 132, 252, 0.9), 0 0 50px rgba(147, 51, 234, 0.85)',
        duration: 0.9,
        ease: 'sine.inOut'
      }, 0);
    }

    // 2. Comet flight along path & stroke drawing
    const progressObj = { progress: 0 };
    gsap.set(comet, { opacity: 1 });

    tl.to(progressObj, {
      progress: 1,
      duration: 1.15,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = progressObj.progress;
        const pt = path.getPointAtLength(p * totalLength);
        comet.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
        path.style.strokeDashoffset = `${totalLength * (1 - p)}`;

        // Comet flare scale pulse
        const core = comet.querySelector('.comet-pulse-core');
        if (core) {
          const s = 0.6 + Math.sin(p * Math.PI) * 0.9;
          core.setAttribute('transform', `scale(${s})`);
        }
      }
    }, 0);

    // 3. Impact instant
    tl.addLabel('impact', '+=0');

    // Comet head vanishes
    tl.to(comet, {
      opacity: 0,
      duration: 0.12,
      ease: 'power1.out'
    }, 'impact');

    // Arc trail evaporates into stardust
    tl.to(path, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out'
    }, 'impact+=0.08');

    // Central flash shockwave
    if (flash) {
      tl.fromTo(flash, {
        scale: 0,
        opacity: 1
      }, {
        scale: 3.2,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out'
      }, 'impact');
    }

    // Star pop with elastic spring physics (matching user's elastic.out)
    if (starSvg) {
      tl.fromTo(starSvg, {
        scale: 0.2,
        rotation: -180
      }, {
        scale: 1.6,
        rotation: 0,
        duration: 0.38,
        ease: 'back.out(2.2)'
      }, 'impact')
      .to(starSvg, {
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.35)'
      }, 'impact+=0.3');
    }

    // 4. Starburst Particle Explosion (matching physics2D popTl from user's snippet)
    particles.forEach((pEl, i) => {
      const angle = (i / particleCount) * (Math.PI * 2) + (Math.random() - 0.5) * 0.45;
      const speed = 35 + Math.random() * 85;
      const dur = 0.6 + Math.random() * 0.7;
      const targetX = Math.cos(angle) * speed;
      const targetY = Math.sin(angle) * speed + 24; // gravity pull

      tl.fromTo(pEl, {
        x: 0,
        y: 0,
        scale: 0.8 + Math.random() * 1.5,
        rotation: Math.random() * 360,
        opacity: 1
      }, {
        x: targetX,
        y: targetY,
        scale: 0,
        rotation: (Math.random() - 0.5) * 720,
        opacity: 0,
        duration: dur,
        ease: 'power2.out'
      }, 'impact');
    });

    // Revert text glow back to soft resting glow
    if (text) {
      tl.to(text, {
        textShadow:
          '0 0 10px rgba(216, 180, 254, 0.95), 0 0 20px rgba(168, 85, 247, 0.85), 0 0 35px rgba(147, 51, 234, 0.65)',
        duration: 1.1,
        ease: 'sine.out'
      }, 'impact+=0.35');
    }
  };

  const arcD = `M ${coords.startX} ${coords.startY} Q ${coords.apexX} ${coords.apexY} ${coords.endX} ${coords.endY}`;

  return (
    <div
      ref={containerRef}
      onClick={triggerAnimation}
      onMouseEnter={() => {
        if (!isAnimatingRef.current) triggerAnimation();
      }}
      className="relative inline-flex items-center gap-1.5 mb-1 pl-1 cursor-pointer group"
      title="Cliquez pour admirer l'animation comète & étincelles ✨"
    >
      {/* 1. Signature Cursive Néon Marie-Jade */}
      <span
        ref={textRef}
        style={{
          fontFamily: "'Great Vibes', 'Alex Brush', cursive",
          color: '#f8f0ff',
          textShadow:
            '0 0 10px rgba(216, 180, 254, 0.95), 0 0 20px rgba(168, 85, 247, 0.85), 0 0 35px rgba(147, 51, 234, 0.65)',
        }}
        className="text-[clamp(2.8rem,5.5vw,4.8rem)] font-normal tracking-wide leading-none -rotate-1 relative z-10 transition-transform duration-300 group-hover:scale-[1.01]"
      >
        Marie Jade
      </span>

      {/* 2. Étoile ✦ en bout de signature avec swoosh */}
      <div className="flex items-center relative -top-1 ml-1 z-10">
        <div 
          className="w-4 h-[1.5px] bg-gradient-to-r from-transparent to-purple-200 rounded-full drop-shadow-[0_0_6px_rgba(216,180,254,0.9)]"
          aria-hidden="true"
        />
        <div ref={starAnchorRef} className="relative w-6 h-6 flex items-center justify-center">
          <svg 
            ref={starSvgRef}
            className="w-5 h-5 sm:w-6 sm:h-6 text-purple-200 marie-jade-star-pulse origin-center transition-transform duration-300 group-hover:rotate-45" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 0 C12 6, 6 12, 0 12 C6 12, 12 18, 12 24 C12 18, 18 12, 24 12 C18 12, 12 6, 12 0 Z"/>
          </svg>
        </div>
      </div>

      {/* 3. Overlay SVG Haute Fidélité : Arc de Comète, Tête Lumineuse & Explosion d'Étoiles */}
      <svg
        className="absolute -top-12 -left-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none z-20 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Dégradé lumineux de la traînée de comète */}
          <linearGradient id="cometArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
            <stop offset="40%" stopColor="#c084fc" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#e879f9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Halo radiant de la tête de comète */}
          <radialGradient id="cometHeadHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#e879f9" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>

          {/* Flash d'impact */}
          <radialGradient id="impactShock" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#fdf4ff" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#c084fc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>

          {/* Filtre de lueur intense */}
          <filter id="celestialGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Chemin de l'arc (.arcMask) */}
        <path
          ref={arcPathRef}
          d={arcD}
          fill="none"
          stroke="url(#cometArcGradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#celestialGlow)"
          style={{ opacity: 0 }}
        />

        {/* Tête de Comète animée */}
        <g ref={cometRef} style={{ opacity: 0 }}>
          <g className="comet-pulse-core origin-center">
            {/* Lueur externe */}
            <circle cx="0" cy="0" r="16" fill="url(#cometHeadHalo)" />
            {/* Noyau brillant blanc */}
            <circle cx="0" cy="0" r="4" fill="#ffffff" />
            {/* Aigrettes scintillantes */}
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          </g>
        </g>

        {/* Flash d'impact au point d'arrivée (coordonnées de l'étoile) */}
        <g transform={`translate(${coords.endX}, ${coords.endY})`}>
          <circle
            ref={flashRef}
            cx="0"
            cy="0"
            r="16"
            fill="url(#impactShock)"
            style={{ opacity: 0 }}
          />
        </g>

        {/* Nuée d'étincelles & étoiles en explosion physique (allStars / popTl) */}
        <g
          ref={particlesGroupRef}
          transform={`translate(${coords.endX}, ${coords.endY})`}
        >
          {Array.from({ length: particleCount }).map((_, i) => {
            const color = particleColors[i % particleColors.length];
            return (
              <g key={`burst-star-${i}`} style={{ opacity: 0 }}>
                {i % 3 === 0 ? (
                  // Étoile 4 branches
                  <path
                    d="M 0 -6 C 0 -1.5, 1.5 0, 6 0 C 1.5 0, 0 1.5, 0 6 C 0 1.5, -1.5 0, -6 0 C -1.5 0, 0 -1.5, 0 -6 Z"
                    fill={color}
                  />
                ) : i % 3 === 1 ? (
                  // Losange scintillant
                  <polygon
                    points="0,-4 3.5,0 0,4 -3.5,0"
                    fill={color}
                  />
                ) : (
                  // Orbe de lumière
                  <circle
                    cx="0"
                    cy="0"
                    r="2.2"
                    fill={color}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
