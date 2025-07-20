import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code, Database, Cloud, Zap, Star, Award, TrendingUp } from 'lucide-react';
import { Profile } from '../data/profiles';

interface HeroProps {
  profile: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSkills, setShowSkills] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [skillCounter, setSkillCounter] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  // Initialize floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        y: particle.y < -10 ? window.innerHeight + 10 : particle.y - particle.speed
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading progress with smoother animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5; // Smoother increment
      });
    }, 25); // Faster updates for smoother animation

    return () => clearInterval(progressInterval);
  }, [profile.id]);

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setParallaxOffset({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Typing animation effect with smoother timing
  useEffect(() => {
    if (loadingProgress >= 100) {
      const roleText = profile.role;
      if (currentIndex < roleText.length) {
        const timeout = setTimeout(() => {
          setTypedText(roleText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 80); // Faster typing for smoother feel
        return () => clearTimeout(timeout);
      } else {
        // Show skills after typing is complete
        setTimeout(() => setShowSkills(true), 300);
      }
    }
  }, [currentIndex, profile.role, loadingProgress]);

  // Animate skill counter
  useEffect(() => {
    if (showSkills) {
      const targetCount = profile.skills.length;
      const increment = targetCount / 30;
      let currentCount = 0;
      
      const counterInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          setSkillCounter(targetCount);
          clearInterval(counterInterval);
        } else {
          setSkillCounter(Math.floor(currentCount));
        }
      }, 50);

      return () => clearInterval(counterInterval);
    }
  }, [showSkills, profile.skills.length]);

  // Get top skills for badges
  const topSkills = profile.skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  const getSkillIcon = (skillName: string) => {
    if (skillName.toLowerCase().includes('react') || skillName.toLowerCase().includes('frontend')) return <Code size={16} />;
    if (skillName.toLowerCase().includes('database') || skillName.toLowerCase().includes('sql')) return <Database size={16} />;
    if (skillName.toLowerCase().includes('aws') || skillName.toLowerCase().includes('cloud')) return <Cloud size={16} />;
    return <Zap size={16} />;
  };

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-red-500/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced loading overlay with smoother animation */}
      {loadingProgress < 100 && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white text-lg mb-2 animate-pulse">Loading Profile</div>
            <div className="w-64 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-sm mt-2 animate-pulse">{loadingProgress}%</div>
          </div>
        </div>
      )}

      {/* Parallax background with smooth movement */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.05) 0%, transparent 50%)`,
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      {/* Animated grid pattern with smooth movement */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Enhanced gradient text with smooth animation */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Hello, I'm </span>
            <span 
              className="relative text-red-600 hover:text-red-500 transition-all duration-500"
            >
              {profile.name}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-pulse"></span>
            </span>
          </h1>
          
          {/* Enhanced typing animation with cursor */}
          <div className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed relative min-h-[2.5rem]">
            <span className="relative z-10">
              {typedText}
              <span className="animate-pulse text-red-500">|</span>
            </span>
          </div>
          
          {/* Enhanced skill badges with hover effects */}
          {showSkills && (
            <div className="flex justify-center gap-3 mb-8">
              {topSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group flex items-center gap-2 bg-black/40 backdrop-blur-sm text-red-300 px-4 py-2 rounded-full border border-red-600/30 hover:bg-red-600/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-600/25 cursor-pointer"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    transform: hoveredElement === skill.name ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredElement(skill.name)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className="group-hover:rotate-12 transition-transform duration-300">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs opacity-75 bg-red-600/20 px-2 py-1 rounded-full">{skill.level}%</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Enhanced description with fade-in */}
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            {profile.description}
          </p>
          
          {/* Enhanced buttons with micro-interactions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a 
              href={profile.resume}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 flex items-center gap-2 overflow-hidden"
              style={{
                transform: hoveredElement === 'resume' ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={() => setHoveredElement('resume')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Download size={20} className="group-hover:animate-bounce" />
                Download Resume
              </span>
            </a>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative border-2 border-red-600 text-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden"
              style={{
                transform: hoveredElement === 'contact' ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={() => setHoveredElement('contact')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative z-10">Get In Touch</span>
            </button>
          </div>
          
          {/* Enhanced social icons with smooth hover effects */}
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, href: profile.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: profile.email, label: 'Email' }
            ].map((social, index) => (
              <a
                key={`${profile.id}-${social.label}`}
                href={social.href}
                className="group relative text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-600/25"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: hoveredElement === social.label ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setHoveredElement(social.label)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></div>
                <social.icon size={24} className="relative z-10 group-hover:animate-pulse" />
              </a>
            ))}
          </div>

          {/* Dynamic skill counter */}
          {showSkills && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-red-600/30">
                <span className="text-red-400 text-sm">Mastered</span>
                <span className="text-red-500 font-bold text-lg">{skillCounter}</span>
                <span className="text-red-400 text-sm">Technologies</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced scroll indicator with smooth animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative">
          <div className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center relative overflow-hidden">
            <div className="w-1 h-3 bg-gradient-to-b from-red-600 to-red-500 rounded-full mt-2 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent"></div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* CSS for smooth animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;