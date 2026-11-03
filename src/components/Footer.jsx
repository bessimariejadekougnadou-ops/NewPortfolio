import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';
import RetroStar from './RetroStar';

export default function Footer({ profileData }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFooterNav = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'home') {
      scrollToTop();
      if (window.history && window.history.pushState) window.history.pushState(null, '', '#home');
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      if (window.history && window.history.pushState) window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-brand-title">
              <RetroStar size={24} className="footer-retro-star text-purple-300" />
              <span className="footer-signature">portfolio.</span>
            </div>
            <p className="footer-tagline">
              Développeuse Web & Mobile Full Stack — Façonnant des applications modernes, robustes et élégantes.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-nav-title">Navigation</span>
            <ul className="footer-nav-list">
              <li><a href="#home" onClick={(e) => handleFooterNav(e, 'home')}>Accueil</a></li>
              <li><a href="#about" onClick={(e) => handleFooterNav(e, 'about')}>À Propos</a></li>
              <li><a href="#skills" onClick={(e) => handleFooterNav(e, 'skills')}>Compétences</a></li>
              <li><a href="#projects" onClick={(e) => handleFooterNav(e, 'projects')}>Projets</a></li>
              <li><a href="#experience" onClick={(e) => handleFooterNav(e, 'experience')}>Parcours</a></li>
              <li><a href="#contact" onClick={(e) => handleFooterNav(e, 'contact')}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-back-to-top">
            <button 
              type="button" 
              onClick={scrollToTop} 
              className="back-to-top-btn"
              title="Retourner en haut de page"
              aria-label="Retour en haut"
            >
              <ArrowUp size={20} />
              <span>Haut de page</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Bessi Marie-Jade Kougnadou • portfolio. Tous droits réservés. Bâti avec React & passion pastel ✦
          </p>
          <div className="footer-social-strip">
            <a 
              href={profileData.linkedinUrl?.startsWith('http') ? profileData.linkedinUrl : `https://${profileData.linkedinUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="Profil LinkedIn de Marie-Jade"
            >
              <LinkedinIcon size={18} />
            </a>
            <a 
              href={`https://tiktok.com/@${profileData.tiktokHandle?.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TikTokIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
