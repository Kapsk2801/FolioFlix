import React, { useEffect, useRef } from 'react';
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
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 text-gray-300 hover:text-red-500 transition-colors duration-300"
      >
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {selectedProfile.avatar}
        </div>
        <span className="hidden sm:block text-sm font-medium">
          {selectedProfile.name.split(' ')[0]}
        </span>
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3 text-center">Choose Profile</h3>
            <div className="space-y-3">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    onProfileSelect(profile);
                    onToggle();
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    selectedProfile.id === profile.id
                      ? 'bg-red-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-lg">
                    {profile.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-xs opacity-75">{profile.role}</div>
                  </div>
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