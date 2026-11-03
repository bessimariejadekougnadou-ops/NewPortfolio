import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  Quote,
  ArrowUpRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RetroStar from './RetroStar';
import PhoneCardScroll from './PhoneCardScroll';
import StaggeredPastelPillars from './StaggeredPastelPillars';
import AboutCosmicTechBackground from './AboutCosmicTechBackground';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About({ profileData }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!section || !header || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // 1. En-tête 3D Fold au scroll
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          end: 'top 42%',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      intro.fromTo(
        header,
        { rotateX: -38, y: 38, z: -55, scale: 0.94, opacity: 0.35 },
        { rotateX: 0, y: 0, z: 0, scale: 1, opacity: 1, duration: 1, ease: 'none' },
        0
      );

      if (line1 && line2) {
        intro.fromTo(
          line1,
          { rotateX: -26, transformOrigin: 'bottom center' },
          { rotateX: 0, duration: 1, ease: 'none' },
          0
        );
        intro.fromTo(
          line2,
          { rotateX: 26, transformOrigin: 'top center' },
          { rotateX: 0, duration: 1, ease: 'none' },
          0
        );
      }

      // 2. Animation d'éjection rapide au scroll dans les deux sens (haut/bas & bas/haut)
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 15%',
          toggleActions: 'restart reverse restart reverse',
          invalidateOnRefresh: true,
        },
      });

      // Le système orrery planétaire de fond s'éveille
      contentTl.fromTo(
        '.cosmic-about-bg-container',
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      // L'en-tête des piliers pastel jaillit de la gauche
      .fromTo(
        '.staggered-pillars-header',
        { x: -50, scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      // Les 3 cartes pastel jaillissent en cascade élastique
      .fromTo(
        '.pastel-quote-card',
        { x: -60, y: 25, scale: 0.88, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.48, ease: 'back.out(1.5)', stagger: 0.06 },
        '-=0.35'
      )
      // Le smartphone à droite jaillit de la droite avec dynamisme
      .fromTo(
        '.phone-scroll-wrapper',
        { x: 60, scale: 0.88, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' },
        '-=0.45'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 lg:py-28 overflow-hidden m-0"
      style={{
        background: 'linear-gradient(180deg, #210f44 0%, #2f135b 25%, #421a7c 50%, #2f135b 75%, #210f44 100%)',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        margin: 0
      }}
    >
      {/* 3D Orrery Planétaire Cosmique avec Anneaux & Logos des Technologies */}
      <AboutCosmicTechBackground />

      {/* Conteneur principal centré pour tout le contenu - Largeur élargie pour un grand espace central */}
      <div className="relative z-10 w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* =====================================================================
            EN-TÊTE DE SECTION : EFFET 3D FOLD ACCUEIL SUR SCROLL (GSAP SCROLLTRIGGER)
            ===================================================================== */}
        <div className="about-header-3d-stage mb-14 sm:mb-18">
          <div 
            ref={headerRef} 
            className="about-folding-header flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="about-fold-ambient-glow" />

            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <RetroStar size={14} className="text-purple-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
                Philosophie &amp; Savoir-faire
              </span>
              <RetroStar size={14} className="text-purple-300" />
            </div>

            <h2 className="font-display font-extrabold uppercase tracking-tight text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] mb-5">
              <span 
                ref={line1Ref} 
                className="about-fold-line block text-white/95"
              >
                Sensibilité créative,
              </span>
              <span 
                ref={line2Ref} 
                className="about-fold-line block text-purple-300 font-black italic tracking-wide"
              >
                rigueur d'ingénierie.
              </span>
            </h2>

            <p className="text-purple-100/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Du concept visuel à l’application en production, une approche haute fidélité axée sur la clarté, l'élégance et l'excellence technique.
            </p>
          </div>
        </div>

        {/* =====================================================================
            ZONE INTERACTIVE PRO : GSAP SCROLLTRIGGER SMARTPHONE + RÉCIT ÉDITORIAL
            ===================================================================== */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-12 mb-16 sm:mb-20">

          {/* Colonne Gauche : Cartes Pastel Étagées */}
          <div className="w-full lg:flex-1 lg:min-w-0 flex-shrink-0">
            <StaggeredPastelPillars />
          </div>

          {/* Colonne Droite : Smartphone Haute Précision */}
          <div className="w-full lg:flex-[0_0_520px] flex flex-col items-center lg:items-end justify-center flex-shrink-0">
            <PhoneCardScroll profileData={profileData} />
          </div>
        </div>

      </div>

    </section>
  );
}
