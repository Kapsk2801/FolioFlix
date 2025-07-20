import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { profiles, Profile } from '../data/profiles';

interface ProfileSelectorProps {
  selectedProfile: Profile;
  onProfileSelect: (profile: Profile) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  selectedProfile,
  onProfileSelect,
  isOpen,
  onToggle
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleProfileClick = (profile: Profile) => {
    console.log('ProfileSelector: Clicking profile:', profile.name);
    onProfileSelect(profile);
    onToggle(); // Close dropdown
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors duration-300 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700 hover:border-red-500/50"
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
        <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3 text-center">Choose Profile</h3>
            <div className="space-y-2">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleProfileClick(profile)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    selectedProfile.id === profile.id
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${
                    selectedProfile.id === profile.id ? 'bg-red-600' : 'bg-red-500'
                  }`}>
                    {profile.avatar}
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-xs opacity-75 line-clamp-1">{profile.role}</div>
                  </div>
                  {selectedProfile.id === profile.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;