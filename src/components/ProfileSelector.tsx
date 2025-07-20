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
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
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
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-4 text-center">Choose Profile</h3>
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`relative group cursor-pointer ${
                    selectedProfile.id === profile.id
                      ? 'bg-red-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  } rounded-lg transition-all duration-200`}
                  onMouseEnter={() => setHoveredProfile(profile.id)}
                  onMouseLeave={() => setHoveredProfile(null)}
                  onClick={() => handleProfileSwitch(profile)}
                >
                  <div className="flex items-center space-x-3 p-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                      selectedProfile.id === profile.id ? 'bg-red-600' : 'bg-red-500'
                    }`}>
                      {profile.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-xs opacity-75 line-clamp-1">{profile.role}</div>
                    </div>
                    {selectedProfile.id === profile.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Hover overlay for non-selected profiles */}
                  {selectedProfile.id !== profile.id && hoveredProfile === profile.id && (
                    <div className="absolute inset-0 bg-red-500/95 rounded-lg flex items-center justify-center transition-all duration-200">
                      <div className="text-white font-semibold text-sm flex items-center space-x-2">
                        <User size={16} />
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