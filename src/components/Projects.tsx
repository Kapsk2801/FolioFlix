import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Github, X, Search, Filter, Sparkles, Eye, Code, ExternalLink } from 'lucide-react';
import { Profile } from '../data/profiles';

interface ProjectsProps {
  profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectLoadProgress, setProjectLoadProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simulate project loading
          setLoadingProjects(true);
          setProjectLoadProgress(0);
          
          const interval = setInterval(() => {
            setProjectLoadProgress(prev => {
              if (prev >= 100) {
                setLoadingProjects(false);
                clearInterval(interval);
                return 100;
              }
              return prev + 10;
            });
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openModal = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Get unique categories from projects
  const categories = useMemo(() => {
    const allCategories = profile.projects.flatMap(project => project.tags);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [profile.projects]);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return profile.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
                            project.tags.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [profile.projects, searchTerm, selectedCategory]);

  // Optimized search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Optimized category change handler
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Featured </span>
            <span className="text-red-600">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Explore my latest work and creative solutions
          </p>
          
          {/* Enhanced project counter with animation */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 text-gray-400 mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm">Showing</span>
            <span className="text-red-500 font-bold text-base sm:text-lg">
              {filteredProjects.length}
            </span>
            <span className="text-xs sm:text-sm">of {profile.projects.length} projects</span>
          </div>

          {/* Enhanced search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
            {/* Enhanced search bar */}
            <div className="relative group">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-red-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 py-2 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-300 w-full sm:w-64 group-hover:border-red-500/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Enhanced category filter */}
            <div className="relative group">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors duration-300" size={20} />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="pl-10 pr-8 py-2 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-red-600 transition-all duration-300 appearance-none cursor-pointer group-hover:border-red-500/50 w-full sm:w-auto"
                aria-label="Filter projects by category"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800 text-white">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Project loading animation */}
        {loadingProjects && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-white text-lg mb-2 animate-pulse">Loading Projects</div>
              <div className="w-64 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${projectLoadProgress}%` }}
                ></div>
              </div>
              <div className="text-gray-400 text-sm mt-2 animate-pulse">{projectLoadProgress}%</div>
            </div>
          </div>
        )}

        {/* Enhanced projects grid with staggered animations */}
        {!loadingProjects && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/25 border border-gray-700/50 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: hoveredProject === project.id ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => openModal(project.id)}
              >
                {/* Enhanced border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>
                
                {/* Enhanced project image with overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced floating action buttons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:rotate-12">
                      <Eye size={16} />
                    </div>
                  </div>

                  {/* Project type indicator */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Code size={12} />
                      {project.tags[0]}
                    </div>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                        <Sparkles size={12} />
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced project content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Enhanced tags with hover effects */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-300 text-sm rounded-full border border-red-600/30 hover:bg-gradient-to-r hover:from-red-600/40 hover:to-red-700/40 transition-all duration-300 transform hover:scale-105"
                        style={{
                          transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Enhanced action buttons */}
                  <div className="flex justify-between items-center">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-300 group/btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="group-hover/btn:animate-bounce" />
                      <span className="text-sm font-medium">View Code</span>
                      <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </a>
                    
                    <div className="text-xs text-gray-500">
                      Project #{project.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No projects found message */}
        {!loadingProjects && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={48} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adjusting your search terms or filter criteria to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {profile.projects.find(p => p.id === selectedProject)?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-800 rounded-lg"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <img
                  src={profile.projects.find(p => p.id === selectedProject)?.image}
                  alt={profile.projects.find(p => p.id === selectedProject)?.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <p className="text-gray-300 leading-relaxed">
                  {profile.projects.find(p => p.id === selectedProject)?.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {profile.projects.find(p => p.id === selectedProject)?.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-red-600/20 text-red-300 text-sm rounded-full border border-red-600/30">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={profile.projects.find(p => p.id === selectedProject)?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;