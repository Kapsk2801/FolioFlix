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
    phone: '(+91 98765 43210) - not actual number',
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
        githubUrl: 'https://github.com/Aayush-Chawla/Nirvana-Fitness-App',
        featured: true
      },
      {
        id: 2,
        title: 'Retrievio Lost & Found',
        description: 'Developed a Lost and Found web application for college users to report and locate lost items efficiently. Implemented audio narration features to support visually impaired users. Enabled user interactions through comments, claim submissions, and a verified approval process to ensure secure item recovery.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Web Development', 'Accessibility', 'User Management', 'Real-time Updates', 'Admin Dashboard'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Kapsk2801/Lost-Found',
        featured: true
      },
      {
        id: 3,
        title: 'Indian Dietary Pattern Analysis',
        description: 'Analyzed Indian dietary patterns and their correlation with fitness levels across age groups. Developed interactive visualizations using Streamlit to explore macronutrient intake and fitness relationships. Identified key nutritional trends influencing physical health outcomes.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Python', 'Streamlit', 'Data Analysis', 'Visualization', 'Health Analytics'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Aayush-Chawla/Dietary-Patterns-DAP',
        featured: true
      },
      {
        id: 4,
        title: 'VibedBack - Anonymous College Review Platform',
        description: 'An anonymous platform for college students to share reviews and experiences. Built with modern web technologies to provide a safe space for honest feedback while maintaining user privacy and data security.',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React', 'Node.js', 'Anonymous Reviews', 'Privacy', 'User Experience'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Kapsk2801/VibedBack',
        featured: false
      },
      {
        id: 5,
        title: 'SkillSwap - Skill Exchange Platform',
        description: 'A platform where people can exchange skills and knowledge. Users can offer their expertise in exchange for learning new skills from others, creating a collaborative learning environment.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Skill Exchange', 'Collaborative Learning', 'User Matching', 'Community Building'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Kapsk2801/ChakDeCoders',
        featured: false
      }
    ],
    about: {
      experience: 'With 2+ years of experience in web development, I specialize in creating modern, responsive applications using cutting-edge technologies. My journey started with a curiosity about how websites work, and it has evolved into a passion for crafting exceptional digital experiences.',
      passion: 'I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, and collaborating with fellow developers.',
      stats: {
        projects: 5,
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
    phone: '(+91 87654 32109) - not actual number',
    resume: '#',
    skills: [
      { name: 'Python', level: 90, category: 'Programming Languages' },
      { name: 'JavaScript', level: 88, category: 'Programming Languages' },
      { name: 'Java', level: 85, category: 'Programming Languages' },
      { name: 'React.js', level: 92, category: 'Web Development' },
      { name: 'Node.js', level: 88, category: 'Web Development' },
      { name: 'Express.js', level: 85, category: 'Web Development' },
      { name: 'Tailwind CSS', level: 90, category: 'Web Development' },
      { name: 'ShadCN', level: 85, category: 'Web Development' },
      { name: 'GSAP', level: 80, category: 'Web Development' },
      { name: 'MySQL', level: 85, category: 'Database' },
      { name: 'MongoDB', level: 82, category: 'Database' },
      { name: 'Firebase', level: 80, category: 'Database' },
      { name: 'Android Studio', level: 85, category: 'Tools & Productivity' },
      { name: 'Streamlit', level: 88, category: 'Tools & Productivity' },
      { name: 'Git', level: 90, category: 'Tools & Productivity' },
      { name: 'GitHub', level: 92, category: 'Tools & Productivity' },
      { name: 'Vercel', level: 85, category: 'Tools & Productivity' }
    ],
    projects: [
      {
        id: 1,
        title: 'BlueForce - NGO Website',
        description: 'A comprehensive NGO website for an organization that conducts beach cleaning drives and environmental conservation activities. Features include event management, donation systems, volunteer registration, and impact tracking.',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React.js', 'Node.js', 'Environmental Conservation', 'NGO Platform', 'Event Management'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Aayush-Chawla/BlueForce',
        featured: true
      },
      {
        id: 2,
        title: 'Nirvana Fitness Tracker App',
        description: 'Designed and developed a fitness tracking app using Android Studio, featuring calorie tracking, custom workout plans, and meal recognition. Focused on creating a user-friendly interface with personalized health monitoring features.',
        image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Android Studio', 'Java', 'Fitness Tracking', 'UI/UX', 'Health Monitoring'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Aayush-Chawla/Nirvana-Fitness-App',
        featured: true
      },
      {
        id: 3,
        title: 'Retrievio Lost & Found',
        description: 'Developed a Lost and Found web application for college users to report and locate lost items efficiently. Implemented audio narration features to support visually impaired users and enabled user interactions through comments and claim submissions.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Web Development', 'Accessibility', 'User Management', 'Real-time Updates', 'Admin Dashboard'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Kapsk2801/Lost-Found',
        featured: true
      },
      {
        id: 4,
        title: 'Indian Dietary Pattern Analysis',
        description: 'Analyzed Indian dietary patterns and their correlation with fitness levels across age groups. Developed interactive visualizations using Streamlit to explore macronutrient intake and fitness relationships.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Python', 'Streamlit', 'Data Analysis', 'Visualization', 'Health Analytics'],
        demoUrl: '#',
        githubUrl: 'https://github.com/Aayush-Chawla/Dietary-Patterns-DAP',
        featured: false
      },
      {
        id: 5,
        title: 'Microservices Architecture',
        description: 'A scalable microservices-based application with Docker containers, Kubernetes orchestration, and API gateway.',
        image: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Docker', 'Kubernetes', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false
      },
      {
        id: 6,
        title: 'Real-time Chat Application',
        description: 'A real-time chat application with video calling, file sharing, and group management features.',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['React.js', 'WebRTC', 'Socket.io', 'Express'],
        demoUrl: '#',
        githubUrl: '#',
        featured: false
      }
    ],
    about: {
      experience: 'With 2+ years of experience in full-stack development, I focus on building scalable and maintainable applications. My expertise lies in React.js ecosystem and modern web technologies, creating robust solutions for complex business requirements.',
      passion: 'I\'m passionate about environmental conservation and using technology for social good. When not coding, I enjoy exploring new technologies, contributing to open-source projects, and participating in environmental initiatives.',
      stats: {
        projects: 6,
        years: 2
      }
    }
  }
];

export const getProfileById = (id: string): Profile | undefined => {
  return profiles.find(profile => profile.id === id);
}; 