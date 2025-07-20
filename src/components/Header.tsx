import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ProfileSelector from './ProfileSelector';
import { Profile } from '../data/profiles';

interface HeaderProps {
  selectedProfile: Profile;
  onProfileSelect: (profile: Profile) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedProfile, onProfileSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-600 overflow-hidden relative">
                <img 
                  src="/Logo.png" 
                  alt="FolioFlix Logo" 
                  className="absolute inset w-full h-full -translate-y-1 -translate-x object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">FolioFlix</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-red-500 px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <ProfileSelector
              selectedProfile={selectedProfile}
              onProfileSelect={onProfileSelect}
            />
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <ProfileSelector
              selectedProfile={selectedProfile}
              onProfileSelect={onProfileSelect}
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-red-500 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-red-500 text-left py-2 transition-colors duration-300"
                >
                  {item}
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