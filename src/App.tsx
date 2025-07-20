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
    <div className="bg-black text-white min-h-screen">
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
  );
}

export default App;