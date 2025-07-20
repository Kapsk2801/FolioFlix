import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import { Profile, Project } from '../data/profiles';

interface ProjectsProps {
  profile: Profile;
}

const Projects: React.FC<ProjectsProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = profile.projects;

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

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Featured <span className="text-red-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-16 rounded-full"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${isVisible ? 'animate-fadeIn' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="text-white" size={32} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.demoUrl}
                      className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Close project modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={selectedProject.demoUrl}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                >
                  <ExternalLink size={20} />
                  <span>View Demo</span>
                </a>
                <a
                  href={selectedProject.githubUrl}
                  className="border-2 border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;