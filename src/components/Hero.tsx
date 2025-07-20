import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code, Database, Cloud, Zap, Star, Award, TrendingUp } from 'lucide-react';
import { Profile } from '../data/profiles';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current && savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

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

  // Quantum Code Rain effect state and refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rainActive, setRainActive] = useState(true);

  // Easter Egg: Secret Keyboard Combo ("FOLIO")
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState<string[]>([]);
  useEffect(() => {
    if (easterEggActive) return;
    const handler = (e: KeyboardEvent) => {
      setKeyBuffer(prev => {
        const next = [...prev, e.key.toUpperCase()].slice(-5);
        if (next.join('') === 'FOLIO') {
          setEasterEggActive(true);
        }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [easterEggActive]);

  // Confetti animation for Easter Egg
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!easterEggActive) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let confetti = Array.from({length: 120}, () => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 80 + 20,
      color: `hsl(${Math.random()*360},90%,60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    }));
    let angle = 0;
    let animationFrameId: number;
    function drawConfetti() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r/3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
      }
      updateConfetti();
      animationFrameId = requestAnimationFrame(drawConfetti);
    }
    function updateConfetti() {
      angle += 0.01;
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 3 + c.r/2) * 0.7;
        c.x += Math.sin(angle);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > height) {
          c.x = Math.random() * width;
          c.y = -10;
        }
      }
    }
    drawConfetti();
    return () => cancelAnimationFrame(animationFrameId);
  }, [easterEggActive]);

  // Live Animated Time/Date
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);
  // Responsive time string: short on mobile, full on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const timeString = isMobile
    ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  // Hacker Console Typing Effect
  const [consoleText, setConsoleText] = useState('');
  const [consoleIndex, setConsoleIndex] = useState(0);
  const [consoleQuote, setConsoleQuote] = useState(TECH_QUOTES[0]);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (consoleIndex < consoleQuote.length) {
      timeout = setTimeout(() => {
        setConsoleText(consoleQuote.slice(0, consoleIndex + 1));
        setConsoleIndex(consoleIndex + 1);
      }, 32);
    } else {
      timeout = setTimeout(() => {
        const nextQuote = TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)];
        setConsoleQuote(nextQuote);
        setConsoleText('');
        setConsoleIndex(0);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [consoleIndex, consoleQuote]);

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

  // Quantum Code Rain effect
  useEffect(() => {
    if (!rainActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    let mouse = { x: width / 2, y: height / 2 };
    const techWords = [profile.name, ...profile.skills.map(s => s.name), 'React', 'TypeScript', 'AI', 'Cloud', 'SQL', 'Node', 'Web', 'UI', 'UX'];
    const charset = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    let wordColumns: { [col: number]: string } = {};
    let wordTimers: { [col: number]: number } = {};

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < columns; i++) {
        // Occasionally pick a tech word for a column
        if (!wordColumns[i] && Math.random() < 0.002) {
          wordColumns[i] = techWords[Math.floor(Math.random() * techWords.length)].toUpperCase();
          wordTimers[i] = fontSize * wordColumns[i].length + Math.random() * 100;
        }
        // Draw word if assigned
        if (wordColumns[i]) {
          const word = wordColumns[i];
          for (let j = 0; j < word.length; j++) {
            let x = i * fontSize;
            let y = (drops[i] - word.length + j) * fontSize;
            // Mouse repulsion
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let offsetY = 0;
            if (dist < 120) offsetY = (120 - dist) * 0.7;
            ctx.fillStyle = `hsl(${340 + j * 10}, 80%, 60%)`;
            ctx.fillText(word[j], x + fontSize / 2, y - offsetY);
          }
          wordTimers[i]--;
          if (wordTimers[i] <= 0) {
            delete wordColumns[i];
            delete wordTimers[i];
          }
        } else {
          // Draw random character
          let x = i * fontSize;
          let y = drops[i] * fontSize;
          // Mouse repulsion
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let offsetY = 0;
          if (dist < 120) offsetY = (120 - dist) * 0.7;
          ctx.fillStyle = 'rgba(255, 60, 60, 0.7)';
          ctx.fillText(charset[Math.floor(Math.random() * charset.length)], x + fontSize / 2, y - offsetY);
        }
        // Move drop down
        if (Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
        if (drops[i] * fontSize > height + 100) drops[i] = 0;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();

    function handleMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, [profile, rainActive]);

  // Copy Email to Clipboard feature
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = useCallback(() => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [profile.email]);

  // Animated Aura State
  const [auraHovered, setAuraHovered] = useState(false);
  const [auraMouse, setAuraMouse] = useState({ x: 0.5, y: 0.5 });
  // Update aura color based on time
  const getAuraColor = () => {
    const hour = now.getHours();
    if (hour >= 6 && hour < 12) return 'from-cyan-400 to-blue-500'; // Morning
    if (hour >= 12 && hour < 18) return 'from-pink-500 to-yellow-400'; // Afternoon
    if (hour >= 18 && hour < 22) return 'from-purple-600 to-red-500'; // Evening
    return 'from-blue-900 to-purple-900'; // Night
  };
  // Tech glyphs for orbit
  const GLYPHS = ['<', '/', '>', '{', '}', '#', '@', '$', '%', '&'];

  // Add to Home Screen Smart Prompt (mobile only)
  const [showA2HS, setShowA2HS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const dismissed = localStorage.getItem('a2hs-dismissed');
    if (isMobile && !dismissed) {
      setShowA2HS(true);
    }
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  const handleA2HS = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setShowA2HS(false));
    }
    setShowA2HS(false);
    localStorage.setItem('a2hs-dismissed', '1');
  };
  const handleA2HSDismiss = () => {
    setShowA2HS(false);
    localStorage.setItem('a2hs-dismissed', '1');
  };

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Quantum Code Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          opacity: 0.18,
          mixBlendMode: 'lighten',
          filter: 'blur(0.5px) brightness(1.2)',
          transition: 'opacity 0.5s',
        }}
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Confetti Canvas for Easter Egg */}
      {easterEggActive && (
        <canvas
          ref={confettiCanvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-50"
          style={{ opacity: 0.7, pointerEvents: 'none' }}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      {/* Easter Egg Message */}
      {easterEggActive && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-red-400 px-8 py-6 rounded-2xl shadow-2xl border-2 border-red-600 text-3xl font-bold animate-pulse">
          <span>✨ You found the secret! ✨</span>
        </div>
      )}
      {/* Live Time/Date Display */}
      <div className="fixed top-6 right-4 sm:right-8 z-30 bg-black/60 px-3 sm:px-4 py-2 rounded-lg shadow border border-red-700 text-red-300 text-lg font-mono flex flex-col items-end animate-fade-in">
        <span className="tracking-widest text-xl sm:text-2xl font-bold animate-pulse">{timeString}</span>
        <span className="text-xs opacity-80 animate-fade-in-slow">{dateString}</span>
      </div>
      {/* Hacker Console Typing Effect removed */}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
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
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 relative flex flex-col items-center justify-center">
            <span className="text-white">Hello, I'm </span>
            <span className="relative text-red-600 hover:text-red-500 transition-all duration-500">
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
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 px-4">
              {topSkills.map((skill, index) => (
                <div
                  key={skill.name + '-' + index}
                  className="group flex items-center gap-1 sm:gap-2 bg-black/40 backdrop-blur-sm text-red-300 px-3 sm:px-4 py-2 rounded-full border border-red-600/30 hover:bg-red-600/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-600/25 cursor-pointer"
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
                  <span className="text-xs sm:text-sm font-medium">{skill.name}</span>
                  <span className="text-xs opacity-75 bg-red-600/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">{skill.level}%</span>
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
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group relative text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-600/25"
                style={{ 
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setHoveredElement(social.label)}
                onMouseLeave={() => setHoveredElement(null)}
                aria-label={social.label}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></div>
                <social.icon size={24} className="relative z-10 group-hover:animate-pulse" />
              </a>
            ))}
            {/* Copy Email Button removed */}
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

      {/* Add to Home Screen Smart Prompt (mobile only) */}
      {showA2HS && (
        <div className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between bg-black/90 text-white px-4 py-3 sm:py-2 border-t border-pink-600 shadow-lg animate-fade-in" style={{fontSize: '1rem'}}>
          <span className="flex-1 text-sm sm:text-base">Add this site to your home screen for a better app experience!</span>
          <button
            onClick={handleA2HS}
            className="ml-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-3 rounded shadow transition-all duration-200"
            style={{fontSize: '0.95rem'}}>
            Add
          </button>
          <button
            onClick={handleA2HSDismiss}
            className="ml-2 text-gray-300 hover:text-white text-xl font-bold px-2 focus:outline-none"
            aria-label="Dismiss add to home screen prompt"
          >
            ×
          </button>
        </div>
      )}

      {/* CSS for smooth animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fade-in-slow {
          animation: fadeIn 2.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-blink {
          animation: blink 1.1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
        .animate-aura-glow {
          animation: auraGlow 2.5s ease-in-out infinite alternate;
        }
        @keyframes auraGlow {
          0% { box-shadow: 0 0 32px 8px #f43f5e33, 0 0 0 0 #fff0; }
          100% { box-shadow: 0 0 64px 24px #f43f5e66, 0 0 0 0 #fff0; }
        }
        .aura-intense {
          animation-duration: 1.1s !important;
          opacity: 1 !important;
          filter: blur(2px) brightness(1.3);
        }
        .animate-orbit {
          animation: orbit 2.5s linear infinite;
        }
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

// Tech quotes for hacker console
const TECH_QUOTES = [
  'Code is like humor. When you have to explain it, it’s bad.',
  'First, solve the problem. Then, write the code.',
  'Experience is the name everyone gives to their mistakes.',
  'In order to be irreplaceable, one must always be different.',
  'Java is to JavaScript what car is to Carpet.',
  'Knowledge is power.',
  'Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.',
  'Fix the cause, not the symptom.',
  'Optimism is an occupational hazard of programming.',
  'Simplicity is the soul of efficiency.'
];

export default Hero;