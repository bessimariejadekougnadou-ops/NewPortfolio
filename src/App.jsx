import React, { useState, useEffect } from 'react';
import './App.css';
import AmbientSparkles from './components/AmbientSparkles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import CustomizeModal from './components/CustomizeModal';

const DEFAULT_PROFILE = {
  name: 'Bessi Marie-Jade',
  fullName: 'Bessi Marie-Jade Kougnadou',
  title: 'Développeuse Web & Mobile Full Stack',
  email: 'bessimariejadekougnadou@gmail.com',
  phone: '+228 93 52 23 26',
  linkedinHandle: 'Bessi Marie-Jade',
  linkedinUrl: 'https://www.linkedin.com/in/bessi-marie-jade-kougnadou-aa9194368',
};

export default function App() {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('editorial_portfolio_profile_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const handleSaveProfile = (newData) => {
    setProfileData(newData);
    localStorage.setItem('editorial_portfolio_profile_v4', JSON.stringify(newData));
  };



  return (
    <div className="app-wrapper">
      {/* Ambient floating twinkles */}
      <AmbientSparkles enabled={sparklesEnabled} />


      {/* Floating navigation pill */}
      <Navbar 
        profileData={profileData}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        sparklesEnabled={sparklesEnabled}
        onToggleSparkles={() => setSparklesEnabled(!sparklesEnabled)}
      />

      <main>
        {/* Hero Section — Exact reproduction & elevation of the user's reference image */}
        <Hero 
          profileData={profileData}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* About Me Section with 3D Avatar */}
        <About profileData={profileData} />

        {/* Tech Universe & Interactive Magic Playground */}
        <Skills />

        {/* Career Milestones */}
        <Experience />

        {/* Featured Projects with Case Study Modals */}
        <Projects />

        {/* Accreditations & Validated Certificates */}
        <Certificates profileData={profileData} />

        {/* Contact Form with Confetti */}
        <Contact profileData={profileData} />
      </main>

      {/* Footer */}
      <Footer profileData={profileData} />

      {/* Live Profile Customizer Modal */}
      <CustomizeModal 
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
        defaultProfile={DEFAULT_PROFILE}
      />
    </div>
  );
}
