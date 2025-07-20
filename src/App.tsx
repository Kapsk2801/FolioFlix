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
  const [cursorTrail, setCursorTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new cursor trail point
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        // Keep only last 10 points
        return newTrail.slice(-10);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.filter(point => Date.now() - point.id < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced global background with animated elements */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-800/10 via-transparent to-red-800/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-red-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-red-500/30 rounded-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-red-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle moving dots */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-red-600/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Cursor trail effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((point, index) => (
          <div
            key={point.id}
            className="absolute w-1 h-1 bg-red-500/50 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              opacity: 1 - (index / cursorTrail.length),
              transform: `scale(${1 - (index / cursorTrail.length)})`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header 
          selectedProfile={selectedProfile} 
          onProfileSelect={setSelectedProfile} 
        />
        <Hero profile={selectedProfile} />
        <About profile={selectedProfile} />
        <Skills profile={selectedProfile} />
        <Projects profile={selectedProfile} />
        <Contact profile={selectedProfile} />
        <Footer profile={selectedProfile} />
      </div>

      {/* Smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #dc2626, #b91c1c);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ef4444, #dc2626);
        }
      `}</style>
    </div>
  );
}

export default App;