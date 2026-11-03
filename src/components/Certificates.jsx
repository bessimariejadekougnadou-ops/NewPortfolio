import React, { useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Download, Sparkles } from 'lucide-react';
import usePortfolioHeadingMotion from './usePortfolioHeadingMotion';
import RetroStar from './RetroStar';
import './Certificates.css';
import './PortfolioSectionHeading.css';

const CERTS = [
  {
    id: 'javascript',
    label: 'JavaScript Essentials',
    img: "/Capture d'écran 2026-10-25 163247.png",
    pdf: '/bessi marie jadeKOUGNADOU-JAVA SCRIPT-certificate (1).pdf'
  },
  {
    id: 'cloud',
    label: 'Cloud Security',
    img: "/Capture d'écran 2026-10-25 163359.png",
    pdf: '/bessi marie jadeKOUGNADOU-Cloud Security-certificate (1).pdf'
  },
  {
    id: 'networking',
    label: 'Networking Essentials',
    img: "/Capture d'écran 2026-10-25 163450.png",
    pdf: '/bessi marie jadeKOUGNADOU-NETWORKING ESSEN-certificate (1).pdf'
  },
  {
    id: 'python',
    label: 'Programme Python',
    img: "/Capture d'écran 2026-10-25 163530.png",
    pdf: '/bessi marie jadeKOUGNADOU-PROGRAMME PYTHON-certificate.pdf'
  }
];

export default function Certificates() {
  const [active, setActive]           = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const total = CERTS.length;

  /* 3D fold heading animation — same hook as About / Skills / Projects */
  const headingRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  usePortfolioHeadingMotion(headingRef, line1Ref, line2Ref);

  const go = useCallback((dir) => {
    if (transitioning) return;
    setTransitioning(true);
    setActive((p) => (p + dir + total) % total);
    setTimeout(() => setTransitioning(false), 500);
  }, [transitioning, total]);

  const jumpTo = (i) => {
    if (transitioning || i === active) return;
    setTransitioning(true);
    setActive(i);
    setTimeout(() => setTransitioning(false), 500);
  };

  /* The three visible layers */
  const front = active;
  const mid   = (active + 1) % total;
  const back  = (active + 2) % total;

  return (
    <section id="certificates" className="certs-section">

      {/* ── Memphis Backdrop ── */}
      <div className="certs-bg" aria-hidden="true">
        <div className="certs-bg__dots certs-bg__dots--tl" />
        <div className="certs-bg__dots certs-bg__dots--tr" />
        <div className="certs-bg__dots certs-bg__dots--br" />
        <div className="certs-bg__dots certs-bg__dots--bl" />
        <span className="certs-bg__plus" style={{top:'12%',left:'38%',fontSize:'48px'}}>+</span>
        <span className="certs-bg__plus" style={{bottom:'14%',right:'6%',fontSize:'54px'}}>+</span>
        <span className="certs-bg__plus" style={{top:'42%',left:'5%',fontSize:'34px',opacity:.45}}>+</span>
        <div className="certs-bg__diamond" style={{bottom:'12%',left:'8%',width:'80px',height:'80px'}}><div/></div>
        <div className="certs-bg__diamond" style={{top:'10%',right:'10%',width:'56px',height:'56px',opacity:.4}}><div/></div>
        <svg className="certs-bg__squig" style={{top:'11%',right:'28%'}} viewBox="0 0 100 24" fill="none">
          <path d="M2 12 Q14 0 26 12 T50 12 T74 12 T98 12" stroke="rgba(192,132,252,.42)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="certs-bg__squig" style={{bottom:'10%',left:'28%',opacity:.5}} viewBox="0 0 100 24" fill="none">
          <path d="M2 12 Q14 24 26 12 T50 12 T74 12 T98 12" stroke="rgba(192,132,252,.32)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg className="certs-bg__shapes" viewBox="0 0 60 120" fill="none">
          <polygon points="10,0 20,18 0,18"  stroke="rgba(192,132,252,.35)" strokeWidth="1.5" fill="none"/>
          <polygon points="10,32 20,50 0,50" stroke="rgba(192,132,252,.25)" strokeWidth="1.5" fill="none"/>
          <polygon points="10,64 20,82 0,82" stroke="rgba(192,132,252,.18)" strokeWidth="1.5" fill="none"/>
        </svg>
        <span className="certs-bg__x" style={{top:'20%',right:'5%'}}>✕</span>
        <span className="certs-bg__chevrons">&gt;&gt;&gt;&gt;</span>
        <svg className="certs-bg__circles" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="rgba(192,132,252,.2)"  strokeWidth="1.2"/>
          <circle cx="40" cy="40" r="26" stroke="rgba(192,132,252,.15)" strokeWidth="1.2"/>
          <circle cx="40" cy="40" r="16" stroke="rgba(192,132,252,.1)"  strokeWidth="1.2"/>
        </svg>
      </div>

      {/* ── Header — exact same 3D fold animation as À Propos / Compétences ── */}
      <header className="certs-header-3d-stage">
        <div ref={headingRef} className="certs-folding-header">
          <div className="certs-fold-ambient-glow" aria-hidden="true" />

          {/* Eyebrow badge */}
          <div className="certs-eyebrow-badge">
            <RetroStar size={14} />
            <span>Accréditations Officielles</span>
            <RetroStar size={14} />
          </div>

          {/* Title — same classes as Portfolio heading everywhere else */}
          <h2 className="certs-fold-title portfolio-section-heading">
            <span ref={line1Ref} className="portfolio-section-heading-line portfolio-section-heading-line--main">
              Mes Certifications
            </span>
            <br />
            <span ref={line2Ref} className="portfolio-section-heading-line portfolio-section-heading-line--accent">
              Validées.
            </span>
          </h2>

          <p className="certs-fold-subtitle">
            Naviguez avec les flèches • Cliquez sur un certificat pour ouvrir son PDF officiel
          </p>
        </div>
      </header>

      {/* ── Stage: Arrows + 3D Stack ── */}
      <div className="certs-stage">

        {/* LEFT ARROW */}
        <button type="button" className="certs-arrow certs-arrow--left"
          onClick={() => go(-1)} aria-label="Précédent">
          <ChevronLeft size={22}/>
        </button>

        {/* 3-D Photo Stack */}
        <div className="certs-deck">

          {/* BACK photo */}
          <div className="cert-photo-card cert-photo-card--back"
               onClick={() => go(1)}>
            <img src={CERTS[back].img} alt={CERTS[back].label} draggable="false"/>
            <div className="cert-photo-card__shine"/>
          </div>

          {/* MID photo */}
          <div className="cert-photo-card cert-photo-card--mid"
               onClick={() => go(1)}>
            <img src={CERTS[mid].img} alt={CERTS[mid].label} draggable="false"/>
            <div className="cert-photo-card__shine"/>
          </div>

          {/* FRONT photo — fully visible, interactive */}
          <a href={encodeURI(CERTS[front].pdf)}
             target="_blank" rel="noopener noreferrer"
             className="cert-photo-card cert-photo-card--front"
             title="Ouvrir le PDF officiel">
            <img src={CERTS[front].img} alt={CERTS[front].label} draggable="false"/>
            <div className="cert-photo-card__shine"/>
            <div className="cert-photo-card__label-bar">
              <span>{CERTS[front].label}</span>
              <ExternalLink size={14}/>
            </div>
          </a>
        </div>

        {/* RIGHT ARROW */}
        <button type="button" className="certs-arrow certs-arrow--right"
          onClick={() => go(1)} aria-label="Suivant">
          <ChevronRight size={22}/>
        </button>
      </div>

      {/* ── Controls bar ── */}
      <div className="certs-controls">

        <span className="certs-counter">
          <strong>{String(active + 1).padStart(2,'0')}</strong>
          &nbsp;/&nbsp;
          {String(total).padStart(2,'0')}
        </span>

        {/* Dot pickers */}
        <div className="certs-dots-nav">
          {CERTS.map((_,i) => (
            <button key={i} type="button"
              className={`certs-dot${i===active?' certs-dot--active':''}`}
              onClick={() => jumpTo(i)}
              aria-label={`Certificat ${i+1}`}/>
          ))}
        </div>

        {/* PDF buttons for active cert */}
        <div className="certs-pdf-btns">
          <a href={encodeURI(CERTS[front].pdf)}
             target="_blank" rel="noopener noreferrer"
             className="certs-pdf-btn">
            <ExternalLink size={14}/><span>Ouvrir PDF</span>
          </a>
          <a href={encodeURI(CERTS[front].pdf)}
             download className="certs-pdf-btn certs-pdf-btn--dl">
            <Download size={14}/><span>Télécharger</span>
          </a>
        </div>
      </div>

    </section>
  );
}
