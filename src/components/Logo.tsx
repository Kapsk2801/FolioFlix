import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-16 sm:h-16'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    // Fallback text logo
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center font-bold text-white text-xs sm:text-sm ${className}`}>
        FF
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-600 overflow-hidden relative group ${className}`}>
      <img 
        src="/Logo.png" 
        alt="FolioFlix Logo" 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="eager"
        decoding="async"
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse"></div>
      )}
      <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default Logo; 