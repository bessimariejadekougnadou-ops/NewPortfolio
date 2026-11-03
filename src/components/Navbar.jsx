import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sliders, ArrowUpRight, FileText, Download } from 'lucide-react';
import { NavigationEffect } from './NavigationEffect';

const RASTER_SLICES = [
  { y: '0%', height: '11%' },
  { y: '10%', height: '11%' },
  { y: '20%', height: '11%' },
  { y: '30%', height: '11%' },
  { y: '40%', height: '11%' },
  { y: '50%', height: '11%' },
  { y: '60%', height: '11%' },
  { y: '70%', height: '11%' },
  { y: '80%', height: '11%' },
  { y: '90%', height: '11%' }
];

export default function Navbar({
  profileData,
  onOpenCustomize
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const navEffectRef = useRef(null);

  const isManualScrollRef = useRef(false);
  const manualScrollTimerRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      navEffectRef.current = new NavigationEffect(navRef.current);
    }
    return () => {
      if (navEffectRef.current) {
        navEffectRef.current.destroy();
      }
      if (manualScrollTimerRef.current) {
        clearTimeout(manualScrollTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (navEffectRef.current) {
      navEffectRef.current.setActiveById(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Avoid overriding active section while smooth scrolling after click
      if (isManualScrollRef.current) return;

      // 1. Top of page is always 'home'
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // 2. Near bottom of page is always 'contact'
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 120) {
        setActiveSection('contact');
        return;
      }

      // 3. Find current visible section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];
      const navThreshold = 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navThreshold) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home', id: 'home' },
    { name: 'À Propos', href: '#about', id: 'about' },
    { name: 'Compétences', href: '#skills', id: 'skills' },
    { name: 'Parcours', href: '#experience', id: 'experience' },
    { name: 'Projets', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    // Lock scroll spy during smooth scroll transition
    isManualScrollRef.current = true;
    if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);
    manualScrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 900);

    if (navEffectRef.current) {
      navEffectRef.current.setActiveById(targetId);
    }

    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '#home');
      }
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a 
          href="#home" 
          className="navbar-brand"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <span className="brand-sparkle">✦</span>
          <span className="brand-name">portfolio.</span>
          <span className="status-badge">
            <span className="status-dot"></span>
            Full Stack
          </span>
        </a>

        {/* Desktop Nav with NavigationEffect */}
        <nav ref={navRef} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-id={link.id}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              <svg 
                className="nav-link-svg" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g className="blue">
                  {RASTER_SLICES.map((slice, i) => (
                    <rect
                      key={`b-${i}`}
                      x="-101%"
                      y={slice.y}
                      width="102%"
                      height={slice.height}
                    />
                  ))}
                </g>
                <g className="pink">
                  {RASTER_SLICES.map((slice, i) => (
                    <rect
                      key={`p-${i}`}
                      x="-101%"
                      y={slice.y}
                      width="102%"
                      height={slice.height}
                    />
                  ))}
                </g>
              </svg>
              <span className="nav-link-text">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <button
            type="button"
            className="action-btn-icon"
            onClick={onOpenCustomize}
            title="Personnaliser les informations"
            aria-label="Customize profile"
          >
            <Sliders size={15} />
          </button>

          <a 
            href="#contact" 
            className="contact-cta-btn"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            <span>Me Contacter</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-drawer-footer">
              <a
                href="/KOUGNADOU BESSI _CV.pdf"
                download="KOUGNADOU_BESSI_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-cv-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={16} />
                <span>Télécharger mon CV (PDF)</span>
                <Download size={15} />
              </a>

              <button
                type="button"
                className="mobile-customize-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomize();
                }}
              >
                <Sliders size={16} />
                <span>Personnaliser vos infos</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
