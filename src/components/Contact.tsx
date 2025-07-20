import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Profile } from '../data/profiles';

interface ContactProps {
  profile: Profile;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: profile.email.replace('mailto:', ''),
      link: profile.email
    },
    {
      icon: Phone,
      title: 'Phone',
      value: profile.phone,
      link: `tel:${profile.phone.replace(/\s/g, '')}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: profile.id === 'saksham' ? 'Mumbai, India' : 'Delhi, India',
      link: '#'
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            Get In <span className="text-red-500">Touch</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-red-500 mx-auto mb-12 sm:mb-16 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Let's Work Together</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  I'm always excited to work on new projects and collaborate with talented individuals. 
                  Whether you have a project in mind or just want to say hello, feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 ${isVisible ? 'animate-fadeIn' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-red-500/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
                                              <info.icon className="text-red-500 sm:w-6 sm:h-6" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">{info.title}</h4>
                      {info.title === 'Phone' ? (
                        <div className="text-sm sm:text-base">
                          <span className="text-gray-400">{profile.phone.split(' - ')[0]}</span>
                          <span className="text-gray-500 italic ml-1">- not actual number</span>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm sm:text-base">{info.value}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl border border-red-500/20">
                <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Response Time</h4>
                <p className="text-gray-300 text-sm sm:text-base">
                  I typically respond to messages within 24 hours. For urgent inquiries, 
                  please feel free to call me directly.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/25'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;