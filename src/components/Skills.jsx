import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RetroStar from './RetroStar';
import SkillsUniverse from './SkillsUniverse';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      const titleIntro = gsap.timeline({
        scrollTrigger: {
          trigger: header, start: 'top 88%', end: 'top 42%', scrub: 0.7, invalidateOnRefresh: true,
        },
      });
      titleIntro.fromTo(header,
        { rotateX: -28, y: 42, scale: 0.94, opacity: 0.25 },
        { rotateX: 0, y: 0, scale: 1, opacity: 1, duration: 1, ease: 'none' }, 0);
      if (line1Ref.current && line2Ref.current) {
        titleIntro.fromTo(line1Ref.current, { rotateX: -18, transformOrigin: 'bottom center' }, { rotateX: 0, duration: 1, ease: 'none' }, 0);
        titleIntro.fromTo(line2Ref.current, { rotateX: 18, transformOrigin: 'top center' }, { rotateX: 0, duration: 1, ease: 'none' }, 0);
      }
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section-cosmic">
      <div className="skills-universe-glow skills-universe-glow--one" aria-hidden="true" />
      <div className="skills-universe-glow skills-universe-glow--two" aria-hidden="true" />
      <header className="skills-header-3d-stage">
        <div ref={headerRef} className="skills-folding-header">
          <div className="skills-fold-ambient-glow" />
          <div className="skills-eyebrow-badge"><RetroStar size={14} /><span>Compétences</span><RetroStar size={14} /></div>
          <h2 className="skills-fold-title font-display font-extrabold uppercase tracking-tight leading-[1.08]">
            <span ref={line1Ref} className="about-fold-line skills-fold-line skills-fold-line--white">Des expériences web et mobiles</span>
            <br />
            <span ref={line2Ref} className="about-fold-line skills-fold-line skills-fold-line--accent">fiables et performantes.</span>
          </h2>
          <p className="skills-fold-subtitle">Les technologies que je mobilise pour concevoir des expériences numériques fiables et soignées.</p>
        </div>
      </header>
      <SkillsUniverse />
    </section>
  );
}
