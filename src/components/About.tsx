import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, GraduationCap, Briefcase, Award, Star } from 'lucide-react';
import { Profile } from '../data/profiles';

interface AboutProps {
  profile: Profile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const [animateStats, setAnimateStats] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateStats(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">About </span>
            <span className="text-red-600">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Passionate developer with a love for creating innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Personal Information */}
          <div className="space-y-8">
            <div className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-800/50 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
                  <Star size={20} className="sm:w-6 sm:h-6" />
                </div>
                Personal Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <MapPin size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div className="text-white font-medium">Mumbai, MH</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <GraduationCap size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Education</div>
                    <div className="text-white font-medium">
                      {profile.id === 'saksham' ? 'BCA, MCA' : 'BSc IT, MCA'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Briefcase size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Experience</div>
                    <div className="text-white font-medium">2+ Years</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg">
                  <div className="p-2 bg-red-600/20 rounded-lg">
                    <Award size={20} className="text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Specialization</div>
                    <div className="text-white font-medium">Full Stack Development</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statistics */}
            <div className={`grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-800/50">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1 sm:mb-2">
                  {animateStats ? profile.projects.length : 0}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Projects</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-800/50">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1 sm:mb-2">
                  {animateStats ? profile.skills.filter(s => s.level >= 80).length : 0}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Skills</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-800/50">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1 sm:mb-2">
                  {animateStats ? '2+' : '0'}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Years</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 text-center border border-gray-800/50">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1 sm:mb-2">
                  {animateStats ? profile.skills.length : 0}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Technologies</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-800/50 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
                <Calendar size={20} className="sm:w-6 sm:h-6" />
              </div>
              Journey Timeline
            </h3>
            
            <div className="space-y-6">
              <div className={`relative pl-8 border-l-2 border-red-600 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400">2020</div>
                  <div className="text-lg font-bold text-white mb-2">Started Programming Journey</div>
                  <div className="text-gray-300 text-sm">Began learning web development and programming fundamentals</div>
                </div>
              </div>

              <div className={`relative pl-8 border-l-2 border-red-600 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} style={{ transitionDelay: '1000ms' }}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400">2021</div>
                  <div className="text-lg font-bold text-white mb-2">
                    {profile.id === 'saksham' ? 'React & JavaScript Mastery' : 'First Project Completed'}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {profile.id === 'saksham' 
                      ? 'Became proficient in React.js, JavaScript, and modern frontend development'
                      : 'Built and deployed my first web application'
                    }
                  </div>
                </div>
              </div>

              <div className={`relative pl-8 border-l-2 border-red-600 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} style={{ transitionDelay: '1200ms' }}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400">2022</div>
                  <div className="text-lg font-bold text-white mb-2">
                    {profile.id === 'saksham' ? 'Full Stack Development' : 'Professional Experience'}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {profile.id === 'saksham'
                      ? 'Expanded into Node.js, Express.js, and database technologies'
                      : 'Started working on real-world projects and client work'
                    }
                  </div>
                </div>
              </div>

              <div className={`relative pl-8 border-l-2 border-red-600 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} style={{ transitionDelay: '1400ms' }}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400">2023</div>
                  <div className="text-lg font-bold text-white mb-2">
                    {profile.id === 'saksham' ? 'AI & Advanced APIs' : 'Advanced Technologies'}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {profile.id === 'saksham'
                      ? 'Worked with Generative AI, REST APIs, and JWT Authentication'
                      : 'Mastered modern frameworks and cloud technologies'
                    }
                  </div>
                </div>
              </div>

              <div className={`relative pl-8 border-l-2 border-red-600 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} style={{ transitionDelay: '1600ms' }}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-400">2024</div>
                  <div className="text-lg font-bold text-white mb-2">Portfolio Launch</div>
                  <div className="text-gray-300 text-sm">Created this comprehensive portfolio showcasing my work</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Description */}
        <div className={`mt-16 bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-800/50 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1800ms' }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">My Story</h3>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {profile.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;