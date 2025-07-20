import React, { useEffect, useRef, useState } from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import { Profile } from '../data/profiles';

interface AboutProps {
  profile: Profile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset visibility when profile changes
    setIsVisible(false);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [profile.id]); // Re-run when profile changes

  const highlights = [
    { icon: Code, title: 'Clean Code', description: 'Writing maintainable and efficient code' },
    { icon: Palette, title: 'Design Focus', description: 'Creating beautiful user experiences' },
    { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency' },
    { icon: Heart, title: 'Passion', description: 'Love for technology and innovation' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            About <span className="text-red-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-16 rounded-full"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Passionate Developer & Problem Solver
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {profile.about.experience}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                {profile.about.passion}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-red-500 mb-2">{profile.about.stats.projects}+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-red-500 mb-2">{profile.about.stats.years}+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={`${profile.id}-${item.title}`}
                  className={`bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 ${isVisible ? 'animate-fadeIn' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="text-red-500" size={24} />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;