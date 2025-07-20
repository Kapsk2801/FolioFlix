import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import Logo from './Logo';
import { Profile } from '../data/profiles';

interface HeaderProps {
  selectedProfile: Profile;
  onProfileSelect: (profile: Profile) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedProfile, onProfileSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
              <Logo size="md" />
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent hover:from-red-400 hover:to-red-200 transition-all duration-300">FolioFlix</span>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-2 sm:ml-6 lg:ml-10 flex items-baseline space-x-2 sm:space-x-4 lg:space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-red-500 px-1 sm:px-2 lg:px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <ProfileSelector
              selectedProfile={selectedProfile}
              onProfileSelect={onProfileSelect}
            />
          </div>
          
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <ProfileSelector
              selectedProfile={selectedProfile}
              onProfileSelect={onProfileSelect}
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-red-500 transition-all duration-300 p-1 relative group focus:outline-none"
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6 relative z-10" /> : <Menu size={20} className="sm:w-6 sm:h-6 relative z-10" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg rounded-lg mt-2 p-4 mx-2 sm:mx-4 border border-gray-700/50">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-red-500 text-left py-3 px-2 transition-all duration-300 text-sm sm:text-base hover:bg-red-500/10 rounded-lg group w-full"
                >
                  <span className="flex items-center gap-2">
                    {item}
                    <span className="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;