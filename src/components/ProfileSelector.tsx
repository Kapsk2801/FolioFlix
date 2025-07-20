import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { profiles, Profile } from '../data/profiles';

interface ProfileSelectorProps {
  selectedProfile: Profile;
  onProfileSelect: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  selectedProfile,
  onProfileSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown when profile changes
  useEffect(() => {
    setIsOpen(false);
  }, [selectedProfile.id]);

  const handleProfileSwitch = (profile: Profile) => {
    onProfileSelect(profile);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-all duration-300 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700 hover:border-red-500/50"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          {selectedProfile.avatar}
        </div>
        <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
          {selectedProfile.name.split(' ')[0]}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-600 overflow-hidden relative">
                <img 
                  src="/Logo.png" 
                  alt="FolioFlix Logo" 
                  className="absolute inset-0 w-full h-full object-cover transform translate-x-0.5 -translate-y-0.5"
                />
              </div>
              <h3 className="text-white font-semibold text-lg">Switch Profile</h3>
            </div>
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`relative group cursor-pointer ${
                    selectedProfile.id === profile.id
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  } rounded-lg transition-all duration-200`}
                  onMouseEnter={() => setHoveredProfile(profile.id)}
                  onMouseLeave={() => setHoveredProfile(null)}
                  onClick={() => handleProfileSwitch(profile)}
                >
                  <div className="flex items-center space-x-3 p-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg ${
                      selectedProfile.id === profile.id 
                        ? 'bg-gradient-to-br from-red-600 to-red-800' 
                        : 'bg-gradient-to-br from-red-500 to-red-700'
                    }`}>
                      {profile.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-xs opacity-75 line-clamp-1">{profile.role}</div>
                    </div>
                    {selectedProfile.id === profile.id && (
                      <div className="w-3 h-3 bg-white rounded-full shadow-sm flex items-center justify-center">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover overlay for non-selected profiles */}
                  {selectedProfile.id !== profile.id && hoveredProfile === profile.id && (
                    <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 border border-red-500/30">
                                        <div className="text-red-300 font-semibold text-sm flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-300 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-300 rounded-full"></div>
                    </div>
                    <span>Switch Account</span>
                  </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;