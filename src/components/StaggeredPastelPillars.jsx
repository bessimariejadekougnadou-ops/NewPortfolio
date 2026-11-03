import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import './StaggeredPastelPillars.css';

/**
 * StaggeredPastelPillars
 * 
 * Reproduction fidèle de la référence visuelle (Barkin' Baxter's Treat Truck) :
 * - 3 cartes pastel étagées en cascade (Cream, Mint, Blush) portant les 3 piliers
 * - Lueur diffuse d'ambiance qui suit le curseur en LERP continu (script fourni par l'utilisateur)
 * - Typographie éditoriale raffinée & bouton avec bordure en dégradé
 * - Micro-animations douces de flottaison
 */
export default function StaggeredPastelPillars() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!cursor || !container) return;

    const cursorP = { x: 0, y: 0 };
    const pageP = { x: 0, y: 0 };
    let isInside = false;
    let animId;

    // Fonction LERP fournie par l'utilisateur
    const lerp = (start, end, amount = 0.05) => {
      return (1 - amount) * start + amount * end;
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursor.style.opacity = '1';
      pageP.x = e.clientX - rect.left;
      pageP.y = e.clientY - rect.top;
      isInside = true;
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      isInside = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Boucle d'animation LERP fournie par l'utilisateur
    function loop() {
      cursorP.x = lerp(cursorP.x, pageP.x);
      cursorP.y = lerp(cursorP.y, pageP.y);
      cursor.style.transform = `translateX(calc(${cursorP.x}px - 50%)) translateY(calc(${cursorP.y}px - 50%))`;
      animId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      if (window.history && window.history.pushState) window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <div ref={containerRef} className="staggered-pillars-wrapper">

      {/* 1. Curseur d'ambiance lumineuse (LERP loop fourni) */}
      <div
        ref={cursorRef}
        className="cursor ambient-glow-cursor"
        aria-hidden="true"
      />

      {/* 2. En-tête éditorial style référence */}
      <div className="staggered-pillars-header">

        <h3 className="staggered-title-main">
          L'exigence au service du résultat.
        </h3>

        <p className="staggered-subtitle">
          Un travail soigné, de la conception UI/UX sur Figma jusqu'au déploiement full stack haute performance.
        </p>

        {/* Bouton "get in touch" avec fond #130924 et bordure dégradée néon */}
        <a
          href="#contact"
          onClick={scrollToContact}
          className="gradient-touch-btn"
        >
          <span>Discuter d'un projet</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* 3. Cascade des 3 cartes cosmiques étagées (#130924) */}
      <div className="staggered-cards-stage">

        {/* CARTE 1 (Violet Cosmique #130924) : 01 • Direction artistique & UI/UX */}
        <div className="pastel-quote-card card-cream">
          <h4 className="pastel-card-title">
            "Des interfaces raffinées qui allient harmonie et fluidité"
          </h4>
          <p className="pastel-card-desc">
            Élaboration d'architectures visuelles élégantes et intuitives. Travail typographique rigoureux, palettes harmonieuses et prototypes interactifs Figma pour une expérience utilisateur sans friction.
          </p>
          <div className="pastel-card-author">
            <span>✦ 01 • Direction artistique &amp; UI/UX</span>
          </div>
        </div>

        {/* CARTE 2 (Violet Cosmique #130924) : 02 • Ingénierie Web & Mobile */}
        <div className="pastel-quote-card card-mint">
          <h4 className="pastel-card-title">
            "Une ingénierie full stack performante, évolutive et durable"
          </h4>
          <p className="pastel-card-desc">
            Développement web et mobile alliant fonctionnalité technique et modernité. Structuration modulaire, code propre et intégration d'APIs pour des applications robustes et pérennes.
          </p>
          <div className="pastel-card-author">
            <span>✦ 02 • Ingénierie Web &amp; Mobile</span>
          </div>
        </div>

        {/* CARTE 3 (Violet Cosmique #130924) : 03 • Précision & Excellence Visuelle */}
        <div className="pastel-quote-card card-blush">
          <h4 className="pastel-card-title">
            "Le sens du détail pour une expérience numérique aboutie"
          </h4>
          <p className="pastel-card-desc">
            Optimisation minutieuse des composants, transitions et micro-animations. Recherche permanente d'un équilibre entre vivacité graphique et fluidité d'exécution pour marquer les esprits.
          </p>
          <div className="pastel-card-author">
            <span>✦ 03 • Précision &amp; Excellence Visuelle</span>
          </div>
        </div>

      </div>

    </div>
  );
}
