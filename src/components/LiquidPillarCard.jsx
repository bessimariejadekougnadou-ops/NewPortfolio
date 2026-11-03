import React, { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import './LiquidPillarCard.css';

/**
 * LiquidPillarCard
 * Implémente l'animation GSAP de morphing SVG par vague liquide fournie par l'utilisateur :
 * - Transition fluide organique d'onde liquide (M 0 100 V 50 Q 50 0 100 50 V 100 z)
 * - Face Avant : Titre, étiquette, description et icône
 * - Face Arrière : Zoom approfondi sur les compétences clés, livrables et méthodes
 */
export default function LiquidPillarCard({ pillar, index }) {
  const cardRef = useRef(null);
  const overlayPathRef = useRef(null);

  // Éléments de la Face Avant (hide.main, hide.content, openMenuCtrl)
  const frontRef = useRef(null);
  const frontHeaderRef = useRef(null);
  const frontTitleRef = useRef(null);
  const frontDescRef = useRef(null);
  const openBtnRef = useRef(null);

  // Éléments de la Face Arrière (hide.leave, hide.clock, closeMenuCtrl)
  const backRef = useRef(null);
  const backHeaderRef = useRef(null);
  const backTitleRef = useRef(null);
  const backKeywordsRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [isOpened, setIsOpened] = useState(false);
  const isAnimatingRef = useRef(false);

  const Icon = pillar.icon;

  // OPEN : Vague liquide montante et révélation de la face arrière
  const handleOpen = useCallback((e) => {
    if (e) e.stopPropagation();
    if (isAnimatingRef.current || isOpened) return;
    isAnimatingRef.current = true;

    const overlayPath = overlayPathRef.current;
    const frontEl = frontRef.current;
    const backEl = backRef.current;

    const frontHideTargets = [
      frontHeaderRef.current,
      frontTitleRef.current,
      frontDescRef.current,
      openBtnRef.current
    ].filter(Boolean);

    const backShowTargets = [
      backHeaderRef.current,
      backTitleRef.current,
      backKeywordsRef.current,
      closeBtnRef.current
    ].filter(Boolean);

    gsap
      .timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsOpened(true);
        },
      })

      // 1. Début au bas de la carte (chemin transparent)
      .set(overlayPath, {
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      })

      // 2. Vague courbe montante
      .to(
        overlayPath,
        {
          duration: 0.45,
          ease: "power4.in",
          attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        },
        0
      )

      // 3. Couverture totale
      .to(overlayPath, {
        duration: 0.28,
        ease: "power2",
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        onComplete: () => {
          if (frontEl) frontEl.style.display = "none";
          if (backEl) backEl.style.display = "flex";
        },
      })

      // 4. Évacuation ascendante des éléments avant
      .to(
        frontHideTargets,
        {
          duration: 0.4,
          ease: "power3.in",
          y: -70,
          opacity: 0,
          stagger: 0.04,
        },
        0.12
      )

      // 5. Inversion du tracé au sommet
      .set(overlayPath, {
        attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      })

      // 6. Retrait liquide vers le haut
      .to(overlayPath, {
        duration: 0.28,
        ease: "power2.in",
        attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
      })

      // 7. Révélation complète
      .to(overlayPath, {
        duration: 0.45,
        ease: "power4",
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      })

      // 8. Arrivée fluide des détails arrières
      .to(
        backShowTargets,
        {
          duration: 0.85,
          ease: "power4.out",
          startAt: { y: 60, opacity: 0 },
          y: 0,
          opacity: 1,
          stagger: 0.05,
        },
        ">-0.75"
      );
  }, [isOpened]);

  // CLOSE : Vague liquide descendante et retour à la face avant
  const handleClose = useCallback((e) => {
    if (e) e.stopPropagation();
    if (isAnimatingRef.current || !isOpened) return;
    isAnimatingRef.current = true;

    const overlayPath = overlayPathRef.current;
    const frontEl = frontRef.current;
    const backEl = backRef.current;

    const frontShowTargets = [
      frontHeaderRef.current,
      frontTitleRef.current,
      frontDescRef.current,
      openBtnRef.current
    ].filter(Boolean);

    const backHideTargets = [
      backHeaderRef.current,
      backTitleRef.current,
      backKeywordsRef.current,
      closeBtnRef.current
    ].filter(Boolean);

    gsap
      .timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsOpened(false);
        },
      })

      // 1. Début au sommet (chemin plat)
      .set(overlayPath, {
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      })

      // 2. Vague courbe descendante
      .to(
        overlayPath,
        {
          duration: 0.45,
          ease: "power4.in",
          attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
        },
        0
      )

      // 3. Couverture totale
      .to(overlayPath, {
        duration: 0.28,
        ease: "power2",
        attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
        onComplete: () => {
          if (backEl) backEl.style.display = "none";
          if (frontEl) frontEl.style.display = "flex";
        },
      })

      // 4. Inversion du tracé au bas
      .set(overlayPath, {
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      })

      // 5. Retrait liquide vers le bas
      .to(overlayPath, {
        duration: 0.28,
        ease: "power2.in",
        attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
      })

      // 6. Disparition complète du masque
      .to(overlayPath, {
        duration: 0.45,
        ease: "power4",
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      })

      // 7. Retour gracieux des éléments avant
      .to(
        frontShowTargets,
        {
          duration: 0.85,
          ease: "power4.out",
          y: 0,
          opacity: 1,
          stagger: -0.04,
        },
        ">-0.75"
      )

      // 8. Évacuation des éléments arrières
      .to(
        backHideTargets,
        {
          duration: 0.4,
          ease: "power2.in",
          y: 60,
          opacity: 0,
          stagger: -0.04,
        },
        0.12
      );
  }, [isOpened]);

  const handleCardClick = () => {
    if (isOpened) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`liquid-pillar-card ${isOpened ? 'is-opened' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-expanded={isOpened}
    >
      {/* ===================================================================
          1. OVERLAY SVG DE MORPHING LIQUIDE
          =================================================================== */}
      <svg 
        className="liquid-overlay-svg" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        aria-hidden="true"
      >
        <path
          ref={overlayPathRef}
          className="liquid-overlay-path"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>

      {/* ===================================================================
          2. FACE AVANT (Style Éditorial Verre Dépoli Clair)
          =================================================================== */}
      <div ref={frontRef} className="pillar-face-front">
        {/* En-tête : Icône, Numéro, Tag et Badge */}
        <div ref={frontHeaderRef} className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon size={18} className="text-purple-300" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-purple-950 uppercase tracking-wider block">
                {pillar.number} • {pillar.tag}
              </span>
              <span className="inline-block text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                {pillar.badge}
              </span>
            </div>
          </div>

          {/* Bouton d'action "Explorer" */}
          <button
            ref={openBtnRef}
            type="button"
            className="pillar-action-btn pillar-action-btn-front"
            onClick={handleOpen}
            aria-label={`Explorer les détails de ${pillar.title}`}
          >
            <span>Détails</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Titre du Pilier */}
        <h4 
          ref={frontTitleRef}
          className="font-display font-bold text-slate-950 text-base sm:text-lg leading-snug"
        >
          {pillar.title}
        </h4>

        {/* Récit et description */}
        <p 
          ref={frontDescRef}
          className="text-slate-700 text-xs sm:text-[13px] leading-relaxed"
        >
          {pillar.description}
        </p>
      </div>

      {/* ===================================================================
          3. FACE ARRIÈRE (Révélation Violet Cosmique #130924)
          =================================================================== */}
      <div ref={backRef} className="pillar-face-back">
        {/* En-tête face arrière */}
        <div ref={backHeaderRef} className="flex items-center justify-between gap-3 border-b border-purple-500/20 pb-2">
          <div className="inline-flex items-center gap-2">
            <Sparkles size={14} className="text-purple-300" />
            <span className="text-xs font-extrabold text-purple-200 uppercase tracking-wider">
              {pillar.number} • Savoir-faire approfondi
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="pillar-action-btn pillar-action-btn-back"
            onClick={handleClose}
            aria-label={`Fermer les détails de ${pillar.title}`}
          >
            <span>Fermer</span>
            <X size={13} />
          </button>
        </div>

        {/* Titre & focus technique */}
        <div ref={backTitleRef} className="my-0.5">
          <h5 className="font-display font-bold text-white text-sm sm:text-base mb-1">
            {pillar.title}
          </h5>
          <p className="text-purple-200/80 text-[11px] sm:text-xs">
            Excellence méthodologique et application pratique au cœur de chaque réalisation :
          </p>
        </div>

        {/* Liste des 4 mots-clés sous forme de badges stylisés */}
        <div ref={backKeywordsRef} className="flex flex-wrap gap-1.5 pt-1">
          {pillar.keywords?.map((kw, i) => (
            <span key={i} className="pillar-keyword-pill">
              <CheckCircle2 size={12} className="text-purple-300 shrink-0" />
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
