import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import Logo from './Logo';
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400 mb-4 md:mb-0">
            <Logo size="sm" />
            <span className="text-sm sm:text-base">Made with</span>
            <Heart className="text-red-500 sm:w-4 sm:h-4" size={14} fill="currentColor" />
            <span className="text-sm sm:text-base">by {profile.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 {profile.name}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;