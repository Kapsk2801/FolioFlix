import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { profiles, Profile } from './data/profiles';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(profiles[0]); // Default to Saksham

  const handleProfileSelect = (profile: Profile) => {
    console.log('Switching to profile:', profile.name);
    setSelectedProfile(profile);
    // Force re-render by updating state
    setTimeout(() => {
      console.log('Profile switched to:', profile.name);
    }, 100);
  };

  console.log('Current profile:', selectedProfile.name);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header selectedProfile={selectedProfile} onProfileSelect={handleProfileSelect} />
      <main>
        <Hero key={selectedProfile.id} profile={selectedProfile} />
        <About key={selectedProfile.id} profile={selectedProfile} />
        <Skills key={selectedProfile.id} profile={selectedProfile} />
        <Projects key={selectedProfile.id} profile={selectedProfile} />
        <Contact />
      </main>
      <Footer key={selectedProfile.id} profile={selectedProfile} />
    </div>
  );
}

export default App;