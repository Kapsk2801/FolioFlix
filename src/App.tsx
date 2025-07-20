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
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSelect = (profile: Profile) => {
    console.log('Switching to profile:', profile.name);
    setIsLoading(true);
    
    // Force a brief loading state to ensure clean re-render
    setTimeout(() => {
      setSelectedProfile(profile);
      setIsLoading(false);
      console.log('Profile switched to:', profile.name);
    }, 100);
  };

  // Debug logging
  useEffect(() => {
    console.log('Current selected profile:', selectedProfile.name);
    console.log('Profile skills:', selectedProfile.skills.map(s => s.name));
    console.log('Profile projects:', selectedProfile.projects.map(p => p.title));
  }, [selectedProfile]);

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Switching profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header selectedProfile={selectedProfile} onProfileSelect={handleProfileSelect} />
      <main>
        <Hero profile={selectedProfile} />
        <About profile={selectedProfile} />
        <Skills profile={selectedProfile} />
        <Projects profile={selectedProfile} />
        <Contact />
      </main>
      <Footer profile={selectedProfile} />
    </div>
  );
}

export default App;