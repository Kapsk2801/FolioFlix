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

  // Add state for tech joke toast
  const [showJokeToast, setShowJokeToast] = useState(false);
  const [jokeToastMessage, setJokeToastMessage] = useState('');
  // Array of tech jokes
  const techJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "I would tell you a UDP joke, but you might not get it.",
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "To understand recursion, you must first understand recursion.",
    "Why do Java developers wear glasses? Because they don't see sharp.",
    "Real programmers count from 0."
  ];
  // Handler for skill badge click
  const handleSkillClick = () => {
    const randomJoke = techJokes[Math.floor(Math.random() * techJokes.length)];
    setJokeToastMessage(randomJoke);
    setShowJokeToast(true);
    setTimeout(() => setShowJokeToast(false), 3500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: if intersection observer doesn't work, trigger after 1 second
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
        setTimeout(() => setAnimateProgress(true), 500);
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isVisible]);

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
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Technical </span>
            <span className="text-red-600">Skills</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {Object.entries(categories).map(([category, categorySkills], categoryIndex) => (
            <div 
              key={category} 
              className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-800/50 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
                  <Code size={20} className="sm:w-6 sm:h-6" />
                </div>
                {category}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {categorySkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 border border-gray-700/50 hover:border-red-600/50 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: `${(categoryIndex * 200) + (index * 100)}ms`,
                      animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                    }}
                    onClick={handleSkillClick}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">{skill.name}</h4>
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div
                        className="h-2 sm:h-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
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
        <div className={`mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-gray-800/50">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">{skills.length}</div>
            <div className="text-gray-400 text-sm sm:text-base">Total Skills</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-gray-800/50">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Average Level</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-gray-800/50">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
              {skills.filter(s => s.level >= 80).length}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Advanced Skills</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-gray-800/50">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
              {Object.keys(categories).length}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Categories</div>
          </div>
        </div>
      </div>

      {/* Tech Joke Toast */}
      {showJokeToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg border border-red-600 z-50 animate-fade-in text-sm">
          {jokeToastMessage}
        </div>
      )}

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