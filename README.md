# FolioFlix - Where Portfolios Go Prime Time

A Netflix-style portfolio website with multi-profile switching functionality, built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Netflix-Style Profile Switching**: Switch between team member profiles seamlessly
- **Personalized Content**: Each profile has unique skills, projects, and contact information
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Dark theme with red accents and smooth animations
- **Real Contact Information**: Integrated with actual GitHub and LinkedIn profiles

## 👥 Team Profiles

### Saksham Rajeev Kapoor
- **Role**: Full Stack Developer & UI/UX Enthusiast
- **Skills**: React/Next.js, TypeScript, Node.js, Python/Django, PostgreSQL, AWS/Docker
- **Projects**: E-Commerce Platform, Task Management App, AI Image Generator
- **Contact**: kapoorsaksham25@gmail.com | +91 9876543210
- **GitHub**: [@Kapsk2801](https://github.com/Kapsk2801)
- **LinkedIn**: [Saksham R Kapoor](https://www.linkedin.com/in/sakshamrkapoor)

### Aayush Chawla
- **Role**: Full Stack Developer & Tech Enthusiast
- **Skills**: Vue.js/Nuxt.js, Laravel/PHP, Docker/Kubernetes, Microservices
- **Projects**: Social Media Platform, Microservices Architecture, Real-time Chat Application
- **Contact**: aayushchawla5554@gmail.com | +91 8765432109
- **GitHub**: [@Aayush-Chawla](https://github.com/Aayush-Chawla)
- **LinkedIn**: [Aayush Chawla](https://www.linkedin.com/in/aayush-chawla-1952b9224)

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/folioflix.git
   cd folioflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration
   - Deploy with one click!

### Environment Variables

No environment variables required for this project.

## 🎯 Usage

1. **Profile Switching**: Click the profile avatar in the top-right corner
2. **Hover Effects**: Hover over profiles to see "Switch Account"
3. **Navigation**: Use the header navigation to explore different sections
4. **Contact**: Use the contact form or direct contact information

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with profile selector
│   ├── Hero.tsx        # Main hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills and expertise
│   ├── Projects.tsx    # Project showcase
│   ├── Contact.tsx     # Contact form and info
│   ├── Footer.tsx      # Footer component
│   └── ProfileSelector.tsx # Netflix-style profile switcher
├── data/
│   └── profiles.ts     # Profile data and interfaces
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## 🎨 Customization

### Adding New Team Members

1. **Edit `src/data/profiles.ts`**
   ```typescript
   {
     id: 'new-member',
     name: 'New Member Name',
     role: 'Role Description',
     description: 'Personal description',
     avatar: '👨‍💻',
     github: 'https://github.com/username',
     linkedin: 'https://linkedin.com/in/username',
     email: 'mailto:email@example.com',
     phone: '+91 1234567890',
     skills: [...],
     projects: [...],
     about: {...}
   }
   ```

2. **The profile selector will automatically include the new member**

### Styling

- **Colors**: Modify Tailwind classes in components
- **Theme**: Update color scheme in `tailwind.config.js`
- **Animations**: Adjust transition classes for different effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Netflix**: Inspiration for the profile switching UI
- **Vercel**: For seamless deployment
- **Tailwind CSS**: For the beautiful styling
- **Lucide React**: For the amazing icons

---

**FolioFlix** - Where Portfolios Go Prime Time 🎬✨ 