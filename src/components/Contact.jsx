import React, { useRef, useState } from 'react';
import usePortfolioHeadingMotion from './usePortfolioHeadingMotion';
import { 
  Send, 
  Mail, 
  Sparkles, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  CheckCircle
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import RetroStar from './RetroStar';

export default function Contact({ profileData }) {
  const contactHeadingRef = useRef(null);
  const contactLine1Ref = useRef(null);
  const contactLine2Ref = useRef(null);
  usePortfolioHeadingMotion(contactHeadingRef, contactLine1Ref, contactLine2Ref);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Application Web React',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#b8b0f8', '#9e98eb', '#fdfbff', '#d8d2ff']
    });

    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Application Web React',
      message: ''
    });
  };

  return (
    <section id="contact" className="section-container contact-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <RetroStar size={18} />
          <span>Donnons vie à vos idées</span>
          <RetroStar size={18} />
        </div>
        <h2 ref={contactHeadingRef} className="section-title portfolio-section-heading">
          <span ref={contactLine1Ref} className="portfolio-section-heading-line portfolio-section-heading-line--main">Créons ensemble</span><br />
          <span ref={contactLine2Ref} className="portfolio-section-heading-line portfolio-section-heading-line--accent">quelque chose de magique.</span>
        </h2>
        <p className="section-subtitle">
          Vous avez un projet en tête, une opportunité ou souhaitez simplement échanger ? Mon formulaire et mes messages sont ouverts.
        </p>
      </div>

      <div className="contact-main-card">
        {/* Left Column: Direct Connect & Details */}
        <div className="contact-info-panel">
          <div className="contact-info-header">
            <h3>Discutons de vive voix</h3>
            <p>
              Je réponds généralement en moins de 24 heures pour évaluer votre projet ou planifier un appel vidéo.
            </p>
          </div>

          <div className="contact-details-list">
            <div className="contact-detail-item">
              <div className="detail-icon-box">
                <Mail size={18} />
              </div>
              <div className="detail-text">
                <span className="detail-label">Email direct</span>
                <span className="detail-value">{profileData.email}</span>
                <button 
                  type="button" 
                  className="copy-chip-btn"
                  onClick={handleCopyEmail}
                  title="Copier l'email"
                >
                  {copied ? (
                    <>
                      <Check size={13} color="#4ade80" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon-box">
                <MapPin size={18} />
              </div>
              <div className="detail-text">
                <span className="detail-label">Localisation</span>
                <span className="detail-value">Télétravail & International (Partout dans le monde)</span>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon-box">
                <Clock size={18} />
              </div>
              <div className="detail-text">
                <span className="detail-label">Fuseau horaire & Profil</span>
                <span className="detail-value">+228 93 52 23 26 (Togo) • Projets Web & Mobile</span>
              </div>
            </div>
          </div>

          <div className="contact-social-footer">
            <span className="social-footer-title">Réseaux & Plateformes</span>
            <div className="contact-social-links">
              <a 
                href={profileData.linkedinUrl?.startsWith('http') ? profileData.linkedinUrl : `https://${profileData.linkedinUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-badge"
                title="Profil LinkedIn de Marie-Jade"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </a>
              <a 
                href={`https://tiktok.com/@${profileData.tiktokHandle?.replace('@', '')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-badge"
              >
                <TikTokIcon size={15} />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-panel">
          {submitted ? (
            <div className="form-success-card">
              <div className="success-icon-wrap">
                <CheckCircle size={48} color="#ffffff" />
              </div>
              <h3>Message envoyé avec succès </h3>
              <p>
                Merci <strong>{formData.name}</strong>, votre message a bien été transmis. Je reviens vers vous par email dans les plus brefs délais.
              </p>
              <button 
                type="button" 
                className="form-submit-btn"
                onClick={resetForm}
                style={{ marginTop: '24px' }}
              >
                <span>Envoyer un autre message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Votre Nom ou Entreprise</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Ex: Camille Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Votre Adresse Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="camille@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Type de Projet</label>
                <select 
                  id="projectType" 
                  name="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="Application Web React">Application Web React & Frontend</option>
                  <option value="Refonte UI/UX & E-Commerce">Refonte UI/UX & E-Commerce Haute Couture</option>
                  <option value="Site Vitrine & Expérience Créative">Site Vitrine & Expérience Créative</option>
                  <option value="Design System & Prototypage">Design System & Prototypage Figma</option>
                  <option value="Autre demande">Autre collaboration</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Votre Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  placeholder="Décrivez vos besoins, vos ambitions ou vos délais..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                <Send size={18} />
                <span>Envoyer le Message</span>
                <Sparkles size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
