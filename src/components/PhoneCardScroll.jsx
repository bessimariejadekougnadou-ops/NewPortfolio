import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, BatteryMedium, Sparkles, ArrowUpRight, Code2, Palette, ShieldCheck, HeartHandshake } from 'lucide-react';
import './PhoneCardScroll.css';

gsap.registerPlugin(ScrollTrigger);

export default function PhoneCardScroll({ profileData }) {
  const phoneRef = useRef(null);
  const contentRef = useRef(null);
  const timeRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const phoneElem = phoneRef.current;
    if (!phoneElem) return;

    const timeElem = timeRef.current;
    const contentElem = contentRef.current;
    if (!contentElem) return;

    const articles = contentElem.querySelectorAll('article');
    if (!articles.length) return;

    // 1. Clock time updater
    const setTime = (elem) => {
      if (!elem) return;
      elem.textContent = new Date().toLocaleTimeString('fr-FR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    setTime(timeElem);
    const timeInterval = setInterval(() => setTime(timeElem), 5000);

    // 2. Roll function according to user's exact specification
    const triggers = [];

    function roll(content, article, allArticles, index) {
      const animation = gsap.timeline();

      animation.to(article, {
        '--clip': `${article.offsetHeight + 112}px`,
        '--compact-s': 1,
        '--compact-o': 1,
        duration: 1,
        delay: 0.05,
        ease: 'none',
      }).to(article, {
        '--border-radius-h': '180px',
        '--border-radius-v': '20px',
        repeat: 1,
        yoyo: true,
        duration: 0.15,
        onStart() {
          article.style.overflow = 'hidden';
        },
        onComplete() {
          article.style.overflow = 'visible';
        },
      }, 0).to(article, {
        '--article-r': getComputedStyle(article).getPropertyValue('--to-article-r') || '0deg',
        '--article-x': getComputedStyle(article).getPropertyValue('--to-article-x') || '0px',
        '--article-y': getComputedStyle(article).getPropertyValue('--to-article-y') || '0px',
        duration: 0.15,
      });

      if (index === 0) {
        animation.to(phoneElem, {
          '--headline-y': '-28px',
          duration: 0.3,
        }, 1.05);
      }

      if (index === 1) {
        animation.to(allArticles[index - 1], {
          '--article-y': '-64px',
          '--article-r': '-2deg',
          duration: 0.15,
        }, 1.08);
      }

      if (index === 2) {
        animation.to(allArticles[index - 2], {
          '--article-y': '-70px',
          duration: 0.15,
        }, 1.14);
        animation.to(allArticles[index - 1], {
          '--article-y': '-42px',
          '--article-r': '-2deg',
          duration: 0.15,
        }, 1.08);
      }

      if (index === allArticles.length - 1) {
        animation.to(phoneElem, {
          '--empty-mask': '0%',
          duration: 0.3,
        });
      }

      const st = ScrollTrigger.create({
        animation,
        trigger: article,
        scroller: content,
        scrub: true,
        start: 'top top+=184',
        end: 'bottom top+=112',
      });

      triggers.push(st);
      return st;
    }

    articles.forEach((article, index) => {
      roll(contentElem, article, articles, index);
    });

    const handleContentScroll = () => {
      if (contentElem.scrollTop > 2550) {
        contentElem.scrollTop = 2550;
      }
      const scrollPos = contentElem.scrollTop;
      if (scrollPos < 450) setActiveCardIndex(0);
      else if (scrollPos < 950) setActiveCardIndex(1);
      else if (scrollPos < 1500) setActiveCardIndex(2);
      else setActiveCardIndex(3);
    };

    contentElem.addEventListener('scroll', handleContentScroll, { passive: true });

    // 3. Keep same progress after resize
    const progressST = ScrollTrigger.create({
      scroller: contentElem,
      start: 0,
      end: 2550,
    });
    triggers.push(progressST);

    let oldProgress = 0;
    const handleRefreshInit = () => {
      oldProgress = progressST.progress;
      contentElem.scrollTop = 0;
    };
    const handleRefresh = () => {
      progressST.scroll(oldProgress * 2550);
    };

    ScrollTrigger.addEventListener('refreshInit', handleRefreshInit);
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    return () => {
      clearInterval(timeInterval);
      contentElem.removeEventListener('scroll', handleContentScroll);
      ScrollTrigger.removeEventListener('refreshInit', handleRefreshInit);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const scrollToCard = (index) => {
    if (!contentRef.current) return;
    const targets = [0, 680, 1280, 1920];
    contentRef.current.scrollTo({
      top: targets[index] || 0,
      behavior: 'smooth',
    });
    setActiveCardIndex(index);
  };

  return (
    <div className="phone-mockup-wrapper">
      {/* Smartphone Device */}
      <div id="phone" ref={phoneRef}>
        
        {/* Dynamic Island / Speaker */}
        <div className="phone-island">
          <div className="island-camera" />
          <div className="island-sensor" />
        </div>

        {/* Top Status Bar */}
        <div className="phone-status-bar">
          <span className="time" ref={timeRef}>09:41</span>
          <div className="phone-status-icons">
            <Wifi size={14} className="text-white" />
            <span className="text-[10px] font-bold">5G</span>
            <BatteryMedium size={16} className="text-white" />
          </div>
        </div>

        {/* App Bar Header with Animated Headline */}
        <div className="phone-app-header">
          <div className="phone-app-headline">
            <div>
              <div className="phone-app-subtitle">Marie-Jade • Portfolio</div>
              <div className="phone-app-title">Piliers &amp; Savoir-Faire</div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-[10px] font-bold text-purple-200">
              <Sparkles size={11} className="text-purple-300 animate-pulse" />
              <span>Full Stack</span>
            </div>
          </div>
        </div>

        {/* Scrollable Feed Container */}
        <div className="content" ref={contentRef}>
          <div className="entries">
            
            {/* ARTICLE 1: Direction Artistique */}
            <article 
              className="card-theme-1"
              style={{
                '--to-article-r': '0deg',
                '--to-article-x': '0px',
                '--to-article-y': '0px',
              }}
            >
              <div className="card-compact-header">
                <span>01</span>
                <span>✦ UI/UX</span>
              </div>
              <div className="card-inner">
                <div className="card-top-meta">
                  <span className="card-tag">01 • Direction artistique &amp; UI/UX</span>
                  <span className="card-number">#01</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-purple-200 shadow-inner">
                    <Palette size={20} />
                  </div>
                  <h4 className="card-title">Création d’interfaces et design systems</h4>
                </div>
                <p className="card-desc">
                  Élaboration d’interfaces raffinées, alliant harmonie visuelle, élégance éditoriale et simplicité d’utilisation. Sélection minutieuse des palettes chromatiques et prototypes interactifs sur Figma.
                </p>
                <div className="card-chips">
                  <span className="card-chip">Harmonie visuelle</span>
                  <span className="card-chip">Typographie &amp; Couleurs</span>
                  <span className="card-chip">Design Systems Figma</span>
                </div>
              </div>
            </article>

            {/* ARTICLE 2: Architecture Web & Mobile */}
            <article 
              className="card-theme-2"
              style={{
                '--to-article-r': '-2deg',
                '--to-article-x': '0px',
                '--to-article-y': '-42px',
              }}
            >
              <div className="card-compact-header">
                <span>02</span>
                <span>✦ Web &amp; Mobile</span>
              </div>
              <div className="card-inner">
                <div className="card-top-meta">
                  <span className="card-tag">02 • Développement Web &amp; Mobile</span>
                  <span className="card-number">#02</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-400/30 flex items-center justify-center text-blue-200 shadow-inner">
                    <Code2 size={20} />
                  </div>
                  <h4 className="card-title">Applications performantes &amp; durables</h4>
                </div>
                <p className="card-desc">
                  Développement de sites web et d’applications mobiles alliant fonctionnalité, performance et qualité technique. Solutions modulaires et maintenables, adaptées aux besoins des utilisateurs.
                </p>
                <div className="card-chips">
                  <span className="card-chip">Sites Web &amp; Mobile</span>
                  <span className="card-chip">Code structuré &amp; modulaire</span>
                  <span className="card-chip">Performance &amp; Maintenabilité</span>
                </div>
              </div>
            </article>

            {/* ARTICLE 3: Haute Précision & Exigence */}
            <article 
              className="card-theme-3"
              style={{
                '--to-article-r': '1.5deg',
                '--to-article-x': '0px',
                '--to-article-y': '-70px',
              }}
            >
              <div className="card-compact-header">
                <span>03</span>
                <span>✦ Excellence</span>
              </div>
              <div className="card-inner">
                <div className="card-top-meta">
                  <span className="card-tag">03 • Précision &amp; Excellence visuelle</span>
                  <span className="card-number">#03</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-900/60 border border-pink-400/30 flex items-center justify-center text-pink-200 shadow-inner">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="card-title">Finitions soignées &amp; abouties</h4>
                </div>
                <p className="card-desc">
                  Optimisation de chaque détail, des composants aux transitions et animations. Recherche constante d’un équilibre entre fluidité, cohérence visuelle et qualité d’exécution.
                </p>
                <div className="card-chips">
                  <span className="card-chip">Transitions fluides</span>
                  <span className="card-chip">Cohérence visuelle</span>
                  <span className="card-chip">Expérience immersive</span>
                </div>
              </div>
            </article>

            {/* ARTICLE 4: Vision & Prise de Contact */}
            <article 
              className="card-theme-4"
              style={{
                '--to-article-r': '0deg',
                '--to-article-x': '0px',
                '--to-article-y': '-85px',
              }}
            >
              <div className="card-compact-header">
                <span>04</span>
                <span>✦ Contact</span>
              </div>
              <div className="card-inner">
                <div className="card-top-meta">
                  <span className="card-tag">04 • Vision &amp; Partenariat</span>
                  <span className="card-number">#04</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-300/40 flex items-center justify-center text-purple-200 shadow-inner">
                    <HeartHandshake size={20} />
                  </div>
                  <h4 className="card-title">Donnons vie à vos projets</h4>
                </div>
                <p className="card-desc">
                  Disponible pour transformer vos concepts en solutions numériques remarquables, alliant sensibilité artistique et robustesse logicielle.
                </p>
                <div className="pt-2">
                  <a 
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-transform active:scale-95"
                  >
                    <span>Me Contacter Directement</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>

        {/* iPhone Home Bar Indicator */}
        <div className="phone-home-indicator" />
      </div>

      {/* External Navigation Tabs to smoothly test each pillar */}
      
    </div>
  );
}
