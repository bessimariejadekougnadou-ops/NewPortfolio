import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, Sparkles, ChevronDown, ChevronUp, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import RetroStar from './RetroStar';
import SpotlightCanvas from './SpotlightCanvas';
import usePortfolioHeadingMotion from './usePortfolioHeadingMotion';
import PosterCosmicIllustration from './PosterCosmicIllustration';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    index: '01',
    period: 'En cours',
    role: 'Développeuse Full Stack',
    company: 'Valken’s Consulting',
    badge: 'Poste actuel',
    tag: 'Fintech & Solutions Entreprise',
    description: 'Conception et développement d’applications web et mobiles full stack. Architecture logicielle moderne, sécurisation des flux et intégration d’APIs complexes.',
    techs: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    index: '02',
    period: 'Nov. 2025 — Juil. 2026',
    role: 'Développement Web & Automatisation',
    company: 'Myriade Groupe',
    location: 'Lomé, Togo',
    badge: 'Expérience 02',
    tag: 'Web & Gestion Locative',
    description: "Participation au développement et à la maintenance d'applications web et mobiles. Conception et intégration d'interfaces utilisateur, développement de fonctionnalités front-end et back-end, manipulation de bases de données et réalisation de tests. Acquisition de nouvelles compétences techniques, amélioration des pratiques de développement et apprentissage du travail en équipe dans un environnement professionnel.",
    techs: ['React', 'Django', 'Python', 'Tailwind CSS', 'REST API'],
  },
  {
    index: '03',
    period: 'Oct. 2025',
    role: 'Développement et Maintenance Web',
    company: 'Grande Poste du Togo',
    location: 'Lomé, Togo',
    badge: 'Expérience 03',
    tag: 'Services Publics & Plateformes',
    description: 'Maintenance préventive et corrective d’applications web critiques. Optimisation des performances des outils internes et support technique avancé.',
    techs: ['JavaScript', 'HTML5/CSS3', 'PHP', 'MySQL', 'Git'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const teaserHeadingRef = useRef(null);
  const teaserLine1Ref = useRef(null);
  const teaserLine2Ref = useRef(null);
  const revealedHeadingRef = useRef(null);
  const revealedLine1Ref = useRef(null);
  const revealedLine2Ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  /* ── Interactive reveal transition ── */
  usePortfolioHeadingMotion(
    isRevealed ? revealedHeadingRef : teaserHeadingRef,
    isRevealed ? revealedLine1Ref : teaserLine1Ref,
    isRevealed ? revealedLine2Ref : teaserLine2Ref,
    true
  );

  const handleToggleReveal = () => {
    if (spotlightRef.current) {
      spotlightRef.current.pulse();
    }
    setIsRevealed((prev) => !prev);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate timeline cards whenever revealed
      if (isRevealed) {
        gsap.fromTo(
          '.experience-card-item',
          { y: 50, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            stagger: 0.14,
            clearProps: 'transform',
          }
        );

        gsap.to('.poster-cosmic-canvas', {
          scale: 0.95,
          opacity: 0.42,
          duration: 0.8,
          ease: 'power2.out',
        });
      } else {
        gsap.to('.poster-cosmic-canvas', {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRevealed]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`experience-spotlight-section ${isRevealed ? 'is-revealed' : 'is-teaser'}`}
      aria-label="Section Parcours Professionnel"
    >
      {/* ── 1. Theatrical WebGL Spotlights Canvas (Subtil pour valoriser l'illustration) ── */}
      <SpotlightCanvas
        ref={spotlightRef}
        targetSelector=".spotlight-target-head"
        groundColor="#210f44"
        keyColor="#fff7ed"
        gelColor="#c084fc"
        haze={0.16}
        intensity={0.24}
      />

      {/* ── 2. Exact Poster Cosmic Illustration ("Gradient Studies | 11") ── */}
      <PosterCosmicIllustration />

      {/* ═════════════════════════════════════════════════════════
          STATE 1: THEATRICAL SPOTLIGHT HERO TEASER (BEFORE CLICK)
          Matches exact look of "Opening night is 14 March."
          ═════════════════════════════════════════════════════════ */}
      {!isRevealed ? (
        <div className="experience-stage-teaser">
          <div className="stage-teaser-content">

            {/* Badge pill in beam */}
            <div className="stage-eyebrow-pill">
              <RetroStar size={14} className="text-purple-300" />
              <span>✦ Parcours Professionnel ✦</span>
              <RetroStar size={14} className="text-purple-300" />
            </div>

            {/* Giant Title catching the spotlight highlights */}
            <h2 ref={teaserHeadingRef} className="stage-giant-title portfolio-section-heading spotlight-target-head">
              <span ref={teaserLine1Ref} className="portfolio-section-heading-line portfolio-section-heading-line--main">Mon parcours</span><br />
              <span ref={teaserLine2Ref} className="portfolio-section-heading-line portfolio-section-heading-line--accent">professionnel.</span>
            </h2>

            {/* Stage subtitle */}
            <p className="stage-lead-desc">
              Trois étapes déterminantes dans mon parcours de développeuse web & mobile full stack.
              De la conception à la mise en production.
            </p>

            {/* Click to Reveal Theatrical Button */}
            <div className="stage-action-wrap">
              <button
                type="button"
                onClick={handleToggleReveal}
                className="stage-reveal-btn"
                aria-label="Explorer mon parcours"
              >
                <span>Découvrir mon parcours</span>
                <ArrowUpRight size={18} className="stage-btn-arrow" />
              </button>
            </div>

            <p className="stage-pointer-hint">
              Survolez pour diriger les projecteurs · Cliquez pour ouvrir le parcours
            </p>

          </div>
        </div>
      ) : (

        /* ═════════════════════════════════════════════════════════
           STATE 2: PARCOURS TIMELINE IN SPOTLIGHT WITH TECH LOGOS BEHIND
           ═════════════════════════════════════════════════════════ */
        <div className="experience-revealed-view">

          {/* Top Bar with Return/Collapse Button */}
          <header className="experience-revealed-header">
            <div className="section-eyebrow">
              <RetroStar size={16} />
              <span>Parcours &amp; Expériences</span>
              <RetroStar size={16} />
            </div>

            <h2 ref={revealedHeadingRef} className="revealed-section-title portfolio-section-heading spotlight-target-head">
              <span ref={revealedLine1Ref} className="portfolio-section-heading-line portfolio-section-heading-line--main">Mes</span>{' '}
              <span ref={revealedLine2Ref} className="portfolio-section-heading-line portfolio-section-heading-line--accent">expériences</span>
            </h2>

            <p className="revealed-subtitle">
              Trois étapes clés au cœur de projets web, mobile et automatisation logicielle.
            </p>

            <button
              type="button"
              onClick={handleToggleReveal}
              className="stage-collapse-btn"
              title="Revenir à la scène"
            >
              <span>✦ Masquer la scène</span>
              <ChevronUp size={16} />
            </button>
          </header>

          {/* The 3 Professional Experiences Cards */}
          <div className="experience-cards-grid">
            {experiences.map((exp) => (
              <article key={exp.company} className="experience-card-item">
                <div className="exp-card-glow" />

                {/* Card Header with Index & Period */}
                <div className="exp-card-header">
                  <div className="exp-card-number">#{exp.index}</div>
                  <div className="exp-card-period-wrap">
                    <span className="exp-card-period">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span className={`exp-card-badge ${exp.index === '01' ? 'badge-current' : ''}`}>
                      {exp.badge}
                    </span>
                  </div>
                </div>

                {/* Company & Role */}
                <h3 className="exp-card-company">{exp.company}</h3>
                <div className="exp-card-role">
                  <Briefcase size={15} />
                  <span>{exp.role}</span>
                </div>

                {exp.location && (
                  <div className="exp-card-location">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                )}

                {/* Tag & Description */}
                <p className="exp-card-desc">{exp.description}</p>

                {/* Card Tech Chips */}
                <div className="exp-card-techs">
                  {exp.techs.map((t) => (
                    <span key={t} className="exp-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Interactive footer note */}
          <footer className="experience-revealed-footer">
            <p className="exp-footer-hint">
              Les projecteurs continuent de suivre votre pointeur · Cliquez et maintenez pour focaliser
            </p>
          </footer>

        </div>
      )}
    </section>
  );
}