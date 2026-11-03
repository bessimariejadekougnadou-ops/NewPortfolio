import React, { useState } from 'react';
import { X, Check, RotateCcw, Sparkles } from 'lucide-react';
import RetroStar from './RetroStar';

export default function CustomizeModal({ 
  isOpen, 
  onClose, 
  profileData, 
  onSave, 
  defaultProfile 
}) {
  const [formData, setFormData] = useState({ ...profileData });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...defaultProfile });
    onSave(defaultProfile);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container customize-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="customize-modal-header">
          <div className="customize-title-row">
            <RetroStar size={24} />
            <h2>Personnaliser Votre Portfolio</h2>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <p className="customize-intro">
          Modifiez vos informations ci-dessous. Le portfolio s'adaptera instantanément avec vos propres coordonnées et votre nom !
        </p>

        <form onSubmit={handleSubmit} className="customize-form">
          <div className="form-group">
            <label htmlFor="custom-name">Nom complet (Signature Hero)</label>
            <input 
              type="text" 
              id="custom-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Bessi Marie-Jade"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-title">Titre & Rôle</label>
            <input 
              type="text" 
              id="custom-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Développeuse Web & Mobile Full Stack"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-email">Adresse Email</label>
            <input 
              type="email" 
              id="custom-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="bessimariejadekougnadou@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-phone">Numéro de Téléphone / WhatsApp</label>
            <input 
              type="text" 
              id="custom-phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+33 6 42 89 12 00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-tiktok">Handle TikTok</label>
            <input 
              type="text" 
              id="custom-tiktok"
              value={formData.tiktokHandle}
              onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
              placeholder="@mariejade.dev"
            />
          </div>

          <div className="form-group">
            <label htmlFor="custom-linkedin">Identifiant LinkedIn</label>
            <input 
              type="text" 
              id="custom-linkedin"
              value={formData.linkedinHandle}
              onChange={(e) => setFormData({ ...formData, linkedinHandle: e.target.value })}
              placeholder="Bessi Marie-Jade"
            />
          </div>

          <div className="customize-actions">
            <button 
              type="button" 
              className="btn-reset"
              onClick={handleReset}
              title="Restaurer les données par défaut de l'image"
            >
              <RotateCcw size={16} />
              <span>Restaurer défaut</span>
            </button>

            <button type="submit" className="btn-save">
              <Check size={18} />
              <span>Appliquer les modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
