import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ExternalLink, 
  Eye, 
  X, 
  ArrowRight, 
  Sparkles, 
  Star,
  Radio
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import RetroStar from './RetroStar';
import UfoCosmicBeamAnimation from './UfoCosmicBeamAnimation';
import './ProjectsAlienStyle.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 'atelier-terroir',
      number: 'PRJ-01',
      title: "L'ATELIER DU TERROIR",
      category: 'ecommerce',
      categoryLabel: 'E-Commerce & Agroalimentaire',
      year: '2025',
      badge: 'Projet Déployé',
      image: '/images/project1.png',
      shortDesc: "Plateforme e-commerce moderne dédiée à la valorisation et à la distribution des produits frais et agroalimentaires du terroir togolais à Lomé.",
      fullDesc: "Conception et développement de la plateforme e-commerce L'Atelier du Terroir (en partenariat avec Deal & Consulting et la Ferme Solime). La solution valorise les richesses agricoles togolaises en connectant directement les consommateurs aux producteurs locaux de produits sains : fruits et légumes frais sans intrants chimiques, épices, huiles naturelles et viandes. Le site propose une expérience d'achat fluide avec catalogue interactif, panier dynamique, commande en ligne et gestion de la livraison rapide à domicile à Lomé ou en retrait boutique.",
      tags: ['React', 'Django', 'Python', 'Django REST Framework', 'GitHub', 'PostgreSQL', 'Tailwind CSS'],
      demoUrl: 'https://atelierduterroir.dealandconsulting.com/',
      githubUrl: 'https://github.com/alsayunita/atelier-du-terroir',
      highlights: [
        'Architecture Full Stack associant un frontend React dynamique à une API backend Django robuste et sécurisée',
        'Expérience utilisateur complète : catalogue par catégories, panier temps réel, commandes et options de livraison à Lomé',
        'Workflow d\'équipe structuré sous GitHub avec gestion de versions, code reviews et intégration continue'
      ]
    },
    {
      id: 'pharmanet',
      number: 'PRJ-02',
      title: 'PHARMANET',
      category: 'mobile',
      categoryLabel: 'Mobile App & E-Santé',
      year: '2025',
      badge: 'Application Mobile',
      image: '/images/project2.png',
      shortDesc: "Application mobile d'accès aux services pharmaceutiques au Togo : recherche de médicaments, pharmacies de garde, ordonnances et livraison.",
      fullDesc: "PharmaNET est une solution mobile novatrice conçue pour fluidifier et démocratiser l'accès aux produits de santé au Togo. Développée avec Flutter et propulsée par un backend Django REST Framework, l'application permet aux patients de localiser en temps réel les officines de garde via Google Maps, de vérifier la disponibilité et de comparer les prix des médicaments, de transmettre leurs ordonnances numérisées et de passer commande avec paiement Mobile Money et suivi de livraison à domicile.",
      tags: ['Flutter', 'Django', 'Django REST Framework', 'Google Maps API', 'Mobile Money', 'SQLite', 'API REST'],
      demoUrl: 'https://github.com/alsayunita/pharmanet-mobile',
      githubUrl: 'https://github.com/alsayunita/pharmanet-mobile',
      highlights: [
        'Géolocalisation interactive et repérage en temps réel des pharmacies de garde à proximité (Google Maps)',
        'Numérisation et transmission sécurisée des ordonnances avec comparateur de prix et vérification des stocks',
        'Système de commande complet avec intégration de paiement Mobile Money et suivi de livraison'
      ]
    },
    {
      id: 'myriade-groupe',
      number: 'PRJ-03',
      title: 'MYRIADE GROUPE',
      category: 'corporate',
      categoryLabel: 'Plateforme Web & Entreprise',
      year: '2025',
      badge: 'Site Officiel',
      image: '/images/project3.png',
      shortDesc: "Portail d'entreprise et vitrine technologique de Myriade SARL : développement logiciel, cybersécurité, cloud et transformation digitale à Lomé.",
      fullDesc: "Conception et développement du site officiel et portail corporate de Myriade Groupe (Myriade SARL), entreprise technologique basée à Lomé, Togo. La plateforme valorise les pôles d'expertise du groupe : développement d'applications web et mobiles sur mesure, cybersécurité et audits IT, solutions d'hébergement cloud et accompagnement stratégique. L'interface propose une expérience utilisateur fluide, une architecture moderne et responsive, et des formulaires d'engagement client interactifs.",
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Responsive Design', 'SEO & Performance'],
      demoUrl: 'https://www.myriade-groupe.com/Accueil',
      githubUrl: 'https://github.com/alsayunita/myriade-groupe',
      highlights: [
        'Conception d\'une vitrine digitale corporate élégante, ultra-performante et optimisée SEO',
        'Présentation structurée des pôles d\'expertise : développement web & mobile, cybersécurité et cloud',
        'Architecture responsive tout écran avec expérience utilisateur fluide et formulaires de contact'
      ]
    },
    {
      id: 'signalit',
      number: 'PRJ-04',
      title: 'SIGNALIT',
      category: 'emergency',
      categoryLabel: 'Sécurité Civile & Multiplateforme',
      year: '2025',
      badge: 'Urgence & Sauvetage',
      image: '/images/project4.png',
      shortDesc: "Solution numérique d'alerte et de gestion d'incendies en temps réel connectant les citoyens et les services de secours pour sauver des vies.",
      fullDesc: "SignalIT est un écosystème d'intervention d'urgence conçu pour réduire drastiquement les délais de prise en charge des incendies. Grâce à une architecture multiplateforme performante combinant un backend Spring Boot (Java), un tableau de bord web Angular pour les centres de secours et une application mobile Flutter (Dart) pour les citoyens, la plateforme permet de déclarer un incident instantanément, de le géolocaliser avec précision, d'émettre des alertes push et de suivre en direct l'évolution de la situation sur le terrain.",
      tags: ['Spring Boot', 'Angular', 'Flutter', 'Java', 'Dart', 'Google Maps API', 'WebSockets', 'REST API'],
      demoUrl: 'https://github.com/alsayunita/signalit',
      githubUrl: 'https://github.com/alsayunita/signalit',
      highlights: [
        'Signalement d\'incendie en 1 clic avec géolocalisation GPS précise du lieu de l\'incident',
        'Tableau de bord web de supervision sous Angular & Spring Boot pour le suivi en temps réel',
        'Système de notifications instantanées pour coordonner les interventions et alerter les secours'
      ]
    }
  ];

  const activeProject = projectsData[activeIdx] || projectsData[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalProjects = projectsData.length;

    // ScrollTrigger : lie la progression naturelle du scroll au changement de projet
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetIndex = Math.min(
          totalProjects - 1,
          Math.max(0, Math.floor(progress * totalProjects))
        );
        setActiveIdx(targetIndex);
      }
    });

    return () => {
      st.kill();
    };
  }, [projectsData.length]);

  // Clic sur un bouton de projet pour scroller directement à sa position
  const scrollToProject = (index) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + ((index + 0.15) / projectsData.length) * scrollableDistance;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="projects-scroll-section"
      aria-label="Section des Projets Réalisés"
    >
      
      {/* ── Fenêtre Viewport Sticky (Reste fixée pendant le scroll des projets) ── */}
      <div className="projects-scroll-sticky">

        {/* ── 1. Véritable Animation Cosmique (Soucoupe volante compacte + Faisceau animé + Planète + Étoiles) ── */}
        <UfoCosmicBeamAnimation />

        {/* ── Top Header : Grand Titre bien au milieu et parfaitement visible ── */}
        <header className="alien-header-container">
          <div className="alien-title-group">
            <div className="alien-eyebrow-badge">
              <RetroStar size={13} className="text-[#c084fc]" />
              <span>RÉALISATIONS PHARES</span>
              <RetroStar size={13} className="text-[#c084fc]" />
            </div>
            <h2 className="portfolio-section-heading">
              <span className="portfolio-section-heading-line portfolio-section-heading-line--main">PROJETS</span>{' '}
              <span className="portfolio-section-heading-line portfolio-section-heading-line--accent">RÉALISÉS</span>
            </h2>
          </div>
        </header>

        {/* ── 4. Conteneur Principal : Photo + Explication & Liens (SANS CARTE EN ARRIÈRE) ── */}
        <main className="alien-main-showcase">

          {/* ═════════════════════════════════════════════════════════
             COLONNE GAUCHE : PHOTO DU PROJET (Flottante, pure, sans boîte arrière)
             ═════════════════════════════════════════════════════════ */}
          <div className="alien-project-visual-stage">
            <figure 
              className="alien-project-image-frame"
              onClick={() => setSelectedProject(activeProject)}
              title={`Cliquer pour agrandir le projet ${activeProject.title}`}
            >
              <img 
                key={activeProject.id}
                src={activeProject.image} 
                alt={`Aperçu du projet ${activeProject.title}`} 
                className="alien-project-photo" 
                loading="eager"
                onError={(e) => {
                  const currentSrc = e.currentTarget.src;
                  if (currentSrc.endsWith('.jpg')) {
                    e.currentTarget.src = currentSrc.replace(/\.jpg$/, '.png');
                  } else if (currentSrc.endsWith('.png')) {
                    e.currentTarget.src = currentSrc.replace(/\.png$/, '.jpg');
                  }
                }}
              />

              {/* Overlay au survol discret pour inviter à agrandir */}
              <div className="alien-image-hover-overlay">
                <Eye size={22} />
                <span>Agrandir l'image</span>
              </div>
            </figure>
          </div>

          {/* ═════════════════════════════════════════════════════════
             COLONNE DROITE : EXPLICATION DU PROJET ET LIENS D'ACTION
             ═════════════════════════════════════════════════════════ */}
          <article className="alien-project-content-stage">
            
            {/* Numéro, Catégorie et Statut */}
            <div className="alien-meta-eyebrow">
              <span className="alien-serial-tag">[{activeProject.number}]</span>
              <span>✦</span>
              <span>{activeProject.categoryLabel}</span>
              <span>·</span>
              <span className="alien-year-badge">{activeProject.badge} · {activeProject.year}</span>
            </div>

            {/* Grand Titre du Projet */}
            <h3 className="alien-content-title">
              {activeProject.title}
            </h3>

            {/* Description principale fluide et bien équilibrée */}
            <p className="alien-content-desc">
              {activeProject.shortDesc}
            </p>

            {/* Faits saillants et résultats */}
            <div className="alien-highlights-stack">
              {activeProject.highlights.map((item, idx) => (
                <div key={idx} className="alien-highlight-bullet">
                  <RetroStar size={12} className="alien-bullet-star" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Tags Technologiques */}
            <div className="alien-tech-row">
              {activeProject.tags.map((tech, i) => (
                <span key={i} className="alien-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* Liens d'action directs (visibles immédiatement) */}
            <div className="alien-actions-row">
              {/* Lien Démo Live */}
              <a 
                href={activeProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="alien-btn-demo"
                title="Ouvrir la démo du projet"
              >
                <span>{activeProject.category === 'mobile' ? 'Démo App' : 'Démo Live'}</span>
                <ExternalLink size={15} />
              </a>

              {/* Lien Code Source GitHub */}
              <a 
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="alien-btn-code"
                title="Explorer le code source sur GitHub"
              >
                <GithubIcon size={16} />
                <span>Code Source</span>
              </a>

              {/* Bouton Étude de Cas (Modal) */}
              <button
                type="button"
                onClick={() => setSelectedProject(activeProject)}
                className="alien-btn-case"
                title="Consulter l'étude de cas complète"
              >
                <Eye size={14} />
                <span>Étude de cas</span>
              </button>
            </div>

          </article>

        </main>

        {/* ── 5. Dock de Navigation / Pilules en bas, centré ── */}
        <footer className="alien-footer-dock">
          <nav className="alien-scroll-progress-pills" aria-label="Progression des projets">
            {projectsData.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={`alien-scroll-pill-btn ${idx === activeIdx ? 'active' : ''}`}
                onClick={() => scrollToProject(idx)}
                title={`Aller à ${p.title}`}
              >
                <span>0{idx + 1}</span>
                {idx === activeIdx && <span>· {p.title}</span>}
              </button>
            ))}
          </nav>
        </footer>

      </div>

      {/* ── 7. Modal d'Étude de Cas Détaillée ── */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div className="modal-scroll-body">
              <div className="modal-media-header">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-banner-img"
                  onError={(e) => {
                    const currentSrc = e.currentTarget.src;
                    if (currentSrc.endsWith('.jpg')) {
                      e.currentTarget.src = currentSrc.replace(/\.jpg$/, '.png');
                    } else if (currentSrc.endsWith('.png')) {
                      e.currentTarget.src = currentSrc.replace(/\.png$/, '.jpg');
                    }
                  }}
                />
                <div className="modal-media-caption">
                  <span className="badge-pill">{selectedProject.categoryLabel}</span>
                  <h2>{selectedProject.title}</h2>
                </div>
              </div>

              <div className="modal-content-grid">
                <div className="modal-main-desc">
                  <h3>À propos du projet</h3>
                  <p>{selectedProject.fullDesc}</p>

                  <h3 style={{ marginTop: '24px' }}>Points Clés &amp; Résultats</h3>
                  <ul className="modal-highlights-list">
                    {selectedProject.highlights.map((h, idx) => (
                      <li key={idx}>
                        <Star size={16} className="highlight-star" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-sidebar">
                  <div className="modal-side-card">
                    <h4>Technologies employées</h4>
                    <div className="project-tags" style={{ marginTop: '12px' }}>
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="modal-actions" style={{ marginTop: '24px' }}>
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-cta-primary"
                      >
                        <ExternalLink size={16} />
                        <span>{selectedProject.category === 'mobile' ? 'Découvrir l\'application' : 'Ouvrir la démo live'}</span>
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-cta-secondary"
                      >
                        <GithubIcon size={16} />
                        <span>Explorer le code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
