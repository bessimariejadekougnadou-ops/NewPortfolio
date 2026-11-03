import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ArrowDown, FileText, Download, Mail, Sparkles } from 'lucide-react';
import { LinkedinIcon, TikTokIcon } from './SocialIcons';
import GalaxyMotionBackground from './GalaxyMotionBackground';
import MarieJadeCosmicAnimation from './MarieJadeCosmicAnimation';

export default function Hero({ profileData, onOpenCustomize }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
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
    <section 
      id="home" 
      className="relative min-h-screen w-full bg-[#210f44] flex flex-col justify-start px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-36 pb-8 overflow-hidden m-0 border-0 outline-none shadow-none"
    >
      {/* 1. Illustration Cosmique & Motion Graphic (Planètes, Rubans ondulants, Étoiles en croix) */}
      <GalaxyMotionBackground className="z-0 opacity-100" />

      {/* Conteneur principal avec espacement maîtrisé et harmonieux */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto flex flex-col gap-5 sm:gap-6 lg:gap-7 my-auto">
        
        {/* ===================================================================
            LIGNE SUPÉRIEURE : STYLE ÉDITORIAL SWISS (INSPIRÉ DE LA RÉFÉRENCE)
            Gauche : Grand Titre Gros Caractères | Droite : Badge Statut Minimaliste
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start">
          
          {/* Top Left: Title avec Signature Néon Marie-Jade ✦ et DEV FULL STACK */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Signature Cursive Néon Marie-Jade ✦ avec animation comète & explosion d'étoiles */}
            <MarieJadeCosmicAnimation />

            {/* Titre DEV FULL STACK sur une seule ligne avec alternance blanc / violet néon */}
            <h1 className="font-display font-black uppercase tracking-tighter leading-tight text-[clamp(1.75rem,5.2vw,3.2rem)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] whitespace-normal sm:whitespace-nowrap">
              <span className="text-white">DEV </span>
              <span className="text-white">FU</span>
              <span className="text-purple-300 drop-shadow-[0_0_18px_rgba(168,85,247,0.75)]">LL </span>
              <span className="text-purple-300 drop-shadow-[0_0_18px_rgba(168,85,247,0.75)]">ST</span>
              <span className="text-white">ACK</span>
            </h1>
          </div>

          {/* Top Right: Statut aéré sans carte pour laisser admirer l'illustration cosmique */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-start lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-100 text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles size={12} className="text-purple-300" />
              <span>Disponible pour nouveaux projets</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            LIGNE MÉDIANE : STYLE ÉDITORIAL SWISS
            Gauche : Photo Portrait avec Arrondis & Flèche | Droite : Grand Nom Signature
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end">
          
          {/* Bottom Left: Portrait Photo Frame + Arrow Indicator */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4">
            <div className="relative group">
              {/* Cadre photo portrait chic avec coins arrondis */}
              <div className="relative w-28 sm:w-60 lg:w-56 aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(10,5,25,0.6)] border-2 border-white/80 bg-slate-950/40 backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="/images/P1.jpg" 
                  alt="Bessi Marie-Jade Kougnadou" 
                  className="w-full h-full object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Lueur d'ambiance derrière la photo */}
              <div 
                className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-xl opacity-40 -z-10 group-hover:opacity-60 transition-opacity"
                aria-hidden="true"
              />
            </div>

            {/* Minimalist Arrow Down-Right */}
            <div className="hidden sm:flex flex-col items-center justify-center w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-xs text-white">
              <ArrowDownRight size={20} strokeWidth={2.4} />
            </div>
          </div>

          {/* Côté Droit : Paragraphe Stylisé en haut + MARIE-JADE Kougnadou en bas */}
          <div className="lg:col-span-8 flex flex-col lg:items-end text-left lg:text-right">
            
            {/* 1. Paragraphe Stylisé Haute Couture */}
            <p
              style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', Georgia, serif" }}
              className="text-purple-100/95 text-[15px] sm:text-base lg:text-[18px] italic font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] max-w-xl"
            >
              « Je suis une développeuse web et mobile Full Stack passionnée, spécialisée dans la conception d'applications intuitives, élégantes et ultra-performantes. De la direction artistique éditoriale jusqu'à l'architecture logicielle robuste, je transforme vos idées en solutions numériques remarquables. »
            </p>

            {/* 2. MARIE-JADE et autre (Développeuse Full Stack, Kougnadou) EN BAS du paragraphe */}
            <div className="mt-2.5 sm:mt-3 flex flex-col lg:items-end">
              <div className="inline-flex items-center gap-2 mb-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-purple-200/90 drop-shadow-xs">
                <span>Développeuse full Stack</span>
              </div>

              <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-purple-200/90 font-main">
                Kougnadou
              </div>
            </div>

          </div>
        </div>

        {/* ===================================================================
            BARRE D'ACTIONS INFERIEURE : CV & LINKEDIN TOUJOURS LÀ-BAS
            "je veux que le cv linkIden soit tjrs l bas"
            =================================================================== */}
        <div className="pt-4 pb-1 flex flex-wrap items-center justify-between gap-3 mt-4 sm:mt-6">
          
          {/* Groupe CV + LinkedIn + TikTok */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Bouton Télécharger CV */}
            <a
              href="/KOUGNADOU BESSI _CV.pdf"
              download="KOUGNADOU_BESSI_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', backgroundColor: '#0f0a21' }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300 border border-purple-400/40"
              title="Consulter et télécharger mon CV (PDF)"
            >
              <FileText size={16} className="text-purple-300" />
              <span className="text-white font-bold">Télécharger mon CV</span>
              <Download size={15} className="text-purple-300" />
            </a>

            {/* Bouton LinkedIn */}
            <a
              href={profileData.linkedinUrl?.startsWith('http') ? profileData.linkedinUrl : `https://${profileData.linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#090514', backgroundColor: '#ffffff' }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:bg-purple-50 hover:scale-105 active:scale-95 transition-all duration-300"
              title="Visiter mon profil LinkedIn"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>

            {/* Bouton TikTok */}
            <a
              href={`https://tiktok.com/@${profileData.tiktokHandle?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/30 shadow-xs hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
              title="Visiter mon profil TikTok"
            >
              <TikTokIcon size={16} />
              <span>TikTok</span>
            </a>

            {/* Bouton Copier Email */}
            <button
              type="button"
              onClick={handleCopyEmail}
              style={{ color: '#f3e8ff', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-purple-100 text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
              title="Cliquez pour copier l'email"
            >
              <Mail size={15} className="text-purple-300" />
              <span className="hidden sm:inline font-semibold">{profileData.email}</span>
              <span className="sm:hidden font-semibold">Email</span>
              {copied && <span className="text-emerald-400 font-bold ml-1">Copié ! ✨</span>}
            </button>
          </div>

          {/* Boutons d'exploration */}
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              style={{ color: '#ffffff', backgroundColor: '#7c3aed' }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold hover:bg-purple-600 hover:scale-105 transition-all duration-300 shadow-lg border border-purple-300/40"
            >
              <Sparkles size={14} className="text-purple-200" />
              <span className="text-white font-bold">Explorer mes Projets</span>
              <ArrowDown size={14} className="text-white" />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              style={{ color: '#090514', backgroundColor: '#ffffff' }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-slate-950 text-xs sm:text-sm font-bold border border-white hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <span>Me Contacter</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
