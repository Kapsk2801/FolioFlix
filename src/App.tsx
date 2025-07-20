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

  // Add mascot state and logic
  const mascotJokes = [
    "Why do Java developers wear glasses? Because they don't see sharp!",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
    "To understand recursion, you must first understand recursion.",
    "Why do programmers hate nature? It has too many bugs.",
    "I would tell you a UDP joke, but you might not get it.",
    "Debugging: Being the detective in a crime movie where you are also the murderer.",
    "Real programmers count from 0."
  ];
  const [showMascot, setShowMascot] = useState(false);
  const [mascotJoke, setMascotJoke] = useState(mascotJokes[0]);
  const [mascotDirection, setMascotDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    const startMascot = () => {
      setMascotJoke(mascotJokes[Math.floor(Math.random() * mascotJokes.length)]);
      setMascotDirection(Math.random() > 0.5 ? 'right' : 'left');
      setShowMascot(true);
      timer = setTimeout(() => setShowMascot(false), 12000); // mascot walks for 12s
    };
    startMascot();
    interval = setInterval(startMascot, 45000); // every 45s
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

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

      {/* Animated Mascot */}
      {showMascot && (
        <div
          className="fixed bottom-8 left-0 w-full flex items-end pointer-events-none z-[100]"
          style={{ height: 120 }}
        >
          <div
            className="relative"
            style={{
              left: mascotDirection === 'right' ? 0 : '100%',
              animation: mascotDirection === 'right'
                ? 'mascot-walk-right 12s linear forwards'
                : 'mascot-walk-left 12s linear forwards',
              width: 120,
              height: 100
            }}
          >
            {/* Mascot: Animated Pixel Duck (SVG with walk effect) */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 80, height: 80, transform: mascotDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <ellipse cx="40" cy="55" rx="22" ry="18" fill="#ffe066" stroke="#fbbf24" strokeWidth="3"/>
                {/* Head */}
                <ellipse cx="55" cy="40" rx="13" ry="12" fill="#ffe066" stroke="#fbbf24" strokeWidth="3"/>
                {/* Beak */}
                <ellipse cx="67" cy="43" rx="5" ry="2.5" fill="#f59e42"/>
                {/* Eye */}
                <ellipse cx="60" cy="38" rx="2" ry="2.5" fill="#222"/>
                {/* Wing */}
                <ellipse cx="35" cy="60" rx="7" ry="4" fill="#fbbf24"/>
                {/* Animated Feet */}
                <g>
                  <rect x="32" y="70" width="6" height="6" rx="2" fill="#f59e42">
                    <animate attributeName="y" values="70;74;70" keyTimes="0;0.5;1" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                  <rect x="42" y="70" width="6" height="6" rx="2" fill="#f59e42">
                    <animate attributeName="y" values="74;70;74" keyTimes="0;0.5;1" dur="0.6s" repeatCount="indefinite" />
                  </rect>
                </g>
              </svg>
            </div>
            {/* Sign with joke (never mirrored) */}
            <div style={{ position: 'absolute', left: 70, bottom: 40, minWidth: 180, maxWidth: 260, transform: 'none' }}>
              <div className="bg-white text-black border-2 border-yellow-400 rounded-lg shadow-lg px-4 py-2 text-sm font-bold animate-fade-in">
                {mascotJoke}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Animated Mascot */}

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

        @keyframes mascot-walk-right {
          0% { left: 0; }
          100% { left: calc(100vw - 120px); }
        }
        @keyframes mascot-walk-left {
          0% { left: calc(100vw - 120px); }
          100% { left: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;