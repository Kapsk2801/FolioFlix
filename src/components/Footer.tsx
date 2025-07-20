import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { Profile } from '../data/profiles';

interface FooterProps {
  profile: Profile;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 text-gray-400 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-600 overflow-hidden relative">
              <img 
                src="/Logo.png" 
                alt="FolioFlix Logo" 
                className="absolute inset-0 w-full h-full object-cover transform translate-x-0.5 -translate-y-0.5"
              />
            </div>
            <span>Made with</span>
            <Heart className="text-red-500" size={16} fill="currentColor" />
            <span>by {profile.name}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <p className="text-gray-400 text-sm">
              © 2024 {profile.name}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;