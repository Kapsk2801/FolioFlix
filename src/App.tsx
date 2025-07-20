import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { profiles, Profile } from './data/profiles';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(profiles[0]);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Global Continuous Background */}
      <div className="fixed inset-0 bg-black"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-800/10"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/5 via-transparent to-red-800/5 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 text-white">
        <Header selectedProfile={selectedProfile} onProfileSelect={handleProfileSelect} />
        <main>
          <Hero key={`hero-${selectedProfile.id}`} profile={selectedProfile} />
          <About key={`about-${selectedProfile.id}`} profile={selectedProfile} />
          <Skills key={`skills-${selectedProfile.id}`} profile={selectedProfile} />
          <Projects key={`projects-${selectedProfile.id}`} profile={selectedProfile} />
          <Contact key={`contact-${selectedProfile.id}`} profile={selectedProfile} />
        </main>
        <Footer key={`footer-${selectedProfile.id}`} profile={selectedProfile} />
      </div>
    </div>
  );
}

export default App;