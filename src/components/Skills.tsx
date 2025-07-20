import React, { useEffect, useRef, useState } from 'react';
import { Profile } from '../data/profiles';

interface SkillsProps {
  profile: Profile;
}

const Skills: React.FC<SkillsProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = profile.skills;
  

  const categories = [...new Set(skills.map(skill => skill.category))];

  useEffect(() => {
    // Reset animations when profile changes
    setIsVisible(false);
    setAnimatedBars([]);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimatedBars(new Array(skills.length).fill(true));
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [profile.id, skills.length]); // Re-run when profile changes

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Frontend: 'bg-red-500',
      Backend: 'bg-blue-500',
      Language: 'bg-green-500',
      Database: 'bg-purple-500',
      DevOps: 'bg-orange-500',
      Styling: 'bg-pink-500',
      API: 'bg-cyan-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCurrentlyLearning = () => {
    if (profile.id === 'saksham') {
      return ['Rust', 'WebAssembly', 'Three.js', 'Blockchain'];
    } else if (profile.id === 'aayush') {
      return ['Go', 'Kubernetes', 'GraphQL', 'Serverless'];
    }
    return ['React Native', 'Machine Learning', 'Cloud Computing'];
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            My <span className="text-red-500">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-16 rounded-full"></div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Expertise</h3>
              {skills.map((skill, index) => (
                <div key={`${profile.id}-${skill.name}`} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 ease-out ${
                        animatedBars[index] ? '' : 'w-0'
                      }`}
                      style={{ 
                        width: animatedBars[index] ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Skill Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
                  
                  return (
                    <div
                      key={`${profile.id}-${category}`}
                      className={`bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 ${isVisible ? 'animate-fadeIn' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-8 h-8 ${getCategoryColor(category)} rounded-lg mb-3 opacity-80`}></div>
                      <h4 className="text-white font-semibold mb-2">{category}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-full ${getCategoryColor(category)} rounded-full transition-all duration-1000`}
                            style={{ 
                              width: isVisible ? `${avgLevel}%` : '0%',
                              transitionDelay: `${index * 100}ms`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{Math.round(avgLevel)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl border border-red-500/20">
                <h4 className="text-white font-semibold mb-3">Currently Learning</h4>
                <div className="flex flex-wrap gap-2">
                  {getCurrentlyLearning().map((tech) => (
                    <span key={`${profile.id}-${tech}`} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;