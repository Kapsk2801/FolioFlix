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
  phone: string;
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
    avatar: 'SK',
    github: 'https://github.com/Kapsk2801',
    linkedin: 'https://www.linkedin.com/in/sakshamrkapoor',
    email: 'mailto:kapoorsaksham25@gmail.com',
    phone: '+91 9876543210',
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
        title: 'Nirvana Fitness Tracker App',
        description: 'Designed and developed a fitness tracking app using Android Studio, featuring calorie tracking, custom workout plans, and meal recognition. Focused on creating a user-friendly interface with personalized health monitoring features to enhance user engagement and promote fitness goals.',
        image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Android Studio', 'Java', 'Fitness Tracking', 'UI/UX', 'Health Monitoring'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 2,
        title: 'Retrievio Lost & Found',
        description: 'Developed a Lost and Found web application for college users to report and locate lost items efficiently. Implemented audio narration features to support visually impaired users. Enabled user interactions through comments, claim submissions, and a verified approval process to ensure secure item recovery.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Web Development', 'Accessibility', 'User Management', 'Real-time Updates', 'Admin Dashboard'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 3,
        title: 'Indian Dietary Pattern Analysis',
        description: 'Analyzed Indian dietary patterns and their correlation with fitness levels across age groups. Developed interactive visualizations using Streamlit to explore macronutrient intake and fitness relationships. Identified key nutritional trends influencing physical health outcomes.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Python', 'Streamlit', 'Data Analysis', 'Visualization', 'Health Analytics'],
        demoUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        id: 4,
        title: 'VibedBack - Anonymous College Review Platform',
        description: 'An anonymous platform for college students to share reviews and experiences. Built with modern web technologies to provide a safe space for honest feedback while maintaining user privacy and data security.',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React', 'Node.js', 'Anonymous Reviews', 'Privacy', 'User Experience'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false
      },
      {
        id: 5,
        title: 'SkillSwap - Skill Exchange Platform',
        description: 'A platform where people can exchange skills and knowledge. Users can offer their expertise in exchange for learning new skills from others, creating a collaborative learning environment.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Skill Exchange', 'Collaborative Learning', 'User Matching', 'Community Building'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false
      },
      {
        id: 6,
        title: 'LostAndFound - College Item Recovery',
        description: 'A specialized lost and found system designed specifically for college campuses. Features include item categorization, location tracking, and streamlined recovery processes to help students quickly locate their lost belongings.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Campus Solution', 'Item Recovery', 'Location Tracking', 'Student Portal'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false
      }
    ],
    about: {
      experience: 'With 2+ years of experience in web development, I specialize in creating modern, responsive applications using cutting-edge technologies. My journey started with a curiosity about how websites work, and it has evolved into a passion for crafting exceptional digital experiences.',
      passion: 'I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, and collaborating with fellow developers.',
      stats: {
        projects: 6,
        years: 2
      }
    }
  },
  {
    id: 'aayush',
    name: 'Aayush Chawla',
    role: 'Full Stack Developer & Tech Enthusiast',
    description: 'Building innovative solutions with cutting-edge technologies. Focused on scalable architecture and user-centric design.',
    avatar: 'AC',
    github: 'https://github.com/Aayush-Chawla',
    linkedin: 'https://www.linkedin.com/in/aayush-chawla-1952b9224?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BXQTOXF71R3OqmV2BkS9eZQ%3D%3D',
    email: 'mailto:aayushchawla5554@gmail.com',
    phone: '+91 8765432109',
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
      experience: 'With 2+ years of experience in full-stack development, I focus on building scalable and maintainable applications. My expertise lies in Vue.js ecosystem and Laravel framework, creating robust solutions for complex business requirements.',
      passion: 'I\'m passionate about microservices architecture and cloud-native development. When not coding, I enjoy exploring new technologies, contributing to open-source projects, and collaborating with the developer community.',
      stats: {
        projects: 10,
        years: 2
      }
    }
  }
];

export const getProfileById = (id: string): Profile | undefined => {
  return profiles.find(profile => profile.id === id);
}; 