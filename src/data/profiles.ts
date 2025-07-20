export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  github: string;
  linkedin: string;
  email: string;
  resume: string;
  skills: Skill[];
  projects: Project[];
  about: {
    experience: string;
    passion: string;
    stats: {
      projects: number;
      years: number;
    };
  };
}

export const profiles: Profile[] = [
  {
    id: 'saksham',
    name: 'Saksham Rajeev Kapoor',
    role: 'Full Stack Developer & UI/UX Enthusiast',
    description: 'Crafting exceptional digital experiences with modern technologies. Passionate about creating clean, efficient code and beautiful user interfaces.',
    avatar: '👨‍💻',
    github: 'https://github.com/sakshamkapoor',
    linkedin: 'https://linkedin.com/in/sakshamkapoor',
    email: 'mailto:saksham@example.com',
    resume: '#',
    skills: [
      { name: 'React/Next.js', level: 95, category: 'Frontend' },
      { name: 'TypeScript', level: 90, category: 'Language' },
      { name: 'Node.js/Express', level: 88, category: 'Backend' },
      { name: 'Python/Django', level: 85, category: 'Backend' },
      { name: 'PostgreSQL/MongoDB', level: 82, category: 'Database' },
      { name: 'AWS/Docker', level: 80, category: 'DevOps' },
      { name: 'Tailwind CSS', level: 92, category: 'Styling' },
      { name: 'GraphQL', level: 78, category: 'API' }
    ],
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 3,
        title: 'AI Image Generator',
        description: 'An AI-powered image generation tool using machine learning models with a beautiful user interface.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      }
    ],
    about: {
      experience: 'With over 5 years of experience in web development, I specialize in creating modern, responsive applications using cutting-edge technologies. My journey started with a curiosity about how websites work, and it has evolved into a passion for crafting exceptional digital experiences.',
      passion: 'I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.',
      stats: {
        projects: 50,
        years: 5
      }
    }
  },
  {
    id: 'aayush',
    name: 'Aayush Chawla',
    role: 'Full Stack Developer & Tech Enthusiast',
    description: 'Building innovative solutions with cutting-edge technologies. Focused on scalable architecture and user-centric design.',
    avatar: '👨‍💻',
    github: 'https://github.com/aayushchawla',
    linkedin: 'https://linkedin.com/in/aayushchawla',
    email: 'mailto:aayush@example.com',
    resume: '#',
    skills: [
      { name: 'Vue.js/Nuxt.js', level: 92, category: 'Frontend' },
      { name: 'JavaScript/TypeScript', level: 88, category: 'Language' },
      { name: 'Laravel/PHP', level: 85, category: 'Backend' },
      { name: 'MySQL/MongoDB', level: 80, category: 'Database' },
      { name: 'Docker/Kubernetes', level: 78, category: 'DevOps' },
      { name: 'SCSS/Stylus', level: 90, category: 'Styling' },
      { name: 'REST APIs', level: 85, category: 'API' },
      { name: 'Microservices', level: 75, category: 'Architecture' }
    ],
    projects: [
      {
        id: 1,
        title: 'Social Media Platform',
        description: 'A modern social media platform with posts, stories, messaging, and real-time notifications built with Vue.js and Laravel.',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Vue.js', 'Laravel', 'MySQL', 'Socket.io'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 2,
        title: 'Microservices Architecture',
        description: 'A scalable microservices-based application with Docker containers, Kubernetes orchestration, and API gateway.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Docker', 'Kubernetes', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 3,
        title: 'Real-time Chat Application',
        description: 'A real-time chat application with video calling, file sharing, and group management features.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Vue.js', 'WebRTC', 'Socket.io', 'Express'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      }
    ],
    about: {
      experience: 'With 4 years of experience in full-stack development, I focus on building scalable and maintainable applications. My expertise lies in Vue.js ecosystem and Laravel framework, creating robust solutions for complex business requirements.',
      passion: 'I\'m passionate about microservices architecture and cloud-native development. When not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.',
      stats: {
        projects: 35,
        years: 4
      }
    }
  }
];

export const getProfileById = (id: string): Profile | undefined => {
  return profiles.find(profile => profile.id === id);
}; 