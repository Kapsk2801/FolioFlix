import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Zap, Star } from 'lucide-react';
import { Profile } from '../data/profiles';

interface SkillsProps {
  profile: Profile;
}

const Skills: React.FC<SkillsProps> = ({ profile }) => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Updated skills for Saksham
  const skills = profile.id === 'saksham' ? [
    { name: 'Python', level: 85, category: 'Programming Languages' },
    { name: 'Java', level: 80, category: 'Programming Languages' },
    { name: 'HTML', level: 95, category: 'Programming Languages' },
    { name: 'CSS', level: 90, category: 'Programming Languages' },
    { name: 'JavaScript', level: 88, category: 'Programming Languages' },
    { name: 'MySQL', level: 75, category: 'Database' },
    { name: 'SQLite', level: 70, category: 'Database' },
    { name: 'Firebase', level: 65, category: 'Database' },
    { name: 'Node.js', level: 82, category: 'Backend & Frameworks' },
    { name: 'Express.js', level: 78, category: 'Backend & Frameworks' },
    { name: 'REST APIs', level: 85, category: 'Backend & Frameworks' },
    { name: 'Generative AI', level: 70, category: 'Backend & Frameworks' },
    { name: 'JWT Authentication', level: 75, category: 'Backend & Frameworks' },
    { name: 'React.js', level: 88, category: 'Web Development' },
    { name: 'Git & GitHub', level: 85, category: 'Web Development' },
    { name: 'Tailwind CSS', level: 90, category: 'Web Development' },
    { name: 'VS Code', level: 95, category: 'Tools & Productivity' },
    { name: 'Postman', level: 80, category: 'Tools & Productivity' },
    { name: 'Power BI', level: 65, category: 'Tools & Productivity' },
    { name: 'Figma', level: 70, category: 'Tools & Productivity' },
    { name: 'Google Workspace', level: 85, category: 'Tools & Productivity' },
    { name: 'Microsoft Office', level: 90, category: 'Tools & Productivity' }
  ] : profile.skills;

  const categories = {
    'Programming Languages': skills.filter(s => s.category === 'Programming Languages'),
    'Database': skills.filter(s => s.category === 'Database'),
    'Backend & Frameworks': skills.filter(s => s.category === 'Backend & Frameworks'),
    'Web Development': skills.filter(s => s.category === 'Web Development'),
    'Tools & Productivity': skills.filter(s => s.category === 'Tools & Productivity')
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Technical </span>
            <span className="text-red-600">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {Object.entries(categories).map(([category, categorySkills], categoryIndex) => (
            <div 
              key={category} 
              className={`bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-800/50 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Code size={24} />
                </div>
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-red-600/50 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: `${(categoryIndex * 200) + (index * 100)}ms`,
                      animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="text-2xl font-bold text-red-500">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateProgress ? `${skill.level}%` : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-800/50">
            <div className="text-3xl font-bold text-red-500 mb-2">{skills.length}</div>
            <div className="text-gray-400">Total Skills</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-800/50">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
            <div className="text-gray-400">Average Level</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-800/50">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {skills.filter(s => s.level >= 80).length}
            </div>
            <div className="text-gray-400">Advanced Skills</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-800/50">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {Object.keys(categories).length}
            </div>
            <div className="text-gray-400">Categories</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;