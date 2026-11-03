import React, { useRef, useState, useLayoutEffect, useEffect, useMemo, useCallback } from 'react';

/**
 * TextReveal - Composant de révélation de texte ligne par ligne
 * 
 * - Masquage par fenêtre invisible (overflow: hidden)
 * - Découpage dynamique des lignes selon la largeur réelle de l'écran (ResizeObserver)
 * - Animation de montée : translateY(100%) vers translateY(0%)
 * - Durée : 1s par ligne, easing Power3 out: cubic-bezier(0.215, 0.61, 0.355, 1)
 * - Décalage (stagger) : 0,25s entre chaque ligne
 * - Rejoue à chaque retour dans la section visible (ScrollTrigger / IntersectionObserver)
 */
export default function TextReveal({
  text,
  children,
  as: Component = 'h3',
  className = '',
  duration = 1,
  stagger = 0.25,
  delay = 0,
  ease = 'power3.out',
  style = {},
  ...props
}) {
  const content = text || (typeof children === 'string' ? children : '');
  const containerRef = useRef(null);
  const measurerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);

  // Découpage en mots en mémoire JS
  const words = useMemo(() => {
    return content ? content.trim().split(/\s+/) : [];
  }, [content]);

  // Calcul dynamique des lignes selon l'affichage réel
  const computeLines = useCallback(() => {
    if (!measurerRef.current || words.length === 0) return;

    const wordSpans = measurerRef.current.querySelectorAll('.tr-measure-word');
    if (!wordSpans || wordSpans.length === 0) return;

    const grouped = [];
    let currentLine = [];
    let currentTop = null;

    wordSpans.forEach((span, idx) => {
      const top = Math.round(span.offsetTop);
      const word = words[idx] || span.textContent.trim();

      if (currentTop === null || Math.abs(top - currentTop) < 6) {
        currentLine.push(word);
        if (currentTop === null) currentTop = top;
      } else {
        if (currentLine.length > 0) grouped.push(currentLine.join(' '));
        currentLine = [word];
        currentTop = top;
      }
    });

    if (currentLine.length > 0) {
      grouped.push(currentLine.join(' '));
    }

    setLines(grouped);
  }, [words]);

  // Mesure initiale et écoute du redimensionnement
  useLayoutEffect(() => {
    computeLines();

    let ro = null;
    if (window.ResizeObserver && containerRef.current) {
      ro = new ResizeObserver(() => computeLines());
      ro.observe(containerRef.current);
    }

    const handleResize = () => computeLines();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [computeLines]);

  // Détection du scroll pour déclencher et rejouer l'animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Vérification immédiate si l'élément est déjà visible dès le chargement
    const checkInitialView = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.98) {
        setIsRevealed(true);
      }
    };
    checkInitialView();

    // Support GSAP ScrollTrigger si disponible
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        onEnter: () => setIsRevealed(true),
        onEnterBack: () => setIsRevealed(true),
        onLeaveBack: () => setIsRevealed(false),
      });

      return () => st.kill();
    } else {
      // IntersectionObserver de haute précision avec rejeu
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
            } else if (entry.boundingClientRect.top > 0) {
              // Réinitialise uniquement lorsqu'on remonte au-dessus
              setIsRevealed(false);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [lines]);

  return (
    <Component
      ref={containerRef}
      className={`tr-container ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{ position: 'relative', ...style }}
      {...props}
    >
      {/* Conteneur de mesure invisible pour détecter les retours à la ligne exacts */}
      <span
        ref={measurerRef}
        className="tr-measurer"
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span key={i} className="tr-measure-word">
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>

      {/* Rendu des lignes avec masque overflow: hidden */}
      <span className="tr-lines-display">
        {lines.length > 0 ? (
          lines.map((lineText, idx) => (
            <span key={idx} className="tr-line-mask">
              <span
                className="tr-line-inner"
                style={{
                  transform: isRevealed ? 'translateY(0%)' : 'translateY(100%)',
                  transitionDuration: `${duration}s`,
                  transitionDelay: `${delay + idx * stagger}s`,
                }}
              >
                {lineText}
              </span>
            </span>
          ))
        ) : (
          <span className="tr-line-mask">
            <span
              className="tr-line-inner"
              style={{
                transform: isRevealed ? 'translateY(0%)' : 'translateY(100%)',
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
              }}
            >
              {content}
            </span>
          </span>
        )}
      </span>
    </Component>
  );
}
