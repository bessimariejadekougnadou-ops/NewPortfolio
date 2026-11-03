import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Braces, CreditCard, Sparkles } from 'lucide-react';
import './SkillsUniverse.css';

gsap.registerPlugin(ScrollTrigger);

const devicon = (name) =>
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + name + '/' + name + '-original.svg';

const skillGroups = [
  {
    id: 'frontend',
    num: '01',
    title: 'FRONT-END\n& INTERFACES',
    description: 'Interfaces web et expérience utilisateur',
    skills: [
      { name: 'React.js',     icon: devicon('react') },
      { name: 'Next.js',      icon: devicon('nextjs') },
      { name: 'JavaScript',   icon: devicon('javascript') },
      { name: 'TypeScript',   icon: devicon('typescript') },
      { name: 'HTML5',        icon: devicon('html5') },
      { name: 'CSS3',         icon: devicon('css3') },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss') },
      { name: 'Vue.js',       icon: devicon('vuejs') },
    ],
  },
  {
    id: 'backend',
    num: '02',
    title: 'BACK-END\n& API',
    description: 'Services et échanges de données',
    skills: [
      { name: 'Node.js',    icon: devicon('nodejs') },
      { name: 'API REST',   symbol: <Braces size={30} strokeWidth={1.5} /> },
    ],
  },
  {
    id: 'mobile',
    num: '03',
    title: 'DÉVELOPPEMENT\nMOBILE',
    description: 'Des expériences conçues pour mobile',
    skills: [
      { name: 'Flutter',      icon: devicon('flutter') },
      { name: 'React Native', icon: devicon('react') },
    ],
  },
  {
    id: 'database',
    num: '04',
    title: 'BASES DE\nDONNÉES',
    description: 'Stockage et Organisation des données',
    skills: [
      { name: 'MySQL',      icon: devicon('mysql') },
      { name: 'PostgreSQL', icon: devicon('postgresql') },
    ],
    hasPlanet: true,
  },
  {
    id: 'tools',
    num: '05',
    title: 'OUTILS & WORKFLOW',
    description: 'Création, versionnement et animation',
    skills: [
      { name: 'Git',      icon: devicon('git') },
      { name: 'GitHub',   icon: devicon('github') },
      { name: 'VS Code',  icon: devicon('vscode') },
      { name: 'Figma',    icon: devicon('figma') },
      { name: 'Vite',     icon: devicon('vitejs') },
      { name: 'GSAP',     symbol: <Sparkles size={28} strokeWidth={1.5} />, gsap: true },
      { name: 'Three.js', symbol: <span className="su-monogram">3D</span> },
    ],
  },
];

function SkillIcon({ skill }) {
  return (
    <div className="su-icon-item">
      <div className={'su-icon-box' + (skill.gsap ? ' su-icon-box--gsap' : '')}>
        {skill.icon
          ? <img src={skill.icon} alt={skill.name} loading="lazy" />
          : skill.symbol}
      </div>
      <span className="su-icon-name">{skill.name}</span>
    </div>
  );
}

function FloatingGroup({ group }) {
  const lines = group.title.split('\n');
  return (
    <div className={'su-floating-group su-group--' + group.id}>
      {/* Category individual orbital glow ring */}
      <div className={'su-cat-orbit su-cat-orbit--' + group.id} aria-hidden="true">
        <span className="su-orbit-node su-orbit-node--1" />
        <span className="su-orbit-node su-orbit-node--2" />
      </div>

      <div className="su-group-heading">
        <span className="su-group-num">{group.num}</span>
        <div className="su-group-rule" />
      </div>

      <h3 className="su-group-title">
        {lines.map((l, i) => <span key={i}>{l}</span>)}
      </h3>

      <p className="su-group-desc">{group.description}</p>

      <div className={'su-icons-row su-icons-row--' + group.id}>
        {group.skills.map((s) => (
          <SkillIcon key={s.name} skill={s} />
        ))}
        {group.hasPlanet && (
          <div className="su-db-planet" title="Cosmic Storage" aria-hidden="true">
            <div className="su-db-planet-sphere" />
            <div className="su-db-planet-ring" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SkillsUniverse() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const isMobile = window.innerWidth < 860;

    const ctx = gsap.context(() => {
      // ── Initial State : Everything condensed in the central core ──
      gsap.set('.su-galaxy-container', { scale: 0.6, opacity: 0, rotate: -25 });
      gsap.set('.su-galaxy-core-burst', { scale: 0, opacity: 0 });
      gsap.set('.su-galaxy-shockwave', { scale: 0.2, opacity: 0 });
      gsap.set('.su-galaxy-halo', { scale: 0.4, opacity: 0 });

      // The 5 skill categories start inside the center galaxy
      if (!isMobile) {
        gsap.set('.su-group--frontend', { x: 260,  y: 160,  scale: 0.08, opacity: 0 });
        gsap.set('.su-group--backend',  { x: -260, y: 160,  scale: 0.08, opacity: 0 });
        gsap.set('.su-group--mobile',   { x: 280,  y: -40,  scale: 0.08, opacity: 0 });
        gsap.set('.su-group--database', { x: -280, y: -40,  scale: 0.08, opacity: 0 });
        gsap.set('.su-group--tools',    { x: 0,    y: -200, scale: 0.08, opacity: 0 });
      } else {
        gsap.set('.su-floating-group',  { y: 80, scale: 0.7, opacity: 0 });
      }

      // Tech icons start unscaled
      gsap.set('.su-icon-item', { scale: 0, opacity: 0 });
      gsap.set('.su-cat-orbit', { scale: 0.15, opacity: 0 });
      gsap.set('.su-db-planet', { scale: 0, opacity: 0 });

      // Corner planets start off-screen slightly
      gsap.set('.su-corner-planet--top-left', { x: -80, y: -80, opacity: 0 });
      gsap.set('.su-corner-planet--bottom-right', { x: 80, y: 80, opacity: 0 });

      // ── Master ScrollTrigger Timeline (Re-triggers in both directions) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          end: 'bottom 15%',
          toggleActions: 'restart reverse restart reverse',
          invalidateOnRefresh: true,
        },
      });

      // 1. Center Galaxy ignites and expands rapidly
      tl.to('.su-galaxy-container', {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'back.out(1.5)',
      })
      .to('.su-galaxy-core-burst', {
        scale: 1.4,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.45')
      .to('.su-galaxy-halo', {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      }, '-=0.4')

      // Supernova shockwave burst from the center core
      .fromTo('.su-galaxy-shockwave', 
        { scale: 0.2, opacity: 1 },
        { scale: 3.2, opacity: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.35'
      )

      // 2. Corner celestial planets glide into deep space
      .to(['.su-corner-planet--top-left', '.su-corner-planet--bottom-right'], {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.05,
      }, '-=0.45')

      // 3. THE CENTER EJECTS ALL CATEGORIES OUTWARD TO THEIR CELESTIAL POSITIONS!
      .to(['.su-group--frontend', '.su-group--backend', '.su-group--mobile', '.su-group--database', '.su-group--tools'], {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: 'power4.out',
        stagger: 0.04,
      }, '-=0.35')

      // 4. Orbital rings expand like gravitational waves
      .to('.su-cat-orbit', {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(1.2)',
        stagger: 0.03,
      }, '-=0.4')

      // 5. ALL TECHNOLOGY ICONS POP OUT WITH A VIBRANT SPRING BOUNCE!
      .to('.su-icon-item', {
        scale: 1,
        opacity: 1,
        duration: 0.38,
        ease: 'back.out(2.4)',
        stagger: {
          each: 0.018,
          from: 'center',
        },
      }, '-=0.35')

      // 6. Mini database ringed planet pops into place
      .to('.su-db-planet', {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'back.out(2)',
      }, '-=0.25');

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="su-root">

      {/* ── Realistic Space Stars ── */}
      <div className="su-starfield" aria-hidden="true">
        {Array.from({ length: 110 }, (_, i) => (
          <span
            key={i}
            className="su-star"
            style={{
              left:  ((i * 137.5 + 17) % 98) + '%',
              top:   ((i * 71   + 11) % 96) + '%',
              width:  (0.6 + (i % 4) * 0.6) + 'px',
              height: (0.6 + (i % 4) * 0.6) + 'px',
              animationDuration: (2.2 + (i % 5) * 0.6) + 's',
              animationDelay: ((i * 0.08) % 3) + 's',
              opacity: 0.25 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* ── Deep Nebula Glows (Homepage Purple) ── */}
      <div className="su-nebula su-nebula--top-left"  aria-hidden="true" />
      <div className="su-nebula su-nebula--top-right" aria-hidden="true" />
      <div className="su-nebula su-nebula--center"    aria-hidden="true" />
      <div className="su-nebula su-nebula--bottom"    aria-hidden="true" />

      {/* ── Photorealistic Celestial Planets (from reference) ── */}
      {/* 1. Giant purple gas planet (top left corner) */}
      <div className="su-corner-planet su-corner-planet--top-left" aria-hidden="true">
        <img
          src="/images/purple-planet.jpg"
          alt=""
          className="su-corner-planet-img"
        />
        <div className="su-corner-planet-glow" />
      </div>

      {/* 2. Giant purple planet (bottom right corner) */}
      <div className="su-corner-planet su-corner-planet--bottom-right" aria-hidden="true">
        <img
          src="/images/purple-planet.jpg"
          alt=""
          className="su-corner-planet-img"
        />
        <div className="su-corner-planet-glow" />
      </div>

      {/* 3. Small celestial satellite moon (top center-right) */}
      <div className="su-satellite-moon" aria-hidden="true" />

      {/* ── Grand Global Orbital Rings crossing the scene ── */}
      <div className="su-grand-orbit su-grand-orbit--1" aria-hidden="true">
        <span className="su-debris su-debris--1" />
        <span className="su-debris su-debris--2" />
        <span className="su-debris su-debris--3" />
      </div>
      <div className="su-grand-orbit su-grand-orbit--2" aria-hidden="true">
        <span className="su-debris su-debris--4" />
        <span className="su-debris su-debris--5" />
      </div>
      <div className="su-grand-orbit su-grand-orbit--3" aria-hidden="true">
        <span className="su-debris su-debris--6" />
      </div>

      {/* ══════════════════════════════════════════
          MAIN STAGE — 3 columns (matching reference)
          ══════════════════════════════════════════ */}
      <div className="su-stage">

        {/* TOP ROW */}
        <FloatingGroup group={skillGroups[0]} />

        {/* CENTER — PHOTOREALISTIC GALAXY ACCRETION DISK */}
        <div className="su-galaxy-area" aria-hidden="true">
          <RealisticGalaxyCenter />
        </div>

        <FloatingGroup group={skillGroups[1]} />

        {/* MIDDLE ROW */}
        <FloatingGroup group={skillGroups[2]} />
        <div className="su-galaxy-spacer" />
        <FloatingGroup group={skillGroups[3]} />

        {/* BOTTOM ROW — OUTILS & WORKFLOW (Wide orbit) */}
        <FloatingGroup group={skillGroups[4]} />

      </div>

      {/* ── Bottom caption with stylish accent lines ── */}
      <div className="su-footer-caption">
        <span className="su-caption-line" />
        <p className="su-caption-text">
          COMPÉTENCES PROJETÉES — SURVOLEZ UN LOGO POUR LE DÉCOUVRIR
        </p>
        <span className="su-caption-line" />
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PHOTOREALISTIC CENTRAL GALAXY / UNIVERSE ACCRETION DISK
   ══════════════════════════════════════════════════════════ */
function RealisticGalaxyCenter() {
  return (
    <div className="su-galaxy-container">

      {/* Deep halo glow behind galaxy */}
      <div className="su-galaxy-halo" />

      {/* Supernova shockwave pulse */}
      <div className="su-galaxy-shockwave" />

      {/* Actual photorealistic 8K render of the cosmic galaxy */}
      <div className="su-galaxy-disc-wrap">
        <img
          src="/images/cosmic-galaxy.jpg"
          alt="Cosmic Galaxy Universe"
          className="su-galaxy-img"
        />

        {/* Glowing starlight core burst overlay */}
        <div className="su-galaxy-core-burst" />

        {/* Radiant star flare rays */}
        <div className="su-galaxy-ray su-galaxy-ray--1" />
        <div className="su-galaxy-ray su-galaxy-ray--2" />
      </div>

      {/* Orbital dust and floating asteroid rocks around the accretion disk */}
      <div className="su-accretion-orbit su-accretion-orbit--inner" />
      <div className="su-accretion-orbit su-accretion-orbit--outer" />

      {/* Orbiting cosmic particles */}
      <span className="su-cosmic-speck su-speck--1" />
      <span className="su-cosmic-speck su-speck--2" />
      <span className="su-cosmic-speck su-speck--3" />
      <span className="su-cosmic-speck su-speck--4" />
      <span className="su-cosmic-speck su-speck--5" />
    </div>
  );
}