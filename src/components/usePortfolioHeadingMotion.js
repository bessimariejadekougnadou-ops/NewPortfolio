import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Même pli 3D au scroll que les titres À propos et Compétences. */
export default function usePortfolioHeadingMotion(headingRef, firstLineRef, secondLineRef, enabled = true) {
  useEffect(() => {
    const heading = headingRef.current;
    const firstLine = firstLineRef.current;
    const secondLine = secondLineRef.current;
    if (!enabled || !heading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          end: 'top 42%',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      intro.fromTo(heading,
        { rotateX: -38, y: 38, z: -55, scale: 0.94, opacity: 0.35 },
        { rotateX: 0, y: 0, z: 0, scale: 1, opacity: 1, duration: 1, ease: 'none' }, 0);
      if (firstLine && secondLine) {
        intro.fromTo(firstLine,
          { rotateX: -26, transformOrigin: 'bottom center' },
          { rotateX: 0, duration: 1, ease: 'none' }, 0);
        intro.fromTo(secondLine,
          { rotateX: 26, transformOrigin: 'top center' },
          { rotateX: 0, duration: 1, ease: 'none' }, 0);
      }
    }, heading);

    return () => context.revert();
  }, [headingRef, firstLineRef, secondLineRef, enabled]);
}
