import React, { useEffect, useRef, useState, useMemo } from 'react';
import './FloatingProjectCards.css';
import { 
  Code2, 
  Sparkles, 
  TrendingUp, 
  Disc, 
  Wifi 
} from 'lucide-react';

/**
 * FloatingProjectCards
 * Couche de cartes flottantes et miniatures de projets (CodePen Pens)
 * situées derrière le contenu du Hero avec parallaxe différentielle au scroll.
 */
export default function FloatingProjectCards() {
  const cardRefs = useRef([]);
  const animFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Cartes de projet & mini interfaces
  const cards = useMemo(() => [
    // Carte 1 : Mini éditeur React Hook (haut gauche)
    {
      id: 'react-hook',
      depth: 'front',
      speed: 0.65,
      rotSpeed: 0.6,
      baseRotate: -4,
      left: '1%',
      top: '24%',
      width: '200px',
      floatClass: 'anim-float-a',
      hideTablet: false,
      hideMobile: true,
      content: (
        <div className="pen-card-glass pen-card-glow rounded-xl overflow-hidden text-left shadow-2xl">
          <div className="pen-card-header">
            <div className="pen-dots">
              <span className="pen-dot red" />
              <span className="pen-dot yellow" />
              <span className="pen-dot green" />
            </div>
            <span className="pen-tab-title">useCosmicMotion.ts</span>
            <Code2 size={12} className="text-purple-300/80" />
          </div>
          <div className="pen-code-body">
            <div><span className="text-pink-400">const</span> <span className="text-purple-200">[orbit, setG]</span> = <span className="text-cyan-300">useState</span>(1);</div>
            <div className="text-purple-300/60 my-0.5">// 3D spatial velocity</div>
            <div><span className="text-pink-400">return</span> <span className="text-emerald-300">&lt;Orbit</span> <span className="text-amber-300">depth</span>=<span className="text-purple-200">"{'{orbit}'}"</span> <span className="text-emerald-300">/&gt;</span>;</div>
          </div>
        </div>
      )
    },

    // Carte 2 : Projet E-Commerce Luxe / Parfums (haut droit)
    {
      id: 'project-luxury-perfume',
      depth: 'front',
      speed: 0.78,
      rotSpeed: -0.5,
      baseRotate: 4,
      left: '81%',
      top: '30%',
      width: '195px',
      floatClass: 'anim-float-b',
      hideTablet: false,
      hideMobile: true,
      content: (
        <div className="pen-card-glass pen-card-glow rounded-xl overflow-hidden text-left shadow-2xl">
          <div className="project-mini-visual flex items-center justify-center p-2.5 relative">
            <div className="project-mini-overlay" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-purple-300/30 flex items-center justify-center shadow-lg">
                <Sparkles size={14} className="text-purple-200" />
              </div>
              <span className="text-[10px] font-bold text-white tracking-widest uppercase mt-1">AURA COSMOS</span>
              <span className="text-[8px] text-purple-200/70">Maison Haute Parfumerie</span>
            </div>
          </div>
          <div className="p-2 bg-purple-950/40 flex items-center justify-between border-t border-purple-400/20">
            <div>
              <span className="text-[8px] text-purple-300/70 block uppercase font-medium">Boutique Web</span>
              <span className="text-xs font-black text-white">160 €</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-purple-600/60 text-purple-100 border border-purple-400/30">
              Live Demo
            </span>
          </div>
        </div>
      )
    },

    // Carte 3 : Dashboard Web Performance (+48.6%)
    {
      id: 'perf-metric',
      depth: 'mid',
      speed: 0.48,
      rotSpeed: 0.4,
      baseRotate: -3,
      left: '84%',
      top: '54%',
      width: '185px',
      floatClass: 'anim-float-d',
      hideTablet: false,
      hideMobile: true,
      content: (
        <div className="pen-card-glass rounded-xl p-2.5 text-left shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold text-purple-200/80 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp size={11} className="text-emerald-400" /> Vitesse & SEO
            </span>
            <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">
              100%
            </span>
          </div>
          <div className="text-sm font-extrabold text-white tracking-tight">
            +48.6%
            <span className="text-[8.5px] font-normal text-purple-200/70 ml-1">Fluidité</span>
          </div>
          <svg className="w-full h-5 mt-1 overflow-visible" viewBox="0 0 100 24">
            <defs>
              <linearGradient id="neonPurpleGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,20 Q18,18 30,12 T60,10 T85,4 L100,2 L100,24 L0,24 Z" 
              fill="url(#neonPurpleGrad2)" 
            />
            <path 
              d="M0,20 Q18,18 30,12 T60,10 T85,4 L100,2" 
              fill="none" 
              stroke="#c084fc" 
              strokeWidth="2" 
            />
          </svg>
        </div>
      )
    },

    // Carte 4 : Lecteur Audio Cosmique (bas gauche)
    {
      id: 'music-widget',
      depth: 'front',
      speed: 0.7,
      rotSpeed: -0.6,
      baseRotate: 3,
      left: '1%',
      top: '78%',
      width: '195px',
      floatClass: 'anim-float-a',
      hideTablet: false,
      hideMobile: false,
      content: (
        <div className="pen-card-glass pen-card-glow rounded-xl p-2.5 text-left shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-800 to-indigo-600 flex items-center justify-center shrink-0 border border-purple-400/40 shadow-inner">
              <Disc size={16} className="text-purple-200 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-white truncate">Cosmic Beats</div>
              <div className="text-[8px] text-purple-300/80 truncate">Marie Jade Soundscape</div>
            </div>
            <div className="flex items-end gap-0.5 h-3.5 px-0.5">
              <span className="mini-wave-bar" style={{ animationDelay: '0s' }} />
              <span className="mini-wave-bar" style={{ animationDelay: '0.2s' }} />
              <span className="mini-wave-bar" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-[65%] rounded-full" />
          </div>
        </div>
      )
    },

    // Carte 5 : Carte Bancaire Fintech Futuriste (bas droite)
    {
      id: 'fintech-card',
      depth: 'front',
      speed: 0.74,
      rotSpeed: 0.7,
      baseRotate: -5,
      left: '81%',
      top: '76%',
      width: '195px',
      floatClass: 'anim-float-c',
      hideTablet: false,
      hideMobile: true,
      content: (
        <div className="pen-card-glass pen-card-glow rounded-xl p-2.5 text-left relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-purple-200">MJ OBSIDIAN</span>
            <Wifi size={12} className="text-purple-300 rotate-90" />
          </div>
          <div className="w-4 h-3 rounded bg-amber-400/80 border border-amber-300/90 mb-1.5 shadow-xs" />
          <div className="text-[9.5px] font-mono text-white tracking-widest font-semibold">
            •••• 4291
          </div>
          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-purple-400/20">
            <span className="text-[8px] uppercase font-bold text-purple-200/80">BESSI M.J.</span>
            <div className="flex -space-x-1">
              <span className="w-3 h-3 rounded-full bg-purple-500/80" />
              <span className="w-3 h-3 rounded-full bg-indigo-400/80" />
            </div>
          </div>
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

  // Animation fluide de défilement (RAF + LERP)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let isRunning = true;

    const onScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const updateMotion = () => {
      if (!isRunning) return;

      currentScrollY += (targetScrollY - currentScrollY) * 0.12;

      cards.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const translateY = -currentScrollY * card.speed;
        const tiltX = Math.min(Math.max(currentScrollY * 0.015 * card.rotSpeed, -10), 10);
        const dynamicRotate = card.baseRotate + (currentScrollY * 0.005 * card.rotSpeed);

        el.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${dynamicRotate}deg) rotateX(${tiltX}deg)`;
      });

      animFrameRef.current = requestAnimationFrame(updateMotion);
    };

    animFrameRef.current = requestAnimationFrame(updateMotion);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', onScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cards, prefersReducedMotion]);

  return (
    <div className="floating-cards-viewport" aria-hidden="true">
      <div className="floating-cards-vignette" />
      <div className="floating-cards-stage">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`floating-card-item ${card.floatClass}`}
            data-depth={card.depth}
            data-hide-tablet={card.hideTablet ? 'true' : 'false'}
            data-hide-mobile={card.hideMobile ? 'true' : 'false'}
            style={{
              left: card.left,
              top: card.top,
              width: card.width,
              transform: `translate3d(0, 0, 0) rotate(${card.baseRotate}deg)`,
            }}
          >
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
